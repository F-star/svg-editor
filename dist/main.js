/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/activedElsManager.js":
/*!**********************************!*\
  !*** ./src/activedElsManager.js ***!
  \**********************************/
/*! namespace exports */
/*! export ActivedElsManager [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActivedElsManager": () => /* binding */ ActivedElsManager
/* harmony export */ });
/**
 * 激活元素管理类
 */

class ActivedElsManager {
  constructor(editor) {
    this.editor = editor
    this.els = []
  }
  setEls(els) {
    this.els = els
    // console.log(this.editor.toolManager.getCurrentToolName())
    // TODO: highlight outline, according to current tool
    this.heighligthEls()
    this.setSettingFill()
  }
  clear() {
    this.els = []
    // clear outline
    const hudManager = this.editor.hudManager
    hudManager.outlineHud.clear()
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
  heighligthEls() {
    // TODO:
    const els = this.els
    const hudManager = this.editor.hudManager
    els.forEach(el => {
      const {x, y, width, height} = el.getBBox()
      // console.log(box)
      hudManager.outlineHud.drawRect(x, y, width, height)
    })
  }
  setSettingFill() {
    const els = this.els
    const setting = this.editor.setting

    const fills = els.map(el => {
      return el.getAttr('fill')
    })


    setting.setFill(fills[0]) // FIXME:
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
/* harmony import */ var _activedElsManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./activedElsManager */ "./src/activedElsManager.js");
/* harmony import */ var _editorEventContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editorEventContext */ "./src/editorEventContext.js");
/* harmony import */ var _layer_hudManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layer/hudManager */ "./src/layer/hudManager.js");
;



class Editor {
  constructor() {
    this.setting = null
    this.commandManager = null
    this.zoomManager = null
    this.activedElsManager = new _activedElsManager__WEBPACK_IMPORTED_MODULE_0__.ActivedElsManager(this)


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


    this.hudManager = new _layer_hudManager__WEBPACK_IMPORTED_MODULE_2__.HudManager()
    this.hudManager.mount(svgStage)

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
      // fill: '#fff',
      // stroke: '#000',
      // strokeWidth: '2px',

      // outlineWidth
      // outlineColor
    }
    this.bindedEventFns = {}
    this.setFill('#fff')
    this.setStroke('#000')
    this.set('strokeWidth', '1px')
  }
  setFill(val) {
    this.set('fill', val)
  }
  setStroke(val) {
    this.set('stroke', val)
  }
  set(name, val) {
    this.setting[name] = val

    const toCallFns = this.bindedEventFns[name]
    if (toCallFns) {
      toCallFns.forEach(fn => {
        fn(val)
      })
    }
  }
  get(name) {
    return this.setting[name]
  }
  bindEvent(name, fn) {
    if (!this.bindedEventFns[name]) {
      this.bindedEventFns[name] = []
    }
    this.bindedEventFns[name].push(fn)
  }
  removeEvent(name, fn) {
    if (!this.bindedEventFns[name]) return false

    const removeFnIdx = this.bindedEventFns[name].findIndex(fn)
    if (removeFnIdx === -1) return false
    this.bindedEventFns.splice(removeFnIdx, 1)
    return true
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
  const toolBtns = Array.prototype.slice.call(toolBar.children)
  toolBtns.forEach(item => {
    item.classList.remove('active')
  })
  document.getElementById(name).classList.add('active')
}


const editor = new _editor_js__WEBPACK_IMPORTED_MODULE_1__.default()
window.editor = editor // debug in devtool
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

editor.toolManager.onSwitchTool(name => {
  console.log('switched tool:', name)
  activeBtn(name)
})

toolManager.setCurrentTool('addRect')
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


// get active element fill value
const fillTextNode = document.querySelector('#element-info-fill')
editor.setting.bindEvent('fill', val => {
  fillTextNode.innerHTML = val
})

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

/***/ "./src/layer/hudManager.js":
/*!*********************************!*\
  !*** ./src/layer/hudManager.js ***!
  \*********************************/
/*! namespace exports */
/*! export HudManager [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HudManager": () => /* binding */ HudManager
/* harmony export */ });
/* harmony import */ var _outlineHud__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./outlineHud */ "./src/layer/outlineHud.js");
/* harmony import */ var _selectArea__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectArea */ "./src/layer/selectArea.js");
/**
 * guide line layer
 */

;

const { NS } = __webpack_require__(/*! ../constants */ "./src/constants.js");

class HudManager{
  constructor() {
    this.container = document.createElementNS(NS.SVG, 'g')
    this.container.id = 'huds'

    this.selectArea = new _selectArea__WEBPACK_IMPORTED_MODULE_1__.SelectArea(this.container)
    this.outlineHud = new _outlineHud__WEBPACK_IMPORTED_MODULE_0__.OutlineHud(this.container)
  }
  mount(el) {
    el.appendChild(this.container)
  }
}



/***/ }),

/***/ "./src/layer/outlineHud.js":
/*!*********************************!*\
  !*** ./src/layer/outlineHud.js ***!
  \*********************************/
/*! namespace exports */
/*! export OutlineHud [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OutlineHud": () => /* binding */ OutlineHud
/* harmony export */ });


  
const { NS } = __webpack_require__(/*! ../constants */ "./src/constants.js");

/**
 * <rect> outline
 */
class OutlineHud {
  constructor(parent) {
    this.x = 0
    this.y = 0
    this.w = 0
    this.h = 0

    this.container = document.createElementNS(NS.SVG, 'g')
    this.container.id = 'outline-hud'
    parent.appendChild(this.container)

    this.outline = document.createElementNS(NS.SVG, 'path')
    this.outline.setAttribute('fill', 'none')
    this.outline.setAttribute('stroke', '#f04')
    this.outline.setAttribute('vector-effect', 'non-scaling-stroke')

    this.container.appendChild(this.outline)
  }
  clear() {
    // parent.innerHTML = ''
    this.outline.style.display = 'none'
  }
  drawRect(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    // why don't I use rect, just solve the condition when width or height is 0 the outline is disapper
    const d = `M ${x} ${y} L ${x+w} ${y} L ${x+w} ${y+h} L ${x} ${y+h} Z`
    this.outline.setAttribute('d', d)
    this.outline.style.display = ''
  }
  getWidth() { return this.w }
  getHeight() { return this.h }
  getX() { return this.x }
  getY() { return this.y }
}

/***/ }),

/***/ "./src/layer/selectArea.js":
/*!*********************************!*\
  !*** ./src/layer/selectArea.js ***!
  \*********************************/
/*! namespace exports */
/*! export SelectArea [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectArea": () => /* binding */ SelectArea
/* harmony export */ });

const { NS } = __webpack_require__(/*! ../constants */ "./src/constants.js");

/**
 * select area
 */
