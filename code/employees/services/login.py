import jwt
import datetime
from django.http.response import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import json

@csrf_exempt
def dblogin(request):
    if request.method != "POST":
        return JsonResponse({"error": "ONLY POST METHOD ALLOWED FOR AUTH"}, status=405)

    try:
        data = json.loads(request.body)
        useremail = data["email"]
        userpassword = data["password"]
    except:
        return JsonResponse({"error": "INVALID AUTH JSON. MAKE SURE YOU ARE SENDING DATA EXACTLY AS NEEDED"}, status=400)


    # Now, since the json has a useremail and password
    try:
        thisuser = User.objects.get(email=useremail)
    except:
        return JsonResponse({"error": "USER WITH EMAIL DOES NOT EXIST"}, status=404)
    # Now, the user with this email exists
    user = authenticate(request, username=thisuser.username, password=userpassword)
    if user is not None:
        login(request, user)
        payload = {
            'id': user.id,
            'username': user.username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        if isinstance(token, bytes):
            token = token.decode('utf-8')
        return JsonResponse({"message": "LOGIN SUCCESFULL!", "is_admin": user.is_staff, "is_user": True, "token": token}, status=200)

    return JsonResponse({"error": "WRONG PASSWORD"}, status=401)
