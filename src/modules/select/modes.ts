import Editor from '../../Editor'
import { EditorEventContext } from '../../editorEventContext'
import { FElement } from '../../element/baseElement'
import { FSVG } from '../../element/index'
import { getBoxBy2points } from '../../util/math'


abstract class Mode {
  constructor(protected editor: Editor) {}
  abstract start(ctx: EditorEventContext): void
  abstract move(ctx: EditorEventContext): void
  abstract end(ctx: EditorEventContext): void
  abstract endOutside(ctx: EditorEventContext): void
}


class SelectAreaMode extends Mode {
  start() {
    // Do Nothing
  }
  move(ctx: EditorEventContext) {
    const { x: endX, y: endY } = ctx.getPos()
    const { x: startX, y: startY } = ctx.getStartPos()
    const { x, y, w, h } = getBoxBy2points(startX, startY, endX, endY)
    this.editor.hudManager.selectArea.drawRect(x, y, w, h)
  }
  end() {
    const box = this.editor.hudManager.selectArea.getBox()
    this.editor.hudManager.selectArea.clear()
    this.editor.activedElsManager.setElsInBox(box)
  }
  endOutside() {
    this.editor.hudManager.selectArea.clear()
    this.editor.activedElsManager.clear()
  }
}

class MoveElementsMode extends Mode {
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

    const { x: dx, y: dy } = ctx.getDiffPos()
    const zoom = this.editor.viewport.getZoom()
    this.editor.executeCommand('dmove', this.selectedEls, dx / zoom, dy / zoom)
    this.editor.activedElsManager.setEls(this.selectedEls) // set global actived elements
    this.selectedEls = []
  }
  endOutside() {
    this.selectedEls = []
  }
}

class ScaleElementMode extends Mode {
  start() {
    console.log('scale mode: start')
  }
  move() {
    console.log('scale mode: move')
  }
  end() {
    console.log('scale mode: end')
  }
  endOutside() {
    console.log('scale mode: endOutside')
  }
}

type ModeType = 'selectArea' | 'moveElements' | 'scaleElements'

class ModeFactory {
  private strategies: {[K in ModeType]: Mode}

  constructor(editor: Editor) {
    this.strategies = {
      selectArea: new SelectAreaMode(editor),
      moveElements: new MoveElementsMode(editor),
      scaleElements: new ScaleElementMode(editor),
    }
  }
  getStrategy(type: ModeType) {
    return this.strategies[type]
  }
}

export {
  Mode as Strategy,
  ModeFactory,
}
