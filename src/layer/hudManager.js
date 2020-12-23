/**
 * guide line layer
 */

import { OutlineBoxHud } from "./outlineBoxHud";
import { SelectArea } from "./selectArea";
const { NS } = require("../constants");

export class HudManager{
  constructor() {
    this.container = document.createElementNS(NS.SVG, 'g')
    this.container.id = 'huds'

    this.selectArea = new SelectArea(this.container)
    this.outlineBoxHud = new OutlineBoxHud(this.container)
  }
  mount(el) {
    el.appendChild(this.container)
  }
}

