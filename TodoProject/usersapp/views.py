from django.shortcuts import render
from .serializers import CustomUserSerializer
from .models import CustomUser
from rest_framework.viewsets import ModelViewSet

class CustomUserViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
# Create your views here.
