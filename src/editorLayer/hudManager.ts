/**
 * guide line layer
 */

import { OutlineBoxHud } from './outlineBoxHud'
import { SelectArea } from './selectArea'
import { PencilDraw } from './pencilDraw'
import { PathDraw } from './pathDraw'
import { NS } from '../constants'

export class HudManager {
  container: SVGGElement
  selectArea: SelectArea
  outlineBoxHud: OutlineBoxHud
  pencilDraw: PencilDraw
  pathDraw: PathDraw

  constructor() {
    this.container = document.createElementNS(NS.SVG, 'g') as SVGGElement
    this.container.id = 'huds'

    this.selectArea = new SelectArea(this.container)
    this.outlineBoxHud = new OutlineBoxHud(this.container)

    this.pencilDraw = new PencilDraw(this.container)
    this.pathDraw = new PathDraw(this.container)
  }
  mount(el: Node) {
    el.appendChild(this.container)
  }
}

