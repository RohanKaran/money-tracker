from rest_framework import generics
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticated

from money_tracker.api.transaction.serializers import (
    TransactionSerializer,
    TransactionUpdateSerializer,
)
from money_tracker.models import Transaction


class TransactionView(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Transaction.objects.filter(created_by=self.request.user)


class TransactionDeleteView(generics.DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Transaction.objects.all()

    def perform_destroy(self, instance):
        try:
            transaction = Transaction.objects.get(id=self.kwargs["pk"])
        except Transaction.DoesNotExist:
            raise NotFound("Requested transaction does not exist")
        if transaction.created_by.id != self.request.user.id:
            raise PermissionDenied("You cannot delete this transaction")

        transaction.delete()


class TransactionUpdateView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = TransactionUpdateSerializer
    queryset = Transaction.objects.all()

    def perform_update(self, serializer):
        try:
            transaction = Transaction.objects.get(id=self.kwargs["pk"])
        except Transaction.DoesNotExist:
            raise NotFound("Requested transaction does not exist")
        if transaction.created_by.id != self.request.user.id:
            raise PermissionDenied("You cannot update this transaction")

        serializer.save()
