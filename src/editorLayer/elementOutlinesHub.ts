/**
 * elements outlines
 * 
 * TODO:
 */

import { NS } from "../constants"

export class ElementsOutlinesHub {
  container: SVGGElement


  constructor(parent) {
    this.container = document.createElementNS(NS.SVG, 'g') as SVGGElement
    this.container.id = 'element-outlines-hud'
    parent.appendChild(this.container)


    // this.container.appendChild(this.outline)
  }
  clear() {

  }
  draw(els) {

  }
}