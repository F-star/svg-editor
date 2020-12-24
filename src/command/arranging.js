

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

    const size = this.els.length
    this.nextSiblings = new Array(size)

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
    // TODO:
  }
  redo() {
    // TODO:
    const size = this.els.length
    for (let i = this.els[size - 1]; i >= 0; i--) {

    }
  }
  

}