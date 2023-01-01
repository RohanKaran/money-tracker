from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from money_tracker.models import Transaction


class TransactionSerializer(ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"


class TransactionUpdateSerializer(ModelSerializer):
    name = serializers.CharField(allow_null=False, allow_blank=False)
    description = serializers.CharField(allow_blank=True)

    class Meta:
        model = Transaction
        fields = ("name", "description")

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.save()
        return instance
