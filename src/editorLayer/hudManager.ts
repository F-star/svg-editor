/**
 * guide line layer
 */

import { OutlineBoxHud } from './outlineBoxHud'
import { SelectArea } from './selectArea'
import { PencilDraw } from './pencilDraw'
import { PathDraw } from './pathDraw'
import { NS } from '../constants'
import Editor from '../Editor'
import ElementsOutlinesHub from './elementOutlinesHud'

export class HudManager {
  container: SVGGElement
  selectArea: SelectArea
  outlineBoxHud: OutlineBoxHud
  pencilDraw: PencilDraw
  pathDraw: PathDraw
  elsOutlinesHub: ElementsOutlinesHub

  constructor(private editor: Editor) {
    this.container = document.createElementNS(NS.SVG, 'g') as SVGGElement
    this.container.id = 'huds'
    // 这里的顺序是由讲究的
    this.elsOutlinesHub = new ElementsOutlinesHub(this.container)
    this.outlineBoxHud = new OutlineBoxHud(this.container, editor)
    this.selectArea = new SelectArea(this.container)

    this.pencilDraw = new PencilDraw(this.container)
    this.pathDraw = new PathDraw(this.container, editor)
  }
  mount() {
    this.editor.svgStage.appendChild(this.container)
  }
}

