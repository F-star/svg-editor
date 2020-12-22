
export class Box {
  constructor(x, y, w, h) {
    if (typeof x == 'object') {
      this.x = x.x
      this.y = x.y
      this.w = x.width
      this.h = x.height
    } else {
      this.x = x
      this.y = y
      this.w = w
      this.h = h
    }

    this.width = this.w
    this.height = this.h
    this.x2 = this.x + this.w
    this.y2 = this.y + this.h
  }
  contains(otherBox) {
    return this.x <= otherBox.x && this.y <= otherBox.y &&
      this.x2 >= otherBox.x + otherBox.width && this.y2 >= otherBox.y + otherBox.height
  }

  merge(otherBox) {
    const x = Math.min(this.x, otherBox.x)
    const y = Math.min(this.y, otherBox.y)
    const x2 = Math.max(this.x2, otherBox.x2)
    const y2 = Math.max(this.y2, otherBox.y2)
    const w = x2 - x
    const h = y2 - y
    return new Box(x, y, w, h)
  }
}