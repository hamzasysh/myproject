from myproject.my_globals.mongo_client import *
import json

def login_helper(request):
    user_collection = sea_turtle_db['user']  # Collection name
    username=request.POST.get('username')
    if username:
        udoc=user_collection.find_one({'username':username})
    else:
        return False
    password=request.POST.get('password')
    if password and udoc and udoc['password']==password:
        return True
    else:
        return False

def orders_list_helper(request):
    request_data = json.loads(request.body.decode('utf-8'))
    page_no = request_data.get('page_no')
    if page_no!=1:
        skip_count = (page_no - 1) * 30
    else:
        skip_count=0
    orders_collection = sea_turtle_db['orders']  # Collection name
    orders = list(orders_collection.find({},{'_id':0}).skip(skip_count).limit(30))
    #Extract the first six fields from each document
    serialized_orders = []
    for order in orders:
        first_six_fields = dict(list(order.items())[:4])
        serialized_orders.append(first_six_fields)
    return serialized_orders


