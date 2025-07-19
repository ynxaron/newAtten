import base64
from django.http.response import JsonResponse
from employees.models import Employee

def imagedb(request, name):
    if request.method != 'GET':
        return JsonResponse({"error": "Only GET Method Allowed"}, status=405)

    user = request.user
    if not user.is_authenticated:
        return JsonResponse({"error": "Unauthorized Access. Login Before Requesting"}, status=401)

    if user.is_staff or user.is_superuser:
        return JsonResponse({"error": "You must NOT be admin"}, status=403)

    try:
        thisuser = Employee.objects.get(username=name)
    except:
        return JsonResponse({"error": "Incorrect Encoding. Make sure your name is like John%Doe"}, status=400)

    try:
        with open(thisuser.profile_img.path, 'rb') as img:
            img_encodes = base64.b64encode(img.read()).decode("utf-8")
            data_uri = f"data:image/png;base64,{img_encodes}"
    except Exception as err:
        return JsonResponse({"error": "Wasn't Able to Encode Image. Error: " + str(err)}, status=500)

    return JsonResponse({"img": data_uri}, status=200)
