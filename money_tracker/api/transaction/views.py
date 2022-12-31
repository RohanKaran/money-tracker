from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from money_tracker.api.transaction.serializers import TransactionSerializer
from money_tracker.models import Transaction


class TransactionView(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Transaction.objects.filter(created_by=self.request.user)
