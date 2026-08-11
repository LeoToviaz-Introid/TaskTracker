from django.urls import path
from . import views

urlpatterns = [
    path("projects", views.projects),
    path("projects/<int:id>/", views.project),
]
