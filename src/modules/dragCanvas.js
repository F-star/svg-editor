
export class DragCanvas {
  constructor() {
    this.editor = null
    this.startOffsetX = 0
    this.startOffsetY = 0
  }
  setEditor(editor) { // 依赖注入
    this.editor = editor
  }
  name() {
    return 'dragCanvas'
  }
  cursorNormal() {
    return 'grab'
  }
  cursorPress() {
    return 'grabbing'
  }
  beforeActive() {
    // do something before switch to current tool
  }
  start(ctx) {
    const scroll = this.editor.getScroll()
    this.startOffsetX = scroll.x
    this.startOffsetY = scroll.y
  }
  move(ctx) {
    const zoom = this.editor.getZoom()
    const { x: dx, y: dy } = ctx.getDiffPos()
    this.editor.setScroll(this.startOffsetX - dx, this.startOffsetY - dy)
  }
  end() {}
  endOutside() {}
}
