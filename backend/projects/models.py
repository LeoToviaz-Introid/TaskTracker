from django.db import models
from django.db.models import Case
from django.db.models import Value
from django.db.models import When
from django.db.models import IntegerField

class Project(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    created_at = models.DateField(auto_now_add=True)

    def get_tasks_by_priority(self):
        return self.tasks.all().by_priority()

class Task(models.Model):
    class QuerySet(models.QuerySet):
        def by_priority(self):
            return self.alias(
                priority_order=Case(
                    When(priority=Task.Priority.HIGH, then=Value(1)),
                    When(priority=Task.Priority.MEDIUM, then=Value(2)),
                    When(priority=Task.Priority.LOW, then=Value(3)),
                    default=Value(4),
                    output_field=IntegerField(),
                )
            ).order_by('priority_order')
    objects = QuerySet.as_manager()

    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='tasks'
    )
    # clase que contiene choices para el campo estado,
    # el campo estado solo podrá tener uno de los valores
    # presentes en esta clase
    class Estado(models.TextChoices):
        PENDING = 'pending'
        IN_PROGRESS = 'in_progress'
        COMPLETED = 'completed'
    estado = models.CharField(
        max_length=11,  # la longitud de la elección más larga
        choices=Estado.choices,
        default=Estado.PENDING,
    )
    class Priority(models.TextChoices):
        LOW = 'low'
        MEDIUM = 'medium'
        HIGH = 'high'
    priority = models.CharField(
        max_length=6,
        choices=Priority.choices,
        default=Priority.MEDIUM
    )
    created_at = models.DateField(auto_now_add=True)
    due_date = models.DateField()
