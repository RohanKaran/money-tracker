from django.urls import path

from money_tracker.api.transaction.views import TransactionView, TransactionDeleteView

urlpatterns = [
    path("", TransactionView.as_view(), name="transaction"),
    path(
        "<int:pk>/delete/", TransactionDeleteView.as_view(), name="delete-transaction"
    ),
]
