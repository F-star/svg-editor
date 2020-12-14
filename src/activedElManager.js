/**
 * 激活元素管理类
 */

export class ActivedElManager {
  constructor(editor) {
    this.editor = editor
    this.els = []
  }
  setEls(els) {
    this.els = els
    console.log(this.editor.toolManager.getCurrentToolName())
    // TODO: highlight outline, according to current tool
  }
  clearEls() {
    this.els = []
  }
  contains(el) {
    // TODO:
  }
  getbbox() {
    // TODO:
    /* let x, y, w, h
    this.els.forEach(el => {
      const bbox = el.el().getbbox()
    }) */
  }
  // heightlight the elements
  hlEls() {
    // TODO:
  }
}