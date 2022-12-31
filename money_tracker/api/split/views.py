from django.db.models import Sum
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from money_tracker.api.split.serializers import (
    SplitAddSerializer,
    SplitGetSerializer,
    SplitGroupSerializer,
    SplitCompletedGetSerializer,
)
from money_tracker.models import Split


class SplitAddView(generics.CreateAPIView):
    serializer_class = SplitAddSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        """
        Set the source to the current user
        """
        serializer.save(source=self.request.user)


class SplitGetView(generics.ListAPIView):
    serializer_class = SplitGetSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Split.objects.filter(
            source=self.request.user, completed=False, amount__lt=0
        )


class SplitCompletedGetView(generics.ListAPIView):
    serializer_class = SplitCompletedGetSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Split.objects.filter(source=self.request.user, completed=True)


class SplitGroupView(generics.ListAPIView):
    serializer_class = SplitGroupSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return (
            Split.objects.values(
                "source", "destination", "destination__username", "destination__email"
            )
            .filter(source=self.request.user, completed=False)
            .annotate(total_amount=Sum("amount"))
        )
