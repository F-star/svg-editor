import { ActivedElsManager } from './activedElsManager'
import CommandManager from './command/commandManager'
import { Huds } from './huds/index'
import { ToolAbstract } from './tools/ToolAbstract'
import { EditorSetting } from './setting/editorSetting'
import { Shortcut } from './shortcut'
import { ToolManager } from './tools/index'
import { Viewport } from './viewport'
import { LayerManager } from './layer/layer'
import Export from './Export'
import editorDefaultConfig from './config/editorDefaultConfig'

class Editor {
  setting: EditorSetting
  commandManager: CommandManager
  activedElsManager: ActivedElsManager
  shortcut: Shortcut
  tools: ToolManager
  viewport: Viewport
  layerManager: LayerManager
  huds: Huds
  export: Export

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
    this.tools = null
    this.viewport = new Viewport(this)
    this.layerManager = new LayerManager(this)
    this.huds = new Huds(this)
    this.export = new Export(this)

    const svgRootW = editorDefaultConfig.svgRootW
    const svgRootH = editorDefaultConfig.svgRootH
    const svgStageW = editorDefaultConfig.svgStageW
    const svgStageH = editorDefaultConfig.svgStageH

    this.viewportElement = null

    const svgContainer = document.createElement('div')
    svgContainer.id = 'svg-container'
    svgContainer.style.backgroundColor = '#999'
    svgContainer.style.width = svgRootW + 'px'
    svgContainer.style.height = svgRootH + 'px'
    this.svgContainer = svgContainer

    const svgRoot = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svgRoot.id = 'svg-root'
    svgRoot.setAttribute('width', svgRootW + '')
    svgRoot.setAttribute('height', svgRootH + '')
    svgRoot.setAttribute('viewBox', `0 0 ${svgRootW} ${svgRootH}`)
    this.svgRoot = svgRoot

    const svgStage = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svgStage.id = 'svg-stage'
    svgStage.setAttribute('width', String(svgStageW))
    svgStage.setAttribute('height', String(svgStageH))
    svgStage.setAttribute('x', String(Math.floor((svgRootW - svgStageW) / 2)))
    svgStage.setAttribute('y', String(Math.floor((svgRootH - svgStageH) / 2)))
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

    svgContainer.appendChild(this.svgRoot)
    svgRoot.appendChild(svgStage)

    svgStage.appendChild(svgBg)
    svgBg.appendChild(bgRect)
    svgStage.appendChild(svgContent)

    this.layerManager.createInitLayerAndMount()
    this.huds.mount()

    /** mount!! */
    // viewportElement.appendChild(svgContainer)
    // document.body.appendChild(viewportElement)
  }
  mount(selector: string) {
    const viewportElement = document.querySelector(selector) as HTMLDivElement
    viewportElement.style.overflow = 'scroll'
    this.viewportElement = viewportElement
    viewportElement.appendChild(this.svgContainer)
  }
  getCurrentLayer() {
    return this.layerManager.getCurrent()
  }

  setToolManager(tools: ToolManager) {
    this.tools = tools
  }
  // tool relatived methods
  setCurrentTool(name: string) {
    this.tools.setCurrentTool(name)
  }
  registerTool(tool: ToolAbstract) {
    this.tools.registerTool(tool)
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
