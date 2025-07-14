from django.http import JsonResponse

def getAttrdb(request, attr):
    if request.method != "GET":
        return JsonResponse({"error": "The Request Must be GET"}, status=405)

    user = request.user
    if not user.is_authenticated:
        return JsonResponse({"error": "Requester Must Be Logged In"}, status=401)

    if user.is_staff or user.is_superuser:
        return JsonResponse({"error": "Admins Not Allowed"}, status=403)

    thisemp = request.user.employee

    if not hasattr(thisemp, attr):
        return JsonResponse({"error": "This Employee Does Not Have Requested Attribrute"}, status=400)

    return JsonResponse({attr: getattr(thisemp, attr)})
