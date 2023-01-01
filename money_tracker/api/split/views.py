from django.db.models import Sum
from rest_framework import generics
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticated

from money_tracker.api.split.serializers import (
    SplitAddSerializer,
    SplitGetSerializer,
    SplitGroupSerializer,
    SplitCompletedGetSerializer,
    SplitTransactionDetailsSerializer,
)
from money_tracker.models import Split, Transaction


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
        return (
            Split.objects.values(
                "source",
                "transaction",
                "transaction__name",
                "transaction__description",
                "transaction__id",
                "transaction__created_by__username",
            )
            .filter(source=self.request.user, completed=False)
            .annotate(total_amount=Sum("amount"))
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


class SplitTransactionDetailsView(generics.ListAPIView):
    serializer_class = SplitTransactionDetailsSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = "transaction_id"

    def get_queryset(self):
        try:
            transaction = Transaction.objects.get(id=self.kwargs["transaction_id"])
        except Transaction.DoesNotExist:
            raise NotFound("Requested transaction does not exist")
        details = Split.objects.filter(
            transaction=transaction,
            amount__gt=0,
        )
        if self.request.user.id != details[
            0
        ].source.id and self.request.user.id not in [
            detail.destination.id for detail in details
        ]:
            raise PermissionDenied("You cannot view this transaction")

        return details
