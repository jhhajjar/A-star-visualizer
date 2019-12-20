class Stack {
  constructor() {
    this.items = []
  }

  // Add to the end of the stack
  add(item) {
    this.items.push(item)
  }

  // Pop next element from the stack
  pop() {
    if(this.isEmpty()) {
      return "Empty"
    }
    return this.items.pop()
  }

  // Determine if stack is empty
  isEmpty() {
    return this.items.length == 0
  }

  // Return str rep of stack
  toStr() {
    var str = ""
    for(var i = 0; i < this.items.length; i ++) {
      str += this.items[i] + " "
    }
    return str
  }

}
