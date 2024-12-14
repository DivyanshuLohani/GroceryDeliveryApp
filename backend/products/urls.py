from django.urls import path
from .views import (
    CategoryCreateView,
    CategoryDetailView,
    CategoryListView,
    ProductCreateView,
    ProductDetailView,
    ProductImageCreateView,
    ProductListView,
    ProductReviewCreateView,
    ProductReviewListView
)

urlpatterns = [
    # Post objects
    path('create/', ProductCreateView.as_view(), name='product-create'),
    path('categories/create/', CategoryCreateView.as_view(), name='category-create'),
    path('images/create/', ProductImageCreateView.as_view(),
         name='product-image-create'),
    path('reviews/create/', ProductReviewCreateView.as_view(),
         name='product-review-create'),

    # Get Objects
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('categories/<str:id>/', CategoryDetailView.as_view(),
         name='category-detail'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<str:id>/', ProductDetailView.as_view(), name='product-detail'),

    path('products/<str:product_id>/reviews/',
         ProductReviewListView.as_view(), name='product-reviews'),
]
