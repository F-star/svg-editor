
/**
 * quadratic Bezier curves
 */
import { EditorEventContext } from '../../editorEventContext'
import { getSymmetryPoint } from '../../util/math'
import { ToolAbstract } from '../ToolAbstract'

enum State {
  // INIT: 0,
  DragHandle,
  DrawPoint,
}

export class AddPath extends ToolAbstract {
  private state: State = State.DrawPoint
  private isInit = true
  private x: number
  private y: number
  private fn: Function

  constructor() {
    super()
    this.editor = null
    this.state = State.DrawPoint
  }
  name() {
    return 'addPath'
  }
  cursorNormal() {
    return 'default'
  }
  cursorPress() {
    return 'default'
  }
  start(ctx: EditorEventContext) {
    const { x, y } = ctx.getPos()
    this.x = x
    this.y = y
    this.editor.hudManager.pathDraw.addSeg({ x, y, handleIn: null, handleOut: null })
  }
  move(ctx: EditorEventContext) {
    const handleOut = ctx.getPos()
    const handleIn = getSymmetryPoint(handleOut, this.x, this.y)
    this.editor.hudManager.pathDraw.updateTailSegHandle(handleIn, handleOut)
  }
  end() {}
  endOutside() {}
  finishPath() {
    console.log('Finish Path')
    this.editor.hudManager.pathDraw.clear()
  }
  afterMount() {
    console.log('mounted.')
    this.fn = () => {
      this.finishPath()
    }
    this.editor.shortcut.register('path temp mount', 'Esc', this.fn)
  }
  beforeUnmount() {
    this.editor.shortcut.unregister('Esc', this.fn)
    this.editor.hudManager.pathDraw.clear()
  }
}
