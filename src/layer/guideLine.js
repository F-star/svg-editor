/**
 * guide line layer
 */

const { NS } = require("../constants");

class GuideLine{
  constructor() {
    this.container = document.createElementNS(NS.SVG, 'g')
    this.container.id = 'guideline-layout'
    this.rectGuide = new RectGuide(this.container)
  }
  mount(el) {
    el.appendChild(this.container)
  }
}

class RectGuide {
  constructor(parent) {
    this.container = document.createElementNS(NS.SVG, 'g')
    this.container.id = 'rect-guide'
    parent.appendChild(this.container)

    this.outline = document.createElementNS(NS.SVG, 'rect')
    // set stroke of outline
    this.outline.setAttribute('fill', 'none')
    this.outline.setAttribute('stroke', '#f04')

    this.container.appendChild(this.outline)
  }
  clear() {
    // parent.innerHTML = ''
    this.outline.style.display = 'none'
  }
  drawRect(x, y, w, h) {
    this.outline.setAttribute('x', x)
    this.outline.setAttribute('y', y)
    this.outline.setAttribute('width', w)
    this.outline.setAttribute('height', h)
    this.outline.style.display = ''
  }
}

export {
  GuideLine
}