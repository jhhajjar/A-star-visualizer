var squareWidth = 25
var openSet
var grid
var startingSquare
var endSquare
var done
var begin
var squaresThatChanged
var bread, greedy

function setup() {
  var canvas = createCanvas(windowWidth * 9 / 10, windowHeight * 9 / 10)
  canvas.parent("canvas")
  grid = []
  squaresThatChanged = []
  for (var i = 0; i < width / squareWidth - 1; i++) {
    grid[i] = []
    for (var j = 0; j < height / squareWidth - 1; j++) {
      grid[i][j] = new Square(i, j, squareWidth)
      squaresThatChanged.push(grid[i][j])
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
  nodesVisited = 0
  pathLength = 0
  openSet.push(startingSquare)
  startingSquare.gScore = 0
  done = false
}

function draw() {

  // Only draw squares that changed
  for (square of squaresThatChanged) {
    square.draw()
  }

  // Clear squares that changed, will be updated in A* loop
  squaresThatChanged = []

  // Do A star search with animation
  if (begin) {
    aStarLoop(true)
  }
}

// Function to ensure that picking a square with (x,y) coordinates exists
function inRange(x, y) {
  return (x >= 0 && x < grid.length) && (y >= 0 && y < grid[0].length)
}

// Function to handle key events
function keyPressed() {

  // Corresponds to 'play'
  if (key == 'k') {
    begin = !begin
  } else if (key == 'n') { // Corresponds to 'new'
    begin = false
    setup()
  } else if (key == 's') { // Corresponds to 'solve'
    begin = false
    fullAStar()
  } else if (key == 'r') { // Corresponds to 'reset'
    begin = false
    done = false
    reset()
  } else if (isFinite(key) && key > 0) { // Corresponds to difficulty
    begin = false
    squareWidth = key * 5
    setup()
  // } else if (key == 'b') {
  //   bread = true
  //   greedy = false
  //   begin = true
  // } else if (key == 'g') {
  //   greedy = true
  //   bread = false
  //   begin = true
  // } else if (key == 'a') {
  //   greedy = false
  //   bread = false
  //   begin = true
  }
}
