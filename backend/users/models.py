from django.contrib.auth.models import AbstractBaseUser
from django.db import models

class User(AbstractBaseUser):
    username = models.CharField(
        unique=True,
        max_length=30,
        verbose_name='Username'
    )

    USERNAME_FIELD = "username"
