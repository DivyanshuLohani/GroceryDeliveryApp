from rest_framework import generics
from .permissions import IsDeliveryPartner
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from confluent_kafka import Consumer
from django.conf import settings
import json
import os
from datetime import datetime
from confluent_kafka import Producer
import json


producer = Producer({'bootstrap.servers': settings.KAFKA_HOST})


def send_driver_location(driver_id, location_data):
    producer.produce(settings.KAFKA_DRIVER_LOCATION, key=str(
        driver_id), value=json.dumps(location_data))
    producer.flush()


class DeliveryLogConsumerAPIView(APIView):
    permission_classes = [IsDeliveryPartner]
    consumer = Consumer({
        'bootstrap.servers': settings.KAFKA_HOST,
        'group.id': settings.KAFKA_DELIVERY_GROUP,
        'auto.offset.reset': 'earliest'
    })
    consumer.subscribe([settings.KAFKA_ORDER_COMPLETE_TOPIC])

    def get(self, request):
        processed_logs = []
        while True:
            msg = self.consumer.poll(1.0)
            if msg is None:
                break
            if msg.error():
                print(f"Consumer error: {msg.error()}")
                continue

            delivery_data = json.loads(msg.value().decode('utf-8'))
            order_id = delivery_data["order_id"]
            start_time = datetime.fromisoformat(delivery_data["start_time"])
            end_time = datetime.fromisoformat(delivery_data["end_time"])
            duration = (end_time - start_time).seconds

            # Save to database
            log = DeliveryLog.objects.create(
                order_id=order_id,
                time=duration,
                delivery_partner_id=delivery_data["driver_id"]
            )
            processed_logs.append({
                "order_id": log.order_id,
                "time": log.time,
                "delivery_partner_id": log.delivery_partner_id
            })

        return Response({
            "status": "Processed Kafka messages successfully",
            "logs": processed_logs
        }, status=200)


class DriverLocationAPIView(APIView):
    consumer = Consumer({
        'bootstrap.servers': settings.KAFKA_HOST,
        'group.id': settings.KAFKA_DELIVERY_GROUP,
        'auto.offset.reset': 'latest'
    })
    consumer.subscribe([settings.KAFKA_DRIVER_LOCATION])

    def get(self, request, order_id):
        while True:
            msg = self.consumer.poll(0.5)  # Poll Kafka for location updates
            if msg is None:
                break
            if msg.error():
                print(f"Consumer error: {msg.error()}")
                continue

            location_data = json.loads(msg.value().decode('utf-8'))
            if location_data.get("order_id") == int(order_id):
                return Response(location_data, status=200)

        return Response({"error": "Location not found"}, status=404)

    def post(self, request, order_id):
        p = IsDeliveryPartner()
        # if not p.has_permission(request, self):
        #     return Response({"error": "You can't do that"}, status=403)
        serializer = LocationDataSerializer(data=request.data)
        if (serializer.is_valid(raise_exception=True)):
            send_driver_location(self.request.user.id, serializer.data)
            return Response(serializer.data)

        return Response({"error": "Cannot update location"}, status=500)
