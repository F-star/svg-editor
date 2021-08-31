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
  private isInitEvent = false

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

  // 绑定鼠标事件，传递给工具对象。
  initToolEvent() {
    if (this.isInitEvent) {
      console.warn('已经初始化过工具类事件，而你再尝试进行第二次初始化，静默失败')
      return
    }
    this.isInitEvent = true
    const svgRoot = this.editor.svgRoot

    svgRoot.addEventListener('mousedown', e => {
      if (e.button !== 0) return // 必须为左键鼠标
      const ctx = new EditorEventContext(this.editor, e)
      this.ctx = ctx

      const cursor = this.currentTool.cursorPress()
      this.editor.setCursor(cursor)

      this.currentTool.start(ctx)
    }, false)

    svgRoot.addEventListener('mousemove', e => {
      const ctx = this.ctx
      if (!ctx) {
        // TODO: 添加一个配置项，来确定是否调用 moveNoDrag
        this.currentTool.moveNoDrag(new EditorEventContext(this.editor, e))
        return
      }
      // ctx 存在，为 “拖拽” 形式的鼠标移动事件
      ctx.setOriginEvent(e) // 修改了源 event 对象
      this.currentTool.move(ctx) // move
    }, false)

    svgRoot.addEventListener('mouseup', () => {
      const ctx = this.ctx
      if (!ctx) return
      // 最后一次 `鼠标移动时间的光标位置` 不等于 “释放鼠标时光标位置”。这是因为鼠标移动事件的触发是有间隔的。
      // 所以不可以调用 ctx.setOriginEvent(e)
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

    svgRoot.addEventListener('contextmenu', e => {
      const { editor } = this
      e.preventDefault() // 阻止默认菜单事件
      editor.contextMenu.show(e.clientX, e.clientY)
    }, false)
  }
}
