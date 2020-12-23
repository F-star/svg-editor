import { FSVG } from "../element"
import { getBoxBy2points } from "../util/math"

/**
 * select
 * 
 * 此模块非常复杂
 * 
 * 1. 鼠标按下时，选中单个元素
 * 2. 鼠标按下为空，拖拽时产生选中框，可以选择多个元素
 * 3. 选中单个（或选区选中多个） 缩放 等控制点，拖拽改变宽高
 * 3. 切断刀这个工具时，激活的元素进入被选中状态（轮廓线+控制点）。
 * 4. 选区和元素相交的判定
 * 5. 激活元素如何保存，保存到哪里
 */
export class Select {
  constructor() {
    this.editor = null
    this.selectedEls = []

    this.outlineStartX = 0
    this.outlineStartY = 0
  }
  name() {
    return 'select'
  }
  setEditor(editor) {
    this.editor = editor
  }
  hasSelectedElsWhenStart() {
    return this.selectedEls.length > 0
  }
  start(ctx) {
    const targetElement = ctx.originEvent.target
    if (!this.editor.isContentElement(targetElement)) {
      return
    }

    const targetFElement = FSVG.create(targetElement)
    const activedElsManager = this.editor.activedElsManager
    
    if (activedElsManager.contains(targetElement)) {
      activedElsManager.heighligthEls()
    } else {
      activedElsManager.setEls(targetFElement)
    }

    this.selectedEls = activedElsManager.getEls()

    const outlineBoxHud = this.editor.hudManager.outlineBoxHud

    this.outlineStartX = outlineBoxHud.getX()
    this.outlineStartY = outlineBoxHud.getY()
  }
  move(ctx) {
    // draw selecting area
    if (!this.hasSelectedElsWhenStart()) { 
      // select no element, draw select rect
      const { x: endX, y: endY } = ctx.getPos()
      const { x: startX, y: startY } = ctx.getStartPos()
      const { x, y, w, h } = getBoxBy2points(startX, startY, endX, endY)
      this.editor.hudManager.selectArea.drawRect(x, y, w, h)
      return
    }

    // move selected elements
    const { x: dx, y: dy } = ctx.getDiffPos()
    const outlineBoxHud = this.editor.hudManager.outlineBoxHud
    const w = outlineBoxHud.getWidth()
    const h = outlineBoxHud.getHeight()
    outlineBoxHud.drawRect(this.outlineStartX + dx, this.outlineStartY + dy, w, h)
  }
  end(ctx) {
    if (!this.hasSelectedElsWhenStart()) { // finished drawn selecting area
      const box = this.editor.hudManager.selectArea.getBox()
      this.editor.hudManager.selectArea.clear()

      this.editor.activedElsManager.setElsInBox(box)

      return
    }
    this.editor.hudManager.outlineBoxHud.clear()

    
    const { x: dx, y: dy } = ctx.getDiffPos()
    this.editor.executeCommand('dmove', this.selectedEls, dx, dy)
    this.editor.activedElsManager.setEls(this.selectedEls) // set global actived elements
    this.selectedEls = []
  }
  // mousedown outside viewport
  endOutside() {
    this.editor.hudManager.outlineBoxHud.clear()
    this.editor.hudManager.selectArea.clear()
    this.editor.activedElsManager.clear()
    this.selectedEls = []
  }
}
