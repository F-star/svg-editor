



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
  execute(name, ...args) {
    name = name.toLowerCase()
    const CommandClass = this.commandClasses[name]
    console.log(name)

    new CommandClass(...args)
  }
  undo() {}
  redo() {}

  // 注册命令类到命令管理对象中。
  resigterCommandClass(commandClass) {
    name = commandClass.name().toLowerCase()
    this.commandClasses[name] = commandClass
    console.log(this.commandClasses)
  }
}

export default CommandManager