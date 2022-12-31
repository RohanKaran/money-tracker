from django.urls import path

from money_tracker.api.user.views import RegisterView, LoginView, UserGetAllView

urlpatterns = [
    path("", UserGetAllView.as_view(), name="all-users"),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view({"post": "post"}), name="login"),
]
