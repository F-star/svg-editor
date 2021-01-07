
/**
 * quadratic Bezier curves
 */
import { ToolAbstract } from '../ToolAbstract'

enum State {
  // INIT: 0,
  DragCtrPoint,
  DrawPoint,
}

class BezierCurve extends ToolAbstract {
  state: State = State.DrawPoint

  constructor() {
    super()
    this.editor = null
    this.state = State.DrawPoint
  }
  setEditor(editor) { // 依赖注入
    this.editor = editor
  }
  name() {
    return 'bezierCurve'
  }
  cursorNormal() {
    return 'default'
  }
  cursorPress() {
    return 'default'
  }
  start(ctx) {
    // check if drag ctrpoints?

    if (this.state === State.DrawPoint) {
      // 1. create path guide and control-line
    }
  }
  move(ctx) {
    if (this.state === State.DragCtrPoint) {
      // 2. change control-line
      this.state = State.DragCtrPoint
    }
  }
  end(ctx) {
    if (this.state === State.DragCtrPoint) {
      this.state = State.DrawPoint
      //
    }
  }
  // mousedown outside viewport
  endOutside() {

  }
}

export { BezierCurve }
