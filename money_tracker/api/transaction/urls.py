from django.urls import path

from money_tracker.api.transaction.views import TransactionView

urlpatterns = [
    path("", TransactionView.as_view(), name="transaction"),
]
