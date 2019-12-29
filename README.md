# A star visualizer
The purpose of this program is to visualize the A* pathfinding algorithm. In order to make the visualization more interesting and fun to look at, the program generates a maze and runs the algorithm through the maze.

## Usage
[Download info]
#### Key presses
`r`: resets the maze

`s`: solves the maze without animation, draws the shortest path

`k`: pause/play for solving the maze with animation

`n`: generates new maze

`1-9`: generates a maze at a different difficulty, `1` being the hardest, `9` being the easiest

## Topics explored
#### Maze generation
The program uses a DFS recursive backtracker to generate the maze. This method of maze generation typically creates a maze with long corridors and no loops. In order to introduce some more chaos, the generation algorithm loops selects a (random) number of squares located at random (though they are guaranteed to be in different rows) and breaks all walls around that square.
All of the maze generation code can be found in the `maze_gen.js` file.

#### Path finding
The program uses A* search to find the shortest path from the starting square (top left corner) to the end square (bottom right corner). In order to animate the search, the main loop of the A star algorithm is written as a separate function, replacing the while loop with a simple `if` statement, and this function is run in the `draw` function of p5js which runs continuously, achieving the same effect of a while loop.
All of the A* code can be found in the `a_star.js` file.
