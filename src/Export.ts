import Editor from './Editor'

class Export {
  constructor(private editor: Editor) {}
  getSVGData(): string {
    const g = this.editor.svgContent
    return g.outerHTML
  }
  downloadSVG(filename: string) {
    const obj = {
      a: 'test1',
      b: 'test2'
    }
    const content = JSON.stringify(obj)
    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = filename
    // document.documentElement.appendChild(a)
    a.click()
    // document.documentElement.removeChild(a)
  }
}


export default Export
