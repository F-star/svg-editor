import { EditorEventContext } from '../editorEventContext'
import { ToolAbstract } from './ToolAbstract'

class Pencil extends ToolAbstract {
  name() {
    return 'pencil'
  }
  cursorNormal() {
    return 'default'
  }
  cursorPress() {
    return 'default'
  }
  start(ctx: EditorEventContext) {
    // this.editor.getCurrentLayer()

  }
  move(ctx: EditorEventContext) {}
  end(ctx: EditorEventContext) {}
  // mousedown outside viewport
  endOutside(ctx: EditorEventContext) {}
}

export default Pencil
