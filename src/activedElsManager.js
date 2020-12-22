/**
 * 激活元素管理类
 */

import { FSVG } from "./element"
import { getElementsInBox } from "./util/common"

export class ActivedElsManager {
  constructor(editor) {
    this.editor = editor
    this.els = []
  }
  setEls(els) {
    if (!Array.isArray(els)) els = [els]
    this.els = els
    // console.log(this.editor.toolManager.getCurrentToolName())
    // TODO: highlight outline, according to current tool
    this.heighligthEls()
    this.setSettingFill()
  }
  getEls() {
    return this.els
  }
  setElsInBox(box) {
    const elsInBox = getElementsInBox(box, this.editor.svgContent)
    if (elsInBox.length === 0) this.clear()
    else this.setEls(elsInBox)
  }
  isEmpty() {
    return this.els.length == 0
  }
  isNoEmpty() {
    return this.els.length > 0
  }
  clear() {
    this.els = []
    // clear outline
    const hudManager = this.editor.hudManager
    hudManager.outlineHud.clear()
  }
  contains(el) {
    // TODO:
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
    const mergedBox = els.reduce(pre, curEl => {
      curBox = curEl.getBBox()
      return pre.merge(new FSVG.Box(curBox))
    }, firstBox)

    hudManager.outlineHud.drawRect(mergedBox.x, mergedBox.y, mergedBox.width, mergedBox.height)
  }
  setSettingFill() {
    const els = this.els

    const fills = els.map(el => {
      return el.getAttr('fill')
    })

    this.editor.setting.setFill(fills[0]) // FIXME:
  }
  setElsAttr(name, val) {
    if (this.isNoEmpty()) {
      this.editor.executeCommand('setAttr', this.els, name, val)
    }
  }
}