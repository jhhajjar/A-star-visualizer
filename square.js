class Square {
  // Basic constructor, given (x,y) of left corner of square
  constructor(x, y, width) {
    this.x = x
    this.y = y
    this.width = width
    this.lwall = true
    this.rwall = true
    this.uwall = true
    this.dwall = true
    this.parent = null
    this.gScore = Infinity
    this.fScore = Infinity

    this.inFocus = false
    this.inFrontier = false
    this.inPath = false
  }

  // Set the square in frontier (not in focus yet)
  setInFrontier() {
    this.inFocus = false
    this.inFrontier = true
  }

  // Set the square in focus (no longer in frontier)
  setInFocus() {
    this.inFrontier = false
    this.inFocus = true
  }

  draw() {
    // Choose right color based on status of square
    var color = 21
    if (this.start) {
      color = '#169209'
    } else if (this.end) {
      color = '#FF4533'
    } else if (this.inPath){
      color = '#bd6f46'
    } else if (this.inFrontier) {
      color = '#cfc540'
    } else if (this.inFocus) {
      color = '#3f70d1'
    }

    fill(color)

    // Draw the square
    noStroke()
    rect(this.x, this.y, this.width, this.width)

    // Draw walls
    stroke(150)
    strokeWeight(3)
    if (this.lwall) {
      line(this.x, this.y, this.x, this.y + this.width)
    }
    if (this.rwall) {
      line(this.x + this.width, this.y, this.x + this.width, this.y + this.width)
    }
    if (this.uwall) {
      line(this.x, this.y, this.x + this.width, this.y)
    }
    if (this.dwall) {
      line(this.x, this.y + this.width, this.x + this.width, this.y + this.width)
    }
    noStroke()

  }

  tostr() {
    str = this.x + " " + this.y
  }
}
