
import { EditorEventContext } from '../editorEventContext'
import { ToolAbstract } from './ToolAbstract'

export class Zoom extends ToolAbstract {
  constructor() {
    super()
    this.editor = null
  }
  name() {
    return 'zoom'
  }
  cursorNormal() {
    return 'zoom-in'
  }
  cursorPress() {
    return 'zoom-in'
  }
  start(ctx: EditorEventContext) {
    const { x, y } = ctx.getPos()
    this.editor.viewport.zoomIn(x, y)
  }
  move(ctx: EditorEventContext) {
    // TODO:
    /* const { x: dx, y: dy } = ctx.getDiffPos()
    const distance = Math.sqrt(dx * dx + dy * dy)
    console.log(distance) */
  }
  end(ctx: EditorEventContext) {

  }
  // mousedown outside viewport
  endOutside(ctx: EditorEventContext) {}
}
