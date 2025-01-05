from django.urls import path
from . import views

urlpatterns = [
    path('<str:order_id>/location/',
         views.DriverLocationAPIView.as_view(), name='delivery-location-update'),
]
