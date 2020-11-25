import { NS } from "./constants"

class BaseCommand {
  undo() {
    throw new Error('请实现 undo 方法')
  }
  redo() {
    throw new Error('请实现 redo 方法')
  }
}

/**
 * addRect
 * 
 * 创建矩形
 */
class AddRectCommand extends BaseCommand {
  constructor(editor, x, y, w, h) {
    super()
    // TODO: 使用编辑器使用的颜色等样式
    const rect = document.createElementNS(NS.SVG, 'rect')
    rect.setAttribute('x', x)
    rect.setAttribute('y', y)
    rect.setAttribute('width', w)
    rect.setAttribute('height', h)
    editor.getCurrentLayer().appendChild(rect)

    this.prevSibling = rect.previousElementSibling 
    this.parent = rect.parentElement
    this.element = rect
  }

  static name() {
    return 'addRect'
  }

  redo() {
    if (this.prevSibling) {
      this.parent.insertBefore(this.element, this.prevSibling)
    } else {
      this.parent.appendChild(this.element)
    }
  }

  undo() {
    this.element.remove()
  }
}

// 类的静态方法
// AddRectCommand.name = function() {
//   return 'addRect'
// }


export {
  AddRectCommand,
}