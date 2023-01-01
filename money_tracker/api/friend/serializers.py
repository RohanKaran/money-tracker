from django.contrib.auth.models import User
from rest_framework import serializers

from money_tracker.api.user.serializers import UserSerializer
from money_tracker.models import Friend


class FriendUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")


class FriendGetAllSerializer(serializers.ModelSerializer):
    user2 = FriendUserSerializer()

    class Meta:
        model = Friend
        fields = ("user2",)
        depth = 1


class FriendAddSerializer(serializers.ModelSerializer):
    user1 = serializers.PrimaryKeyRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )
    user2 = serializers.PrimaryKeyRelatedField(
        allow_null=False, allow_empty=False, read_only=True
    )

    class Meta:
        model = Friend
        fields = ("user1", "user2")

    def create(self, validated_data):
        friend = Friend.objects.create(
            user1=validated_data["user1"], user2=validated_data["user2"]
        )
        friend.save()
        return friend


class FriendRequestSerializer(serializers.ModelSerializer):
    user1 = UserSerializer()
    user2 = UserSerializer()

    class Meta:
        model = Friend
        fields = "__all__"
        depth = 1


class FriendAcceptSerializer(serializers.ModelSerializer):
    user1 = serializers.PrimaryKeyRelatedField(
        default=serializers.CurrentUserDefault(), read_only=True
    )
    user2 = serializers.PrimaryKeyRelatedField(
        allow_null=False, allow_empty=False, read_only=True
    )

    class Meta:
        model = Friend
        fields = ("user1", "user2")

    def update(self, instance, validated_data):
        instance.accepted = True
        instance.save()
        return instance
