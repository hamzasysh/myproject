from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.conf import settings
from django.http import JsonResponse
from pymongo import MongoClient
from myproject.my_globals.mongo_client import *
import json
from accounts.utils.helpers import *
from rest_framework import status


def login(request):
    try:
        if request.method == 'POST':
            if login_helper(request):
                print('login successful')
                username=request.POST.get('username')
                request.session['username'] = username
                result = {"success": 1, "message": "Login Success","error_code":0}
                return render(request,'orders.html',result)
            else:
                print('login failed')
                result = {"success": 0, "message": "Incorrect Password or Username","error_code":1}
                return render(request,'login.html',result)
        elif request.method == 'GET':
            print('login page')
            return render(request,'login.html')
    except Exception as e:
        print('error on login page')
        result = {"success": 0, "message": str(e),"error_code":1}
        return JsonResponse(result,safe=False,status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

    
def order_list(request):
    try:
        username = request.session.get('username')
        if not username:
            print('user not found')
            result = {"success": 0, "message": "User not found","error_code":1}
            return JsonResponse(result, safe=False,status=status.HTTP_404_NOT_FOUND)
        if request.method=='POST':
            orders=orders_list_helper(request)
            if len(orders)>0:
                print('orders found')
                return JsonResponse(orders, safe=False,status=status.HTTP_200_OK)
            else:
                print('zero orders')
                result = {"success": 0, "message": "0 orders found","error_code":1}
                return JsonResponse(result, safe=False,status=status.HTTP_404_NOT_FOUND)
        print('invalid HTTP Request')
        result = {"success": 0, "message": "Invalid HTTP Request","error_code":1}
        return JsonResponse(result, safe=False,status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print('error on orders page')
        result = {"success": 0, "message": str(e),"error_code":1}
        return JsonResponse(result,safe=False,status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def logout(request):
    username = request.session.get('username')
    if username:
        print('logout')
        request.session.flush()
        return redirect('login')
    else:
        return redirect('login')