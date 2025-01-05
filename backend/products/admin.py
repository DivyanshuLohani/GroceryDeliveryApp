from django.urls import path
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.utils.html import mark_safe
from django.contrib import admin
from django.db import models
from .models import Product, ProductImage
import json


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'view_images_link')

    def view_images_link(self, obj):
        return mark_safe(f'<a href="{obj.id}/images/">Manage Images</a>')
    view_images_link.short_description = "Images Management"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('<str:product_id>/images/', self.admin_site.admin_view(
                self.product_images_view), name='product_images'),
        ]
        return custom_urls + urls

    def product_images_view(self, request, product_id):
        # Fetch the product instance or return 404 if not found
        product = get_object_or_404(Product, id=product_id)

        # Fetch and order product images by priority
        images = ProductImage.objects.filter(
            product=product
        ).order_by('priority')

        # Modify image URLs by removing "/uploads"
        for image in images:
            image.modified_url = image.image.url.removeprefix("/uploads")

        # Handle the POST request for reordering
        if request.method == "POST":
            try:
                # Parse the received image IDs in the correct order
                data = json.loads(request.body).get('ids', [])
                images = ProductImage.objects.filter(
                    id__in=data, product=product)

                get_highest_priority = ProductImage.objects.filter(
                    product=product).aggregate(models.Max('priority'))['priority__max'] or 0

                # Create a map for the new priorities based on the received order
                id_to_priority = {image_id: get_highest_priority + index +
                                  1 for index, image_id in enumerate(data)}

                # Update the priority for each image
                for image in images:
                    image.priority = id_to_priority[image.id]

                # Perform a bulk update
                ProductImage.objects.bulk_update(images, ['priority'])

                for image in images:
                    image.priority = image.priority - get_highest_priority

                ProductImage.objects.bulk_update(images, ['priority'])

                # Return success response
                return JsonResponse({'status': 'success'})
            except Exception as e:
                # Handle any error and return failure response
                return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

        # Render the admin template with product and images data
        return render(request, 'admin/product_images.html', {
            'product': product,
            'images': images
        })