class SelectArea {
  constructor(parent) {
    this.x = 0
    this.y = 0
    this.w = 0
    this.h = 0

    this.container = document.createElementNS(NS.SVG, 'g')
    this.container.id = 'select-area'
    parent.appendChild(this.container)

    this.outline = document.createElementNS(NS.SVG, 'path')
    this.outline.setAttribute('fill', 'none')
    this.outline.setAttribute('stroke', '#054')
    this.outline.setAttribute('vector-effect', 'non-scaling-stroke')
    this.outline.setAttribute('stroke-dasharray', '4px')

    this.container.appendChild(this.outline)
  }
  clear() {
    // parent.innerHTML = ''
    this.outline.style.display = 'none'
  }
  drawRect(x, y, w, h) {
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
    this.editor.hudManager.outlineHud.drawRect(x, y, w, h)
  }
  end(ctx) {
    this.editor.hudManager.outlineHud.clear()

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
    this.editor.hudManager.outlineHud.clear()
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

    this.editor.hudManager.outlineHud.drawRect(x, y, w, h)
  }
  move(ctx) {
    if (!this.hasSelectedElsWhenStart()) { // draw selecting area
      // select no element, draw select rect
      const { x: endX, y: endY } = ctx.getPos()
      const { x: startX, y: startY } = ctx.getStartPos()
      const { x, y, w, h } = (0,_util_math__WEBPACK_IMPORTED_MODULE_1__.getBoxBy2points)(startX, startY, endX, endY)
      this.editor.hudManager.selectArea.drawRect(x, y, w, h)
      return
    }

    const { x: dx, y: dy } = ctx.getDiffPos()
    const outlineHud = this.editor.hudManager.outlineHud
    const w = outlineHud.getWidth()
    const h = outlineHud.getHeight()
    outlineHud.drawRect(this.outlineStartX + dx, this.outlineStartY + dy, w, h)
  }
  end(ctx) {
    if (!this.hasSelectedElsWhenStart()) { // finished drawn selecting area
      this.editor.hudManager.selectArea.clear()
      // TODO: active frame by select rect.
      this.editor.activedElsManager.clear()
      return
    }
    this.editor.hudManager.outlineHud.clear()

    
    const { x: dx, y: dy } = ctx.getDiffPos()
    this.editor.executeCommand('dmove', this.selectedEls, dx, dy)
    this.editor.activedElsManager.setEls(this.selectedEls) // set global actived elements
    this.selectedEls = []
  }
  // mousedown outside viewport
  endOutside() {
    this.editor.hudManager.outlineHud.clear()
    this.editor.hudManager.selectArea.clear()
    this.editor.activedElsManager.clear()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2FjdGl2ZWRFbHNNYW5hZ2VyLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvY29tbWFuZC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2NvbW1hbmRNYW5hZ2VyLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvZWRpdG9yLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvZWRpdG9yRXZlbnRDb250ZXh0LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvZWRpdG9yU2V0dGluZy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2VsZW1lbnQvYmFzZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lbGVtZW50L2luZGV4LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvZWxlbWVudC9yZWN0LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9sYXllci9odWRNYW5hZ2VyLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbGF5ZXIvb3V0bGluZUh1ZC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2xheWVyL3NlbGVjdEFyZWEuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9tb2R1bGVzL2FkZFJlY3QuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9tb2R1bGVzL2RyYWdDYW52YXMuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9tb2R1bGVzL3NlbGVjdC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvem9vbS5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL3Rvb2xNYW5hZ2VyLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvdXRpbC9tYXRoLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvdXRpbC9zdmcuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsb0JBQW9CO0FBQ2pDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2REEsQ0FBZ0M7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDhDQUFNO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsYzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeERmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVkEsQ0FBdUQ7QUFDRTtBQUNWOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGlFQUFpQjs7O0FBR2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMURPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUEE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7Ozs7Ozs7VUNUQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDmv4DmtLvlhYPntKDnrqHnkIbnsbtcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQWN0aXZlZEVsc01hbmFnZXIge1xyXG4gIGNvbnN0cnVjdG9yKGVkaXRvcikge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICAgIHRoaXMuZWxzID0gW11cclxuICB9XHJcbiAgc2V0RWxzKGVscykge1xyXG4gICAgdGhpcy5lbHMgPSBlbHNcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZWRpdG9yLnRvb2xNYW5hZ2VyLmdldEN1cnJlbnRUb29sTmFtZSgpKVxyXG4gICAgLy8gVE9ETzogaGlnaGxpZ2h0IG91dGxpbmUsIGFjY29yZGluZyB0byBjdXJyZW50IHRvb2xcclxuICAgIHRoaXMuaGVpZ2hsaWd0aEVscygpXHJcbiAgICB0aGlzLnNldFNldHRpbmdGaWxsKClcclxuICB9XHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLmVscyA9IFtdXHJcbiAgICAvLyBjbGVhciBvdXRsaW5lXHJcbiAgICBjb25zdCBodWRNYW5hZ2VyID0gdGhpcy5lZGl0b3IuaHVkTWFuYWdlclxyXG4gICAgaHVkTWFuYWdlci5vdXRsaW5lSHVkLmNsZWFyKClcclxuICB9XHJcbiAgY29udGFpbnMoZWwpIHtcclxuICAgIC8vIFRPRE86XHJcblxyXG4gIH1cclxuICBnZXRiYm94KCkge1xyXG4gICAgLy8gVE9ETzpcclxuICAgIC8qIGxldCB4LCB5LCB3LCBoXHJcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgY29uc3QgYmJveCA9IGVsLmVsKCkuZ2V0YmJveCgpXHJcbiAgICB9KSAqL1xyXG4gIH1cclxuICAvLyBoZWlnaHRsaWdodCB0aGUgZWxlbWVudHNcclxuICBoZWlnaGxpZ3RoRWxzKCkge1xyXG4gICAgLy8gVE9ETzpcclxuICAgIGNvbnN0IGVscyA9IHRoaXMuZWxzXHJcbiAgICBjb25zdCBodWRNYW5hZ2VyID0gdGhpcy5lZGl0b3IuaHVkTWFuYWdlclxyXG4gICAgZWxzLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICBjb25zdCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSBlbC5nZXRCQm94KClcclxuICAgICAgLy8gY29uc29sZS5sb2coYm94KVxyXG4gICAgICBodWRNYW5hZ2VyLm91dGxpbmVIdWQuZHJhd1JlY3QoeCwgeSwgd2lkdGgsIGhlaWdodClcclxuICAgIH0pXHJcbiAgfVxyXG4gIHNldFNldHRpbmdGaWxsKCkge1xyXG4gICAgY29uc3QgZWxzID0gdGhpcy5lbHNcclxuICAgIGNvbnN0IHNldHRpbmcgPSB0aGlzLmVkaXRvci5zZXR0aW5nXHJcblxyXG4gICAgY29uc3QgZmlsbHMgPSBlbHMubWFwKGVsID0+IHtcclxuICAgICAgcmV0dXJuIGVsLmdldEF0dHIoJ2ZpbGwnKVxyXG4gICAgfSlcclxuXHJcblxyXG4gICAgc2V0dGluZy5zZXRGaWxsKGZpbGxzWzBdKSAvLyBGSVhNRTpcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBOUyB9IGZyb20gXCIuL2NvbnN0YW50c1wiXHJcblxyXG5jbGFzcyBCYXNlQ29tbWFuZCB7XHJcbiAgdW5kbygpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcigncGxlYXNlIG92ZXJyaWRlIHVuZG8gbWV0aG9kJylcclxuICB9XHJcbiAgcmVkbygpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcigncGxlYXNlIG92ZXJyaWRlIHJlZG8gbWV0aG9kJylcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBhZGRSZWN0XHJcbiAqIFxyXG4gKiBhZGQgcmVjdCBzdmcgZWxlbWVudFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFkZFJlY3RDb21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgeCwgeSwgdywgaCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgLy8gVE9ETzog5L2/55So57yW6L6R5Zmo5L2/55So55qE6aKc6Imy562J5qC35byPXHJcbiAgICBjb25zdCByZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ3JlY3QnKVxyXG4gICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ3gnLCB4KVxyXG4gICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ3knLCB5KVxyXG4gICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdylcclxuICAgIHJlY3Quc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoKVxyXG5cclxuICAgIGNvbnN0IGZpbGwgPSBlZGl0b3Iuc2V0dGluZy5nZXQoJ2ZpbGwnKVxyXG4gICAgY29uc3Qgc3Ryb2tlID0gZWRpdG9yLnNldHRpbmcuZ2V0KCdzdHJva2UnKVxyXG4gICAgY29uc3Qgc3Ryb2tlV2lkdGggPSBlZGl0b3Iuc2V0dGluZy5nZXQoJ3N0cm9rZVdpZHRoJylcclxuICAgIHJlY3Quc2V0QXR0cmlidXRlKCdmaWxsJywgZmlsbClcclxuICAgIHJlY3Quc2V0QXR0cmlidXRlKCdzdHJva2UnLCBzdHJva2UpXHJcbiAgICByZWN0LnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgc3Ryb2tlV2lkdGgpXHJcblxyXG4gICAgZWRpdG9yLmdldEN1cnJlbnRMYXllcigpLmFwcGVuZENoaWxkKHJlY3QpXHJcblxyXG4gICAgdGhpcy5uZXh0U2libGluZyA9IHJlY3QubmV4dEVsZW1lbnRTaWJsaW5nIFxyXG4gICAgdGhpcy5wYXJlbnQgPSByZWN0LnBhcmVudEVsZW1lbnRcclxuICAgIHRoaXMuZWxlbWVudCA9IHJlY3RcclxuICB9XHJcblxyXG4gIHN0YXRpYyBuYW1lKCkge1xyXG4gICAgcmV0dXJuICdhZGRSZWN0J1xyXG4gIH1cclxuXHJcbiAgcmVkbygpIHtcclxuICAgIGlmICh0aGlzLm5leHRTaWJsaW5nKSB7XHJcbiAgICAgIHRoaXMucGFyZW50Lmluc2VydEJlZm9yZSh0aGlzLmVsZW1lbnQsIHRoaXMubmV4dFNpYmxpbmcpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1bmRvKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZSgpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRE1vdmUgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IoZWRpdG9yLCBlbHMsIGR4LCBkeSkge1xyXG4gICAgc3VwZXIoKVxyXG5cclxuICAgIHRoaXMuZHggPSBkeFxyXG4gICAgdGhpcy5keSA9IGR5XHJcbiAgICB0aGlzLmVscyA9IGVsc1xyXG5cclxuICAgIHRoaXMuZWxzLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICBlbC5kbW92ZSh0aGlzLmR4LCB0aGlzLmR5KVxyXG4gICAgfSlcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgc3RhdGljIG5hbWUoKSB7XHJcbiAgICByZXR1cm4gJ2Rtb3ZlJ1xyXG4gIH1cclxuXHJcbiAgcmVkbygpIHtcclxuICAgIHRoaXMuZWxzLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICBlbC5kbW92ZSh0aGlzLmR4LCB0aGlzLmR5KVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHVuZG8oKSB7XHJcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgZWwuZG1vdmUoLXRoaXMuZHgsIC10aGlzLmR5KVxyXG4gICAgfSlcclxuICB9XHJcbn0iLCJcclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIENvbW1hbmRNYW5hZ2VyXHJcbiAqIFxyXG4gKiDlkb3ku6TnrqHnkIbkuoZcclxuICogXHJcbiAqIENvbW1hbmRNYW5hZ2VyLnVuZG8oKVxyXG4gKiBDb21tYW5kTWFuYWdlci5yZWRvKClcclxuICovXHJcbmNsYXNzIENvbW1hbmRNYW5hZ2VyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucmVkb1N0YWNrID0gW11cclxuICAgIHRoaXMudW5kb1N0YWNrID0gW11cclxuICAgIHRoaXMuY29tbWFuZENsYXNzZXMgPSB7fVxyXG4gIH1cclxuICBzZXRFZGl0b3IoZWRpdG9yKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gIH1cclxuICBleGVjdXRlKG5hbWUsIC4uLmFyZ3MpIHtcclxuICAgIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKClcclxuICAgIGNvbnN0IENvbW1hbmRDbGFzcyA9IHRoaXMuY29tbWFuZENsYXNzZXNbbmFtZV1cclxuXHJcbiAgICBjb25zdCBjb21tYW5kID0gbmV3IENvbW1hbmRDbGFzcyh0aGlzLmVkaXRvciwgLi4uYXJncykgLy8g5Yib5bu6IGNvbW1hbmQg5a6e5L6LXHJcblxyXG4gICAgdGhpcy51bmRvU3RhY2sucHVzaChjb21tYW5kKVxyXG4gICAgdGhpcy5yZWRvU3RhY2sgPSBbXVxyXG4gIH1cclxuICB1bmRvKCkge1xyXG4gICAgaWYgKHRoaXMudW5kb1N0YWNrLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjb25zb2xlLmxvZygn5Yiw5aS05LqG77yM5peg5rOV57un57ut5pKk5ZueJylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCBjb21tYW5kID0gdGhpcy51bmRvU3RhY2sucG9wKClcclxuICAgIHRoaXMucmVkb1N0YWNrLnB1c2goY29tbWFuZClcclxuICAgIGNvbW1hbmQudW5kbygpXHJcbiAgfVxyXG4gIHJlZG8oKSB7XHJcbiAgICBpZiAodGhpcy5yZWRvU3RhY2subGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfliLDlpLTkuobvvIzml6Dms5Xnu6fnu63ph43lgZonKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IGNvbW1hbmQgPSB0aGlzLnJlZG9TdGFjay5wb3AoKVxyXG4gICAgdGhpcy51bmRvU3RhY2sucHVzaChjb21tYW5kKVxyXG4gICAgY29tbWFuZC5yZWRvKClcclxuICB9XHJcblxyXG4gIC8vIOazqOWGjOWRveS7pOexu+WIsOWRveS7pOeuoeeQhuWvueixoeS4reOAglxyXG4gIHJlc2lndGVyQ29tbWFuZENsYXNzKGNvbW1hbmRDbGFzcykge1xyXG4gICAgbmFtZSA9IGNvbW1hbmRDbGFzcy5uYW1lKCkudG9Mb3dlckNhc2UoKVxyXG4gICAgdGhpcy5jb21tYW5kQ2xhc3Nlc1tuYW1lXSA9IGNvbW1hbmRDbGFzc1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tbWFuZE1hbmFnZXIiLCIvLyDluLjph49cclxuXHJcbmNvbnN0IE5TID0ge1xyXG4gIEhUTUw6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJyxcclxuICBNQVRIOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCcsXHJcbiAgU0U6ICdodHRwOi8vc3ZnLWVkaXQuZ29vZ2xlY29kZS5jb20nLFxyXG4gIFNWRzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcclxuICBYTElOSzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLFxyXG4gIFhNTDogJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZScsXHJcbiAgWE1MTlM6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3htbG5zLycgLy8gc2VlIGh0dHA6Ly93d3cudzMub3JnL1RSL1JFQy14bWwtbmFtZXMvI3htbFJlc2VydmVkXHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gIE5TLFxyXG59IFxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBBY3RpdmVkRWxzTWFuYWdlciB9IGZyb20gXCIuL2FjdGl2ZWRFbHNNYW5hZ2VyXCJcclxuaW1wb3J0IHsgRWRpdG9yRXZlbnRDb250ZXh0IH0gZnJvbSBcIi4vZWRpdG9yRXZlbnRDb250ZXh0XCJcclxuaW1wb3J0IHsgSHVkTWFuYWdlciB9IGZyb20gXCIuL2xheWVyL2h1ZE1hbmFnZXJcIlxyXG5cclxuY2xhc3MgRWRpdG9yIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuc2V0dGluZyA9IG51bGxcclxuICAgIHRoaXMuY29tbWFuZE1hbmFnZXIgPSBudWxsXHJcbiAgICB0aGlzLnpvb21NYW5hZ2VyID0gbnVsbFxyXG4gICAgdGhpcy5hY3RpdmVkRWxzTWFuYWdlciA9IG5ldyBBY3RpdmVkRWxzTWFuYWdlcih0aGlzKVxyXG5cclxuXHJcbiAgICAvLyBjb25zdCBjb250ZW50V2lkdGggPSA0MDBcclxuICAgIC8vIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSAzMDBcclxuICAgIC8vIGNvbnN0IHN0YWdlV2lkdGggPSAxMDAwIC8vIOato+WcqOe6oOe7k+WRveWQjVxyXG4gICAgLy8gY29uc3Qgc3RhZ2VIZWlnaHQgPSA2MDBcclxuICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPSA4MDBcclxuICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0ID0gNTUwXHJcblxyXG4gICAgY29uc3Qgdmlld3BvcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgdmlld3BvcnQuaWQgPSAndmlld3BvcnQnXHJcbiAgICB2aWV3cG9ydC5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkICMwMDAnXHJcbiAgICB2aWV3cG9ydC5zdHlsZS53aWR0aCA9IHZpZXdwb3J0V2lkdGggKyAncHgnXHJcbiAgICB2aWV3cG9ydC5zdHlsZS5oZWlnaHQgPSB2aWV3cG9ydEhlaWdodCArICdweCdcclxuICAgIHRoaXMudmlld3BvcnQgPSB2aWV3cG9ydFxyXG4gICAgXHJcbiAgICBjb25zdCBzdmdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgc3ZnQ29udGFpbmVyLmlkID0gJ3N2Zy1jb250YWluZXInXHJcbiAgICBzdmdDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNkZGQnXHJcbiAgICBzdmdDb250YWluZXIuc3R5bGUud2lkdGggPSB2aWV3cG9ydFdpZHRoICsgJ3B4J1xyXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0ICsgJ3B4J1xyXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCdcclxuICAgIHRoaXMuc3ZnQ29udGFpbmVyID0gc3ZnQ29udGFpbmVyXHJcblxyXG4gICAgY29uc3Qgc3ZnUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJylcclxuICAgIHN2Z1Jvb3QuaWQgPSAnc3ZnLXJvb3QnXHJcbiAgICBzdmdSb290LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAxMDAwKVxyXG4gICAgc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDYwMClcclxuICAgIHN2Z1Jvb3Quc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAxMDAwIDYwMCcpXHJcbiAgICB0aGlzLnN2Z1Jvb3QgPSBzdmdSb290XHJcblxyXG4gICAgY29uc3Qgc3ZnU3RhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpXHJcbiAgICBzdmdTdGFnZS5pZCA9ICdzdmctc3RhZ2UnXHJcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgNDAwKVxyXG4gICAgc3ZnU3RhZ2Uuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAzMDApXHJcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ3gnLCAzMDApXHJcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ3knLCAxNTApXHJcbiAgICBzdmdTdGFnZS5zdHlsZS5vdmVyZmxvdyA9ICd2aXNpYmxlJ1xyXG4gICAgdGhpcy5zdmdTdGFnZSA9IHN2Z1N0YWdlXHJcblxyXG4gICAgY29uc3Qgc3ZnQmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2cnKVxyXG4gICAgc3ZnQmcuaWQgPSAnYmFja2dyb3VuZCdcclxuICAgIC8vIHN2Z0JnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCA0MDApXHJcbiAgICAvLyBzdmdCZy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDMwMClcclxuICAgIHN2Z0JnLnNldEF0dHJpYnV0ZSgneCcsIDApXHJcbiAgICBzdmdCZy5zZXRBdHRyaWJ1dGUoJ3knLCAwKVxyXG5cclxuICAgIGNvbnN0IGJnUmVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAncmVjdCcpXHJcbiAgICBiZ1JlY3Quc2V0QXR0cmlidXRlKCd3aWR0aCcsICcxMDAlJylcclxuICAgIGJnUmVjdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMDAlJylcclxuICAgIGJnUmVjdC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnI2ZmZicpXHJcblxyXG4gICAgY29uc3Qgc3ZnQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnZycpXHJcbiAgICBzdmdDb250ZW50LmlkID0gJ2NvbnRlbnQnXHJcbiAgICAvLyBzdmdDb250ZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCA0MDApXHJcbiAgICAvLyBzdmdDb250ZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgMzAwKVxyXG4gICAgc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3gnLCAwKVxyXG4gICAgc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3knLCAwKVxyXG4gICAgdGhpcy5zdmdDb250ZW50ID0gc3ZnQ29udGVudFxyXG5cclxuICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJylcclxuICAgIGxheWVyLmlkID0gJ2xheWVyLTEnXHJcbiAgICB0aGlzLmN1cnJlbnRMYXllciA9IGxheWVyXHJcblxyXG4gICAgdmlld3BvcnQuYXBwZW5kQ2hpbGQoc3ZnQ29udGFpbmVyKVxyXG4gICAgc3ZnQ29udGFpbmVyLmFwcGVuZENoaWxkKHN2Z1Jvb3QpXHJcbiAgICBzdmdSb290LmFwcGVuZENoaWxkKHN2Z1N0YWdlKVxyXG5cclxuICAgIHN2Z1N0YWdlLmFwcGVuZENoaWxkKHN2Z0JnKVxyXG4gICAgc3ZnQmcuYXBwZW5kQ2hpbGQoYmdSZWN0KVxyXG4gICAgc3ZnU3RhZ2UuYXBwZW5kQ2hpbGQoc3ZnQ29udGVudClcclxuICAgIHN2Z0NvbnRlbnQuYXBwZW5kQ2hpbGQobGF5ZXIpXHJcblxyXG5cclxuICAgIHRoaXMuaHVkTWFuYWdlciA9IG5ldyBIdWRNYW5hZ2VyKClcclxuICAgIHRoaXMuaHVkTWFuYWdlci5tb3VudChzdmdTdGFnZSlcclxuXHJcbiAgICAvLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZXdwb3J0KVxyXG4gIH1cclxuICBtb3VudChzZWxlY3Rvcikge1xyXG4gICAgY29uc3QgbW91bnROb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcclxuICAgIG1vdW50Tm9kZS5hcHBlbmRDaGlsZCh0aGlzLnZpZXdwb3J0KVxyXG4gIH1cclxuICBnZXRDdXJyZW50TGF5ZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50TGF5ZXJcclxuICB9XHJcblxyXG4gIHNldFRvb2xNYW5hZ2VyKHRvb2xNYW5hZ2VyKSB7XHJcbiAgICB0aGlzLnRvb2xNYW5hZ2VyID0gdG9vbE1hbmFnZXJcclxuICB9XHJcbiAgLy8gdG9vbCByZWxhdGl2ZWQgbWV0aG9kc1xyXG4gIHNldEN1cnJlbnRUb29sKG5hbWUpIHtcclxuICAgIHRoaXMudG9vbE1hbmFnZXIuc2V0Q3VycmVudFRvb2wobmFtZSlcclxuICB9XHJcbiAgcmVnaXN0ZXJUb29sKHRvb2wpIHtcclxuICAgIHRoaXMudG9vbE1hbmFnZXIucmVnaXN0ZXJUb29sKHRvb2wpXHJcbiAgfVxyXG4gIHNldFNldHRpbmcoc2V0dGluZykge1xyXG4gICAgdGhpcy5zZXR0aW5nID0gc2V0dGluZ1xyXG4gIH1cclxuXHJcbiAgLy8g5ZG95Luk55u45YWzXHJcbiAgc2V0Q29tbWFuZE1hbmFnZXIoY29tbWFuZE1hbmFnZXIpIHtcclxuICAgIHRoaXMuY29tbWFuZE1hbmFnZXIgPSBjb21tYW5kTWFuYWdlclxyXG4gICAgY29tbWFuZE1hbmFnZXIuc2V0RWRpdG9yKHRoaXMpXHJcbiAgfVxyXG4gIGV4ZWN1dGVDb21tYW5kKG5hbWUsIC4uLnBhcmFtcykge1xyXG4gICAgaWYgKG5hbWUgPT0gJ3VuZG8nKSB7XHJcbiAgICAgIHRoaXMuY29tbWFuZE1hbmFnZXIudW5kbygpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgaWYgKG5hbWUgPT0gJ3JlZG8nKSB7XHJcbiAgICAgIHRoaXMuY29tbWFuZE1hbmFnZXIucmVkbygpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgdGhpcy5jb21tYW5kTWFuYWdlci5leGVjdXRlKG5hbWUsIC4uLnBhcmFtcylcclxuICB9XHJcblxyXG4gIC8vIHpvb21cclxuICBzZXRab29tTWFuYWdlcih6b29tTWFuYWdlcikge1xyXG4gICAgem9vbU1hbmFnZXIuc2V0RWRpdG9yKHRoaXMpXHJcbiAgICB0aGlzLnpvb21NYW5hZ2VyID0gem9vbU1hbmFnZXJcclxuICB9XHJcbiAgZ2V0Wm9vbSgpIHsgLy8g5bCB6KOFXHJcbiAgICByZXR1cm4gdGhpcy56b29tTWFuYWdlci5nZXRab29tKClcclxuICB9XHJcblxyXG4gIGdldFNjcm9sbCgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IHRoaXMuc3ZnQ29udGFpbmVyLnNjcm9sbExlZnQsXHJcbiAgICAgIHk6IHRoaXMuc3ZnQ29udGFpbmVyLnNjcm9sbFRvcCxcclxuICAgIH1cclxuICB9XHJcbiAgc2V0U2Nyb2xsKHgsIHkpIHtcclxuICAgIHRoaXMuc3ZnQ29udGFpbmVyLnNjcm9sbExlZnQgPSB4XHJcbiAgICB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxUb3AgPSB5XHJcbiAgfVxyXG4gIGdldENvbnRlbnRPZmZzZXQoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiB0aGlzLnN2Z1N0YWdlLmdldEF0dHJpYnV0ZSgneCcpLFxyXG4gICAgICB5OiB0aGlzLnN2Z1N0YWdlLmdldEF0dHJpYnV0ZSgneScpLFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNDb250ZW50RWxlbWVudChlbCkge1xyXG4gICAgd2hpbGUgKGVsKSB7XHJcbiAgICAgIGlmIChlbC5wYXJlbnRFbGVtZW50ID09IHRoaXMuc3ZnQ29udGVudCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVsLnBhcmVudEVsZW1lbnQgPT0gdGhpcy5zdmdSb290KSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVkaXRvclxyXG4iLCJcclxuLyoqXHJcbiAqIGNvbnRleHQgY2xhc3NcclxuICogXHJcbiAqIHVzZWQgZm9yIHRvb2wgZXZlbnRcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgRWRpdG9yRXZlbnRDb250ZXh0IHtcclxuICBjb25zdHJ1Y3RvcihlZGl0b3IsIGUpIHtcclxuICAgIHRoaXMubW91c2VQcmVzc2VkID0gZmFsc2VcclxuICAgIHRoaXMub3JpZ2luRXZlbnQgPSBlXHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gICAgdGhpcy5pc0VuZEluc2lkZSA9IGZhbHNlXHJcblxyXG4gICAgdGhpcy5zdGFydFggPSAwXHJcbiAgICB0aGlzLnN0YXJ0WSA9IDBcclxuXHJcbiAgICB0aGlzLm9mZnNldFggPSAwXHJcbiAgICB0aGlzLm9mZnNldFkgPSAwXHJcblxyXG4gICAgdGhpcy5zdGFydENsaWVudFggPSAwIC8vIHVzZWQgdG8gY2FsYyBkeCBhbmQgZHkuXHJcbiAgICB0aGlzLnN0YXJ0Q2xpZW50WSA9IDBcclxuICAgIHRoaXMuZHggPSAwXHJcbiAgICB0aGlzLmR5ID0gMFxyXG5cclxuICAgIHRoaXMuc2V0U3RhcnRQb3MoKVxyXG4gIH1cclxuICBzZXRPcmlnaW5FdmVudChlKSB7XHJcbiAgICB0aGlzLm9yaWdpbkV2ZW50ID0gZVxyXG4gIH1cclxuICBzZXRTdGFydFBvcygpIHtcclxuICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5nZXRQb3MoKVxyXG5cclxuICAgIHRoaXMuc3RhcnRYID0geFxyXG4gICAgdGhpcy5zdGFydFkgPSB5XHJcblxyXG4gICAgdGhpcy5zdGFydENsaWVudFggPSB0aGlzLm9yaWdpbkV2ZW50LmNsaWVudFhcclxuICAgIHRoaXMuc3RhcnRDbGllbnRZID0gdGhpcy5vcmlnaW5FdmVudC5jbGllbnRZXHJcbiAgfVxyXG4gIHJlbGVhc2VNb3VzZSgpIHtcclxuICAgIHRoaXMubW91c2VQcmVzc2VkID0gZmFsc2VcclxuICB9XHJcbiAgcHJlc3NNb3VzZSgpIHtcclxuICAgIHRoaXMubW91c2VQcmVzc2VkID0gdHJ1ZVxyXG4gIH1cclxuICBnZXRQb3MoKSB7XHJcbiAgICBjb25zdCB6b29tID0gdGhpcy5lZGl0b3IuZ2V0Wm9vbSgpXHJcbiAgICBjb25zdCB7eCwgeX0gPSB0aGlzLmVkaXRvci5nZXRDb250ZW50T2Zmc2V0KClcclxuICAgIHJldHVybiB7IFxyXG4gICAgICB4OiB0aGlzLm9yaWdpbkV2ZW50Lm9mZnNldFggLyB6b29tIC0geCwgXHJcbiAgICAgIHk6IHRoaXMub3JpZ2luRXZlbnQub2Zmc2V0WSAvIHpvb20gLSB5LFxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRTdGFydFBvcygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IHRoaXMuc3RhcnRYLFxyXG4gICAgICB5OiB0aGlzLnN0YXJ0WSxcclxuICAgIH1cclxuICB9XHJcbiAgLy8gd2l0aG91dCBjYWxjIHdpdGggem9vbSB2YWx1ZVxyXG4gIGdldERpZmZQb3MoKSB7XHJcbiAgICBjb25zdCB4ID0gdGhpcy5vcmlnaW5FdmVudC5jbGllbnRYIC0gdGhpcy5zdGFydENsaWVudFhcclxuICAgIGNvbnN0IHkgPSB0aGlzLm9yaWdpbkV2ZW50LmNsaWVudFkgLSB0aGlzLnN0YXJ0Q2xpZW50WVxyXG4gICAgcmV0dXJuIHsgeCwgeSB9XHJcbiAgfVxyXG5cclxufSIsIlxyXG5leHBvcnQgY2xhc3MgRWRpdG9yU2V0dGluZyB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnNldHRpbmcgPSB7XHJcbiAgICAgIC8vIGZpbGw6ICcjZmZmJyxcclxuICAgICAgLy8gc3Ryb2tlOiAnIzAwMCcsXHJcbiAgICAgIC8vIHN0cm9rZVdpZHRoOiAnMnB4JyxcclxuXHJcbiAgICAgIC8vIG91dGxpbmVXaWR0aFxyXG4gICAgICAvLyBvdXRsaW5lQ29sb3JcclxuICAgIH1cclxuICAgIHRoaXMuYmluZGVkRXZlbnRGbnMgPSB7fVxyXG4gICAgdGhpcy5zZXRGaWxsKCcjZmZmJylcclxuICAgIHRoaXMuc2V0U3Ryb2tlKCcjMDAwJylcclxuICAgIHRoaXMuc2V0KCdzdHJva2VXaWR0aCcsICcxcHgnKVxyXG4gIH1cclxuICBzZXRGaWxsKHZhbCkge1xyXG4gICAgdGhpcy5zZXQoJ2ZpbGwnLCB2YWwpXHJcbiAgfVxyXG4gIHNldFN0cm9rZSh2YWwpIHtcclxuICAgIHRoaXMuc2V0KCdzdHJva2UnLCB2YWwpXHJcbiAgfVxyXG4gIHNldChuYW1lLCB2YWwpIHtcclxuICAgIHRoaXMuc2V0dGluZ1tuYW1lXSA9IHZhbFxyXG5cclxuICAgIGNvbnN0IHRvQ2FsbEZucyA9IHRoaXMuYmluZGVkRXZlbnRGbnNbbmFtZV1cclxuICAgIGlmICh0b0NhbGxGbnMpIHtcclxuICAgICAgdG9DYWxsRm5zLmZvckVhY2goZm4gPT4ge1xyXG4gICAgICAgIGZuKHZhbClcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0KG5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdbbmFtZV1cclxuICB9XHJcbiAgYmluZEV2ZW50KG5hbWUsIGZuKSB7XHJcbiAgICBpZiAoIXRoaXMuYmluZGVkRXZlbnRGbnNbbmFtZV0pIHtcclxuICAgICAgdGhpcy5iaW5kZWRFdmVudEZuc1tuYW1lXSA9IFtdXHJcbiAgICB9XHJcbiAgICB0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdLnB1c2goZm4pXHJcbiAgfVxyXG4gIHJlbW92ZUV2ZW50KG5hbWUsIGZuKSB7XHJcbiAgICBpZiAoIXRoaXMuYmluZGVkRXZlbnRGbnNbbmFtZV0pIHJldHVybiBmYWxzZVxyXG5cclxuICAgIGNvbnN0IHJlbW92ZUZuSWR4ID0gdGhpcy5iaW5kZWRFdmVudEZuc1tuYW1lXS5maW5kSW5kZXgoZm4pXHJcbiAgICBpZiAocmVtb3ZlRm5JZHggPT09IC0xKSByZXR1cm4gZmFsc2VcclxuICAgIHRoaXMuYmluZGVkRXZlbnRGbnMuc3BsaWNlKHJlbW92ZUZuSWR4LCAxKVxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcbn0iLCJcclxuLyoqXHJcbiAqIOWvuSBTVkcg5YWD57Sg55qE566A5Y2V5bCB6KOFXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEZFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuZWxfID0gbnVsbFxyXG4gIH1cclxuICBlbCgpIHtcclxuICAgIHJldHVybiB0aGlzLmVsX1xyXG4gIH1cclxuICBzZXRBdHRyKHByb3AsIHZhbCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxfLnNldEF0dHJpYnV0ZShwcm9wLCB2YWwpXHJcbiAgfVxyXG4gIGdldEF0dHIocHJvcCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxfLmdldEF0dHJpYnV0ZShwcm9wKVxyXG4gIH1cclxuICBnZXRCQm94KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxfLmdldEJCb3goKVxyXG4gIH1cclxufSIsImltcG9ydCB7IFJlY3QgfSBmcm9tIFwiLi9yZWN0XCJcclxuXHJcblxyXG4vKipcclxuICogRlNWR1xyXG4gKiBcclxuICogc2ltcGxlIFNWR0VsZW1lbnQgZW5jYXBzdWxhdGlvblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IEZTVkcgPSB7XHJcbiAgUmVjdCxcclxufSIsIlxyXG4vKipcclxuICog5a+5IHJlY3Qg5YWD57Sg55qE566A5Y2V5bCB6KOFXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgTlMgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCJcclxuaW1wb3J0IHsgRkVsZW1lbnQgfSBmcm9tIFwiLi9iYXNlRWxlbWVudFwiXHJcblxyXG5leHBvcnQgY2xhc3MgUmVjdCBleHRlbmRzIEZFbGVtZW50IHtcclxuICAvLyBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIpO1xyXG4gIC8vIGNvbnN0cnVjdG9yKGVsOiBTVkdFbGVtZW50KTtcclxuICBjb25zdHJ1Y3Rvcih4LCB5LCB3LCBoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICBpZiAodHlwZW9mIHggPT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhpcy5lbF8gPSB4XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVsXyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdyZWN0JylcclxuICAgICAgdGhpcy5lbF8uc2V0QXR0cigneCcsIHgpXHJcbiAgICAgIHRoaXMuZWxfLnNldEF0dHIoJ3knLCB5KVxyXG4gICAgICB0aGlzLmVsXy5zZXRBdHRyKCd3aWR0aCcsIHcpXHJcbiAgICAgIHRoaXMuZWxfLnNldEF0dHIoJ2hlaWdodCcsIGgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldFBvcygpIHtcclxuICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cigneCcpKVxyXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyKCd5JykpXHJcbiAgICByZXR1cm4geyB4LCB5IH1cclxuICB9XHJcbiAgZG1vdmUoZHgsIGR5KSB7XHJcbiAgICBjb25zdCBwb3MgPSB0aGlzLmdldFBvcygpXHJcbiAgICB0aGlzLnNldEF0dHIoJ3gnLCBwb3MueCArIGR4KVxyXG4gICAgdGhpcy5zZXRBdHRyKCd5JywgcG9zLnkgKyBkeSlcclxuICB9XHJcbn0iLCJpbXBvcnQgQ29tbWFuZE1hbmFnZXIgZnJvbSAnLi9jb21tYW5kTWFuYWdlci5qcydcclxuaW1wb3J0IEVkaXRvciBmcm9tICcuL2VkaXRvci5qcydcclxuaW1wb3J0IEFkZFJlY3QgZnJvbSAnLi9tb2R1bGVzL2FkZFJlY3QuanMnXHJcbmltcG9ydCB7IERyYWdDYW52YXMgfSBmcm9tICcuL21vZHVsZXMvZHJhZ0NhbnZhcy5qcydcclxuXHJcbmltcG9ydCB7IEFkZFJlY3RDb21tYW5kLCBETW92ZSB9IGZyb20gJy4vY29tbWFuZC5qcydcclxuaW1wb3J0IHsgRWRpdG9yU2V0dGluZyB9IGZyb20gJy4vZWRpdG9yU2V0dGluZy5qcydcclxuaW1wb3J0IHsgWm9vbU1hbmFnZXIgfSBmcm9tICcuL21vZHVsZXMvem9vbS5qcydcclxuaW1wb3J0IHsgU2VsZWN0IH0gZnJvbSAnLi9tb2R1bGVzL3NlbGVjdC5qcydcclxuaW1wb3J0IHsgVG9vbE1hbmFnZXIgfSBmcm9tICcuL3Rvb2xNYW5hZ2VyLmpzJ1xyXG5cclxuZnVuY3Rpb24gYWN0aXZlQnRuKG5hbWUpIHtcclxuICBuYW1lID0ge1xyXG4gICAgJ3NlbGVjdCc6ICdidG4tc2VsZWN0JyxcclxuICAgICdhZGRSZWN0JzogJ2J0bi1hZGQtcmVjdCcsXHJcbiAgICAnZHJhZ0NhbnZhcyc6ICdidG4tZHJhZy1jYW52YXMnLFxyXG4gIH1bbmFtZV1cclxuICBpZiAobmFtZSA9PSB1bmRlZmluZWQpIHJldHVyblxyXG5cclxuICBjb25zdCB0b29sQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rvb2wtYmFyJylcclxuICBjb25zdCB0b29sQnRucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRvb2xCYXIuY2hpbGRyZW4pXHJcbiAgdG9vbEJ0bnMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICB9KVxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5hbWUpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbn1cclxuXHJcblxyXG5jb25zdCBlZGl0b3IgPSBuZXcgRWRpdG9yKClcclxud2luZG93LmVkaXRvciA9IGVkaXRvciAvLyBkZWJ1ZyBpbiBkZXZ0b29sXHJcbi8vIHJlZ2lzdGVyIGNvbW1hbmRzXHJcbmNvbnN0IGNvbW1hbmRNYW5hZ2VyID0gbmV3IENvbW1hbmRNYW5hZ2VyKClcclxuY29tbWFuZE1hbmFnZXIucmVzaWd0ZXJDb21tYW5kQ2xhc3MoQWRkUmVjdENvbW1hbmQpXHJcbmNvbW1hbmRNYW5hZ2VyLnJlc2lndGVyQ29tbWFuZENsYXNzKERNb3ZlKVxyXG4vLyBzZXR0aW5nXHJcbmVkaXRvci5zZXRTZXR0aW5nKG5ldyBFZGl0b3JTZXR0aW5nKCkpXHJcblxyXG5lZGl0b3Iuc2V0Q29tbWFuZE1hbmFnZXIoY29tbWFuZE1hbmFnZXIpXHJcbi8vIHJlZ2lzdGVyIHRvb2xzXHJcblxyXG5jb25zdCB0b29sTWFuYWdlciA9IG5ldyBUb29sTWFuYWdlcihlZGl0b3IpXHJcbmVkaXRvci5zZXRUb29sTWFuYWdlcih0b29sTWFuYWdlcilcclxudG9vbE1hbmFnZXIucmVnaXN0ZXJUb29sKG5ldyBBZGRSZWN0KCkpXHJcbnRvb2xNYW5hZ2VyLnJlZ2lzdGVyVG9vbChuZXcgRHJhZ0NhbnZhcygpKVxyXG50b29sTWFuYWdlci5yZWdpc3RlclRvb2wobmV3IFNlbGVjdCgpKVxyXG5cclxuZWRpdG9yLnRvb2xNYW5hZ2VyLm9uU3dpdGNoVG9vbChuYW1lID0+IHtcclxuICBjb25zb2xlLmxvZygnc3dpdGNoZWQgdG9vbDonLCBuYW1lKVxyXG4gIGFjdGl2ZUJ0bihuYW1lKVxyXG59KVxyXG5cclxudG9vbE1hbmFnZXIuc2V0Q3VycmVudFRvb2woJ2FkZFJlY3QnKVxyXG50b29sTWFuYWdlci5iaW5kVG9vbEV2ZW50KClcclxuLy8gem9vbVxyXG5lZGl0b3Iuc2V0Wm9vbU1hbmFnZXIobmV3IFpvb21NYW5hZ2VyKCkpXHJcblxyXG5lZGl0b3IubW91bnQoJyNlZGl0b3ItYXJlYScpXHJcblxyXG5cclxuLyoqIFxyXG4gKiBiaW5kIGV2ZW50IGluIGJ1dHRvblxyXG4gKi8gXHJcbi8vIHVuZG9cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi11bmRvJykub25jbGljayA9ICgpID0+IHtcclxuICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3VuZG8nKVxyXG59XHJcbi8vIHJlZG9cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1yZWRvJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGVkaXRvci5leGVjdXRlQ29tbWFuZCgncmVkbycpXHJcbn1cclxuLy8gem9vbUluXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tem9vbS1pbicpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBlZGl0b3Iuem9vbU1hbmFnZXIuem9vbUluKClcclxufVxyXG4vLyB6b29tT3V0XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tem9vbS1vdXQnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgZWRpdG9yLnpvb21NYW5hZ2VyLnpvb21PdXQoKVxyXG59XHJcbi8vIHNlbGVjdCBhZGRSZWN0IHRvb2xcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1hZGQtcmVjdCcpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBlZGl0b3Iuc2V0Q3VycmVudFRvb2woJ2FkZFJlY3QnKVxyXG59XHJcbi8vIHNlbGVjdCBkcmFnY2FudmFzIHRvb2xcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1kcmFnLWNhbnZhcycpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBlZGl0b3Iuc2V0Q3VycmVudFRvb2woJ2RyYWdDYW52YXMnKVxyXG59XHJcbi8vIHNlbGVjdCB0b29sXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tc2VsZWN0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGVkaXRvci5zZXRDdXJyZW50VG9vbCgnc2VsZWN0JylcclxufVxyXG5cclxuXHJcbi8vIGdldCBhY3RpdmUgZWxlbWVudCBmaWxsIHZhbHVlXHJcbmNvbnN0IGZpbGxUZXh0Tm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbGVtZW50LWluZm8tZmlsbCcpXHJcbmVkaXRvci5zZXR0aW5nLmJpbmRFdmVudCgnZmlsbCcsIHZhbCA9PiB7XHJcbiAgZmlsbFRleHROb2RlLmlubmVySFRNTCA9IHZhbFxyXG59KVxyXG5cclxuLyoqXHJcbiAqIOeQhuaDsyBhcGkg5L2/55So5L6L5a2QXHJcbiAqIFxyXG4gKiBjb25zdCBlZGl0b3JCdWlsZGVyID0gbmV3IEVkaXRvci5idWlsZGVyKClcclxuICogZWRpdG9yQnVpbGRlclxyXG4gKiAgIC5zZXRDYW52YXNTaXplKDQwMCwgMzAwKVxyXG4gKiAgIC5zZXRTdGFnZVNpemUoMTAwMCwgODAwKVxyXG4gKiAgIC5zZXRWaWV3cG9ydFNpemUoODAwLCA1MDApXHJcbiAqICAgLnNldFpvb20oMTAwKVxyXG4gKiBcclxuICogY29uc3QgZWRpdG9yID0gZWRpdG9yQnVpbGRlci5idWlsZCgpXHJcbiAqIGVkaXRvci5yZWdpc3RlclRvb2wodG9vbE1vdmUpXHJcbiAqIFxyXG4gKi8iLCIvKipcclxuICogZ3VpZGUgbGluZSBsYXllclxyXG4gKi9cclxuXHJcbmltcG9ydCB7IE91dGxpbmVIdWQgfSBmcm9tIFwiLi9vdXRsaW5lSHVkXCI7XHJcbmltcG9ydCB7IFNlbGVjdEFyZWEgfSBmcm9tIFwiLi9zZWxlY3RBcmVhXCI7XHJcbmNvbnN0IHsgTlMgfSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgSHVkTWFuYWdlcntcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ2cnKVxyXG4gICAgdGhpcy5jb250YWluZXIuaWQgPSAnaHVkcydcclxuXHJcbiAgICB0aGlzLnNlbGVjdEFyZWEgPSBuZXcgU2VsZWN0QXJlYSh0aGlzLmNvbnRhaW5lcilcclxuICAgIHRoaXMub3V0bGluZUh1ZCA9IG5ldyBPdXRsaW5lSHVkKHRoaXMuY29udGFpbmVyKVxyXG4gIH1cclxuICBtb3VudChlbCkge1xyXG4gICAgZWwuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpXHJcbiAgfVxyXG59XHJcblxyXG4iLCJcclxuXHJcbiAgXHJcbmNvbnN0IHsgTlMgfSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XHJcblxyXG4vKipcclxuICogPHJlY3Q+IG91dGxpbmVcclxuICovXHJcbmV4cG9ydCBjbGFzcyBPdXRsaW5lSHVkIHtcclxuICBjb25zdHJ1Y3RvcihwYXJlbnQpIHtcclxuICAgIHRoaXMueCA9IDBcclxuICAgIHRoaXMueSA9IDBcclxuICAgIHRoaXMudyA9IDBcclxuICAgIHRoaXMuaCA9IDBcclxuXHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdnJylcclxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gJ291dGxpbmUtaHVkJ1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKVxyXG5cclxuICAgIHRoaXMub3V0bGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdwYXRoJylcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAnI2YwNCcpXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd2ZWN0b3ItZWZmZWN0JywgJ25vbi1zY2FsaW5nLXN0cm9rZScpXHJcblxyXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5vdXRsaW5lKVxyXG4gIH1cclxuICBjbGVhcigpIHtcclxuICAgIC8vIHBhcmVudC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgdGhpcy5vdXRsaW5lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICB9XHJcbiAgZHJhd1JlY3QoeCwgeSwgdywgaCkge1xyXG4gICAgdGhpcy54ID0geFxyXG4gICAgdGhpcy55ID0geVxyXG4gICAgdGhpcy53ID0gd1xyXG4gICAgdGhpcy5oID0gaFxyXG5cclxuICAgIC8vIHdoeSBkb24ndCBJIHVzZSByZWN0LCBqdXN0IHNvbHZlIHRoZSBjb25kaXRpb24gd2hlbiB3aWR0aCBvciBoZWlnaHQgaXMgMCB0aGUgb3V0bGluZSBpcyBkaXNhcHBlclxyXG4gICAgY29uc3QgZCA9IGBNICR7eH0gJHt5fSBMICR7eCt3fSAke3l9IEwgJHt4K3d9ICR7eStofSBMICR7eH0gJHt5K2h9IFpgXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdkJywgZClcclxuICAgIHRoaXMub3V0bGluZS5zdHlsZS5kaXNwbGF5ID0gJydcclxuICB9XHJcbiAgZ2V0V2lkdGgoKSB7IHJldHVybiB0aGlzLncgfVxyXG4gIGdldEhlaWdodCgpIHsgcmV0dXJuIHRoaXMuaCB9XHJcbiAgZ2V0WCgpIHsgcmV0dXJuIHRoaXMueCB9XHJcbiAgZ2V0WSgpIHsgcmV0dXJuIHRoaXMueSB9XHJcbn0iLCJcclxuY29uc3QgeyBOUyB9ID0gcmVxdWlyZShcIi4uL2NvbnN0YW50c1wiKTtcclxuXHJcbi8qKlxyXG4gKiBzZWxlY3QgYXJlYVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlbGVjdEFyZWEge1xyXG4gIGNvbnN0cnVjdG9yKHBhcmVudCkge1xyXG4gICAgdGhpcy54ID0gMFxyXG4gICAgdGhpcy55ID0gMFxyXG4gICAgdGhpcy53ID0gMFxyXG4gICAgdGhpcy5oID0gMFxyXG5cclxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ2cnKVxyXG4gICAgdGhpcy5jb250YWluZXIuaWQgPSAnc2VsZWN0LWFyZWEnXHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpXHJcblxyXG4gICAgdGhpcy5vdXRsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ3BhdGgnKVxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJylcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICcjMDU0JylcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3ZlY3Rvci1lZmZlY3QnLCAnbm9uLXNjYWxpbmctc3Ryb2tlJylcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1kYXNoYXJyYXknLCAnNHB4JylcclxuXHJcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLm91dGxpbmUpXHJcbiAgfVxyXG4gIGNsZWFyKCkge1xyXG4gICAgLy8gcGFyZW50LmlubmVySFRNTCA9ICcnXHJcbiAgICB0aGlzLm91dGxpbmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gIH1cclxuICBkcmF3UmVjdCh4LCB5LCB3LCBoKSB7XHJcbiAgICB0aGlzLnggPSB4XHJcbiAgICB0aGlzLnkgPSB5XHJcbiAgICB0aGlzLncgPSB3XHJcbiAgICB0aGlzLmggPSBoXHJcblxyXG4gICAgLy8gd2h5IGRvbid0IEkgdXNlIHJlY3QsIGp1c3Qgc29sdmUgdGhlIGNvbmRpdGlvbiB3aGVuIHdpZHRoIG9yIGhlaWdodCBpcyAwIHRoZSBvdXRsaW5lIGlzIGRpc2FwcGVyXHJcbiAgICBjb25zdCBkID0gYE0gJHt4fSAke3l9IEwgJHt4K3d9ICR7eX0gTCAke3grd30gJHt5K2h9IEwgJHt4fSAke3kraH0gWmBcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2QnLCBkKVxyXG5cclxuICAgIC8qIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3gnLCB4KVxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgneScsIHkpXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHcpXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoKSAqL1xyXG4gICAgdGhpcy5vdXRsaW5lLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gIH1cclxuICBnZXRXaWR0aCgpIHsgcmV0dXJuIHRoaXMudyB9XHJcbiAgZ2V0SGVpZ2h0KCkgeyByZXR1cm4gdGhpcy5oIH1cclxuICBnZXRYKCkgeyByZXR1cm4gdGhpcy54IH1cclxuICBnZXRZKCkgeyByZXR1cm4gdGhpcy55IH1cclxufSIsIlxyXG5pbXBvcnQgeyBnZXRCb3hCeTJwb2ludHMgfSBmcm9tIFwiLi4vdXRpbC9tYXRoXCJcclxuXHJcbmNsYXNzIEFkZFJlY3Qge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBudWxsXHJcbiAgfVxyXG4gIG5hbWUoKSB7XHJcbiAgICByZXR1cm4gJ2FkZFJlY3QnXHJcbiAgfVxyXG4gIHNldEVkaXRvcihlZGl0b3IpIHsgLy8g5L6d6LWW5rOo5YWlXHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gIH1cclxuICBzdGFydChjdHgpIHt9XHJcbiAgbW92ZShjdHgpIHtcclxuICAgIGNvbnN0IHsgeDogZW5kWCwgeTogZW5kWSB9ID0gY3R4LmdldFBvcygpXHJcbiAgICBjb25zdCB7IHg6IHN0YXJ0WCwgeTogc3RhcnRZIH0gPSBjdHguZ2V0U3RhcnRQb3MoKVxyXG4gICAgY29uc3QgeyB4LCB5LCB3LCBoIH0gPSBnZXRCb3hCeTJwb2ludHMoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpXHJcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuZHJhd1JlY3QoeCwgeSwgdywgaClcclxuICB9XHJcbiAgZW5kKGN0eCkge1xyXG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lSHVkLmNsZWFyKClcclxuXHJcbiAgICBjb25zdCB7IHg6IGVuZFgsIHk6IGVuZFkgfSA9IGN0eC5nZXRQb3MoKVxyXG4gICAgY29uc3QgeyB4OiBzdGFydFgsIHk6IHN0YXJ0WSB9ID0gY3R4LmdldFN0YXJ0UG9zKClcclxuICAgIGNvbnN0IHsgeCwgeSwgdywgaCB9ID0gZ2V0Qm94QnkycG9pbnRzKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZKVxyXG4gICAgaWYgKHcgPCAyICYmIGggPCAyKSB7XHJcbiAgICAgIC8vIFRPRE86IG9wZW4gYSBkaWFsb2cgdG8gaW5wdXQgd2lkdGggYW5kIGhlaWdodFxyXG4gICAgICBjb25zb2xlLmxvZygnd2lkdGggYW5kIGhlaWdodCBib3RoIGxlc3MgZXF1YWwgdG8gMu+8jGRyYXdpbmcgbm90aGluZycpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgdGhpcy5lZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ2FkZFJlY3QnLCB4LCB5LCB3LCBoKVxyXG4gIH1cclxuICAvLyBtb3VzZWRvd24gb3V0c2lkZSB2aWV3cG9ydFxyXG4gIGVuZE91dHNpZGUoKSB7XHJcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuY2xlYXIoKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWRkUmVjdCIsIlxyXG5leHBvcnQgY2xhc3MgRHJhZ0NhbnZhcyB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnN0YXJ0T2Zmc2V0WCA9IDBcclxuICAgIHRoaXMuc3RhcnRPZmZzZXRZID0gMFxyXG4gIH1cclxuICBuYW1lKCkge1xyXG4gICAgcmV0dXJuICdkcmFnQ2FudmFzJ1xyXG4gIH1cclxuICBzZXRFZGl0b3IoZWRpdG9yKSB7IC8vIOS+nei1luazqOWFpVxyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICB9XHJcbiAgYmVmb3JlQWN0aXZlKCkge1xyXG4gICAgLy8gZG8gc29tZXRoaW5nIGJlZm9yZSBzd2l0Y2ggdG8gY3VycmVudCB0b29sXHJcbiAgfVxyXG4gIHN0YXJ0KGN0eCkge1xyXG4gICAgY29uc3Qgc2Nyb2xsID0gdGhpcy5lZGl0b3IuZ2V0U2Nyb2xsKClcclxuICAgIHRoaXMuc3RhcnRPZmZzZXRYID0gc2Nyb2xsLnhcclxuICAgIHRoaXMuc3RhcnRPZmZzZXRZID0gc2Nyb2xsLnlcclxuICB9XHJcbiAgbW92ZShjdHgpIHtcclxuICAgIGNvbnN0IHpvb20gPSB0aGlzLmVkaXRvci5nZXRab29tKClcclxuICAgIGNvbnN0IHsgeDogZHgsIHk6IGR5IH0gPSBjdHguZ2V0RGlmZlBvcygpXHJcbiAgICB0aGlzLmVkaXRvci5zZXRTY3JvbGwodGhpcy5zdGFydE9mZnNldFggLSBkeCwgdGhpcy5zdGFydE9mZnNldFkgLSBkeSlcclxuICB9XHJcbiAgZW5kKCkge31cclxuICBlbmRPdXRzaWRlKCkge31cclxufVxyXG4iLCJpbXBvcnQgeyBGU1ZHIH0gZnJvbSBcIi4uL2VsZW1lbnRcIlxyXG5pbXBvcnQgeyBnZXRCb3hCeTJwb2ludHMgfSBmcm9tIFwiLi4vdXRpbC9tYXRoXCJcclxuXHJcbi8qKlxyXG4gKiBzZWxlY3RcclxuICogXHJcbiAqIOatpOaooeWdl+mdnuW4uOWkjeadglxyXG4gKiBcclxuICogMS4g6byg5qCH5oyJ5LiL5pe277yM6YCJ5Lit5Y2V5Liq5YWD57SgXHJcbiAqIDIuIOm8oOagh+aMieS4i+S4uuepuu+8jOaLluaLveaXtuS6p+eUn+mAieS4reahhu+8jOWPr+S7pemAieaLqeWkmuS4quWFg+e0oFxyXG4gKiAzLiDpgInkuK3ljZXkuKrvvIjmiJbpgInljLrpgInkuK3lpJrkuKrvvIkg57yp5pS+IOetieaOp+WItueCue+8jOaLluaLveaUueWPmOWuvemrmFxyXG4gKiAzLiDliIfmlq3liIDov5nkuKrlt6Xlhbfml7bvvIzmv4DmtLvnmoTlhYPntKDov5vlhaXooqvpgInkuK3nirbmgIHvvIjova7lu5Pnur8r5o6n5Yi254K577yJ44CCXHJcbiAqIDQuIOmAieWMuuWSjOWFg+e0oOebuOS6pOeahOWIpOWumlxyXG4gKiA1LiDmv4DmtLvlhYPntKDlpoLkvZXkv53lrZjvvIzkv53lrZjliLDlk6rph4xcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3Qge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBudWxsXHJcbiAgICB0aGlzLnNlbGVjdGVkRWxzID0gW11cclxuXHJcbiAgICB0aGlzLm91dGxpbmVTdGFydFggPSAwXHJcbiAgICB0aGlzLm91dGxpbmVTdGFydFkgPSAwXHJcbiAgfVxyXG4gIG5hbWUoKSB7XHJcbiAgICByZXR1cm4gJ3NlbGVjdCdcclxuICB9XHJcbiAgc2V0RWRpdG9yKGVkaXRvcikge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICB9XHJcbiAgaGFzU2VsZWN0ZWRFbHNXaGVuU3RhcnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEVscy5sZW5ndGggPiAwXHJcbiAgfVxyXG4gIHN0YXJ0KGN0eCkge1xyXG4gICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGN0eC5vcmlnaW5FdmVudC50YXJnZXRcclxuICAgIGlmICghdGhpcy5lZGl0b3IuaXNDb250ZW50RWxlbWVudCh0YXJnZXRFbGVtZW50KSkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0YXJnZXRGRWxlbWVudCA9IG5ldyBGU1ZHLlJlY3QodGFyZ2V0RWxlbWVudCkgLy8g5pqC5pe25Y+q5pivIHJlY3QgVE9ETzog5pS55Li66YCa55So5YaZ5rOVXHJcbiAgICB0aGlzLnNlbGVjdGVkRWxzID0gWyB0YXJnZXRGRWxlbWVudCBdIC8vIOm8oOagh+aMieS4i+aXtu+8jOWwsemAieS4reS6huS4gOS4quWFg+e0oFxyXG4gICAgY29uc3QgeCA9IHBhcnNlRmxvYXQodGFyZ2V0RkVsZW1lbnQuZ2V0QXR0cigneCcpKVxyXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQodGFyZ2V0RkVsZW1lbnQuZ2V0QXR0cigneScpKVxyXG4gICAgY29uc3QgdyA9IHBhcnNlRmxvYXQodGFyZ2V0RkVsZW1lbnQuZ2V0QXR0cignd2lkdGgnKSlcclxuICAgIGNvbnN0IGggPSBwYXJzZUZsb2F0KHRhcmdldEZFbGVtZW50LmdldEF0dHIoJ2hlaWdodCcpKVxyXG5cclxuICAgIHRoaXMub3V0bGluZVN0YXJ0WCA9IHhcclxuICAgIHRoaXMub3V0bGluZVN0YXJ0WSA9IHlcclxuXHJcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuZHJhd1JlY3QoeCwgeSwgdywgaClcclxuICB9XHJcbiAgbW92ZShjdHgpIHtcclxuICAgIGlmICghdGhpcy5oYXNTZWxlY3RlZEVsc1doZW5TdGFydCgpKSB7IC8vIGRyYXcgc2VsZWN0aW5nIGFyZWFcclxuICAgICAgLy8gc2VsZWN0IG5vIGVsZW1lbnQsIGRyYXcgc2VsZWN0IHJlY3RcclxuICAgICAgY29uc3QgeyB4OiBlbmRYLCB5OiBlbmRZIH0gPSBjdHguZ2V0UG9zKClcclxuICAgICAgY29uc3QgeyB4OiBzdGFydFgsIHk6IHN0YXJ0WSB9ID0gY3R4LmdldFN0YXJ0UG9zKClcclxuICAgICAgY29uc3QgeyB4LCB5LCB3LCBoIH0gPSBnZXRCb3hCeTJwb2ludHMoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpXHJcbiAgICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIuc2VsZWN0QXJlYS5kcmF3UmVjdCh4LCB5LCB3LCBoKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IHg6IGR4LCB5OiBkeSB9ID0gY3R4LmdldERpZmZQb3MoKVxyXG4gICAgY29uc3Qgb3V0bGluZUh1ZCA9IHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIub3V0bGluZUh1ZFxyXG4gICAgY29uc3QgdyA9IG91dGxpbmVIdWQuZ2V0V2lkdGgoKVxyXG4gICAgY29uc3QgaCA9IG91dGxpbmVIdWQuZ2V0SGVpZ2h0KClcclxuICAgIG91dGxpbmVIdWQuZHJhd1JlY3QodGhpcy5vdXRsaW5lU3RhcnRYICsgZHgsIHRoaXMub3V0bGluZVN0YXJ0WSArIGR5LCB3LCBoKVxyXG4gIH1cclxuICBlbmQoY3R4KSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzU2VsZWN0ZWRFbHNXaGVuU3RhcnQoKSkgeyAvLyBmaW5pc2hlZCBkcmF3biBzZWxlY3RpbmcgYXJlYVxyXG4gICAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLnNlbGVjdEFyZWEuY2xlYXIoKVxyXG4gICAgICAvLyBUT0RPOiBhY3RpdmUgZnJhbWUgYnkgc2VsZWN0IHJlY3QuXHJcbiAgICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLmNsZWFyKClcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuY2xlYXIoKVxyXG5cclxuICAgIFxyXG4gICAgY29uc3QgeyB4OiBkeCwgeTogZHkgfSA9IGN0eC5nZXREaWZmUG9zKClcclxuICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdkbW92ZScsIHRoaXMuc2VsZWN0ZWRFbHMsIGR4LCBkeSlcclxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVscyh0aGlzLnNlbGVjdGVkRWxzKSAvLyBzZXQgZ2xvYmFsIGFjdGl2ZWQgZWxlbWVudHNcclxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxyXG4gIH1cclxuICAvLyBtb3VzZWRvd24gb3V0c2lkZSB2aWV3cG9ydFxyXG4gIGVuZE91dHNpZGUoKSB7XHJcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuY2xlYXIoKVxyXG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5zZWxlY3RBcmVhLmNsZWFyKClcclxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLmNsZWFyKClcclxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxyXG4gIH1cclxufVxyXG4iLCIvKiogem9vbSAqL1xyXG5cclxuY29uc3QgeyBnZXRWaWV3Qm94IH0gPSByZXF1aXJlKFwiLi4vdXRpbC9zdmdcIilcclxuXHJcbmV4cG9ydCBjbGFzcyBab29tTWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcclxuICB9XHJcbiAgc2V0RWRpdG9yKGVkaXRvcikge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICB9XHJcbiAgZ2V0Wm9vbSgpIHtcclxuICAgIGNvbnN0IGFjdHVsV2lkdGggPSBwYXJzZUZsb2F0KHRoaXMuZWRpdG9yLnN2Z1Jvb3QuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKVxyXG4gICAgY29uc3Qgdmlld0JveCA9IGdldFZpZXdCb3godGhpcy5lZGl0b3Iuc3ZnUm9vdClcclxuICAgIGNvbnN0IHpvb20gPSBhY3R1bFdpZHRoIC8gdmlld0JveC53XHJcbiAgICByZXR1cm4gem9vbVxyXG4gIH1cclxuICBzZXRab29tKHpvb20pIHtcclxuICAgIGNvbnNvbGUubG9nKHpvb20pXHJcbiAgICBjb25zdCB2aWV3Qm94ID0gZ2V0Vmlld0JveCh0aGlzLmVkaXRvci5zdmdSb290KVxyXG4gICAgY29uc3Qgd2lkdGggPSB2aWV3Qm94LncgKiB6b29tXHJcbiAgICBjb25zdCBoZWlnaHQgPSB2aWV3Qm94LmggKiB6b29tXHJcbiAgICB0aGlzLmVkaXRvci5zdmdSb290LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aClcclxuICAgIHRoaXMuZWRpdG9yLnN2Z1Jvb3Quc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoZWlnaHQpXHJcbiAgfVxyXG4gIHpvb21JbigpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRab29tID0gdGhpcy5nZXRab29tKClcclxuICAgIHRoaXMuc2V0Wm9vbShjdXJyZW50Wm9vbSArIDAuMSlcclxuICB9XHJcbiAgem9vbU91dCgpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRab29tID0gdGhpcy5nZXRab29tKClcclxuICAgIHRoaXMuc2V0Wm9vbShjdXJyZW50Wm9vbSAtIDAuMSlcclxuICB9XHJcbn0iLCJjb25zdCB7IEVkaXRvckV2ZW50Q29udGV4dCB9ID0gcmVxdWlyZShcIi4vZWRpdG9yRXZlbnRDb250ZXh0XCIpXHJcblxyXG5leHBvcnQgY2xhc3MgVG9vbE1hbmFnZXIge1xyXG4gIGNvbnN0cnVjdG9yKGVkaXRvcikge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICAgIHRoaXMudG9vbHMgPSB7fVxyXG4gICAgdGhpcy5jdXJyZW50VG9vbCA9IG51bGxcclxuICAgIHRoaXMuaW52b2tlV2hlblN3aXRjaCA9ICgpID0+IHt9XHJcblxyXG4gICAgdGhpcy5jdHggPSBudWxsIC8vIHRvb2wgY29udGV4dFxyXG4gIH1cclxuICBzZXRDdXJyZW50VG9vbChuYW1lKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRUb29sID0gdGhpcy50b29sc1tuYW1lXVxyXG4gICAgdGhpcy5pbnZva2VXaGVuU3dpdGNoKHRoaXMuZ2V0Q3VycmVudFRvb2xOYW1lKCkpXHJcbiAgfVxyXG4gIG9uU3dpdGNoVG9vbChmbikge1xyXG4gICAgdGhpcy5pbnZva2VXaGVuU3dpdGNoID0gZm5cclxuICB9XHJcbiAgZ2V0Q3VycmVudFRvb2xOYW1lKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFRvb2wubmFtZSgpXHJcbiAgfVxyXG4gIHJlZ2lzdGVyVG9vbCh0b29sKSB7XHJcbiAgICB0aGlzLnRvb2xzW3Rvb2wubmFtZSgpXSA9IHRvb2xcclxuICAgIHRvb2wuc2V0RWRpdG9yKHRoaXMuZWRpdG9yKSAvLyBkZXBlbmRlbmN5IGluamVjdGlvblxyXG4gIH1cclxuXHJcbiAgYmluZFRvb2xFdmVudCgpIHtcclxuICAgIGNvbnN0IHN2Z1Jvb3QgPSB0aGlzLmVkaXRvci5zdmdSb290XHJcblxyXG4gICAgc3ZnUm9vdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBlID0+IHtcclxuICAgICAgY29uc3QgY3R4ID0gbmV3IEVkaXRvckV2ZW50Q29udGV4dCh0aGlzLmVkaXRvciwgZSlcclxuICAgICAgdGhpcy5jdHggPSBjdHhcclxuICAgICAgdGhpcy5jdXJyZW50VG9vbC5zdGFydChjdHgpXHJcbiAgICB9LCBmYWxzZSlcclxuXHJcbiAgICBzdmdSb290LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGUgPT4ge1xyXG4gICAgICBjb25zdCBjdHggPSB0aGlzLmN0eFxyXG5cclxuICAgICAgaWYgKCFjdHgpIHJldHVybiAvLyBpZiBjdHggZXhpdHMsIHByZXNlbnQgbW91c2Vkb3duIGV2ZW50IGVtaXQganVzdCBiZWZvcmVcclxuICAgICAgY3R4LnNldE9yaWdpbkV2ZW50KGUpXHJcbiAgICAgIGN0eC5wcmVzc01vdXNlKClcclxuICAgICAgdGhpcy5jdXJyZW50VG9vbC5tb3ZlKGN0eCkgLy8gbW92ZVxyXG4gICAgfSwgZmFsc2UpXHJcbiAgICBcclxuICAgIHN2Z1Jvb3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGUgPT4ge1xyXG4gICAgICAvLyB0aGlzLmN0eC5yZWxlYXNlTW91c2UoKVxyXG4gICAgICBjb25zdCBjdHggPSB0aGlzLmN0eFxyXG4gICAgICAvLyBjdHguc2V0T3JpZ2luRXZlbnQoZSkgLy8gdGhlIG9mZnNldFggYW5kIG9mZnNldFkgaW4gbW91c2V1cCBhbmQgdGhlIGxhc3QgbW91c2Vtb3ZlIGlzIG5vdCBlcXVhbCA/PyBcclxuICAgICAgdGhpcy5jdXJyZW50VG9vbC5lbmQoY3R4KVxyXG4gICAgICBjdHguaXNFbmRJbnNpZGUgPSB0cnVlXHJcbiAgICB9LCBmYWxzZSlcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGUgPT4ge1xyXG4gICAgICBpZiAodGhpcy5jdHggJiYgdGhpcy5jdHguaXNFbmRJbnNpZGUgPT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUb29sLmVuZE91dHNpZGUodGhpcy5jdHgpXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jdHggPSBudWxsXHJcbiAgICB9LCBmYWxzZSlcclxuICB9XHJcbn0iLCJcclxuZXhwb3J0IGZ1bmN0aW9uIGdldEJveEJ5MnBvaW50cyh4MSwgeTEsIHgyLCB5Mikge1xyXG4gIGxldCB4LCB5LCB3LCBoXHJcbiAgdyA9IE1hdGguYWJzKHgyIC0geDEpXHJcbiAgaCA9IE1hdGguYWJzKHkyIC0geTEpXHJcbiAgeCA9IE1hdGgubWluKHgyLCB4MSlcclxuICB5ID0gTWF0aC5taW4oeTIsIHkxKVxyXG4gIHJldHVybiB7IHgsIHksIHcsIGggfVxyXG59IiwiXHJcbi8vIFRPRE86IHRvIGZpbmlzaFxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Vmlld0JveChlbCkge1xyXG4gIGNvbnN0IHZhbCA9IGVsLmdldEF0dHJpYnV0ZSgndmlld0JveCcpXHJcbiAgaWYgKCF2YWwpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignaGFzIG5vdCB2aWV3Qm94IGF0dHJpYnV0ZScpXHJcbiAgfVxyXG4gIGNvbnN0IFt4LCB5LCB3LCBoXSA9IHZhbC5zcGxpdCgvW1xccyxdKy8pLm1hcChpdGVtID0+IHBhcnNlRmxvYXQoaXRlbSkpXHJcbiAgcmV0dXJuIHsgeCwgeSwgdywgaCB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9