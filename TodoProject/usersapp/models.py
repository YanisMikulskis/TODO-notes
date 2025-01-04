from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin

class CustomUser(AbstractUser, PermissionsMixin):
    first_name = models.CharField(max_length=64)
    email = models.CharField(max_length=64, unique=True)
    last_name = models.CharField(max_length=64, blank=True)
    username = models.CharField(max_length=32, unique=True, blank=True)

    def __repr__(self):
        if not self.username:
            return self.first_name
        return self.username

# Create your models here.
