
/**
 * group
 * 
 * Encapsulation of <g> 
 */

import { NS } from "../constants"
import { FElement } from "./baseElement"

export class Group extends FElement {
  constructor(el) {
    super()
    if (el) {
      this.el_ = el
    } else {
      this.el_ = document.createElementNS(NS.SVG, 'g')
    }
  }

}