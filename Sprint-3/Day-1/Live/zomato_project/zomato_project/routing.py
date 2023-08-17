from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path
from zomato_app.consumers import OrderStatusConsumer

application = ProtocolTypeRouter({
    'websocket': URLRouter([
        re_path(r'^ws/order_status/(?P<order_id>\d+)/$', OrderStatusConsumer.as_asgi()),
    ]),
})
