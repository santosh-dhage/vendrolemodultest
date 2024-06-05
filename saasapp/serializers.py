from .models import contactus,Complaint,ToolFeedback,ClientFeedback,Module,ModuleMapping
from rest_framework import serializers

class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model=contactus
        fields='__all__'


class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model=Complaint
        fields='__all__'


class ClientFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model=ClientFeedback
        fields='__all__'


class ToolFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model=ToolFeedback
        fields='__all__'

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model=Module
        fields='__all__'

class ModuleMappingSerializer(serializers.ModelSerializer):
    class Meta:
        model=ModuleMapping
        fields='__all__'

    def to_internal_value(self, data):
        if 'module_type' in data and isinstance(data['module_type'], str):
            try:
                # Attempt to convert the string representation of the primary key to an integer
                data['module_type'] = int(data['module_type'])
            except ValueError:
                # If conversion fails, raise a validation error
                raise serializers.ValidationError({"module_type": "Invalid pk value. Must be an integer."})
        return super().to_internal_value(data)