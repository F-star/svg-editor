/**
 * elements outlines
 * 高亮指定元素的轮廓线
 */

import { FSVG, IFSVG } from '../element/index'
import { FElement } from '../element/baseElement'
import editorDefaultConfig from '../config/editorDefaultConfig'

class ElementsOutlinesHub {
  container: IFSVG['Group']

  constructor(parent: SVGGElement) {
    this.container = new FSVG.Group() // document.createElementNS(NS.SVG, 'g') as SVGGElement
    this.container.setID('element-outlines-hud')
    parent.appendChild(this.container.el())
    // this.container.appendChild(this.outline)
  }
  draw(els: Array<FElement>) {
    this.clear()

    let baseOutline: FElement
    for (const el of els) {
      if (el.tagName() === 'rect') {
        const rect = el as IFSVG['Rect']
        const pos = rect.getPos()
        const outline = new FSVG.Rect(pos.x, pos.y, rect.getWidth(), rect.getHeight())
        baseOutline = outline
      } if (el.tagName() === 'path') {
        const path = el as IFSVG['Path']
        const outline = new FSVG.Path()
        outline.setAttr('d', path.getAttr('d'))
        baseOutline = outline
      }
      baseOutline.setAttr('fill', 'none')
      baseOutline.setAttr('stroke', editorDefaultConfig.outlineColor)
      baseOutline.setAttr('stroke-width', '1px')
      baseOutline.setNonScalingStroke()
      this.container.append(baseOutline)
    }
  }
  translate(x: number, y: number) {
    this.container.translate(x, y)
  }
  clear() {
    this.container.clear()
    this.container.removeAttr('transform')
  }
}

export default ElementsOutlinesHub
