import CommandManager from './commandManager.js'
import Editor from './editor.js'
import AddRect from './modules/addRect.js'
import { DragCanvas } from './modules/dragCanvas.js'

import { AddRectCommand } from './command.js'
import { EditorOptions } from './editorOptions.js'
import { ZoomManager } from './modules/zoom.js'

const editor = new Editor()


// register commands
const commandManager = new CommandManager()
commandManager.resigterCommandClass(AddRectCommand) // 创建矩形元素命令
// options
editor.setOptions(new EditorOptions())
// register tools
editor.setCommandManager(commandManager)
editor.registerTool(new AddRect())
editor.registerTool(new DragCanvas())
editor.setCurrentTool('dragCanvas')
editor.bindToolEvent()
// zoom
editor.setZoomManager(new ZoomManager())


// bind event in button
// undo
const undoBtn = document.createElement('button')
undoBtn.innerText = 'undo'
undoBtn.onclick = function() {
  editor.executeCommand('undo')
}
document.body.appendChild(undoBtn)
// redo
const redoBtn = document.createElement('button')
redoBtn.innerText = 'redo'
redoBtn.onclick = function() {
  editor.executeCommand('redo')
}
document.body.appendChild(redoBtn)
// zoomIn
const zoomInBtn = document.createElement('button')
zoomInBtn.innerText = 'zoomIn'
zoomInBtn.onclick = function() {
  console.log(editor)
  editor.zoomManager.zoomIn()
}
document.body.appendChild(zoomInBtn)
// zoomOut
const zoomOutBtn = document.createElement('button')
zoomOutBtn.innerText = 'zoomOut'
zoomOutBtn.onclick = function() {
  console.log(editor)
  editor.zoomManager.zoomOut()
}
document.body.appendChild(zoomOutBtn)

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