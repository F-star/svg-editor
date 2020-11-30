
export class DragCanvas {
  name() {
    return 'dragCanvas'
  }
  setEditor(editor) { // 依赖注入
    this.editor = editor
  }
  start(e) {
    console.log('dragCanvas start')
    const pos = e.getPosition()
    this.startX = pos.x
    this.startY = pos.y

    const offset = e.getOffset()
    this.startOffsetX = offset.x
    this.startOffsetX = offset.y
  }
  move(e) {
    const { x, y } = e.getOffset()
    this.editor.svgContainer.scrollLeft = this.startOffsetX + x
    this.editor.svgContainer.scrollTop = this.startOffsetY + y
  }
  end() {

  }
}
