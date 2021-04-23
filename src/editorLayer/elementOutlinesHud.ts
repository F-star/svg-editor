/**
 * elements outlines
 * 高亮指定元素的轮廓线
 */

import { FSVG, IFSVG } from '../element'
import { FElement } from '../element/baseElement'
import editorDefaultConfig from '../config/editorDefaultConfig'
export class ElementsOutlinesHub {
  container: IFSVG['Group']
  constructor(parent: IFSVG['Group']) {
    this.container = new FSVG.Group() // document.createElementNS(NS.SVG, 'g') as SVGGElement
    this.container.setID('element-outlines-hud')
    parent.append(this.container)
    // this.container.appendChild(this.outline)
  }
  draw(els: Array<FElement>) {
    for (const el of els) {
      if (el.tagName() === 'rect') {
        // 生成一个空心 rect 放 container 下。
        const rect = el as IFSVG['Rect']
        const pos = rect.getPos()
        const outline = new FSVG.Rect(pos.x, pos.y, rect.getWidth(), rect.getHeight())
        outline.setAttr('stroke', editorDefaultConfig.outlineColor)
        this.container.append(outline)
      }
      // TODO: path
    }
  }
  clear() {
    this.container.clear()
  }
}
