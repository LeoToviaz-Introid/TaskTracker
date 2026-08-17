from rest_framework import serializers

from .models import Project
from .models import Task

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'created_at']
        read_only_fields = ['id', 'created_at']

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'project', 'estado', 'priority', 'created_at', 'due_date']
        read_only_fields = ['created_at']
