from django.urls import re_path
from .consumers import OnlineConsumer

websocket_urlpatterns = [
    re_path(r'ws/online/$',OnlineConsumer.as_asgi())
]
