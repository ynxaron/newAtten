"""
    This view is present here to give a detailed overview of each employee (for admin only)
    so that our frontend can access it to generate /admin view
"""
from django.http.response import JsonResponse
from employees.models import Employee
import base64
import logging
from django.conf import settings
import os

logger = logging.getLogger(__name__)

def adminViewdb(request):
    # Ensuring Method is GET
    if request.method != "GET":
        return JsonResponse({"error": "Only GET Method Allowed"}, status=405)

    user = request.user
    # Ensuring user is logged in, and is admin
    if not user.is_authenticated:
        return JsonResponse({"error": "Unauthorized Access. Login First as Admin"}, status=401)

    if not (user.is_staff or user.is_superuser):
        return JsonResponse({"error": "Unauthorized Access. Login First as Admin"}, status=401)

    # Getting all employee names
    allNames = list(Employee.objects.values_list('username', flat=True))
    empInfo = {} # This is what we would ultimately return, if everything goes well
    for empName in allNames:
        try:
            emp = Employee.objects.get(username=empName)
        except Exception as e:
            logger.error("Wasn't Able to GET User For Username `" + empName + "'\n" + str(e))
            return JsonResponse({"error": "Cannot Find User in DATABASE"}, status=404)

        # Opening the image as encoded, then if it fails opening the fall back image as encoded
        try:
            with open(emp.profile_img.path, "rb") as img_raw:
                img_encoded = base64.b64encode(img_raw.read()).decode("utf-8")
                img = f"data:image/png;base64,{img_encoded}"
        except Exception as err:
            logger.error("Wasn't Able to GET UserImage For USER '" + empName + "'\n" + str(err))
            image_path = os.path.join(settings.BASE_DIR, 'assets', 'login-pic.jpeg')
            try:
                with open(image_path, "rb") as imgRaw:
                    imgEncoded = base64.b64ecode(imgRaw.read()).decode("utf-8")
                    img = f"data:image/jpeg;base64,{imgEncoded}"
                    logger.error("Failed To GET User Image...Falling Back On DEFAULT IMAGE")
            except Exception as e:
                logger.error("Failed To Fall On DEFAULT IMAGE...\n" + str(e))
            return JsonResponse({"error": "Wasn't Able to Encode Image. Error: " + str(err)}, status=500)

        # Creating the dictionary
        thisEmpInfo = {
            "name": emp.username,
            "image": img,
            "codeReviews": emp.codeReviews,
            "featuresTicked": emp.featuresTicked,
            "codeEvaluation": emp.codeEvaluation,
            "job": emp.job,
            "skills": emp.skills,
            "joined": emp.joined,
            "hours_by_month": emp.hours_by_month,
        };

        # Setting the value of dictionary
        empInfo[empName] = thisEmpInfo

    return JsonResponse(empInfo, status=200)
