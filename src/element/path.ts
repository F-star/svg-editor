
import { NS } from '../constants'
import { FElement } from './baseElement'

export class Path extends FElement {
  el_: SVGElement

  constructor(el?: SVGElement) {
    super()
    if (el) {
      this.el_ = el
    } else {
      this.el_ = document.createElementNS(NS.SVG, 'path') as SVGPathElement
    }
  }
}
