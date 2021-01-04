


// import { getBoxBy2points } from "../util/math"

class Pencil {
  constructor() {
    this.editor = null
  }
  setEditor(editor) { // 依赖注入
    this.editor = editor
  }
  name() {
    return 'pencil'
  }
  cursorNormal() {
    return 'default'
  }
  cursorPress() {
    return 'default'
  }
  start(ctx) {}
  move(ctx) {}
  end(ctx) {

  }
  // mousedown outside viewport
  endOutside() {
    
  }
}

export default AddRect