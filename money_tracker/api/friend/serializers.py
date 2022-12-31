from django.contrib.auth.models import User
from rest_framework import serializers

from money_tracker.models import Friend


class FriendGetAllSerializer(serializers.ModelSerializer):
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
