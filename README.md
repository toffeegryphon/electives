# electives
Website to filter CS tech electives by prerequisites

General Idea: Directed Graph

Nodes: Courses
Edges: IsPrerequisite

=== Course ===
- int UID
- str Title
- str Description
- str Link
- str Hours
- List fulfils (e.g. teamwork, swe, ...)
- OutEdges (Prerequisite To)
- InEdges (Requires)
	- if same ID, OR operator, else AND operator
- def GetPrerequisites()
	list of InEdges
	apply OR to all with same ID
	apply AND to result of prev and all others
	return
- def GetCoursesICanTake() 2 ideas:
	1. Have an IsTaken tag on clientside, if true consider as empty node
	2. Implement a CanTake for each course and call for all courses

=== Edge ===
- Prerequisite
- Destination UID (only required for JSONifying)
- ID
