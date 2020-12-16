/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/activedElManager.js":
/*!*********************************!*\
  !*** ./src/activedElManager.js ***!
  \*********************************/
/*! namespace exports */
/*! export ActivedElManager [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActivedElManager": () => /* binding */ ActivedElManager
/* harmony export */ });
/**
 * 激活元素管理类
 */

class ActivedElManager {
  constructor(editor) {
    this.editor = editor
    this.els = []
  }
  setEls(els) {
    this.els = els
    console.log(this.editor.toolManager.getCurrentToolName())
    // TODO: highlight outline, according to current tool
  }
  clearEls() {
    this.els = []
  }
  contains(el) {
    // TODO:
  }
  getbbox() {
    // TODO:
    /* let x, y, w, h
    this.els.forEach(el => {
      const bbox = el.el().getbbox()
    }) */
  }
  // heightlight the elements
  hlEls() {
    // TODO:
  }
}

/***/ }),

/***/ "./src/command.js":
/*!************************!*\
  !*** ./src/command.js ***!
  \************************/
/*! namespace exports */
/*! export AddRectCommand [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DMove [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddRectCommand": () => /* binding */ AddRectCommand,
/* harmony export */   "DMove": () => /* binding */ DMove
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
;

class BaseCommand {
  undo() {
    throw new Error('please override undo method')
  }
  redo() {
    throw new Error('please override redo method')
  }
}

/**
 * addRect
 * 
 * add rect svg element
 */
class AddRectCommand extends BaseCommand {
  constructor(editor, x, y, w, h) {
    super()
    // TODO: 使用编辑器使用的颜色等样式
    const rect = document.createElementNS(_constants__WEBPACK_IMPORTED_MODULE_0__.NS.SVG, 'rect')
    rect.setAttribute('x', x)
    rect.setAttribute('y', y)
    rect.setAttribute('width', w)
    rect.setAttribute('height', h)

    const fill = editor.setting.get('fill')
    const stroke = editor.setting.get('stroke')
    const strokeWidth = editor.setting.get('strokeWidth')
    rect.setAttribute('fill', fill)
    rect.setAttribute('stroke', stroke)
    rect.setAttribute('stroke-width', strokeWidth)

    editor.getCurrentLayer().appendChild(rect)

    this.nextSibling = rect.nextElementSibling 
    this.parent = rect.parentElement
    this.element = rect
  }

  static name() {
    return 'addRect'
  }

  redo() {
    if (this.nextSibling) {
      this.parent.insertBefore(this.element, this.nextSibling)
    } else {
      this.parent.appendChild(this.element)
    }
  }

  undo() {
    this.element.remove()
  }
}

class DMove extends BaseCommand {
  constructor(editor, els, dx, dy) {
    super()

    this.dx = dx
    this.dy = dy
    this.els = els

    this.els.forEach(el => {
      el.dmove(this.dx, this.dy)
    })
    
  }

  static name() {
    return 'dmove'
  }

  redo() {
    this.els.forEach(el => {
      el.dmove(this.dx, this.dy)
    })
  }

  undo() {
    this.els.forEach(el => {
      el.dmove(-this.dx, -this.dy)
    })
  }
}

/***/ }),

/***/ "./src/commandManager.js":
/*!*******************************!*\
  !*** ./src/commandManager.js ***!
  \*******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });




/**
 * CommandManager
 * 
 * 命令管理了
 * 
 * CommandManager.undo()
 * CommandManager.redo()
 */
class CommandManager {
  constructor() {
    this.redoStack = []
    this.undoStack = []
    this.commandClasses = {}
  }
  setEditor(editor) {
    this.editor = editor
  }
  execute(name, ...args) {
    name = name.toLowerCase()
    const CommandClass = this.commandClasses[name]

    const command = new CommandClass(this.editor, ...args) // 创建 command 实例

    this.undoStack.push(command)
    this.redoStack = []
  }
  undo() {
    if (this.undoStack.length === 0) {
      console.log('到头了，无法继续撤回')
      return
    }
    const command = this.undoStack.pop()
    this.redoStack.push(command)
    command.undo()
  }
  redo() {
    if (this.redoStack.length === 0) {
      console.log('到头了，无法继续重做')
      return
    }
    const command = this.redoStack.pop()
    this.undoStack.push(command)
    command.redo()
  }

  // 注册命令类到命令管理对象中。
  resigterCommandClass(commandClass) {
    name = commandClass.name().toLowerCase()
    this.commandClasses[name] = commandClass
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommandManager);

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! namespace exports */
/*! export NS [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NS": () => /* binding */ NS
/* harmony export */ });
// 常量

const NS = {
  HTML: 'http://www.w3.org/1999/xhtml',
  MATH: 'http://www.w3.org/1998/Math/MathML',
  SE: 'http://svg-edit.googlecode.com',
  SVG: 'http://www.w3.org/2000/svg',
  XLINK: 'http://www.w3.org/1999/xlink',
  XML: 'http://www.w3.org/XML/1998/namespace',
  XMLNS: 'http://www.w3.org/2000/xmlns/' // see http://www.w3.org/TR/REC-xml-names/#xmlReserved
};

 





/***/ }),

/***/ "./src/editor.js":
/*!***********************!*\
  !*** ./src/editor.js ***!
  \***********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _activedElManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./activedElManager */ "./src/activedElManager.js");
/* harmony import */ var _editorEventContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editorEventContext */ "./src/editorEventContext.js");
/* harmony import */ var _layer_guideLine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layer/guideLine */ "./src/layer/guideLine.js");
;



class Editor {
  constructor() {
    this.setting = null
    this.commandManager = null
    this.zoomManager = null
    this.activedElManager = new _activedElManager__WEBPACK_IMPORTED_MODULE_0__.ActivedElManager(this)


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
    this.viewport = viewport
    
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


    this.guideLine = new _layer_guideLine__WEBPACK_IMPORTED_MODULE_2__.GuideLine()
    this.guideLine.mount(svgStage)

    // document.body.appendChild(viewport)
  }
  mount(selector) {
    const mountNode = document.querySelector(selector)
    mountNode.appendChild(this.viewport)
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

  getScroll() {
    return {
      x: this.svgContainer.scrollLeft,
      y: this.svgContainer.scrollTop,
    }
  }
  setScroll(x, y) {
    this.svgContainer.scrollLeft = x
    this.svgContainer.scrollTop = y
  }
  getContentOffset() {
    return {
      x: this.svgStage.getAttribute('x'),
      y: this.svgStage.getAttribute('y'),
    }
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Editor);


/***/ }),

/***/ "./src/editorEventContext.js":
/*!***********************************!*\
  !*** ./src/editorEventContext.js ***!
  \***********************************/
/*! namespace exports */
/*! export EditorEventContext [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditorEventContext": () => /* binding */ EditorEventContext
/* harmony export */ });

/**
 * context class
 * 
 * used for tool event
 */

class EditorEventContext {
  constructor(editor, e) {
    this.mousePressed = false
    this.originEvent = e
    this.editor = editor
    this.isEndInside = false

    this.startX = 0
    this.startY = 0

    this.offsetX = 0
    this.offsetY = 0

    this.startClientX = 0 // used to calc dx and dy.
    this.startClientY = 0
    this.dx = 0
    this.dy = 0

    this.setStartPos()
  }
  setOriginEvent(e) {
    this.originEvent = e
  }
  setStartPos() {
    const { x, y } = this.getPos()

    this.startX = x
    this.startY = y

    this.startClientX = this.originEvent.clientX
    this.startClientY = this.originEvent.clientY
  }
  releaseMouse() {
    this.mousePressed = false
  }
  pressMouse() {
    this.mousePressed = true
  }
  getPos() {
    const zoom = this.editor.getZoom()
    const {x, y} = this.editor.getContentOffset()
    return { 
      x: this.originEvent.offsetX / zoom - x, 
      y: this.originEvent.offsetY / zoom - y,
    }
  }
  getStartPos() {
    return {
      x: this.startX,
      y: this.startY,
    }
  }
  // without calc with zoom value
  getDiffPos() {
    const x = this.originEvent.clientX - this.startClientX
    const y = this.originEvent.clientY - this.startClientY
    return { x, y }
  }

}

/***/ }),

/***/ "./src/editorSetting.js":
/*!******************************!*\
  !*** ./src/editorSetting.js ***!
  \******************************/
/*! namespace exports */
/*! export EditorSetting [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditorSetting": () => /* binding */ EditorSetting
/* harmony export */ });

class EditorSetting {
  constructor() {
    this.setting = {
      fill: '#fff',
      stroke: '#000',
      strokeWidth: '2px',

      // outlineWidth
      // outlineColor
    }
  }
  setFill(val) {
    this.setting.fill = val
  }
  setStroke(val) {
    this.setting.fill = val
  }
  set(name, val) {
    this.setting[name] = val
  }
  get(name) {
    return this.setting[name]
  }
}

/***/ }),

/***/ "./src/element/baseElement.js":
/*!************************************!*\
  !*** ./src/element/baseElement.js ***!
  \************************************/
/*! namespace exports */
/*! export FElement [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FElement": () => /* binding */ FElement
/* harmony export */ });

/**
 * 对 SVG 元素的简单封装
 */

class FElement {
  constructor() {
    this.el_ = null
  }
  el() {
    return this.el_
  }
  setAttr(prop, val) {
    return this.el_.setAttribute(prop, val)
  }
  getAttr(prop) {
    return this.el_.getAttribute(prop)
  }
  getBBox() {
    return this.el_.getBBox()
  }
}

/***/ }),

/***/ "./src/element/index.js":
/*!******************************!*\
  !*** ./src/element/index.js ***!
  \******************************/
/*! namespace exports */
/*! export FSVG [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FSVG": () => /* binding */ FSVG
/* harmony export */ });
/* harmony import */ var _rect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rect */ "./src/element/rect.js");
;


/**
 * FSVG
 * 
 * simple SVGElement encapsulation
 */
const FSVG = {
  Rect: _rect__WEBPACK_IMPORTED_MODULE_0__.Rect,
}

/***/ }),

/***/ "./src/element/rect.js":
/*!*****************************!*\
  !*** ./src/element/rect.js ***!
  \*****************************/
/*! namespace exports */
/*! export Rect [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Rect": () => /* binding */ Rect
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/* harmony import */ var _baseElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./baseElement */ "./src/element/baseElement.js");

/**
 * 对 rect 元素的简单封装
 */

;


class Rect extends _baseElement__WEBPACK_IMPORTED_MODULE_1__.FElement {
  // constructor(x: number, y: number, w: number, h: number);
  // constructor(el: SVGElement);
  constructor(x, y, w, h) {
    super()
    if (typeof x == 'object') {
      this.el_ = x
    } else {
      this.el_ = document.createElementNS(_constants__WEBPACK_IMPORTED_MODULE_0__.NS.SVG, 'rect')
      this.el_.setAttr('x', x)
      this.el_.setAttr('y', y)
      this.el_.setAttr('width', w)
      this.el_.setAttr('height', h)
    }
  }
  getPos() {
    const x = parseFloat(this.getAttr('x'))
    const y = parseFloat(this.getAttr('y'))
    return { x, y }
  }
  dmove(dx, dy) {
    const pos = this.getPos()
    this.setAttr('x', pos.x + dx)
    this.setAttr('y', pos.y + dy)
  }
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commandManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commandManager.js */ "./src/commandManager.js");
/* harmony import */ var _editor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.js */ "./src/editor.js");
/* harmony import */ var _modules_addRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/addRect.js */ "./src/modules/addRect.js");
/* harmony import */ var _modules_dragCanvas_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/dragCanvas.js */ "./src/modules/dragCanvas.js");
/* harmony import */ var _command_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./command.js */ "./src/command.js");
/* harmony import */ var _editorSetting_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editorSetting.js */ "./src/editorSetting.js");
/* harmony import */ var _modules_zoom_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/zoom.js */ "./src/modules/zoom.js");
/* harmony import */ var _modules_select_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/select.js */ "./src/modules/select.js");
/* harmony import */ var _toolManager_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./toolManager.js */ "./src/toolManager.js");
;










