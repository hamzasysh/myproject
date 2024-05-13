# simple_django_app/hello_world/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('orders/', views.order_list, name='orders'),
    path('logout/', views.logout, name='logout'),
    path('add_data/<str:extra_info>', views.add_data, name='add_data'),

]
