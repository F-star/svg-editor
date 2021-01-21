
/**
 * layer manager
 *
 * TODO:
 */
import Editor from '../Editor'
import { FElement } from '../element/baseElement'
import { FSVG, IFSVG } from '../element/index'
import { IdGenerator } from '../util/IdGenerator'


class Layer {
  el_: IFSVG['Group']

  constructor(private editor: Editor, id: number) {
    this.el_ = new FSVG.Group()
    this.el_.setID('layer-' + id)
  }
  el() { return this.el_.el() }
  getVisible() {}
  visible() { this.el_.visible() }
  hide() { this.el_.hide() }
  addChild(child: FElement) { this.el_.append(child) }
  remove() { this.el_.remove() }
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
