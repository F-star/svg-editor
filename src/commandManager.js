



/**
 * CommandManager
 * 
 * 命令管理了
 * 
 * CommandManager.undo()
 * CommandManager.redo()
 */
class CommandManager {
  constructor() {
    this.redoStack = []
    this.undoStack = []
    this.commandClasses = {}
  }
  setEditor(editor) { // 依赖注入
    this.editor = editor
  }
  execute(name, ...args) {
    name = name.toLowerCase()
    const CommandClass = this.commandClasses[name]

    const command = new CommandClass(this.editor, ...args) // 创建 command 实例

    this.undoStack.push(command)
    this.redoStack = []
  }
  undo() {
    if (this.undoStack.length === 0) {
      console.log('到头了，无法继续撤回')
      return
    }
    const command = this.undoStack.pop()
    this.redoStack.push(command)
    command.undo()
  }
  redo() {
    if (this.redoStack.length === 0) {
      console.log('到头了，无法继续重做')
      return
    }
    const command = this.redoStack.pop()
    this.undoStack.push(command)
    command.redo()
  }

  // 注册命令类到命令管理对象中。
  resigterCommandClass(commandClass) {
    name = commandClass.name().toLowerCase()
    this.commandClasses[name] = commandClass
  }
}

export default CommandManager