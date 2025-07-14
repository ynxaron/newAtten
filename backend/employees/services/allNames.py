from django.contrib.auth.models import User
from django.http import JsonResponse


def allNamesdb(request):
    if request.method != "GET":
        return JsonResponse({"error": "Only GET allowed"}, status=405)

    user = request.user
    if not user.is_authenticated:
        return JsonResponse(
            {"error": "Unauthorized Access. Login Before Requesting"}, status=401
        )

    usernames = list(
        User.objects.exclude(username="admin").values_list("username", flat=True)
    )
    return JsonResponse(usernames, safe=False)
