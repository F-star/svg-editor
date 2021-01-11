
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
    // if (this.isInit) {
    this.editor.hudManager.pathDraw.addSeg({ x, y, handleIn: null, handleOut: null })
    // }
    // this.isInit = false
  }
  move(ctx: EditorEventContext) {
    const handleOut = ctx.getPos()
    const handleIn = getSymmetryPoint(handleOut, this.x, this.y)
    this.editor.hudManager.pathDraw.updateTailSegHandle(handleIn, handleOut)
  }
  end() {
    // this.editor.executeCommand('addPathSeg')
  }

  endOutside() {

  }
}
