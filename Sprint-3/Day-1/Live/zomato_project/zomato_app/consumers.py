import json
from channels.generic.websocket import AsyncWebsocketConsumer

class OrderStatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.order_id = self.scope['url_route']['kwargs']['order_id']
        self.group_name = f'order_{self.order_id}'

        # Join the group
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave the group
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def order_status_update(self, event):
        status = event['status']

        # Send the order status back to the client
        await self.send(text_data=json.dumps({
            'order_status': status
        }))
