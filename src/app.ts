
import Editor from './editor'
import AddRect from './modules/addRect.js'
import { DragCanvas } from './modules/dragCanvas.js'
import CommandManager from './command/commandManager'
import { EditorSetting } from './setting/editorSetting.js'
import { Select } from './modules/select.js'
import { ToolManager } from './toolManager.js'

function activeBtn(name: string) {
  const selector = ({
    'select': 'btn-select',
    'addRect': 'btn-add-rect',
    'dragCanvas': 'btn-drag-canvas',
  } as {[key: string]: string})[name]
  if (name == undefined) return

  const toolBar = document.querySelector('#tool-bar')
  const toolBtns = Array.prototype.slice.call(toolBar.children)
  toolBtns.forEach((item: Element) => {
    item.classList.remove('active')
  })
  document.getElementById(selector).classList.add('active')
}


const editor = new Editor()

// TODO: find better code
;(window as any).editor = editor // debug in devtool

const commandManager = new CommandManager(editor)
editor.setCommandManager(commandManager)

editor.setSetting(new EditorSetting())
// register tools

const toolManager = new ToolManager(editor)
editor.setToolManager(toolManager)
toolManager.registerTool(new AddRect())
toolManager.registerTool(new DragCanvas())
toolManager.registerTool(new Select())

editor.toolManager.onSwitchTool((name: string) => {
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
function bindClickHandler(selector: string, fn: GlobalEventHandlers["onclick"]) {
  const el: HTMLElement = document.querySelector(selector)
  el.onclick = fn
}
// undo
bindClickHandler('#btn-undo', () => { editor.executeCommand('undo') })
// redo
bindClickHandler('#btn-redo', () => { editor.executeCommand('redo') })
// zoomIn
bindClickHandler('#btn-zoom-in', () => { editor.viewport.zoomIn() })
// zoomOut
bindClickHandler('#btn-zoom-out', () => { editor.viewport.zoomOut() })
// select addRect tool
bindClickHandler('#btn-add-rect', () => { editor.setCurrentTool('addRect') })
// select dragcanvas tool
bindClickHandler('#btn-drag-canvas', () => { editor.setCurrentTool('dragCanvas') })
// select tool
bindClickHandler('#btn-select', () => { editor.setCurrentTool('select') })
// delete selected elements
bindClickHandler('#btn-delete', () => {
  if (editor.activedElsManager.isNoEmpty()) {
    editor.executeCommand('removeSelectedElements')
  }
})
// front elements
bindClickHandler('#btn-front', () => {
  if (editor.activedElsManager.isNoEmpty()) {
    editor.executeCommand('front')
  }
})
bindClickHandler('#btn-forward', () => {
  if (editor.activedElsManager.isNoEmpty()) {
    editor.executeCommand('forward')
  }
})
bindClickHandler('#btn-backward', () => {
  if (editor.activedElsManager.isNoEmpty()) {
    editor.executeCommand('backward')
  }
})
bindClickHandler('#btn-back', () => {
  if (editor.activedElsManager.isNoEmpty()) {
    editor.executeCommand('back')
  }
})

// fill value control
const fillTextNode = document.querySelector('#element-info-fill')
fillTextNode.innerHTML = editor.setting.get('fill')
editor.setting.bindEvent('fill', (val: string) => {
  fillTextNode.innerHTML = val
})
bindClickHandler('#set-fill-btn', () => {
  const fill = window.prompt('Please input valid color value（like #ffce43）', editor.setting.get('fill'))
  if (!fill) return
  fillTextNode.innerHTML = fill

  editor.setting.setFill(fill)
  editor.activedElsManager.setElsAttr('fill', fill)
})
// stroke value control
const strokeTextNode = document.querySelector('#element-info-stroke')
strokeTextNode.innerHTML = editor.setting.get('stroke')
editor.setting.bindEvent('stroke', (val: string) => {
  strokeTextNode.innerHTML = val
})
bindClickHandler('#set-stroke-btn', () => {
  const stroke = window.prompt('Please input valid color value（like #ffce43）', editor.setting.get('stroke'))
  if (!stroke) return
  strokeTextNode.innerHTML = stroke

  editor.setting.setStroke(stroke)
  editor.activedElsManager.setElsAttr('stroke', stroke)
})
// stroke-width value control
const strokeWidthTextNode = document.querySelector('#element-info-stroke-width')
strokeWidthTextNode.innerHTML = editor.setting.get('stroke-width')
editor.setting.bindEvent('stroke-width', (val: string) => {
  strokeWidthTextNode.innerHTML = val
})
bindClickHandler('#set-stroke-width-btn', () => {
  const strokeWidth = window.prompt('Please input value(like 6px)', editor.setting.get('stroke-width'))
  if (!strokeWidth) return
  strokeWidthTextNode.innerHTML = strokeWidth

  editor.setting.set('stroke-width', strokeWidth)
  editor.activedElsManager.setElsAttr('stroke-width', strokeWidth)
})

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