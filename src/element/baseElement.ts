
/**
 * 对 SVG 元素的简单封装
 */

import { FSVG } from "./index"

export class FElement {
  protected el_: SVGElement

  constructor() {
    this.el_ = null
  }
  el() {
    return this.el_
  }
  setAttr(prop: string, val: string) {
    return this.el_.setAttribute(prop, val)
  }
  getAttr(prop: string) {
    return this.el_.getAttribute(prop)
  }
  getBBox() {
    return (this.el_ as SVGGraphicsElement).getBBox()
  }
  remove() {
    return this.el_.remove()
  }
  equal(el: FElement | SVGElement) {
    if ((el as FElement).el) {
      el = (el as FElement).el()
    }
    return this.el_ === el
  }

  /** DOM methods */
  parent() {
    const p = this.el_.parentElement
    return FSVG.create(p as SVGElement) // FIXME:
  }
  nextSibling() {
    const nextOne = this.el_.nextElementSibling
    if (nextOne == null) return nextOne
    return FSVG.create(nextOne as SVGElement)
  }
  previousSibling() {
    const n = this.el_.previousSibling
    if (n == null) return n
    return FSVG.create(n as SVGElement)
  }
  append(el: FElement) {
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
    const nextSibling = this.el_.nextSibling // FIXME:
    if (nextSibling) {
      parent.insertBefore(nextSibling, this.el_)
    }
  }
  backward() {
    const previousSibling = this.el_.previousElementSibling // FIXME:
    if (previousSibling) {
      this.before(previousSibling as SVGElement)
    }
  }
  before(referElement: FElement | SVGElement) {
    if ((referElement as FElement).el) {
      referElement = (referElement as FElement).el()
    }
    const parent = (referElement as SVGElement).parentElement
    parent.insertBefore(this.el_, referElement as SVGElement)
  }
  after(referElement: FElement | SVGElement) {
    if ((referElement as FElement).el) {
      referElement = (referElement as FElement).el()
    }
    const parent = (referElement as SVGElement).parentElement
    const nextSibling = referElement.nextSibling
    if (nextSibling) {
      parent.insertBefore(this.el_, nextSibling as SVGElement)
    } else {
      parent.appendChild(this.el_)
    }
  }
 }