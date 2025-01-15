from django.core.management.base import BaseCommand
from usersapp.models import CustomUser


class Command(BaseCommand):
    help = 'Создание пользовательской команды'

    def handle(self, *args, **options):
        if not CustomUser.objects.filter(username='admin').exists():
            CustomUser.objects.create_superuser(
                username='admin',
                email='admin@example.ru',
                password='admin123'
            )
            self.stdout.write(self.style.SUCCESS('Суперюзер создан: admin'))
        else:
            self.stdout.write(self.style.SUCCESS('Суперюзер admin уже создан!'))
        for i in range(1, 6):
            username = f'fantom_user №{i}'
            email = f'fantom_mail fantom_№{i}@mail.ru'
            if not CustomUser.objects.filter(username=username).exists():
                CustomUser.objects.create(
                    username = username,
                    email = email,
                    password = f'123'
                )
                self.stdout.write(self.style.SUCCESS(f'Тестовый пользователь №{i} создан'))
            else:
                self.stdout.write(self.style.SUCCESS(f'Тестовые юзеры уже созданы!'))
                break
        else:
            self.stdout.write(self.style.SUCCESS(f'Все юзеры созданы!'))