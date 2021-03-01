from typing import List, Set

from django.db import models

from . import FILL_PRE

class Course(models.Model):
    # Unique ID, Major, Code, SectionTitle e.g. CS##498001
    uid = models.CharField(max_length = 10, unique = True, primary_key = True)
    # TODO Should still have SUBJ and CODE since frequently accessed
    name = models.CharField(max_length = 50)
    section_title = models.CharField(max_length = 300, unique = True, blank = True, null = True)
    description = models.TextField()

    @property
    def prereqs(self):
        links = self.prerequisites.all().select_related()
        tree = {}
        for link in links:
            if link.pid not in tree:
                tree[link.pid] = []
            tree[link.pid].append(link.to_dict())
        return tree.values()
    
    def _prereqs(self) -> List[Set[str]]:
        return [set(o['uid'] for o in ors) for ors in self.prereqs]

    # TODO High priority test
    def is_allowed(self, uids: Set[str]) -> bool:
        # AND OR
        allowed = all([uids.intersection(ors) for ors in self._prereqs()])
        return allowed

    def __str__(self):
        subject = self.uid[:4].strip(FILL_PRE)
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

    def to_dict(self) -> dict:
        # TODO Consider how to serialize
        # Probably JSON of uid, string, and link:
        p = self.prerequisite
        return {'uid': p.uid, 'str': str(p)}

    def __str__(self):
        return f'{self.pid}: {str(self.prerequisite)} > {str(self.target)}'

