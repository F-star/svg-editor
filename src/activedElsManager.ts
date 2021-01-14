/**
 * 激活元素管理类
 */

import Editor from './Editor'
import { FElement } from './element/baseElement'
import { FSVG } from './element/index'
import { getElementsInBox } from './util/common'
import { IBox } from './element/box'

export class ActivedElsManager {
  els: Array<FElement>

  constructor(private editor: Editor) {
    this.els = []
  }
  setEls(els: Array<FElement> | FElement) {
    if (!Array.isArray(els)) els = [els]
    this.els = els
    // console.log(this.editor.toolManager.getCurrentToolName())
    // TODO: highlight outline, according to current tool
    this.heighligthEls()

    this.setSetting('fill')
    this.setSetting('stroke')
    this.setSetting('stroke-width')
  }
  getEls() {
    return this.els
  }
  setElsInBox(box: IBox) {
    if (box.width === 0 || box.height === 0) {
      this.clear()
      return
    }

    const elsInBox = getElementsInBox(box, this.editor.svgContent)
    if (elsInBox.length === 0) {
      this.clear()
    } else {
      this.setEls(elsInBox)
    }
  }
  isEmpty() {
    return this.els.length === 0
  }
  isNoEmpty() {
    return this.els.length > 0
  }
  clear() {
    this.els = []
    // clear outline
    const hudManager = this.editor.hudManager
    hudManager.outlineBoxHud.clear()
  }
  contains(el: HTMLOrSVGElement) {
    for (let i = 0; i < this.els.length; i++) {
      if (this.els[i].el() === el) {
        return true
      }
    }
    return false
  }
  getMergeBBox() {
    // TODO:
    /* let x, y, w, h
    this.els.forEach(el => {
      const bbox = el.el().getbbox()
    }) */
  }
  // heightlight the elements
  heighligthEls() {
    const els = this.els
    const hudManager = this.editor.hudManager

    const firstBox = new FSVG.Box(els[0].getBBox())
    const mergedBox = els.reduce((pre, curEl) => {
      const curBox = curEl.getBBox()
      return pre.merge(new FSVG.Box(curBox))
    }, firstBox)

    hudManager.outlineBoxHud.drawRect(mergedBox.x, mergedBox.y, mergedBox.width, mergedBox.height)
  }
  setSetting(name: string) {
    const els = this.els

    const vals = els.map(el => {
      return el.getAttr(name)
    })

    this.editor.setting.set(name, vals[0]) // FIXME:
  }
  setElsAttr(name: string, val: string) {
    if (this.isNoEmpty()) {
      this.editor.executeCommand('setAttr', this.els, name, val)
    }
  }
}
