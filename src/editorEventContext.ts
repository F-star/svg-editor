
/**
 * context class
 *
 * used for tool event
 */

import Editor from './Editor'

export class EditorEventContext {
  nativeEvent: MouseEvent
  isEndInside: boolean
  private mousePressed: boolean
  private editor: Editor

  private startX: number
  private startY: number
  private offsetX: number
  private offsetY: number
  private startClientX: number
  private startClientY: number
  private dx: number
  private dy: number

  constructor(editor: Editor, e: MouseEvent) {
    this.editor = editor
    this.mousePressed = false
    this.nativeEvent = e
    this.isEndInside = false

    this.startX = 0
    this.startY = 0

    this.offsetX = 0
    this.offsetY = 0

    this.startClientX = 0 // used to calc dx and dy.
    this.startClientY = 0
    this.dx = 0
    this.dy = 0

    this.setStartPos()
  }
  setOriginEvent(e: MouseEvent) {
    this.nativeEvent = e
  }
  setStartPos() {
    const { x, y } = this.getPos()

    this.startX = x
    this.startY = y

    this.startClientX = this.nativeEvent.clientX
    this.startClientY = this.nativeEvent.clientY
  }
  releaseMouse() {
    this.mousePressed = false
  }
  pressMouse() {
    this.mousePressed = true
  }
  getPos() {
    const zoom = this.editor.viewport.getZoom()
    const { x, y } = this.editor.viewport.getContentOffset()
    return {
      x: this.nativeEvent.offsetX / zoom - x,
      y: this.nativeEvent.offsetY / zoom - y,
    }
  }
  getStartPos() {
    return {
      x: this.startX,
      y: this.startY,
    }
  }
  // without calc with zoom value
  getDiffPos() {
    const x = this.nativeEvent.clientX - this.startClientX
    const y = this.nativeEvent.clientY - this.startClientY
    return { x, y }
  }
}
