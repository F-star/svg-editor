import { getBoxBy2points } from "../util/math"

/**
 * select
 * 
 * 此模块非常复杂
 * 
 * 1. 鼠标按下时，选中单个元素
 * 2. 鼠标按下为空，拖拽时产生选中框，可以选择多个元素
 * 3. 选中单个（或选区选中多个） 缩放 等控制点，拖拽改变宽高
 * 3. 切断刀这个工具时，激活的元素进入被选中状态（轮廓线+控制点）。
 * 4. 选区和元素相交的判定
 * 5. 激活元素如何保存，保存到哪里
 */
export class Select {
  constructor() {
    this.editor = null
    this.selectedElement = null

    this.outlineStartX = 0
    this.outlineStartY = 0
  }
  name() {
    return 'select'
  }
  setEditor(editor) {
    this.editor = editor
  }
  start(ctx) {
    const targetElement = ctx.originEvent.target
    if (!this.editor.isContentElement(targetElement)) {
      return
    }

    this.selectedElement = targetElement
    const x = parseFloat(targetElement.getAttribute('x'))
    const y = parseFloat(targetElement.getAttribute('y'))
    const w = parseFloat(targetElement.getAttribute('width'))
    const h = parseFloat(targetElement.getAttribute('height'))
    
    this.outlineStartX = x
    this.outlineStartY = y

    this.editor.guideLine.rectGuide.drawRect(x, y, w, h)
  }
  move(ctx) {
    if (!this.selectedElement) {
      // select no element, draw select rect
      const { x: endX, y: endY } = ctx.getPos()
      const { x: startX, y: startY } = ctx.getStartPos()
      const { x, y, w, h } = getBoxBy2points(startX, startY, endX, endY)
      this.editor.guideLine.rectGuide.drawRect(x, y, w, h)
      return
    }

    const { x: dx, y: dy } = ctx.getDiffPos()
    const rectGuide = this.editor.guideLine.rectGuide
    const w = rectGuide.getWidth()
    const h = rectGuide.getHeight()
    rectGuide.drawRect(this.outlineStartX + dx, this.outlineStartY + dy, w, h)
  }
  end() {
    if (!this.selectedElement) {
      this.editor.guideLine.rectGuide.clear()
      // TODO: active frame by select rect.

      return
    }
    const rectGuide = this.editor.guideLine.rectGuide
    rectGuide.clear()

    const x = rectGuide.getX()
    const y = rectGuide.getY()
    
    this.editor.executeCommand('move', this.selectedElement, x, y)
    this.selectedElement = null
  }
  // mousedown outside viewport
  endOutside() {
    this.editor.guideLine.rectGuide.clear()
    this.selectedElement = null
  }
}
