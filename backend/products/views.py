from django.conf import settings
from django.utils.decorators import method_decorator
from django.views.decorators.vary import vary_on_cookie, vary_on_headers
from django.views.decorators.cache import cache_page
from products.serializers import CategorySerializer
from products.models import Category
from rest_framework.generics import ListAPIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Category, Product, ProductReview
from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Category, Product, ProductImage, ProductReview
from .serializers import (
    CategoryCreateSerializer,
    CategorySerializer,
    ProductCreateSerializer,
    ProductImageCreateSerializer,
    ProductReviewCreateSerializer,
    ProductReviewSerializer,
    ProductSerializer
)


# Category Create View
class CategoryCreateView(CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryCreateSerializer
    permission_classes = [IsAdminUser]


# Product Create View
class ProductCreateView(CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductCreateSerializer
    permission_classes = [IsAdminUser]


# Product Image Create View
class ProductImageCreateView(CreateAPIView):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageCreateSerializer
    permission_classes = [IsAdminUser]


# Product Review Create View
class ProductReviewCreateView(CreateAPIView):
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewCreateSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Ensure authenticated user is assigned as the reviewer
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


# View all Categories

class CategoryListView(ListAPIView):
    queryset = Category.objects.filter(parent_category__isnull=True)
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

    @method_decorator(cache_page(settings.CACHE_TTL))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


# View a single Category
class CategoryDetailView(ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

    def get_queryset(self):
        cat_id = self.kwargs['id']
        return Product.objects.filter(category__id=cat_id)

    @method_decorator(cache_page(settings.CACHE_TTL))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


# View all Products
class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    lookup_field = 'query'

    def get_queryset(self):
        query = self.kwargs['query']
        return Product.objects.filter(name__icontains=query)

    @method_decorator(cache_page(settings.CACHE_TTL))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


# View a single Product
class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'  # Use the primary key or customize as needed

    @method_decorator(cache_page(settings.CACHE_TTL))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


# View all Reviews for a Product
class ProductReviewListView(ListAPIView):
    serializer_class = ProductReviewSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return ProductReview.objects.filter(product__id=product_id)

    @method_decorator(cache_page(settings.CACHE_TTL))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
