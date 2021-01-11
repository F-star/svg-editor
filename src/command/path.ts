import Editor from '../editor'
import { Path } from '../element/path'
import { BaseCommand } from './commands'

export class AddPathSeg extends BaseCommand {
  private path: Path

  constructor(editor: Editor, path: Path) {
    super(editor)
    this.path = path
  }
  static cmdName() {
    return 'addPathSeg'
  }
  redo() {

  }
  undo() {

  }
}
