from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

# When user logs in
@receiver(user_logged_in)
def handle_user_login(sender, request, user, **kwargs):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "online", {
            "type": "status_update",
            "data": {
                "user_id": user.id,
                "status": "online"
            }
        }
    )
@receiver(user_logged_out)
def handle_user_logout(sender, request, user, **kwargs):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "online", {
            "type": "status_update",
            "data": {
                "user_id": user.id,
                "status": "offline"
            }
        })
