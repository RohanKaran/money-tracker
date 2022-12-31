from django.urls import path

from money_tracker.api.friend.views import FriendGetAllView

urlpatterns = [
    path("", FriendGetAllView.as_view(), name="get-friends"),
    path("add/<>", FriendGetAllView.as_view(), name="get-friends"),
]