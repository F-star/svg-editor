import Editor from '../Editor'
import { EditorEventContext } from '../editorEventContext'

export abstract class ToolAbstract {
  constructor(protected editor: Editor) {}
  mounted() { /** Do Nothing */ }
  willUnmount() { /** Do Nothing */ }
  abstract name(): string
  abstract cursorNormal(): string
  abstract cursorPress(): string
  abstract start(ctx: EditorEventContext): void
  abstract move(ctx: EditorEventContext): void
  abstract end(ctx: EditorEventContext): void
  abstract endOutside(ctx: EditorEventContext): void
  /*  beforeActive() {
    // do something before switch to current tool
  } */
}
