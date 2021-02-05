/**
 * elements outline box
 *
 */

import editorDefaultConfig from '../config/editorDefaultConfig'
import Editor from '../Editor'
import { IBox } from '../element/box'
import { FSVG, IFSVG } from '../element/index'


class ScaleGrids {
  private container: IFSVG['Group']
  private topLeft: IFSVG['Rect']
  private topRight: IFSVG['Rect']
  private bottomLeft: IFSVG['Rect']
  private bottomRight: IFSVG['Rect']
  private size = editorDefaultConfig.scaleGridSize

  constructor(parent: SVGGElement, private editor: Editor) {
    this.container = new FSVG.Group()
    this.container.setID('segment-draw')

    this.topLeft = this.createGrip()
    this.topRight = this.createGrip()
    this.bottomRight = this.createGrip()
    this.bottomLeft = this.createGrip()

    this.container.append(this.topLeft)
    this.container.append(this.topRight)
    this.container.append(this.bottomRight)
    this.container.append(this.bottomLeft)

    parent.appendChild(this.container.el())
    this.adjustSizeWhenZoom()
  }
  private createGrip(): IFSVG['Rect'] {
    const grid = new FSVG.Rect(0, 0, this.size, this.size)
    grid.setAttr('stroke', '#000')
    grid.setAttr('fill', '#fff')
    grid.setNonScalingStroke()
    grid.hide()
    return grid
  }
  getOppositeGrip(grip: IFSVG['Rect']): IFSVG['Rect'] {
    let targetGrip = null
    if (grip === this.topLeft) targetGrip = this.bottomRight
    else if (grip === this.topRight) targetGrip = this.bottomLeft
    else if (grip === this.bottomRight) targetGrip = this.topLeft
    else if (grip === this.bottomLeft) targetGrip = this.topRight
    return targetGrip
  }
  getGripIfExist(el: SVGElement): IFSVG['Rect'] {
    // TODO:
    if (this.topLeft.el() === el) return this.topLeft
    if (this.topRight.el() === el) return this.topRight
    if (this.bottomRight.el() === el) return this.bottomRight
    if (this.bottomLeft.el() === el) return this.bottomLeft
    return null
  }
  // getMatchedGripPos() {
  //   const matchGrip = null
  // }
  private adjustSizeWhenZoom() {
    this.editor.viewport.onZoomChange(zoom => {
      const size = this.size / zoom
      ;[this.topLeft, this.topRight, this.bottomRight, this.bottomLeft].forEach(grid => {
        const { x, y } = grid.getCenterPos()
        grid.setAttr('width', String(size))
        grid.setAttr('height', String(size))
        grid.setCenterPos(x, y)
      })
    })
  }
  drawPoints(outline: OutlineBoxHud) {
    const box = outline.getBox()

    this.topLeft.setCenterPos(box.x, box.y)
    this.topRight.setCenterPos(box.x + box.width, box.y)
    this.bottomRight.setCenterPos(box.x + box.width, box.y + box.height)
    this.bottomLeft.setCenterPos(box.x, box.y + box.height)

    this.topLeft.visible()
    this.topRight.visible()
    this.bottomRight.visible()
    this.bottomLeft.visible()
  }
  clear() {
    this.topLeft.hide()
    this.topRight.hide()
    this.bottomRight.hide()
    this.bottomLeft.hide()
  }
}

export class OutlineBoxHud {
  private x = 0
  private y = 0
  private w = 0
  private h = 0
  private container: IFSVG['Group']
  private outline: IFSVG['Path']
  scaleGrids: ScaleGrids

  constructor(parent: SVGGElement, editor: Editor) {
    this.container = new FSVG.Group() // document.createElementNS(NS.SVG, 'g') as SVGGElement
    this.container.setID('outline-box-hud')

    this.outline = new FSVG.Path() // document.createElementNS(NS.SVG, 'path') as SVGPathElement
    this.outline.setAttr('fill', 'none')
    this.outline.setAttr('stroke', '#f04')
    this.outline.setAttr('vector-effect', 'non-scaling-stroke')

    this.container.append(this.outline)
    parent.appendChild(this.container.el())

    this.scaleGrids = new ScaleGrids(parent, editor)
  }
  // drawRectByDir(dir: 'tl' | 'tr' | 'br' | 'bl', x: number, y: number) {
  //   if (dir === 'br') {
  //     //
  //   }
  // }
  drawRect(x: number, y: number, w: number, h: number) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    this.drawRectWithPoints(x, y, x + w, y, x + w, y + h, x, y + h)
  }
  private drawRectWithPoints(
    x1: number, y1: number, x2: number, y2: number,
    x3: number, y3: number, x4: number, y4: number
  ) {
    const d = `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z`
    this.outline.setAttr('d', d)
    this.outline.visible()

    this.scaleGrids.drawPoints(this)
  }
  clear() {
    this.outline.hide()
    this.scaleGrids.clear()
  }
  getGripIfExist(el: SVGElement): IFSVG['Rect'] {
    return this.scaleGrids.getGripIfExist(el)
  }
  getWidth() { return this.w }
  getHeight() { return this.h }
  getX() { return this.x }
  getY() { return this.y }
  getBox(): IBox {
    return {
      x: this.getX(),
      y: this.getY(),
      width: this.getWidth(),
      height: this.getHeight(),
    }
  }
}
