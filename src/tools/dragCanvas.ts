import Editor from '../Editor'
import { EditorEventContext } from '../editorEventContext'
import { ToolAbstract } from './ToolAbstract'

export class DragCanvas extends ToolAbstract {
  private startOffsetX: number
  private startOffsetY: number

  constructor(editor: Editor) {
    super(editor)
    this.startOffsetX = 0
    this.startOffsetY = 0
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
  start() {
    const scroll = this.editor.viewport.getScroll()
    this.startOffsetX = scroll.x
    this.startOffsetY = scroll.y
  }
  move(ctx: EditorEventContext) {
    const { x: dx, y: dy } = ctx.getDiffPos()
    this.editor.viewport.setScroll(this.startOffsetX - dx, this.startOffsetY - dy)
  }
  end() {}
  endOutside() {}
}
