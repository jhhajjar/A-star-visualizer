var nodesVisited = 0
// Full A* algorithm, doesn't animate
function fullAStar() {
  while (!done) {
    aStarLoop(false)
  }
}

// The main loop in the A star algorithm
function aStarLoop(animate) {
  if (!openSet.isEmpty() && !done) {
    nodesVisited++
    // Get the node with the lowest fscore
    var current = openSet.pop()
    if (animate) {
      current.setInFocus()
    }
    // Check for equality
    if (current === endSquare) {
      console.log("DONE!")
      backtrack(endSquare)
      // parent = endSquare
      done = true
    } else {
      // Loop through neighbors
      for (neighbor of getNeighborsA(current)) {
        tentativeG = current.gScore + 1 // All edges have weight 1

        // If we have found a better path, record it
        if (tentativeG < neighbor.gScore) {
          neighbor.parent = current
          neighbor.gScore = tentativeG
          neighbor.fScore = neighbor.gScore + heuristic(neighbor, endSquare)

          // Add neighbor if we haven't seen
          if (!openSet.has(neighbor)) {
            if (animate) {
              neighbor.setInFrontier()
            }
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
  while (parent != null) {
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
  if (inRange(x - 1, y) && !square.lwall) {
    neighbors.push(grid[x - 1][y])
  }
  if (inRange(x + 1, y) && !square.rwall) {
    neighbors.push(grid[x + 1][y])
  }
  if (inRange(x, y - 1) && !square.uwall) {
    neighbors.push(grid[x][y - 1])
  }
  if (inRange(x, y + 1) && !square.dwall) {
    neighbors.push(grid[x][y + 1])
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
