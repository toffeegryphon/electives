from typing import List, Set
from . import QUERY_TAKEN
from .filters import UIDSearchFilter
from .models import Course
from .serializers import CourseSerializer
from django.db.models import Q, Count
from rest_framework import viewsets, mixins

# TODO Include search or something like if id is not length 10 try to parse as course

class CourseViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Course.objects.all().order_by('uid')
    serializer_class = CourseSerializer

    # Search
    search_fields = ['uid']
    filter_backends = (UIDSearchFilter,)

    def get_queryset(self):
        queryset = self.queryset
        if self.action == 'list':
            taken_string = self.request.GET.get(QUERY_TAKEN)
            if taken_string is not None:
                # TODO This definitely needs testing
                taken_uids = set(taken_string.split(','))
                queryset = self._filter_allowed(queryset, taken_uids)
        return queryset

    # TODO Should probably be in own filters.py, but you will reside here for now
    # TODO SKY HIGH IMPORTANT TO TEST
    def _filter_allowed(self, queryset, taken_uids: Set[str]):
        # Exclude no prerequisites since we do not need to do anything
        qs = queryset
        qs = qs\
            .filter(prerequisites__isnull=False)\
            .distinct()
        
        # TODO Probably have some better way to do this...
        # Get all ids of allowed
        uids = set()
        for course in qs:
            if course.is_allowed(taken_uids): uids.add(course.uid)

        # Return no prerequisites, or allowed
        query = Q(prerequisites__isnull=True) | Q(uid__in=uids)

        return queryset.filter(query).distinct()
