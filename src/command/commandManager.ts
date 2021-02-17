/**
 * CommandManager Class
 *
 *
 * CommandManager.undo()
 * CommandManager.redo()
 */

import EventEmitter from '../util/EventEmitter'
import Editor from '../Editor'
import { ArrangingBack, ArrangingBackward, ArrangingForward, ArrangingFront } from './arranging'
import { AddPath, AddRect, BaseCommand, DMove, RemoveElements, SetAttr } from './commands'
import { AddPathSeg } from './path'

class ArrayStack<T> {
  private items: Array<T> = []

  size(): number {
    return this.items.length
  }
  push(item: T) {
    this.items.push(item)
  }
  pop(): T {
    return this.items.pop()
  }
  getItems(): Array<T> {
    return this.items
  }
  /* peek */
  empty() {
    this.items = []
  }
}

class CommandManager {
  private redoStack = new ArrayStack<BaseCommand>()
  private undoStack = new ArrayStack<BaseCommand>()
  private commandClasses: { [key: string]: {new (editor: Editor, ...args: any[]): BaseCommand} } = {}
  private emitter: EventEmitter = new EventEmitter()

  constructor(private editor: Editor) {
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
  execute(name: string, ...args: any[]) {
    const CommandClass = this.commandClasses[name]
    if (!CommandClass) throw new Error(`editor has not the ${name} command`)
    const command = new CommandClass(this.editor, ...args) // 创建 command 实例

    this.undoStack.push(command)
    this.redoStack.empty()

    this.emitEvent()
  }
  undo() {
    if (this.undoStack.size() === 0) {
      console.log('Undo Stack is Empty')
      return
    }
    const command = this.undoStack.pop()
    this.redoStack.push(command)
    command.undo()
    command.afterUndo()

    this.emitEvent()
  }
  redo() {
    if (this.redoStack.size() === 0) {
      console.log('Redo Stack is Empty!')
      return
    }
    const command = this.redoStack.pop()
    this.undoStack.push(command)
    command.redo()
    command.afterRedo()

    this.emitEvent()
  }
  go(pos: number) {
    if (pos === 0) {
      throw new Error('Param can not be zero!')
    }
    if (pos > 0) {
      for (let i = 0; i < pos; i++) {
        this.redo()
      }
    } else {
      pos = -pos
      for (let i = 0; i < pos; i++) {
        this.undo()
      }
    }
  }
  resigterCommandClass(
    commandClass: { new (editor: Editor, ...args: any[]): BaseCommand },
    cmdName: string
  ) {
    this.commandClasses[cmdName] = commandClass
  }
  // Disable exec、redo、 undo temporarily
  lock() { /** TODO: */ }
  unlock() { /** TODO: */ }

  private emitEvent() {
    const undoNames = this.undoStack.getItems().map(item => item.cmdName())
    const redoNames = this.redoStack.getItems().map(item => item.cmdName()).reverse()
    this.emitter.emit('change', undoNames, redoNames)
  }
  on(eventName: 'change', listener: (undos: string[], redos: string[]) => void) {
    this.emitter.on(eventName, listener)
  }
  off(eventName: 'change', listener: (n: number) => void) {
    this.emitter.off(eventName, listener)
  }
}

export default CommandManager
