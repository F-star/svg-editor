
/**
 * 对 rect 元素的简单封装
 */

import { NS } from '../constants'
import { FElement } from './baseElement'

export class Line extends FElement {
  el_: SVGElement

  constructor(x1: number, y1: number, x2: number, y2: number)
  constructor(el: SVGElement)
  constructor(x1: number | SVGElement, y1?: number, x2?: number, y2?: number) {
    super()
    if (typeof x1 === 'object') {
      this.el_ = x1
    } else {
      this.el_ = document.createElementNS(NS.SVG, 'line') as SVGElement
      this.setAttr('x1', String(x1))
      this.setAttr('y1', String(y1))
      this.setAttr('x2', String(x2))
      this.setAttr('y2', String(y2))
    }
  }
  setPos(x1: number, y1: number, x2: number, y2: number) {
    this.setAttr('x1', String(x1))
    this.setAttr('y1', String(y1))
    this.setAttr('x2', String(x2))
    this.setAttr('y2', String(y2))
  }
  // getPos() {
  //   const x = parseFloat(this.getAttr('x'))
  //   const y = parseFloat(this.getAttr('y'))
  //   return { x, y }
  // }
  // dmove(dx: number, dy: number) {
  //   const pos = this.getPos()
  //   this.setAttr('x', pos.x + dx + '')
  //   this.setAttr('y', pos.y + dy + '')
  // }
}
