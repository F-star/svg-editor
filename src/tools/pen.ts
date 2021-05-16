/**
 * quadratic Bezier curves
 * 三阶贝塞尔曲线（钢笔工具）
 */
import Editor from '../Editor'
import { EditorEventContext } from '../editorEventContext'
import { FSVG, IFSVG } from '../element/index'
// import { ISegment } from '../interface'
import { getSymmetryPoint } from '../util/math'
import { ToolAbstract } from './ToolAbstract'


export class Pen extends ToolAbstract {
  private x: number
  private y: number
  private prevX: number // 用于绘制 预测曲线（predictedCurve）
  private prevY: number
  private CompleteDrawHandler: () => void
  private path: IFSVG['Path'] = null
  constructor(editor: Editor) {
    super(editor)
  }
  name() { return 'pen' }
  cursorNormal() { return 'default' }
  cursorPress() { return 'default' }
  start(ctx: EditorEventContext) {
    const { x, y } = ctx.getPos()
    this.prevX = this.x
    this.prevY = this.y
    this.x = x
    this.y = y
    this.editor.activedElsManager.clear()
    this.editor.huds.predictedCurve.clear()
    this.editor.huds.pathDraw.segDraw.render({ x, y, handleIn: { x, y }, handleOut: { x, y } })
  }
  moveNoDrag(ctx: EditorEventContext) {
    if (!this.path) {
      return
    }
    const currPos = ctx.getPos()
    this.editor.huds.predictedCurve.draw(
      { x: this.x, y: this.y },
      currPos,
      this.path.getMetaData('handleOut'),
      currPos,
    )
  }
  move(ctx: EditorEventContext) {
    const handleOut = ctx.getPos()
    const handleIn = getSymmetryPoint(handleOut, this.x, this.y)

    this.editor.huds.pathDraw.segDraw.render({ x: this.x, y: this.y, handleIn, handleOut })
    if (this.path) { // 需要先绘制出第一个 seg
      this.editor.huds.predictedCurve.draw(
        { x: this.prevX, y: this.prevY },
        { x: this.x, y: this.y },
        this.path.getMetaData('handleOut'),
        handleIn,
      )
    }
  }
  end() {
    const seg = this.editor.huds.pathDraw.segDraw.getSeg()
    if (!this.path) { // 第一个 seg，创建一个 path
      this.path = new FSVG.Path()
      this.editor.executeCommand('addPath', {
        d: `M ${this.x} ${this.y}`,
        path: this.path,
        seg
      })
    } else { // 在这个 path 的基础上添加 seg
      this.editor.executeCommand('addPathSeg', this.path, seg)
      this.editor.huds.pathDraw.setD(this.path.getAttr('d'))
    }
  }
  endOutside() { /** Do Nothing */ }
  private completePath() {
    this.editor.huds.pathDraw.clear()
    this.editor.huds.predictedCurve.clear()
    this.path = null
  }
  mounted() {
    this.CompleteDrawHandler = () => {
      this.completePath()
    }
    this.editor.shortcut.register('Path tool: temp mount', 'Esc', this.CompleteDrawHandler)
  }
  willUnmount() {
    this.completePath()
    this.editor.shortcut.unregister('Esc', this.CompleteDrawHandler)
    this.editor.huds.pathDraw.clear()
  }
}
