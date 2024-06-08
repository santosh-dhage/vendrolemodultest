from rest_framework import serializers
from .models import User,MQTTData, MOrder, MStatus, PaymentHistory,CustomEmail
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from rest_framework.response import Response
# from django.contrib.auth.models import User
from machinedataapp.serializers import RoleSerializer,CustomPermissionSerializer
class UserMasterSerializer(serializers.ModelSerializer):
    rolesname = RoleSerializer(many=True)
    permissions = CustomPermissionSerializer(many=True)
    class Meta:
        model = User
        fields = '__all__'
        # depth=3
    
class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

class VerifyOtpSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()

class ResetPasswordSerializer(serializers.Serializer):
    uidb64 = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField()
    
from django.contrib.auth import get_user_model

UserMaster = get_user_model()
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)
    confirm_new_password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        # Custom validation logic goes here, if needed
        return data

# class ForgotPasswordSerializer(serializers.Serializer):
#     email = serializers.EmailField()

# class ResetPasswordSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     new_password = serializers.CharField()
#     confirm_new_password = serializers.CharField()
#     otp = serializers.CharField()

class MStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = MStatus
        fields = '__all__'
        # depth=3

class MOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = MOrder
        fields = '__all__'
        # depth=3

class PaymentHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentHistory
        fields = '__all__'
        # depth=3

class MQTTDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MQTTData
        fields = '__all__'
        # depth=3

class CustomEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomEmail
        fields = '__all__'