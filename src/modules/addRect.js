

// Module.register('DragTree', function() {}

import { NS } from "../constants"

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
  move() {

  }
  end(e) {
    const { x: endX, y: endY } = e.getPosition()
    let x, y, w, h
    w = Math.abs(endX - this.startX)
    h = Math.abs(endY - this.startY)
    if (w < 2 || h < 2) {
      // TODO: 弹出输入宽高的弹窗
      console.log('宽度或高度小于 2，不进行正方形的绘制')
      return
    }
    x = Math.min(endX, this.startX)
    y = Math.min(endY, this.startY)


    // const rect = document.createElementNS(NS.SVG, 'rect')
    // rect.setAttribute('x', x)
    // rect.setAttribute('y', y)
    // rect.setAttribute('width', w)
    // rect.setAttribute('height', h)
    // this.editor.getCurrentLayer().appendChild(rect)
    this.editor.executeCommand('addRect', x, y, w, h)
  }
}

export default AddRect