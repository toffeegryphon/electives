from django.db import models

class Course(models.Model):
    # Unique ID, Major, Code, SectionTitle e.g. CS##498001
    uid = models.CharField(max_length = 10, unique = True, primary_key = True)
    # TODO Should still have SUBJ and CODE since frequently accessed
    name = models.CharField(max_length = 50)
    section_title = models.CharField(max_length = 300, unique = True, blank = True, null = True)
    description = models.TextField()

    def __str__(self):
        subject = self.uid[:4].strip('#')
        number = self.uid[4:7]
        sec_t = ' ' + self.section_title if self.section_title else ''
        return f'{subject} {number}{sec_t}'

class Link(models.Model):
    pid = models.IntegerField()
    prerequisite = models.ForeignKey(
        Course, related_name = 'fulfilments', on_delete = models.CASCADE
    )
    target = models.ForeignKey(
        Course, related_name = 'prerequisites', on_delete = models.CASCADE
    )

    def __str__(self):
        return f'{self.pid}: {str(self.prerequisite)} > {str(self.target)}'

