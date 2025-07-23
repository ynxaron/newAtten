from rest_framework import serializers
from employees.models import Employee, EmployeeInfo
import base64
import os
from django.conf import settings

class EmployeeAdminSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    applied_for_leave = serializers.SerializerMethodField()
    hours_by_month = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = [
            "id", "username", "image", "codeReviews", "featuresTicked",
            "codeEvaluation", "job", "skills", "joined",
            "hours_by_month", "applied_for_leave"
        ]

    def get_image(self, obj):
        try:
            with open(obj.profile_img.path, "rb") as img_raw:
                img_encoded = base64.b64encode(img_raw.read()).decode("utf-8")
                return f"data:image/png;base64,{img_encoded}"
        except Exception:
            fallback_path = os.path.join(settings.BASE_DIR, 'assets', 'login-pic.jpeg')
            try:
                with open(fallback_path, "rb") as fallback_img:
                    img_encoded = base64.b64encode(fallback_img.read()).decode("utf-8")
                    return f"data:image/jpeg;base64,{img_encoded}"
            except Exception:
                return None  # You could raise an error or return a placeholder string here

    def get_applied_for_leave(self, obj):
        try:
            empinfo = EmployeeInfo.objects.get(user=obj.user)
            return empinfo.applied_for_leave or "NOT DEFINED"
        except EmployeeInfo.DoesNotExist:
            return "NOT DEFINED"

    def get_hours_by_month(self, obj):
        return list(obj.empinfo.hour_by_month.values_list('info', flat=True))
