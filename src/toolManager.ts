import Editor from "./editor"
import { EditorEventContext } from "./editorEventContext"
import { ToolAbstract } from "./modules/ToolAbstract"

export class ToolManager {
  private editor: Editor
  private tools: { [name: string]: ToolAbstract }
  private currentTool: ToolAbstract
  private invokeWhenSwitch: Function
  private ctx: EditorEventContext

  constructor(editor: Editor) {
    this.editor = editor
    this.tools = {}
    this.currentTool = null
    this.invokeWhenSwitch = () => {}

    this.ctx = null // tool context
  }
  setCurrentTool(name: string) {
    this.currentTool = this.tools[name]
    // set normal cursor
    const cursor = this.currentTool.cursorNormal()
    this.editor.setCursor(cursor)

    const toolName = this.getCurrentToolName()
    this.invokeWhenSwitch(toolName)
  }
  onSwitchTool(fn: Function) {
    this.invokeWhenSwitch = fn
  }
  getCurrentToolName() {
    return this.currentTool.name()
  }
  registerTool(tool: ToolAbstract) {
    this.tools[tool.name()] = tool
    tool.setEditor(this.editor) // dependency injection
  }

  bindToolEvent() {
    const svgRoot = this.editor.svgRoot


    svgRoot.addEventListener('mousedown', e => {
      const ctx = new EditorEventContext(this.editor, e)
      this.ctx = ctx

      const cursor = this.currentTool.cursorPress()
      this.editor.setCursor(cursor)

      this.currentTool.start(ctx)
    }, false)

    svgRoot.addEventListener('mousemove', e => {
      const ctx = this.ctx

      if (!ctx) return // if ctx exits, present mousedown event emit just before
      ctx.setOriginEvent(e)
      ctx.pressMouse()
      this.currentTool.move(ctx) // move
    }, false)
    
    svgRoot.addEventListener('mouseup', e => {
      // this.ctx.releaseMouse()
      const ctx = this.ctx
      // ctx.setOriginEvent(e) // the offsetX and offsetY in mouseup and the last mousemove is not equal ?? 
      const cursor = this.currentTool.cursorNormal()
      this.editor.setCursor(cursor)
      
      this.currentTool.end(ctx)
      ctx.isEndInside = true
    }, false)

    window.addEventListener('mouseup', () => {
      if (this.ctx && this.ctx.isEndInside == false) {
        this.currentTool.endOutside(this.ctx)
      }
      this.ctx = null
    }, false)
  }
}