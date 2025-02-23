from django_filters import rest_framework as filters
from .models import ProjectModel, TODOModel

class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')
    class Meta:
        model = ProjectModel
        print(f'model {model.objects.all()}')
        fields = ['name']


class TodoFilter(filters.FilterSet):
    project = filters.ModelChoiceFilter(queryset=ProjectModel.objects.none())
    class Meta:
        model = TODOModel
        fields = ['project']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.filters['project'].queryset = ProjectModel.objects.filter(todomodel__isnull=False).distinct()

