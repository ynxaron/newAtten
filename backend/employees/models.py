from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    # UPPER PETTY TOKENS
    total_leaves_taken = models.IntegerField()
    total_leaves_left = models.IntegerField()
    paid_overtime = models.IntegerField()
    total_absent = models.IntegerField()
    # PROFILE CARD
    ## LEFT
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    username = models.CharField(max_length=100)
    skills = models.CharField(max_length=400)
    job = models.CharField(max_length=300)
    joined = models.DateField()
    ## RIGHT
    codeReviews = models.JSONField()
    featuresTicked = models.JSONField()
    codeEvaluation = models.JSONField()
    # BASIC APP
    online = models.BooleanField(default=False)
    profile_img = models.ImageField(blank=True, null=True)
    # CUSTOMS
    latest_commit = models.CharField(max_length=250)
    # DEFINING STATS
    checkin_time = models.JSONField()
    break_time = models.JSONField()
    checkout_time = models.JSONField()
    # DEFINING GRAPHS
    hours_by_day = models.JSONField()
    hours_by_week = models.JSONField()
    hours_by_month = models.JSONField()
    hours_by_years = models.JSONField()

class EmployeeInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    age = models.IntegerField(null=True)
    email = models.EmailField()
    joined = models.DateField()
    latest_commit = models.CharField(max_length=500)
    checkin_time = models.JSONField()
    break_time = models.JSONField()
    checkout_time = models.JSONField()
