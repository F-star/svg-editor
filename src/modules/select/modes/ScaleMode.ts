import Mode from './Mode'
import { EditorEventContext } from '../../../editorEventContext'
import { IBox } from '../../../element/box'

class ScaleMode extends Mode {
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
  end(ctx: EditorEventContext) {
    const { x: dx, y: dy } = ctx.getDiffPos()
    if (dx === 0 && dy === 0) return

    const { x, y, width, height } = this.editor.hudManager.outlineBoxHud.getBox()
    const elements = this.editor.activedElsManager.getEls()
    this.editor.executeCommand('setAttr', elements, { x, y, width, height })
  }
  endOutside() {
    this.editor.hudManager.outlineBoxHud.clear()
    this.editor.hudManager.elsOutlinesHub.clear()
  }
}

export default ScaleMode
