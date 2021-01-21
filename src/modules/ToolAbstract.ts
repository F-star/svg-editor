import Editor from '../Editor'
import { EditorEventContext } from '../editorEventContext'

export abstract class ToolAbstract {
  protected editor: Editor

  setEditor(editor: Editor) { this.editor = editor }
  mounted() {}
  willUnmount() {}
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
