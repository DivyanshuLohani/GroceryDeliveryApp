from django.db import models
from common.models import BaseModel


class DeliveryLog(BaseModel):
    order = models.OneToOneField(
        "orders.Order", related_name="delivery", on_delete=models.CASCADE
    )
    time = models.PositiveIntegerField()  # Number of seconds
    delivery_partner = models.ForeignKey(
        "users.User", related_name="deliveries", on_delete=models.CASCADE
    )


class DeliveryPartner(models.Model):
    id = None
    user = models.OneToOneField(
        "users.User", related_name="delivery_profile", on_delete=models.CASCADE, primary_key=True)

    name = models.CharField(max_length=128)
    contact_no = models.CharField(max_length=12)
    city = models.CharField(max_length=120)
    on_duty = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_created=True)


# TODO: Add Ratings
# class DileveryPartnerRating(BaseModel):
#     partner = models.ForeignKey(DilveryPartner, related_name="ratings", on_delete=models.CASCADE)
