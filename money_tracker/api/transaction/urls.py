from django.urls import path

from money_tracker.api.transaction.views import (
    TransactionView,
    TransactionDeleteView,
    TransactionUpdateView,
)

urlpatterns = [
    path("", TransactionView.as_view(), name="transaction"),
    path(
        "<int:pk>/delete/", TransactionDeleteView.as_view(), name="delete-transaction"
    ),
    path(
        "<int:pk>/update/", TransactionUpdateView.as_view(), name="update-transaction"
    ),
]
