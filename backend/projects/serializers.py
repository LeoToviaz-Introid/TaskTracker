from rest_framework import serializers

from .models import Project
from .models import Task

class ProjectSerializer(serializers.ModelSerializer):
    total_tasks = serializers.SerializerMethodField()
    completed_tasks = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'created_at', 'total_tasks', 'completed_tasks']
        read_only_fields = ['id', 'created_at']

    def get_total_tasks(self, obj):
        return getattr(obj, "total_tasks", None)

    def get_completed_tasks(self, obj):
        return getattr(obj, "completed_tasks", None)

class TaskSerializer(serializers.ModelSerializer):
    project_name = serializers.CharField(source="project.name", read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'project', 'project_name', 'estado', 'priority', 'created_at', 'due_date']
        read_only_fields = ['created_at']
