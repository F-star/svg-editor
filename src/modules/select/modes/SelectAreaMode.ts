import Mode from './Mode'
import { EditorEventContext } from '../../../editorEventContext'
import { getBoxBy2points } from '../../../util/math'

class SelectAreaMode extends Mode {
  start() { /** Do Nothing */ }
  move(ctx: EditorEventContext) {
    const { x: endX, y: endY } = ctx.getPos()
    const { x: startX, y: startY } = ctx.getStartPos()
    const { x, y, w, h } = getBoxBy2points(startX, startY, endX, endY)
    this.editor.hudManager.selectArea.drawRect(x, y, w, h)
  }
  end() {
    const box = this.editor.hudManager.selectArea.getBox()
    this.editor.hudManager.selectArea.clear()
    this.editor.activedElsManager.setElsInBox(box)
  }
  endOutside() {
    this.editor.hudManager.selectArea.clear()
    this.editor.activedElsManager.clear()
  }
}

export default SelectAreaMode
