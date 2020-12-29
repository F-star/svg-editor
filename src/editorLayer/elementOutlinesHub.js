/**
 * elements outlines
 * 
 * TODO:
 */

const { NS } = require("../constants");

export class ElementsOutlinesHub {
  constructor(parent) {
    this.container = document.createElementNS(NS.SVG, 'g')
    this.container.id = 'element-outlines-hud'
    parent.appendChild(this.container)


    this.container.appendChild(this.outline)
  }
  clear() {

  }
  draw(els) {

  }
}