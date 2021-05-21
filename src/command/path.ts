import Editor from '../Editor'
import { IFSVG } from '../element/index'
import { BaseCommand } from './commands'
import { ISegment, IPoint } from '../interface'

class AddPathSeg extends BaseCommand {
  private path: IFSVG['Path']
  private seg: ISegment

  constructor(editor: Editor, path: IFSVG['Path'], seg: ISegment) {
    super(editor)
    this.path = path
    this.seg = seg

    this.doit()
  }
  static cmdName() {
    return 'addPathSeg'
  }
  cmdName() {
    return 'addPathSeg'
  }
  private doit() {
    /**
     * 根据传入的 path 的 d 和 seg，
     * 更新 metaData.handOut，并追加 d 片段
     */
    const path = this.path
    const seg = this.seg
    // const handleInOfPath = path.getMetaData('handleIn') as IPoint
    // if (!handleInOfPath) {
    //   // TODO: 如果不存在，就取对称点
    // }
    const handleOutOfPath = path.getMetaData('handleOut') as IPoint
    if (!handleOutOfPath) {
      // TODO: 如果不存在，就取对称点
    }

    path.setAttr('d', path.getAttr('d') + ` C ${handleOutOfPath.x} ${handleOutOfPath.y} ${seg.handleIn.x}  ${seg.handleIn.y} ${seg.x} ${seg.y}`)
    path.setMetaData('handleOut', seg.handleOut)
  }
  redo() {
    return this.doit()
  }
  undo() {
    let d = this.path.getAttr('d')
    const endIndex = d.lastIndexOf('C')
    const lastCurve = d.slice(endIndex)
    d = d.slice(0, endIndex).trim()
    this.path.setAttr('d', d)
    // 取最后一个 curve 的 cp1 作为 path 的 meta.handleOut
    const cp1 = lastCurve.split(/\s+/).slice(1, 3).map(v => parseFloat(v))
    this.path.setMetaData('handleOut', { x: cp1[0], y: cp1[1] })
    // 辅助线的修正
    this.editor.huds.predictedCurve.clear()
    this.editor.huds.pathDraw.segDraw.clear()
    this.editor.huds.pathDraw.setD(d)
  }
}

export {
  AddPathSeg,
}
