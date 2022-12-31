from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()


urlpatterns = [
    path("user/", include("money_tracker.api.user.urls")),
    path("transaction/", include("money_tracker.api.transaction.urls")),
    path("split/", include("money_tracker.api.split.urls")),
    path("friend/", include("money_tracker.api.friend.urls")),
]
