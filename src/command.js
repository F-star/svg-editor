import { NS } from "./constants"

class BaseCommand {
  undo() {
    throw new Error('please override undo method')
  }
  redo() {
    throw new Error('please override redo method')
  }
}

/**
 * addRect
 * 
 * add rect svg element
 */
export class AddRectCommand extends BaseCommand {
  constructor(editor, x, y, w, h) {
    super()
    // TODO: 使用编辑器使用的颜色等样式
    const rect = document.createElementNS(NS.SVG, 'rect')
    rect.setAttribute('x', x)
    rect.setAttribute('y', y)
    rect.setAttribute('width', w)
    rect.setAttribute('height', h)

    const fill = editor.setting.get('fill')
    const stroke = editor.setting.get('stroke')
    const strokeWidth = editor.setting.get('strokeWidth')
    rect.setAttribute('fill', fill)
    rect.setAttribute('stroke', stroke)
    rect.setAttribute('stroke-width', strokeWidth)

    editor.getCurrentLayer().appendChild(rect)

    this.nextSibling = rect.nextElementSibling 
    this.parent = rect.parentElement
    this.element = rect
  }

  static name() {
    return 'addRect'
  }

  redo() {
    if (this.nextSibling) {
      this.parent.insertBefore(this.element, this.nextSibling)
    } else {
      this.parent.appendChild(this.element)
    }
  }

  undo() {
    this.element.remove()
  }
}


export class Move extends BaseCommand {
  constructor(editor, el, x, y) {
    super()

    this.afterX = x
    this.afterY = y
    this.beforeX = parseFloat(el.getAttribute('x'))
    this.beforeY = parseFloat(el.getAttribute('y'))
    this.el = el

    el.setAttribute('x', x)
    el.setAttribute('y', y)
  }

  static name() {
    return 'move'
  }

  redo() {
    this.el.setAttribute('x', this.afterX)
    this.el.setAttribute('y', this.afterY)
  }

  undo() {
    this.el.setAttribute('x', this.beforeX)
    this.el.setAttribute('y', this.beforeY)
  }
}