"""
URL configuration for TodoProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import rest_framework.views
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from usersapp.views import CustomUserViewSet
from mainapp.views import ProjectModelViewSet, TODOModelViewSet
from django.views.generic import RedirectView
from rest_framework.authtoken import views
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView, TokenVerifyView)
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.routers import APIRootView


# router = DefaultRouter()
#
# router.register('usersapp', CustomUserViewSet)
# router.register('project', ProjectModelViewSet)
# router.register('todo', TODOModelViewSet)
# router.register('frontend-React', HttpResponseRedirect("http://localhost:3000/"))

# class FrontendLinkView(rest_framework.views.APIView):
#     def get(self, request):
#         return HttpResponse('<a href="http://localhost:3000/" target="_blank">Открыть фронт</a>')
#         # return Response({
#         #     'message': 'Ссылка на фронт',
#         #     'fron_url': "http://localhost:3000/"
#         # })

class CustomAPIRootView(APIRootView):
    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        response.data['frontend'] = "http://localhost:3000/"

        return response



class CustomRouter(DefaultRouter):
    APIRootView = CustomAPIRootView

router = CustomRouter()

router.register('usersapp', CustomUserViewSet)
router.register('project', ProjectModelViewSet)
router.register('todo', TODOModelViewSet)

urlpatterns = [
    path('', RedirectView.as_view(url='api/')),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),


]
