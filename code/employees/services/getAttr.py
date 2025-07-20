from django.http import JsonResponse
from employees.utils import token_required

@token_required
def getAttrdb(request, attr):
    if request.method != "GET":
        return JsonResponse({"error": "The Request Must be GET"}, status=405)

    user = request.user
    if not user.is_authenticated:
        return JsonResponse({"error": "Requester Must Be Logged In"}, status=401)

    if user.is_staff or user.is_superuser:
        return JsonResponse({"error": "Admins Not Allowed"}, status=403)

    thisemp = request.user.employee

    if attr.startswith('hours_by'):
        requested_attr = None;
        if attr == "hours_by_day":
            requested_attr = list(thisemp.empinfo.hour_by_day.values_list('info', flat=True))

        elif attr == "hours_by_week":
            requested_attr = list(thisemp.empinfo.hour_by_week.values_list('info', flat=True))

        elif attr == "hours_by_month":
            requested_attr = list(thisemp.empinfo.hour_by_month.values_list('info', flat=True))

        elif attr == "hours_by_years":
            requested_attr = list(thisemp.empinfo.hour_by_year.values_list('info', flat=True))

        else:
            return JsonResponse({"error": "Server Error, Incorrectly Formatted Datebase"}, status=500)

        return JsonResponse({"attr": requested_attr})

    if not hasattr(thisemp, attr):
        return JsonResponse({"error": "This Employee Does Not Have Requested Attribrute"}, status=400)


    requested_attr = getattr(thisemp, attr)
    return JsonResponse({"attr": getattr(thisemp, attr)})
