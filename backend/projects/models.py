from django.db import models

class Project(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    created_at = models.DateField(auto_now_add=True)

class Task(models.Model):
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
