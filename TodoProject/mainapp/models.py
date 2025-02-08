from django.db import models
from usersapp.models import CustomUser

# Create your models here.
class ProjectModel(models.Model):
    name = models.CharField(verbose_name='Название', max_length=128, default='Default project')
    url_repo = models.URLField(max_length=200, verbose_name='Репозиторий с проектом', blank=True)
    users = models.ManyToManyField(CustomUser, verbose_name='Пользователи')
    def __str__(self):
        return f'Проект {self.name}'


class TODOModel(models.Model):
    project = models.ForeignKey(ProjectModel, verbose_name='Проект', on_delete=models.CASCADE)
    text = models.TextField(verbose_name='Текст заметки')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Created todo', editable=False)
    updated = models.DateTimeField(auto_now=True, verbose_name='Updated todo', editable=False)
    deleted = models.BooleanField(verbose_name='Deleted todo', default=False)
    user = models.ForeignKey(CustomUser, verbose_name='Кто пишет заметку', on_delete=models.CASCADE)
    active = models.BooleanField(verbose_name='Активность заметки', default=False)
    def __str__(self):
        return f'Заметка из проекта {self.project} от пользователя {self.user}\nСоздана {self.created}'

    def delete(self, *args, **kwargs):
        self.deleted = now()
        self.updated = now()
        self.save()

    class Meta:
        ordering = ('-created',)
