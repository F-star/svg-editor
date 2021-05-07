import Mode from './Mode'
import { EditorEventContext } from '../../../editorEventContext'
import { getBoxBy2points } from '../../../util/math'

class SelectAreaMode extends Mode {
  start() { /** Do Nothing */ }
  move(ctx: EditorEventContext) {
    const { x: endX, y: endY } = ctx.getPos()
    const { x: startX, y: startY } = ctx.getStartPos()
    const { x, y, w, h } = getBoxBy2points(startX, startY, endX, endY)
    this.editor.huds.selectArea.drawRect(x, y, w, h)
  }
  end() {
    const box = this.editor.huds.selectArea.getBox()
    this.editor.huds.selectArea.clear()
    this.editor.activedElsManager.setElsInBox(box)
  }
  endOutside() {
    this.editor.huds.selectArea.clear()
    this.editor.activedElsManager.clear()
  }
}

export default SelectAreaMode
