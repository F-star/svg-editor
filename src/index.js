import CommandManager from './commandManager.js'
import Editor from './editor.js'
import AddRect from './modules/addRect.js'
import { DragCanvas } from './modules/dragCanvas.js'

import { AddRectCommand, Move } from './command.js'
import { EditorSetting } from './editorSetting.js'
import { ZoomManager } from './modules/zoom.js'
import { Select } from './modules/select.js'
import { ToolManager } from './toolManager.js'

const editor = new Editor()

// register commands
const commandManager = new CommandManager()
commandManager.resigterCommandClass(AddRectCommand)
commandManager.resigterCommandClass(Move)
// setting
editor.setSetting(new EditorSetting())

editor.setCommandManager(commandManager)
// register tools

const toolManager = new ToolManager(editor)
editor.setToolManager(toolManager)
toolManager.registerTool(new AddRect())
toolManager.registerTool(new DragCanvas())
toolManager.registerTool(new Select())
// toolManager.setCurrentTool('addRect')
toolManager.setCurrentTool('select')
toolManager.bindToolEvent()
// zoom
editor.setZoomManager(new ZoomManager())


/** 
 * bind event in button
 */ 

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
  editor.zoomManager.zoomIn()
}
document.body.appendChild(zoomInBtn)
// zoomOut
const zoomOutBtn = document.createElement('button')
zoomOutBtn.innerText = 'zoomOut'
zoomOutBtn.onclick = function() {
  editor.zoomManager.zoomOut()
}
document.body.appendChild(zoomOutBtn)
// select drawRect tool
const drawRectToolBtn = document.createElement('button')
drawRectToolBtn.innerText = 'drawRect'
drawRectToolBtn.onclick = function() {
  editor.setCurrentTool('addRect')
}
document.body.appendChild(drawRectToolBtn)
// select dragcanvas tool
const dragCanvasToolBtn = document.createElement('button')
dragCanvasToolBtn.innerText = 'dragCanvas'
dragCanvasToolBtn.onclick = function() {
  editor.setCurrentTool('dragCanvas')
}
document.body.appendChild(dragCanvasToolBtn)
// select tool
const selectToolBtn = document.createElement('button')
selectToolBtn.innerText = 'select'
selectToolBtn.onclick = function() {
  editor.setCurrentTool('select')
}
document.body.appendChild(selectToolBtn)

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