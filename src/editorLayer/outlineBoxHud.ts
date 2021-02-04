/**
 * elements outline box
 *
 */

import Editor from '../Editor'
import { IBox } from '../element/box'
import { FSVG, IFSVG } from '../element/index'
class TransformGrids {
  private container: IFSVG['Group']
  private topLeft: IFSVG['Rect']
  private topRight: IFSVG['Rect']
  private bottomLeft: IFSVG['Rect']
  private bottomRight: IFSVG['Rect']
  private size = 6

  constructor(parent: SVGGElement, private editor: Editor) {
    this.container = new FSVG.Group()
    this.container.setID('segment-draw')

    this.topLeft = this.getInitGrip()
    this.topRight = this.getInitGrip()
    this.bottomRight = this.getInitGrip()
    this.bottomLeft = this.getInitGrip()

    this.container.append(this.topLeft)
    this.container.append(this.topRight)
    this.container.append(this.bottomRight)
    this.container.append(this.bottomLeft)

    parent.appendChild(this.container.el())
    this.adjustSizeWhenZoom()
  }
  private getInitGrip(): IFSVG['Rect'] {
    const grid = new FSVG.Rect(0, 0, this.size, this.size)
    grid.setAttr('stroke', '#000')
    grid.setAttr('fill', '#fff')
    grid.setNonScalingStroke()
    grid.hide()
    return grid
  }
  contains(el: SVGElement): IFSVG['Path'] {
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
  x = 0
  y = 0
  w = 0
  h = 0
  container: IFSVG['Group']
  outline: IFSVG['Path']
  transformGrids: TransformGrids

  constructor(parent: SVGGElement, editor: Editor) {
    this.x = 0
    this.y = 0
    this.w = 0
    this.h = 0

    this.container = new FSVG.Group() // document.createElementNS(NS.SVG, 'g') as SVGGElement
    this.container.setID('outline-box-hud')

    this.outline = new FSVG.Path() // document.createElementNS(NS.SVG, 'path') as SVGPathElement
    this.outline.setAttr('fill', 'none')
    this.outline.setAttr('stroke', '#f04')
    this.outline.setAttr('vector-effect', 'non-scaling-stroke')

    this.container.append(this.outline)
    parent.appendChild(this.container.el())

    this.transformGrids = new TransformGrids(parent, editor)
  }
  drawRect(x: number, y: number, w: number, h: number) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    // why don't I use rect, just solve the condition when width or height is 0 the outline is disapper
    const d = `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x} ${y + h} Z`
    this.outline.setAttr('d', d)
    this.outline.visible()

    // TODO: temporarily comment
    this.transformGrids.drawPoints(this)
  }
  clear() {
    this.outline.hide()
    this.transformGrids.clear()
  }
  containsGrip(el: SVGElement): IFSVG['Path'] {
    return this.transformGrids.contains(el)
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
