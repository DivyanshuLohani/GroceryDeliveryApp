from rest_framework import serializers
from .models import User, Address


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', 'is_superuser', 'is_staff',
                   'groups', 'user_permissions')


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, style={
                                     'input_type': 'password'})

    class Meta:
        model = User
        fields = ('email', 'password',
                  'phone_number', 'first_name', 'last_name')

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # Hash the password
        user.save()
        return user


class ProductReviewUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'created_at')


class AddressCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = (
            'label',
            'street_address',
            'city',
            'state',
            'zip_code',
            'country',
            'name',
            'phone_number',
            'latitude',
            'longitude',
        )

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
