#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('', views.CourseViewSet)

urlpatterns = [
    path('', include(router.urls))
]

