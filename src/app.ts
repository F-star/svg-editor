
import Editor from './editor'
import CommandManager from './command/commandManager'
import { EditorSetting } from './setting/editorSetting'
import { ToolManager } from './toolManager'


function initEditorAndMount(selector: string) {
  const editor = new Editor()

  ;(window as any).editor = editor // debug in devtool

  const commandManager = new CommandManager(editor)
  editor.setCommandManager(commandManager)

  editor.setSetting(new EditorSetting())

  const toolManager = new ToolManager(editor)
  editor.setToolManager(toolManager)

  // default tool
  toolManager.setCurrentTool('addPath')
  toolManager.bindToolEvent()

  editor.mount(selector)
  editor.viewport.center()
}

export { initEditorAndMount }

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
