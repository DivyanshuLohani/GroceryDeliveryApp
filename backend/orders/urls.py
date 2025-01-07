from django.urls import path
from . import views

urlpatterns = [
    path('order/', views.OrderListView.as_view()),
    path('recent/', views.PendingOrderView.as_view()),
    path('order/<str:id>/', views.OrderDetailView.as_view()),
    path('cart/', views.CartView.as_view()),
    path('cart/<str:id>/', views.ModifyCartItemView.as_view()),
]
