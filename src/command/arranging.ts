

/**
 * front
 * forward
 * backward
 * back
 */

import Editor from "../editor"
import { FElement } from "../element/baseElement"
import { BaseCommand } from "./commands"

export class ArrangingFront extends BaseCommand {
  els: Array<FElement>
  nextSiblings: Array<FElement>

  constructor(editor: Editor, els?: Array<FElement>) {
    super(editor)
    if (els === undefined) {
      this.els = editor.activedElsManager.getEls()
    } else {
      this.els = els
    }
    
    if (this.els.length === 0) {
      throw new Error('elements can not be empty.')
    }

    this.nextSiblings = new Array(this.els.length)
    for (let i = 0; i < this.els.length; i++) {
      const el = this.els[i]
      this.nextSiblings[i] = el.nextSibling()
      el.front()
    }
  }
  static cmdName() {
    return 'front'
  }
  undo() {
    const size = this.els.length
    for (let i = size - 1; i >= 0; i--) {
      const el = this.els[i]
      const nextSibling = this.nextSiblings[i]
      if (nextSibling !== null) {
        el.before(nextSibling)
      }
    }
  }
  redo() {
    for (let i = 0; i < this.els.length; i++) {
      const el = this.els[i]
      el.front()
    }
  }
}

export class ArrangingBack extends BaseCommand {
  els: Array<FElement>
  previousSiblings: Array<FElement>

  constructor(editor: Editor, els?: Array<FElement>) {
    super(editor)
    if (els === undefined) {
      this.els = editor.activedElsManager.getEls()
    } else {
      this.els = els
    }
    
    if (this.els.length === 0) {
      throw new Error('elements can not be empty.')
    }

    this.previousSiblings = new Array(this.els.length)
    for (let i = this.els.length - 1; i >= 0; i--) {
      const el = this.els[i]
      this.previousSiblings[i] = el.previousSibling()
    }

    this.exec()
  }
  static cmdName() {
    return 'back'
  }
  undo() {
    const size = this.els.length
    for (let i = 0; i < size; i++) {
      const el = this.els[i]
      const nextSibling = this.previousSiblings[i]
      if (nextSibling !== null) {
        el.after(nextSibling)
      }
    }
  }
  redo() {
    this.exec()
  }
  exec() {
    for (let i = this.els.length - 1; i >= 0; i--) {
      const el = this.els[i]
      el.back()
    }
  }
}

/**
 * forward elements
 */
export class ArrangingForward extends BaseCommand {
  els: Array<FElement>

  constructor(editor: Editor, els?: Array<FElement>) {
    super(editor)
    if (els === undefined) {
      this.els = editor.activedElsManager.getEls()
    } else {
      this.els = els
    }
    
    if (this.els.length === 0) {
      throw new Error('elements can not be empty.')
    }

    this.exec()
  }
  static cmdName() {
    return 'forward'
  }
  exec() {
    let lastForwardedEl = null
    for (let i = this.els.length - 1; i >= 0; i--) {
      const el = this.els[i]
      const nextSibling = el.el().nextElementSibling
      if (lastForwardedEl !== null && nextSibling === lastForwardedEl) {
        // do nothing
      } else if (nextSibling) {
        el.after(nextSibling as SVGElement)
      }
      lastForwardedEl = el.el()
    }
  }
  undo() {
    let lastBackwardedEl = null
    for (let i = 0; i < this.els.length; i++) {
      const el = this.els[i]
      const previousSibling = el.el().previousElementSibling
      if (lastBackwardedEl !== null && previousSibling === lastBackwardedEl) {
        // do nothing
      } else if (previousSibling) {
        el.before(previousSibling as SVGElement)
      }
      lastBackwardedEl = el.el()
    }
  }
  redo() { this.exec() }
}

/**
 * backward elements
 */
export class ArrangingBackward extends BaseCommand {
  els: Array<FElement>

  constructor(editor: Editor, els: Array<FElement>) {
    super(editor)
    if (els === undefined) {
      this.els = editor.activedElsManager.getEls()
    } else {
      this.els = els
    }
    if (this.els.length === 0) {
      throw new Error('elements can not be empty.')
    }

    this.exec()
  }
  static cmdName() {
    return 'backward'
  }
  exec() {
    let lastBackwardedEl = null
    for (let i = 0; i < this.els.length; i++) {
      const el = this.els[i]
      const previousSibling = el.el().previousElementSibling
      if (lastBackwardedEl !== null && previousSibling === lastBackwardedEl) {
        // do nothing
      } else if (previousSibling) {
        el.before(previousSibling as SVGElement)
      }
      lastBackwardedEl = el.el()
    }
  }
  undo() {
    let lastForwardedEl = null
    for (let i = this.els.length - 1; i >= 0; i--) {
      const el = this.els[i]
      const nextSibling = el.el().nextElementSibling
      if (lastForwardedEl !== null && nextSibling === lastForwardedEl) {
        // do nothing
      } else if (nextSibling) {
        el.after(nextSibling as SVGElement)
      }
      lastForwardedEl = el.el()
    }
  }
  redo() { this.exec() }
}
