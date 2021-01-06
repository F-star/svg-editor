
/**
 * 对 rect 元素的简单封装
 */

import { NS } from "../constants"
import { FElement } from "./baseElement"

export class Rect extends FElement {
  el_: SVGElement

  constructor(x: number, y: number, w: number, h: number)
  constructor(el: SVGElement)
  constructor(x: number | SVGElement, y?: number, w?: number, h?: number) {
    super()
    if (typeof x == 'object') {
      this.el_ = x
    } else {
      this.el_ = document.createElementNS(NS.SVG, 'rect') as SVGElement
      this.setAttr('x', x + '')
      this.setAttr('y', y + '')
      this.setAttr('width', w + '')
      this.setAttr('height', h + '')
    }
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