function activeBtn(name) {
  name = {
    'select': 'btn-select',
    'addRect': 'btn-add-rect',
    'dragCanvas': 'btn-drag-canvas',
  }[name]
  if (name == undefined) return

  const toolBar = document.querySelector('#tool-bar')
  // toolBtns = Array.prototype.slice.call(toolBtns)
  
  const toolBtns = Array.prototype.slice.call(toolBar.children)
  console.log(toolBtns)
  toolBtns.forEach(item => {
    console.log(item)
    item.classList.remove('active')
  })
  document.getElementById(name).classList.add('active')
}


const editor = new _editor_js__WEBPACK_IMPORTED_MODULE_1__.default()

// register commands
const commandManager = new _commandManager_js__WEBPACK_IMPORTED_MODULE_0__.default()
commandManager.resigterCommandClass(_command_js__WEBPACK_IMPORTED_MODULE_4__.AddRectCommand)
commandManager.resigterCommandClass(_command_js__WEBPACK_IMPORTED_MODULE_4__.DMove)
// setting
editor.setSetting(new _editorSetting_js__WEBPACK_IMPORTED_MODULE_5__.EditorSetting())

editor.setCommandManager(commandManager)
// register tools

const toolManager = new _toolManager_js__WEBPACK_IMPORTED_MODULE_8__.ToolManager(editor)
editor.setToolManager(toolManager)
toolManager.registerTool(new _modules_addRect_js__WEBPACK_IMPORTED_MODULE_2__.default())
toolManager.registerTool(new _modules_dragCanvas_js__WEBPACK_IMPORTED_MODULE_3__.DragCanvas())
toolManager.registerTool(new _modules_select_js__WEBPACK_IMPORTED_MODULE_7__.Select())
// toolManager.setCurrentTool('addRect')
editor.toolManager.onSwitchTool(name => {
  console.log('switched tool:', name)
  activeBtn(name)
})
toolManager.setCurrentTool('select')
toolManager.bindToolEvent()
// zoom
editor.setZoomManager(new _modules_zoom_js__WEBPACK_IMPORTED_MODULE_6__.ZoomManager())

editor.mount('#editor-area')


/** 
 * bind event in button
 */ 
// undo
document.querySelector('#btn-undo').onclick = () => {
  editor.executeCommand('undo')
}
// redo
document.querySelector('#btn-redo').onclick = function() {
  editor.executeCommand('redo')
}
// zoomIn
document.querySelector('#btn-zoom-in').onclick = function() {
  editor.zoomManager.zoomIn()
}
// zoomOut
document.querySelector('#btn-zoom-out').onclick = function() {
  editor.zoomManager.zoomOut()
}
// select addRect tool
document.querySelector('#btn-add-rect').onclick = function() {
  editor.setCurrentTool('addRect')
}
// select dragcanvas tool
document.querySelector('#btn-drag-canvas').onclick = function() {
  editor.setCurrentTool('dragCanvas')
}
// select tool
document.querySelector('#btn-select').onclick = function() {
  editor.setCurrentTool('select')
}

/**
 * 理想 api 使用例子
 * 
 * const editorBuilder = new Editor.builder()
 * editorBuilder
 *   .setCanvasSize(400, 300)
 *   .setStageSize(1000, 800)
 *   .setViewportSize(800, 500)
 *   .setZoom(100)
 * 
 * const editor = editorBuilder.build()
 * editor.registerTool(toolMove)
 * 
 */

/***/ }),

/***/ "./src/layer/guideLine.js":
/*!********************************!*\
  !*** ./src/layer/guideLine.js ***!
  \********************************/
/*! namespace exports */
/*! export GuideLine [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GuideLine": () => /* binding */ GuideLine
/* harmony export */ });
/* harmony import */ var _rectGuide__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rectGuide */ "./src/layer/rectGuide.js");
/**
 * guide line layer
 */

;
const { NS } = __webpack_require__(/*! ../constants */ "./src/constants.js");

class GuideLine{
  constructor() {
    this.container = document.createElementNS(NS.SVG, 'g')
    this.container.id = 'guide-layout'
    this.rectGuide = new _rectGuide__WEBPACK_IMPORTED_MODULE_0__.RectGuide(this.container)
  }
  mount(el) {
    el.appendChild(this.container)
  }
}



/***/ }),

/***/ "./src/layer/rectGuide.js":
/*!********************************!*\
  !*** ./src/layer/rectGuide.js ***!
  \********************************/
/*! namespace exports */
/*! export RectGuide [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RectGuide": () => /* binding */ RectGuide
/* harmony export */ });

const { NS } = __webpack_require__(/*! ../constants */ "./src/constants.js");

/**
 * <rect> outline
 */
class RectGuide {
  constructor(parent) {
    this.x = 0
    this.y = 0
    this.w = 0
    this.h = 0

    this.container = document.createElementNS(NS.SVG, 'g')
    this.container.id = 'rect-guide'
    parent.appendChild(this.container)

    this.outline = document.createElementNS(NS.SVG, 'path')
    this.outline.setAttribute('fill', 'none')
    this.outline.setAttribute('stroke', '#f04')

    this.container.appendChild(this.outline)
  }
  clear() {
    // parent.innerHTML = ''
    this.outline.style.display = 'none'
  }
  renderRect(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    // why don't I use rect, just solve the condition when width or height is 0 the outline is disapper
    const d = `M ${x} ${y} L ${x+w} ${y} L ${x+w} ${y+h} L ${x} ${y+h} Z`
    this.outline.setAttribute('d', d)

    /* this.outline.setAttribute('x', x)
    this.outline.setAttribute('y', y)
    this.outline.setAttribute('width', w)
    this.outline.setAttribute('height', h) */
    this.outline.style.display = ''
  }
  getWidth() { return this.w }
  getHeight() { return this.h }
  getX() { return this.x }
  getY() { return this.y }
}

/***/ }),

/***/ "./src/modules/addRect.js":
/*!********************************!*\
  !*** ./src/modules/addRect.js ***!
  \********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _util_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/math */ "./src/util/math.js");

;

class AddRect {
  constructor() {
    this.editor = null
  }
  name() {
    return 'addRect'
  }
  setEditor(editor) { // 依赖注入
    this.editor = editor
  }
  start(ctx) {}
  move(ctx) {
    const { x: endX, y: endY } = ctx.getPos()
    const { x: startX, y: startY } = ctx.getStartPos()
    const { x, y, w, h } = (0,_util_math__WEBPACK_IMPORTED_MODULE_0__.getBoxBy2points)(startX, startY, endX, endY)
    this.editor.guideLine.rectGuide.renderRect(x, y, w, h)
  }
  end(ctx) {
    this.editor.guideLine.rectGuide.clear()

    const { x: endX, y: endY } = ctx.getPos()
    const { x: startX, y: startY } = ctx.getStartPos()
    const { x, y, w, h } = (0,_util_math__WEBPACK_IMPORTED_MODULE_0__.getBoxBy2points)(startX, startY, endX, endY)
    if (w < 2 && h < 2) {
      // TODO: open a dialog to input width and height
      console.log('width and height both less equal to 2，drawing nothing')
      return
    }
    this.editor.executeCommand('addRect', x, y, w, h)
  }
  // mousedown outside viewport
  endOutside() {
    this.editor.guideLine.rectGuide.clear()
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddRect);

/***/ }),

/***/ "./src/modules/dragCanvas.js":
/*!***********************************!*\
  !*** ./src/modules/dragCanvas.js ***!
  \***********************************/
/*! namespace exports */
/*! export DragCanvas [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DragCanvas": () => /* binding */ DragCanvas
/* harmony export */ });

class DragCanvas {
  constructor() {
    this.startOffsetX = 0
    this.startOffsetY = 0
  }
  name() {
    return 'dragCanvas'
  }
  setEditor(editor) { // 依赖注入
    this.editor = editor
  }
  beforeActive() {
    // do something before switch to current tool
  }
  start(ctx) {
    const scroll = this.editor.getScroll()
    this.startOffsetX = scroll.x
    this.startOffsetY = scroll.y
  }
  move(ctx) {
    const zoom = this.editor.getZoom()
    const { x: dx, y: dy } = ctx.getDiffPos()
    this.editor.setScroll(this.startOffsetX - dx, this.startOffsetY - dy)
  }
  end() {}
  endOutside() {}
}


/***/ }),

/***/ "./src/modules/select.js":
/*!*******************************!*\
  !*** ./src/modules/select.js ***!
  \*******************************/
/*! namespace exports */
/*! export Select [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Select": () => /* binding */ Select
/* harmony export */ });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../element */ "./src/element/index.js");
/* harmony import */ var _util_math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/math */ "./src/util/math.js");
;


/**
 * select
 * 
 * 此模块非常复杂
 * 
 * 1. 鼠标按下时，选中单个元素
 * 2. 鼠标按下为空，拖拽时产生选中框，可以选择多个元素
 * 3. 选中单个（或选区选中多个） 缩放 等控制点，拖拽改变宽高
 * 3. 切断刀这个工具时，激活的元素进入被选中状态（轮廓线+控制点）。
 * 4. 选区和元素相交的判定
 * 5. 激活元素如何保存，保存到哪里
 */
class Select {
  constructor() {
    this.editor = null
    this.selectedEls = []

    this.outlineStartX = 0
    this.outlineStartY = 0
  }
  name() {
    return 'select'
  }
  setEditor(editor) {
    this.editor = editor
  }
  hasSelectedElsWhenStart() {
    return this.selectedEls.length > 0
  }
  start(ctx) {
    const targetElement = ctx.originEvent.target
    if (!this.editor.isContentElement(targetElement)) {
      return
    }

    const targetFElement = new _element__WEBPACK_IMPORTED_MODULE_0__.FSVG.Rect(targetElement) // 暂时只是 rect TODO: 改为通用写法
    this.selectedEls = [ targetFElement ] // 鼠标按下时，就选中了一个元素
    const x = parseFloat(targetFElement.getAttr('x'))
    const y = parseFloat(targetFElement.getAttr('y'))
    const w = parseFloat(targetFElement.getAttr('width'))
    const h = parseFloat(targetFElement.getAttr('height'))

    this.outlineStartX = x
    this.outlineStartY = y

    this.editor.guideLine.rectGuide.renderRect(x, y, w, h)
  }
  move(ctx) {
    if (!this.hasSelectedElsWhenStart()) { // draw selecting area
      // select no element, draw select rect
      const { x: endX, y: endY } = ctx.getPos()
      const { x: startX, y: startY } = ctx.getStartPos()
      const { x, y, w, h } = (0,_util_math__WEBPACK_IMPORTED_MODULE_1__.getBoxBy2points)(startX, startY, endX, endY)
      this.editor.guideLine.rectGuide.renderRect(x, y, w, h)
      return
    }

    const { x: dx, y: dy } = ctx.getDiffPos()
    const rectGuide = this.editor.guideLine.rectGuide
    const w = rectGuide.getWidth()
    const h = rectGuide.getHeight()
    rectGuide.renderRect(this.outlineStartX + dx, this.outlineStartY + dy, w, h)
  }
  end(ctx) {
    if (!this.hasSelectedElsWhenStart()) { // finished drawn selecting area
      this.editor.guideLine.rectGuide.clear()
      // TODO: active frame by select rect.
      return
    }
    const rectGuide = this.editor.guideLine.rectGuide
    rectGuide.clear()

    
    const { x: dx, y: dy } = ctx.getDiffPos()
    this.editor.executeCommand('dmove', this.selectedEls, dx, dy)
    this.editor.activedElManager.setEls(this.selectedEls) // set global actived elements
    this.selectedEls = []
  }
  // mousedown outside viewport
  endOutside() {
    this.editor.guideLine.rectGuide.clear()
    this.selectedEls = []
  }
}


