
import Editor from './Editor'
import CommandManager from './command/commandManager'
import { EditorSetting } from './setting/editorSetting'
import { ToolManager } from './modules/toolManager'
import defaultConfig from './config/editorDefaultConfig'

function initEditor() {
  const editor = new Editor()
  ;(window as any).editor = editor // debug in devtool

  const commandManager = new CommandManager(editor)
  editor.setCommandManager(commandManager)
  editor.setSetting(new EditorSetting())
  const toolManager = new ToolManager(editor)
  editor.setToolManager(toolManager)
  toolManager.setCurrentTool(defaultConfig.tool)
  toolManager.bindToolEvent()

  // register shortcut
  editor.shortcut.register('Undo', 'Cmd+Z', () => { editor.executeCommand('undo') })
  editor.shortcut.register('Undo', 'Ctrl+Z', () => { editor.executeCommand('undo') })
  editor.shortcut.register('Redo', 'Cmd+Shift+Z', () => { editor.executeCommand('redo') })
  editor.shortcut.register('Redo', 'Ctrl+Shift+Z', () => { editor.executeCommand('redo') })
  editor.shortcut.register('Delete', 'Backspace', () => {
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
