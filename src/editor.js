import { ActivedElsManager } from "./activedElsManager"
import { HudManager } from "./editorLayer/hudManager"
import { ZoomManager } from "./modules/zoom"
import { Shortcut } from "./shortcut"
import { getViewBox } from "./util/svg"

class Editor {
  constructor() {
    this.setting = null
    this.commandManager = null
    this.zoomManager = new ZoomManager(this)
    this.activedElsManager = new ActivedElsManager(this)
    this.shortcut = new Shortcut(this)
    this.toolManager = null
    this.viewport = new Viewport(this)
    // const contentWidth = 400
    // const contentHeight = 300
    // const stageWidth = 1000 // 正在纠结命名
    // const stageHeight = 600
    const viewportWidth = 800
    const viewportHeight = 550

    const viewportElement = document.createElement('div')
    viewportElement.id = 'viewportElement'
    viewportElement.style.border = '1px solid #000'
    viewportElement.style.width = viewportWidth + 'px'
    viewportElement.style.height = viewportHeight + 'px'
    this.viewportElement = viewportElement
    
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

    viewportElement.appendChild(svgContainer)
    svgContainer.appendChild(svgRoot)
    svgRoot.appendChild(svgStage)

    svgStage.appendChild(svgBg)
    svgBg.appendChild(bgRect)
    svgStage.appendChild(svgContent)
    svgContent.appendChild(layer)


    this.hudManager = new HudManager()
    this.hudManager.mount(svgStage)

    // document.body.appendChild(viewportElement)
  }
  mount(selector) {
    const mountNode = document.querySelector(selector)
    mountNode.appendChild(this.viewportElement)
  }
  getCurrentLayer() {
    return this.currentLayer
  }

  setToolManager(toolManager) {
    this.toolManager = toolManager
  }
  // tool relatived methods
  setCurrentTool(name) {
    this.toolManager.setCurrentTool(name)
  }
  registerTool(tool) {
    this.toolManager.registerTool(tool)
  }
  setSetting(setting) {
    this.setting = setting
  }
  setCursor(val) {
    this.svgRoot.style.cursor = val
  }

  // 命令相关
  setCommandManager(commandManager) {
    this.commandManager = commandManager
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

  isContentElement(el) {
    while (el) {
      if (el.parentElement == this.svgContent) {
        return true
      }
      if (el.parentElement == this.svgRoot) {
        return false
      }
      el = el.parentElement
    }
    return false
  }
}

/**
 * Viewport
 * 
 * scroll, zoom
 */
class Viewport {
  constructor(editor) {
    this.editor = editor
  }

  /**
   * scroll
   */
  getScroll() {
    return {
      x: this.editor.svgContainer.scrollLeft,
      y: this.editor.svgContainer.scrollTop,
    }
  }
  setScroll(x, y) {
    this.editor.svgContainer.scrollLeft = x
    this.editor.svgContainer.scrollTop = y
  }
  getContentOffset() {
    return {
      x: this.editor.svgStage.getAttribute('x'),
      y: this.editor.svgStage.getAttribute('y'),
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
  setZoom(zoom) {
    console.log(zoom)
    const viewBox = getViewBox(this.editor.svgRoot)
    const width = viewBox.w * zoom
    const height = viewBox.h * zoom
    this.editor.svgRoot.setAttribute('width', width)
    this.editor.svgRoot.setAttribute('height', height)
  }
  zoomIn(cx, cy) {
    // TODO:
    const currentZoom = this.getZoom()
    this.setZoom(currentZoom + 0.1)
  }
  zoomOut() {
    const currentZoom = this.getZoom()
    this.setZoom(currentZoom - 0.1)
  }
}

export default Editor
