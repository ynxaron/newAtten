from django.http.response import JsonResponse
import logging
import base64
from django.conf import settings
import os

logger = logging.getLogger(__name__)

def getDefaultPicdb(request):
    if request.method != "GET":
        return JsonResponse({"error": "The Request MUST be GET"}, status=405)

    image_path = os.path.join(settings.BASE_DIR, 'assets', 'login-pic.jpeg')
    try:
        with open(image_path, "rb") as imgRaw:
            imgEncoded = base64.b64encode(imgRaw.read()).decode("utf-8");
            img = f"data:image/jpeg;base64,{imgEncoded}"
            return JsonResponse({"image": img}, status=200)
    except Exception as e:
        logger.error("Failed to GET FallBack/Default Image...");
        return JsonResponse({"error": "Could Not get original Image, nor fallback Image: " + str(e)}, status=500)
