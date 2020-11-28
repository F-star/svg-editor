/** zoom */

const { getViewBox } = require("../util/svg")

class Zoom {
  constructor() {
    this.editor = null
  }
  name() {
    return 'zoom'
  }
  setEditor(editor) {
    this.editor = editor
  }
  getZoom() {
    const actulWidth = parseFloat(this.editor.svgRoot.getAttribute('width'))
    const viewBox = getViewBox(this.editor.svgRoot)
    const zoom = actulWidth / viewBox.w
    return zoom
  }
  setZoom() {

  }
  zooIn () {

  }
}