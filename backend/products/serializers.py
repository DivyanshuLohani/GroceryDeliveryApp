from rest_framework import serializers
from users.serializers import ProductReviewUserSerializer
from .models import Category, Product, ProductImage, ProductReview


# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True
    )

    class Meta:
        model = Category
        fields = ['id', 'name', 'description',
                  'parent_category', 'subcategories', 'image']


# Category Create Serializer
class CategoryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'description', 'parent_category', 'image']


# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'category', 'description', 'mrp', 'price',
            'stock', 'image', 'is_available', 'images'
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
