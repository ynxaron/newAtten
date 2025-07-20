from django.contrib.auth.models import User
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.base import ContentFile
import json
import base64
import traceback
from employees.utils import token_required
from employees.models import Employee, EmployeeInfo

@csrf_exempt
@token_required
def updatedb(request):

    print("  -->UPDATEDB HIT!")
    # Checking if Our method is POST or Not
    if request.method != "POST":
        print("Request must only be POST")
        return JsonResponse({"error": "ONLY POST METHOD ALLOWED"}, status=405)

    # Checking if Our User is Authenticated or Not
    if not request.user.is_authenticated:
        print("You must be logged in")
        return JsonResponse({"error": "USER NOT LOGGED IN"}, status=401)

    # Checking if Our User is staff (admin) or Not
    if not request.user.is_staff:
        print("You must be logged in as admin")
        return JsonResponse({"error": "ONLY ADMIN CAN UPDATE DB"}, status=403)

    data = json.loads(request.body)
    # Declaring arrays of fields to update three tables at once. Each entry in each array is a

    # Declaring user_data to update User (built in)
    user_field = ["username", "email", "password"]
    user_data = {key: data[key] for key in user_field if key in data}

    # Declaring employee_date to update Employee (in ./models)

    employee_field = [
        "username", "total_leaves_left", "total_leaves_taken",
        "paid_overtime", "total_absent", "joined",
        "job", "skills", "online",
        "profile_img", "latest_commit", "codeReviews",
        "featuresTicked", "codeEvaluation", "checkin_time",
        "break_time", "checkout_time", "hours_by_day",
        "hours_by_week", "hours_by_month", "hours_by_years"
    ]
    employee_data = {key: data[key] for key in employee_field if key in data and key != 'profile_img'}

    if "base64," not in data['profile_img']:
        raise Exception("Uploaded Profile Image not properly encoded")

    thisimg = data['profile_img'].split("base64,")[1]
    thisimg = base64.b64decode(thisimg)
    thisimg = ContentFile(thisimg, name="profile_img.png")

    employee_data['profile_img'] = thisimg

    # Declaring employee_info to update EmployeeInfo (in ./models)
    employee_info_field = [
        "username",
        "age",
        "email",
        "joined",
        "latest_commit",
        "checkin_time",
        "break_time",
        "checkout_time"]
    employee_info_data = {key: data[key] for key in employee_info_field if key in data}

    def return_error(e: Exception):
        print("Exception: ", e)
        traceback.print_exc()
        return JsonResponse({"error" : f"User Creation Failed: {str(e)}"}, status=400)

    try:
        user = User.objects.create_user(**user_data)
    except Exception as e:
        return return_error(e)

    try:
        Employee.objects.create(**employee_data);
    except Exception as e:
        return return_error(e)

    try:
        EmployeeInfo.objects.create(user=user, **employee_info_data);
    except Exception as e:
        return return_error(e)

    return JsonResponse({"message": "Databases were updated"}, status=200)
