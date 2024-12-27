from rest_framework import serializers
from server.utils import get_colors_from_image
from users.serializers import ProductReviewUserSerializer
from .models import Category, Product, ProductImage, ProductReview

import random


def generate_desaturated_color():
    """
    Generate a random desaturated color in hex format.
    """
    # Generate a base light gray value to control brightness
    gray = random.randint(180, 230)

    # Add a small variation to the RGB channels
    r = min(255, max(0, gray + random.randint(-20, 20)))
    g = min(255, max(0, gray + random.randint(-20, 20)))
    b = min(255, max(0, gray + random.randint(-20, 20)))

    # Convert to hex format
    return f'{r:02x}{g:02x}{b:02x}'


# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    # products = serializers.SerializerMethodField()
    # colors = serializers.SerializerMethodField()

    # def get_colors(self, obj):
    #     print(obj.name)
    #     return get_colors_from_image(self.get_image(obj))

    class Meta:
        model = Category
        fields = ['id', 'name', 'description',
                  'parent_category', 'subcategories', 'image']

    def get_subcategories(self, obj):
        # Use the related name for reverse relation to fetch subcategories
        subcategories = Category.objects.filter(parent_category=obj)
        return CategorySerializer(subcategories, many=True).data

    def get_image(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return f"https://picsum.photos/seed/{generate_desaturated_color()}/500/500"


# Category Create Serializer
class CategoryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'description', 'parent_category', 'image']


class CategoryDetailSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    def get_products(self, obj):
        products = Product.objects.filter(category=obj)
        return ProductSerializer(products, many=True, context=self.context).data

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'products', ]


# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = serializers.SerializerMethodField(read_only=True)

    def get_images(self, obj):
        images = ProductImage.objects.filter(product=obj)
        return [self.context['request'].build_absolute_uri(
            image.image.url.replace("/uploads", "", 1)
        ) for image in images]

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'category', 'description', 'mrp', 'price',
            'stock', 'is_available', 'images'
        ]


# Product Create Serializer
class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'name', 'category', 'description', 'mrp', 'price',
            'stock', 'image', 'is_available'
        ]


# Product Image Serializer
class ProductImageSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all())

    class Meta:
        model = ProductImage
        fields = ['id', 'product', 'image', 'uploaded_at']


# Product Image Create Serializer
class ProductImageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['product', 'image']


# Product Review Serializer
class ProductReviewSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    user = ProductReviewUserSerializer()

    class Meta:
        model = ProductReview
        fields = ['id', 'product', 'user', 'title', 'content', 'rating']


# Product Review Create Serializer
class ProductReviewCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductReview
        fields = ['product', 'user', 'title', 'content', 'rating']
