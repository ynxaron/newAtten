from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def updatePassworddb(request):
    if request.method != "POST":
        return JsonResponse({"error": "ONLY POST METHOD ALLOWED FOR AUTH"}, status=405)

    if not request.user.is_authenticated:
        return JsonResponse({"error": "You Must be Logged In"}, status=401)

    try:
        data = json.loads(request.data)
        current_password = data["current_password"]
        new_password = data["new_password"]
    except Exception as e:
        return JsonResponse({"error": "Incorrectly Formatted\n" + str(e)}, status=400)

    if not request.user.check_password(current_password):
        return JsonResponse({"error": "WRONG PASSWORD"}, status=403)

    request.user.set_password(new_password)
    request.user.save()

    return JsonResponse({"message": "Password Has Been Updated"}, status=200)
