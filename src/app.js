
import Editor from './editor.js'
import AddRect from './modules/addRect.js'
import { DragCanvas } from './modules/dragCanvas.js'
import CommandManager from './command/commandManager.js'
import { EditorSetting } from './setting/editorSetting.js'
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

editor.mount('#editor-area')
editor.viewport.center()

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
  editor.viewport.zoomIn()
}
// zoomOut
document.querySelector('#btn-zoom-out').onclick = function() {
  editor.viewport.zoomOut()
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
// delete selected elements
document.querySelector('#btn-delete').onclick = function() {
  if (editor.activedElsManager.isNoEmpty()) {
    editor.executeCommand('removeSelectedElements')
  }
}
// front elements
document.querySelector('#btn-front').onclick = function() {
  if (editor.activedElsManager.isNoEmpty()) {
    editor.executeCommand('front')
  }
}
document.querySelector('#btn-forward').onclick = function() {
  if (editor.activedElsManager.isNoEmpty()) {
    editor.executeCommand('forward')
  }
}
document.querySelector('#btn-backward').onclick = function() {
  if (editor.activedElsManager.isNoEmpty()) {
    editor.executeCommand('backward')
  }
}
document.querySelector('#btn-back').onclick = function() {
  if (editor.activedElsManager.isNoEmpty()) {
    editor.executeCommand('back')
  }
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
// stroke-width value control
const strokeWidthTextNode = document.querySelector('#element-info-stroke-width')
strokeWidthTextNode.innerHTML = editor.setting.get('stroke-width')
editor.setting.bindEvent('stroke-width', val => {
  strokeWidthTextNode.innerHTML = val
})
document.querySelector('#set-stroke-width-btn').onclick = function() {
  const strokeWidth = window.prompt('Please input value(like 6px)', editor.setting.get('stroke-width'))
  if (!strokeWidth) return
  strokeWidthTextNode.innerHTML = strokeWidth

  editor.setting.set('stroke-width', strokeWidth)
  editor.activedElsManager.setElsAttr('stroke-width', strokeWidth)
}

// register shortcut
editor.shortcut.register('Undo', 'Cmd+Z', () => {
  editor.executeCommand('undo')
})
editor.shortcut.register('Undo', 'Ctrl+Z', () => {
  editor.executeCommand('undo')
})
editor.shortcut.register('Redo', 'Cmd+Shift+Z', () => {
  editor.executeCommand('redo')
})
editor.shortcut.register('Redo', 'Ctrl+Shift+Z', () => {
  editor.executeCommand('redo')
})
editor.shortcut.register('Delete', 'Backspace', () => {
  if (editor.activedElsManager.isNoEmpty()) {
    editor.executeCommand('removeSelectedElements')
  }
})
document.querySelector('#shortcut').innerHTML = editor.shortcut.formatPrint()

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