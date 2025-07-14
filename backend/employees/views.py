from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render

# Importing Services
from employees.services.updatedb import updatedb
from employees.services.login import dblogin
from employees.services.getAttr import getAttrdb
from employees.services.empOverview import empOverviewdb
from employees.services.adminView import adminViewdb
from employees.services.imagedb import imagedb
from employees.services.allNames import allNamesdb
from employees.services.getPic import getPicdb
from employees.services.getDefaultPic import getDefaultPicdb
from employees.services.djuboImg import djuboImgdb
from employees.services.logout import logoutdb
from employees.services.updateProfile import updateProfiledb
from employees.services.updatePassword import updatePassworddb
from employees.services.updateBreak import updateBreakdb


# Logic For Handling Logins
@csrf_exempt
def login(request):
    return dblogin(request)


# Creating A Default Check View Here
def home(request):
    return render(request, 'index.html')

# Updating DB
@csrf_exempt
def update(request):
    print(" --> UPDATE HIT!!")
    return updatedb(request)

def getAttr(request, attr):
    print("   --> GET ATTR HIT: " + attr)
    return getAttrdb(request, attr)

def empOverview(request, name):
    return empOverviewdb(request, name)

def image(request, name):
    return imagedb(request, name)

def allnames(request):
    return allNamesdb(request)

def getPic(request):
    return getPicdb(request)

def adminView(request):
    return adminViewdb(request)

def getDefaultPic(request):
    return getDefaultPicdb(request)

def djuboImg(request):
    return djuboImgdb(request)

@csrf_exempt
def logout(request):
    return logoutdb(request)

@csrf_exempt
def updateProfile(request):
    return updateProfiledb(request)

@csrf_exempt
def updatePassword(request):
    return updatePassworddb(request)

@csrf_exempt
def updateBreak(request):
    return updateBreakdb(request)
