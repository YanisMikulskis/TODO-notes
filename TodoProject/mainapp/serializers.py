from rest_framework.serializers import ModelSerializer
from .models import ProjectModel, TODOModel
# from usersapp.serializers import CustomUserSerializer
from usersapp.models import CustomUser
from rest_framework.serializers import ValidationError
import textwrap


class ProjectModelSerializer(ModelSerializer):
    # users = NewCustomUserSerializer(many=True, read_only=True)

    class Meta:
        model = ProjectModel
        fields = '__all__'

class TODOModelSerializer(ModelSerializer):
    class Meta:
        model = TODOModel
        fields = '__all__'
        read_only_fields = ['id', 'created', 'updated', 'deleted']

    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     project = self.context.get('project')
    #     if project:
    #         self.fields['user'].queryset = project.users.all()



    def validate_user(self, user):
        project = self.initial_data.get('project') # проект, который выбран в селекторе (точнее его id)
        if not project:
            raise f'Проект обязателен'
        try:
            project = ProjectModel.objects.get(id=project)
        except:
            raise ValidationError(f'Нет такого проекта')
        users_project = [i for i in project.users.all()]
        if user not in users_project:
            if users_project:
                raise ValidationError(f'Юзер не является участником проекта. \n В данном проекте выберите из '
                                        f'списка {users_project}')
            else:
                raise ValidationError(f'Данный проект не ведет ни один пользователь! Заметки могут оставлять только'
                                      f'пользователи, прикрепленные к данному проекту')
        return user