from django.contrib import admin
import employees.models as thismodel

# Register your models here.
admin.site.register(thismodel.Employee)
admin.site.register(thismodel.EmpStats)
admin.site.register(thismodel.EmpBreak)
admin.site.register(thismodel.EmpInfo)
admin.site.register(thismodel.HourByDay)
admin.site.register(thismodel.HourByWeek)
admin.site.register(thismodel.HourByMonth)
admin.site.register(thismodel.HourByYear)
