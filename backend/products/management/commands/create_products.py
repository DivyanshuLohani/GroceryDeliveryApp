import os
import json
from django.core.management.base import BaseCommand
from django.db import transaction
from products.models import Category, Product, ProductImage

# Path for storing product images
PRODUCT_IMAGE_PATH = "uploads/products/{id}/"


class Command(BaseCommand):
    help = 'Create categories, products, and images from a JSON file'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str,
                            help='Path to the JSON file containing product data')

    @transaction.atomic
    def create_category_and_product(self, product_data):
        # Create or get category
        category_data = product_data['category']
        category, created = Category.objects.get_or_create(
            name=category_data['name'],
            defaults={
                'description': '',
                'parent_category': None,  # Adjust logic if parent_category is provided
            }
        )

        # Create product
        product = Product.objects.create(
            name=product_data['name'],
            category=category,
            description=f"Brand: {product_data['barnd']}",
            mrp=product_data['price'],
            price=product_data['discount'],
            stock=100,  # Default stock value, adjust as needed
            is_available=True
        )

        # Add images
        product_image_folder = PRODUCT_IMAGE_PATH.format(id=product_data['id'])
        if os.path.exists(product_image_folder):
            for idx, filename in enumerate(os.listdir(product_image_folder), start=1):
                image_path = os.path.join(product_image_folder, filename)

                ProductImage.objects.create(
                    product=product,
                    image=image_path,
                    priority=idx
                )

    def handle(self, *args, **kwargs):
        json_file = kwargs['json_file']
        with open(json_file, "r") as file:
            products = json.load(file)
            for product_data in products:
                self.create_category_and_product(product_data)
        self.stdout.write(self.style.SUCCESS(
            "Categories, Products, and Images created successfully!"))
