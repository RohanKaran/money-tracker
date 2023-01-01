from django.urls import path

from money_tracker.api.friend.views import (
    FriendGetAllView,
    FriendAddView,
    FriendRequestView,
    FriendAcceptView,
)

urlpatterns = [
    path("", FriendGetAllView.as_view(), name="get-friends"),
    path("add/", FriendAddView.as_view(), name="get-friends"),
    path("requests/", FriendRequestView.as_view(), name="get-requests"),
    path("<int:pk>/accept/", FriendAcceptView.as_view(), name="accept-friend"),
]
