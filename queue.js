class Queue {
  constructor() {
    this.items = []
    console.log(this.items);
  }

  // Add item to queue
  push(item) {
    if(this.isEmpty()) {
      this.items = [item]
    } else {
      var ref = 0
      while(this.items[ref].fScore < item.fScore) {
        ref ++
      }
      this.items.splice(ref, 0, item)
    }
  }

  // Returns true if item is in the queue, else false
  has(item) {
    if(this.isEmpty()) {
      return false
    } else {
      for(var i = 0; i < this.items.length; i++) {
        if(this.items[i] === item) {
          return true
        }
      }
      return false
    }
  }

  // Get next item from queue
  pop() {
    if(this.isEmpty()) {
      return null
    }
    return this.items.shift()
  }

  // Determine if the queue is empty
  isEmpty() {
    return this.items.length == 0
  }

  // Simple print function
  toStr() {
    if(this.isEmpty()) {
      return "Empty"
    }
    var str = ""
    for(var i = 0; i < this.items.length; i++)
      str += this.items[i] + " "
    return str
  }

}
