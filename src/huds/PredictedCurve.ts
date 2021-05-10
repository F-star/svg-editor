/**
 * 预测曲线（钢笔工具用）
 */
// import { ISegment } from '../interface'
import { FSVG, IFSVG } from '../element/index'
import { IPoint } from '../interface'
import editorDefaultConfig from '../config/editorDefaultConfig'

class PredictedCurve {
  curve: IFSVG['Path']
  constructor() {
    const curve = this.curve = new FSVG.Path()
    curve.setID('predicted-curve')
    curve.setAttr('fill', 'none')
    curve.setAttr('stroke', editorDefaultConfig.outlineColor)
    curve.setAttr('stroke-width', '1px')
    curve.setNonScalingStroke()
    this.curve.hide()
  }
  mount(parent: SVGGElement) {
    parent.appendChild(this.curve.el())
  }
  draw(p1: IPoint, p2: IPoint, cp1: IPoint, cp2: IPoint) {
    this.curve.setAttr('d', `M ${p1.x} ${p1.y} C ${p2.x} ${p2.y} ${cp1.x} ${cp1.y} ${cp2.x} ${cp2.y}`)
    this.curve.visible()
  }
  clear() {
    this.curve.hide()
  }
}

export default PredictedCurve
