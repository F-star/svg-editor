import Mode from './Mode'
import { EditorEventContext } from '../../../editorEventContext'
import { FElement } from '../../../element/baseElement'

import { FSVG } from '../../../element/index'


class MoveMode extends Mode {
  private selectedEls: Array<FElement> = []
  private outlineStartX = 0
  private outlineStartY = 0

  start(ctx: EditorEventContext) {
    // encapsulate svg element
    const target = ctx.nativeEvent.target
    const activedElsManager = this.editor.activedElsManager
    const outlineBoxHud = this.editor.hudManager.outlineBoxHud

    const targetFElement = FSVG.create(target as SVGElement)
    // check whether target element is part of activedEls.
    if (activedElsManager.contains(target as SVGElement)) {
      activedElsManager.heighligthEls()
    } else {
      activedElsManager.setEls(targetFElement)
    }
    this.selectedEls = activedElsManager.getEls()
    // record outline pos for move it when move lately.
    this.outlineStartX = outlineBoxHud.getX()
    this.outlineStartY = outlineBoxHud.getY()
  }
  move(ctx: EditorEventContext) {
    const { x: dx, y: dy } = ctx.getDiffPos()
    const zoom = this.editor.viewport.getZoom()
    const outlineBoxHud = this.editor.hudManager.outlineBoxHud
    const w = outlineBoxHud.getWidth()
    const h = outlineBoxHud.getHeight()
    outlineBoxHud.drawRect(this.outlineStartX + dx / zoom, this.outlineStartY + dy / zoom, w, h)
  }
  end(ctx: EditorEventContext) {
    this.editor.hudManager.outlineBoxHud.clear()
    this.editor.hudManager.elsOutlinesHub.clear()

    const { x: dx, y: dy } = ctx.getDiffPos()
    if (dx !== 0 || dy !== 0) {
      const zoom = this.editor.viewport.getZoom()
      this.editor.executeCommand('dmove', this.selectedEls, dx / zoom, dy / zoom)
    }

    this.editor.activedElsManager.setEls(this.selectedEls) // set global actived elements
    this.selectedEls = []
  }
  endOutside() {
    this.selectedEls = []
  }
}

export default MoveMode
