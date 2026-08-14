from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

from .models import Project
from .models import Task
from .serializers import ProjectSerializer
from .serializers import TaskSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProjectTasksView(APIView):
    """
    Vista para obtener todas las tareas de un proyecto específico.
    
    URL: projects/<int:project_id>/tasks/
    """
    def get(self, request, project_id):
        project = get_object_or_404(Project, id=project_id)
        tasks = project.get_tasks_by_priority()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
        # falta añadir total de tareas y tareas completadas

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
