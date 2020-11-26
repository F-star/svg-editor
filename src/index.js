import CommandManager from './commandManager.js'
import Editor from './editor.js'
import AddRect from './modules/addRect.js'

import { AddRectCommand } from './command.js'

const editor = new Editor()


// register commands
const commandManager = new CommandManager()
commandManager.resigterCommandClass(AddRectCommand) // 创建矩形元素命令
// register tools
editor.setCommandManager(commandManager)
editor.registerTool(new AddRect())
editor.setCurrentTool('addRect')
editor.bindToolEvent()



// 按钮绑定事件
const undoBtn = document.createElement('button')
undoBtn.innerText = 'undo'
undoBtn.onclick = function() {
  editor.executeCommand('undo')
}
document.body.appendChild(undoBtn)


const redoBtn = document.createElement('button')
redoBtn.innerText = 'redo'
redoBtn.onclick = function() {
  editor.executeCommand('redo')
}
document.body.appendChild(redoBtn)

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