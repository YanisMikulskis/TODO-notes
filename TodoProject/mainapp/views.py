from django.shortcuts import render
from .serializers import ProjectModelSerializer, TODOModelSerializer
from .models import ProjectModel, TODOModel
from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.parsers import JSONParser, FormParser
from rest_framework.serializers import ValidationError

class ProjectModelViewSet(ModelViewSet):
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    # parser_classes = [JSONParser, FormParser]
    queryset = ProjectModel.objects.all()
    serializer_class = ProjectModelSerializer






class TODOModelViewSet(ModelViewSet):
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    # parser_classes = [JSONParser, FormParser]
    queryset = TODOModel.objects.all()
    serializer_class = TODOModelSerializer
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
