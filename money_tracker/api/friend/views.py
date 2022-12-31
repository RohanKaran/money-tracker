from django.contrib.auth.models import User
from rest_framework import generics, serializers
from rest_framework.permissions import IsAuthenticated

from money_tracker.api.friend.serializers import (
    FriendGetAllSerializer,
    FriendAddSerializer,
)
from money_tracker.models import Friend


class FriendGetAllView(generics.ListAPIView):
    serializer_class = FriendGetAllSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Friend.objects.filter(user1=self.request.user)


class FriendAddView(generics.CreateAPIView):
    serializer_class = FriendAddSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        if self.request.user.id == self.kwargs["user_id"]:
            raise serializers.ValidationError("you cannot add yourself as a friend")
        try:
            user2 = User.objects.get(id=self.kwargs["user_id"])
        except User.DoesNotExist:
            raise serializers.ValidationError("Requested user does not exist")

        serializer.save(user1=self.request.user, user2=user2)
