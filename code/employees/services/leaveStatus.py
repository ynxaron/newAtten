from django.views import View
from employees.models import EmployeeInfo
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def toggleLeavedb(request, name, toaccept):
    if request.method != "POST":
        return JsonResponse({"error": "The Request Must be POST"}, status=405)

    user = request.user
    # Ensuring user is logged in, and is admin
    if not user.is_authenticated:
        return JsonResponse({"error": "Unauthorized Access. Login First as Admin"}, status=401)

    if not (user.is_staff or user.is_superuser):
        return JsonResponse({"error": "Unauthorized Access. Login First as Admin"}, status=401)

    try:
        thisemployeeinfo = EmployeeInfo.objects.get(username=name)
    except Exception as e:
        return JsonResponse({"error": "Cannot Find The Name, Make Sure It Exists"}, status=400)


    if toaccept == "ACCEPT":
        if thisemployeeinfo.leave_accepted:
            return JsonResponse({"message": "Leave Already Accepted"}, status=200)
        else:
            thisemployeeinfo.leave_accepted = True
            return JsonResponse({"message": "Leave Accepted"}, status=200)
    else:
        if not thisemployeeinfo.leave_accepted:
            return JsonResponse({"message": "Leave Denied Already"}, status=200)
        else:
            thisemployeeinfo.leave_accepted = False
            return JsonResponse({"message": "Leave Denied"}, status=200)
