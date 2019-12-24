var squareWidth = 35
var openSet
var grid
var startingSquare
var endSquare
var done
var begin

function setup() {
  createCanvas(windowWidth * 9 / 10, windowHeight * 9 / 10)
  grid = []
  for (var i = 0; i < width/squareWidth - 1; i++) {
    grid[i] = []
    for (var j = 0; j < height/squareWidth - 1; j++) {
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

  // Do A*
  // fullAStar()
}

function draw() {
  for (row of grid) {
    for (square of row) {
      square.draw()
    }
  }

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
  } else if (isFinite(key) && key > 0) { // Corresponds to difficulty
    begin = false
    squareWidth = key * 10
    setup()
  }
}
