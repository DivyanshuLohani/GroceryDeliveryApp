from rest_framework import generics
from .models import Order, OrderItem, Payment
from .serializers import (
    OrderCreateSerializer, OrderSerializer, OrderItemCreateSerializer,
    OrderItemSerializer, PaymentCreateSerializer, PaymentSerializer
)
from rest_framework.permissions import IsAuthenticated


class OrderListView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return OrderCreateSerializer
        return OrderSerializer

    def check_object_permissions(self, request, obj):
        if request.user.is_staff or request.user.is_superuser or request.user == obj.user:
            return True
        return False


class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(id=self.kwargs['id'])

    def check_object_permissions(self, request, obj):
        if request.user.is_staff or request.user.is_superuser or request.user == obj.user:
            return True
        return False
