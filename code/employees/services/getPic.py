from employees.models import Employee
from django.http.response import JsonResponse
import base64
import logging

logger = logging.getLogger(__name__)

def getPicdb(request):
    if request.method != "GET":
        return JsonResponse({"error": "The Request Must be GET"}, status=405)

    user = request.user
    if not user.is_authenticated:
        return JsonResponse({"error": "You Must be Logged In"}, status=401)

    if user.is_superuser or user.is_staff:
        return JsonResponse({"error": "Your Must NOT be Admin"}, status=403)

    try:
        thisemp = Employee.objects.get(username=user.username)
    except Employee.DoesNotExist:
        defaultImgPath = "myapi/assets/login-pic.jpeg"
        try:
            with open(defaultImgPath, "rb") as imgRaw:
                logger.error("Failed To GET User Image...Falling Back On DEFAULT IMAGE")
                imgEncoded = base64.b64ecode(imgRaw.read()).decode("utf-8");
                img = f"data:image/jpeg;base64,{imgEncoded}"
                return JsonResponse({"image", img}, status=200)
        except Exception as e:
            logger.error("Failed to GET FallBack/Default Image...");
            return JsonResponse({"error": "Could Not get original Image, nor fallback Image: " + str(e)}, stautus=500)


    imgPath = thisemp.profile_img.path
    try:
        with open(imgPath, "rb") as img:
            encodedImg = base64.b64encode(img.read()).decode("utf-8")
        img_uri = f"data:image/png;base64,{encodedImg}"
    except Exception as e:
        return JsonResponse({"error": "Could Not Encode Image. " + str(e)}, status=500)

    return JsonResponse({"image": img_uri}, status=200)
