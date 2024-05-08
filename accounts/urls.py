# simple_django_app/hello_world/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('orders/', views.order_list, name='order-list'),

]
