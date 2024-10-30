from django.contrib.auth.models import User
from datetime import datetime
from rest_framework import serializers
from .models import Resume, Experience, Formation

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'role', 'firm', 'period', 'description']

    def validate_role(self, value):
        if not value:
            raise serializers.ValidationError("O cargo (role) não pode ser vazio.")
        return value

class FormationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formation
        fields = ['id', 'institute', 'course', 'semester']

    def validate_institute(self, value):
        if not value:
            raise serializers.ValidationError("O nome da instituição é obrigatório.")
        return value

    def validate_semester(self, value):
        if not (1 <= value <= 12):
            raise serializers.ValidationError("O semestre deve estar entre 1 e 12.")
        return value

class ResumeSerializer(serializers.ModelSerializer):
    experiences = ExperienceSerializer(many=True, required=False)
    formations = FormationSerializer(many=True, required=False)

    class Meta:
        model = Resume
        fields = ['user_id', 'name', 'birth_date', 'email', 'phone', 'address', 'experiences', 'formations', 'user']
        extra_kwargs = {"user": {"read_only": True}}

    def validate_name(self, value):
        if not value:
            raise serializers.ValidationError("O nome é obrigatório.")
        return value

    def validate_email(self, value):
        if "@" not in value:
            raise serializers.ValidationError("Insira um endereço de email válido.")
        return value

    def validate_phone(self, value):
        if not str(value).isdigit() or len(str(value)) < 10:
            raise serializers.ValidationError("O número de telefone deve ter pelo menos 10 dígitos e ser numérico.")
        return value

    def create(self, validated_data):
        experiences_data = validated_data.pop('experiences', [])
        formations_data = validated_data.pop('formations', [])
        resume = Resume.objects.create(**validated_data)

        for experience_data in experiences_data:
            Experience.objects.create(resume=resume, **experience_data)

        for formation_data in formations_data:
            Formation.objects.create(resume=resume, **formation_data)

        return resume
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['experiences'] = ExperienceSerializer(instance.experience_set.all(), many=True).data
        representation['formations'] = FormationSerializer(instance.formation_set.all(), many=True).data
        return representation
