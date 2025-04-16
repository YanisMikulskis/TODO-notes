from django.shortcuts import render
from .serializers import ProjectModelSerializer, TODOModelSerializer
from .models import ProjectModel, TODOModel
from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from rest_framework.serializers import ValidationError
from .pagination import *
from .filters import *
from rest_framework import mixins, viewsets
from .renderers import CustomBrowsableAPIRenderer

from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly, DjangoModelPermissions



# class FrontendViewSet(ModelViewSet):
#     ...
class ProjectModelViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    parser_classes = [JSONParser, FormParser, MultiPartParser]
    queryset = ProjectModel.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPagination
    filterset_class = ProjectFilter
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]


class TODOModelViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, CustomBrowsableAPIRenderer]
    parser_classes = [JSONParser, FormParser, MultiPartParser]
    queryset = TODOModel.objects.all()
    serializer_class = TODOModelSerializer
    pagination_class = TodoPagination
    filterset_class = TodoFilter
    permission_classes = [DjangoModelPermissions]

    # def get_serializer_context(self):
    #     context = super().get_serializer_context()
    #     project_id = self.request.data.get('project') or self.request.query_params.get('project')
    #     if project_id:
    #         try:
    #             project = ProjectModel.objects.get(id=project_id)
    #             context['project'] = project
    #         except ProjectModel.DoesNotExist:
    #             raise ValidationError('нет такого проекта')
    #     return context
# Create your views here.
