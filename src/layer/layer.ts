
/**
 * layer manager
 *
 * TODO:
 */
import { NS } from '../constants'
import Editor from '../Editor'
import { FElement } from '../element/baseElement'
import { IdGenerator } from '../util/IdGenerator'


class Layer {
  el_: SVGGElement

  constructor(private editor: Editor, id: number) {
    this.el_ = document.createElementNS(NS.SVG, 'g') as SVGGElement
    this.el_.id = 'layer-' + id
  }
  el() {
    return this.el_
  }
  getVisible() {}
  setVisible(val: boolean) {}
  addChild(child: FElement) {
    this.el_.appendChild(child.el())
  }
  remove() {
    this.el_.remove()
  }
}

export class LayerManager {
  // layers: Array<Layer> = []
  private currentLayer: Layer = null
  private isInit = false
  private idGenerator = new IdGenerator()

  constructor(private editor: Editor) {}
  createInitLayerAndMount() {
    if (this.isInit) {
      throw new Error('Had inited! Don\'t call this methods again!')
    }
    const id = this.idGenerator.getId()
    const layer = new Layer(this.editor, id)
    this.addLayer(layer)
    this.isInit = true
  }
  setCurrent(layer: Layer) {
    this.currentLayer = layer
  }
  getCurrent() {
    return this.currentLayer
  }
  addLayer(layer: Layer) {
    // this.layers.push(layer)
    this.editor.svgContent.appendChild(layer.el())
    this.currentLayer = layer
  }
  removeCurrLayer() {
    //
  }
}
