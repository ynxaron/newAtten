from django.urls import path
from . import views

urlpatterns = [
    path("", views.home),
    path("add/", views.update),
    path("login", views.login),
    path("get/<str:attr>", views.getAttr),
    path("overview/<str:name>", views.empOverview),
    path("image/<str:name>", views.image),
    path("allnames", views.allnames),
    path("getpic", views.getPic),
    path("adminView", views.adminView),
    path("getDefaultPic", views.getDefaultPic),
    path("getDjuboImg", views.djuboImg),
    path("logout", views.logout),
    path("updateProfile", views.updateProfile),
    path("updatePassword", views.updatePassword),
    path("updateBreak", views.updateBreak),
    path("applyLeave", views.applyLeave),
    path("toggleLeave/<int:userid>/<str:toaccept>", views.toggleLeave)
]
