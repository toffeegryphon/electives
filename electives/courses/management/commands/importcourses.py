#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from django.core.management.base import BaseCommand, CommandError

from courses import FILL_PRE, FILL_POST
from courses.models import Course

from csv import DictReader

ARG_CSV_PATH = 'csvfilename'
HELP = 'Adds courses from a CSV file following Prof. Fagen\'s dataset format, a header row is required'

class HEADER:
    SUBJECT =   'Subject'
    NUMBER  =   'Number'
    NAME    =   'Name'
    DESC    =   'Description'
    INFO    =   'Section Info'
    SEC_T   =   'Section Title'

class Command(BaseCommand):
    help = HELP

    _sections = {}

    def add_arguments(self, parser):
        parser.add_argument(ARG_CSV_PATH, type=str)

    def handle(self, *args, **options):
        path = options[ARG_CSV_PATH]
        with open(path) as csv:
            # TODO Throw stderr if no header.
            reader = DictReader(csv)
            for row in reader:
                sec_t = row[HEADER.SEC_T]
                sec_t = sec_t if sec_t else None

                uid = self._generate_uid(row[HEADER.SUBJECT], row[HEADER.NUMBER], row[HEADER.SEC_T])
                Course.objects.get_or_create(
                    uid=uid,
                    defaults={
                        'name': row[HEADER.NAME],
                        'section_title': sec_t,
                        'description': row[HEADER.DESC]
                    }
                )
            # TODO Success message

    # TODO Remove Magic values and test, maybe abstract to own methods as well
    # TODO This belongs in model!! REFACTOR the create
    def _generate_uid(self, subject: str, number: int, sec_t: str) -> str:
        uid = ''

        # Subject Padding
        uid += FILL_PRE * (4 - len(subject)) + subject

        # Course Number
        uid += str(number)

        # Section Title Deambiguation
        if not sec_t:
            uid += '0' * 2
        else:
            # TODO Too tired to think, find some better way
            # This currently does not work with bulk_create
            courses = Course.objects.filter(uid__iregex=f'{uid}[0-9]{{2}}0$').order_by('-uid')
            existing = courses.filter(section_title=sec_t).first()
            if existing: return existing.uid

            sec_n = self._sections.get(uid)
            if sec_n is None:
                #  last = Course.objects.filter(uid__iregex=f'{uid}[0-9]{{2}}0$').order_by('-uid').first()
                last = courses.first()
                sec_n = int(last.uid[7:9]) if last else 1
                self._sections[uid] = sec_n

            self._sections[uid] += 1
            uid += '0' * (2 - len(str(sec_n))) + str(sec_n)

        # Unused values
        uid += FILL_POST * (10 - len(uid))

        return uid

