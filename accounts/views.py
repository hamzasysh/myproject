from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.conf import settings
from django.http import JsonResponse
from pymongo import MongoClient
from myproject.my_globals.mongo_client import *
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from accounts.utils.helpers import *
from rest_framework import status
import time


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
    


import json
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from json.decoder import JSONDecodeError

@csrf_exempt
def add_data(request,extra_info):
    # For GET request
    if request.method == 'GET':
        data = request.GET.dict()
    # For POST request
    elif request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        try:
            data = json.loads(body_unicode)
        except JSONDecodeError:
            print(f"Failed to decode JSON. Raw data: {body_unicode}")
            data = {"error": "Invalid JSON data"}
    else:
        data = {'error': 'Invalid request method'}

    print(data)
    print(f"Extra info: {extra_info}")
    return JsonResponse(data)

def delay(request):
    # pass
    # while True:
    #     print('iii')
    time.sleep(200)
    #return JsonResponse({'error':'too much time taken'})