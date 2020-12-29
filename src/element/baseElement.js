
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
  equal(el) {
    if (el.el) {
      el = el.el()
    }
    return this.el_ === el
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
  previousSibling() {
    const n = this.el_.previousSibling
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
  back() {
    const parent = this.el_.parentElement
    const firstChild = parent.firstElementChild
    if (firstChild) {
      parent.insertBefore(this.el_, firstChild)
    }
  }
  forward() {
    const parent = this.el_.parentElement
    const nextSibling = referElement.nextSibling
    if (nextSibling) {
      parent.insertBefore(nextSibling, this.el_)
    }
  }
  backward() {
    const previousSibling = referElement.previousSibling
    if (previousSibling) {
      this.before(previousSibling)
    }
  }
  before(referElement) {
    if (referElement.el) {
      referElement = referElement.el()
    }
    const parent = referElement.parentElement
    parent.insertBefore(this.el_, referElement)
  }
  after(referElement) {
    if (referElement.el) {
      referElement = referElement.el()
    }
    const parent = referElement.parentElement
    const nextSibling = referElement.nextSibling
    if (nextSibling) {
      parent.insertBefore(this.el_, nextSibling)
    } else {
      parent.appendChild(this.el_)
    }
  }
 }