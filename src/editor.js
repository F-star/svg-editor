import { GuideLine } from "./layer/guideLine"

class Editor {
  constructor() {
    this.tools = {}
    this.currentTool = 'select'

    const canvasWidth = 400
    const canvasHeight = 300
    const containerWidth = 1000
    const containerHeight = 600

    const viewport = document.createElement('div')
    viewport.id = 'viewport'
    viewport.style.width = '800px'
    viewport.style.height = '550px'
    
    const svgContainer = document.createElement('div')
    svgContainer.id = 'svg-container'
    svgContainer.style.backgroundColor = '#ddd'
    svgContainer.style.width = '800px'
    svgContainer.style.height = '550px'
    svgContainer.style.overflow = 'scroll'

    const svgRoot = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svgRoot.id = 'svg-root'
    svgRoot.setAttribute('width', 1000)
    svgRoot.setAttribute('height', 600)
    this.svgRoot = svgRoot

    const svgStage = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svgStage.id = 'svg-stage'
    svgStage.setAttribute('width', 400)
    svgStage.setAttribute('height', 300)
    svgStage.setAttribute('x', 300)
    svgStage.setAttribute('y', 150)
    svgStage.style.overflow = 'visible'
    this.svgStage = svgStage

    const svgBg = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    svgBg.id = 'background'
    // svgBg.setAttribute('width', 400)
    // svgBg.setAttribute('height', 300)
    svgBg.setAttribute('x', 0)
    svgBg.setAttribute('y', 0)

    const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    bgRect.setAttribute('width', '100%')
    bgRect.setAttribute('height', '100%')
    bgRect.setAttribute('fill', '#fff')

    const svgContent = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    svgContent.id = 'content'
    // svgContent.setAttribute('width', 400)
    // svgContent.setAttribute('height', 300)
    svgContent.setAttribute('x', 0)
    svgContent.setAttribute('y', 0)
    this.svgContent = svgContent

    const layer = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    layer.id = 'layer-1'
    this.currentLayer = layer

    viewport.appendChild(svgContainer)
    svgContainer.appendChild(svgRoot)
    svgRoot.appendChild(svgStage)

    svgStage.appendChild(svgBg)
    svgBg.appendChild(bgRect)
    svgStage.appendChild(svgContent)
    svgContent.appendChild(layer)


    this.guideLine = new GuideLine()
    this.guideLine.mount(svgStage)

    document.body.appendChild(viewport)
  }
  getCurrentLayer() {
    return this.currentLayer
  }

  // tool relatived methods
  setCurrentTool(name) {
    this.currentTool = this.tools[name]
  }
  registerTool(tool) {
    this.tools[tool.name()] = tool
    tool.setEditor(this) // dependency injection
  }
  bindToolEvent() {
    const createToolEvent = e => {
      const x = e.offsetX - this.svgStage.getAttribute('x')
      const y = e.offsetY - this.svgStage.getAttribute('y')

      return {
        getPosition: () => ({x, y}),
        origin: e,
      }
    }

    this.svgRoot.addEventListener('mousedown', (e) => {
      this.isPressed = true // TODO:
      const toolEvent = createToolEvent(e)
      this.currentTool.start(toolEvent)
    }, false)

    this.svgRoot.addEventListener('mousemove', (e) => {
      if (!this.isPressed) return
      const toolEvent = createToolEvent(e)
      this.currentTool.move(toolEvent)
    }, false)
    
    this.svgRoot.addEventListener('mouseup', (e) => {
      this.isPressed = false
      const toolEvent = createToolEvent(e)
      this.currentTool.end(toolEvent)
    }, false)
  }

  // 命令相关
  setCommandManager(commandManager) {
    this.commandManager = commandManager
    commandManager.setEditor(this)
  }
  executeCommand(name, ...params) {
    if (name == 'undo') {
      this.commandManager.undo()
      return
    }
    if (name == 'redo') {
      this.commandManager.redo()
      return
    }
    this.commandManager.execute(name, ...params)
  }
}


export default Editor
