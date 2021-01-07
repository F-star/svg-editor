/**
 * CommandManager Class
 * 
 * 
 * CommandManager.undo()
 * CommandManager.redo()
 */

import Editor from "../editor"
import { ArrangingBack, ArrangingBackward, ArrangingForward, ArrangingFront } from "./arranging"
import { AddRect, BaseCommand, DMove, removeSelectedElements, SetAttr } from "./commands"

class CommandManager {
  editor: Editor
  redoStack: Array<BaseCommand>
  undoStack: Array<BaseCommand>
  commandClasses: { [key: string]: {new (editor: Editor, ...args: any): BaseCommand} }

  constructor(editor: Editor) {
    this.editor = editor
    this.redoStack = []
    this.undoStack = []
    this.commandClasses = {}

    this.resigterCommandClass(AddRect, AddRect.cmdName())
    this.resigterCommandClass(DMove, DMove.cmdName())
    this.resigterCommandClass(SetAttr, SetAttr.cmdName())
    this.resigterCommandClass(removeSelectedElements, removeSelectedElements.cmdName())
    this.resigterCommandClass(ArrangingFront, ArrangingFront.cmdName())
    this.resigterCommandClass(ArrangingBack, ArrangingBack.cmdName())
    this.resigterCommandClass(ArrangingForward, ArrangingForward.cmdName())
    this.resigterCommandClass(ArrangingBackward, ArrangingBackward.cmdName())
  }
  setEditor(editor: Editor) {
    this.editor = editor
  }
  execute(name: string, ...args: any) {
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
  resigterCommandClass(commandClass: { new (editor: Editor, ...args: any): BaseCommand }, cmdName: string) {
    this.commandClasses[cmdName] = commandClass
  }
  afterAnyUndo() {

  }
}

export default CommandManager