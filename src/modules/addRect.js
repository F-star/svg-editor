

// Module.register('DragTree', function() {}

class AddRect {
  constructor() {
    this.editor = null
  }
  setEditor(editor) { // 依赖注入
    this.editor = editor
  }
  name() {
    return 'addRect'
  }
  start(e) {
    const { x, y } = e.getPostion()

  }
  move() {

  }
  end(e, editor) {
    const { x, y } = e.getPostion()
    const currentLayer = this.editor.currentLayer()
  }
}

export default AddRect