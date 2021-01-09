
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
  dmove(dx: number, dy: number) {
    const d = this.getAttr('d')
    let offset = dx
    let s

    // TODO: to optimize the algorithm
    this.setAttr('d', d.replace(/\s+(-?[\d.]+)/g, (match, p1) => {
      s = ' ' + (parseFloat(p1) + offset)
      offset = offset === dx ? dy : dx
      return s
    }))
  }
}
