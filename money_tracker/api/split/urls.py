from django.urls import path

from money_tracker.api.split.views import (
    SplitAddView,
    SplitGetView,
    SplitGroupView,
    SplitCompletedGetView,
    SplitTransactionDetailsView,
)

urlpatterns = [
    path("", SplitGetView.as_view(), name="get-split"),
    path("create/", SplitAddView.as_view(), name="create-split"),
    path("group/", SplitGroupView.as_view(), name="group-split"),
    path("completed/", SplitCompletedGetView.as_view(), name="completed-split"),
    path(
        "<int:transaction_id>/details/",
        SplitTransactionDetailsView.as_view(),
        name="split-transaction-details",
    ),
]
