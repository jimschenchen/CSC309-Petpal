from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'confirm_password', 'user_type', 'avatar']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Password fields didn't match."})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)
        return User.objects.create_user(**validated_data)

class UserUpdateSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(style={'input_type': 'password'}, write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'avatar', 'user_type', 'email', 'name', 'address', 'phone_number', 'description', 'password', 'confirm_password', "avatar"]
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'email': {'required': False},
            'name': {'required': False},
            'address': {'required': False},
            'phone_number': {'required': False},
            'description': {'required': False}
        }

    def validate(self, data):
        if 'password' in data:
            if data['password'] != data.pop('confirm_password', None):
                raise serializers.ValidationError({"confirm_password": "Password fields didn't match."})
        return data

    def update(self, instance, validated_data):
        # Update user instance
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','avatar','user_type','name', 'email', 'address', 'phone_number', 'description']
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token

    def validate(self, attrs):
        authenticate_kwargs = {
            'email': attrs['email'],
            'password': attrs['password']
        }
        self.user = authenticate(**authenticate_kwargs)

        if self.user and self.user.is_active:
            data = super().validate(attrs)

            return data

        raise serializers.ValidationError('Unable to log in with provided email and password.')