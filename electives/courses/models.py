from django.db import models

class Course(models.Model):
    # Unique ID, Major, Code, SectionTitle e.g. CS##498001
    uid = models.CharField(max_length = 10, unique = True, primary_key = True)
    name = models.CharField(max_length = 50)
    section_title = models.CharField(max_length = 300, unique = True)
    description = models.TextField()

class Link(models.Model):
    pid = models.IntegerField()
    prerequisite = models.ForeignKey(
        Course, related_name = 'fulfilments', on_delete = models.CASCADE
    )
    target = models.ForeignKey(
        Course, related_name = 'prerequisites', on_delete=models.CASCADE
    )

