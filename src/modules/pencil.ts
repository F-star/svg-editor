import { EditorEventContext } from '../editorEventContext'
import { ToolAbstract } from './ToolAbstract'

export class Pencil extends ToolAbstract {
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
    console.log('pencil start')
    const { x, y } = ctx.getPos()
    this.editor.hudManager.pencilDraw.addPoint(x, y)
  }
  move(ctx: EditorEventContext) {
    const { x, y } = ctx.getPos()
    this.editor.hudManager.pencilDraw.addPoint(x, y)
  }
  private doWhenEndOrEndOutside() {
    const d = this.editor.hudManager.pencilDraw.getD()
    this.editor.hudManager.pencilDraw.clear()

    this.editor.setting.set('fill', 'none')
    this.editor.executeCommand('addPath', d)
  }
  end() { this.doWhenEndOrEndOutside() }
  endOutside() { this.doWhenEndOrEndOutside() }
}

export default Pencil
