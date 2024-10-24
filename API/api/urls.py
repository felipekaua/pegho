from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ResumeViewSet

router = DefaultRouter()
router.register(r'resume', ResumeViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]