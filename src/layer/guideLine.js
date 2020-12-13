/**
 * guide line layer
 */

import { RectGuide } from "./rectGuide";
const { NS } = require("../constants");

export class GuideLine{
  constructor() {
    this.container = document.createElementNS(NS.SVG, 'g')
    this.container.id = 'guide-layout'
    this.rectGuide = new RectGuide(this.container)
  }
  mount(el) {
    el.appendChild(this.container)
  }
}

