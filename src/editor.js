import { GuideLine } from "./layer/guideLine"

class Editor {
  constructor() {
    this.tools = {}
    this.currentTool = 'select'
    this.options = null
    this.commandManager = null
    this.zoomManager = null

    // const contentWidth = 400
    // const contentHeight = 300
    // const stageWidth = 1000 // 正在纠结命名
    // const stageHeight = 600
    const viewportWidth = 800
    const viewportHeight = 550

    const viewport = document.createElement('div')
    viewport.id = 'viewport'
    viewport.style.border = '1px solid #000'
    viewport.style.width = viewportWidth + 'px'
    viewport.style.height = viewportHeight + 'px'
    
    const svgContainer = document.createElement('div')
    svgContainer.id = 'svg-container'
    svgContainer.style.backgroundColor = '#ddd'
    svgContainer.style.width = viewportWidth + 'px'
    svgContainer.style.height = viewportHeight + 'px'
    svgContainer.style.overflow = 'scroll'
    this.svgContainer = svgContainer

    const svgRoot = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svgRoot.id = 'svg-root'
    svgRoot.setAttribute('width', 1000)
    svgRoot.setAttribute('height', 600)
    svgRoot.setAttribute('viewBox', '0 0 1000 600')
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
  setOptions(options) {
    this.options = options
  }
  bindToolEvent() {
    const createToolEvent = e => {
      const zoom = this.getZoom()
      const x = e.offsetX / zoom - this.svgStage.getAttribute('x')
      const y = e.offsetY / zoom - this.svgStage.getAttribute('y')
      return {
        getPosition: () => ({x, y}),
        origin: e,
      }
    }

    this.svgRoot.addEventListener('mousedown', (e) => {
      this.isPressed = true // TODO:
      const toolEvent = new ToolEvent(e, this)
      this.currentTool.start(toolEvent)
    }, false)

    this.svgRoot.addEventListener('mousemove', (e) => {
      if (!this.isPressed) return
      const toolEvent = new ToolEvent(e, this)
      this.currentTool.move(toolEvent)
    }, false)
    
    this.svgRoot.addEventListener('mouseup', (e) => {
      this.isPressed = false
      const toolEvent = new ToolEvent(e, this)
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

  // zoom
  setZoomManager(zoomManager) {
    zoomManager.setEditor(this)
    this.zoomManager = zoomManager
  }
  getZoom() { // 封装
    return this.zoomManager.getZoom()
  }
}

/**
 * TODO:
 * context class
 * 
 * used for tool event
 */
class EditorContext {
  constructor() {
    this.isPressed = false
  }
  getPosition() {

  }
}

class ToolEvent {
  constructor(e, editor) {
    this.origin = e


    const zoom = editor.getZoom()
    this.x = e.offsetX / zoom - editor.svgStage.getAttribute('x')
    this.y = e.offsetY / zoom - editor.svgStage.getAttribute('y')

    this.offsetX = editor.svgContainer.scrollLeft
    this.offsetY = editor.svgContainer.scrollTop
  }
  getPosition() {
    return {
      x: this.x,
      y: this.y,
    }
  }
  getOffset() {
    return {
      x: this.offsetX,
      y: this.offsetY,
    }
  }
}


export default Editor
