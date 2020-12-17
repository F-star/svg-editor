
import Editor from './editor.js'
import AddRect from './modules/addRect.js'
import { DragCanvas } from './modules/dragCanvas.js'
import CommandManager from './command/commandManager.js'
import { EditorSetting } from './setting/editorSetting.js'
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
  const toolBtns = Array.prototype.slice.call(toolBar.children)
  toolBtns.forEach(item => {
    item.classList.remove('active')
  })
  document.getElementById(name).classList.add('active')
}


const editor = new Editor()
window.editor = editor // debug in devtool

const commandManager = new CommandManager(editor)
editor.setCommandManager(commandManager)

editor.setSetting(new EditorSetting())
// register tools

const toolManager = new ToolManager(editor)
editor.setToolManager(toolManager)
toolManager.registerTool(new AddRect())
toolManager.registerTool(new DragCanvas())
toolManager.registerTool(new Select())

editor.toolManager.onSwitchTool(name => {
  console.log('switched tool:', name)
  activeBtn(name)
})

toolManager.setCurrentTool('addRect')
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


// fill value control
const fillTextNode = document.querySelector('#element-info-fill')
fillTextNode.innerHTML = editor.setting.get('fill')
editor.setting.bindEvent('fill', val => {
  fillTextNode.innerHTML = val
})
document.querySelector('#set-fill-btn').onclick = function() {
  const fill = window.prompt('Please input valid color value（like #ffce43）', editor.setting.get('fill'))
  if (!fill) return
  fillTextNode.innerHTML = fill

  editor.setting.setFill(fill)
  editor.activedElsManager.setElsAttr('fill', fill)
}

// stroke value control
const strokeTextNode = document.querySelector('#element-info-stroke')
strokeTextNode.innerHTML = editor.setting.get('stroke')
editor.setting.bindEvent('stroke', val => {
  strokeTextNode.innerHTML = val
})
document.querySelector('#set-stroke-btn').onclick = function() {
  const stroke = window.prompt('Please input valid color value（like #ffce43）', editor.setting.get('stroke'))
  if (!stroke) return
  strokeTextNode.innerHTML = stroke

  editor.setting.setStroke(stroke)
  editor.activedElsManager.setElsAttr('stroke', stroke)
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