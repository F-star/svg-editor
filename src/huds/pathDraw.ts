/**
 * 贝塞尔曲线绘制相关辅助线
 */
import { NS } from '../constants'
import Editor from '../Editor'
import { FSVG, IFSVG } from '../element/index'
import { IPoint, ISegment } from '../interface'
import editorDefaultConfig from '../config/editorDefaultConfig'

/**
 * predict segment
 * 绘制中的 seg
 */
class SegmentDraw {
  private container: IFSVG['Group']
  private path: IFSVG['Path']
  private size = 6

  // 锚点 x 1，控制点 x 2，锚点和控制点连线 x 2
  private anchorNode: IFSVG['Rect']
  private handleInNode: IFSVG['Rect']
  private handleOutNode: IFSVG['Rect']
  private handleInLine: IFSVG['Line']
  private handleOutLine: IFSVG['Line']

  constructor(parent: SVGGElement, private editor: Editor) {
    this.container = new FSVG.Group()
    this.container.setID('segment-draw')

    this.path = new FSVG.Path()

    this.path.setAttr('fill', 'none')
    this.path.setAttr('stroke', editorDefaultConfig.outlineColor)
    this.path.setNonScalingStroke()

    // point and handle line nodes
    this.handleInLine = new FSVG.Line(0, 0, 0, 0)
    this.handleInLine.setAttr('stroke', editorDefaultConfig.outlineColor)
    this.handleInLine.setNonScalingStroke()
    this.handleInLine.hide()
    this.container.append(this.handleInLine)

    this.handleOutLine = new FSVG.Line(0, 0, 0, 0)
    this.handleOutLine.setAttr('stroke', editorDefaultConfig.outlineColor)
    this.handleOutLine.setNonScalingStroke()
    this.handleOutLine.hide()
    this.container.append(this.handleOutLine)

    this.anchorNode = new FSVG.Rect(0, 0, this.size, this.size)
    this.anchorNode.setAttr('stroke', '#000')
    this.anchorNode.setAttr('fill', '#fff')
    this.anchorNode.setNonScalingStroke()
    this.anchorNode.hide()
    this.container.append(this.anchorNode)

    this.handleInNode = new FSVG.Rect(0, 0, this.size, this.size)
    this.handleInNode.setAttr('stroke', '#000')
    this.handleInNode.setAttr('fill', '#fff')
    this.handleInNode.setNonScalingStroke()
    this.handleInNode.hide()
    this.container.append(this.handleInNode)

    this.handleOutNode = new FSVG.Rect(0, 0, this.size, this.size)
    this.handleOutNode.setAttr('stroke', '#000')
    this.handleOutNode.setAttr('fill', '#fff')
    this.handleOutNode.setNonScalingStroke()
    this.handleOutNode.hide()
    this.container.append(this.handleOutNode)

    this.changeSizeWhenZoom()

    parent.appendChild(this.container.el())
  }

  private changeSizeWhenZoom() {
    this.editor.viewport.onZoomChange(zoom => {
      const size = this.size / zoom
      ;[this.anchorNode, this.handleInNode, this.handleOutNode].forEach(grid => {
        const { x, y } = grid.getCenterPos()
        grid.setAttr('width', String(size))
        grid.setAttr('height', String(size))
        grid.setCenterPos(x, y)
      })
    })
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
 *
 */
export class PathDraw {
  private container: SVGGElement
  private path: IFSVG['Path']
  private segs: Array<ISegment> = []
  segDraw: SegmentDraw

  constructor(parent: SVGGElement, editor: Editor) {
    this.container = document.createElementNS(NS.SVG, 'g') as SVGGElement
    this.container.id = 'path-draw'

    this.path = new FSVG.Path()
    this.path.setAttr('fill', 'none')
    this.path.setAttr('stroke', editorDefaultConfig.outlineColor)
    this.path.setAttr('vector-effect', 'non-scaling-stroke')
    this.container.appendChild(this.path.el())
    parent.appendChild(this.container)
    this.segDraw = new SegmentDraw(parent, editor)
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
