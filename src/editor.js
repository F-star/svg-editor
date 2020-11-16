
class Editor {
  constructor() {
    this.tools = {}
    this.currentTool = 'select'

    const canvasWidth = 400
    const canvasHeight = 300
    const containerWidth = 1000
    const containerHeight = 600

    const stage = document.createElement('div')
    stage.classList.add('svg-stage')
    stage.style.width = '800px'
    stage.style.height = '550px'
    
    const svgContainer = document.createElement('div')
    // svgContainer.classList.add('svg-svgContainer')
    svgContainer.style.backgroundColor = '#ddd'
    svgContainer.style.width = '800px'
    svgContainer.style.height = '550px'
    svgContainer.style.overflow = 'scroll'

    const svgRoot = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    // svgRoot.style.width = '1000px'
    // svgRoot.style.height = '600px'
    svgRoot.setAttribute('width', 1000)
    svgRoot.setAttribute('height', 600)
    this.svgRoot = svgRoot
    
    const svgBg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svgBg.setAttribute('width', 400)
    svgBg.setAttribute('height', 300)
    svgBg.setAttribute('x', 300)
    svgBg.setAttribute('y', 150)

    const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    bgRect.setAttribute('width', '100%')
    bgRect.setAttribute('height', '100%')
    bgRect.setAttribute('fill', '#fff')

    const svgContent = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svgContent.setAttribute('width', 400)
    svgContent.setAttribute('height', 300)
    svgContent.setAttribute('x', 300)
    svgContent.setAttribute('y', 150)
    svgContent.style.overflow = 'visible'
    this.svgContent = svgContent

    const layer = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    this.currentLayer = layer

    stage.appendChild(svgContainer)
    svgContainer.appendChild(svgRoot)
    svgBg.appendChild(bgRect)
    svgRoot.appendChild(svgBg)
    svgContent.appendChild(layer)
    svgRoot.appendChild(svgContent)
    document.body.appendChild(stage)

    // svgRoot.addEventListener('mousedown', function(e) {
    //   console.log(e)
    //   const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    //   circle.setAttribute('r', 6)
    //   circle.setAttribute('cx', e.offsetX - svgContent.getAttribute('x'))
    //   circle.setAttribute('cy', e.offsetY - svgContent.getAttribute('y'))
    //   svgContent.appendChild(circle)
    // })

    // const currentState = 'go'
  }
  getCurrentLayer() {
    return this.currentLayer
  }

  // tool 相关方法
  setCurrentTool(name) {
    this.currentTool = this.tools[name]
  }
  registerTool(tool) {
    this.tools[tool.name()] = tool
    tool.setEditor(this) // 依赖注入
  }
  bindToolEvent() {
    const createToolEvent = e => {
      const x = e.offsetX - this.svgContent.getAttribute('x')
      const y = e.offsetY - this.svgContent.getAttribute('y')

      return {
        getPosition: () => ({x, y}),
        origin: e,
      }
    }

    // 鼠标按下事件
    this.svgRoot.addEventListener('mousedown', (e) => {
      const toolEvent = createToolEvent(e)
      this.currentTool.start(toolEvent)
    }, false)

    // 鼠标释放事件
    this.svgRoot.addEventListener('mouseup', (e) => {
      const toolEvent = createToolEvent(e)
      this.currentTool.end(toolEvent)
    }, false)
  }

}

export default Editor
