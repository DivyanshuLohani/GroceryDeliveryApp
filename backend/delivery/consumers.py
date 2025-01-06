from channels.generic.websocket import AsyncWebsocketConsumer
from django.template import Context, Template
import json


class DeliveryConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("delivery", self.channel_name)

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("delivery", self.channel_name)

    async def send_notification(self, event):

        # Send Order details
        message = event["message"]

        await self.send(
            text_data=json.dumps(
                {
                    "type": "delivery_partner_request",
                    "message": ""
                }
            )
        )
