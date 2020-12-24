
/**
 * 对 SVG 元素的简单封装
 */

import { FSVG } from "."

export class FElement {
  constructor() {
    this.el_ = null
  }
  el() {
    return this.el_
  }
  setAttr(prop, val) {
    return this.el_.setAttribute(prop, val)
  }
  getAttr(prop) {
    return this.el_.getAttribute(prop)
  }
  getBBox() {
    return this.el_.getBBox()
  }
  remove() {
    return this.el_.remove()
  }

  /** DOM methods */
  parent() {
    return new FSVG.Group(this.el_.parentElement)
  }
  nextSibling() {
    const n = this.el_.nextElementSibling
    if (n == null) return n
    return FSVG.create(n)
  }
  append(el) {
    this.el_.appendChild(el.el())
  }
  front() {
    const parent = this.el_.parentElement
    parent.appendChild(this.el_)
  }
 }