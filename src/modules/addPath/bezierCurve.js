
/**
 * quadratic Bezier curves
 */

const ENUM_STATE = {
  // INIT: 0,
  DRAG_CTR_POINT: 1,
  DRAW_POINT: 2,

}

class BezierCurve {
  constructor() {
    this.editor = null
    this.state = ENUM_STATE.DRAW_POINT
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

    if (this.state === ENUM_STATE.DRAW_POINT) {
      // 1. create path guide and control-line
    }
  }
  move(ctx) {
    if (this.state === ENUM_STATE.DRAG_CTR_POINT) {
      // 2. change control-line
      this.state = ENUM_STATE.DRAG_CTR_POINT
    }
  }
  end(ctx) {
    if (this.state === ENUM_STATE.DRAG_CTR_POINT) {
      this.state = ENUM_STATE.DRAW_POINT
      // 
    }
  }
  // mousedown outside viewport
  endOutside() {
    
  }
}

export  { BezierCurve }