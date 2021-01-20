import { NS } from './constants'
import Editor from './Editor'

class Export {
  constructor(private editor: Editor) {}
  private getSVGData(): string {
    const svgStage = this.editor.svgStage
    const w = parseFloat(svgStage.getAttribute('width'))
    const h = parseFloat(svgStage.getAttribute('height'))
    const group = this.editor.svgContent
    const arr = [
      `<svg viewBox="0 0 ${w} ${h}" `,
      `xmlns="${NS.SVG}" xmlns:svg="${NS.SVG}">`,
      group.outerHTML,
      '</svg>'
    ]
    return arr.join('')
  }
  downloadSVG(filename: string) {
    const content = this.getSVGData()
    const blob = new Blob([content], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
  }
}


export default Export
