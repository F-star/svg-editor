
// referrence http://paperjs.org/reference/path/
class Path {
  constructor(el) {
    this.el_ = el
    this.pathItem = null
  }
}

// describe path
class PathItem {
  constructor() {
    this.segItems = []
    this.d = ''
    this.isClosed = false
  }
  addSeg(seg) {
    this.segItems.push(seg)
  }
  removeLastSeg() {
    return this.segItems.pop()
  }
  close() {
    this.isClosed = true
  }
  cancelClose() {
    this.isClosed = false
  }
  updateSeg(index, seg) {
    return this.segItems.splice(index, 1, seg)
  }
  getPathD() {
    if (this.segItems.length === 0) {
      return ''
    }
    let d
    const first = this.segItems[0]
    d = `M ${first.x} ${first.y}`
    for (let i = 1; i < this.segItems.length; i++) {
      const { x, y, handleIn } = this.segItems[i]
      const x2 = handleIn ? handleIn.x : x
      const y2 = handleIn ? handleIn.y : y

      const prev = this.segItems[i - 1]
      const x1 = prev.handleOut ? prev.handleOut.x : prev.x
      const y1 = prev.handleOut ? prev.handleOut.y : prev.y

      const c = `C ${x1} ${y1} ${x2} ${y2} ${x} ${y}`
      d += c
    }
    return d
  }
}

class Segment {
  constructor(x, y, handleIn, handleOut) {
    this.x = x
    this.y = y
    this.handleIn = handleIn
    this.handleOut = handleOut
  }
}

class PathOutline {
  constructor() {
    this.pathItems = []
  }
  draw() {
    
  }
}