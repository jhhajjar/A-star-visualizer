class Queue {
  constructor() {
    this.items = []
  }

  // Add item to queue
  push(item) {
    if (this.isEmpty()) {
      this.items = [item]
    } else {
      var i = 0
      for (i = 0; i < this.items.length; i++) {
        if (this.items[i].fScore > item.fScore)
          break
      }
      this.items.splice(i, 0, item)
    }
  }

  // Returns true if item is in the queue, else false
  has(item) {
    if (this.isEmpty()) {
      return false
    } else {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i] === item) {
          return true
        }
      }
      return false
    }
  }

  // Get next item from queue
  pop() {
    if (this.isEmpty()) {
      return null
    }
    return this.items.shift()
  }

  // Removes only a specific item
  remove(item) {
    var i = 0
    for (i = 0; i < this.items.length; i++) {
      if (this.items[i] === item) {
        break
      }
    }
    this.items.splice(i, 1)
  }

  // Determine if the queue is empty
  isEmpty() {
    return this.items.length == 0
  }

  // Function to empty the queue
  empty() {
    this.items = []
  }

  // Simple print function
  toStr() {
    if (this.isEmpty()) {
      return "Empty"
    }
    var str = ""
    for (var i = 0; i < this.items.length; i++)
      str += this.items[i] + " "
    return str
  }

}
