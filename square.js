class Square {
  // Basic constructor, given (x,y) of left corner of square
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = width
    this.lwall = true
    this.rwall = true
    this.uwall = true
    this.dwall = true

    this.inFocus = false
    this.inFrontier = false
    this.visited = false
  }

  // Set the square in frontier (not in focus yet and not visited yet)
  setInFrontier() {
    this.visited = false
    this.inFocus = false
    this.inFrontier = true
  }

  // Set the square in focus (no longer in frontier and not visited yet)
  setInFocus() {
    this.inFrontier = false
    this.visited = false
    this.inFocus = true
  }

  // Set the square as visited (no longer in focus or in frontier)
  setVisited() {
    this.inFocus = false
    this.inFrontier = false
    this.visited = true
  }

  draw() {
    // Choose right color based on status of square
    var color = 'blue'
    if(this.visited) {
      color = 'red'
    } else if(this.inFrontier) {
      color = 'green'
    } else if(this.inFocus) {
      color = 'yellow'
    } else if (this.start) {
      color = '#169209'
    } else if(this.end) {
      color = '#FF4533'
    }

    fill(color)

    // Draw the square
    noStroke()
    rect(this.x, this.y, this.width, this.width)

    // Draw walls
    stroke(150)
    if(this.lwall) {
      line(this.x, this.y, this.x, this.y + this.width)
    }
    if(this.rwall) {
      line(this.x + this.width, this.y, this.x + this.width, this.y + this.width)
    }
    if(this.uwall) {
      line(this.x, this.y, this.x + this.width, this.y)
    }
    if(this.dwall) {
      line(this.x, this.y + this.width, this.x + this.width, this.y + this.width)
    }
    noStroke()
  }

  tostr() {
    str = this.x + " " + this.y
  }
}
