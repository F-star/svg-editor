

import { NS } from '../constants'
import { FSVG, IFSVG } from '../element/index'
import { IPoint, ISegment } from '../interface'


// TODO: replace ISegment
class Segment {
  constructor(
    public x: number, public y: number,
    public handleIn: IPoint, public handleOut: IPoint
  ) {}
  getHandleInOrAnchor(): IPoint {
    if (this.handleIn) {
      return this.handleIn
    }
    return { x: this.x, y: this.y }
  }
  getHandleOutOrAnchor(): IPoint {
    if (this.handleOut) {
      return this.handleOut
    }
    return { x: this.x, y: this.y }
  }
  hasHandleIn() {
    return !!this.handleIn
  }
  hasHandleOut() {
    return !!this.handleOut
  }
}

/**
 * predict segment
 */
class SegmentDraw {
  private container: SVGGElement
  private path: IFSVG['Path']

  private anchorNode: IFSVG['Rect']
  private handleInNode: IFSVG['Rect']
  private handleOutNode: IFSVG['Rect']
  private handleInLine: IFSVG['Line']
  private handleOutLine: IFSVG['Line']

  constructor(parent: SVGGElement) {
    this.container = document.createElementNS(NS.SVG, 'g') as SVGGElement
    this.container.id = 'segment-draw'

    // predict line
    this.path = new FSVG.Path()
    parent.appendChild(this.container)

    this.path.setAttr('fill', 'none')
    this.path.setAttr('stroke', '#f04')
    this.path.setAttr('vector-effect', 'non-scaling-stroke')

    // point and handle line nodes
    this.handleInLine = new FSVG.Line(0, 0, 0, 0)
    this.handleInLine.setAttr('stroke', '#f04')
    this.handleInLine.hide()
    this.container.appendChild(this.handleInLine.el())

    this.handleOutLine = new FSVG.Line(0, 0, 0, 0)
    this.handleOutLine.setAttr('stroke', '#f04')
    this.handleOutLine.hide()
    this.container.appendChild(this.handleOutLine.el())

    this.anchorNode = new FSVG.Rect(0, 0, 6, 6)
    this.anchorNode.setAttr('stroke', '#000')
    this.anchorNode.setAttr('fill', '#fff')
    this.anchorNode.hide()
    this.container.appendChild(this.anchorNode.el())

    this.handleInNode = new FSVG.Rect(0, 0, 6, 6)
    this.handleInNode.setAttr('stroke', '#000')
    this.handleInNode.setAttr('fill', '#fff')
    this.handleInNode.hide()
    this.container.appendChild(this.handleInNode.el())

    this.handleOutNode = new FSVG.Rect(0, 0, 6, 6)
    this.handleOutNode.setAttr('stroke', '#000')
    this.handleOutNode.setAttr('fill', '#fff')
    this.handleOutNode.hide()
    this.container.appendChild(this.handleOutNode.el())
  }
  render(seg: ISegment) {
    // 3 points
    this.anchorNode.setCenterPos(seg.x, seg.y)
    this.anchorNode.visible()

    this.handleInNode.setCenterPos(seg.handleIn.x, seg.handleIn.y)
    this.handleInNode.visible()

    this.handleOutNode.setCenterPos(seg.handleOut.x, seg.handleOut.y)
    this.handleOutNode.visible()
    // 2 handle lines
    this.handleInLine.setPos(seg.x, seg.y, seg.handleIn.x, seg.handleIn.y)
    this.handleInLine.visible()

    this.handleOutLine.setPos(seg.x, seg.y, seg.handleOut.x, seg.handleOut.y)
    this.handleOutLine.visible()
  }
  clear() {
    this.path.hide()
    this.anchorNode.hide()
    this.handleInNode.hide()
    this.handleOutNode.hide()
    this.handleInLine.hide()
    this.handleOutLine.hide()
  }
}

/**
 * path
 */
export class PathDraw {
  private container: SVGGElement
  private path: IFSVG['Path']
  private segs: Array<ISegment> = []
  segDraw: SegmentDraw

  constructor(parent: SVGGElement) {
    this.container = document.createElementNS(NS.SVG, 'g') as SVGGElement
    this.container.id = 'path-draw'

    this.path = new FSVG.Path()
    parent.appendChild(this.container)

    this.path.setAttr('fill', 'none')
    this.path.setAttr('stroke', '#f04')
    this.path.setAttr('vector-effect', 'non-scaling-stroke')

    this.container.appendChild(this.path.el())

    this.segDraw = new SegmentDraw(parent)
  }
  addSeg(seg: ISegment) {
    this.path.visible()
    // const { x, y, handleIn, handleOut } = seg
    let x1: number, y1: number, x2: number, y2: number

    let d = this.getD()
    if (!d) {
      d = `M ${seg.x} ${seg.y}`
    } else {
      const prevSeg = this.segs[this.segs.length - 1]
      x1 = prevSeg.handleOut ? prevSeg.handleOut.x : prevSeg.x
      y1 = prevSeg.handleOut ? prevSeg.handleOut.y : prevSeg.y
      x2 = seg.handleIn ? seg.handleIn.x : seg.x
      y2 = seg.handleIn ? seg.handleIn.y : seg.y

      d += ` C ${x1} ${y1} ${x2} ${y2} ${seg.x} ${seg.y}`
    }
    this.segs.push(seg)
    this.path.setAttr('d', d)
  }
  updateTailSegHandle(handleIn: IPoint, handleOut: IPoint) {
    const tailSeg = this.getTailSeg()
    if (tailSeg === null) {
      throw new Error('the path has not segments')
    }
    tailSeg.handleIn = handleIn
    tailSeg.handleOut = handleOut
    // TODO: optimize
    this.updateDBySegs()
    this.segDraw.render(this.getTailSeg())
  }
  updateDBySegs() {
    if (this.segs.length === 0) {
      return ''
    }
    let d
    const head = this.segs[0]
    d = `M ${head.x} ${head.y}`
    for (let i = 1; i < this.segs.length; i++) {
      const { x, y, handleIn } = this.segs[i]
      const x2 = handleIn ? handleIn.x : x
      const y2 = handleIn ? handleIn.y : y

      const prev = this.segs[i - 1]
      const x1 = prev.handleOut ? prev.handleOut.x : prev.x
      const y1 = prev.handleOut ? prev.handleOut.y : prev.y

      const c = ` C ${x1} ${y1} ${x2} ${y2} ${x} ${y}`
      d += c
    }
    this.path.setAttr('d', d)
  }
  getTailSeg() {
    if (this.segs.length === 0) return null
    return this.segs[this.segs.length - 1]
  }
  getD() {
    return this.path.getAttr('d')
  }
  clear() {
    this.path.hide()
    this.path.removeAttr('d')
    this.segs = []

    this.segDraw.clear()
  }
}
