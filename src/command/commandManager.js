/**
 * CommandManager Class
 * 
 * 
 * CommandManager.undo()
 * CommandManager.redo()
 */

import { AddRect, DMove, removeSelectedElements, SetAttr } from "./commands"

class CommandManager {
  constructor(editor) {
    this.editor = editor
    this.redoStack = []
    this.undoStack = []
    this.commandClasses = {}

    this.resigterCommandClass(AddRect)
    this.resigterCommandClass(DMove)
    this.resigterCommandClass(SetAttr)
    this.resigterCommandClass(removeSelectedElements)
  }
  setEditor(editor) {
    this.editor = editor
  }
  execute(name, ...args) {
    const CommandClass = this.commandClasses[name]
    if (!CommandClass) throw new Error(`editor has not the ${name} command`)
    const command = new CommandClass(this.editor, ...args) // 创建 command 实例

    this.undoStack.push(command)
    this.redoStack = []
  }
  undo() {
    if (this.undoStack.length === 0) {
      console.log('undo stack is empty, can not undo')
      return
    }
    const command = this.undoStack.pop()
    this.redoStack.push(command)
    command.undo()
    command.afterUndo()
  }
  redo() {
    if (this.redoStack.length === 0) {
      console.log('redo stack is empty, can not redo')
      return
    }
    const command = this.redoStack.pop()
    this.undoStack.push(command)
    command.redo()
    command.afterRedo()
  }
  // 注册命令类到命令管理对象中。
  resigterCommandClass(commandClass) {
    const name = commandClass.name()
    this.commandClasses[name] = commandClass
  }
  afterAnyUndo() {

  }
}

export default CommandManager