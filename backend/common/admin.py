# Register your models here.
from django.contrib import admin
from django.apps import apps
from .models import BaseModel

# Loop through all models in the app
for model in apps.get_models():
    if not admin.site.is_registered(model):
        if model.__name__ == "Product":
            continue
        admin.site.register(model)
