import { getBoxBy2points } from "../util/math"

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
    if (!this.editor.isContentElement(targetElement)) return

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
    if (!this.selectedElement) return

    const { x: dx, y: dy } = ctx.getDiffPos()
    const rectGuide = this.editor.guideLine.rectGuide
    const w = rectGuide.getWidth()
    const h = rectGuide.getHeight()
    rectGuide.drawRect(this.outlineStartX + dx, this.outlineStartY + dy, w, h)
  }
  end() {
    if (!this.selectedElement) return
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
