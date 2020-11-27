

// Module.register('DragTree', function() {}

import { NS } from "../constants"
import { getBoxBy2points } from "../util"

class AddRect {
  constructor() {
    this.editor = null
  }
  name() {
    return 'addRect'
  }
  setEditor(editor) { // 依赖注入
    this.editor = editor
  }
  start(e) {
    const { x, y } = e.getPosition()
    this.startX = x
    this.startY = y
  }
  move(e) {
    const { x: endX, y: endY } = e.getPosition()
    const { x, y, w, h } = getBoxBy2points(this.startX, this.startY, endX, endY)
    this.editor.guideLine.rectGuide.drawRect(x, y, w, h)
  }
  end(e) {
    this.editor.guideLine.rectGuide.clear()

    const { x: endX, y: endY } = e.getPosition()
    const { x, y, w, h } = getBoxBy2points(this.startX, this.startY, endX, endY)
    if (w < 2 || h < 2) {
      // TODO: 弹出输入宽高的弹窗
      console.log('宽度或高度小于 2，不进行矩形的绘制')
      return
    }
    this.editor.executeCommand('addRect', x, y, w, h)
  }
  // end outside the viewport
  endOutside() {

  }
}

export default AddRect