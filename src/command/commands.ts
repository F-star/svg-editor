import Editor from '../Editor'
import { FElement } from '../element/baseElement'
import { FSVG, IFSVG } from '../element/index'
import { ISegment } from '../interface'
import { EditorSetting } from '../setting/editorSetting'

function setDefaultAttrsBySetting(el: FElement, setting: EditorSetting) {
  const fill = setting.get('fill')
  const stroke = setting.get('stroke')
  const strokeWidth = setting.get('stroke-width')
  el.setAttr('fill', fill)
  el.setAttr('stroke', stroke)
  el.setAttr('stroke-width', strokeWidth)
}

abstract class BaseCommand {
  protected editor: Editor

  constructor(editor: Editor, ...args: any[]) {
    this.editor = editor
  }
  // TODO: abstract static method
  abstract cmdName(): string
  abstract undo(): void
  abstract redo(): void
  afterRedo() { /** */ }
  afterUndo() { /** */ }
}

/**
 * AddRect
 *
 * add rect svg element
 */

class AddRect extends BaseCommand {
  // private editor: Editor
  nextSibling: Element
  parent: Element
  rect: IFSVG['Rect']

  constructor(editor: Editor, x: number, y: number, w: number, h: number) {
    super(editor)
    // this.editor = editor
    const rect = new FSVG.Rect(x, y, w, h)

    setDefaultAttrsBySetting(rect, editor.setting)
    editor.getCurrentLayer().addChild(rect)

    this.nextSibling = rect.el().nextElementSibling
    this.parent = rect.el().parentElement
    this.rect = rect

    this.editor.activedElsManager.setEls(this.rect)
  }
  static cmdName() {
    return 'addRect'
  }
  cmdName() {
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
 * AddPath
 *
 * add path element
 */
class AddPath extends BaseCommand {
  // private editor: Editor
  nextSibling: Element
  parent: Element
  el: IFSVG['Path']

  constructor(
    editor: Editor,
    params: {
      d: string,
      path?: IFSVG['Path'],
      seg: ISegment
    }
  ) {
    super(editor)
    const el = params.path || new FSVG.Path()

    setDefaultAttrsBySetting(el, editor.setting)
    el.setAttr('d', params.d)
    if (params.seg) {
      el.setMetaData('handleOut', params.seg.handleOut)
    }

    editor.getCurrentLayer().addChild(el)
    this.nextSibling = el.el().nextElementSibling
    this.parent = el.el().parentElement
    this.el = el

    this.editor.activedElsManager.setEls(this.el)
  }
  static cmdName() {
    return 'addPath'
  }
  cmdName() {
    return 'addPath'
  }
  redo() {
    const el = this.el.el()
    if (this.nextSibling) {
      this.parent.insertBefore(el, this.nextSibling)
    } else {
      this.parent.appendChild(el)
    }
    this.editor.activedElsManager.setEls(this.el)
  }
  undo() {
    this.el.el().remove()
    this.editor.activedElsManager.clear()
  }
}
/**
 * remove elements
 */
class RemoveElements extends BaseCommand {
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
    return 'removeElements'
  }
  cmdName() {
    return 'removeElements'
  }
  private execute() {
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
class DMove extends BaseCommand {
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
  cmdName() {
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
interface Attrs { [prop: string]: string }
class SetAttr extends BaseCommand {
  private els: Array<FElement>
  private attrs: Attrs
  private beforeAttrs: { [prop: string]: string[] } = {}

  constructor(editor: Editor, els: Array<FElement> | FElement, attrs: Attrs) {
    super(editor)
    if (!Array.isArray(els)) els = [els]
    this.els = els

    // this.attrs = attrs
    for (const key in attrs) {
      this.beforeAttrs[key] = []
      this.els.forEach(el => {
        const value = el.getAttr(key)
        this.beforeAttrs[key].push(value)

        el.setAttr(key, attrs[key])
      })
    }
    this.attrs = attrs
  }
  static cmdName() {
    return 'setAttr'
  }
  cmdName() {
    return 'setAttr'
  }
  redo() {
    const attrs = this.attrs
    for (const key in attrs) {
      this.els.forEach(el => {
        el.setAttr(key, attrs[key])
      })
    }

    this.editor.activedElsManager.heighligthEls()
  }
  undo() {
    const attrs = this.attrs
    for (const key in attrs) {
      this.els.forEach((el, index) => {
        el.setAttr(key, this.beforeAttrs[key][index])
      })
    }

    this.editor.activedElsManager.heighligthEls()
  }
}

/**
 * transform: scale
 */
class Scale extends BaseCommand {
  constructor(
    editor: Editor, private el: FElement,
    private scaleX: number, private scaleY: number,
    private cx?: number, private cy?: number
  ) {
    super(editor)
    //
    this.el.scale(scaleX, scaleY)
  }
  static cmdName() {
    return 'scale'
  }
  cmdName() {
    return 'scale'
  }
  redo() {
    //
  }
  undo() {
    //
  }
}

export {
  BaseCommand,
  AddRect,
  AddPath,
  RemoveElements,
  DMove,
  SetAttr,
  Scale,
}
