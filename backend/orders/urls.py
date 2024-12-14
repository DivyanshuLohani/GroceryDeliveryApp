from django.urls import path
from . import views

urlpatterns = [
    path('orders/', views.OrderListView.as_view()),
    path('orders/<str:id>/', views.OrderDetailView.as_view()),
]
