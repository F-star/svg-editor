
class PathItem {
  constructor() {
    this.segItems = []
    this.d = ''
  }
  addSeg(seg) {
    this.segItems.push(seg)
    const len = this.segItems.length
    if (len === 1) {
      this.d = `M ${seg.x} ${seg.y}`
    } else {
      const prev = this.segItems[len - 2]
      // FIXME:
      this.d += `C ${prev.handleOut.x} ${prev.handleOut.y} ${seg.handleIn.x} ${seg.handleIn.y} ${seg.x} ${seg.y}`
    }
  }
  removeLastSeg() {
    return this.segItems.pop()
    
  }
  getPathD() {
    return this.d
  }
}

class PathSegment {
  constructor(x, y, handleIn, handleOut) {
    this.x = x
    this.y = y
    this.handleIn = handleIn
    this.handleOut = handleOut
  }

}