from django.urls import path

from money_tracker.api.split.views import SplitAddView, SplitGetView, SplitGroupView

urlpatterns = [
    path("", SplitGetView.as_view(), name="get-split"),
    path("create/", SplitAddView.as_view(), name="create-split"),
    path("group/", SplitGroupView.as_view(), name="group-split"),
]
