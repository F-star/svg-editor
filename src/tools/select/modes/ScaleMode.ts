import Mode from './Mode'
import { EditorEventContext } from '../../../editorEventContext'
// import { IBox } from '../../../element/box'

class ScaleMode extends Mode {
  private cx: number
  private cy: number
  // private originBox: IBox

  start(ctx: EditorEventContext) {
    /**
     * 1. record match position
     * 记录相匹配位置
     */
    const target = ctx.nativeEvent.target
    const outlineBoxHud = this.editor.huds.outlineBoxHud
    // 根据 target 获取对应缩放点（比如是左上还是右下）
    const grid = outlineBoxHud.getGripIfMatch(target as SVGElement)
    // const originBox = outlineBoxHud.getBox()
    const centerGrid = outlineBoxHud.scaleGrids.getOppositeGrip(grid) // 获取缩放中心点
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
    this.editor.huds.outlineBoxHud.drawRect(x1, y1, width, height)
  }
  end(ctx: EditorEventContext) {
    const { x: dx, y: dy } = ctx.getDiffPos()
    if (dx === 0 && dy === 0) return

    const { x, y, width, height } = this.editor.huds.outlineBoxHud.getBox()
    const elements = this.editor.activedElsManager.getEls()
    this.editor.executeCommand('setAttr', elements, { x, y, width, height })
    // 计算新的图形位置
    this.editor.activedElsManager.heighligthEls()
  }
  endOutside() {
    this.editor.huds.outlineBoxHud.clear()
    this.editor.huds.elsOutlinesHub.clear()
  }
}

export default ScaleMode
