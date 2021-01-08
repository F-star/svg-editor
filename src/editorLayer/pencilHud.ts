

import { NS } from '../constants'
import { FSVG } from '../element'
import { Path } from '../element/path'
export class PencilHud {
  container: SVGGElement
  path: Path

  constructor() {
    this.container = document.createElementNS(NS.SVG, 'g') as SVGGElement
    this.path = new FSVG.Path()
  }
  draw() {}
  addPoint(x: number, y: number) {
    let d = this.getD()
    if (d === '') {
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
    //
    this.path.setAttr('d', '')
  }
}
