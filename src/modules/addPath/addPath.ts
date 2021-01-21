
/**
 * quadratic Bezier curves
 */
import { EditorEventContext } from '../../editorEventContext'
import { FSVG, IFSVG } from '../../element/index'
import { ISegment } from '../../interface'
import { getSymmetryPoint } from '../../util/math'
import { ToolAbstract } from '../ToolAbstract'

// enum State {
//   DragHandle,
//   DrawPoint,
// }

export class AddPath extends ToolAbstract {
  // private state: State = State.DrawPoint
  // private isInit = true
  private x: number
  private y: number
  private fn: Function
  private path: IFSVG['Path']

  constructor() {
    super()
    this.editor = null
    // this.state = State.DrawPoint
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
    const seg: ISegment = { x, y, handleIn: null, handleOut: null }
    this.editor.activedElsManager.clear()
    this.editor.hudManager.pathDraw.addSeg(seg)
  }
  move(ctx: EditorEventContext) {
    const handleOut = ctx.getPos()
    const handleIn = getSymmetryPoint(handleOut, this.x, this.y)
    this.editor.hudManager.pathDraw.updateTailSegHandle(handleIn, handleOut)
  }
  end() {
    if (!this.path) {
      this.path = new FSVG.Path()
    }
    this.editor.executeCommand('addPathSeg', this.path, null, null)
  }
  endOutside() {}
  completePath() {
    console.log('Finish Path')
    const pathDraw = this.editor.hudManager.pathDraw
    const d = pathDraw.getD()

    d && this.editor.executeCommand('addPath', d)
    pathDraw.clear()
  }
  mounted() {
    console.log('mounted.')
    this.fn = () => {
      this.completePath()
    }
    this.editor.shortcut.register('Path tool: temp mount', 'Esc', this.fn)
  }
  willUnmount() {
    this.completePath()
    this.editor.shortcut.unregister('Esc', this.fn)
    this.editor.hudManager.pathDraw.clear()
  }
}
