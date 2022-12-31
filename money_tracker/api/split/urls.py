from django.urls import path

from money_tracker.api.split.views import SplitAddView, SplitGetView, SplitGroupView

urlpatterns = [
    path("", SplitGetView.as_view(), name="get-split"),
    path("add-split/", SplitAddView.as_view(), name="add-split"),
    path("get-split-group/", SplitGroupView.as_view(), name="group-split"),
]
