import { EditorEventContext } from '../editorEventContext'
import { FSVG } from '../element/index'
import { FElement } from '../element/baseElement'
import { getBoxBy2points } from '../util/math'
import { ToolAbstract } from './ToolAbstract'

enum Mode {
  Init,
  SelectArea,
  AcitveEls,
  Scale,
}

/**
 * select
 *
 * 此模块非常复杂
 *
 * 1. 鼠标按下时，选中单个元素
 * 2. 鼠标按下为空，拖拽时产生选中框，可以选择多个元素
 * 3. 选中单个（或选区选中多个） 缩放 等控制点，拖拽改变宽高
 * 3. 切断到这个工具时，激活的元素进入被选中状态（轮廓线+控制点）。
 * 4. 选区和元素相交的判定
 * 5. 激活元素如何保存，保存到哪里
 */
export class Select extends ToolAbstract {
  private selectedEls: Array<FElement>
  private outlineStartX: number
  private outlineStartY: number
  private mode = Mode.Init

  constructor() {
    super()
    this.selectedEls = []

    this.outlineStartX = 0
    this.outlineStartY = 0
  }
  name() {
    return 'select'
  }
  cursorNormal() {
    return 'default'
  }
  cursorPress() {
    return 'default'
  }
  hasSelectedElsWhenStart() {
    return this.selectedEls.length > 0
  }
  start(ctx: EditorEventContext) {
    const target = ctx.originEvent.target
    const activedElsManager = this.editor.activedElsManager
    const outlineBoxHud = this.editor.hudManager.outlineBoxHud

    const transformGrid = outlineBoxHud.containsGrip(target as SVGElement)
    if (transformGrid) {
      // TODO: enter "Scale" mode
      this.mode = Mode.Scale
      return
    }
    // no exist in g#content (the content drawing area), enter "Select Area" mode
    if (!this.editor.isContentElement(target)) {
      this.mode = Mode.SelectArea
      return
    }

    // encapsulate svg element
    const targetFElement = FSVG.create(target as SVGElement)
    // check whether target element is part of activedEls.
    if (activedElsManager.contains(target as SVGElement)) {
      activedElsManager.heighligthEls()
    } else {
      activedElsManager.setEls(targetFElement)
    }

    this.mode = Mode.AcitveEls
    this.selectedEls = activedElsManager.getEls()
    // record outline pos for move it when move lately.
    this.outlineStartX = outlineBoxHud.getX()
    this.outlineStartY = outlineBoxHud.getY()
  }
  move(ctx: EditorEventContext) {
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
    const zoom = this.editor.viewport.getZoom()
    const outlineBoxHud = this.editor.hudManager.outlineBoxHud
    const w = outlineBoxHud.getWidth()
    const h = outlineBoxHud.getHeight()
    outlineBoxHud.drawRect(this.outlineStartX + dx / zoom, this.outlineStartY + dy / zoom, w, h)
  }
  end(ctx: EditorEventContext) {
    if (!this.hasSelectedElsWhenStart()) { // finished drawn selecting area
      const box = this.editor.hudManager.selectArea.getBox()
      this.editor.hudManager.selectArea.clear()

      this.editor.activedElsManager.setElsInBox(box)

      return
    }
    this.editor.hudManager.outlineBoxHud.clear()

    const { x: dx, y: dy } = ctx.getDiffPos()
    const zoom = this.editor.viewport.getZoom()
    this.editor.executeCommand('dmove', this.selectedEls, dx / zoom, dy / zoom)
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
