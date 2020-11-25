

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

class addRect extends Command {
  constructor() {
    this.params = {}
  }
  execute(x, y, w, h) {
    const rect = document.createElementNS(NS.SVG, 'rect')
    rect.setAttribute('x', x)
    rect.setAttribute('y', y)
    rect.setAttribute('width', w)
    rect.setAttribute('height', h)
    this.editor.getCurrentLayer().appendChild(rect)
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