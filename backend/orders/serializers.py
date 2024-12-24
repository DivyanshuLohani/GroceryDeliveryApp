from rest_framework import serializers
from users.serializers import AddressSerializer, UserSerializer
from products.serializers import ProductSerializer
from .models import Order, OrderItem, Payment


# Payment Serializer
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'order', 'payment_method',
                  'payment_status', 'transaction_id', 'payment_meta']


# Payment Create Serializer
class PaymentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['payment_method', 'payment_status',
                  'transaction_id', 'payment_meta']


# OrderItem Serializer
class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price']


# OrderItem Create Serializer
class OrderItemCreateSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()

    def get_price(self, obj):
        return obj.product.price * obj.quantity

    class Meta:
        model = OrderItem
        fields = ['order', 'product', 'quantity', 'price']


# Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    address = AddressSerializer(read_only=True)
    payment = PaymentSerializer(read_only=True)
    order_items = OrderItemSerializer(many=True, read_only=True)
    total_amount = serializers.SerializerMethodField()

    def get_total_amount(self, obj):
        total = 0
        for item in obj.order_items.all():
            total += item.product.price * item.quantity
        return total - obj.discount

    class Meta:
        model = Order
        fields = ['id', 'user', 'total_amount', 'status',
                  'created_at', 'address', 'payment', 'order_items']


# Order Create Serializer
class OrderCreateSerializer(serializers.ModelSerializer):
    status = serializers.CharField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    order_items = OrderItemCreateSerializer(many=True)

    def create(self, validated_data):
        order_items_data = validated_data.pop('order_items')
        order = Order.objects.create(**validated_data)
        for item_data in order_items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order

    class Meta:
        model = Order
        fields = ['user', 'status', 'address',
                  'payment', 'order_items', 'created_at']