import Editor from '../../Editor'
import { EditorEventContext } from '../../editorEventContext'
import { FElement } from '../../element/baseElement'
import { IBox } from '../../element/box'
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
  start() { /** Do Nothing */ }
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

class ScaleElementMode extends Mode {
  private cx: number
  private cy: number
  private originBox: IBox

  start(ctx: EditorEventContext) {
    /**
     * 1. record match position
     */
    const target = ctx.nativeEvent.target
    const outlineBoxHud = this.editor.hudManager.outlineBoxHud

    const grid = outlineBoxHud.getGripIfMatch(target as SVGElement)
    const originBox = outlineBoxHud.getBox()

    /**
     * corner scale grid
     */
    // TODO:
    const centerGrid = outlineBoxHud.scaleGrids.getOppositeGrip(grid)
    const pos = centerGrid.getCenterPos()
    this.cx = pos.x
    this.cy = pos.y
  }
  move(ctx: EditorEventContext) {
    /** 2. get current pos */
    const { x, y } = ctx.getPos()
    /** calc size */
    const x1 = Math.min(x, this.cx)
    const y1 = Math.min(y, this.cy)
    const x2 = Math.max(x, this.cx)
    const y2 = Math.max(y, this.cy)
    const width = x2 - x1
    const height = y2 - y1
    this.editor.hudManager.outlineBoxHud.drawRect(x1, y1, width, height)
  }
  end() {
    const { x, y, width, height } = this.editor.hudManager.outlineBoxHud.getBox()
    const elements = this.editor.activedElsManager.getEls()
    this.editor.executeCommand('setAttr', elements, { x, y, width, height })
  }
  endOutside() {
    this.editor.hudManager.outlineBoxHud.clear()
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
  Mode,
  ModeFactory,
}
