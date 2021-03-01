#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from .models import Course, Link
from rest_framework import serializers

class PrerequisiteSerializer(serializers.ModelSerializer):
    prerequisites = serializers.SerializerMethodField()

    class Meta:
        model = Link
        fields = ['prerequisites']

    def get_prerequisites(self, obj):
        # TODO Consider how to serialize
        # Probably JSON of uid, string, and link:
        p = obj.prerequisite
        return {'uid': p.uid, 'str': str(p)}

class CourseSerializer(serializers.ModelSerializer):
    prerequisites = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = '__all__'

    def get_prerequisites(self, obj):
        links = obj.prerequisites.all()
        tree = {}
        # TODO Probably should be doing some prefetching
        for link in links:
            if link.pid not in tree:
                tree[link.pid] = []
            tree[link.pid].append(PrerequisiteSerializer(link).data)
        return tree.values()
