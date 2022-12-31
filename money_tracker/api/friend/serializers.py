from rest_framework import serializers

from money_tracker.models import Friend


class FriendGetAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ("user2",)
