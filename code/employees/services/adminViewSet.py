"""
This ViewSet provides a detailed overview of each employee (for admin only),
so that our frontend can access it to generate /admin view.
"""

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework import status
from employees.models import Employee, EmployeeInfo
import base64
import logging
from django.conf import settings
import os

logger = logging.getLogger(__name__)

class AdminViewSet(ViewSet):
    permission_classes = [IsAdminUser]

    def list(self, request):
        employees = Employee.objects.all()
        empInfo = {}

        for emp in employees:
            empId = emp.id

            # Try to encode the user's profile image
            try:
                with open(emp.profile_img.path, "rb") as img_raw:
                    img_encoded = base64.b64encode(img_raw.read()).decode("utf-8")
                    img = f"data:image/png;base64,{img_encoded}"
            except Exception as err:
                logger.error(f"Wasn't Able to GET UserImage For USER `{empId}`\n{err}")
                fallback_path = os.path.join(settings.BASE_DIR, 'assets', 'login-pic.jpeg')
                try:
                    with open(fallback_path, "rb") as fallback_img:
                        img_encoded = base64.b64encode(fallback_img.read()).decode("utf-8")
                        img = f"data:image/jpeg;base64,{img_encoded}"
                        logger.warning(f"Falling back to DEFAULT IMAGE for user {empId}")
                except Exception as e:
                    logger.error(f"Failed To Fall Back On DEFAULT IMAGE for user {empId}\n{e}")
                    return Response(
                        {"error": f"Wasn't able to encode image. Error: {str(e)}"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )

            # Get EmployeeInfo for additional field
            try:
                employeeuser = Employee.objects.get(id=empId).user
                employeeinfo = EmployeeInfo.objects.get(user=employeeuser)
                appliedForLeave = employeeinfo.applied_for_leave or "NOT DEFINED"
            except Exception as e:
                logger.error(f"Failed to get EmployeeInfo for user {empId}\n{e}")
                return Response(
                    {"error": f"Wasn't able to get EmployeeInfo. Error: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            emp_data = {
                "id": emp.id,
                "name": emp.username,
                "image": img,
                "codeReviews": emp.codeReviews,
                "featuresTicked": emp.featuresTicked,
                "codeEvaluation": emp.codeEvaluation,
                "job": emp.job,
                "skills": emp.skills,
                "joined": emp.joined,
                "hours_by_month": list(emp.empinfo.hour_by_month.values_list('info', flat=True)),
                "applied_for_leave": appliedForLeave
            }

            empInfo[str(empId)] = emp_data

        return Response(empInfo, status=status.HTTP_200_OK)
