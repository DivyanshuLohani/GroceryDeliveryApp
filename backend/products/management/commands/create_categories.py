import json
from django.core.management.base import BaseCommand
from django.db import transaction
from products.models import Category


class Command(BaseCommand):
    help = 'Create categories and subcategories from a JSON file'

    def add_arguments(self, parser):
        parser.add_argument(
            'json_file', type=str, help='Path to the JSON file containing category data')

    @transaction.atomic
    def handle(self, *args, **kwargs):
        json_file = kwargs['json_file']

        # Load JSON data
        with open(json_file, "r") as file:
            category_data = json.load(file)

        # Iterate over parent categories and their subcategories
        for parent_category_name, subcategories in category_data.items():
            parent_category, created = Category.objects.get_or_create(
                name=parent_category_name,
                defaults={'description': '', 'parent_category': None}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(
                    f"Created parent category: {parent_category_name}"))
            else:
                self.stdout.write(self.style.SUCCESS(
                    f"Found existing parent category: {parent_category_name}"))

            for subcategory_name in subcategories:
                subcategory, created = Category.objects.get_or_create(
                    name=subcategory_name,
                    defaults={
                        'description': '',
                        'parent_category': parent_category  # Link subcategory to parent
                    }
                )

                # Debugging statement to confirm the relationship
                if created:
                    self.stdout.write(
                        self.style.SUCCESS(f"Created subcategory: {
                                           subcategory_name} under parent: {parent_category_name}")
                    )
                else:
                    # Update parent_category if it wasn't set previously
                    if subcategory.parent_category != parent_category:
                        subcategory.parent_category = parent_category
                        subcategory.save()
                        self.stdout.write(
                            self.style.SUCCESS(f"Updated subcategory: {
                                               subcategory_name} to set parent: {parent_category_name}")
                        )
                    else:
                        self.stdout.write(
                            self.style.SUCCESS(f"Found existing subcategory: {
                                               subcategory_name} already linked to parent: {parent_category_name}")
                        )

        self.stdout.write(self.style.SUCCESS(
            "Categories and subcategories created and linked successfully!"))
