
from django.contrib import admin
from django.urls import path
from myapp.views import get_input

urlpatterns = [
    path('admin/', admin.site.urls),
    path('generate/' , view=get_input , name="input")
]
