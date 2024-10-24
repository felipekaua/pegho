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
        fields = ['role', 'firm', 'period', 'description']

class FormationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formation
        fields = ['institute', 'course', 'semester']

class ResumeSerializer(serializers.ModelSerializer):
    experiences = ExperienceSerializer(many=True, required=False)
    formations = FormationSerializer(many=True, required=False)

    class Meta:
        model = Resume
        fields = ['name', 'birth_date', 'email', 'phone', 'address', 'experiences', 'formations', 'user']
        extra_kwargs = {"user": {"read_only": True}}

    def create(self, validated_data):
        print("Dados validados:", validated_data)
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



