/**
 * 贝塞尔曲线绘制相关辅助线
 */
import { NS } from '../constants'
import Editor from '../Editor'
import { FSVG, IFSVG } from '../element/index'
import { ISegment } from '../interface'
import editorDefaultConfig from '../config/editorDefaultConfig'

/**
 * predict segment
 * 绘制中的 seg
 */
class SegmentDraw {
  private container: IFSVG['Group']
  private size = 6
  private seg: ISegment = null

  // 锚点 x 1，控制点 x 2，锚点和控制点连线 x 2
  private anchorNode: IFSVG['Rect']
  private handleInNode: IFSVG['Rect']
  private handleOutNode: IFSVG['Rect']
  private handleInLine: IFSVG['Line']
  private handleOutLine: IFSVG['Line']

  constructor(parent: SVGGElement, private editor: Editor) {
    this.container = new FSVG.Group()
    this.container.setID('segment-draw')
    this.container.hide()

    // point and handle line nodes
    this.handleInLine = new FSVG.Line(0, 0, 0, 0)
    this.handleInLine.setAttr('stroke', editorDefaultConfig.outlineColor)
    this.handleInLine.setNonScalingStroke()
    this.container.append(this.handleInLine)

    this.handleOutLine = new FSVG.Line(0, 0, 0, 0)
    this.handleOutLine.setAttr('stroke', editorDefaultConfig.outlineColor)
    this.handleOutLine.setNonScalingStroke()
    this.container.append(this.handleOutLine)

    this.anchorNode = new FSVG.Rect(0, 0, this.size, this.size)
    this.anchorNode.setAttr('stroke', '#000')
    this.anchorNode.setAttr('fill', '#fff')
    this.anchorNode.setNonScalingStroke()
    this.container.append(this.anchorNode)

    this.handleInNode = new FSVG.Rect(0, 0, this.size, this.size)
    this.handleInNode.setAttr('stroke', '#000')
    this.handleInNode.setAttr('fill', '#fff')
    this.handleInNode.setNonScalingStroke()
    this.container.append(this.handleInNode)

    this.handleOutNode = new FSVG.Rect(0, 0, this.size, this.size)
    this.handleOutNode.setAttr('stroke', '#000')
    this.handleOutNode.setAttr('fill', '#fff')
    this.handleOutNode.setNonScalingStroke()
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
    this.seg = seg
    // 3 points
    this.anchorNode.setCenterPos(seg.x, seg.y)
    this.handleInNode.setCenterPos(seg.handleIn.x, seg.handleIn.y)
    this.handleOutNode.setCenterPos(seg.handleOut.x, seg.handleOut.y)
    // 2 handle lines
    this.handleInLine.setPos(seg.x, seg.y, seg.handleIn.x, seg.handleIn.y)
    this.handleOutLine.setPos(seg.x, seg.y, seg.handleOut.x, seg.handleOut.y)
    this.container.visible()
  }
  getSeg() {
    return this.seg
  }
  clear() {
    this.container.hide()
    this.seg = null
  }
}

/**
 * path 路径高亮
 */
export class PathDraw {
  private container: SVGGElement
  private path: IFSVG['Path']
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
  /* getD() {
    return this.path.getAttr('d')
  } */
  setD(d: string) {
    this.path.setAttr('d', d)
  }
  clear() {
    this.path.hide()
    this.path.removeAttr('d')
    this.segDraw.clear()
  }
}