/***/ }),

/***/ "./src/modules/zoom.js":
/*!*****************************!*\
  !*** ./src/modules/zoom.js ***!
  \*****************************/
/*! namespace exports */
/*! export ZoomManager [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZoomManager": () => /* binding */ ZoomManager
/* harmony export */ });
/** zoom */

const { getViewBox } = __webpack_require__(/*! ../util/svg */ "./src/util/svg.js")

class ZoomManager {
  constructor() {
    this.editor = null
  }
  setEditor(editor) {
    this.editor = editor
  }
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
  zoomIn() {
    const currentZoom = this.getZoom()
    this.setZoom(currentZoom + 0.1)
  }
  zoomOut() {
    const currentZoom = this.getZoom()
    this.setZoom(currentZoom - 0.1)
  }
}

/***/ }),

/***/ "./src/toolManager.js":
/*!****************************!*\
  !*** ./src/toolManager.js ***!
  \****************************/
/*! namespace exports */
/*! export ToolManager [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ToolManager": () => /* binding */ ToolManager
/* harmony export */ });
const { EditorEventContext } = __webpack_require__(/*! ./editorEventContext */ "./src/editorEventContext.js")

class ToolManager {
  constructor(editor) {
    this.editor = editor
    this.tools = {}
    this.currentTool = null
    this.invokeWhenSwitch = () => {}

    this.ctx = null // tool context
  }
  setCurrentTool(name) {
    this.currentTool = this.tools[name]
    this.invokeWhenSwitch(this.getCurrentToolName())
  }
  onSwitchTool(fn) {
    this.invokeWhenSwitch = fn
  }
  getCurrentToolName() {
    return this.currentTool.name()
  }
  registerTool(tool) {
    this.tools[tool.name()] = tool
    tool.setEditor(this.editor) // dependency injection
  }

  bindToolEvent() {
    const svgRoot = this.editor.svgRoot

    svgRoot.addEventListener('mousedown', e => {
      const ctx = new EditorEventContext(this.editor, e)
      this.ctx = ctx
      this.currentTool.start(ctx)
    }, false)

    svgRoot.addEventListener('mousemove', e => {
      const ctx = this.ctx

      if (!ctx) return // if ctx exits, present mousedown event emit just before
      ctx.setOriginEvent(e)
      ctx.pressMouse()
      this.currentTool.move(ctx) // move
    }, false)
    
    svgRoot.addEventListener('mouseup', e => {
      // this.ctx.releaseMouse()
      const ctx = this.ctx
      // ctx.setOriginEvent(e) // the offsetX and offsetY in mouseup and the last mousemove is not equal ?? 
      this.currentTool.end(ctx)
      ctx.isEndInside = true
    }, false)

    window.addEventListener('mouseup', e => {
      if (this.ctx && this.ctx.isEndInside == false) {
        this.currentTool.endOutside(this.ctx)
      }
      this.ctx = null
    }, false)
  }
}

/***/ }),

/***/ "./src/util/math.js":
/*!**************************!*\
  !*** ./src/util/math.js ***!
  \**************************/
/*! namespace exports */
/*! export getBoxBy2points [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getBoxBy2points": () => /* binding */ getBoxBy2points
/* harmony export */ });

function getBoxBy2points(x1, y1, x2, y2) {
  let x, y, w, h
  w = Math.abs(x2 - x1)
  h = Math.abs(y2 - y1)
  x = Math.min(x2, x1)
  y = Math.min(y2, y1)
  return { x, y, w, h }
}

/***/ }),

/***/ "./src/util/svg.js":
/*!*************************!*\
  !*** ./src/util/svg.js ***!
  \*************************/
/*! namespace exports */
/*! export getViewBox [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getViewBox": () => /* binding */ getViewBox
/* harmony export */ });

