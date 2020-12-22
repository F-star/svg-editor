
const { NS } = require("../constants");

/**
 * select area
 */
export class SelectArea {
  constructor(parent) {
    this.x = 0
    this.y = 0
    this.w = 0
    this.h = 0

    this.container = document.createElementNS(NS.SVG, 'g')
    this.container.id = 'select-area'
    parent.appendChild(this.container)

    this.outline = document.createElementNS(NS.SVG, 'path')
    this.outline.setAttribute('fill', 'none')
    this.outline.setAttribute('stroke', '#054')
    this.outline.setAttribute('vector-effect', 'non-scaling-stroke')
    this.outline.setAttribute('stroke-dasharray', '4px')

    this.container.appendChild(this.outline)
  }
  clear() {
    // parent.innerHTML = ''
    this.outline.style.display = 'none'
  }
  drawRect(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    // why don't I use rect, just solve the condition when width or height is 0 the outline is disapper
    const d = `M ${x} ${y} L ${x+w} ${y} L ${x+w} ${y+h} L ${x} ${y+h} Z`
    this.outline.setAttribute('d', d)

    /* this.outline.setAttribute('x', x)
    this.outline.setAttribute('y', y)
    this.outline.setAttribute('width', w)
    this.outline.setAttribute('height', h) */
    this.outline.style.display = ''
  }
  getWidth() { return this.w }
  getHeight() { return this.h }
  getX() { return this.x }
  getY() { return this.y }
  getBox() {
    return {
      x: this.x,
      y: this.y,
      width: this.w,
      height: this.h,
      w: this.w,
      h: this.h,
    }
  }
}