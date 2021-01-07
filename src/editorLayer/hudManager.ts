/**
 * guide line layer
 */

import { OutlineBoxHud } from "./outlineBoxHud";
import { SelectArea } from "./selectArea";
import { NS } from "../constants"
import { Select } from "../modules/select";

export class HudManager{
  container: SVGGElement
  selectArea: SelectArea
  outlineBoxHud: OutlineBoxHud

  constructor() {
    this.container = document.createElementNS(NS.SVG, 'g') as SVGGElement
    this.container.id = 'huds'


    this.selectArea = new SelectArea(this.container)
    this.outlineBoxHud = new OutlineBoxHud(this.container)
    
  }
  mount(el: Node) {
    el.appendChild(this.container)
  }
}

