/**
 * Viewport
 * 
 * scroll, zoom
 */
import Editor from "./editor"
import { getViewBox } from "./util/svg"

export class Viewport {
  constructor(private editor: Editor) {}

  /**
   * scroll
   */
  getScroll() {
    return {
      x: this.editor.svgContainer.scrollLeft,
      y: this.editor.svgContainer.scrollTop,
    }
  }
  setScroll(x: number, y: number) {
    this.editor.svgContainer.scrollLeft = x
    this.editor.svgContainer.scrollTop = y
  }
  getContentOffset() {
    return {
      x: parseFloat(this.editor.svgStage.getAttribute('x')),
      y: parseFloat(this.editor.svgStage.getAttribute('y')),
    }
  }

  /**
   * zoom
   */
  getZoom() {
    const actulWidth = parseFloat(this.editor.svgRoot.getAttribute('width'))
    const viewBox = getViewBox(this.editor.svgRoot)
    const zoom = actulWidth / viewBox.w
    return zoom
  }
  setZoom(zoom: number, cx?: number, cy?: number) {
    // TODO:
    console.log(zoom)
    const viewBox = getViewBox(this.editor.svgRoot)
    const width = viewBox.w * zoom
    const height = viewBox.h * zoom
    this.editor.svgRoot.setAttribute('width', width + '')
    this.editor.svgRoot.setAttribute('height', height + '')
  }
  zoomIn(cx?: number, cy?: number) {
    const currentZoom = this.getZoom()
    this.setZoom(currentZoom + 0.1, cx, cy)
  }
  zoomOut(cx?: number, cy?: number) {
    const currentZoom = this.getZoom()
    this.setZoom(currentZoom - 0.1, cx, cy)
  }
  // get viewport center pos, parse to svg pos
  // getCenter() {

  // }
  center() {
    const scrollWidth = this.getSVGRootBox('width')
    const scrollHeight = this.getSVGRootBox('height')
    const viewportWidth = this.getViewportBox('width')
    const viewportHeight = this.getViewportBox('height')
    this.setScroll(
      (scrollWidth - viewportWidth) / 2,
      (scrollHeight - viewportHeight) / 2
    )
  }

  getViewportBox(prop: any) {
    return parseFloat(this.editor.viewportElement.style[prop])
  }
  getSVGRootBox(prop: string) {
    return parseFloat(this.editor.svgRoot.getAttribute(prop))
  }
}