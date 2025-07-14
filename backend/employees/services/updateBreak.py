from django.http.response import JsonResponse
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def updateBreakdb(request):
    if request.method != "GET":
        return JsonResponse({"error": "The Request Method must be GET"}, status=405)

    user = request.user
    if not user.is_authenticated:
        return JsonResponse({"error": "Request must be logged in"}, status=401)

    thisemp = request.user.employee
    try:
        data = request.data
        checkInTime = data['checkInTime']
        checkOutTime = data['checkOutTime']
        breaks = data['breaks']
    except Exception as e:
        return JsonResponse({"error": "Incorrect Formating\n\n" + str(e)}, status=400)

    currentTime = datetime.now().strftime("%m-%d")

    thisemp.checkin_time[currentTime] = checkInTime
    thisemp.checkout_time[currentTime] = checkOutTime
    thisemp.break_time[currentTime] = breaks

    thisemp.save()

    return JsonResponse({"message": "Daily Info Charts Updated"}, status=200)
