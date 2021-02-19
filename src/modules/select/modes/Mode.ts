import Editor from '../../../Editor'
import { EditorEventContext } from '../../../editorEventContext'

abstract class Mode {
  constructor(protected editor: Editor) {}
  abstract start(ctx: EditorEventContext): void
  abstract move(ctx: EditorEventContext): void
  abstract end(ctx: EditorEventContext): void
  abstract endOutside(ctx: EditorEventContext): void
}

export default Mode
