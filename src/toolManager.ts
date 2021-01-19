import Editor from './Editor'
import { EditorEventContext } from './editorEventContext'
import AddRect from './modules/addRect'
import { DragCanvas } from './modules/dragCanvas'
import { Select } from './modules/select'
import { Pencil } from './modules/pencil'
import { AddPath } from './modules/addPath/addPath'
import { Zoom } from './modules/zoom'

import { ToolAbstract } from './modules/ToolAbstract'

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

    this.registerTool(new AddRect())
    this.registerTool(new DragCanvas())
    this.registerTool(new Select())
    this.registerTool(new Pencil())
    this.registerTool(new AddPath())
    this.registerTool(new Zoom())
  }
  setCurrentTool(name: string) {
    const prevTool = this.getCurrentTool()
    prevTool && prevTool.beforeUnmount()

    this.currentTool = this.tools[name]
    this.currentTool.afterMount()

    const cursor = this.currentTool.cursorNormal()
    this.editor.setCursor(cursor)

    // emit event
    const toolName = this.getCurrentToolName()
    this.invokeWhenSwitch(toolName)
  }
  onSwitchTool(fn: Function) {
    this.invokeWhenSwitch = fn
  }
  getCurrentTool() {
    return this.currentTool
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
