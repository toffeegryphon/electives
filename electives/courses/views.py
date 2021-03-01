from typing import List
from . import QUERY_TAKEN
from .models import Course
from .serializers import CourseSerializer
from django.db.models import Q, Count
from rest_framework import viewsets, mixins
from rest_framework.decorators import action

class CourseViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Course.objects.all().order_by('uid')
    serializer_class = CourseSerializer

    def get_queryset(self):
        queryset = self.queryset
        if self.action == 'list':
            taken_string = self.request.GET.get(QUERY_TAKEN)
            if taken_string:
                # TODO This definitely needs testing
                taken_uids = taken_string.split(',')
                queryset = self._filter_allowed(queryset, taken_uids)
        return queryset

    # TODO Should probably be in own filters.py, but you will reside here for now
    def _filter_allowed(self, queryset, taken_uids: List[str]):
        # TODO
        # Exclude prereq null
        qs = queryset
        qs = qs\
            .filter(prerequisites__isnull=False)\
            .distinct()\
            .annotate(num_prereqs=Count('prerequisites'))\
            .filter(num_prereqs=1)
         
        # Annotate with prereq count and filter by count = 1
        # Annotate with prereq and filter by prereq in taken
        # Go through all remaining individually and check prereqs using any all
        # Filter by prereq null and all allowed ids
        return qs
