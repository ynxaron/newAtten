from django.contrib.auth import logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def logoutdb(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST Methods Allowed"}, status=405)

    if not request.user.is_authenticated:
        return JsonResponse({"error": "Login to Logout First"}, status=401)

    logout(request)
    return JsonResponse({"message": "You Have Been Succesfully Logged Out"}, status=200)
