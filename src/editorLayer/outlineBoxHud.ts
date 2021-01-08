/**
 * elements outline box
 *
 */

import { NS } from '../constants'

export class OutlineBoxHud {
  x = 0
  y = 0
  w = 0
  h = 0
  container: SVGGElement
  outline: SVGPathElement

  constructor(parent: SVGGElement) {
    this.x = 0
    this.y = 0
    this.w = 0
    this.h = 0

    this.container = document.createElementNS(NS.SVG, 'g') as SVGGElement
    this.container.id = 'outline-box-hud'
    parent.appendChild(this.container)

    this.outline = document.createElementNS(NS.SVG, 'path') as SVGPathElement
    this.outline.setAttribute('fill', 'none')
    this.outline.setAttribute('stroke', '#f04')
    this.outline.setAttribute('vector-effect', 'non-scaling-stroke')

    this.container.appendChild(this.outline)
  }
  clear() {
    // parent.innerHTML = ''
    this.outline.style.display = 'none'
  }
  drawRect(x: number, y: number, w: number, h: number) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    // why don't I use rect, just solve the condition when width or height is 0 the outline is disapper
    const d = `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x} ${y + h} Z`
    this.outline.setAttribute('d', d)
    this.outline.style.display = ''
  }
  getWidth() { return this.w }
  getHeight() { return this.h }
  getX() { return this.x }
  getY() { return this.y }
}
