import Editor from '../Editor'
import { EditorEventContext } from '../editorEventContext'
import AddRect from './addRect'
import { DragCanvas } from './dragCanvas'
import { Select } from './select/select'
import { Pencil } from './pencil'
import { Pen } from './pen'
import { Zoom } from './zoom'
import { ToolAbstract } from './ToolAbstract'

export class ToolManager {
  private editor: Editor
  private tools: { [name: string]: ToolAbstract }
  private currentTool: ToolAbstract
  private invokeWhenSwitch: (toolName: string) => void
  private ctx: EditorEventContext

  constructor(editor: Editor) {
    this.editor = editor
    this.tools = {}
    this.currentTool = null
    this.invokeWhenSwitch = () => { /* nope */ }
    this.ctx = null // tool context

    this.registerTool(new AddRect(editor))
    this.registerTool(new DragCanvas(editor))
    this.registerTool(new Select(editor))
    this.registerTool(new Pencil(editor))
    this.registerTool(new Pen(editor))
    this.registerTool(new Zoom(editor))
  }
  setCurrentTool(name: string) {
    const prevTool = this.getCurrentTool()
    prevTool && prevTool.willUnmount()

    this.currentTool = this.tools[name]
    this.currentTool.mounted()

    const cursor = this.currentTool.cursorNormal()
    this.editor.setCursor(cursor)

    // emit event
    const toolName = this.getCurrentToolName()
    this.invokeWhenSwitch(toolName)
  }
  onSwitchTool(fn: (toolName: string) => void) {
    this.invokeWhenSwitch = fn
  }
  getCurrentTool() {
    return this.currentTool
  }
  getCurrentToolName() {
    return this.currentTool.name()
  }
  registerTool(tool: ToolAbstract) {
    const toolName = tool.name()
    this.tools[toolName] = tool
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
      // 通过 ctx 是否存在，来判断是否为 “拖拽” 形式的鼠标移动事件
      if (!ctx) return
      ctx.setOriginEvent(e)
      ctx.pressMouse()
      this.currentTool.move(ctx) // move
    }, false)

    svgRoot.addEventListener('mouseup', e => {
      // this.ctx.releaseMouse()
      const ctx = this.ctx
      if (!ctx) return
      // ctx.setOriginEvent(e) // the offsetX and offsetY in mouseup and the last mousemove is not equal ??
      const cursor = this.currentTool.cursorNormal()
      this.editor.setCursor(cursor)

      this.currentTool.end(ctx)
      ctx.isEndInside = true
    }, false)

    window.addEventListener('mouseup', () => {
      if (this.ctx && this.ctx.isEndInside === false) {
        this.currentTool.endOutside(this.ctx)
      }
      this.ctx = null
    }, false)
  }
}
