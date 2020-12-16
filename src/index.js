import CommandManager from './commandManager.js'
import Editor from './editor.js'
import AddRect from './modules/addRect.js'
import { DragCanvas } from './modules/dragCanvas.js'

import { AddRectCommand, DMove } from './command.js'
import { EditorSetting } from './editorSetting.js'
import { ZoomManager } from './modules/zoom.js'
import { Select } from './modules/select.js'
import { ToolManager } from './toolManager.js'

function activeBtn(name) {
  name = {
    'select': 'btn-select',
    'addRect': 'btn-add-rect',
    'dragCanvas': 'btn-drag-canvas',
  }[name]
  if (name == undefined) return

  const toolBar = document.querySelector('#tool-bar')
  // toolBtns = Array.prototype.slice.call(toolBtns)
  
  const toolBtns = Array.prototype.slice.call(toolBar.children)
  console.log(toolBtns)
  toolBtns.forEach(item => {
    console.log(item)
    item.classList.remove('active')
  })
  document.getElementById(name).classList.add('active')
}


const editor = new Editor()

// register commands
const commandManager = new CommandManager()
commandManager.resigterCommandClass(AddRectCommand)
commandManager.resigterCommandClass(DMove)
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
editor.toolManager.onSwitchTool(name => {
  console.log('switched tool:', name)
  activeBtn(name)
})
toolManager.setCurrentTool('select')
toolManager.bindToolEvent()
// zoom
editor.setZoomManager(new ZoomManager())

editor.mount('#editor-area')


/** 
 * bind event in button
 */ 
// undo
document.querySelector('#btn-undo').onclick = () => {
  editor.executeCommand('undo')
}
// redo
document.querySelector('#btn-redo').onclick = function() {
  editor.executeCommand('redo')
}
// zoomIn
document.querySelector('#btn-zoom-in').onclick = function() {
  editor.zoomManager.zoomIn()
}
// zoomOut
document.querySelector('#btn-zoom-out').onclick = function() {
  editor.zoomManager.zoomOut()
}
// select addRect tool
document.querySelector('#btn-add-rect').onclick = function() {
  editor.setCurrentTool('addRect')
}
// select dragcanvas tool
document.querySelector('#btn-drag-canvas').onclick = function() {
  editor.setCurrentTool('dragCanvas')
}
// select tool
document.querySelector('#btn-select').onclick = function() {
  editor.setCurrentTool('select')
}

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