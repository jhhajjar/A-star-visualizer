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
