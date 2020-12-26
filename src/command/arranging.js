

/**
 * front
 * forward
 * backward
 * back
 */

import { BaseCommand } from "./commands"

export class ArrangingFront extends BaseCommand {
  constructor(editor, els) {
    super()
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
  static name() {
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
  constructor(editor, els) {
    super()
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
  static name() {
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

export class ArrangingForward extends BaseCommand {
  constructor(editor, els) {
    super()
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
  static name() {
    return 'forward'
  }
  exec() {
    let prev = null
    for (let i = this.els.length - 1; i >= 0; i--) {
      const el = this.els[i]
      const nextSibling = el.el().nextSibling
      if (prev !== null && nextSibling === prev) {
        // do nothing
      } else if (nextSibling) {
        el.after(nextSibling)
      }
      prev = el.el()
    }
  }
  undo() {
    // TODO:
  }
  redo() { this.exec() }
}