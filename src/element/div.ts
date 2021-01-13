
/**
 * div
 */

// import { FElement } from './baseElement'

export class Div {
  private el_: HTMLDivElement

  constructor(el: HTMLDivElement) {
    this.el_ = el
  }
  getWidth(): number {
    const widthVal = this.el_.getAttribute('width')
    if (widthVal) {
      return parseFloat(widthVal)
    }
    return this.el_.offsetWidth
  }
}
