/**
 * CommandManager Class
 *
 *
 * CommandManager.undo()
 * CommandManager.redo()
 */

import Editor from '../Editor'
import { ArrangingBack, ArrangingBackward, ArrangingForward, ArrangingFront } from './arranging'
import { AddPath, AddRect, BaseCommand, DMove, RemoveElements, SetAttr } from './commands'
import { AddPathSeg } from './path'

type listener = (n: number) => void

class CommandManager {
  private editor: Editor
  private redoStack: Array<BaseCommand>
  private undoStack: Array<BaseCommand>
  private commandClasses: { [key: string]: {new (editor: Editor, ...args: any): BaseCommand} }
  private undoListener: listener
  private redoListener: listener

  constructor(editor: Editor) {
    this.editor = editor
    this.redoStack = []
    this.undoStack = []
    this.commandClasses = {}

    this.resigterCommandClass(AddRect, AddRect.cmdName())
    this.resigterCommandClass(AddPath, AddPath.cmdName())
    this.resigterCommandClass(AddPathSeg, AddPathSeg.cmdName())
    this.resigterCommandClass(DMove, DMove.cmdName())
    this.resigterCommandClass(SetAttr, SetAttr.cmdName())
    this.resigterCommandClass(RemoveElements, RemoveElements.cmdName())
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

    this.emitUndoAndRedoEvent()
  }
  undo() {
    if (this.undoStack.length === 0) {
      console.log('undo stack is empty now')
      return
    }
    const command = this.undoStack.pop()
    this.redoStack.push(command)
    command.undo()
    command.afterUndo()

    this.emitUndoAndRedoEvent()
  }
  redo() {
    if (this.redoStack.length === 0) {
      console.log('redo stack is empty now')
      return
    }
    const command = this.redoStack.pop()
    this.undoStack.push(command)
    command.redo()
    command.afterRedo()

    this.emitUndoAndRedoEvent()
  }
  // 注册命令类到命令管理对象中。
  resigterCommandClass(
    commandClass: { new (editor: Editor, ...args: any): BaseCommand },
    cmdName: string
  ) {
    this.commandClasses[cmdName] = commandClass
  }

  // disable exec、redo、 undo temporarily
  lock() {}
  unlock() {}


  private emitUndoAndRedoEvent() {
    this.undoListener(this.undoStack.length)
    this.redoListener(this.redoStack.length)
  }
  /** event bind */
  setUndoListener(fn: listener) {
    this.undoListener = fn
  }
  setRedoListener(fn: listener) {
    this.redoListener = fn
  }
  removeRedoListener() {
    this.redoListener = null
  }
  removeUndoListener() {
    this.undoListener = null
  }
}

export default CommandManager
