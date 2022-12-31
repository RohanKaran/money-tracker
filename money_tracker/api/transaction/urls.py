from django.urls import path

from money_tracker.api.transaction.views import TransactionView, TransactionDeleteView

urlpatterns = [
    path("", TransactionView.as_view(), name="transaction"),
    path(
        "delete/<int:pk>/", TransactionDeleteView.as_view(), name="delete-transaction"
    ),
]
