<Student's name>
<Neptun code>
Web programming - assignment
This solution was submitted and created by the student above for the Web Programming course.
I declare that this solution is my own work. I did not copy or use it from a third party
solutions from third parties. I did not forward my solution to my fellow students, nor did I publish it.
Eötvös Loránd University Student Requirements System
(Organizational and Operational Regulations of ELTE, Volume II, § 74/C) states that as long as,
as long as a student has been working on the work - or at least a significant part of it - of another student
of another student's work as his or her own, it is a disciplinary offence.
The most serious consequence of a disciplinary offence is dismissal from the university.

### Minimal requirements (not accepted without them, 8 points)
[ ] Square grid: After starting the game, a 11x11 map with the mountains in the right place is drawn (1 point)
[ ] Placement: One of the map elements is randomly displayed with the corresponding time units (1 point)
[ ] Placement: We can place the map element on the grid (anywhere) (2 points).
[ ] Time: The game lasts up to 28 units of time, and by placing a map element down, you subtract the unit of time associated with that map element. (1 point)
[ ] Mission: you can calculate the score of the mission "Borderlands" (1 point).
[ ] End of game: for each mission, it calculates how many points have been scored for that mission (1 point)
[ ] End of game: At the end of the game, after the 28 time units have elapsed, it calculates the score for the basic mission "Borderlands" and displays the number of points scored (1 point)

### Normal requirements (12 points)
[ ] Placement: You can place the map element correctly (2 points).
[ ] Placement: The displayed map element can be rotated and placed in this way (1 point)
[ ] Placement: The displayed map element can be mirrored and placed in this way (1 point)
[ ] Mission: the mission "Edge of the forest" is displayed and can be scored (1 point)
[ ] Mission: the mission "Sleepy valley" is displayed and can be scored (1 point)
[ ] Mission: the mission "Watering potatoes" is displayed and can be scored (1 point)
[ ] Season: the game is played over 4 seasons, each season lasts for 7 time units, the mission cards for each season are highlighted. (1 point)
[ ] Season: At the end of each season, the end-of-season score is calculated from the corresponding mission cards and the game continues to the next season. (1 point)
[ ] Mission: 1 extra point can be earned by completely encircling the mountains, which will be added to your score at the end of each season (or game) (1 point)
[ ] End of game: at the end of the game, the total score over the four seasons is displayed (1 point).
[ ] Good-looking appearance (1 point)

### Extra requirements (10 points)
[ ] Mission: Tree line (1 point)
[ ] Mission: Watering canal (1 point)
[ ] Mission: Wealthy town(1 point)
[ ] Mission: Magicians' valley (1 point)
[ ] Mission: Empty site (1 point)
[ ] Mission: Terraced House (1 point)
[ ] Mission: Odd silos (1 point)
[ ] Mission: Rich countryside (1 point)
[ ] Save: The game saves its state continuously to localStorage. When loading a page, if there is such a saved state, it is loaded from there, otherwise a new game is started. At the end of the game, the saved state is deleted (2 points).