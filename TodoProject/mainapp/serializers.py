from rest_framework.serializers import ModelSerializer
from .models import ProjectModel, TODOModel
from usersapp.serializers import CustomUserSerializer
from usersapp.models import CustomUser
from rest_framework.serializers import ValidationError
import textwrap
# from .camelCase_func import to_camel_case, to_snake_case
from rest_framework import serializers
from re import sub




def to_snake_case(camelCase):
    return sub(r'(?<!^)(?=[A-Z])', '_', camelCase).lower()


def CamelCase(snake_case):
    return ''.join(map(lambda x:x[0].upper() + x[1:] ,snake_case.split('_')))
class ProjectModelSerializer(ModelSerializer):

    def to_internal_value(self, data):
        """
        Преобразует входящие данные из camelCase в snake_case.
        """

        data_result = {

        }
        for k, v in data.items():
            if k != 'csrfmiddlewaretoken' and k != 'users':
                new_key = to_snake_case(k)
                data_result[new_key] = v
            else:
                data_result[k] = v

        return super().to_internal_value(data_result)

    def to_representation(self, instance):
        """
        Преобразует исходящие данные из snake_case в CamelCase.
        """
        data = super().to_representation(instance)
        data_result = {CamelCase(k): v for k, v in data.items()}
        return data_result

    class Meta:
        model = ProjectModel
        fields = '__all__'


class TODOModelSerializer(ModelSerializer):
    deleted_point = serializers.SerializerMethodField
    created = serializers.DateTimeField(format="%d.%m.%Y %H:%M:%S", read_only=True)
    updated = serializers.DateTimeField(format="%d.%m.%Y %H:%M:%S", read_only=True)
    deleted = serializers.DateTimeField(format="%d.%m.%Y %H:%M:%S", read_only=True)
    class Meta:
        model = TODOModel
        fields = '__all__'
        read_only_fields = ['id', 'created', 'updated', 'deleted']

#
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

    def get_deleted_point(self, obj):
        return obj.deleted