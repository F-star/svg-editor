import { getBoxBy2points } from "../util/math"

export class Select {
  constructor() {
    this.editor = null
  }
  name() {
    return 'select'
  }
  setEditor(editor) {
    this.editor = editor
  }
  start(ctx) {
  }
  move(ctx) {
    const { x: endX, y: endY } = ctx.getPos()
    const { x: startX, y: startY } = ctx.getStartPos()
    const { x, y, w, h } = getBoxBy2points(startX, startY, endX, endY)
    this.editor.guideLine.rectGuide.drawRect(x, y, w, h)
  }
  end(ctx) {
    this.editor.guideLine.rectGuide.clear()
  }
  // mousedown outside viewport
  endOutside() {
    this.editor.guideLine.rectGuide.clear()
  }
}
