#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from .models import Course, Link
from rest_framework import serializers

class PrerequisiteField(serializers.RelatedField):
    # TODO Consider how to serialize
    # Probably JSON of uid, string, and link
    def to_representation(self, link: Link):
        p = link.prerequisite
        return {'uid': p.uid, 'str': str(p)}


class CourseSerializer(serializers.ModelSerializer):
    prerequisites = PrerequisiteField(many=True, read_only=True)

    class Meta:
        model = Course
        fields = '__all__'
