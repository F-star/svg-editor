
/**
 * context class
 *
 * used for tool event
 */

import Editor from './Editor'

export class EditorEventContext {
  nativeEvent: MouseEvent
  isEndInside: boolean
  private editor: Editor

  private startX: number // 最近一次的鼠标按下的坐标
  private startY: number
  private startClientX: number
  private startClientY: number

  constructor(editor: Editor, e: MouseEvent) {
    this.editor = editor
    this.nativeEvent = e
    this.isEndInside = false
    this.startX = 0
    this.startY = 0
    this.startClientX = 0 // 用于计算相对位移（dx 和 dy）
    this.startClientY = 0

    this.setStartPos() // 记录起始位置
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
