from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Employee

# When user logs in
@receiver(user_logged_in)
def handle_user_login(sender, request, user, **kwargs):
    try:
        employee = Employee.objects.get(user=user)
        employee.online = True
        employee.save()
        print(f"{user.username} marked as online.")
    except Employee.DoesNotExist:
        print(f"No matching Employee found for user {user.username} on login.")

# When user logs out
@receiver(user_logged_out)
def handle_user_logout(sender, request, user, **kwargs):
    try:
        employee = Employee.objects.get(user=user)
        employee.online = False
        employee.save()
        print(f"{user.username} marked as offline.")
    except Employee.DoesNotExist:
        print(f"No matching Employee found for user {user.username} on logout.")
