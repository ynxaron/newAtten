from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def applyLeavedb(request):
    if request.method != "POST":
        return JsonResponse({"error": "Request Method Must Be Get"}, status=405)

    if not request.user.is_authenticated:
        return JsonResponse({"error": "Request User must be logged in"}, status=401)

    if request.user.is_staff or request.user.is_superuser:
        return JsonResponse({"error": "Request User must NOT be admin"}, status=401)

    try:
        data = json.loads(request.body)
        leave_range = data['leave_range']
        leave_message = data['leave_message'];
    except Exception as e:
        return JsonResponse({"error": "Incorrect Formating\n" + str(e)}, status=400)

    print("The Requested Leave Range Is: " + leave_range)

    emp_info = request.user.employeeinfo
    if emp_info.applied_for_leave is not None:
        return JsonResponse({"error": "Already Applied For Leave"}, status=409)

    try:
        [begin_date, end_date] = leave_range.split('->')
        [_, _] = begin_date.split('-')
        [_, _] = end_date.split('-')

    except Exception as e:
        return JsonResponse({"error": "Leave dates not correctly formatted\n" + str(e)}, status=400)

    leave_info = f"{leave_range};{leave_message}"
    emp_info.apply_for_leave = leave_info
    emp_info.save()

    return JsonResponse({"error": "Leave Info Updated...Wait For Admin To Grant It"})
