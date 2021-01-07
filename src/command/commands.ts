import Editor from '../editor'
import { FElement } from '../element/baseElement'
import { FSVG } from '../element/index'
import { Rect } from '../element/rect'


export abstract class BaseCommand {
  protected editor: Editor

  constructor(editor: Editor, ...args: any) {
    this.editor = editor
  }
  // TODO: abstract static method
  // static cmdName: () => string
  abstract undo(): void
  abstract redo(): void
  afterRedo() {}
  afterUndo() {}
}

/**
 * addRect
 *
 * add rect svg element
 */
export class AddRect extends BaseCommand {
  // private editor: Editor
  nextSibling: Element
  parent: Element
  rect: Rect

  constructor(editor: Editor, x: number, y: number, w: number, h: number) {
    super(editor)
    // this.editor = editor
    const rect = new FSVG.Rect(x, y, w, h)

    const fill = editor.setting.get('fill')
    const stroke = editor.setting.get('stroke')
    const strokeWidth = editor.setting.get('stroke-width')
    rect.setAttr('fill', fill)
    rect.setAttr('stroke', stroke)
    rect.setAttr('stroke-width', strokeWidth)

    editor.getCurrentLayer().addChild(rect)

    this.nextSibling = rect.el().nextElementSibling
    this.parent = rect.el().parentElement
    this.rect = rect

    this.editor.activedElsManager.setEls(this.rect)
  }
  static cmdName() {
    return 'addRect'
  }
  redo() {
    const el = this.rect.el()
    if (this.nextSibling) {
      this.parent.insertBefore(el, this.nextSibling)
    } else {
      this.parent.appendChild(el)
    }
    this.editor.activedElsManager.setEls(this.rect)
  }
  undo() {
    this.rect.el().remove()
    this.editor.activedElsManager.clear()
  }
}
/**
 * remove elements
 */
export class removeSelectedElements extends BaseCommand {
  private els: Array<FElement>
  private parents: Array<HTMLElement>
  private nextSiblings: Array<Element>

  constructor(editor: Editor) {
    super(editor)

    this.els = this.editor.activedElsManager.getEls()

    const size = this.els.length
    this.parents = new Array(size)
    this.nextSiblings = new Array(size)
    this.els.forEach((el, idx) => {
      this.nextSiblings[idx] = el.el().nextElementSibling
      this.parents[idx] = el.el().parentElement
    })
    this.execute()
  }
  static cmdName() {
    return 'removeSelectedElements'
  }
  execute() { // private
    this.els.forEach(item => {
      item.remove()
    })
    this.editor.activedElsManager.clear()
  }
  redo() {
    this.execute()
  }
  undo() {
    for (let idx = this.els.length - 1; idx >= 0; idx--) {
      const element = this.els[idx]
      const el = element.el()
      if (this.nextSiblings[idx]) {
        this.parents[idx].insertBefore(el, this.nextSiblings[idx])
      } else {
        this.parents[idx].appendChild(el)
      }
    }

    this.editor.activedElsManager.setEls(this.els)
  }
}

/**
 * DMove
 *
 * dmove elements
 */
export class DMove extends BaseCommand {
  private els: Array<FElement>
  private dx: number
  private dy: number

  constructor(editor: Editor, els: Array<FElement>, dx: number, dy: number) {
    super(editor)
    this.dx = dx
    this.dy = dy
    this.els = els

    this.els.forEach(el => {
      el.dmove(this.dx, this.dy)
    })
  }
  static cmdName() {
    return 'dmove'
  }
  redo() {
    this.els.forEach(el => {
      el.dmove(this.dx, this.dy)
    })
  }
  undo() {
    this.els.forEach(el => {
      el.dmove(-this.dx, -this.dy)
    })
  }
  afterRedo() {
    this.editor.activedElsManager.setEls(this.els)
  }
  afterUndo() {
    this.editor.activedElsManager.setEls(this.els)
  }
}

/**
 * setAttr
 */
export class SetAttr extends BaseCommand {
  private els: Array<FElement>
  private attrName: string
  private beforeVal: string[]
  private afterVal: string


  constructor(editor: Editor, els: Array<FElement> | FElement, attrName: string, val: string) {
    super(editor)
    if (!Array.isArray(els)) els = [els]
    this.els = els
    this.attrName = attrName
    this.beforeVal = this.els.map(el => el.getAttr(attrName))
    this.afterVal = val

    this.els.forEach(el => {
      el.setAttr(attrName, val)
    })
  }
  static cmdName() {
    return 'setAttr'
  }
  redo() {
    this.els.forEach(el => {
      el.setAttr(this.attrName, this.afterVal)
    })
  }
  undo() {
    this.els.forEach((el, i) => {
      el.setAttr(this.attrName, this.beforeVal[i])
    })
  }
}
