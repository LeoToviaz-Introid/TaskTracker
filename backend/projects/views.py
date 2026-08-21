from django.db.models import Count
from django.db.models import Q
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
        tasks = project.get_tasks_by_priority().select_related("project")
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
        # falta añadir total de tareas y tareas completadas

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.select_related("project")
    serializer_class = TaskSerializer

class DashboardStatsView(APIView):
    """
    Vista para obtener las estadísticas del dashboard.

    URL: stats/
    """
    def get(self, request):
        task_stats = Task.objects.aggregate(
            total=Count("id"),
            pending=Count("id", filter=Q(estado=Task.Estado.PENDING)),
            completed=Count("id", filter=Q(estado=Task.Estado.COMPLETED)),
        )
        projects = (
            Project.objects
            .annotate(
                total_tasks=Count("tasks"),
                completed_tasks=Count("tasks", filter=Q(tasks__estado=Task.Estado.COMPLETED)),
            )
            .order_by("-created_at")[:10]
        )
        urgent_tasks = (
            Task.objects
            .filter(priority=Task.Priority.HIGH)
            .exclude(estado=Task.Estado.COMPLETED)
            .select_related("project")[:20]
        )
        return Response({
            "total_projects": Project.objects.count(),
            "total_tasks": task_stats["total"],
            "pending_tasks": task_stats["pending"],
            "completed_tasks": task_stats["completed"],
            "projects": ProjectSerializer(projects, many=True).data,
            "urgent_tasks": TaskSerializer(urgent_tasks, many=True).data,
        })
