import graphene

from graphene_django import DjangoObjectType
from mainapp.models import ProjectModel, TODOModel
from usersapp.models import CustomUser
# class Query(graphene.ObjectType):
#     hello = graphene.String(default_value='hi todo')
#
# schema = graphene.Schema(query=Query)


class ProjectType(DjangoObjectType):
    class Meta:
        model = ProjectModel
        fields = '__all__'

class TodoType(DjangoObjectType):
    class Meta:
        model = TODOModel
        fields = '__all__'

class CustomUserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'
class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_todo = graphene.List(TodoType)
    all_users = graphene.List(CustomUserType)
    user_by_id = graphene.Field(CustomUserType, id=graphene.Int(required=True))

    todo_by_project_name = graphene.List(TodoType, project_name = graphene.String(required=True))

    user_by_text_in_todo = graphene.List(TodoType, text_todo = graphene.String(required=True))
    def resolve_all_projects(self, info):
        return ProjectModel.objects.all()

    def resolve_all_todo(self, info):
        return TODOModel.objects.all()

    def resolve_all_users(self, info):
        return CustomUser.objects.all()

    def resolve_user_by_id(self, info, id):
        try:
            return CustomUser.objects.get(id=id)
        except CustomUser.DoesNotExist:
            return None

    def resolve_todo_by_project_name(self, info, project_name = None):
        todo = TODOModel.objects.all()
        if project_name:
            todo = todo.filter(project__name = project_name)
        return todo

    def resolve_user_by_text_in_todo(self, info, text_todo = None):
        todo = TODOModel.objects.all()
        if text_todo:
            todo = todo.filter(text = text_todo)
        return todo



schema = graphene.Schema(query=Query)