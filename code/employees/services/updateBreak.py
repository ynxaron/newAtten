"""
    This View Exists to take our checkin, checkout, update requests
"""
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from employees.models import EmpBreak, EmpStats
import json
import datetime
from employees.utils import token_required

@csrf_exempt
@token_required
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

    print("BACKEND: Check In Time: " + str(checkInTime) + " Type = " + str(type(checkInTime)))
    print("BACKEND: Check Out Time: " + str(checkOutTime) + " Type = " + str(type(checkOutTime)))
    print("BACKEND: Breaks: " + str(breaks) + " Type = " + str(type(breaks)))

    # Defining a normalyzing function that would take time in raw string, and create TimeField()
    def normalize_time(time):
        try:
            [hour, minute] = time.split(':')
        except:
            return JsonResponse({"error": "Invalid Time Formating"}, status=400)

        return datetime.time(hour=int(hour), minute=int(minute))

    # Checking If There already exists for currentDate an entry
    if EmpStats.objects.filter(employee=thisemp, date=currentDate).exists():
        return JsonResponse({"Internal Server Error, Make Sure You Have Not Already Checked Out"}, status=500)

    thisempstats = EmpStats.objects.create(
        employee=thisemp,
        date=currentDate,
        checkin_time=normalize_time(checkInTime),
        checkout_time=normalize_time(checkOutTime))


    for thisbreak in breaks:
        EmpBreak.objects.create(
            empstats=thisempstats,
            date=currentDate,
            begin_time=normalize_time(thisbreak[0]),
            end_time=normalize_time(thisbreak[1])
        )

    return JsonResponse({"message": "Breaks Updated Succesfully!"}, status=200)
