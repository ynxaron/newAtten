from django.http.response import JsonResponse
from employees.models import Employee
import base64

def allEmpValue(request):
    if request.method != "GET":
        return JsonResponse({"error": "Only GET Methods Alloed"}, status=401)
    if not request.user.is_authenticated:
        return JsonResponse({"error": "You Must Be Logged In"}, status=401)

    empInfos = []
    for emp in Employee.objects.all():
        try:
            with open(emp.profile_img.path, "rb") as img_raw:
                img_encodes = base64.b64encode(img_raw.read()).decode("utf-8")
                img = f"data:image/png;base64,{img_encodes}"
        except FileNotFoundError:
            return JsonResponse({"error": "File Address Does Not Exist"}, status=500)
        except PermissionError:
            return JsonResponse({"error": "Cannot Open File"}, status=500)
        except OSError as e:
            return JsonResponse({"error": "Error Happened While Opening File\n\n" + str(e)}, status=500)

        thisEmpInfo = {
            "photo": img,
            "name": emp.username,
            "title": emp.job,
            "update": emp.latest_commit,
            "online": emp.online
        }

        empInfos.append(thisEmpInfo)

    return JsonResponse({"message": empInfos}, status=200)
