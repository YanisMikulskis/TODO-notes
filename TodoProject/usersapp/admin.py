from django.contrib import admin
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin
class CustomUserAdmin(UserAdmin):

    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'get_groups')
    def get_groups(self, obj):
        return ', '.join([group.name for group in obj.groups.all()])
    get_groups.short_description = 'Группы'
#
admin.site.register(CustomUser, CustomUserAdmin)





# Register your models here.
