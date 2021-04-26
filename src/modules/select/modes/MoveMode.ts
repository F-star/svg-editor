import Mode from './Mode'
import { EditorEventContext } from '../../../editorEventContext'
import { FElement } from '../../../element/baseElement'

import { FSVG } from '../../../element/index'


class MoveMode extends Mode {
  private selectedEls: Array<FElement> = []

  start(ctx: EditorEventContext) {
    // encapsulate svg element
    const target = ctx.nativeEvent.target
    const activedElsManager = this.editor.activedElsManager

    const targetFElement = FSVG.create(target as SVGElement)
    // check whether target element is part of activedEls.
    if (activedElsManager.contains(target as SVGElement)) {
      activedElsManager.heighligthEls()
    } else {
      activedElsManager.setEls(targetFElement)
    }
    this.selectedEls = activedElsManager.getEls()
  }
  move(ctx: EditorEventContext) {
    const { x: dx, y: dy } = ctx.getDiffPos()
    const zoom = this.editor.viewport.getZoom()
    this.editor.hudManager.elsOutlinesHub.translate(dx / zoom, dy / zoom)
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
