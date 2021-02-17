import Editor from '../Editor'
import { IFSVG } from '../element/index'
import { BaseCommand } from './commands'
import { ISegment } from '../interface'

class AddPathSeg extends BaseCommand {
  private path: IFSVG['Path']

  constructor(editor: Editor, path: IFSVG['Path'], seg1: ISegment, seg: ISegment) {
    console.log('add path segment')
    super(editor)
    this.path = path
  }
  static cmdName() {
    return 'addPathSeg'
  }
  cmdName() {
    return 'addPathSeg'
  }
  redo() {
    //
  }
  undo() {
    //
  }
}

export {
  AddPathSeg,
}