// TODO: to finish
function getViewBox(el) {
  const val = el.getAttribute('viewBox')
  if (!val) {
    throw new Error('has not viewBox attribute')
  }
  const [x, y, w, h] = val.split(/[\s,]+/).map(item => parseFloat(item))
  return { x, y, w, h }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2FjdGl2ZWRFbE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9jb21tYW5kLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvY29tbWFuZE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3JFdmVudENvbnRleHQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3JTZXR0aW5nLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvZWxlbWVudC9iYXNlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2VsZW1lbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lbGVtZW50L3JlY3QuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2xheWVyL2d1aWRlTGluZS5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2xheWVyL3JlY3RHdWlkZS5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvYWRkUmVjdC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvZHJhZ0NhbnZhcy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvc2VsZWN0LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy96b29tLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvdG9vbE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy91dGlsL21hdGguanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy91dGlsL3N2Zy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0JBLENBQWdDOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyw4Q0FBTTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLGM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hEZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBLENBQXFEO0FBQ0k7QUFDWjs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQywrREFBZ0I7OztBQUdoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSx5QkFBeUIsdURBQVM7QUFDbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZLckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTzs7QUFFbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDQSxPQUFPLHFCQUFxQixHQUFHLG1CQUFPLENBQUMseURBQXNCOztBQUV0RDtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFETztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOzs7Ozs7O1VDVEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5r+A5rS75YWD57Sg566h55CG57G7XHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdGl2ZWRFbE1hbmFnZXIge1xyXG4gIGNvbnN0cnVjdG9yKGVkaXRvcikge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICAgIHRoaXMuZWxzID0gW11cclxuICB9XHJcbiAgc2V0RWxzKGVscykge1xyXG4gICAgdGhpcy5lbHMgPSBlbHNcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuZWRpdG9yLnRvb2xNYW5hZ2VyLmdldEN1cnJlbnRUb29sTmFtZSgpKVxyXG4gICAgLy8gVE9ETzogaGlnaGxpZ2h0IG91dGxpbmUsIGFjY29yZGluZyB0byBjdXJyZW50IHRvb2xcclxuICB9XHJcbiAgY2xlYXJFbHMoKSB7XHJcbiAgICB0aGlzLmVscyA9IFtdXHJcbiAgfVxyXG4gIGNvbnRhaW5zKGVsKSB7XHJcbiAgICAvLyBUT0RPOlxyXG4gIH1cclxuICBnZXRiYm94KCkge1xyXG4gICAgLy8gVE9ETzpcclxuICAgIC8qIGxldCB4LCB5LCB3LCBoXHJcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgY29uc3QgYmJveCA9IGVsLmVsKCkuZ2V0YmJveCgpXHJcbiAgICB9KSAqL1xyXG4gIH1cclxuICAvLyBoZWlnaHRsaWdodCB0aGUgZWxlbWVudHNcclxuICBobEVscygpIHtcclxuICAgIC8vIFRPRE86XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgTlMgfSBmcm9tIFwiLi9jb25zdGFudHNcIlxyXG5cclxuY2xhc3MgQmFzZUNvbW1hbmQge1xyXG4gIHVuZG8oKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3BsZWFzZSBvdmVycmlkZSB1bmRvIG1ldGhvZCcpXHJcbiAgfVxyXG4gIHJlZG8oKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3BsZWFzZSBvdmVycmlkZSByZWRvIG1ldGhvZCcpXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogYWRkUmVjdFxyXG4gKiBcclxuICogYWRkIHJlY3Qgc3ZnIGVsZW1lbnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBZGRSZWN0Q29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kIHtcclxuICBjb25zdHJ1Y3RvcihlZGl0b3IsIHgsIHksIHcsIGgpIHtcclxuICAgIHN1cGVyKClcclxuICAgIC8vIFRPRE86IOS9v+eUqOe8lui+keWZqOS9v+eUqOeahOminOiJsuetieagt+W8j1xyXG4gICAgY29uc3QgcmVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdyZWN0JylcclxuICAgIHJlY3Quc2V0QXR0cmlidXRlKCd4JywgeClcclxuICAgIHJlY3Quc2V0QXR0cmlidXRlKCd5JywgeSlcclxuICAgIHJlY3Quc2V0QXR0cmlidXRlKCd3aWR0aCcsIHcpXHJcbiAgICByZWN0LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaClcclxuXHJcbiAgICBjb25zdCBmaWxsID0gZWRpdG9yLnNldHRpbmcuZ2V0KCdmaWxsJylcclxuICAgIGNvbnN0IHN0cm9rZSA9IGVkaXRvci5zZXR0aW5nLmdldCgnc3Ryb2tlJylcclxuICAgIGNvbnN0IHN0cm9rZVdpZHRoID0gZWRpdG9yLnNldHRpbmcuZ2V0KCdzdHJva2VXaWR0aCcpXHJcbiAgICByZWN0LnNldEF0dHJpYnV0ZSgnZmlsbCcsIGZpbGwpXHJcbiAgICByZWN0LnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgc3Ryb2tlKVxyXG4gICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsIHN0cm9rZVdpZHRoKVxyXG5cclxuICAgIGVkaXRvci5nZXRDdXJyZW50TGF5ZXIoKS5hcHBlbmRDaGlsZChyZWN0KVxyXG5cclxuICAgIHRoaXMubmV4dFNpYmxpbmcgPSByZWN0Lm5leHRFbGVtZW50U2libGluZyBcclxuICAgIHRoaXMucGFyZW50ID0gcmVjdC5wYXJlbnRFbGVtZW50XHJcbiAgICB0aGlzLmVsZW1lbnQgPSByZWN0XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbmFtZSgpIHtcclxuICAgIHJldHVybiAnYWRkUmVjdCdcclxuICB9XHJcblxyXG4gIHJlZG8oKSB7XHJcbiAgICBpZiAodGhpcy5uZXh0U2libGluZykge1xyXG4gICAgICB0aGlzLnBhcmVudC5pbnNlcnRCZWZvcmUodGhpcy5lbGVtZW50LCB0aGlzLm5leHRTaWJsaW5nKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdW5kbygpIHtcclxuICAgIHRoaXMuZWxlbWVudC5yZW1vdmUoKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERNb3ZlIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgZWxzLCBkeCwgZHkpIHtcclxuICAgIHN1cGVyKClcclxuXHJcbiAgICB0aGlzLmR4ID0gZHhcclxuICAgIHRoaXMuZHkgPSBkeVxyXG4gICAgdGhpcy5lbHMgPSBlbHNcclxuXHJcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgZWwuZG1vdmUodGhpcy5keCwgdGhpcy5keSlcclxuICAgIH0pXHJcbiAgICBcclxuICB9XHJcblxyXG4gIHN0YXRpYyBuYW1lKCkge1xyXG4gICAgcmV0dXJuICdkbW92ZSdcclxuICB9XHJcblxyXG4gIHJlZG8oKSB7XHJcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgZWwuZG1vdmUodGhpcy5keCwgdGhpcy5keSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICB1bmRvKCkge1xyXG4gICAgdGhpcy5lbHMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgIGVsLmRtb3ZlKC10aGlzLmR4LCAtdGhpcy5keSlcclxuICAgIH0pXHJcbiAgfVxyXG59IiwiXHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBDb21tYW5kTWFuYWdlclxyXG4gKiBcclxuICog5ZG95Luk566h55CG5LqGXHJcbiAqIFxyXG4gKiBDb21tYW5kTWFuYWdlci51bmRvKClcclxuICogQ29tbWFuZE1hbmFnZXIucmVkbygpXHJcbiAqL1xyXG5jbGFzcyBDb21tYW5kTWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnJlZG9TdGFjayA9IFtdXHJcbiAgICB0aGlzLnVuZG9TdGFjayA9IFtdXHJcbiAgICB0aGlzLmNvbW1hbmRDbGFzc2VzID0ge31cclxuICB9XHJcbiAgc2V0RWRpdG9yKGVkaXRvcikge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICB9XHJcbiAgZXhlY3V0ZShuYW1lLCAuLi5hcmdzKSB7XHJcbiAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpXHJcbiAgICBjb25zdCBDb21tYW5kQ2xhc3MgPSB0aGlzLmNvbW1hbmRDbGFzc2VzW25hbWVdXHJcblxyXG4gICAgY29uc3QgY29tbWFuZCA9IG5ldyBDb21tYW5kQ2xhc3ModGhpcy5lZGl0b3IsIC4uLmFyZ3MpIC8vIOWIm+W7uiBjb21tYW5kIOWunuS+i1xyXG5cclxuICAgIHRoaXMudW5kb1N0YWNrLnB1c2goY29tbWFuZClcclxuICAgIHRoaXMucmVkb1N0YWNrID0gW11cclxuICB9XHJcbiAgdW5kbygpIHtcclxuICAgIGlmICh0aGlzLnVuZG9TdGFjay5sZW5ndGggPT09IDApIHtcclxuICAgICAgY29uc29sZS5sb2coJ+WIsOWktOS6hu+8jOaXoOazlee7p+e7reaSpOWbnicpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgY29uc3QgY29tbWFuZCA9IHRoaXMudW5kb1N0YWNrLnBvcCgpXHJcbiAgICB0aGlzLnJlZG9TdGFjay5wdXNoKGNvbW1hbmQpXHJcbiAgICBjb21tYW5kLnVuZG8oKVxyXG4gIH1cclxuICByZWRvKCkge1xyXG4gICAgaWYgKHRoaXMucmVkb1N0YWNrLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjb25zb2xlLmxvZygn5Yiw5aS05LqG77yM5peg5rOV57un57ut6YeN5YGaJylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCBjb21tYW5kID0gdGhpcy5yZWRvU3RhY2sucG9wKClcclxuICAgIHRoaXMudW5kb1N0YWNrLnB1c2goY29tbWFuZClcclxuICAgIGNvbW1hbmQucmVkbygpXHJcbiAgfVxyXG5cclxuICAvLyDms6jlhozlkb3ku6TnsbvliLDlkb3ku6TnrqHnkIblr7nosaHkuK3jgIJcclxuICByZXNpZ3RlckNvbW1hbmRDbGFzcyhjb21tYW5kQ2xhc3MpIHtcclxuICAgIG5hbWUgPSBjb21tYW5kQ2xhc3MubmFtZSgpLnRvTG93ZXJDYXNlKClcclxuICAgIHRoaXMuY29tbWFuZENsYXNzZXNbbmFtZV0gPSBjb21tYW5kQ2xhc3NcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbW1hbmRNYW5hZ2VyIiwiLy8g5bi46YePXHJcblxyXG5jb25zdCBOUyA9IHtcclxuICBIVE1MOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsXHJcbiAgTUFUSDogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwnLFxyXG4gIFNFOiAnaHR0cDovL3N2Zy1lZGl0Lmdvb2dsZWNvZGUuY29tJyxcclxuICBTVkc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXHJcbiAgWExJTks6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyxcclxuICBYTUw6ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnLFxyXG4gIFhNTE5TOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nIC8vIHNlZSBodHRwOi8vd3d3LnczLm9yZy9UUi9SRUMteG1sLW5hbWVzLyN4bWxSZXNlcnZlZFxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBOUyxcclxufSBcclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IHsgQWN0aXZlZEVsTWFuYWdlciB9IGZyb20gXCIuL2FjdGl2ZWRFbE1hbmFnZXJcIlxyXG5pbXBvcnQgeyBFZGl0b3JFdmVudENvbnRleHQgfSBmcm9tIFwiLi9lZGl0b3JFdmVudENvbnRleHRcIlxyXG5pbXBvcnQgeyBHdWlkZUxpbmUgfSBmcm9tIFwiLi9sYXllci9ndWlkZUxpbmVcIlxyXG5cclxuY2xhc3MgRWRpdG9yIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuc2V0dGluZyA9IG51bGxcclxuICAgIHRoaXMuY29tbWFuZE1hbmFnZXIgPSBudWxsXHJcbiAgICB0aGlzLnpvb21NYW5hZ2VyID0gbnVsbFxyXG4gICAgdGhpcy5hY3RpdmVkRWxNYW5hZ2VyID0gbmV3IEFjdGl2ZWRFbE1hbmFnZXIodGhpcylcclxuXHJcblxyXG4gICAgLy8gY29uc3QgY29udGVudFdpZHRoID0gNDAwXHJcbiAgICAvLyBjb25zdCBjb250ZW50SGVpZ2h0ID0gMzAwXHJcbiAgICAvLyBjb25zdCBzdGFnZVdpZHRoID0gMTAwMCAvLyDmraPlnKjnuqDnu5Plkb3lkI1cclxuICAgIC8vIGNvbnN0IHN0YWdlSGVpZ2h0ID0gNjAwXHJcbiAgICBjb25zdCB2aWV3cG9ydFdpZHRoID0gODAwXHJcbiAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IDU1MFxyXG5cclxuICAgIGNvbnN0IHZpZXdwb3J0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIHZpZXdwb3J0LmlkID0gJ3ZpZXdwb3J0J1xyXG4gICAgdmlld3BvcnQuc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCAjMDAwJ1xyXG4gICAgdmlld3BvcnQuc3R5bGUud2lkdGggPSB2aWV3cG9ydFdpZHRoICsgJ3B4J1xyXG4gICAgdmlld3BvcnQuc3R5bGUuaGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQgKyAncHgnXHJcbiAgICB0aGlzLnZpZXdwb3J0ID0gdmlld3BvcnRcclxuICAgIFxyXG4gICAgY29uc3Qgc3ZnQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIHN2Z0NvbnRhaW5lci5pZCA9ICdzdmctY29udGFpbmVyJ1xyXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZGRkJ1xyXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLndpZHRoID0gdmlld3BvcnRXaWR0aCArICdweCdcclxuICAgIHN2Z0NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSB2aWV3cG9ydEhlaWdodCArICdweCdcclxuICAgIHN2Z0NvbnRhaW5lci5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnXHJcbiAgICB0aGlzLnN2Z0NvbnRhaW5lciA9IHN2Z0NvbnRhaW5lclxyXG5cclxuICAgIGNvbnN0IHN2Z1Jvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpXHJcbiAgICBzdmdSb290LmlkID0gJ3N2Zy1yb290J1xyXG4gICAgc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgMTAwMClcclxuICAgIHN2Z1Jvb3Quc2V0QXR0cmlidXRlKCdoZWlnaHQnLCA2MDApXHJcbiAgICBzdmdSb290LnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgMTAwMCA2MDAnKVxyXG4gICAgdGhpcy5zdmdSb290ID0gc3ZnUm9vdFxyXG5cclxuICAgIGNvbnN0IHN2Z1N0YWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKVxyXG4gICAgc3ZnU3RhZ2UuaWQgPSAnc3ZnLXN0YWdlJ1xyXG4gICAgc3ZnU3RhZ2Uuc2V0QXR0cmlidXRlKCd3aWR0aCcsIDQwMClcclxuICAgIHN2Z1N0YWdlLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgMzAwKVxyXG4gICAgc3ZnU3RhZ2Uuc2V0QXR0cmlidXRlKCd4JywgMzAwKVxyXG4gICAgc3ZnU3RhZ2Uuc2V0QXR0cmlidXRlKCd5JywgMTUwKVxyXG4gICAgc3ZnU3RhZ2Uuc3R5bGUub3ZlcmZsb3cgPSAndmlzaWJsZSdcclxuICAgIHRoaXMuc3ZnU3RhZ2UgPSBzdmdTdGFnZVxyXG5cclxuICAgIGNvbnN0IHN2Z0JnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJylcclxuICAgIHN2Z0JnLmlkID0gJ2JhY2tncm91bmQnXHJcbiAgICAvLyBzdmdCZy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgNDAwKVxyXG4gICAgLy8gc3ZnQmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAzMDApXHJcbiAgICBzdmdCZy5zZXRBdHRyaWJ1dGUoJ3gnLCAwKVxyXG4gICAgc3ZnQmcuc2V0QXR0cmlidXRlKCd5JywgMClcclxuXHJcbiAgICBjb25zdCBiZ1JlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3JlY3QnKVxyXG4gICAgYmdSZWN0LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMTAwJScpXHJcbiAgICBiZ1JlY3Quc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpXHJcbiAgICBiZ1JlY3Quc2V0QXR0cmlidXRlKCdmaWxsJywgJyNmZmYnKVxyXG5cclxuICAgIGNvbnN0IHN2Z0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2cnKVxyXG4gICAgc3ZnQ29udGVudC5pZCA9ICdjb250ZW50J1xyXG4gICAgLy8gc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgNDAwKVxyXG4gICAgLy8gc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDMwMClcclxuICAgIHN2Z0NvbnRlbnQuc2V0QXR0cmlidXRlKCd4JywgMClcclxuICAgIHN2Z0NvbnRlbnQuc2V0QXR0cmlidXRlKCd5JywgMClcclxuICAgIHRoaXMuc3ZnQ29udGVudCA9IHN2Z0NvbnRlbnRcclxuXHJcbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnZycpXHJcbiAgICBsYXllci5pZCA9ICdsYXllci0xJ1xyXG4gICAgdGhpcy5jdXJyZW50TGF5ZXIgPSBsYXllclxyXG5cclxuICAgIHZpZXdwb3J0LmFwcGVuZENoaWxkKHN2Z0NvbnRhaW5lcilcclxuICAgIHN2Z0NvbnRhaW5lci5hcHBlbmRDaGlsZChzdmdSb290KVxyXG4gICAgc3ZnUm9vdC5hcHBlbmRDaGlsZChzdmdTdGFnZSlcclxuXHJcbiAgICBzdmdTdGFnZS5hcHBlbmRDaGlsZChzdmdCZylcclxuICAgIHN2Z0JnLmFwcGVuZENoaWxkKGJnUmVjdClcclxuICAgIHN2Z1N0YWdlLmFwcGVuZENoaWxkKHN2Z0NvbnRlbnQpXHJcbiAgICBzdmdDb250ZW50LmFwcGVuZENoaWxkKGxheWVyKVxyXG5cclxuXHJcbiAgICB0aGlzLmd1aWRlTGluZSA9IG5ldyBHdWlkZUxpbmUoKVxyXG4gICAgdGhpcy5ndWlkZUxpbmUubW91bnQoc3ZnU3RhZ2UpXHJcblxyXG4gICAgLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWV3cG9ydClcclxuICB9XHJcbiAgbW91bnQoc2VsZWN0b3IpIHtcclxuICAgIGNvbnN0IG1vdW50Tm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXHJcbiAgICBtb3VudE5vZGUuYXBwZW5kQ2hpbGQodGhpcy52aWV3cG9ydClcclxuICB9XHJcbiAgZ2V0Q3VycmVudExheWVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudExheWVyXHJcbiAgfVxyXG5cclxuICBzZXRUb29sTWFuYWdlcih0b29sTWFuYWdlcikge1xyXG4gICAgdGhpcy50b29sTWFuYWdlciA9IHRvb2xNYW5hZ2VyXHJcbiAgfVxyXG4gIC8vIHRvb2wgcmVsYXRpdmVkIG1ldGhvZHNcclxuICBzZXRDdXJyZW50VG9vbChuYW1lKSB7XHJcbiAgICB0aGlzLnRvb2xNYW5hZ2VyLnNldEN1cnJlbnRUb29sKG5hbWUpXHJcbiAgfVxyXG4gIHJlZ2lzdGVyVG9vbCh0b29sKSB7XHJcbiAgICB0aGlzLnRvb2xNYW5hZ2VyLnJlZ2lzdGVyVG9vbCh0b29sKVxyXG4gIH1cclxuICBzZXRTZXR0aW5nKHNldHRpbmcpIHtcclxuICAgIHRoaXMuc2V0dGluZyA9IHNldHRpbmdcclxuICB9XHJcblxyXG4gIC8vIOWRveS7pOebuOWFs1xyXG4gIHNldENvbW1hbmRNYW5hZ2VyKGNvbW1hbmRNYW5hZ2VyKSB7XHJcbiAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyID0gY29tbWFuZE1hbmFnZXJcclxuICAgIGNvbW1hbmRNYW5hZ2VyLnNldEVkaXRvcih0aGlzKVxyXG4gIH1cclxuICBleGVjdXRlQ29tbWFuZChuYW1lLCAuLi5wYXJhbXMpIHtcclxuICAgIGlmIChuYW1lID09ICd1bmRvJykge1xyXG4gICAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyLnVuZG8oKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGlmIChuYW1lID09ICdyZWRvJykge1xyXG4gICAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyLnJlZG8oKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIHRoaXMuY29tbWFuZE1hbmFnZXIuZXhlY3V0ZShuYW1lLCAuLi5wYXJhbXMpXHJcbiAgfVxyXG5cclxuICAvLyB6b29tXHJcbiAgc2V0Wm9vbU1hbmFnZXIoem9vbU1hbmFnZXIpIHtcclxuICAgIHpvb21NYW5hZ2VyLnNldEVkaXRvcih0aGlzKVxyXG4gICAgdGhpcy56b29tTWFuYWdlciA9IHpvb21NYW5hZ2VyXHJcbiAgfVxyXG4gIGdldFpvb20oKSB7IC8vIOWwgeijhVxyXG4gICAgcmV0dXJuIHRoaXMuem9vbU1hbmFnZXIuZ2V0Wm9vbSgpXHJcbiAgfVxyXG5cclxuICBnZXRTY3JvbGwoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxMZWZ0LFxyXG4gICAgICB5OiB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxUb3AsXHJcbiAgICB9XHJcbiAgfVxyXG4gIHNldFNjcm9sbCh4LCB5KSB7XHJcbiAgICB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxMZWZ0ID0geFxyXG4gICAgdGhpcy5zdmdDb250YWluZXIuc2Nyb2xsVG9wID0geVxyXG4gIH1cclxuICBnZXRDb250ZW50T2Zmc2V0KCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogdGhpcy5zdmdTdGFnZS5nZXRBdHRyaWJ1dGUoJ3gnKSxcclxuICAgICAgeTogdGhpcy5zdmdTdGFnZS5nZXRBdHRyaWJ1dGUoJ3knKSxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzQ29udGVudEVsZW1lbnQoZWwpIHtcclxuICAgIHdoaWxlIChlbCkge1xyXG4gICAgICBpZiAoZWwucGFyZW50RWxlbWVudCA9PSB0aGlzLnN2Z0NvbnRlbnQpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChlbC5wYXJlbnRFbGVtZW50ID09IHRoaXMuc3ZnUm9vdCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFZGl0b3JcclxuIiwiXHJcbi8qKlxyXG4gKiBjb250ZXh0IGNsYXNzXHJcbiAqIFxyXG4gKiB1c2VkIGZvciB0b29sIGV2ZW50XHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEVkaXRvckV2ZW50Q29udGV4dCB7XHJcbiAgY29uc3RydWN0b3IoZWRpdG9yLCBlKSB7XHJcbiAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IGZhbHNlXHJcbiAgICB0aGlzLm9yaWdpbkV2ZW50ID0gZVxyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICAgIHRoaXMuaXNFbmRJbnNpZGUgPSBmYWxzZVxyXG5cclxuICAgIHRoaXMuc3RhcnRYID0gMFxyXG4gICAgdGhpcy5zdGFydFkgPSAwXHJcblxyXG4gICAgdGhpcy5vZmZzZXRYID0gMFxyXG4gICAgdGhpcy5vZmZzZXRZID0gMFxyXG5cclxuICAgIHRoaXMuc3RhcnRDbGllbnRYID0gMCAvLyB1c2VkIHRvIGNhbGMgZHggYW5kIGR5LlxyXG4gICAgdGhpcy5zdGFydENsaWVudFkgPSAwXHJcbiAgICB0aGlzLmR4ID0gMFxyXG4gICAgdGhpcy5keSA9IDBcclxuXHJcbiAgICB0aGlzLnNldFN0YXJ0UG9zKClcclxuICB9XHJcbiAgc2V0T3JpZ2luRXZlbnQoZSkge1xyXG4gICAgdGhpcy5vcmlnaW5FdmVudCA9IGVcclxuICB9XHJcbiAgc2V0U3RhcnRQb3MoKSB7XHJcbiAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMuZ2V0UG9zKClcclxuXHJcbiAgICB0aGlzLnN0YXJ0WCA9IHhcclxuICAgIHRoaXMuc3RhcnRZID0geVxyXG5cclxuICAgIHRoaXMuc3RhcnRDbGllbnRYID0gdGhpcy5vcmlnaW5FdmVudC5jbGllbnRYXHJcbiAgICB0aGlzLnN0YXJ0Q2xpZW50WSA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WVxyXG4gIH1cclxuICByZWxlYXNlTW91c2UoKSB7XHJcbiAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IGZhbHNlXHJcbiAgfVxyXG4gIHByZXNzTW91c2UoKSB7XHJcbiAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IHRydWVcclxuICB9XHJcbiAgZ2V0UG9zKCkge1xyXG4gICAgY29uc3Qgem9vbSA9IHRoaXMuZWRpdG9yLmdldFpvb20oKVxyXG4gICAgY29uc3Qge3gsIHl9ID0gdGhpcy5lZGl0b3IuZ2V0Q29udGVudE9mZnNldCgpXHJcbiAgICByZXR1cm4geyBcclxuICAgICAgeDogdGhpcy5vcmlnaW5FdmVudC5vZmZzZXRYIC8gem9vbSAtIHgsIFxyXG4gICAgICB5OiB0aGlzLm9yaWdpbkV2ZW50Lm9mZnNldFkgLyB6b29tIC0geSxcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0U3RhcnRQb3MoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiB0aGlzLnN0YXJ0WCxcclxuICAgICAgeTogdGhpcy5zdGFydFksXHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIHdpdGhvdXQgY2FsYyB3aXRoIHpvb20gdmFsdWVcclxuICBnZXREaWZmUG9zKCkge1xyXG4gICAgY29uc3QgeCA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WCAtIHRoaXMuc3RhcnRDbGllbnRYXHJcbiAgICBjb25zdCB5ID0gdGhpcy5vcmlnaW5FdmVudC5jbGllbnRZIC0gdGhpcy5zdGFydENsaWVudFlcclxuICAgIHJldHVybiB7IHgsIHkgfVxyXG4gIH1cclxuXHJcbn0iLCJcclxuZXhwb3J0IGNsYXNzIEVkaXRvclNldHRpbmcge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zZXR0aW5nID0ge1xyXG4gICAgICBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICBzdHJva2VXaWR0aDogJzJweCcsXHJcblxyXG4gICAgICAvLyBvdXRsaW5lV2lkdGhcclxuICAgICAgLy8gb3V0bGluZUNvbG9yXHJcbiAgICB9XHJcbiAgfVxyXG4gIHNldEZpbGwodmFsKSB7XHJcbiAgICB0aGlzLnNldHRpbmcuZmlsbCA9IHZhbFxyXG4gIH1cclxuICBzZXRTdHJva2UodmFsKSB7XHJcbiAgICB0aGlzLnNldHRpbmcuZmlsbCA9IHZhbFxyXG4gIH1cclxuICBzZXQobmFtZSwgdmFsKSB7XHJcbiAgICB0aGlzLnNldHRpbmdbbmFtZV0gPSB2YWxcclxuICB9XHJcbiAgZ2V0KG5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdbbmFtZV1cclxuICB9XHJcbn0iLCJcclxuLyoqXHJcbiAqIOWvuSBTVkcg5YWD57Sg55qE566A5Y2V5bCB6KOFXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEZFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuZWxfID0gbnVsbFxyXG4gIH1cclxuICBlbCgpIHtcclxuICAgIHJldHVybiB0aGlzLmVsX1xyXG4gIH1cclxuICBzZXRBdHRyKHByb3AsIHZhbCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxfLnNldEF0dHJpYnV0ZShwcm9wLCB2YWwpXHJcbiAgfVxyXG4gIGdldEF0dHIocHJvcCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxfLmdldEF0dHJpYnV0ZShwcm9wKVxyXG4gIH1cclxuICBnZXRCQm94KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxfLmdldEJCb3goKVxyXG4gIH1cclxufSIsImltcG9ydCB7IFJlY3QgfSBmcm9tIFwiLi9yZWN0XCJcclxuXHJcblxyXG4vKipcclxuICogRlNWR1xyXG4gKiBcclxuICogc2ltcGxlIFNWR0VsZW1lbnQgZW5jYXBzdWxhdGlvblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IEZTVkcgPSB7XHJcbiAgUmVjdCxcclxufSIsIlxyXG4vKipcclxuICog5a+5IHJlY3Qg5YWD57Sg55qE566A5Y2V5bCB6KOFXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgTlMgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCJcclxuaW1wb3J0IHsgRkVsZW1lbnQgfSBmcm9tIFwiLi9iYXNlRWxlbWVudFwiXHJcblxyXG5leHBvcnQgY2xhc3MgUmVjdCBleHRlbmRzIEZFbGVtZW50IHtcclxuICAvLyBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIpO1xyXG4gIC8vIGNvbnN0cnVjdG9yKGVsOiBTVkdFbGVtZW50KTtcclxuICBjb25zdHJ1Y3Rvcih4LCB5LCB3LCBoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICBpZiAodHlwZW9mIHggPT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhpcy5lbF8gPSB4XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVsXyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdyZWN0JylcclxuICAgICAgdGhpcy5lbF8uc2V0QXR0cigneCcsIHgpXHJcbiAgICAgIHRoaXMuZWxfLnNldEF0dHIoJ3knLCB5KVxyXG4gICAgICB0aGlzLmVsXy5zZXRBdHRyKCd3aWR0aCcsIHcpXHJcbiAgICAgIHRoaXMuZWxfLnNldEF0dHIoJ2hlaWdodCcsIGgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldFBvcygpIHtcclxuICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cigneCcpKVxyXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyKCd5JykpXHJcbiAgICByZXR1cm4geyB4LCB5IH1cclxuICB9XHJcbiAgZG1vdmUoZHgsIGR5KSB7XHJcbiAgICBjb25zdCBwb3MgPSB0aGlzLmdldFBvcygpXHJcbiAgICB0aGlzLnNldEF0dHIoJ3gnLCBwb3MueCArIGR4KVxyXG4gICAgdGhpcy5zZXRBdHRyKCd5JywgcG9zLnkgKyBkeSlcclxuICB9XHJcbn0iLCJpbXBvcnQgQ29tbWFuZE1hbmFnZXIgZnJvbSAnLi9jb21tYW5kTWFuYWdlci5qcydcclxuaW1wb3J0IEVkaXRvciBmcm9tICcuL2VkaXRvci5qcydcclxuaW1wb3J0IEFkZFJlY3QgZnJvbSAnLi9tb2R1bGVzL2FkZFJlY3QuanMnXHJcbmltcG9ydCB7IERyYWdDYW52YXMgfSBmcm9tICcuL21vZHVsZXMvZHJhZ0NhbnZhcy5qcydcclxuXHJcbmltcG9ydCB7IEFkZFJlY3RDb21tYW5kLCBETW92ZSB9IGZyb20gJy4vY29tbWFuZC5qcydcclxuaW1wb3J0IHsgRWRpdG9yU2V0dGluZyB9IGZyb20gJy4vZWRpdG9yU2V0dGluZy5qcydcclxuaW1wb3J0IHsgWm9vbU1hbmFnZXIgfSBmcm9tICcuL21vZHVsZXMvem9vbS5qcydcclxuaW1wb3J0IHsgU2VsZWN0IH0gZnJvbSAnLi9tb2R1bGVzL3NlbGVjdC5qcydcclxuaW1wb3J0IHsgVG9vbE1hbmFnZXIgfSBmcm9tICcuL3Rvb2xNYW5hZ2VyLmpzJ1xyXG5cclxuZnVuY3Rpb24gYWN0aXZlQnRuKG5hbWUpIHtcclxuICBuYW1lID0ge1xyXG4gICAgJ3NlbGVjdCc6ICdidG4tc2VsZWN0JyxcclxuICAgICdhZGRSZWN0JzogJ2J0bi1hZGQtcmVjdCcsXHJcbiAgICAnZHJhZ0NhbnZhcyc6ICdidG4tZHJhZy1jYW52YXMnLFxyXG4gIH1bbmFtZV1cclxuICBpZiAobmFtZSA9PSB1bmRlZmluZWQpIHJldHVyblxyXG5cclxuICBjb25zdCB0b29sQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rvb2wtYmFyJylcclxuICAvLyB0b29sQnRucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRvb2xCdG5zKVxyXG4gIFxyXG4gIGNvbnN0IHRvb2xCdG5zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodG9vbEJhci5jaGlsZHJlbilcclxuICBjb25zb2xlLmxvZyh0b29sQnRucylcclxuICB0b29sQnRucy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgY29uc29sZS5sb2coaXRlbSlcclxuICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICB9KVxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5hbWUpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbn1cclxuXHJcblxyXG5jb25zdCBlZGl0b3IgPSBuZXcgRWRpdG9yKClcclxuXHJcbi8vIHJlZ2lzdGVyIGNvbW1hbmRzXHJcbmNvbnN0IGNvbW1hbmRNYW5hZ2VyID0gbmV3IENvbW1hbmRNYW5hZ2VyKClcclxuY29tbWFuZE1hbmFnZXIucmVzaWd0ZXJDb21tYW5kQ2xhc3MoQWRkUmVjdENvbW1hbmQpXHJcbmNvbW1hbmRNYW5hZ2VyLnJlc2lndGVyQ29tbWFuZENsYXNzKERNb3ZlKVxyXG4vLyBzZXR0aW5nXHJcbmVkaXRvci5zZXRTZXR0aW5nKG5ldyBFZGl0b3JTZXR0aW5nKCkpXHJcblxyXG5lZGl0b3Iuc2V0Q29tbWFuZE1hbmFnZXIoY29tbWFuZE1hbmFnZXIpXHJcbi8vIHJlZ2lzdGVyIHRvb2xzXHJcblxyXG5jb25zdCB0b29sTWFuYWdlciA9IG5ldyBUb29sTWFuYWdlcihlZGl0b3IpXHJcbmVkaXRvci5zZXRUb29sTWFuYWdlcih0b29sTWFuYWdlcilcclxudG9vbE1hbmFnZXIucmVnaXN0ZXJUb29sKG5ldyBBZGRSZWN0KCkpXHJcbnRvb2xNYW5hZ2VyLnJlZ2lzdGVyVG9vbChuZXcgRHJhZ0NhbnZhcygpKVxyXG50b29sTWFuYWdlci5yZWdpc3RlclRvb2wobmV3IFNlbGVjdCgpKVxyXG4vLyB0b29sTWFuYWdlci5zZXRDdXJyZW50VG9vbCgnYWRkUmVjdCcpXHJcbmVkaXRvci50b29sTWFuYWdlci5vblN3aXRjaFRvb2wobmFtZSA9PiB7XHJcbiAgY29uc29sZS5sb2coJ3N3aXRjaGVkIHRvb2w6JywgbmFtZSlcclxuICBhY3RpdmVCdG4obmFtZSlcclxufSlcclxudG9vbE1hbmFnZXIuc2V0Q3VycmVudFRvb2woJ3NlbGVjdCcpXHJcbnRvb2xNYW5hZ2VyLmJpbmRUb29sRXZlbnQoKVxyXG4vLyB6b29tXHJcbmVkaXRvci5zZXRab29tTWFuYWdlcihuZXcgWm9vbU1hbmFnZXIoKSlcclxuXHJcbmVkaXRvci5tb3VudCgnI2VkaXRvci1hcmVhJylcclxuXHJcblxyXG4vKiogXHJcbiAqIGJpbmQgZXZlbnQgaW4gYnV0dG9uXHJcbiAqLyBcclxuLy8gdW5kb1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXVuZG8nKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gIGVkaXRvci5leGVjdXRlQ29tbWFuZCgndW5kbycpXHJcbn1cclxuLy8gcmVkb1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXJlZG8nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdyZWRvJylcclxufVxyXG4vLyB6b29tSW5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi16b29tLWluJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGVkaXRvci56b29tTWFuYWdlci56b29tSW4oKVxyXG59XHJcbi8vIHpvb21PdXRcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi16b29tLW91dCcpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBlZGl0b3Iuem9vbU1hbmFnZXIuem9vbU91dCgpXHJcbn1cclxuLy8gc2VsZWN0IGFkZFJlY3QgdG9vbFxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLWFkZC1yZWN0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGVkaXRvci5zZXRDdXJyZW50VG9vbCgnYWRkUmVjdCcpXHJcbn1cclxuLy8gc2VsZWN0IGRyYWdjYW52YXMgdG9vbFxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLWRyYWctY2FudmFzJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGVkaXRvci5zZXRDdXJyZW50VG9vbCgnZHJhZ0NhbnZhcycpXHJcbn1cclxuLy8gc2VsZWN0IHRvb2xcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1zZWxlY3QnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgZWRpdG9yLnNldEN1cnJlbnRUb29sKCdzZWxlY3QnKVxyXG59XHJcblxyXG4vKipcclxuICog55CG5oOzIGFwaSDkvb/nlKjkvovlrZBcclxuICogXHJcbiAqIGNvbnN0IGVkaXRvckJ1aWxkZXIgPSBuZXcgRWRpdG9yLmJ1aWxkZXIoKVxyXG4gKiBlZGl0b3JCdWlsZGVyXHJcbiAqICAgLnNldENhbnZhc1NpemUoNDAwLCAzMDApXHJcbiAqICAgLnNldFN0YWdlU2l6ZSgxMDAwLCA4MDApXHJcbiAqICAgLnNldFZpZXdwb3J0U2l6ZSg4MDAsIDUwMClcclxuICogICAuc2V0Wm9vbSgxMDApXHJcbiAqIFxyXG4gKiBjb25zdCBlZGl0b3IgPSBlZGl0b3JCdWlsZGVyLmJ1aWxkKClcclxuICogZWRpdG9yLnJlZ2lzdGVyVG9vbCh0b29sTW92ZSlcclxuICogXHJcbiAqLyIsIi8qKlxyXG4gKiBndWlkZSBsaW5lIGxheWVyXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgUmVjdEd1aWRlIH0gZnJvbSBcIi4vcmVjdEd1aWRlXCI7XHJcbmNvbnN0IHsgTlMgfSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgR3VpZGVMaW5le1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAnZycpXHJcbiAgICB0aGlzLmNvbnRhaW5lci5pZCA9ICdndWlkZS1sYXlvdXQnXHJcbiAgICB0aGlzLnJlY3RHdWlkZSA9IG5ldyBSZWN0R3VpZGUodGhpcy5jb250YWluZXIpXHJcbiAgfVxyXG4gIG1vdW50KGVsKSB7XHJcbiAgICBlbC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcilcclxuICB9XHJcbn1cclxuXHJcbiIsIlxyXG5jb25zdCB7IE5TIH0gPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzXCIpO1xyXG5cclxuLyoqXHJcbiAqIDxyZWN0PiBvdXRsaW5lXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVjdEd1aWRlIHtcclxuICBjb25zdHJ1Y3RvcihwYXJlbnQpIHtcclxuICAgIHRoaXMueCA9IDBcclxuICAgIHRoaXMueSA9IDBcclxuICAgIHRoaXMudyA9IDBcclxuICAgIHRoaXMuaCA9IDBcclxuXHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdnJylcclxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gJ3JlY3QtZ3VpZGUnXHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpXHJcblxyXG4gICAgdGhpcy5vdXRsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ3BhdGgnKVxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJylcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICcjZjA0JylcclxuXHJcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLm91dGxpbmUpXHJcbiAgfVxyXG4gIGNsZWFyKCkge1xyXG4gICAgLy8gcGFyZW50LmlubmVySFRNTCA9ICcnXHJcbiAgICB0aGlzLm91dGxpbmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gIH1cclxuICByZW5kZXJSZWN0KHgsIHksIHcsIGgpIHtcclxuICAgIHRoaXMueCA9IHhcclxuICAgIHRoaXMueSA9IHlcclxuICAgIHRoaXMudyA9IHdcclxuICAgIHRoaXMuaCA9IGhcclxuXHJcbiAgICAvLyB3aHkgZG9uJ3QgSSB1c2UgcmVjdCwganVzdCBzb2x2ZSB0aGUgY29uZGl0aW9uIHdoZW4gd2lkdGggb3IgaGVpZ2h0IGlzIDAgdGhlIG91dGxpbmUgaXMgZGlzYXBwZXJcclxuICAgIGNvbnN0IGQgPSBgTSAke3h9ICR7eX0gTCAke3grd30gJHt5fSBMICR7eCt3fSAke3kraH0gTCAke3h9ICR7eStofSBaYFxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZCcsIGQpXHJcblxyXG4gICAgLyogdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgneCcsIHgpXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd5JywgeSlcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdylcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGgpICovXHJcbiAgICB0aGlzLm91dGxpbmUuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgfVxyXG4gIGdldFdpZHRoKCkgeyByZXR1cm4gdGhpcy53IH1cclxuICBnZXRIZWlnaHQoKSB7IHJldHVybiB0aGlzLmggfVxyXG4gIGdldFgoKSB7IHJldHVybiB0aGlzLnggfVxyXG4gIGdldFkoKSB7IHJldHVybiB0aGlzLnkgfVxyXG59IiwiXHJcbmltcG9ydCB7IGdldEJveEJ5MnBvaW50cyB9IGZyb20gXCIuLi91dGlsL21hdGhcIlxyXG5cclxuY2xhc3MgQWRkUmVjdCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcclxuICB9XHJcbiAgbmFtZSgpIHtcclxuICAgIHJldHVybiAnYWRkUmVjdCdcclxuICB9XHJcbiAgc2V0RWRpdG9yKGVkaXRvcikgeyAvLyDkvp3otZbms6jlhaVcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgfVxyXG4gIHN0YXJ0KGN0eCkge31cclxuICBtb3ZlKGN0eCkge1xyXG4gICAgY29uc3QgeyB4OiBlbmRYLCB5OiBlbmRZIH0gPSBjdHguZ2V0UG9zKClcclxuICAgIGNvbnN0IHsgeDogc3RhcnRYLCB5OiBzdGFydFkgfSA9IGN0eC5nZXRTdGFydFBvcygpXHJcbiAgICBjb25zdCB7IHgsIHksIHcsIGggfSA9IGdldEJveEJ5MnBvaW50cyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSlcclxuICAgIHRoaXMuZWRpdG9yLmd1aWRlTGluZS5yZWN0R3VpZGUucmVuZGVyUmVjdCh4LCB5LCB3LCBoKVxyXG4gIH1cclxuICBlbmQoY3R4KSB7XHJcbiAgICB0aGlzLmVkaXRvci5ndWlkZUxpbmUucmVjdEd1aWRlLmNsZWFyKClcclxuXHJcbiAgICBjb25zdCB7IHg6IGVuZFgsIHk6IGVuZFkgfSA9IGN0eC5nZXRQb3MoKVxyXG4gICAgY29uc3QgeyB4OiBzdGFydFgsIHk6IHN0YXJ0WSB9ID0gY3R4LmdldFN0YXJ0UG9zKClcclxuICAgIGNvbnN0IHsgeCwgeSwgdywgaCB9ID0gZ2V0Qm94QnkycG9pbnRzKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZKVxyXG4gICAgaWYgKHcgPCAyICYmIGggPCAyKSB7XHJcbiAgICAgIC8vIFRPRE86IG9wZW4gYSBkaWFsb2cgdG8gaW5wdXQgd2lkdGggYW5kIGhlaWdodFxyXG4gICAgICBjb25zb2xlLmxvZygnd2lkdGggYW5kIGhlaWdodCBib3RoIGxlc3MgZXF1YWwgdG8gMu+8jGRyYXdpbmcgbm90aGluZycpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgdGhpcy5lZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ2FkZFJlY3QnLCB4LCB5LCB3LCBoKVxyXG4gIH1cclxuICAvLyBtb3VzZWRvd24gb3V0c2lkZSB2aWV3cG9ydFxyXG4gIGVuZE91dHNpZGUoKSB7XHJcbiAgICB0aGlzLmVkaXRvci5ndWlkZUxpbmUucmVjdEd1aWRlLmNsZWFyKClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFkZFJlY3QiLCJcclxuZXhwb3J0IGNsYXNzIERyYWdDYW52YXMge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zdGFydE9mZnNldFggPSAwXHJcbiAgICB0aGlzLnN0YXJ0T2Zmc2V0WSA9IDBcclxuICB9XHJcbiAgbmFtZSgpIHtcclxuICAgIHJldHVybiAnZHJhZ0NhbnZhcydcclxuICB9XHJcbiAgc2V0RWRpdG9yKGVkaXRvcikgeyAvLyDkvp3otZbms6jlhaVcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgfVxyXG4gIGJlZm9yZUFjdGl2ZSgpIHtcclxuICAgIC8vIGRvIHNvbWV0aGluZyBiZWZvcmUgc3dpdGNoIHRvIGN1cnJlbnQgdG9vbFxyXG4gIH1cclxuICBzdGFydChjdHgpIHtcclxuICAgIGNvbnN0IHNjcm9sbCA9IHRoaXMuZWRpdG9yLmdldFNjcm9sbCgpXHJcbiAgICB0aGlzLnN0YXJ0T2Zmc2V0WCA9IHNjcm9sbC54XHJcbiAgICB0aGlzLnN0YXJ0T2Zmc2V0WSA9IHNjcm9sbC55XHJcbiAgfVxyXG4gIG1vdmUoY3R4KSB7XHJcbiAgICBjb25zdCB6b29tID0gdGhpcy5lZGl0b3IuZ2V0Wm9vbSgpXHJcbiAgICBjb25zdCB7IHg6IGR4LCB5OiBkeSB9ID0gY3R4LmdldERpZmZQb3MoKVxyXG4gICAgdGhpcy5lZGl0b3Iuc2V0U2Nyb2xsKHRoaXMuc3RhcnRPZmZzZXRYIC0gZHgsIHRoaXMuc3RhcnRPZmZzZXRZIC0gZHkpXHJcbiAgfVxyXG4gIGVuZCgpIHt9XHJcbiAgZW5kT3V0c2lkZSgpIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgRlNWRyB9IGZyb20gXCIuLi9lbGVtZW50XCJcclxuaW1wb3J0IHsgZ2V0Qm94QnkycG9pbnRzIH0gZnJvbSBcIi4uL3V0aWwvbWF0aFwiXHJcblxyXG4vKipcclxuICogc2VsZWN0XHJcbiAqIFxyXG4gKiDmraTmqKHlnZfpnZ7luLjlpI3mnYJcclxuICogXHJcbiAqIDEuIOm8oOagh+aMieS4i+aXtu+8jOmAieS4reWNleS4quWFg+e0oFxyXG4gKiAyLiDpvKDmoIfmjInkuIvkuLrnqbrvvIzmi5bmi73ml7bkuqfnlJ/pgInkuK3moYbvvIzlj6/ku6XpgInmi6nlpJrkuKrlhYPntKBcclxuICogMy4g6YCJ5Lit5Y2V5Liq77yI5oiW6YCJ5Yy66YCJ5Lit5aSa5Liq77yJIOe8qeaUviDnrYnmjqfliLbngrnvvIzmi5bmi73mlLnlj5jlrr3pq5hcclxuICogMy4g5YiH5pat5YiA6L+Z5Liq5bel5YW35pe277yM5r+A5rS755qE5YWD57Sg6L+b5YWl6KKr6YCJ5Lit54q25oCB77yI6L2u5buT57q/K+aOp+WItueCue+8ieOAglxyXG4gKiA0LiDpgInljLrlkozlhYPntKDnm7jkuqTnmoTliKTlrppcclxuICogNS4g5r+A5rS75YWD57Sg5aaC5L2V5L+d5a2Y77yM5L+d5a2Y5Yiw5ZOq6YeMXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VsZWN0IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuZWRpdG9yID0gbnVsbFxyXG4gICAgdGhpcy5zZWxlY3RlZEVscyA9IFtdXHJcblxyXG4gICAgdGhpcy5vdXRsaW5lU3RhcnRYID0gMFxyXG4gICAgdGhpcy5vdXRsaW5lU3RhcnRZID0gMFxyXG4gIH1cclxuICBuYW1lKCkge1xyXG4gICAgcmV0dXJuICdzZWxlY3QnXHJcbiAgfVxyXG4gIHNldEVkaXRvcihlZGl0b3IpIHtcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgfVxyXG4gIGhhc1NlbGVjdGVkRWxzV2hlblN0YXJ0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRFbHMubGVuZ3RoID4gMFxyXG4gIH1cclxuICBzdGFydChjdHgpIHtcclxuICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBjdHgub3JpZ2luRXZlbnQudGFyZ2V0XHJcbiAgICBpZiAoIXRoaXMuZWRpdG9yLmlzQ29udGVudEVsZW1lbnQodGFyZ2V0RWxlbWVudCkpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0RkVsZW1lbnQgPSBuZXcgRlNWRy5SZWN0KHRhcmdldEVsZW1lbnQpIC8vIOaaguaXtuWPquaYryByZWN0IFRPRE86IOaUueS4uumAmueUqOWGmeazlVxyXG4gICAgdGhpcy5zZWxlY3RlZEVscyA9IFsgdGFyZ2V0RkVsZW1lbnQgXSAvLyDpvKDmoIfmjInkuIvml7bvvIzlsLHpgInkuK3kuobkuIDkuKrlhYPntKBcclxuICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KHRhcmdldEZFbGVtZW50LmdldEF0dHIoJ3gnKSlcclxuICAgIGNvbnN0IHkgPSBwYXJzZUZsb2F0KHRhcmdldEZFbGVtZW50LmdldEF0dHIoJ3knKSlcclxuICAgIGNvbnN0IHcgPSBwYXJzZUZsb2F0KHRhcmdldEZFbGVtZW50LmdldEF0dHIoJ3dpZHRoJykpXHJcbiAgICBjb25zdCBoID0gcGFyc2VGbG9hdCh0YXJnZXRGRWxlbWVudC5nZXRBdHRyKCdoZWlnaHQnKSlcclxuXHJcbiAgICB0aGlzLm91dGxpbmVTdGFydFggPSB4XHJcbiAgICB0aGlzLm91dGxpbmVTdGFydFkgPSB5XHJcblxyXG4gICAgdGhpcy5lZGl0b3IuZ3VpZGVMaW5lLnJlY3RHdWlkZS5yZW5kZXJSZWN0KHgsIHksIHcsIGgpXHJcbiAgfVxyXG4gIG1vdmUoY3R4KSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzU2VsZWN0ZWRFbHNXaGVuU3RhcnQoKSkgeyAvLyBkcmF3IHNlbGVjdGluZyBhcmVhXHJcbiAgICAgIC8vIHNlbGVjdCBubyBlbGVtZW50LCBkcmF3IHNlbGVjdCByZWN0XHJcbiAgICAgIGNvbnN0IHsgeDogZW5kWCwgeTogZW5kWSB9ID0gY3R4LmdldFBvcygpXHJcbiAgICAgIGNvbnN0IHsgeDogc3RhcnRYLCB5OiBzdGFydFkgfSA9IGN0eC5nZXRTdGFydFBvcygpXHJcbiAgICAgIGNvbnN0IHsgeCwgeSwgdywgaCB9ID0gZ2V0Qm94QnkycG9pbnRzKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZKVxyXG4gICAgICB0aGlzLmVkaXRvci5ndWlkZUxpbmUucmVjdEd1aWRlLnJlbmRlclJlY3QoeCwgeSwgdywgaClcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyB4OiBkeCwgeTogZHkgfSA9IGN0eC5nZXREaWZmUG9zKClcclxuICAgIGNvbnN0IHJlY3RHdWlkZSA9IHRoaXMuZWRpdG9yLmd1aWRlTGluZS5yZWN0R3VpZGVcclxuICAgIGNvbnN0IHcgPSByZWN0R3VpZGUuZ2V0V2lkdGgoKVxyXG4gICAgY29uc3QgaCA9IHJlY3RHdWlkZS5nZXRIZWlnaHQoKVxyXG4gICAgcmVjdEd1aWRlLnJlbmRlclJlY3QodGhpcy5vdXRsaW5lU3RhcnRYICsgZHgsIHRoaXMub3V0bGluZVN0YXJ0WSArIGR5LCB3LCBoKVxyXG4gIH1cclxuICBlbmQoY3R4KSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzU2VsZWN0ZWRFbHNXaGVuU3RhcnQoKSkgeyAvLyBmaW5pc2hlZCBkcmF3biBzZWxlY3RpbmcgYXJlYVxyXG4gICAgICB0aGlzLmVkaXRvci5ndWlkZUxpbmUucmVjdEd1aWRlLmNsZWFyKClcclxuICAgICAgLy8gVE9ETzogYWN0aXZlIGZyYW1lIGJ5IHNlbGVjdCByZWN0LlxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IHJlY3RHdWlkZSA9IHRoaXMuZWRpdG9yLmd1aWRlTGluZS5yZWN0R3VpZGVcclxuICAgIHJlY3RHdWlkZS5jbGVhcigpXHJcblxyXG4gICAgXHJcbiAgICBjb25zdCB7IHg6IGR4LCB5OiBkeSB9ID0gY3R4LmdldERpZmZQb3MoKVxyXG4gICAgdGhpcy5lZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ2Rtb3ZlJywgdGhpcy5zZWxlY3RlZEVscywgZHgsIGR5KVxyXG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsTWFuYWdlci5zZXRFbHModGhpcy5zZWxlY3RlZEVscykgLy8gc2V0IGdsb2JhbCBhY3RpdmVkIGVsZW1lbnRzXHJcbiAgICB0aGlzLnNlbGVjdGVkRWxzID0gW11cclxuICB9XHJcbiAgLy8gbW91c2Vkb3duIG91dHNpZGUgdmlld3BvcnRcclxuICBlbmRPdXRzaWRlKCkge1xyXG4gICAgdGhpcy5lZGl0b3IuZ3VpZGVMaW5lLnJlY3RHdWlkZS5jbGVhcigpXHJcbiAgICB0aGlzLnNlbGVjdGVkRWxzID0gW11cclxuICB9XHJcbn1cclxuIiwiLyoqIHpvb20gKi9cclxuXHJcbmNvbnN0IHsgZ2V0Vmlld0JveCB9ID0gcmVxdWlyZShcIi4uL3V0aWwvc3ZnXCIpXHJcblxyXG5leHBvcnQgY2xhc3MgWm9vbU1hbmFnZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBudWxsXHJcbiAgfVxyXG4gIHNldEVkaXRvcihlZGl0b3IpIHtcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgfVxyXG4gIGdldFpvb20oKSB7XHJcbiAgICBjb25zdCBhY3R1bFdpZHRoID0gcGFyc2VGbG9hdCh0aGlzLmVkaXRvci5zdmdSb290LmdldEF0dHJpYnV0ZSgnd2lkdGgnKSlcclxuICAgIGNvbnN0IHZpZXdCb3ggPSBnZXRWaWV3Qm94KHRoaXMuZWRpdG9yLnN2Z1Jvb3QpXHJcbiAgICBjb25zdCB6b29tID0gYWN0dWxXaWR0aCAvIHZpZXdCb3gud1xyXG4gICAgcmV0dXJuIHpvb21cclxuICB9XHJcbiAgc2V0Wm9vbSh6b29tKSB7XHJcbiAgICBjb25zb2xlLmxvZyh6b29tKVxyXG4gICAgY29uc3Qgdmlld0JveCA9IGdldFZpZXdCb3godGhpcy5lZGl0b3Iuc3ZnUm9vdClcclxuICAgIGNvbnN0IHdpZHRoID0gdmlld0JveC53ICogem9vbVxyXG4gICAgY29uc3QgaGVpZ2h0ID0gdmlld0JveC5oICogem9vbVxyXG4gICAgdGhpcy5lZGl0b3Iuc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2lkdGgpXHJcbiAgICB0aGlzLmVkaXRvci5zdmdSb290LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaGVpZ2h0KVxyXG4gIH1cclxuICB6b29tSW4oKSB7XHJcbiAgICBjb25zdCBjdXJyZW50Wm9vbSA9IHRoaXMuZ2V0Wm9vbSgpXHJcbiAgICB0aGlzLnNldFpvb20oY3VycmVudFpvb20gKyAwLjEpXHJcbiAgfVxyXG4gIHpvb21PdXQoKSB7XHJcbiAgICBjb25zdCBjdXJyZW50Wm9vbSA9IHRoaXMuZ2V0Wm9vbSgpXHJcbiAgICB0aGlzLnNldFpvb20oY3VycmVudFpvb20gLSAwLjEpXHJcbiAgfVxyXG59IiwiY29uc3QgeyBFZGl0b3JFdmVudENvbnRleHQgfSA9IHJlcXVpcmUoXCIuL2VkaXRvckV2ZW50Q29udGV4dFwiKVxyXG5cclxuZXhwb3J0IGNsYXNzIFRvb2xNYW5hZ2VyIHtcclxuICBjb25zdHJ1Y3RvcihlZGl0b3IpIHtcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgICB0aGlzLnRvb2xzID0ge31cclxuICAgIHRoaXMuY3VycmVudFRvb2wgPSBudWxsXHJcbiAgICB0aGlzLmludm9rZVdoZW5Td2l0Y2ggPSAoKSA9PiB7fVxyXG5cclxuICAgIHRoaXMuY3R4ID0gbnVsbCAvLyB0b29sIGNvbnRleHRcclxuICB9XHJcbiAgc2V0Q3VycmVudFRvb2wobmFtZSkge1xyXG4gICAgdGhpcy5jdXJyZW50VG9vbCA9IHRoaXMudG9vbHNbbmFtZV1cclxuICAgIHRoaXMuaW52b2tlV2hlblN3aXRjaCh0aGlzLmdldEN1cnJlbnRUb29sTmFtZSgpKVxyXG4gIH1cclxuICBvblN3aXRjaFRvb2woZm4pIHtcclxuICAgIHRoaXMuaW52b2tlV2hlblN3aXRjaCA9IGZuXHJcbiAgfVxyXG4gIGdldEN1cnJlbnRUb29sTmFtZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRUb29sLm5hbWUoKVxyXG4gIH1cclxuICByZWdpc3RlclRvb2wodG9vbCkge1xyXG4gICAgdGhpcy50b29sc1t0b29sLm5hbWUoKV0gPSB0b29sXHJcbiAgICB0b29sLnNldEVkaXRvcih0aGlzLmVkaXRvcikgLy8gZGVwZW5kZW5jeSBpbmplY3Rpb25cclxuICB9XHJcblxyXG4gIGJpbmRUb29sRXZlbnQoKSB7XHJcbiAgICBjb25zdCBzdmdSb290ID0gdGhpcy5lZGl0b3Iuc3ZnUm9vdFxyXG5cclxuICAgIHN2Z1Jvb3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZSA9PiB7XHJcbiAgICAgIGNvbnN0IGN0eCA9IG5ldyBFZGl0b3JFdmVudENvbnRleHQodGhpcy5lZGl0b3IsIGUpXHJcbiAgICAgIHRoaXMuY3R4ID0gY3R4XHJcbiAgICAgIHRoaXMuY3VycmVudFRvb2wuc3RhcnQoY3R4KVxyXG4gICAgfSwgZmFsc2UpXHJcblxyXG4gICAgc3ZnUm9vdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcclxuICAgICAgY29uc3QgY3R4ID0gdGhpcy5jdHhcclxuXHJcbiAgICAgIGlmICghY3R4KSByZXR1cm4gLy8gaWYgY3R4IGV4aXRzLCBwcmVzZW50IG1vdXNlZG93biBldmVudCBlbWl0IGp1c3QgYmVmb3JlXHJcbiAgICAgIGN0eC5zZXRPcmlnaW5FdmVudChlKVxyXG4gICAgICBjdHgucHJlc3NNb3VzZSgpXHJcbiAgICAgIHRoaXMuY3VycmVudFRvb2wubW92ZShjdHgpIC8vIG1vdmVcclxuICAgIH0sIGZhbHNlKVxyXG4gICAgXHJcbiAgICBzdmdSb290LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlID0+IHtcclxuICAgICAgLy8gdGhpcy5jdHgucmVsZWFzZU1vdXNlKClcclxuICAgICAgY29uc3QgY3R4ID0gdGhpcy5jdHhcclxuICAgICAgLy8gY3R4LnNldE9yaWdpbkV2ZW50KGUpIC8vIHRoZSBvZmZzZXRYIGFuZCBvZmZzZXRZIGluIG1vdXNldXAgYW5kIHRoZSBsYXN0IG1vdXNlbW92ZSBpcyBub3QgZXF1YWwgPz8gXHJcbiAgICAgIHRoaXMuY3VycmVudFRvb2wuZW5kKGN0eClcclxuICAgICAgY3R4LmlzRW5kSW5zaWRlID0gdHJ1ZVxyXG4gICAgfSwgZmFsc2UpXHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlID0+IHtcclxuICAgICAgaWYgKHRoaXMuY3R4ICYmIHRoaXMuY3R4LmlzRW5kSW5zaWRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VG9vbC5lbmRPdXRzaWRlKHRoaXMuY3R4KVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY3R4ID0gbnVsbFxyXG4gICAgfSwgZmFsc2UpXHJcbiAgfVxyXG59IiwiXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRCb3hCeTJwb2ludHMoeDEsIHkxLCB4MiwgeTIpIHtcclxuICBsZXQgeCwgeSwgdywgaFxyXG4gIHcgPSBNYXRoLmFicyh4MiAtIHgxKVxyXG4gIGggPSBNYXRoLmFicyh5MiAtIHkxKVxyXG4gIHggPSBNYXRoLm1pbih4MiwgeDEpXHJcbiAgeSA9IE1hdGgubWluKHkyLCB5MSlcclxuICByZXR1cm4geyB4LCB5LCB3LCBoIH1cclxufSIsIlxyXG4vLyBUT0RPOiB0byBmaW5pc2hcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFZpZXdCb3goZWwpIHtcclxuICBjb25zdCB2YWwgPSBlbC5nZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnKVxyXG4gIGlmICghdmFsKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2hhcyBub3Qgdmlld0JveCBhdHRyaWJ1dGUnKVxyXG4gIH1cclxuICBjb25zdCBbeCwgeSwgdywgaF0gPSB2YWwuc3BsaXQoL1tcXHMsXSsvKS5tYXAoaXRlbSA9PiBwYXJzZUZsb2F0KGl0ZW0pKVxyXG4gIHJldHVybiB7IHgsIHksIHcsIGggfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==