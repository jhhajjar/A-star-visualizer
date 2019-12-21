const squareWidth = 20
var openSet
var grid = []
var startingSquare
var endSquare
var done
var parent

function setup() {
  createCanvas(windowWidth, windowHeight)
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

  // Do A*
  fullAStar()
}

function draw() {
  for(var i = 0; i < width - squareWidth; i += squareWidth) {
    for(var j = 0; j < height - squareWidth; j += squareWidth) {
      grid[i][j].draw()
    }
  }

  // Do A star search
  aStarLoop()
}

// Function to ensure that picking a square with (x,y) coordinates exists
function inRange(x, y) {
  return (x >= 0 && x < width - squareWidth) && (y >= 0 && y < height - squareWidth)
}

// Heuristic function to guide the search
function heuristic(s1, s2) {
  var x1 = s1.x, y1 = s1.y
  var x2 = s2.x, y2 = s2.y

  return Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2)
}
