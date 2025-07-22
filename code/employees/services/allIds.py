from django.http import JsonResponse
from employees.models import Employee
from employees.utils import token_required


@token_required
def allIdsdb(request):
    if request.method != "GET":
        return JsonResponse({"error": "Only GET allowed"}, status=405)

    user = request.user
    if not user.is_authenticated:
        return JsonResponse(
            {"error": "Unauthorized Access. Login Before Requesting"}, status=401
        )

    userids = list(
        Employee.objects.exclude(username__in=["admin"]).values_list("id", flat=True)
    )
    return JsonResponse(userids, safe=False)
