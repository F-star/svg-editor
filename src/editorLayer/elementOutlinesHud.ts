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
    for (const el of els) {
      if (el.tagName() === 'rect') {
        // 生成一个空心 rect 放 container 下。
        const rect = el as IFSVG['Rect']
        const pos = rect.getPos()
        const outline = new FSVG.Rect(pos.x, pos.y, rect.getWidth(), rect.getHeight())
        outline.setAttr('fill', 'none')
        outline.setAttr('stroke', editorDefaultConfig.outlineColor)
        outline.setAttr('stroke-width', '1px')
        outline.setNonScalingStroke()
        this.container.append(outline)
      }
      // TODO： path
    }
  }
  clear() {
    this.container.clear()
  }
}

export default ElementsOutlinesHub
