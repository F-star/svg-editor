
import { NS } from '../constants'
import { IPoint } from '../interface'
import { FElement } from './baseElement'

export class Path extends FElement {
  el_: SVGElement
  cacheTail: IPoint
  cacheD: string

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
  /**
   * 获取 path 的最后一个点坐标
   */
  tail(): IPoint {
    let d = this.getAttr('d').trim()
    if (!d) return null
    if (d === this.cacheD) {
      return this.cacheTail
    }
    this.cacheD = d

    let pos = d.lastIndexOf(' ') // TODO: 优化算法
    const y = parseFloat(d.slice(pos + 1))

    d = d.slice(0, pos).trim()
    pos = d.lastIndexOf(' ')
    const x = parseFloat(d.slice(pos + 1))

    this.cacheTail = { x, y }
    return this.cacheTail
  }
}
