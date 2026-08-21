from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet
from .views import ProjectTasksView
from .views import TaskViewSet
from .views import DashboardStatsView

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('stats/',
        DashboardStatsView.as_view(),
        name='dashboard-stats'),
    path('projects/<int:project_id>/tasks/',
        ProjectTasksView.as_view(),
        name='project-tasks'),
]
