from rest_framework import serializers
from .models import *


class OrderDeliveredSerializer(serializers.Serializer):
    pass


class LocationDataSerializer(serializers.Serializer):
    order_id = serializers.CharField(max_length=255)
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
