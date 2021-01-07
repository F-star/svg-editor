import { ActivedElsManager } from './activedElsManager'
import CommandManager from './command/commandManager'
import { HudManager } from './editorLayer/hudManager'
import { ToolAbstract } from './modules/ToolAbstract'
import { EditorSetting } from './setting/editorSetting'
import { Shortcut } from './shortcut'
import { ToolManager } from './toolManager'
import { Viewport } from './viewport'
import { LayerManager } from './layer/layer'

class Editor {
  setting: EditorSetting
  commandManager: CommandManager
  activedElsManager: ActivedElsManager
  shortcut: Shortcut
  toolManager: ToolManager
  viewport: Viewport
  layerManager: LayerManager
  hudManager: HudManager

  // elements
  viewportElement: HTMLElement
  svgContainer: HTMLElement
  svgRoot: SVGSVGElement
  svgStage: SVGSVGElement
  svgContent: SVGGElement

  constructor() {
    this.setting = null
    this.commandManager = null
    this.activedElsManager = new ActivedElsManager(this)
    this.shortcut = new Shortcut(this)
    this.toolManager = null
    this.viewport = new Viewport(this)
    this.layerManager = new LayerManager(this)
    this.hudManager = new HudManager()

    const viewportW = 800
    const viewportH = 550
    const svgRootW = 1000
    const svgRootH = 600
    const svgStageW = 520
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
    svgRoot.setAttribute('width', svgRootW + '')
    svgRoot.setAttribute('height', svgRootH + '')
    svgRoot.setAttribute('viewBox', `0 0 ${svgRootW} ${svgRootH}`)
    this.svgRoot = svgRoot

    const svgStage = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svgStage.id = 'svg-stage'
    svgStage.setAttribute('width', svgStageW + '')
    svgStage.setAttribute('height', svgStageH + '')
    svgStage.setAttribute('x', Math.floor((svgRootW - svgStageW) / 2) + '')
    svgStage.setAttribute('y', Math.floor((svgRootH - svgStageH) / 2) + '')
    svgStage.style.overflow = 'visible'
    this.svgStage = svgStage

    const svgBg = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    svgBg.id = 'background'
    // svgBg.setAttribute('width', 400)
    // svgBg.setAttribute('height', 300)
    svgBg.setAttribute('x', '0')
    svgBg.setAttribute('y', '0')

    const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    bgRect.setAttribute('width', '100%')
    bgRect.setAttribute('height', '100%')
    bgRect.setAttribute('fill', '#fff')

    const svgContent = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    svgContent.id = 'content'
    // svgContent.setAttribute('width', 400)
    // svgContent.setAttribute('height', 300)
    svgContent.setAttribute('x', '0')
    svgContent.setAttribute('y', '0')
    this.svgContent = svgContent

    viewportElement.appendChild(svgContainer)
    svgContainer.appendChild(svgRoot)
    svgRoot.appendChild(svgStage)

    svgStage.appendChild(svgBg)
    svgBg.appendChild(bgRect)
    svgStage.appendChild(svgContent)

    this.layerManager.createInitLayerAndMount()
    this.hudManager.mount(svgStage)

    // document.body.appendChild(viewportElement)
  }
  mount(selector: string) {
    const mountNode = document.querySelector(selector)
    mountNode.appendChild(this.viewportElement)
  }
  getCurrentLayer() {
    return this.layerManager.getCurrent()
  }

  setToolManager(toolManager: ToolManager) {
    this.toolManager = toolManager
  }
  // tool relatived methods
  setCurrentTool(name: string) {
    this.toolManager.setCurrentTool(name)
  }
  registerTool(tool: ToolAbstract) {
    this.toolManager.registerTool(tool)
  }
  setSetting(setting: EditorSetting) {
    this.setting = setting
  }
  setCursor(val: string) {
    this.svgRoot.style.cursor = val
  }

  // 命令相关
  setCommandManager(commandManager: CommandManager) {
    this.commandManager = commandManager
  }
  executeCommand(name: string, ...params: any[]) {
    if (name === 'undo') {
      this.commandManager.undo()
      return
    }
    if (name === 'redo') {
      this.commandManager.redo()
      return
    }
    this.commandManager.execute(name, ...params)
  }

  // TODO: set any type temporarily
  isContentElement(el: any) {
    while (el) {
      if (el.parentElement === this.svgContent) {
        return true
      }
      if (el.parentElement === this.svgRoot) {
        return false
      }
      el = el.parentElement
    }
    return false
  }
}

export default Editor
