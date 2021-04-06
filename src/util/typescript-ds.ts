

class ArrayStack<T> {
  private items: Array<T> = []

  size(): number {
    return this.items.length
  }
  push(item: T) {
    this.items.push(item)
  }
  pop(): T {
    return this.items.pop()
  }
  getItems(): Array<T> {
    return this.items
  }
  /* peek */
  empty() {
    this.items = []
  }
}

export {
  ArrayStack
}
