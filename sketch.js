
const squareWidth = 40
var openSet
var grid = []
var startingSquare
var endSquare
var done

function setup() {
  createCanvas(1250, 650)
  for(var i = 0; i < width - squareWidth; i += squareWidth) {
    grid[i] = []
    for(var j = 0; j < height - squareWidth; j += squareWidth) {
      grid[i][j] = new Square(i, j, squareWidth)
    }
  }

  // Initialize variables
  openSet = new Queue()
  startingSquare = grid[0][0]
  endSquare = grid[grid.length - 1][grid[0].length - 1]

  // Draw the maze
  mazeDFS(startingSquare)
  startingSquare.start = true
  endSquare.end = true

  // Setup for A*
  openSet.push(startingSquare)
  startingSquare.gScore = 0
  done = false
}

function draw() {
  for(var i = 0; i < width - squareWidth; i += squareWidth) {
    for(var j = 0; j < height - squareWidth; j += squareWidth) {
      grid[i][j].draw()
    }
  }

  // Do the A* search ok???
  // print(!openSet.isEmpty() + " " + !done)
  if(!openSet.isEmpty() && !done) {
    // Get the node with the lowest fscore
    var current = openSet.pop()
    current.setInFocus()
    // Check for equality
    if(current === endSquare) {
      console.log("DONE!")
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

// Maze generation function
function mazeDFS(startingSquare) {
  // Data structures we will need
  var toVisit = new Stack()
  var visited = new Set()
  toVisit.add(startingSquare)

  // Main loop
  while(!toVisit.isEmpty()) {
    // Get current square and mark as visited
    var currSquare = toVisit.pop()
    visited.add(currSquare)
    currSquare.setInFocus()

    // Get neighbors and choose one at random
    var neighbors = getNeighborsDFS(currSquare, visited)

    // If the cell has neighbors which have not been visited
    if(neighbors.length > 0) {
      // Push current cell to stack
      toVisit.add(currSquare)
      currSquare.setInFrontier()

      // Choose unvisited neighbor and remove wall
      var index = Math.floor(Math.random() * neighbors.length)
      breakWall(neighbors[index], currSquare)

      // Mark as visited and push neighbor to stack
      visited.add(neighbors[index])
      toVisit.add(neighbors[index])
      neighbors[index].setInFrontier()
    }
    currSquare.inFocus = false
  }

}

// Breaks the wall between two squares
function breakWall(s1, s2) {
  // s1 | s2
  if(s1.x < s2.x && s1.y == s2.y) {
    s1.rwall = false
    s2.lwall = false
  }
  // s2 | s1
  else if (s1.x > s2.x && s1.y == s2.y) {
    s1.lwall = false
    s2.rwall = false
  }
  // s1 above s2
  else if (s1.y < s2.y && s1.x == s2.x) {
    s1.dwall = false
    s2.uwall = false
  }
  // s1 below s2
  else if (s1.y > s2.y && s1.x == s2.x) {
    s1.uwall = false
    s2.dwall = false
  }
}

// Function to ensure that picking a square with (x,y) coordinates exists
function inRange(x, y) {
  return (x >= 0 && x < width - squareWidth) && (y >= 0 && y < height - squareWidth)
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
  var x1 = s1.x, y1 = s1.y
  var x2 = s2.x, y2 = s2.y

  return Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2)
}

// Function that gets neighbors of a square
function getNeighborsDFS(square, visited) {
  var x = square.x
  var y = square.y

  // Check for neighbors and add if they have not been visited
  var neighbors = []
  if(inRange(x-squareWidth,y) && !visited.has(grid[x-squareWidth][y])) {
    neighbors.push(grid[x-squareWidth][y])
  }
  if(inRange(x+squareWidth,y) && !visited.has(grid[x+squareWidth][y])) {
    neighbors.push(grid[x+squareWidth][y])
  }
  if(inRange(x,y-squareWidth) && !visited.has(grid[x][y-squareWidth])) {
    neighbors.push(grid[x][y-squareWidth])
  }
  if(inRange(x,y+squareWidth) && !visited.has(grid[x][y+squareWidth])) {
    neighbors.push(grid[x][y+squareWidth])
  }

  return neighbors
}
