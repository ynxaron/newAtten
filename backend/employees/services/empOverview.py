import base64
from employees.models import Employee
from django.http import JsonResponse

def empOverviewdb(request, name):
    if request.method != "GET":
        return JsonResponse({"error": "Only GET Method Allowed"}, status=405)

    user = request.user
    if not user.is_authenticated:
        return JsonResponse({"error": "Unauthorized Access. Login Before Requesting"}, status=401)

    if user.is_staff or user.is_superuser:
        return JsonResponse({"error": "You Must NOT be Admin"}, status=403)

    try:
       thisuser = Employee.objects.get(username=name)
    except Employee.DoesNotExist:
       return JsonResponse({"error": "Incorrect NameEncoding. Make Sure Your Name Is Like 'John%20Doe'"}, status=400)

    try:
      with open(thisuser.profile_img.path, 'rb') as img:
          img_encodes = base64.b64encode(img.read()).decode("utf-8")
          data_uri = f"data:image/png;base64,{img_encodes}"
    except FileNotFoundError:
        return JsonResponse({"error": "File Address Does Not Exist"}, status=500)
    except PermissionError:
        return JsonResponse({"error": "Cannot Open File"}, status=500)
    except OSError as e:
        return JsonResponse({"error": "Error Happened While Opening File\n\n" + str(e)}, status=500)

    employeeOverview = {
        "photo": data_uri,
        "name": thisuser.username,
        "title": thisuser.job,
        "update": thisuser.latest_commit,
        "online": thisuser.online,
    }

    return JsonResponse(employeeOverview, status=200)
