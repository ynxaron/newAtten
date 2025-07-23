from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from employees.services.adminViewSet import AdminViewSet

router = DefaultRouter()
router.register(r"adminViewSet", AdminViewSet, basename="adminViewSet")

urlpatterns = [
    path("", views.home),
    path("add/", views.update),
    path("login", views.login),
    path("get/<str:attr>", views.getAttr),
    path("overview/<int:id>", views.empOverview),
    path("image/<str:name>", views.image),
    path("allIds", views.allIds),
    path("getpic", views.getPic),
    path("adminView", views.adminView),
    path("getDefaultPic", views.getDefaultPic),
    path("getDjuboImg", views.djuboImg),
    path("logout", views.logout),
    path("updateProfile", views.updateProfile),
    path("updatePassword", views.updatePassword),
    path("updateBreak", views.updateBreak),
    path("applyLeave", views.applyLeave),
    path("toggleLeave/<int:userid>/<str:toaccept>", views.toggleLeave),
    path("", include(router.urls)),
]
