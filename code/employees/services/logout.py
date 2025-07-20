from django.contrib.auth import logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from employees.utils import token_required

@csrf_exempt
@token_required
def logoutdb(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST Methods Allowed"}, status=405)

    if not request.user.is_authenticated:
        return JsonResponse({"error": "Login to Logout First"}, status=401)

    logout(request)

    response = JsonResponse({"message": "Logged out successfully"}, status=200)
    response.delete_cookie("sessionid")
    response.delete_cookie("csrftoken")

    return response
