from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import AddressCreateView, AddressDetailView, AddressView, UserRegisterView, UserView


urlpatterns = [
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", UserRegisterView.as_view(), name="register"),
    path("user/", UserView.as_view(), name="user_info"),
    path("address/", AddressView.as_view(), name="address_list"),
    path("address/create/", AddressCreateView.as_view(), name="address_create"),
    path("address/<str:id>/", AddressDetailView.as_view(), name="address_detail"),
]
