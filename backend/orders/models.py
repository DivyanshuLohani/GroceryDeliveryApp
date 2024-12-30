from django.db import models
from common.models import BaseModel
# Payment Model


class Payment(models.Model):
    order = models.OneToOneField(
        'orders.Order', on_delete=models.CASCADE, related_name='payment_details'
    )
    payment_method = models.CharField(
        max_length=50,
        choices=[
            ('Card', 'card'),
            ('UPI', 'upi'),
            ('Net Banking', 'net_banking'),
            ('Cash on Delivery', 'Cash on Delivery'),
        ],
        default='Cash on Delivery',
    )
    payment_status = models.CharField(
        max_length=50,
        choices=[
            ('Pending', 'Pending'),
            ('Completed', 'Completed'),
            ('Failed', 'Failed'),
        ],
        default='Pending',
    )
    payment_meta = models.JSONField(null=True, blank=True)
    transaction_id = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.order.id} payment - {self.payment_status}"


# Order Model
class Order(BaseModel):
    user = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(
        max_length=50,
        choices=[
            ('Pending', 'Pending'),
            ('Processing', 'Processing'),
            ('Delivered', 'Delivered'),
            ('Cancelled', 'Cancelled'),
        ],
        default='Pending',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    address = models.ForeignKey(
        'users.Address', on_delete=models.SET_NULL, null=True, related_name='orders')
    payment = models.OneToOneField(
        Payment,
        on_delete=models.SET_NULL,
        null=True,
        related_name='associated_order'
    )
    discount = models.FloatField(default=0.0)

    assigned_partner = models.ForeignKey(
        'users.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_partner'
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Order {self.id} by {self.user}"


# OrderItem Model
class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name='order_items')
    product = models.ForeignKey(
        'products.Product', on_delete=models.SET_NULL, null=True, related_name='order_items')
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"


class CartItem(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('user', 'product')
        ordering = ['-id']

    def __str__(self):
        return f"{self.user.username}'s cart - {self.product.name}"
