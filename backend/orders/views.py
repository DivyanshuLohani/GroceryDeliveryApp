from rest_framework import generics, status
from .models import CartItem, Order
from .serializers import (
    CartItemSerializer, CreateCartItemSerializer, OrderCreateSerializer, OrderSerializer,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class OrderListView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff or self.request.user.is_superuser:
            return Order.objects.all()
        else:
            return Order.objects.filter(user=self.request.user)

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
    lookup_field = 'id'

    def get_queryset(self):
        return Order.objects.filter(id=self.kwargs['id'])

    def check_object_permissions(self, request, obj):
        if request.user.is_staff or request.user.is_superuser or request.user == obj.user:
            return True
        if request.user.user_type == "admin":
            return True

        if request.user.user_type == "delivery_partner" and obj.assigned_partner == request.user:
            return True

        return False


class CartView(generics.CreateAPIView, generics.ListAPIView, generics.DestroyAPIView):
    queryset = CartItem.objects.all()
    lookup_field = 'id'

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.request.method in ("POST"):
            return CreateCartItemSerializer
        return CartItemSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        s = CartItemSerializer(serializer.instance,
                               context=self.get_serializer_context()
                               )
        headers = self.get_success_headers(s.data)
        return Response(s.data, status=status.HTTP_201_CREATED, headers=headers)

    def destroy(self, request, *args, **kwargs):
        CartItem.objects.filter(user=request.user).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ModifyCartItemView(generics.UpdateAPIView, generics.DestroyAPIView):

    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    lookup_field = 'id'

    def get_queryset(self):
        item_id = self.kwargs['id']
        return CartItem.objects.filter(
            user=self.request.user, product__id=item_id)

    def get_object(self):

        obj = self.get_queryset().first()

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        return obj

    def check_object_permissions(self, request, obj):
        if request.user == obj.user:
            return True
        return False
