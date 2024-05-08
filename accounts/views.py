from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from django.http import JsonResponse
from pymongo import MongoClient
import json
# Create your views here.

client = MongoClient(settings.HOST_URI)

def login(request):
    try:
        if request.method == 'POST':
            # Connect to MongoDB
            db = client[settings.DB]  # Database name
            user_collection = db['user']  # Collection name
            udoc=user_collection.find_one({'username':request.POST.get('username')})
            print(udoc)
            if udoc and udoc['password']==request.POST.get('password'):
                return render(request,'orders.html')
            else:
                return render(request,'login.html',{'error_message': 'Invalid username or password'})
        else:
            return render(request,'login.html')
    except Exception as e:
         return HttpResponse(str(e))

def order_list(request):
    if request.method=='POST':
        request_data = json.loads(request.body.decode('utf-8'))
        page_no = request_data.get('page_no')
        if page_no!=1:
            skip_count = (page_no - 1) * 30
        else:
            skip_count=0
        # Connect to MongoDB
        db = client[settings.DB]  # Database name
        orders_collection = db['orders']  # Collection name
        # Fetch documents from the collection
        orders = list(orders_collection.find({},{'_id':0}).skip(skip_count).limit(30))
        # Extract the first six fields from each document
        serialized_orders = []
        for order in orders:
            first_six_fields = dict(list(order.items())[:8])
            serialized_orders.append(first_six_fields)
        # Return JSON response
        return JsonResponse(serialized_orders, safe=False)
    return HttpResponse('INVALID_HTTP_REQUEST')
    