map_hours_by_day = {}
map_hours_by_week = {}
map_hours_by_month = {}
map_hours_by_years = {}

for emp in Employee.objects.all():
    map_hours_by_day[emp.pk] = emp.hours_by_day 
    map_hours_by_week[emp.pk] = emp.hours_by_week
    map_hours_by_month[emp.pk] = emp.hours_by_month
    map_hours_by_years[emp.pk] = emp.hours_by_years

for emp in Employee.objects.all():
    thisempinfo = EmpInfo.objects.create(employee=emp)

    for dayhours in map_hours_by_day[emp.pk]:
        HourByDay.objects.create(empinfo=thisempinfo, info=dayhours)

    for weekhours in map_hours_by_week[emp.pk]
        HourByWeek.objects.create(empinfo=thisempinfo, info=weekhours)

    for monthhour in map_hours_by_month[emp.pk]:
        HourByMonth.objects.create(empinfo=thisempinfo, info=monthhour)

    for yearhour in map_hours_by_years[emp.pk]:
        HourByYear.objects.create(empinfo=thisempinfo, info=yearhour)
