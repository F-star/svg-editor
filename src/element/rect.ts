
/**
 * 对 rect 元素的简单封装
 */

import { NS } from '../constants'
import { FElement } from './baseElement'

export class Rect extends FElement {
  el_: SVGElement

  constructor(x: number, y: number, w: number, h: number)
  constructor(el: SVGElement)
  constructor(x: number | SVGElement, y?: number, w?: number, h?: number) {
    super()
    if (typeof x === 'object') {
      this.el_ = x
    } else {
      this.el_ = document.createElementNS(NS.SVG, 'rect') as SVGElement
      this.setAttr('x', x + '')
      this.setAttr('y', y + '')
      this.setAttr('width', w + '')
      this.setAttr('height', h + '')
    }
  }
  setPos(x: number, y: number) {
    this.setAttr('x', String(x))
    this.setAttr('y', String(y))
  }
  setCenterPos(cx: number, cy: number) {
    const w = parseFloat(this.getAttr('width'))
    const h = parseFloat(this.getAttr('height'))

    this.setPos(cx - w / 2, cy - h / 2)
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
