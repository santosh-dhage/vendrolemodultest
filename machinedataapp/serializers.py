from rest_framework import serializers
from .models import *
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__' 
        
class QrCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = QrCode
        fields ='__all__'
        # depth=3

class MachineMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineMaster
        fields = '__all__'
        # depth=3

class MachineUserMappingSerializer(serializers.ModelSerializer):
    class Meta:
        model= MachineUserMapping
        # fields=['machine']
        fields='__all__'
        # depth=3

class MachineUserMapping1Serializer(serializers.ModelSerializer):
    class Meta:
        model= MachineUserMapping
        fields='__all__'
        depth=3

class MachineUserMappingReportSerializer(serializers.ModelSerializer):
    class Meta:
        model= MachineUserMapping
        fields='__all__'



class StatsSerializer(serializers.Serializer):
    total_users = serializers.IntegerField()
    active_users = serializers.IntegerField()
    inactive_users = serializers.IntegerField()
    total_customers = serializers.IntegerField()
    active_customers = serializers.IntegerField()
    inactive_customers = serializers.IntegerField()
    total_machines = serializers.IntegerField()
    active_machines = serializers.IntegerField()
    inactive_machines = serializers.IntegerField()
    
class ColorStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model=ColorStore
        fields='__all__'

        
class ModelCapacitySerializer(serializers.ModelSerializer):
    class Meta:
        model=ModelCapacity
        fields='__all__'

class MachineMasterSerializer1(serializers.ModelSerializer):
    class Meta:
        model = MachineMaster
        fields = '__all__'


class TicketSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Ticket
        fields = '__all__'
    
    # def create(self, validated_data):
    #     # Handle creation of Ticket instance with machine_map separately
    #     machine_map_data = validated_data.pop('machine_map')
    #     ticket = Ticket.objects.create(**validated_data)
    #     ticket.machine_map = machine_map_data
    #     ticket.save()
    #     return ticket

    