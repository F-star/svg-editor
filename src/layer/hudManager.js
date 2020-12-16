/**
 * guide line layer
 */

import { OutlineHud } from "./outlineHud";
import { SelectArea } from "./selectArea";
const { NS } = require("../constants");

export class HudManager{
  constructor() {
    this.container = document.createElementNS(NS.SVG, 'g')
    this.container.id = 'huds'

    this.selectArea = new SelectArea(this.container)
    this.outlineHud = new OutlineHud(this.container)
  }
  mount(el) {
    el.appendChild(this.container)
  }
}

