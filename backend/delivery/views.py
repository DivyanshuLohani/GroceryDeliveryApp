from .permissions import IsDeliveryPartner
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from django.core import cache

from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender=Order)
def on_order_save(sender, instance, created, **kwargs):
    if created:
        d = DeliveryPartner.objects.filter(
            city=instance.address.city, on_duty=False).first()
        if d:
            d.on_duty = True
            d.save()
        instance.assigned_partner = d
        instance.save()

        data = {
            "order_id": instance.id,
            "status": instance.status,
            "assigned_partner": DeliveryPartnerSerializer(instance.assigned_partner).data,
            "address": AddressSerializer(instance.address).data,
            "latitude": None,
            "longitude": None
        }

        # Save the data to the cache
        cache.cache.set(instance.id, data)


LOCATION_DATA_EXPIRY = 5 * 60


class DeliveryLogConsumerAPIView(APIView):
    permission_classes = [IsDeliveryPartner]

    def get(self, request):
        processed_logs = []

        return Response({
            "logs": processed_logs
        }, status=200)


# class OrderDeliveryStatusView(RetrieveAPIView):

#     serializer_class = OrderDeliveryStatusSerializer
#     lookup_field = "id"
#     queryset = Order.objects.all()

#     def get_object(self):
#         return super().get_object()

#     def check_object_permissions(self, request, obj):
#         if (request.user.id != obj.user.id):
#             self.permission_denied(
#                 request, message="You can't do that", code=403)
#         return super().check_object_permissions(request, obj)


class DriverLocationAPIView(APIView):

    def get(self, request, order_id):

        if dat := cache.cache.get(order_id):
            return Response(dat, status=200)
        return Response({"error": "Location not found"}, status=404)

    def post(self, request, order_id):
        # p = IsDeliveryPartner()
        # if not p.has_permission(request, self):
        #     return Response({"error": "You can't do that"}, status=403)

        serializer = OrderDeliveryLocationSerializer(data=request.data)
        if (serializer.is_valid(raise_exception=True)):
            if data := cache.cache.get(order_id):
                data["latitude"] = request.data["latitude"]
                data["longitude"] = request.data["longitude"]
                n_s = OrderDeliveryStatusSerializer(data=data)
                n_s.is_valid(raise_exception=True)
                data = n_s.data
                # Use django's caching system
                cache.cache.set(order_id, n_s.data,
                                timeout=LOCATION_DATA_EXPIRY)

            # The data is not yet preset so we have to fetch it from the db
            else:
                order = Order.objects.get(id=order_id)
                data = {"order_id": order.id,
                        "status": order.status,
                        "assigned_partner": DeliveryPartnerSerializer(order.assigned_partner).data,
                        "address": AddressSerializer(order.address).data,
                        "latitude": request.data["latitude"],
                        "longitude": request.data["longitude"]
                        }

                cache.cache.set(order_id, data, timeout=LOCATION_DATA_EXPIRY)

            return Response(data)

        return Response({"error": "Cannot update location"}, status=500)
