from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def updateProfiledb(request):
    if request.method != "POST":
        return JsonResponse({"error": "ONLY POST METHOD ALLOWED FOR AUTH"}, status=405)

    if not request.user.is_authenticated:
        return JsonResponse({"error": "You Must be Logged In"}, status=401)

    thisemp = request.user.employee
    thisempinfo = request.user.employeeinfo
    try:
        data = json.loads(request.body)
    except:
        return JsonResponse({"error": "Data Not Given/Unable to Parse"}, status=400)
    nameUpdated, emailUpdated, jobUpdated = False, False, False

    if data:
        if data.get('fullname'):
            thisemp.username = data.get('fullname')
            thisempinfo.username = data.get('fullname')
            request.user.username = data.get('fullname')
            nameUpdated = True
        if data.get('useremail'):
            request.user.email = data.get('useremail')
            emailUpdated = True
        if data.get('job'):
            thisemp.job = data.get('job')
            thisempinfo.job = data.get('job')
            jobUpdated = True

        thisemp.save()
        thisempinfo.save()
        request.user.save()

    if not (nameUpdated and emailUpdated and jobUpdated):
        updateStatusMsg = ("" if nameUpdated else "name ") + ("" if emailUpdated else "email ") + ("" if jobUpdated else "job")
        return JsonResponse({"message": "Some Fields '" + updateStatusMsg + "' were not updated"}, status=207)

    return JsonResponse({"message": "All Fields Updated"}, status=200)
