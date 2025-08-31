from rest_framework.serializers import ModelSerializer
from .models import CustomUser


class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser

        fields = '__all__'

    def create(self, validated_data):
        # Убираем 'username' из данных, если оно передано
        username = validated_data.pop('username', None)
        # Устанавливаем username вручную на основе email
        email = validated_data.get('email')

        if not username:
            username = f'NOT username, email: {email}'
        # Создаем пользователя
        user = CustomUser.objects.create(username=username, **validated_data)
        return user

class CustomUserSerializerVer2(ModelSerializer):
    class Meta:
        model = CustomUser

        fields = [
            'first_name',
            'last_name',
            'username',
            'email',
            'is_superuser',
            'is_staff'
        ]

    def create(self, validated_data):
        # Убираем 'username' из данных, если оно передано
        username = validated_data.pop('username', None)
        # Устанавливаем username вручную на основе email
        email = validated_data.get('email')

        if not username:
            username = f'NOT username, email: {email}'
        # Создаем пользователя
        user = CustomUser.objects.create(username=username, **validated_data)
        return user