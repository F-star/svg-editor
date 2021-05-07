

import { NS } from '../constants'
import { FSVG, IFSVG } from '../element/index'

export class PencilDraw {
  container: SVGGElement
  path: IFSVG['Path']

  constructor(parent: SVGGElement) {
    this.container = document.createElementNS(NS.SVG, 'g') as SVGGElement
    this.path = new FSVG.Path()
    parent.appendChild(this.container)

    this.path.setAttr('fill', 'none')
    this.path.setAttr('stroke', '#054')
    this.path.setAttr('vector-effect', 'non-scaling-stroke')

    this.container.appendChild(this.path.el())
  }
  addPoint(x: number, y: number) {
    this.path.visible()

    let d = this.getD()
    if (d === '' || d === null) {
      d = `M ${x} ${y}`
    } else {
      d += ` L ${x} ${y}`
    }
    this.path.setAttr('d', d)
  }
  getD() {
    return this.path.getAttr('d')
  }
  clear() {
    this.path.hide()
    this.path.removeAttr('d')
  }
}
