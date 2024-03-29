
import Editor from './Editor'
import CommandManager from './command/commandManager'
import { EditorSetting } from './setting/editorSetting'
import { ToolManager } from './tools/index'
import defaultConfig from './config/editorDefaultConfig'

function initEditor() {
  const editor = new Editor()
  ;(window as any).editor = editor // debug in devtool

  const commandManager = new CommandManager(editor)
  editor.setCommandManager(commandManager)
  editor.setSetting(new EditorSetting())
  const tools = new ToolManager(editor)
  editor.setToolManager(tools)
  tools.setCurrentTool(defaultConfig.tool)
  tools.initToolEvent()

  // 注册全局快捷键
  // 考虑使用 hotkeys-js https://www.npmjs.com/package/hotkeys-js 貌似很好用
  editor.shortcut.register('Undo', 'Cmd+Z', () => { editor.executeCommand('undo') }) // 撤销
  editor.shortcut.register('Undo', 'Ctrl+Z', () => { editor.executeCommand('undo') })
  editor.shortcut.register('Redo', 'Cmd+Shift+Z', () => { editor.executeCommand('redo') }) // 重做
  editor.shortcut.register('Redo', 'Ctrl+Shift+Z', () => { editor.executeCommand('redo') })
  editor.shortcut.register('Delete', 'Backspace', () => { // 删除
    if (editor.activedElsManager.isNoEmpty()) {
      editor.executeCommand('removeElements')
    }
  })

  // editor.mount(selector) // do those when react components do mount
  // editor.viewport.center()
  return editor
}

export { initEditor }

/**
 * 理想 api 使用例子
 *
 * const editorBuilder = new Editor.builder()
 * editorBuilder
 *   .setCanvasSize(400, 300)
 *   .setStageSize(1000, 800)
 *   .setViewportSize(800, 500)
 *   .setZoom(100)
 *
 * const editor = editorBuilder.build()
 * editor.registerTool(toolMove)
 *
 */
