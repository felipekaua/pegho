from django.db import models
from django.contrib.auth.models import User

class Resume(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    name = models.CharField(max_length=100)
    birth_date = models.DateField()
    email = models.EmailField(max_length=100)
    phone = models.CharField(max_length=100)
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Experience(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)
    role = models.CharField(max_length=100) 
    firm = models.CharField(max_length=100) 
    period = models.CharField(max_length=100)
    description = models.CharField(max_length=255)  

    def __str__(self):
        return self.role

class Formation(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)
    course = models.CharField(max_length=100) 
    institute = models.CharField(max_length=100)  
    semester = models.IntegerField()

    def __str__(self):
        return self.course
