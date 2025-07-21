from django.db import models
from django.contrib.auth.models import User

################# Employee Sensetive View ####################
###########[This is The Employee Sensetive View]##############
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
    # BASIC APP
    online = models.BooleanField(default=True)
    profile_img = models.ImageField(blank=True, null=True)
    # CUSTOMS
    latest_commit = models.CharField(max_length=250)

    def __str__(self):
        return f"{self.username}"

##########################################
# Defining Break Information
class EmpStats(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='empstats')
    date = models.DateField()
    checkin_time = models.TimeField()
    checkout_time = models.TimeField()

    def __str__(self):
        return f"{self.employee.username} on {self.date}"

class EmpBreak(models.Model):
    empstats = models.ForeignKey(EmpStats, on_delete=models.CASCADE, related_name='empbreak')
    date = models.DateField()
    begin_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.empstats.employee.username}'s break on {self.begin_time} to {self.end_time} on {self.date}"

###########################################
# Employee Charts Info
class EmpInfo(models.Model):
    employee = models.OneToOneField(Employee, on_delete=models.CASCADE, related_name="empinfo")

    def __str__(self):
        return f"{self.employee.username} EmpInfo"

class HourByDay(models.Model):
    empinfo = models.ForeignKey(EmpInfo, on_delete=models.CASCADE, related_name="hour_by_day")
    info = models.FloatField(blank=True, null=True)

    def __str__(self):
        return f"{self.empinfo.employee.username} Hours By Day Value"

class HourByWeek(models.Model):
    empinfo = models.ForeignKey(EmpInfo, on_delete=models.CASCADE, related_name="hour_by_week")
    info = models.FloatField(blank=True, null=True)

    def __str__(self):
        return f"{self.empinfo.employee.username} Hours By Week Value"


class HourByMonth(models.Model):
    empinfo = models.ForeignKey(EmpInfo, on_delete=models.CASCADE, related_name="hour_by_month")
    info = models.FloatField(blank=True, null=True)

    def __str__(self):
        return f"{self.empinfo.employee.username} Hours By Month Value"


class HourByYear(models.Model):
    empinfo = models.ForeignKey(EmpInfo, on_delete=models.CASCADE, related_name="hour_by_year")
    info = models.FloatField(blank=True, null=True)

    def __str__(self):
        return f"{self.empinfo.employee.username} Hours By Years Valuel"

###################### Admin View #########################
############[ This Is The Admin View Model ]###############
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
    applied_for_leave = models.CharField(max_length=50, blank=True, null=True, help_text="Example: `06-12->06-15;Emergency Hospital Visit` or null")
    leave_accepted = models.BooleanField(default=False)
