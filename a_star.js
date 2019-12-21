
function fullAStar() {
  while(!done) {
    aStarLoop()
  }
}

// The main loop in the A star algorithm
function aStarLoop() {
  if(!openSet.isEmpty() && !done) {
    // Get the node with the lowest fscore
    var current = openSet.pop()
    current.setInFocus()
    // Check for equality
    if(current === endSquare) {
      console.log("DONE!")
      backtrack(endSquare)
      // parent = endSquare
      done = true
    } else {
      // Loop through neighbors
      for (neighbor of getNeighborsA(current)) {
        tentativeG = current.gScore + 1 // All edges have weight 1

        // If we have found a better path, record it
        if(tentativeG < neighbor.gScore) {
          neighbor.parent = current
          neighbor.gScore = tentativeG
          neighbor.fScore = neighbor.gScore + heuristic(neighbor, endSquare)

          // Add neighbor if we haven't seen, else update set
          if(!openSet.has(neighbor)) {
            neighbor.setInFrontier()
            openSet.push(neighbor)
          } else {
            openSet._siftDown()
          }
        }
      }
    }
  }
}


// Function to backtrack from ending node to find path
function backtrack(square) {
  parent = square
  while(parent != null) {
    parent.inPath = true
    parent = parent.parent
  }
}


// Gets neighbors for A star search
function getNeighborsA(square) {
  // simple variables
  var neighbors = []
  var x = square.x
  var y = square.y

  // Get correct neighbors
  if(inRange(x-squareWidth,y) && !square.lwall) {
    neighbors.push(grid[x-squareWidth][y])
  }
  if(inRange(x+squareWidth,y) && !square.rwall) {
    neighbors.push(grid[x+squareWidth][y])
  }
  if(inRange(x,y-squareWidth) && !square.uwall) {
    neighbors.push(grid[x][y-squareWidth])
  }
  if(inRange(x,y+squareWidth) && !square.dwall) {
    neighbors.push(grid[x][y+squareWidth])
  }

  return neighbors
}


// Heuristic function to guide the search
function heuristic(s1, s2) {
  var x1 = s1.x,
    y1 = s1.y
  var x2 = s2.x,
    y2 = s2.y

  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
}
