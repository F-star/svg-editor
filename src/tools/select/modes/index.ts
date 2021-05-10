import Mode from './Mode'
import SelectAreaMode from './SelectAreaMode'
import MoveMode from './MoveMode'
import ScaleMode from './ScaleMode'
import Editor from '../../../Editor'


type ModeType = 'selectArea' | 'move' | 'scale'

class ModeFactory {
  private strategies: {[K in ModeType]: Mode}

  constructor(editor: Editor) {
    this.strategies = {
      selectArea: new SelectAreaMode(editor),
      move: new MoveMode(editor),
      scale: new ScaleMode(editor),
    }
  }
  getMode(type: ModeType) {
    return this.strategies[type]
  }
}

export {
  Mode,
  ModeFactory,
}
