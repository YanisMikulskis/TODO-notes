import json


from django.test import TestCase, LiveServerTestCase
from mixer.backend.django import mixer
from rest_framework.test import APITestCase, APIClient, APISimpleTestCase, APIRequestFactory, force_authenticate
from .models import ProjectModel, TODOModel
from usersapp.models import CustomUser
from .views import ProjectModelViewSet, TODOModelViewSet
from django.contrib.auth import get_user_model
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import TODOModelSerializer
import requests

class by_TestCase(TestCase):

    def setUp(self):
        self.url_project = '/api/project/'
        self.get_list = {'get':'list'}
        self.get_user = get_user_model()
        self.user = self.get_user.objects.create_user(username = 'test user', password='1234')

    def test_factory_project(self):
        factory = APIRequestFactory()
        request = factory.get(self.url_project)
        view = ProjectModelViewSet.as_view(self.get_list)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    def test_apiclient_project(self):

        project = ProjectModel.objects.create(name='Проект x')
        project.users.set([self.user])
        client = APIClient()
        response = client.get(f'/api/project/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class by_ApiTestCase(APITestCase):

    def setUp(self):
        self.admin_name = ['admin', 'admin@admin.ru', 'admin12345']
        self.get_user = get_user_model()
        self.user = self.get_user.objects.create_user(username='test_user', password='1234')

        self.project = ProjectModel.objects.create(name='Проект x')
        self.project.users.set([self.user])
        self.url_project = f'/api/project/'
        self.url_todo = f'/api/todo/'
        self.put_data = {'name': 'Проект У',
                        'url_repo': self.project.url_repo,
                        'users': list(self.project.users.values_list('id', flat=True))}
        # self.put_data = {'name': 'Проект У',
        #                  'url_repo': self.project.url_repo,
        #                  'users': 5}

    def admin_login(self):
        CustomUser.objects.create_superuser(*self.admin_name)
        self.client.login(username='admin', password='admin12345')


    def test_get_project(self):
        response = self.client.get(self.url_project)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_projects_admin(self):
        self.admin_login()
        response = self.client.put(f'{self.url_project}{self.project.id}/', self.put_data,format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        new_project = ProjectModel.objects.get(name='Проект У')
        self.assertEqual(new_project.name, 'Проект У')

class by_mixer(by_ApiTestCase):

    def setUp(self):
        super().setUp()

        self.project_for_todo = mixer.blend(ProjectModel)
        self.user_for_todo = mixer.blend(get_user_model())
        self.project_for_todo.users.add(self.user_for_todo)
        self.todo = mixer.blend(TODOModel, user=self.user_for_todo, project=self.project_for_todo)

        self.new_todo_obj = mixer.blend(TODOModel)
        self.new_todo_obj = {
            'id':self.todo.id,
            'project':self.project_for_todo.id,
            'text':self.new_todo_obj.text,
            'created': self.new_todo_obj.created.isoformat() if self.new_todo_obj.created else None,
            'updated': self.new_todo_obj.updated.isoformat() if self.new_todo_obj.updated else None,
            'deleted': self.new_todo_obj.deleted,
            'user': self.user_for_todo.id,
            'active': self.new_todo_obj.active,
        }
    def test_mixer_project(self):
        project = mixer.blend(ProjectModel)
        self.admin_login()
        response = self.client.put(f'{self.url_project}{project.id}/', self.put_data,format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        new_project = ProjectModel.objects.get(name='Проект У')
        self.assertEqual(new_project.name, 'Проект У')
    def test_mixer_todo(self):
        self.admin_login()
        response = self.client.put(f'{self.url_todo}{self.todo.id}/', self.new_todo_obj, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class live_tests(LiveServerTestCase):
    def setUp(self):
        self.project = mixer.blend(ProjectModel)
        self.url_project = f'{self.live_server_url}/api/project/{self.project.id}'
    def test_get_live(self):
        print(f'url  = {self.url_project}')
        response = requests.get(self.url_project)
        self.assertEqual(response.status_code, 200)





# Create your tests here.
