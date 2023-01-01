from datetime import datetime, timezone

from django.contrib.auth.models import User
from rest_framework import serializers

from money_tracker.models import Split, Transaction


class SplitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Split
        fields = "__all__"


class TransactionSplitSerializer(serializers.ModelSerializer):
    name = serializers.CharField(allow_null=False, allow_blank=False)
    description = serializers.CharField(allow_blank=True)

    class Meta:
        model = Transaction
        fields = ("name", "description")


class SplitAddSerializer(serializers.ModelSerializer):
    source = serializers.PrimaryKeyRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )
    destination = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), many=True, allow_null=False, allow_empty=False
    )
    amount = serializers.ListField(
        required=True,
        allow_null=False,
        allow_empty=False,
        child=serializers.IntegerField(allow_null=False, min_value=1),
    )
    transaction = TransactionSplitSerializer(allow_null=False)

    class Meta:
        model = Split
        fields = ("source", "destination", "amount", "transaction")

    def validate(self, attrs):
        if len(attrs["amount"]) != len(attrs["destination"]):
            raise serializers.ValidationError(
                "The number of amounts and destinations must be equal."
            )
        if len(set(attrs["destination"])) != len(attrs["destination"]):
            raise serializers.ValidationError("The destinations must be unique.")
        return attrs

    def create(self, validated_data):
        current_time = datetime.now(tz=timezone.utc)
        transaction = Transaction.objects.create(
            name=validated_data["transaction"]["name"],
            description=validated_data["transaction"]["description"],
            created_by=validated_data["source"],
            created_at=current_time,
            updated_at=current_time,
            amount=sum(validated_data["amount"]),
        )
        transaction.save()
        for destination, amount in zip(
            validated_data["destination"], validated_data["amount"]
        ):
            split = Split.objects.create(
                source=validated_data["source"],
                destination=destination,
                amount=amount,
                created_at=current_time,
                updated_at=current_time,
                transaction=transaction,
            )
            split.save()

            split_reverse = Split.objects.create(
                source=destination,
                destination=validated_data["source"],
                amount=-amount,
                created_at=current_time,
                updated_at=current_time,
                transaction=transaction,
            )
            split_reverse.save()

        return validated_data


class UserSplitSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


class SplitGetSerializer(serializers.ModelSerializer):
    source = serializers.IntegerField(write_only=True)
    transaction = serializers.IntegerField(read_only=True)
    total_amount = serializers.IntegerField(read_only=True)
    transaction__name = serializers.CharField(read_only=True)
    transaction__id = serializers.IntegerField(read_only=True)
    transaction__created_by__username = serializers.CharField(read_only=True)

    class Meta:
        model = Split
        fields = (
            "source",
            "transaction",
            "total_amount",
            "transaction__id",
            "transaction__name",
            "transaction__created_by__username",
        )


class SplitCompletedGetSerializer(serializers.ModelSerializer):
    source = serializers.PrimaryKeyRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )
    destination = UserSplitSerializer(read_only=True)

    class Meta:
        model = Split
        fields = "__all__"
        depth = 1


class SplitGroupSerializer(serializers.ModelSerializer):
    source = serializers.IntegerField(write_only=True)
    destination = serializers.IntegerField(read_only=True)
    total_amount = serializers.IntegerField(read_only=True)
    destination__username = serializers.CharField(read_only=True)
    destination__email = serializers.CharField(read_only=True)

    class Meta:
        model = Split
        fields = (
            "source",
            "destination",
            "total_amount",
            "destination__email",
            "destination__username",
        )
