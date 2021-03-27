# electives
Website to filter CS tech electives by prerequisites

Backend: https://toffeegryphon.pythonanywhere.com/courses

General Idea: Directed Graph

Nodes: Courses
Edges: IsPrerequisite

## To Build Backend
1. Git clone
2. Generate your own secret key.
3. Add secret key under SECRET\_KEY entry in .env (same dir as manage.py)
4. Pip install from requirements.txt
5. python3 manage.py runserver
6. Visit localhost:8000/admin (may require creating own superuser first)

## To Build Frontend
1. Git clone
2. npm install
3. npm start

idea on visualization
map style, click on a node to mark as taken, cool animation to show what can be taken next

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
