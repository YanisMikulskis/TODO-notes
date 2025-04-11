import time

from django.shortcuts import render
from .serializers import CustomUserSerializer
from .models import CustomUser
from rest_framework.viewsets import ModelViewSet
from .filters import CustomUserFilter
from .pagination import CustomUserPagination
from rest_framework import mixins, viewsets
from rest_framework.permissions import DjangoModelPermissions
from time import sleep



class CustomUserViewSet(mixins.ListModelMixin,
                        mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.CreateModelMixin,
                        mixins.DestroyModelMixin,
                        viewsets.GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    pagination_class = CustomUserPagination
    filterset_class = CustomUserFilter
    permission_classes = [DjangoModelPermissions]
# Create your views here.
