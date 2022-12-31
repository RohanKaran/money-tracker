from django.urls import path

from money_tracker.api.friend.views import FriendGetAllView, FriendAddView

urlpatterns = [
    path("", FriendGetAllView.as_view(), name="get-friends"),
    path("add/<int:user_id>/", FriendAddView.as_view(), name="get-friends"),
]
