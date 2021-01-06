import { ActivedElsManager } from "./activedElsManager"
import { HudManager } from "./editorLayer/hudManager"
import { ZoomManager } from "./modules/zoom"
import { Shortcut } from "./shortcut"
import { Viewport } from "./viewport"

class Editor {
  constructor() {
    this.setting = null
    this.commandManager = null
    this.zoomManager = new ZoomManager(this)
    this.activedElsManager = new ActivedElsManager(this)
    this.shortcut = new Shortcut(this)
    this.toolManager = null
    this.viewport = new Viewport(this)


    const viewportW = 800
    const viewportH = 550
    const svgRootW = 1000
    const svgRootH = 600
    const svgStageW = 500
    const svgStageH = 400

    const viewportElement = document.createElement('div')
    viewportElement.id = 'viewportElement'
    viewportElement.style.border = '1px solid #000'
    viewportElement.style.width = viewportW + 'px'
    viewportElement.style.height = viewportH + 'px'
    this.viewportElement = viewportElement
    
    const svgContainer = document.createElement('div')
    svgContainer.id = 'svg-container'
    svgContainer.style.backgroundColor = '#ddd'
    svgContainer.style.width = viewportW + 'px'
    svgContainer.style.height = viewportH + 'px'
    svgContainer.style.overflow = 'scroll'
    this.svgContainer = svgContainer

    const svgRoot = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svgRoot.id = 'svg-root'
    svgRoot.setAttribute('width', svgRootW)
    svgRoot.setAttribute('height', svgRootH)
    svgRoot.setAttribute('viewBox', `0 0 ${svgRootW} ${svgRootH}`)
    this.svgRoot = svgRoot

    const svgStage = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svgStage.id = 'svg-stage'
    svgStage.setAttribute('width', svgStageW)
    svgStage.setAttribute('height', svgStageH)
    svgStage.setAttribute('x', Math.floor((svgRootW - svgStageW) / 2))
    svgStage.setAttribute('y', Math.floor((svgRootH - svgStageH) / 2))
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

export default Editor
