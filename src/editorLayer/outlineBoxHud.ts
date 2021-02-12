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

  private top: IFSVG['Rect']
  private right: IFSVG['Rect']
  private bottom: IFSVG['Rect']
  private left: IFSVG['Rect']

  private size = editorDefaultConfig.scaleGridSize

  constructor(parent: SVGGElement, private editor: Editor) {
    this.container = new FSVG.Group()
    this.container.setID('segment-draw')

    this.topLeft = this.createGrip('topLeft')
    this.topRight = this.createGrip('topRight')
    this.bottomRight = this.createGrip('bottomRight')
    this.bottomLeft = this.createGrip('bottomLeft')

    this.top = this.createGrip('top')
    this.right = this.createGrip('right')
    this.bottom = this.createGrip('bottom')
    this.left = this.createGrip('left')

    this.container.append(this.topLeft)
    this.container.append(this.topRight)
    this.container.append(this.bottomRight)
    this.container.append(this.bottomLeft)
    this.container.append(this.top)
    this.container.append(this.right)
    this.container.append(this.bottom)
    this.container.append(this.left)

    parent.appendChild(this.container.el())
    this.changeSizeWhenZoom()
  }
  private createGrip(id: string): IFSVG['Rect'] {
    const grid = new FSVG.Rect(0, 0, this.size, this.size)
    grid.setID(id)
    grid.setAttr('stroke', editorDefaultConfig.outlineColor)
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
  getGripIfMatch(el: SVGElement): IFSVG['Rect'] {
    if (this.topLeft.el() === el) return this.topLeft
    if (this.topRight.el() === el) return this.topRight
    if (this.bottomRight.el() === el) return this.bottomRight
    if (this.bottomLeft.el() === el) return this.bottomLeft
    // TODO:
    return null
  }
  // getMatchedGripPos() {
  //   const matchGrip = null
  // }
  private changeSizeWhenZoom() {
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
    const { x, y, width, height } = outline.getBox()

    this.topLeft.setCenterPos(x, y)
    this.topRight.setCenterPos(x + width, y)
    this.bottomRight.setCenterPos(x + width, y + height)
    this.bottomLeft.setCenterPos(x, y + height)

    this.top.setCenterPos(x + width / 2, y)
    this.right.setCenterPos(x + width, y + height / 2)
    this.bottom.setCenterPos(x + width / 2, y + height)
    this.left.setCenterPos(x, y + height / 2)

    this.topLeft.visible()
    this.topRight.visible()
    this.bottomRight.visible()
    this.bottomLeft.visible()

    this.top.visible()
    this.right.visible()
    this.bottom.visible()
    this.left.visible()
  }
  clear() {
    this.topLeft.hide()
    this.topRight.hide()
    this.bottomRight.hide()
    this.bottomLeft.hide()

    this.top.hide()
    this.right.hide()
    this.bottom.hide()
    this.left.hide()
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
    this.outline.setAttr('stroke', editorDefaultConfig.outlineColor)
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
  getGripIfMatch(el: SVGElement): IFSVG['Rect'] {
    return this.scaleGrids.getGripIfMatch(el)
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
