
import { EditorEventContext } from "../editorEventContext"
import { getBoxBy2points } from "../util/math"
import { ToolAbstract } from "./ToolAbstract"

class AddRect extends ToolAbstract {
  constructor() {
    super()
    this.editor = null
  }
  name() {
    return 'addRect'
  }
  cursorNormal() {
    return 'crosshair'
  }
  cursorPress() {
    return 'crosshair'
  }
  start() {
    // do nothing
  }
  move(ctx: EditorEventContext) {
    const { x: endX, y: endY } = ctx.getPos()
    const { x: startX, y: startY } = ctx.getStartPos()
    const { x, y, w, h } = getBoxBy2points(startX, startY, endX, endY)
    this.editor.hudManager.outlineBoxHud.drawRect(x, y, w, h)
  }
  end(ctx: EditorEventContext) {
    this.editor.hudManager.outlineBoxHud.clear()

    const { x: endX, y: endY } = ctx.getPos()
    const { x: startX, y: startY } = ctx.getStartPos()
    const { x, y, w, h } = getBoxBy2points(startX, startY, endX, endY)
    if (w < 2 && h < 2) {
      // TODO: open a dialog to input width and height
      console.log('width and height both less equal to 2，drawing nothing')
      return
    }
    this.editor.executeCommand('addRect', x, y, w, h)
  }
  // mousedown outside viewport
  endOutside() {
    this.editor.hudManager.outlineBoxHud.clear()
  }
}

export default AddRect