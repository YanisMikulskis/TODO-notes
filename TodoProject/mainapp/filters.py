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
    start_date = filters.DateFilter(field_name='created_at', lookup_expr='gte')
    end_date = filters.CharFilter(field_name='created_at', lookup_expr='lte')

    class Meta:
        model = TODOModel
        fields = ['project', 'start_date', 'end_date']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.filters['project'].queryset = ProjectModel.objects.filter(todomodel__isnull=False).distinct()

