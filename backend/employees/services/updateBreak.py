"""
    This View Exists to take our checkin, checkout, update requests
"""
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from employees.models import EmpBreak, EmpStats
import json
import datetime

@csrf_exempt
def updateBreakdb(request):
    if request.method != "POST":
        return JsonResponse({"error": "The Request Method must be GET"}, status=405)

    user = request.user
    if not user.is_authenticated:
        return JsonResponse({"error": "Request must be logged in"}, status=401)

    thisemp = request.user.employee
    try:
        data = json.loads(request.body)
        checkInTime = data['checkInTime']
        checkOutTime = data['checkOutTime']
        breaks = data['breaks']
    except Exception as e:
        return JsonResponse({"error": "Incorrect Formating\n\n" + str(e)}, status=400)

    currentDate = datetime.datetime.now().date()

    # Defining a normalyzing function that would take time in raw string, and create TimeField()
    def normalize_time(time):
        try:
            [hour, minute] = time.split(':')
        except:
            return JsonResponse({"error": "Invalid Time Formating"}, status=400)

        return datetime.time(hour=hour, minute=minute)

    # Checking If There already exists for currentDate an entry
    if EmpStats.objects.filter(employee=thisemp, date=currentDate).exists():
        return JsonResponse({"Internal Server Error, You Have Already Logged In..."}, status=500)

    thisempstats = EmpStats.objects.create(
        employee=thisemp,
        date=currentDate,
        checkin_time=normalize_time(checkInTime),
        checkout_time=normalize_time(checkOutTime))

    # Checking If break can be broken apart into break begin time and break end time
    try:
        [begin_break_time, end_break_time] = breaks;
    except:
        return JsonResponse({"error": "Incorrectly Formatted Break"}, status=400)

    EmpBreak.objects.create(
        empstats=thisempstats,
        date=currentDate,
        begin_time=normalize_time(begin_break_time),
        end_time=normalize_time(end_break_time)
    )
