/**
 * Viewport
 *
 * scroll, zoom
 */
import Editor from './Editor'
import { getViewBox } from './util/svg'

type listener = (zoom: number) => void
export class Viewport {
  private zoomListeners: Array<listener> = []

  constructor(private editor: Editor) {}
  /** scroll */
  getScroll() {
    return {
      x: this.editor.viewportElement.scrollLeft,
      y: this.editor.viewportElement.scrollTop,
    }
  }
  setScroll(x: number, y: number) {
    this.editor.viewportElement.scrollLeft = x
    this.editor.viewportElement.scrollTop = y
  }
  getContentOffset() {
    return {
      x: parseFloat(this.editor.svgStage.getAttribute('x')),
      y: parseFloat(this.editor.svgStage.getAttribute('y')),
    }
  }
  getViewportCenter() {
    // FIXME:
    const w = parseFloat(this.editor.svgStage.getAttribute('width'))
    const h = parseFloat(this.editor.svgStage.getAttribute('height'))
    return {
      x: w / 2,
      y: h / 2,
    }
  }
  /** zoom */
  getZoom() {
    const actulWidth = parseFloat(this.editor.svgRoot.getAttribute('width'))
    const viewBox = getViewBox(this.editor.svgRoot)
    const zoom = actulWidth / viewBox.w
    return zoom
  }
  setZoom(zoom: number, cx?: number, cy?: number) {
    if (cx === undefined) {
      const point = this.getViewportCenter()
      cx = point.x
      cy = point.y
    }
    // adjust scroll position
    const { x: scrollX, y: scrollY } = this.getScroll()
    const { x: offsetX, y: offsetY } = this.getContentOffset()
    const oldZoom = this.getZoom()
    const dx = (cx + offsetX) * oldZoom - scrollX
    const dy = (cy + offsetY) * oldZoom - scrollY
    const newX = (cx + offsetX) * zoom - dx
    const newY = (cy + offsetY) * zoom - dy
    this.setScroll(newX, newY)

    const viewBox = getViewBox(this.editor.svgRoot)
    const width = viewBox.w * zoom
    const height = viewBox.h * zoom

    this.editor.svgRoot.setAttribute('width', String(width))
    this.editor.svgRoot.setAttribute('height', String(height))
    this.editor.svgContainer.style.width = width + 'px'
    this.editor.svgContainer.style.height = height + 'px'

    this.emitZoomListeners()
  }
  zoomIn(cx?: number, cy?: number) {
    const currentZoom = this.getZoom()
    this.setZoom(currentZoom + 0.2, cx, cy)
  }
  zoomOut(cx?: number, cy?: number) {
    const currentZoom = this.getZoom()
    this.setZoom(currentZoom - 0.2, cx, cy)
  }
  onZoomChange(fn: listener) {
    this.zoomListeners.push(fn)
  }
  private emitZoomListeners() {
    const zoom = this.getZoom()
    this.zoomListeners.forEach(fn => {
      fn(zoom)
    })
  }
  center() {
    const scrollWidth = this.getSVGRootBox('width')
    const scrollHeight = this.getSVGRootBox('height')
    const viewportWidth = this.getViewportWidth()
    const viewportHeight = this.getViewportHeight()
    this.setScroll(
      (scrollWidth - viewportWidth) / 2,
      (scrollHeight - viewportHeight) / 2
    )
  }

  getViewportWidth(): number {
    const widthVal = this.editor.viewportElement.getAttribute('width')
    if (widthVal) {
      return parseFloat(widthVal)
    }
    return this.editor.viewportElement.offsetWidth
  }

  getViewportHeight(): number {
    const val = this.editor.viewportElement.getAttribute('height')
    if (val) {
      return parseFloat(val)
    }
    return this.editor.viewportElement.offsetHeight
  }

  getSVGRootBox(prop: string) {
    return parseFloat(this.editor.svgRoot.getAttribute(prop))
  }
}
