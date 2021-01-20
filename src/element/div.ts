
/**
 * div
 */

// import { FElement } from './baseElement'

export class Div {
  private el_: HTMLDivElement

  constructor(el?: HTMLDivElement) {
    if (el) {
      this.el_ = el
    } else {
      this.el_ = document.createElement('div')
    }
  }
  el() {
    return this.el_
  }
  setID(id: string) {
    this.el_.id = id
  }
  setStyleProp(name: any, val: string) {
    this.el_.style[name] = val
  }
  getWidth(): number {
    const val = this.el_.getAttribute('width')
    if (val) {
      return parseFloat(val)
    }
    return this.el_.offsetWidth
  }
  setWidth(val: number) {
    this.el_.style.width = val + 'px'
  }
  getHeight(): number {
    const val = this.el_.getAttribute('height')
    if (val) {
      return parseFloat(val)
    }
    return this.el_.offsetHeight
  }
  setHeight(val: number) {
    this.el_.style.height = val + 'px'
  }
}
