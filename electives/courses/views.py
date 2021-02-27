from .models import Course
from .serializers import CourseSerializer
from rest_framework import viewsets, permissions

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

