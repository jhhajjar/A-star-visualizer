// Controls the state of the maze, algorithm, etc

// Set the variables for A* search
function setAStar() {
  greedy = false
  a_star = true
  bread = false
}

// Set the variables for BFS
function setBFS() {
  greedy = false
  a_star = false
  bread = true
}

// Set the variables for Greedy
function setGreedy() {
  greedy = true
  a_star = false
  bread = false
}

// Function to reset the maze
function reset() {
  begin = false
  done = false
  inProgress = false
  for (row of grid) {
    for (square of row) {
      square.reset()
      squaresThatChanged.push(square)
    }
  }
  openSet.empty()
  openSet.push(startingSquare)
  startingSquare.gScore = 0
}
