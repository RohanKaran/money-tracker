from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from money_tracker.api.friend.serializers import FriendGetAllSerializer
from money_tracker.models import Friend


class FriendGetAllView(generics.ListAPIView):
    serializer_class = FriendGetAllSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Friend.objects.filter(user1=self.request.user)