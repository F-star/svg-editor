
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
    console.log(offset)
    this.startOffsetX = offset.x
    this.startOffsetY = offset.y
  }
  move(e) {

    // FIXME: if scrollTop has changed, getPosition() can't get right value
    // because it use `offsetX` property.
    const { x, y } = e.getPosition()
    const dx = x - this.startX
    const dy = y - this.startY
    const zoom = this.editor.getZoom()

    this.editor.svgContainer.scrollLeft = (this.startOffsetX - dx) * zoom
    this.editor.svgContainer.scrollTop = (this.startOffsetY - dy) * zoom
  }
  end() {

  }
}
