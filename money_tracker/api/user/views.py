import json

from django.contrib.auth import login
from django.contrib.auth.models import User
from rest_framework import generics, viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import ValidationError

from money_tracker.api import utils
from money_tracker.api.user.serializers import (
    UserSerializer,
    RegisterSerializer,
    LoginSerializer,
    BalanceSerializer,
    BalanceUpdateSerializer,
)
from money_tracker.models import Balance


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class LoginView(viewsets.ViewSet):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = LoginSerializer
    throttle_scope = "login"

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        username = serializer.data["username"]
        password = serializer.data["password"]

        # Try to retrieve the user
        user = User.objects.get(username=username)
        if not (user or user.check_password(password)):
            return Response(
                {"detail": "Username or password unknown"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        token = utils.create_token(user=user)
        user.session_token = token
        user.save()
        login(request, user)
        return Response(
            data={
                "token": token.key,
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                },
            },
            status=status.HTTP_200_OK,
        )


class UserGetAllView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return User.objects.all()


class BalanceView(generics.RetrieveAPIView):
    serializer_class = BalanceSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return Balance.objects.get(user=self.request.user)


class BalanceUpdateView(viewsets.ViewSet):
    serializer_class = BalanceUpdateSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Balance.objects.all()

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.request.user
        if user.balance.balance + serializer.validated_data["amount"] < 1:
            raise ValidationError("You don't have enough amount")

        user.balance.balance += serializer.validated_data["amount"]
        user.balance.save()
        return Response(
            data={"balance": user.balance.balance}, status=status.HTTP_200_OK
        )
