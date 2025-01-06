from typing import Any
from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager as UM
from django.conf import settings
from common.models import BaseModel


class UserManager(UM):

    def create_superuser(self, email, password, **extra_fields):
        user = self.model(email=email, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and return a regular user."""
        if not email:
            raise ValueError("The Email field must be set.")
        email = self.normalize_email(email)
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        model = self.model.objects.create(
            email=email, password=password, **extra_fields
        )
        model.set_password(password)
        model.save()
        return model


class User(BaseModel, AbstractUser):
    objects = UserManager()
    USER_TYPE_CHOICES = (
        ('customer', 'Customer'),
        ('delivery_partner', 'Delivery Partner'),
        ('admin', 'Admin'),
    )

    AUTH_PROVIDER_CHOICES = (

    )
    username = None
    email = models.EmailField(max_length=128, unique=True)
    user_type = models.CharField(
        max_length=20, choices=USER_TYPE_CHOICES, default="customer")
    phone_number = models.CharField(max_length=15, unique=True)
    auth_provider = models.CharField(max_length=20, default="email")
    is_active = models.BooleanField(
        default=not settings.PHONE_NUMBER_VERIFICATION
    )
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['password', 'phone_number', 'first_name', 'last_name']


class Address(BaseModel):
    ADDRESS_LABELS = (
        ('home', 'Home'),
        ('work', 'Work'),
        ('other', 'Other'),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="addresses"
    )
    label = models.CharField(
        max_length=20,
        choices=ADDRESS_LABELS, default='home'
    )
    street_address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=10)
    country = models.CharField(
        max_length=100, default="IN")  # Default country
    latitude = models.DecimalField(
        max_digits=18,  # Total digits (10 before decimal + 8 after)
        decimal_places=15,  # Precision up to 15 decimal places

    )
    longitude = models.DecimalField(
        max_digits=18,  # Total digits (10 before decimal + 8 after)
        decimal_places=15,  # Precision up to 15 decimal places

    )
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    area = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        verbose_name_plural = "Addresses"

    def __str__(self):
        return f"{self.label.title()} - {self.city}, {self.state}"
