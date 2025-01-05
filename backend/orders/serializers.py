from rest_framework import serializers
from users.models import Address
from products.models import Product
from users.serializers import AddressSerializer, UserSerializer
from products.serializers import ProductSerializer
from .models import CartItem, Order, OrderItem, Payment
from decimal import Decimal


# Payment Serializer
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'order', 'payment_method',
                  'payment_status', 'transaction_id', 'payment_meta']


# Payment Create Serializer
class PaymentCreateSerializer(serializers.ModelSerializer):
    payment_status = serializers.CharField(read_only=True)
    transaction_id = serializers.CharField(read_only=True)

    class Meta:
        model = Payment
        fields = ['payment_method', 'payment_status',
                  'transaction_id', 'payment_meta']


# OrderItem Serializer
class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity']


# OrderItem Create Serializer
class OrderItemCreateSerializer(serializers.Serializer):
    # price = serializers.FloatField()
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all())
    quantity = serializers.IntegerField()

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']


# Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    address = AddressSerializer(read_only=True)
    payment = PaymentSerializer(read_only=True)
    order_items = OrderItemSerializer(many=True, read_only=True)
    total_amount = serializers.SerializerMethodField()

    def get_total_amount(self, obj):
        total = 0
        for item in obj.order_items.all():
            total += item.product.price * item.quantity

        return total - Decimal(obj.discount)

    class Meta:
        model = Order
        fields = ['id', 'total_amount', 'status',
                  'created_at', 'address', 'payment', 'order_items']


# Order Create Serializer
class OrderCreateSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    status = serializers.CharField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    order_items = OrderItemCreateSerializer(many=True)
    address = serializers.PrimaryKeyRelatedField(
        queryset=Address.objects.all(), write_only=True)

    def create(self, validated_data):
        order_items_data = validated_data.pop('order_items')
        user = self.context['request'].user
        order = Order.objects.create(
            **validated_data, user=user)
        for item_data in order_items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order

    class Meta:
        model = Order
        fields = ['id', 'status',
                  'address',
                  'order_items', 'created_at']


class CreateCartItemSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField()

    class Meta:
        model = CartItem
        fields = ['product', 'quantity']

    def create(self, validated_data):
        existing = CartItem.objects.filter(
            user=validated_data['user'],
            product=validated_data['product']
        ).first()
        if existing:
            existing.quantity += validated_data['quantity']
            existing.save()
            return existing
        return super().create(validated_data)


class RemoveCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['product']


class CartItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField(read_only=True)

    def get_product(self, obj):
        return ProductSerializer(obj.product, context=self.context).data

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']
