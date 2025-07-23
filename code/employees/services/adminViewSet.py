from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework import status
from employees.models import Employee
from employees.serializers import EmployeeAdminSerializer
import logging

logger = logging.getLogger(__name__)

class AdminViewSet(ViewSet):
    permission_classes = [IsAdminUser]

    def list(self, request):
        try:
            employees = Employee.objects.all()
            serializer = EmployeeAdminSerializer(employees, many=True)
            data = {str(emp["id"]): emp for emp in serializer.data}
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error in AdminViewSet.list: {e}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
