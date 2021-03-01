#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from .models import Course, Link
from rest_framework import serializers

class CourseSerializer(serializers.ModelSerializer):
    prereqs = serializers.ReadOnlyField()

    class Meta:
        model = Course
        fields = '__all__'

