from django.http.response import JsonResponse
from django.conf import settings
import base64
import logging
import os

logger = logging.getLogger(__name__)

def djuboImgdb(request):
    if request.method != "GET":
        return JsonResponse({"error": "The Request MUST be GET"}, status=405)

    if not request.user.is_authenticated:
        return JsonResponse({"error": "You Must be logged in"}, status=401)

    image_path = os.path.join(settings.BASE_DIR, 'assets', 'djubo-cropped.png')
    try:
        with open(image_path, 'rb') as imgRaw:
            imgEncoded = base64.b64encode(imgRaw.read()).decode("utf-8");
            img = f"data:image/png;base64,{imgEncoded}"
            return JsonResponse({"image": img}, status=200)

    except Exception as e:
        logger.error("Failed To Retrieve the DJUBO-ICON Image...\n" + str(e))
        return JsonResponse({"error": "Failed To Retrieve the DJUBO-ICON Image..."}, status=500)
