/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/* harmony import */ var _editorEventContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editorEventContext */ "./src/editorEventContext.js");
/* harmony import */ var _layer_guideLine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layer/guideLine */ "./src/layer/guideLine.js");
;


class Editor {
  constructor() {
    this.setting = null
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


    this.guideLine = new _layer_guideLine__WEBPACK_IMPORTED_MODULE_1__.GuideLine()
    this.guideLine.mount(svgStage)

    document.body.appendChild(viewport)
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

  bindToolEvent() {
    this.svgRoot.addEventListener('mousedown', e => {
      const ctx = new _editorEventContext__WEBPACK_IMPORTED_MODULE_0__.EditorEventContext(this, e)
      this.ctx = ctx
      this.currentTool.start(ctx)
    }, false)

    this.svgRoot.addEventListener('mousemove', e => {
      const ctx = this.ctx

      if (!ctx) return // if ctx exits, present mousedown event emit just before
      ctx.setOriginEvent(e)
      ctx.pressMouse()
      this.currentTool.move(ctx)
    }, false)
    
    this.svgRoot.addEventListener('mouseup', e => {
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
 * 对 rect 元素的简单封装
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
toolManager.setCurrentTool('select')
toolManager.bindToolEvent()
// zoom
editor.setZoomManager(new _modules_zoom_js__WEBPACK_IMPORTED_MODULE_6__.ZoomManager())


/** 
 * bind event in button
 */ 

// undo
const undoBtn = document.createElement('button')
undoBtn.innerText = 'undo'
undoBtn.onclick = function() {
  editor.executeCommand('undo')
}
document.body.appendChild(undoBtn)
// redo
const redoBtn = document.createElement('button')
redoBtn.innerText = 'redo'
redoBtn.onclick = function() {
  editor.executeCommand('redo')
}
document.body.appendChild(redoBtn)
// zoomIn
const zoomInBtn = document.createElement('button')
zoomInBtn.innerText = 'zoomIn'
zoomInBtn.onclick = function() {
  editor.zoomManager.zoomIn()
}
document.body.appendChild(zoomInBtn)
// zoomOut
const zoomOutBtn = document.createElement('button')
zoomOutBtn.innerText = 'zoomOut'
zoomOutBtn.onclick = function() {
  editor.zoomManager.zoomOut()
}
document.body.appendChild(zoomOutBtn)
// select addRect tool
const drawRectToolBtn = document.createElement('button')
drawRectToolBtn.innerText = 'addRect'
drawRectToolBtn.onclick = function() {
  editor.setCurrentTool('addRect')
}
document.body.appendChild(drawRectToolBtn)
// select dragcanvas tool
const dragCanvasToolBtn = document.createElement('button')
dragCanvasToolBtn.innerText = 'dragCanvas'
dragCanvasToolBtn.onclick = function() {
  editor.setCurrentTool('dragCanvas')
}
document.body.appendChild(dragCanvasToolBtn)
// select tool
const selectToolBtn = document.createElement('button')
selectToolBtn.innerText = 'select'
selectToolBtn.onclick = function() {
  editor.setCurrentTool('select')
}
document.body.appendChild(selectToolBtn)

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
    return this.selectedEls.length == 0
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
    if (this.hasSelectedElsWhenStart()) { // 移动选中的元素
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
    if (this.hasSelectedElsWhenStart()) {
      this.editor.guideLine.rectGuide.clear()
      // TODO: active frame by select rect.

      return
    }
    const rectGuide = this.editor.guideLine.rectGuide
    rectGuide.clear()

    
    const { x: dx, y: dy } = ctx.getDiffPos()
    this.editor.executeCommand('dmove', this.selectedEls, dx, dy)
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
    this.currentTool = 'select'

    this.ctx = null // tool context
  }
  setCurrentTool(name) {
    this.currentTool = this.tools[name]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2NvbW1hbmQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9jb21tYW5kTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2VkaXRvci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2VkaXRvckV2ZW50Q29udGV4dC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2VkaXRvclNldHRpbmcuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lbGVtZW50L2Jhc2VFbGVtZW50LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvZWxlbWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2VsZW1lbnQvcmVjdC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbGF5ZXIvZ3VpZGVMaW5lLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbGF5ZXIvcmVjdEd1aWRlLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy9hZGRSZWN0LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy9kcmFnQ2FudmFzLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9tb2R1bGVzL3pvb20uanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy90b29sTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL3V0aWwvbWF0aC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL3V0aWwvc3ZnLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxDQUFnQzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsOENBQU07QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RGY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBLENBQXlEO0FBQ1o7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSx5QkFBeUIsdURBQVM7QUFDbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7Ozs7OztVQ1RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTlMgfSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5jbGFzcyBCYXNlQ29tbWFuZCB7XG4gIHVuZG8oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwbGVhc2Ugb3ZlcnJpZGUgdW5kbyBtZXRob2QnKVxuICB9XG4gIHJlZG8oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwbGVhc2Ugb3ZlcnJpZGUgcmVkbyBtZXRob2QnKVxuICB9XG59XG5cbi8qKlxuICogYWRkUmVjdFxuICogXG4gKiBhZGQgcmVjdCBzdmcgZWxlbWVudFxuICovXG5leHBvcnQgY2xhc3MgQWRkUmVjdENvbW1hbmQgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgeCwgeSwgdywgaCkge1xuICAgIHN1cGVyKClcbiAgICAvLyBUT0RPOiDkvb/nlKjnvJbovpHlmajkvb/nlKjnmoTpopzoibLnrYnmoLflvI9cbiAgICBjb25zdCByZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ3JlY3QnKVxuICAgIHJlY3Quc2V0QXR0cmlidXRlKCd4JywgeClcbiAgICByZWN0LnNldEF0dHJpYnV0ZSgneScsIHkpXG4gICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdylcbiAgICByZWN0LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaClcblxuICAgIGNvbnN0IGZpbGwgPSBlZGl0b3Iuc2V0dGluZy5nZXQoJ2ZpbGwnKVxuICAgIGNvbnN0IHN0cm9rZSA9IGVkaXRvci5zZXR0aW5nLmdldCgnc3Ryb2tlJylcbiAgICBjb25zdCBzdHJva2VXaWR0aCA9IGVkaXRvci5zZXR0aW5nLmdldCgnc3Ryb2tlV2lkdGgnKVxuICAgIHJlY3Quc2V0QXR0cmlidXRlKCdmaWxsJywgZmlsbClcbiAgICByZWN0LnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgc3Ryb2tlKVxuICAgIHJlY3Quc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCBzdHJva2VXaWR0aClcblxuICAgIGVkaXRvci5nZXRDdXJyZW50TGF5ZXIoKS5hcHBlbmRDaGlsZChyZWN0KVxuXG4gICAgdGhpcy5uZXh0U2libGluZyA9IHJlY3QubmV4dEVsZW1lbnRTaWJsaW5nIFxuICAgIHRoaXMucGFyZW50ID0gcmVjdC5wYXJlbnRFbGVtZW50XG4gICAgdGhpcy5lbGVtZW50ID0gcmVjdFxuICB9XG5cbiAgc3RhdGljIG5hbWUoKSB7XG4gICAgcmV0dXJuICdhZGRSZWN0J1xuICB9XG5cbiAgcmVkbygpIHtcbiAgICBpZiAodGhpcy5uZXh0U2libGluZykge1xuICAgICAgdGhpcy5wYXJlbnQuaW5zZXJ0QmVmb3JlKHRoaXMuZWxlbWVudCwgdGhpcy5uZXh0U2libGluZylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIHVuZG8oKSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZSgpXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERNb3ZlIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBjb25zdHJ1Y3RvcihlZGl0b3IsIGVscywgZHgsIGR5KSB7XG4gICAgc3VwZXIoKVxuXG4gICAgdGhpcy5keCA9IGR4XG4gICAgdGhpcy5keSA9IGR5XG4gICAgdGhpcy5lbHMgPSBlbHNcblxuICAgIHRoaXMuZWxzLmZvckVhY2goZWwgPT4ge1xuICAgICAgZWwuZG1vdmUodGhpcy5keCwgdGhpcy5keSlcbiAgICB9KVxuICAgIFxuICB9XG5cbiAgc3RhdGljIG5hbWUoKSB7XG4gICAgcmV0dXJuICdkbW92ZSdcbiAgfVxuXG4gIHJlZG8oKSB7XG4gICAgdGhpcy5lbHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5kbW92ZSh0aGlzLmR4LCB0aGlzLmR5KVxuICAgIH0pXG4gIH1cblxuICB1bmRvKCkge1xuICAgIHRoaXMuZWxzLmZvckVhY2goZWwgPT4ge1xuICAgICAgZWwuZG1vdmUoLXRoaXMuZHgsIC10aGlzLmR5KVxuICAgIH0pXG4gIH1cbn0iLCJcblxuXG5cbi8qKlxuICogQ29tbWFuZE1hbmFnZXJcbiAqIFxuICog5ZG95Luk566h55CG5LqGXG4gKiBcbiAqIENvbW1hbmRNYW5hZ2VyLnVuZG8oKVxuICogQ29tbWFuZE1hbmFnZXIucmVkbygpXG4gKi9cbmNsYXNzIENvbW1hbmRNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yZWRvU3RhY2sgPSBbXVxuICAgIHRoaXMudW5kb1N0YWNrID0gW11cbiAgICB0aGlzLmNvbW1hbmRDbGFzc2VzID0ge31cbiAgfVxuICBzZXRFZGl0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgfVxuICBleGVjdXRlKG5hbWUsIC4uLmFyZ3MpIHtcbiAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgY29uc3QgQ29tbWFuZENsYXNzID0gdGhpcy5jb21tYW5kQ2xhc3Nlc1tuYW1lXVxuXG4gICAgY29uc3QgY29tbWFuZCA9IG5ldyBDb21tYW5kQ2xhc3ModGhpcy5lZGl0b3IsIC4uLmFyZ3MpIC8vIOWIm+W7uiBjb21tYW5kIOWunuS+i1xuXG4gICAgdGhpcy51bmRvU3RhY2sucHVzaChjb21tYW5kKVxuICAgIHRoaXMucmVkb1N0YWNrID0gW11cbiAgfVxuICB1bmRvKCkge1xuICAgIGlmICh0aGlzLnVuZG9TdGFjay5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKCfliLDlpLTkuobvvIzml6Dms5Xnu6fnu63mkqTlm54nKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IGNvbW1hbmQgPSB0aGlzLnVuZG9TdGFjay5wb3AoKVxuICAgIHRoaXMucmVkb1N0YWNrLnB1c2goY29tbWFuZClcbiAgICBjb21tYW5kLnVuZG8oKVxuICB9XG4gIHJlZG8oKSB7XG4gICAgaWYgKHRoaXMucmVkb1N0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc29sZS5sb2coJ+WIsOWktOS6hu+8jOaXoOazlee7p+e7remHjeWBmicpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgY29tbWFuZCA9IHRoaXMucmVkb1N0YWNrLnBvcCgpXG4gICAgdGhpcy51bmRvU3RhY2sucHVzaChjb21tYW5kKVxuICAgIGNvbW1hbmQucmVkbygpXG4gIH1cblxuICAvLyDms6jlhozlkb3ku6TnsbvliLDlkb3ku6TnrqHnkIblr7nosaHkuK3jgIJcbiAgcmVzaWd0ZXJDb21tYW5kQ2xhc3MoY29tbWFuZENsYXNzKSB7XG4gICAgbmFtZSA9IGNvbW1hbmRDbGFzcy5uYW1lKCkudG9Mb3dlckNhc2UoKVxuICAgIHRoaXMuY29tbWFuZENsYXNzZXNbbmFtZV0gPSBjb21tYW5kQ2xhc3NcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb21tYW5kTWFuYWdlciIsIi8vIOW4uOmHj1xuXG5jb25zdCBOUyA9IHtcbiAgSFRNTDogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLFxuICBNQVRIOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCcsXG4gIFNFOiAnaHR0cDovL3N2Zy1lZGl0Lmdvb2dsZWNvZGUuY29tJyxcbiAgU1ZHOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICBYTElOSzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLFxuICBYTUw6ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnLFxuICBYTUxOUzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvJyAvLyBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvUkVDLXhtbC1uYW1lcy8jeG1sUmVzZXJ2ZWRcbn07XG5cbmV4cG9ydCB7XG4gIE5TLFxufSBcblxuXG5cbiIsImltcG9ydCB7IEVkaXRvckV2ZW50Q29udGV4dCB9IGZyb20gXCIuL2VkaXRvckV2ZW50Q29udGV4dFwiXG5pbXBvcnQgeyBHdWlkZUxpbmUgfSBmcm9tIFwiLi9sYXllci9ndWlkZUxpbmVcIlxuXG5jbGFzcyBFZGl0b3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNldHRpbmcgPSBudWxsXG4gICAgdGhpcy5jb21tYW5kTWFuYWdlciA9IG51bGxcbiAgICB0aGlzLnpvb21NYW5hZ2VyID0gbnVsbFxuXG5cbiAgICAvLyBjb25zdCBjb250ZW50V2lkdGggPSA0MDBcbiAgICAvLyBjb25zdCBjb250ZW50SGVpZ2h0ID0gMzAwXG4gICAgLy8gY29uc3Qgc3RhZ2VXaWR0aCA9IDEwMDAgLy8g5q2j5Zyo57qg57uT5ZG95ZCNXG4gICAgLy8gY29uc3Qgc3RhZ2VIZWlnaHQgPSA2MDBcbiAgICBjb25zdCB2aWV3cG9ydFdpZHRoID0gODAwXG4gICAgY29uc3Qgdmlld3BvcnRIZWlnaHQgPSA1NTBcblxuICAgIGNvbnN0IHZpZXdwb3J0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB2aWV3cG9ydC5pZCA9ICd2aWV3cG9ydCdcbiAgICB2aWV3cG9ydC5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkICMwMDAnXG4gICAgdmlld3BvcnQuc3R5bGUud2lkdGggPSB2aWV3cG9ydFdpZHRoICsgJ3B4J1xuICAgIHZpZXdwb3J0LnN0eWxlLmhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0ICsgJ3B4J1xuICAgIFxuICAgIGNvbnN0IHN2Z0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgc3ZnQ29udGFpbmVyLmlkID0gJ3N2Zy1jb250YWluZXInXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZGRkJ1xuICAgIHN2Z0NvbnRhaW5lci5zdHlsZS53aWR0aCA9IHZpZXdwb3J0V2lkdGggKyAncHgnXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0ICsgJ3B4J1xuICAgIHN2Z0NvbnRhaW5lci5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnXG4gICAgdGhpcy5zdmdDb250YWluZXIgPSBzdmdDb250YWluZXJcblxuICAgIGNvbnN0IHN2Z1Jvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpXG4gICAgc3ZnUm9vdC5pZCA9ICdzdmctcm9vdCdcbiAgICBzdmdSb290LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAxMDAwKVxuICAgIHN2Z1Jvb3Quc2V0QXR0cmlidXRlKCdoZWlnaHQnLCA2MDApXG4gICAgc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDEwMDAgNjAwJylcbiAgICB0aGlzLnN2Z1Jvb3QgPSBzdmdSb290XG5cbiAgICBjb25zdCBzdmdTdGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJylcbiAgICBzdmdTdGFnZS5pZCA9ICdzdmctc3RhZ2UnXG4gICAgc3ZnU3RhZ2Uuc2V0QXR0cmlidXRlKCd3aWR0aCcsIDQwMClcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDMwMClcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ3gnLCAzMDApXG4gICAgc3ZnU3RhZ2Uuc2V0QXR0cmlidXRlKCd5JywgMTUwKVxuICAgIHN2Z1N0YWdlLnN0eWxlLm92ZXJmbG93ID0gJ3Zpc2libGUnXG4gICAgdGhpcy5zdmdTdGFnZSA9IHN2Z1N0YWdlXG5cbiAgICBjb25zdCBzdmdCZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnZycpXG4gICAgc3ZnQmcuaWQgPSAnYmFja2dyb3VuZCdcbiAgICAvLyBzdmdCZy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgNDAwKVxuICAgIC8vIHN2Z0JnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgMzAwKVxuICAgIHN2Z0JnLnNldEF0dHJpYnV0ZSgneCcsIDApXG4gICAgc3ZnQmcuc2V0QXR0cmlidXRlKCd5JywgMClcblxuICAgIGNvbnN0IGJnUmVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAncmVjdCcpXG4gICAgYmdSZWN0LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMTAwJScpXG4gICAgYmdSZWN0LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzEwMCUnKVxuICAgIGJnUmVjdC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnI2ZmZicpXG5cbiAgICBjb25zdCBzdmdDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJylcbiAgICBzdmdDb250ZW50LmlkID0gJ2NvbnRlbnQnXG4gICAgLy8gc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgNDAwKVxuICAgIC8vIHN2Z0NvbnRlbnQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAzMDApXG4gICAgc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3gnLCAwKVxuICAgIHN2Z0NvbnRlbnQuc2V0QXR0cmlidXRlKCd5JywgMClcbiAgICB0aGlzLnN2Z0NvbnRlbnQgPSBzdmdDb250ZW50XG5cbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnZycpXG4gICAgbGF5ZXIuaWQgPSAnbGF5ZXItMSdcbiAgICB0aGlzLmN1cnJlbnRMYXllciA9IGxheWVyXG5cbiAgICB2aWV3cG9ydC5hcHBlbmRDaGlsZChzdmdDb250YWluZXIpXG4gICAgc3ZnQ29udGFpbmVyLmFwcGVuZENoaWxkKHN2Z1Jvb3QpXG4gICAgc3ZnUm9vdC5hcHBlbmRDaGlsZChzdmdTdGFnZSlcblxuICAgIHN2Z1N0YWdlLmFwcGVuZENoaWxkKHN2Z0JnKVxuICAgIHN2Z0JnLmFwcGVuZENoaWxkKGJnUmVjdClcbiAgICBzdmdTdGFnZS5hcHBlbmRDaGlsZChzdmdDb250ZW50KVxuICAgIHN2Z0NvbnRlbnQuYXBwZW5kQ2hpbGQobGF5ZXIpXG5cblxuICAgIHRoaXMuZ3VpZGVMaW5lID0gbmV3IEd1aWRlTGluZSgpXG4gICAgdGhpcy5ndWlkZUxpbmUubW91bnQoc3ZnU3RhZ2UpXG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZXdwb3J0KVxuICB9XG4gIGdldEN1cnJlbnRMYXllcigpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50TGF5ZXJcbiAgfVxuXG4gIHNldFRvb2xNYW5hZ2VyKHRvb2xNYW5hZ2VyKSB7XG4gICAgdGhpcy50b29sTWFuYWdlciA9IHRvb2xNYW5hZ2VyXG4gIH1cbiAgLy8gdG9vbCByZWxhdGl2ZWQgbWV0aG9kc1xuICBzZXRDdXJyZW50VG9vbChuYW1lKSB7XG4gICAgdGhpcy50b29sTWFuYWdlci5zZXRDdXJyZW50VG9vbChuYW1lKVxuICB9XG4gIHJlZ2lzdGVyVG9vbCh0b29sKSB7XG4gICAgdGhpcy50b29sTWFuYWdlci5yZWdpc3RlclRvb2wodG9vbClcbiAgfVxuICBzZXRTZXR0aW5nKHNldHRpbmcpIHtcbiAgICB0aGlzLnNldHRpbmcgPSBzZXR0aW5nXG4gIH1cblxuICAvLyDlkb3ku6Tnm7jlhbNcbiAgc2V0Q29tbWFuZE1hbmFnZXIoY29tbWFuZE1hbmFnZXIpIHtcbiAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyID0gY29tbWFuZE1hbmFnZXJcbiAgICBjb21tYW5kTWFuYWdlci5zZXRFZGl0b3IodGhpcylcbiAgfVxuICBleGVjdXRlQ29tbWFuZChuYW1lLCAuLi5wYXJhbXMpIHtcbiAgICBpZiAobmFtZSA9PSAndW5kbycpIHtcbiAgICAgIHRoaXMuY29tbWFuZE1hbmFnZXIudW5kbygpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKG5hbWUgPT0gJ3JlZG8nKSB7XG4gICAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyLnJlZG8oKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuY29tbWFuZE1hbmFnZXIuZXhlY3V0ZShuYW1lLCAuLi5wYXJhbXMpXG4gIH1cblxuICAvLyB6b29tXG4gIHNldFpvb21NYW5hZ2VyKHpvb21NYW5hZ2VyKSB7XG4gICAgem9vbU1hbmFnZXIuc2V0RWRpdG9yKHRoaXMpXG4gICAgdGhpcy56b29tTWFuYWdlciA9IHpvb21NYW5hZ2VyXG4gIH1cbiAgZ2V0Wm9vbSgpIHsgLy8g5bCB6KOFXG4gICAgcmV0dXJuIHRoaXMuem9vbU1hbmFnZXIuZ2V0Wm9vbSgpXG4gIH1cblxuICBnZXRTY3JvbGwoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHRoaXMuc3ZnQ29udGFpbmVyLnNjcm9sbExlZnQsXG4gICAgICB5OiB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxUb3AsXG4gICAgfVxuICB9XG4gIHNldFNjcm9sbCh4LCB5KSB7XG4gICAgdGhpcy5zdmdDb250YWluZXIuc2Nyb2xsTGVmdCA9IHhcbiAgICB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxUb3AgPSB5XG4gIH1cbiAgZ2V0Q29udGVudE9mZnNldCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogdGhpcy5zdmdTdGFnZS5nZXRBdHRyaWJ1dGUoJ3gnKSxcbiAgICAgIHk6IHRoaXMuc3ZnU3RhZ2UuZ2V0QXR0cmlidXRlKCd5JyksXG4gICAgfVxuICB9XG5cbiAgaXNDb250ZW50RWxlbWVudChlbCkge1xuICAgIHdoaWxlIChlbCkge1xuICAgICAgaWYgKGVsLnBhcmVudEVsZW1lbnQgPT0gdGhpcy5zdmdDb250ZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICBpZiAoZWwucGFyZW50RWxlbWVudCA9PSB0aGlzLnN2Z1Jvb3QpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgICBlbCA9IGVsLnBhcmVudEVsZW1lbnRcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBiaW5kVG9vbEV2ZW50KCkge1xuICAgIHRoaXMuc3ZnUm9vdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBlID0+IHtcbiAgICAgIGNvbnN0IGN0eCA9IG5ldyBFZGl0b3JFdmVudENvbnRleHQodGhpcywgZSlcbiAgICAgIHRoaXMuY3R4ID0gY3R4XG4gICAgICB0aGlzLmN1cnJlbnRUb29sLnN0YXJ0KGN0eClcbiAgICB9LCBmYWxzZSlcblxuICAgIHRoaXMuc3ZnUm9vdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4XG5cbiAgICAgIGlmICghY3R4KSByZXR1cm4gLy8gaWYgY3R4IGV4aXRzLCBwcmVzZW50IG1vdXNlZG93biBldmVudCBlbWl0IGp1c3QgYmVmb3JlXG4gICAgICBjdHguc2V0T3JpZ2luRXZlbnQoZSlcbiAgICAgIGN0eC5wcmVzc01vdXNlKClcbiAgICAgIHRoaXMuY3VycmVudFRvb2wubW92ZShjdHgpXG4gICAgfSwgZmFsc2UpXG4gICAgXG4gICAgdGhpcy5zdmdSb290LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlID0+IHtcbiAgICAgIC8vIHRoaXMuY3R4LnJlbGVhc2VNb3VzZSgpXG4gICAgICBjb25zdCBjdHggPSB0aGlzLmN0eFxuICAgICAgLy8gY3R4LnNldE9yaWdpbkV2ZW50KGUpIC8vIHRoZSBvZmZzZXRYIGFuZCBvZmZzZXRZIGluIG1vdXNldXAgYW5kIHRoZSBsYXN0IG1vdXNlbW92ZSBpcyBub3QgZXF1YWwgPz8gXG4gICAgICB0aGlzLmN1cnJlbnRUb29sLmVuZChjdHgpXG4gICAgICBjdHguaXNFbmRJbnNpZGUgPSB0cnVlXG4gICAgfSwgZmFsc2UpXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGUgPT4ge1xuICAgICAgaWYgKHRoaXMuY3R4ICYmIHRoaXMuY3R4LmlzRW5kSW5zaWRlID09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRvb2wuZW5kT3V0c2lkZSh0aGlzLmN0eClcbiAgICAgIH1cbiAgICAgIHRoaXMuY3R4ID0gbnVsbFxuICAgIH0sIGZhbHNlKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVkaXRvclxuIiwiXG4vKipcbiAqIGNvbnRleHQgY2xhc3NcbiAqIFxuICogdXNlZCBmb3IgdG9vbCBldmVudFxuICovXG5cbmV4cG9ydCBjbGFzcyBFZGl0b3JFdmVudENvbnRleHQge1xuICBjb25zdHJ1Y3RvcihlZGl0b3IsIGUpIHtcbiAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IGZhbHNlXG4gICAgdGhpcy5vcmlnaW5FdmVudCA9IGVcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICAgIHRoaXMuaXNFbmRJbnNpZGUgPSBmYWxzZVxuXG4gICAgdGhpcy5zdGFydFggPSAwXG4gICAgdGhpcy5zdGFydFkgPSAwXG5cbiAgICB0aGlzLm9mZnNldFggPSAwXG4gICAgdGhpcy5vZmZzZXRZID0gMFxuXG4gICAgdGhpcy5zdGFydENsaWVudFggPSAwIC8vIHVzZWQgdG8gY2FsYyBkeCBhbmQgZHkuXG4gICAgdGhpcy5zdGFydENsaWVudFkgPSAwXG4gICAgdGhpcy5keCA9IDBcbiAgICB0aGlzLmR5ID0gMFxuXG4gICAgdGhpcy5zZXRTdGFydFBvcygpXG4gIH1cbiAgc2V0T3JpZ2luRXZlbnQoZSkge1xuICAgIHRoaXMub3JpZ2luRXZlbnQgPSBlXG4gIH1cbiAgc2V0U3RhcnRQb3MoKSB7XG4gICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLmdldFBvcygpXG5cbiAgICB0aGlzLnN0YXJ0WCA9IHhcbiAgICB0aGlzLnN0YXJ0WSA9IHlcblxuICAgIHRoaXMuc3RhcnRDbGllbnRYID0gdGhpcy5vcmlnaW5FdmVudC5jbGllbnRYXG4gICAgdGhpcy5zdGFydENsaWVudFkgPSB0aGlzLm9yaWdpbkV2ZW50LmNsaWVudFlcbiAgfVxuICByZWxlYXNlTW91c2UoKSB7XG4gICAgdGhpcy5tb3VzZVByZXNzZWQgPSBmYWxzZVxuICB9XG4gIHByZXNzTW91c2UoKSB7XG4gICAgdGhpcy5tb3VzZVByZXNzZWQgPSB0cnVlXG4gIH1cbiAgZ2V0UG9zKCkge1xuICAgIGNvbnN0IHpvb20gPSB0aGlzLmVkaXRvci5nZXRab29tKClcbiAgICBjb25zdCB7eCwgeX0gPSB0aGlzLmVkaXRvci5nZXRDb250ZW50T2Zmc2V0KClcbiAgICByZXR1cm4geyBcbiAgICAgIHg6IHRoaXMub3JpZ2luRXZlbnQub2Zmc2V0WCAvIHpvb20gLSB4LCBcbiAgICAgIHk6IHRoaXMub3JpZ2luRXZlbnQub2Zmc2V0WSAvIHpvb20gLSB5LFxuICAgIH1cbiAgfVxuICBnZXRTdGFydFBvcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogdGhpcy5zdGFydFgsXG4gICAgICB5OiB0aGlzLnN0YXJ0WSxcbiAgICB9XG4gIH1cbiAgLy8gd2l0aG91dCBjYWxjIHdpdGggem9vbSB2YWx1ZVxuICBnZXREaWZmUG9zKCkge1xuICAgIGNvbnN0IHggPSB0aGlzLm9yaWdpbkV2ZW50LmNsaWVudFggLSB0aGlzLnN0YXJ0Q2xpZW50WFxuICAgIGNvbnN0IHkgPSB0aGlzLm9yaWdpbkV2ZW50LmNsaWVudFkgLSB0aGlzLnN0YXJ0Q2xpZW50WVxuICAgIHJldHVybiB7IHgsIHkgfVxuICB9XG5cbn0iLCJcbmV4cG9ydCBjbGFzcyBFZGl0b3JTZXR0aW5nIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zZXR0aW5nID0ge1xuICAgICAgZmlsbDogJyNmZmYnLFxuICAgICAgc3Ryb2tlOiAnIzAwMCcsXG4gICAgICBzdHJva2VXaWR0aDogJzJweCcsXG5cbiAgICAgIC8vIG91dGxpbmVXaWR0aFxuICAgICAgLy8gb3V0bGluZUNvbG9yXG4gICAgfVxuICB9XG4gIHNldEZpbGwodmFsKSB7XG4gICAgdGhpcy5zZXR0aW5nLmZpbGwgPSB2YWxcbiAgfVxuICBzZXRTdHJva2UodmFsKSB7XG4gICAgdGhpcy5zZXR0aW5nLmZpbGwgPSB2YWxcbiAgfVxuICBzZXQobmFtZSwgdmFsKSB7XG4gICAgdGhpcy5zZXR0aW5nW25hbWVdID0gdmFsXG4gIH1cbiAgZ2V0KG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5nW25hbWVdXG4gIH1cbn0iLCJcbi8qKlxuICog5a+5IHJlY3Qg5YWD57Sg55qE566A5Y2V5bCB6KOFXG4gKi9cblxuZXhwb3J0IGNsYXNzIEZFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5lbF8gPSBudWxsXG4gIH1cbiAgZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxfXG4gIH1cbiAgc2V0QXR0cihwcm9wLCB2YWwpIHtcbiAgICByZXR1cm4gdGhpcy5lbF8uc2V0QXR0cmlidXRlKHByb3AsIHZhbClcbiAgfVxuICBnZXRBdHRyKHByb3ApIHtcbiAgICByZXR1cm4gdGhpcy5lbF8uZ2V0QXR0cmlidXRlKHByb3ApXG4gIH1cbn0iLCJpbXBvcnQgeyBSZWN0IH0gZnJvbSBcIi4vcmVjdFwiXG5cblxuLyoqXG4gKiBGU1ZHXG4gKiBcbiAqIHNpbXBsZSBTVkdFbGVtZW50IGVuY2Fwc3VsYXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IEZTVkcgPSB7XG4gIFJlY3QsXG59IiwiXG4vKipcbiAqIOWvuSByZWN0IOWFg+e0oOeahOeugOWNleWwgeijhVxuICovXG5cbmltcG9ydCB7IE5TIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiXG5pbXBvcnQgeyBGRWxlbWVudCB9IGZyb20gXCIuL2Jhc2VFbGVtZW50XCJcblxuZXhwb3J0IGNsYXNzIFJlY3QgZXh0ZW5kcyBGRWxlbWVudCB7XG4gIC8vIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlcik7XG4gIC8vIGNvbnN0cnVjdG9yKGVsOiBTVkdFbGVtZW50KTtcbiAgY29uc3RydWN0b3IoeCwgeSwgdywgaCkge1xuICAgIHN1cGVyKClcbiAgICBpZiAodHlwZW9mIHggPT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMuZWxfID0geFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsXyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdyZWN0JylcbiAgICAgIHRoaXMuZWxfLnNldEF0dHIoJ3gnLCB4KVxuICAgICAgdGhpcy5lbF8uc2V0QXR0cigneScsIHkpXG4gICAgICB0aGlzLmVsXy5zZXRBdHRyKCd3aWR0aCcsIHcpXG4gICAgICB0aGlzLmVsXy5zZXRBdHRyKCdoZWlnaHQnLCBoKVxuICAgIH1cbiAgfVxuICBnZXRQb3MoKSB7XG4gICAgY29uc3QgeCA9IHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyKCd4JykpXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyKCd5JykpXG4gICAgcmV0dXJuIHsgeCwgeSB9XG4gIH1cbiAgZG1vdmUoZHgsIGR5KSB7XG4gICAgY29uc3QgcG9zID0gdGhpcy5nZXRQb3MoKVxuICAgIHRoaXMuc2V0QXR0cigneCcsIHBvcy54ICsgZHgpXG4gICAgdGhpcy5zZXRBdHRyKCd5JywgcG9zLnkgKyBkeSlcbiAgfVxufSIsImltcG9ydCBDb21tYW5kTWFuYWdlciBmcm9tICcuL2NvbW1hbmRNYW5hZ2VyLmpzJ1xuaW1wb3J0IEVkaXRvciBmcm9tICcuL2VkaXRvci5qcydcbmltcG9ydCBBZGRSZWN0IGZyb20gJy4vbW9kdWxlcy9hZGRSZWN0LmpzJ1xuaW1wb3J0IHsgRHJhZ0NhbnZhcyB9IGZyb20gJy4vbW9kdWxlcy9kcmFnQ2FudmFzLmpzJ1xuXG5pbXBvcnQgeyBBZGRSZWN0Q29tbWFuZCwgRE1vdmUgfSBmcm9tICcuL2NvbW1hbmQuanMnXG5pbXBvcnQgeyBFZGl0b3JTZXR0aW5nIH0gZnJvbSAnLi9lZGl0b3JTZXR0aW5nLmpzJ1xuaW1wb3J0IHsgWm9vbU1hbmFnZXIgfSBmcm9tICcuL21vZHVsZXMvem9vbS5qcydcbmltcG9ydCB7IFNlbGVjdCB9IGZyb20gJy4vbW9kdWxlcy9zZWxlY3QuanMnXG5pbXBvcnQgeyBUb29sTWFuYWdlciB9IGZyb20gJy4vdG9vbE1hbmFnZXIuanMnXG5cbmNvbnN0IGVkaXRvciA9IG5ldyBFZGl0b3IoKVxuXG4vLyByZWdpc3RlciBjb21tYW5kc1xuY29uc3QgY29tbWFuZE1hbmFnZXIgPSBuZXcgQ29tbWFuZE1hbmFnZXIoKVxuY29tbWFuZE1hbmFnZXIucmVzaWd0ZXJDb21tYW5kQ2xhc3MoQWRkUmVjdENvbW1hbmQpXG5jb21tYW5kTWFuYWdlci5yZXNpZ3RlckNvbW1hbmRDbGFzcyhETW92ZSlcbi8vIHNldHRpbmdcbmVkaXRvci5zZXRTZXR0aW5nKG5ldyBFZGl0b3JTZXR0aW5nKCkpXG5cbmVkaXRvci5zZXRDb21tYW5kTWFuYWdlcihjb21tYW5kTWFuYWdlcilcbi8vIHJlZ2lzdGVyIHRvb2xzXG5cbmNvbnN0IHRvb2xNYW5hZ2VyID0gbmV3IFRvb2xNYW5hZ2VyKGVkaXRvcilcbmVkaXRvci5zZXRUb29sTWFuYWdlcih0b29sTWFuYWdlcilcbnRvb2xNYW5hZ2VyLnJlZ2lzdGVyVG9vbChuZXcgQWRkUmVjdCgpKVxudG9vbE1hbmFnZXIucmVnaXN0ZXJUb29sKG5ldyBEcmFnQ2FudmFzKCkpXG50b29sTWFuYWdlci5yZWdpc3RlclRvb2wobmV3IFNlbGVjdCgpKVxuLy8gdG9vbE1hbmFnZXIuc2V0Q3VycmVudFRvb2woJ2FkZFJlY3QnKVxudG9vbE1hbmFnZXIuc2V0Q3VycmVudFRvb2woJ3NlbGVjdCcpXG50b29sTWFuYWdlci5iaW5kVG9vbEV2ZW50KClcbi8vIHpvb21cbmVkaXRvci5zZXRab29tTWFuYWdlcihuZXcgWm9vbU1hbmFnZXIoKSlcblxuXG4vKiogXG4gKiBiaW5kIGV2ZW50IGluIGJ1dHRvblxuICovIFxuXG4vLyB1bmRvXG5jb25zdCB1bmRvQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbnVuZG9CdG4uaW5uZXJUZXh0ID0gJ3VuZG8nXG51bmRvQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCd1bmRvJylcbn1cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodW5kb0J0bilcbi8vIHJlZG9cbmNvbnN0IHJlZG9CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxucmVkb0J0bi5pbm5lclRleHQgPSAncmVkbydcbnJlZG9CdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3JlZG8nKVxufVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZWRvQnRuKVxuLy8gem9vbUluXG5jb25zdCB6b29tSW5CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuem9vbUluQnRuLmlubmVyVGV4dCA9ICd6b29tSW4nXG56b29tSW5CdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBlZGl0b3Iuem9vbU1hbmFnZXIuem9vbUluKClcbn1cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoem9vbUluQnRuKVxuLy8gem9vbU91dFxuY29uc3Qgem9vbU91dEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG56b29tT3V0QnRuLmlubmVyVGV4dCA9ICd6b29tT3V0J1xuem9vbU91dEJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIGVkaXRvci56b29tTWFuYWdlci56b29tT3V0KClcbn1cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoem9vbU91dEJ0bilcbi8vIHNlbGVjdCBhZGRSZWN0IHRvb2xcbmNvbnN0IGRyYXdSZWN0VG9vbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG5kcmF3UmVjdFRvb2xCdG4uaW5uZXJUZXh0ID0gJ2FkZFJlY3QnXG5kcmF3UmVjdFRvb2xCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBlZGl0b3Iuc2V0Q3VycmVudFRvb2woJ2FkZFJlY3QnKVxufVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkcmF3UmVjdFRvb2xCdG4pXG4vLyBzZWxlY3QgZHJhZ2NhbnZhcyB0b29sXG5jb25zdCBkcmFnQ2FudmFzVG9vbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG5kcmFnQ2FudmFzVG9vbEJ0bi5pbm5lclRleHQgPSAnZHJhZ0NhbnZhcydcbmRyYWdDYW52YXNUb29sQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLnNldEN1cnJlbnRUb29sKCdkcmFnQ2FudmFzJylcbn1cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZHJhZ0NhbnZhc1Rvb2xCdG4pXG4vLyBzZWxlY3QgdG9vbFxuY29uc3Qgc2VsZWN0VG9vbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG5zZWxlY3RUb29sQnRuLmlubmVyVGV4dCA9ICdzZWxlY3QnXG5zZWxlY3RUb29sQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLnNldEN1cnJlbnRUb29sKCdzZWxlY3QnKVxufVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWxlY3RUb29sQnRuKVxuXG4vKipcbiAqIOeQhuaDsyBhcGkg5L2/55So5L6L5a2QXG4gKiBcbiAqIGNvbnN0IGVkaXRvckJ1aWxkZXIgPSBuZXcgRWRpdG9yLmJ1aWxkZXIoKVxuICogZWRpdG9yQnVpbGRlclxuICogICAuc2V0Q2FudmFzU2l6ZSg0MDAsIDMwMClcbiAqICAgLnNldFN0YWdlU2l6ZSgxMDAwLCA4MDApXG4gKiAgIC5zZXRWaWV3cG9ydFNpemUoODAwLCA1MDApXG4gKiAgIC5zZXRab29tKDEwMClcbiAqIFxuICogY29uc3QgZWRpdG9yID0gZWRpdG9yQnVpbGRlci5idWlsZCgpXG4gKiBlZGl0b3IucmVnaXN0ZXJUb29sKHRvb2xNb3ZlKVxuICogXG4gKi8iLCIvKipcbiAqIGd1aWRlIGxpbmUgbGF5ZXJcbiAqL1xuXG5pbXBvcnQgeyBSZWN0R3VpZGUgfSBmcm9tIFwiLi9yZWN0R3VpZGVcIjtcbmNvbnN0IHsgTlMgfSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XG5cbmV4cG9ydCBjbGFzcyBHdWlkZUxpbmV7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ2cnKVxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gJ2d1aWRlLWxheW91dCdcbiAgICB0aGlzLnJlY3RHdWlkZSA9IG5ldyBSZWN0R3VpZGUodGhpcy5jb250YWluZXIpXG4gIH1cbiAgbW91bnQoZWwpIHtcbiAgICBlbC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcilcbiAgfVxufVxuXG4iLCJcbmNvbnN0IHsgTlMgfSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XG5cbi8qKlxuICogPHJlY3Q+IG91dGxpbmVcbiAqL1xuZXhwb3J0IGNsYXNzIFJlY3RHdWlkZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudCkge1xuICAgIHRoaXMueCA9IDBcbiAgICB0aGlzLnkgPSAwXG4gICAgdGhpcy53ID0gMFxuICAgIHRoaXMuaCA9IDBcblxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ2cnKVxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gJ3JlY3QtZ3VpZGUnXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKVxuXG4gICAgdGhpcy5vdXRsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ3BhdGgnKVxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJyNmMDQnKVxuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5vdXRsaW5lKVxuICB9XG4gIGNsZWFyKCkge1xuICAgIC8vIHBhcmVudC5pbm5lckhUTUwgPSAnJ1xuICAgIHRoaXMub3V0bGluZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIH1cbiAgcmVuZGVyUmVjdCh4LCB5LCB3LCBoKSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLncgPSB3XG4gICAgdGhpcy5oID0gaFxuXG4gICAgLy8gd2h5IGRvbid0IEkgdXNlIHJlY3QsIGp1c3Qgc29sdmUgdGhlIGNvbmRpdGlvbiB3aGVuIHdpZHRoIG9yIGhlaWdodCBpcyAwIHRoZSBvdXRsaW5lIGlzIGRpc2FwcGVyXG4gICAgY29uc3QgZCA9IGBNICR7eH0gJHt5fSBMICR7eCt3fSAke3l9IEwgJHt4K3d9ICR7eStofSBMICR7eH0gJHt5K2h9IFpgXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZCcsIGQpXG5cbiAgICAvKiB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd4JywgeClcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd5JywgeSlcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHcpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaCkgKi9cbiAgICB0aGlzLm91dGxpbmUuc3R5bGUuZGlzcGxheSA9ICcnXG4gIH1cbiAgZ2V0V2lkdGgoKSB7IHJldHVybiB0aGlzLncgfVxuICBnZXRIZWlnaHQoKSB7IHJldHVybiB0aGlzLmggfVxuICBnZXRYKCkgeyByZXR1cm4gdGhpcy54IH1cbiAgZ2V0WSgpIHsgcmV0dXJuIHRoaXMueSB9XG59IiwiXG5pbXBvcnQgeyBnZXRCb3hCeTJwb2ludHMgfSBmcm9tIFwiLi4vdXRpbC9tYXRoXCJcblxuY2xhc3MgQWRkUmVjdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZWRpdG9yID0gbnVsbFxuICB9XG4gIG5hbWUoKSB7XG4gICAgcmV0dXJuICdhZGRSZWN0J1xuICB9XG4gIHNldEVkaXRvcihlZGl0b3IpIHsgLy8g5L6d6LWW5rOo5YWlXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgfVxuICBzdGFydChjdHgpIHt9XG4gIG1vdmUoY3R4KSB7XG4gICAgY29uc3QgeyB4OiBlbmRYLCB5OiBlbmRZIH0gPSBjdHguZ2V0UG9zKClcbiAgICBjb25zdCB7IHg6IHN0YXJ0WCwgeTogc3RhcnRZIH0gPSBjdHguZ2V0U3RhcnRQb3MoKVxuICAgIGNvbnN0IHsgeCwgeSwgdywgaCB9ID0gZ2V0Qm94QnkycG9pbnRzKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZKVxuICAgIHRoaXMuZWRpdG9yLmd1aWRlTGluZS5yZWN0R3VpZGUucmVuZGVyUmVjdCh4LCB5LCB3LCBoKVxuICB9XG4gIGVuZChjdHgpIHtcbiAgICB0aGlzLmVkaXRvci5ndWlkZUxpbmUucmVjdEd1aWRlLmNsZWFyKClcblxuICAgIGNvbnN0IHsgeDogZW5kWCwgeTogZW5kWSB9ID0gY3R4LmdldFBvcygpXG4gICAgY29uc3QgeyB4OiBzdGFydFgsIHk6IHN0YXJ0WSB9ID0gY3R4LmdldFN0YXJ0UG9zKClcbiAgICBjb25zdCB7IHgsIHksIHcsIGggfSA9IGdldEJveEJ5MnBvaW50cyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSlcbiAgICBpZiAodyA8IDIgJiYgaCA8IDIpIHtcbiAgICAgIC8vIFRPRE86IG9wZW4gYSBkaWFsb2cgdG8gaW5wdXQgd2lkdGggYW5kIGhlaWdodFxuICAgICAgY29uc29sZS5sb2coJ3dpZHRoIGFuZCBoZWlnaHQgYm90aCBsZXNzIGVxdWFsIHRvIDLvvIxkcmF3aW5nIG5vdGhpbmcnKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdhZGRSZWN0JywgeCwgeSwgdywgaClcbiAgfVxuICAvLyBtb3VzZWRvd24gb3V0c2lkZSB2aWV3cG9ydFxuICBlbmRPdXRzaWRlKCkge1xuICAgIHRoaXMuZWRpdG9yLmd1aWRlTGluZS5yZWN0R3VpZGUuY2xlYXIoKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFkZFJlY3QiLCJcbmV4cG9ydCBjbGFzcyBEcmFnQ2FudmFzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdGFydE9mZnNldFggPSAwXG4gICAgdGhpcy5zdGFydE9mZnNldFkgPSAwXG4gIH1cbiAgbmFtZSgpIHtcbiAgICByZXR1cm4gJ2RyYWdDYW52YXMnXG4gIH1cbiAgc2V0RWRpdG9yKGVkaXRvcikgeyAvLyDkvp3otZbms6jlhaVcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICB9XG4gIGJlZm9yZUFjdGl2ZSgpIHtcbiAgICAvLyBkbyBzb21ldGhpbmcgYmVmb3JlIHN3aXRjaCB0byBjdXJyZW50IHRvb2xcbiAgfVxuICBzdGFydChjdHgpIHtcbiAgICBjb25zdCBzY3JvbGwgPSB0aGlzLmVkaXRvci5nZXRTY3JvbGwoKVxuICAgIHRoaXMuc3RhcnRPZmZzZXRYID0gc2Nyb2xsLnhcbiAgICB0aGlzLnN0YXJ0T2Zmc2V0WSA9IHNjcm9sbC55XG4gIH1cbiAgbW92ZShjdHgpIHtcbiAgICBjb25zdCB6b29tID0gdGhpcy5lZGl0b3IuZ2V0Wm9vbSgpXG4gICAgY29uc3QgeyB4OiBkeCwgeTogZHkgfSA9IGN0eC5nZXREaWZmUG9zKClcbiAgICB0aGlzLmVkaXRvci5zZXRTY3JvbGwodGhpcy5zdGFydE9mZnNldFggLSBkeCwgdGhpcy5zdGFydE9mZnNldFkgLSBkeSlcbiAgfVxuICBlbmQoKSB7fVxuICBlbmRPdXRzaWRlKCkge31cbn1cbiIsImltcG9ydCB7IEZTVkcgfSBmcm9tIFwiLi4vZWxlbWVudFwiXG5pbXBvcnQgeyBnZXRCb3hCeTJwb2ludHMgfSBmcm9tIFwiLi4vdXRpbC9tYXRoXCJcblxuLyoqXG4gKiBzZWxlY3RcbiAqIFxuICog5q2k5qih5Z2X6Z2e5bi45aSN5p2CXG4gKiBcbiAqIDEuIOm8oOagh+aMieS4i+aXtu+8jOmAieS4reWNleS4quWFg+e0oFxuICogMi4g6byg5qCH5oyJ5LiL5Li656m677yM5ouW5ou95pe25Lqn55Sf6YCJ5Lit5qGG77yM5Y+v5Lul6YCJ5oup5aSa5Liq5YWD57SgXG4gKiAzLiDpgInkuK3ljZXkuKrvvIjmiJbpgInljLrpgInkuK3lpJrkuKrvvIkg57yp5pS+IOetieaOp+WItueCue+8jOaLluaLveaUueWPmOWuvemrmFxuICogMy4g5YiH5pat5YiA6L+Z5Liq5bel5YW35pe277yM5r+A5rS755qE5YWD57Sg6L+b5YWl6KKr6YCJ5Lit54q25oCB77yI6L2u5buT57q/K+aOp+WItueCue+8ieOAglxuICogNC4g6YCJ5Yy65ZKM5YWD57Sg55u45Lqk55qE5Yik5a6aXG4gKiA1LiDmv4DmtLvlhYPntKDlpoLkvZXkv53lrZjvvIzkv53lrZjliLDlk6rph4xcbiAqL1xuZXhwb3J0IGNsYXNzIFNlbGVjdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZWRpdG9yID0gbnVsbFxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxuXG4gICAgdGhpcy5vdXRsaW5lU3RhcnRYID0gMFxuICAgIHRoaXMub3V0bGluZVN0YXJ0WSA9IDBcbiAgfVxuICBuYW1lKCkge1xuICAgIHJldHVybiAnc2VsZWN0J1xuICB9XG4gIHNldEVkaXRvcihlZGl0b3IpIHtcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICB9XG4gIGhhc1NlbGVjdGVkRWxzV2hlblN0YXJ0KCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRWxzLmxlbmd0aCA9PSAwXG4gIH1cbiAgc3RhcnQoY3R4KSB7XG4gICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGN0eC5vcmlnaW5FdmVudC50YXJnZXRcbiAgICBpZiAoIXRoaXMuZWRpdG9yLmlzQ29udGVudEVsZW1lbnQodGFyZ2V0RWxlbWVudCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldEZFbGVtZW50ID0gbmV3IEZTVkcuUmVjdCh0YXJnZXRFbGVtZW50KSAvLyDmmoLml7blj6rmmK8gcmVjdCBUT0RPOiDmlLnkuLrpgJrnlKjlhpnms5VcbiAgICB0aGlzLnNlbGVjdGVkRWxzID0gWyB0YXJnZXRGRWxlbWVudCBdIC8vIOm8oOagh+aMieS4i+aXtu+8jOWwsemAieS4reS6huS4gOS4quWFg+e0oFxuICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KHRhcmdldEZFbGVtZW50LmdldEF0dHIoJ3gnKSlcbiAgICBjb25zdCB5ID0gcGFyc2VGbG9hdCh0YXJnZXRGRWxlbWVudC5nZXRBdHRyKCd5JykpXG4gICAgY29uc3QgdyA9IHBhcnNlRmxvYXQodGFyZ2V0RkVsZW1lbnQuZ2V0QXR0cignd2lkdGgnKSlcbiAgICBjb25zdCBoID0gcGFyc2VGbG9hdCh0YXJnZXRGRWxlbWVudC5nZXRBdHRyKCdoZWlnaHQnKSlcbiAgICBcbiAgICB0aGlzLm91dGxpbmVTdGFydFggPSB4XG4gICAgdGhpcy5vdXRsaW5lU3RhcnRZID0geVxuXG4gICAgdGhpcy5lZGl0b3IuZ3VpZGVMaW5lLnJlY3RHdWlkZS5yZW5kZXJSZWN0KHgsIHksIHcsIGgpXG4gIH1cbiAgbW92ZShjdHgpIHtcbiAgICBpZiAodGhpcy5oYXNTZWxlY3RlZEVsc1doZW5TdGFydCgpKSB7IC8vIOenu+WKqOmAieS4reeahOWFg+e0oFxuICAgICAgLy8gc2VsZWN0IG5vIGVsZW1lbnQsIGRyYXcgc2VsZWN0IHJlY3RcbiAgICAgIGNvbnN0IHsgeDogZW5kWCwgeTogZW5kWSB9ID0gY3R4LmdldFBvcygpXG4gICAgICBjb25zdCB7IHg6IHN0YXJ0WCwgeTogc3RhcnRZIH0gPSBjdHguZ2V0U3RhcnRQb3MoKVxuICAgICAgY29uc3QgeyB4LCB5LCB3LCBoIH0gPSBnZXRCb3hCeTJwb2ludHMoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpXG4gICAgICB0aGlzLmVkaXRvci5ndWlkZUxpbmUucmVjdEd1aWRlLnJlbmRlclJlY3QoeCwgeSwgdywgaClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHsgeDogZHgsIHk6IGR5IH0gPSBjdHguZ2V0RGlmZlBvcygpXG4gICAgY29uc3QgcmVjdEd1aWRlID0gdGhpcy5lZGl0b3IuZ3VpZGVMaW5lLnJlY3RHdWlkZVxuICAgIGNvbnN0IHcgPSByZWN0R3VpZGUuZ2V0V2lkdGgoKVxuICAgIGNvbnN0IGggPSByZWN0R3VpZGUuZ2V0SGVpZ2h0KClcbiAgICByZWN0R3VpZGUucmVuZGVyUmVjdCh0aGlzLm91dGxpbmVTdGFydFggKyBkeCwgdGhpcy5vdXRsaW5lU3RhcnRZICsgZHksIHcsIGgpXG4gIH1cbiAgZW5kKGN0eCkge1xuICAgIGlmICh0aGlzLmhhc1NlbGVjdGVkRWxzV2hlblN0YXJ0KCkpIHtcbiAgICAgIHRoaXMuZWRpdG9yLmd1aWRlTGluZS5yZWN0R3VpZGUuY2xlYXIoKVxuICAgICAgLy8gVE9ETzogYWN0aXZlIGZyYW1lIGJ5IHNlbGVjdCByZWN0LlxuXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgcmVjdEd1aWRlID0gdGhpcy5lZGl0b3IuZ3VpZGVMaW5lLnJlY3RHdWlkZVxuICAgIHJlY3RHdWlkZS5jbGVhcigpXG5cbiAgICBcbiAgICBjb25zdCB7IHg6IGR4LCB5OiBkeSB9ID0gY3R4LmdldERpZmZQb3MoKVxuICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdkbW92ZScsIHRoaXMuc2VsZWN0ZWRFbHMsIGR4LCBkeSlcbiAgICB0aGlzLnNlbGVjdGVkRWxzID0gW11cbiAgfVxuICAvLyBtb3VzZWRvd24gb3V0c2lkZSB2aWV3cG9ydFxuICBlbmRPdXRzaWRlKCkge1xuICAgIHRoaXMuZWRpdG9yLmd1aWRlTGluZS5yZWN0R3VpZGUuY2xlYXIoKVxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxuICB9XG59XG4iLCIvKiogem9vbSAqL1xuXG5jb25zdCB7IGdldFZpZXdCb3ggfSA9IHJlcXVpcmUoXCIuLi91dGlsL3N2Z1wiKVxuXG5leHBvcnQgY2xhc3MgWm9vbU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcbiAgfVxuICBzZXRFZGl0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgfVxuICBnZXRab29tKCkge1xuICAgIGNvbnN0IGFjdHVsV2lkdGggPSBwYXJzZUZsb2F0KHRoaXMuZWRpdG9yLnN2Z1Jvb3QuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKVxuICAgIGNvbnN0IHZpZXdCb3ggPSBnZXRWaWV3Qm94KHRoaXMuZWRpdG9yLnN2Z1Jvb3QpXG4gICAgY29uc3Qgem9vbSA9IGFjdHVsV2lkdGggLyB2aWV3Qm94LndcbiAgICByZXR1cm4gem9vbVxuICB9XG4gIHNldFpvb20oem9vbSkge1xuICAgIGNvbnNvbGUubG9nKHpvb20pXG4gICAgY29uc3Qgdmlld0JveCA9IGdldFZpZXdCb3godGhpcy5lZGl0b3Iuc3ZnUm9vdClcbiAgICBjb25zdCB3aWR0aCA9IHZpZXdCb3gudyAqIHpvb21cbiAgICBjb25zdCBoZWlnaHQgPSB2aWV3Qm94LmggKiB6b29tXG4gICAgdGhpcy5lZGl0b3Iuc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2lkdGgpXG4gICAgdGhpcy5lZGl0b3Iuc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGhlaWdodClcbiAgfVxuICB6b29tSW4oKSB7XG4gICAgY29uc3QgY3VycmVudFpvb20gPSB0aGlzLmdldFpvb20oKVxuICAgIHRoaXMuc2V0Wm9vbShjdXJyZW50Wm9vbSArIDAuMSlcbiAgfVxuICB6b29tT3V0KCkge1xuICAgIGNvbnN0IGN1cnJlbnRab29tID0gdGhpcy5nZXRab29tKClcbiAgICB0aGlzLnNldFpvb20oY3VycmVudFpvb20gLSAwLjEpXG4gIH1cbn0iLCJjb25zdCB7IEVkaXRvckV2ZW50Q29udGV4dCB9ID0gcmVxdWlyZShcIi4vZWRpdG9yRXZlbnRDb250ZXh0XCIpXG5cbmV4cG9ydCBjbGFzcyBUb29sTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKGVkaXRvcikge1xuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gICAgdGhpcy50b29scyA9IHt9XG4gICAgdGhpcy5jdXJyZW50VG9vbCA9ICdzZWxlY3QnXG5cbiAgICB0aGlzLmN0eCA9IG51bGwgLy8gdG9vbCBjb250ZXh0XG4gIH1cbiAgc2V0Q3VycmVudFRvb2wobmFtZSkge1xuICAgIHRoaXMuY3VycmVudFRvb2wgPSB0aGlzLnRvb2xzW25hbWVdXG4gIH1cbiAgcmVnaXN0ZXJUb29sKHRvb2wpIHtcbiAgICB0aGlzLnRvb2xzW3Rvb2wubmFtZSgpXSA9IHRvb2xcbiAgICB0b29sLnNldEVkaXRvcih0aGlzLmVkaXRvcikgLy8gZGVwZW5kZW5jeSBpbmplY3Rpb25cbiAgfVxuXG4gIGJpbmRUb29sRXZlbnQoKSB7XG4gICAgY29uc3Qgc3ZnUm9vdCA9IHRoaXMuZWRpdG9yLnN2Z1Jvb3RcblxuICAgIHN2Z1Jvb3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZSA9PiB7XG4gICAgICBjb25zdCBjdHggPSBuZXcgRWRpdG9yRXZlbnRDb250ZXh0KHRoaXMuZWRpdG9yLCBlKVxuICAgICAgdGhpcy5jdHggPSBjdHhcbiAgICAgIHRoaXMuY3VycmVudFRvb2wuc3RhcnQoY3R4KVxuICAgIH0sIGZhbHNlKVxuXG4gICAgc3ZnUm9vdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4XG5cbiAgICAgIGlmICghY3R4KSByZXR1cm4gLy8gaWYgY3R4IGV4aXRzLCBwcmVzZW50IG1vdXNlZG93biBldmVudCBlbWl0IGp1c3QgYmVmb3JlXG4gICAgICBjdHguc2V0T3JpZ2luRXZlbnQoZSlcbiAgICAgIGN0eC5wcmVzc01vdXNlKClcbiAgICAgIHRoaXMuY3VycmVudFRvb2wubW92ZShjdHgpIC8vIG1vdmVcbiAgICB9LCBmYWxzZSlcbiAgICBcbiAgICBzdmdSb290LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlID0+IHtcbiAgICAgIC8vIHRoaXMuY3R4LnJlbGVhc2VNb3VzZSgpXG4gICAgICBjb25zdCBjdHggPSB0aGlzLmN0eFxuICAgICAgLy8gY3R4LnNldE9yaWdpbkV2ZW50KGUpIC8vIHRoZSBvZmZzZXRYIGFuZCBvZmZzZXRZIGluIG1vdXNldXAgYW5kIHRoZSBsYXN0IG1vdXNlbW92ZSBpcyBub3QgZXF1YWwgPz8gXG4gICAgICB0aGlzLmN1cnJlbnRUb29sLmVuZChjdHgpXG4gICAgICBjdHguaXNFbmRJbnNpZGUgPSB0cnVlXG4gICAgfSwgZmFsc2UpXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGUgPT4ge1xuICAgICAgaWYgKHRoaXMuY3R4ICYmIHRoaXMuY3R4LmlzRW5kSW5zaWRlID09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRvb2wuZW5kT3V0c2lkZSh0aGlzLmN0eClcbiAgICAgIH1cbiAgICAgIHRoaXMuY3R4ID0gbnVsbFxuICAgIH0sIGZhbHNlKVxuICB9XG59IiwiXG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm94QnkycG9pbnRzKHgxLCB5MSwgeDIsIHkyKSB7XG4gIGxldCB4LCB5LCB3LCBoXG4gIHcgPSBNYXRoLmFicyh4MiAtIHgxKVxuICBoID0gTWF0aC5hYnMoeTIgLSB5MSlcbiAgeCA9IE1hdGgubWluKHgyLCB4MSlcbiAgeSA9IE1hdGgubWluKHkyLCB5MSlcbiAgcmV0dXJuIHsgeCwgeSwgdywgaCB9XG59IiwiXG4vLyBUT0RPOiB0byBmaW5pc2hcbmV4cG9ydCBmdW5jdGlvbiBnZXRWaWV3Qm94KGVsKSB7XG4gIGNvbnN0IHZhbCA9IGVsLmdldEF0dHJpYnV0ZSgndmlld0JveCcpXG4gIGlmICghdmFsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdoYXMgbm90IHZpZXdCb3ggYXR0cmlidXRlJylcbiAgfVxuICBjb25zdCBbeCwgeSwgdywgaF0gPSB2YWwuc3BsaXQoL1tcXHMsXSsvKS5tYXAoaXRlbSA9PiBwYXJzZUZsb2F0KGl0ZW0pKVxuICByZXR1cm4geyB4LCB5LCB3LCBoIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==