from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticated

from money_tracker.api.friend.serializers import (
    FriendGetAllSerializer,
    FriendAddSerializer,
    FriendRequestSerializer,
    FriendAcceptSerializer,
)
from money_tracker.models import Friend


class FriendGetAllView(generics.ListAPIView):
    serializer_class = FriendGetAllSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Friend.objects.filter(user1=self.request.user, accepted=True)


class FriendAddView(generics.CreateAPIView):
    serializer_class = FriendAddSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        try:
            user2 = User.objects.get(email=self.request.data["email"])
        except User.DoesNotExist:
            raise NotFound("Requested user does not exist")
        if self.request.user.id == user2.id:
            raise PermissionDenied("you cannot add yourself as a friend")
        serializer.save(user1=self.request.user, user2=user2)


class FriendAcceptView(generics.UpdateAPIView):
    serializer_class = FriendAcceptSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Friend.objects.all()

    def perform_update(self, serializer):
        friend = self.get_object()
        if friend.user2 != self.request.user:
            raise PermissionDenied("you cannot accept this friend request")
        serializer.save(accepted=True)
        friend_reverse = Friend.objects.create(
            user1=self.request.user, user2=friend.user1, accepted=True
        )
        friend_reverse.save()


class FriendRequestView(generics.ListAPIView):
    serializer_class = FriendRequestSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Friend.objects.filter(user2=self.request.user, accepted=False)
