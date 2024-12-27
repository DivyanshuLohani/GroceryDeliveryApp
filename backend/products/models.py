from django.db import models
from common.models import BaseModel


def category_upload_to(instance, filename):
    extension = filename.split(".")[-1]
    return f"category/{instance.uid}.{extension}"


def product_upload_to(instance, filename):
    extension = filename.split(".")[-1]
    return f"products/{instance.product.uid}/{instance.uid}.{extension}"


# Category model
class Category(BaseModel):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    parent_category = models.ForeignKey(
        'self', on_delete=models.SET_NULL, null=True, blank=True, related_name='subcategories')
    image = models.ImageField(upload_to=category_upload_to)

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'products'
        ordering = ['name']


# Product model
class Product(BaseModel):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="products")
    description = models.TextField(blank=True)
    mrp = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    stock = models.PositiveIntegerField()
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    def get_related_products(self):
        products = Product.objects.filter(
            category=self.category
        ).exclude(
            id=self.id
        )[:5]
        return products

    def save(self, *args, **kwargs):
        if not self.price:
            self.price = self.mrp
        super().save(*args, **kwargs)

    class Meta:
        app_label = 'products'


# Product Images
class ProductImage(BaseModel):
    product = models.ForeignKey(
        Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=product_upload_to)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    priority = models.IntegerField()

    def __str__(self):
        return f"Image for {self.product.name}"

    class Meta:
        unique_together = ('product', 'priority')
        ordering = ['priority', 'uploaded_at']
        app_label = 'products'

    def save(self, *args, **kwargs):
        if not self.id:
            last_priority = (ProductImage.objects.filter(
                product=self.product
            ).aggregate(
                max_priority=models.Max('priority'))['max_priority'] or 0
            ) + 1
            self.priority = last_priority

        super().save(*args, **kwargs)


class ProductReview(BaseModel):
    class Meta:
        app_label = 'products'

    product = models.ForeignKey(
        Product, related_name="reviews", on_delete=models.CASCADE)
    user = models.ForeignKey(
        "users.User", related_name="reviews", on_delete=models.CASCADE)

    title = models.CharField(max_length=40)
    content = models.CharField(max_length=512)
    rating = models.IntegerField()
