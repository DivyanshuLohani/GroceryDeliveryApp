from rest_framework import serializers
from .models import *
from orders.models import Order
from users.serializers import AddressSerializer


class DeliveryPartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryPartner
        fields = ['name', 'contact_no', 'city']


# class OrderDeliveryStatusSerializer(serializers.ModelSerializer):
#     assigned_partner = DeliveryPartnerSerializer()
#     address = AddressSerializer()

#     class Meta:
#         model = Order
#         fields = ["status", "assigned_partner", "address"]

class OrderDeliveryLocationSerializer(serializers.Serializer):
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()

    def validate_latitude(self, value):
        if not (-90 <= value <= 90):
            raise serializers.ValidationError(
                "Latitude must be between -90 and 90.")
        return value

    def validate_longitude(self, value):
        if not (-180 <= value <= 180):
            raise serializers.ValidationError(
                "Longitude must be between -180 and 180.")
        return value


class OrderDeliveryStatusSerializer(serializers.Serializer):
    order_id = serializers.CharField(max_length=255)
    status = serializers.CharField(max_length=255)
    assigned_partner = DeliveryPartnerSerializer()
    address = AddressSerializer()
    latitude = serializers.FloatField(required=False)
    longitude = serializers.FloatField(required=False)

    def validate_latitude(self, value):
        if not (-90 <= value <= 90):
            raise serializers.ValidationError(
                "Latitude must be between -90 and 90.")
        return value

    def validate_longitude(self, value):
        if not (-180 <= value <= 180):
            raise serializers.ValidationError(
                "Longitude must be between -180 and 180.")
        return value
