from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings

# Create your views here.


def login(request):
    try:
        if request.method == 'POST':
            username = request.POST.get('username')
            password = request.POST.get('password')
            if username==settings.UNAME and password==settings.PSWRD:
                return render(request,'orders.html')
            else:
                print(settings.UNAME+" "+settings.PSWRD)
                return render(request,'login.html',{'error_message': 'Invalid username or password'})
        else:
            return render(request,'login.html')
    except Exception as e:
         return HttpResponse(str(e))
    


