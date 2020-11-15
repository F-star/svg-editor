

class Command {
  execute(name, ...args) {
    throw new Error('请实现 execute 方法')
  }
  // beforeExec() {}

}

/**
 * CommandManager.undo()
 * CommandManager.redo()
 */
class CommandManager {
  constructor() {
    this.redoStack = []
    this.undoStack = []
  }
  undo() {}
  redo() {}
}

class Move extends Command {
  execute() {

  }
}

function creatCommand(name) {
  if (name == 'move') return new CommandClassList.Move()
}

function exeCommand(name, ...args) {
  const command = creatCommand(name)
}

/**
 * Editor.exeCommand('move', 1, 2)
 */ 