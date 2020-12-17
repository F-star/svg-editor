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
  setElsAttr(name, val) {
    this.els.forEach(el => {
      el.setAttr(name, val)
    })
  }
}

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.js */ "./src/editor.js");
/* harmony import */ var _modules_addRect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/addRect.js */ "./src/modules/addRect.js");
/* harmony import */ var _modules_dragCanvas_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/dragCanvas.js */ "./src/modules/dragCanvas.js");
/* harmony import */ var _command_commandManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./command/commandManager.js */ "./src/command/commandManager.js");
/* harmony import */ var _setting_editorSetting_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./setting/editorSetting.js */ "./src/setting/editorSetting.js");
/* harmony import */ var _modules_zoom_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/zoom.js */ "./src/modules/zoom.js");
/* harmony import */ var _modules_select_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/select.js */ "./src/modules/select.js");
/* harmony import */ var _toolManager_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./toolManager.js */ "./src/toolManager.js");

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


const editor = new _editor_js__WEBPACK_IMPORTED_MODULE_0__.default()
window.editor = editor // debug in devtool

const commandManager = new _command_commandManager_js__WEBPACK_IMPORTED_MODULE_3__.default(editor)
editor.setCommandManager(commandManager)

editor.setSetting(new _setting_editorSetting_js__WEBPACK_IMPORTED_MODULE_4__.EditorSetting())
// register tools

const toolManager = new _toolManager_js__WEBPACK_IMPORTED_MODULE_7__.ToolManager(editor)
editor.setToolManager(toolManager)
toolManager.registerTool(new _modules_addRect_js__WEBPACK_IMPORTED_MODULE_1__.default())
toolManager.registerTool(new _modules_dragCanvas_js__WEBPACK_IMPORTED_MODULE_2__.DragCanvas())
toolManager.registerTool(new _modules_select_js__WEBPACK_IMPORTED_MODULE_6__.Select())

editor.toolManager.onSwitchTool(name => {
  console.log('switched tool:', name)
  activeBtn(name)
})

toolManager.setCurrentTool('addRect')
toolManager.bindToolEvent()
// zoom
editor.setZoomManager(new _modules_zoom_js__WEBPACK_IMPORTED_MODULE_5__.ZoomManager())

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


// fill value control
const fillTextNode = document.querySelector('#element-info-fill')
fillTextNode.innerHTML = editor.setting.get('fill')
editor.setting.bindEvent('fill', val => {
  fillTextNode.innerHTML = val
})
document.querySelector('#set-fill-btn').onclick = function() {
  const fill = window.prompt('Please input valid color value（like #ffce43）', editor.setting.get('fill'))
  if (!fill) return
  fillTextNode.innerHTML = fill

  editor.setting.setFill(fill)
  editor.activedElsManager.setElsAttr('fill', fill)
}

// stroke value control
const strokeTextNode = document.querySelector('#element-info-stroke')
strokeTextNode.innerHTML = editor.setting.get('stroke')
editor.setting.bindEvent('stroke', val => {
  strokeTextNode.innerHTML = val
})
document.querySelector('#set-stroke-btn').onclick = function() {
  const stroke = window.prompt('Please input valid color value（like #ffce43）', editor.setting.get('stroke'))
  if (!stroke) return
  strokeTextNode.innerHTML = stroke

  editor.setting.setStroke(stroke)
  editor.activedElsManager.setElsAttr('stroke', stroke)
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

/***/ "./src/command/commandManager.js":
/*!***************************************!*\
  !*** ./src/command/commandManager.js ***!
  \***************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _commands__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commands */ "./src/command/commands.js");




/**
 * CommandManager
 * 
 * 命令管理了
 * 
 * CommandManager.undo()
 * CommandManager.redo()
 */

;

class CommandManager {
  constructor(editor) {
    this.editor = editor
    this.redoStack = []
    this.undoStack = []
    this.commandClasses = {}

    this.resigterCommandClass(_commands__WEBPACK_IMPORTED_MODULE_0__.AddRectCommand)
    this.resigterCommandClass(_commands__WEBPACK_IMPORTED_MODULE_0__.DMove)
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
  afterUndo() {

  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommandManager);

/***/ }),

/***/ "./src/command/commands.js":
/*!*********************************!*\
  !*** ./src/command/commands.js ***!
  \*********************************/
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
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
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

/***/ "./src/setting/editorSetting.js":
/*!**************************************!*\
  !*** ./src/setting/editorSetting.js ***!
  \**************************************/
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
/******/ 	__webpack_require__("./src/app.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2FjdGl2ZWRFbHNNYW5hZ2VyLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvY29tbWFuZC9jb21tYW5kTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2NvbW1hbmQvY29tbWFuZHMuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3JFdmVudENvbnRleHQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lbGVtZW50L2Jhc2VFbGVtZW50LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvZWxlbWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2VsZW1lbnQvcmVjdC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2xheWVyL2h1ZE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9sYXllci9vdXRsaW5lSHVkLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbGF5ZXIvc2VsZWN0QXJlYS5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvYWRkUmVjdC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvZHJhZ0NhbnZhcy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvc2VsZWN0LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy96b29tLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvc2V0dGluZy9lZGl0b3JTZXR0aW5nLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvdG9vbE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy91dGlsL21hdGguanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy91dGlsL3N2Zy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG9CQUFvQjtBQUNqQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pEQSxDQUFnQztBQUNVO0FBQ1U7QUFDSTtBQUNFO0FBQ1g7QUFDSDtBQUNFOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7OztBQUdBLG1CQUFtQiwrQ0FBTTtBQUN6Qjs7QUFFQSwyQkFBMkIsK0RBQWM7QUFDekM7O0FBRUEsc0JBQXNCLG9FQUFhO0FBQ25DOztBQUVBLHdCQUF3Qix3REFBVztBQUNuQztBQUNBLDZCQUE2Qix3REFBTztBQUNwQyw2QkFBNkIsOERBQVU7QUFDdkMsNkJBQTZCLHNEQUFNOztBQUVuQztBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix5REFBVzs7QUFFckM7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBa0Q7O0FBRWxEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4QkFBOEIscURBQWM7QUFDNUMsOEJBQThCLDRDQUFLO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlFQUFlLGM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pFZixDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsOENBQU07QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQSxDQUF1RDtBQUNFO0FBQ1Y7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsaUVBQWlCOzs7QUFHbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakRBLE9BQU8scUJBQXFCLEdBQUcsbUJBQU8sQ0FBQyx5REFBc0I7O0FBRXREO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMURPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUEE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7Ozs7Ozs7VUNUQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICog5r+A5rS75YWD57Sg566h55CG57G7XG4gKi9cblxuZXhwb3J0IGNsYXNzIEFjdGl2ZWRFbHNNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgICB0aGlzLmVscyA9IFtdXG4gIH1cbiAgc2V0RWxzKGVscykge1xuICAgIHRoaXMuZWxzID0gZWxzXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5lZGl0b3IudG9vbE1hbmFnZXIuZ2V0Q3VycmVudFRvb2xOYW1lKCkpXG4gICAgLy8gVE9ETzogaGlnaGxpZ2h0IG91dGxpbmUsIGFjY29yZGluZyB0byBjdXJyZW50IHRvb2xcbiAgICB0aGlzLmhlaWdobGlndGhFbHMoKVxuICAgIHRoaXMuc2V0U2V0dGluZ0ZpbGwoKVxuICB9XG4gIGNsZWFyKCkge1xuICAgIHRoaXMuZWxzID0gW11cbiAgICAvLyBjbGVhciBvdXRsaW5lXG4gICAgY29uc3QgaHVkTWFuYWdlciA9IHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXJcbiAgICBodWRNYW5hZ2VyLm91dGxpbmVIdWQuY2xlYXIoKVxuICB9XG4gIGNvbnRhaW5zKGVsKSB7XG4gICAgLy8gVE9ETzpcbiAgfVxuICBnZXRiYm94KCkge1xuICAgIC8vIFRPRE86XG4gICAgLyogbGV0IHgsIHksIHcsIGhcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGNvbnN0IGJib3ggPSBlbC5lbCgpLmdldGJib3goKVxuICAgIH0pICovXG4gIH1cbiAgLy8gaGVpZ2h0bGlnaHQgdGhlIGVsZW1lbnRzXG4gIGhlaWdobGlndGhFbHMoKSB7XG4gICAgLy8gVE9ETzpcbiAgICBjb25zdCBlbHMgPSB0aGlzLmVsc1xuICAgIGNvbnN0IGh1ZE1hbmFnZXIgPSB0aGlzLmVkaXRvci5odWRNYW5hZ2VyXG4gICAgZWxzLmZvckVhY2goZWwgPT4ge1xuICAgICAgY29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gZWwuZ2V0QkJveCgpXG4gICAgICAvLyBjb25zb2xlLmxvZyhib3gpXG4gICAgICBodWRNYW5hZ2VyLm91dGxpbmVIdWQuZHJhd1JlY3QoeCwgeSwgd2lkdGgsIGhlaWdodClcbiAgICB9KVxuICB9XG4gIHNldFNldHRpbmdGaWxsKCkge1xuICAgIGNvbnN0IGVscyA9IHRoaXMuZWxzXG4gICAgY29uc3Qgc2V0dGluZyA9IHRoaXMuZWRpdG9yLnNldHRpbmdcblxuICAgIGNvbnN0IGZpbGxzID0gZWxzLm1hcChlbCA9PiB7XG4gICAgICByZXR1cm4gZWwuZ2V0QXR0cignZmlsbCcpXG4gICAgfSlcblxuICAgIHNldHRpbmcuc2V0RmlsbChmaWxsc1swXSkgLy8gRklYTUU6XG4gIH1cbiAgc2V0RWxzQXR0cihuYW1lLCB2YWwpIHtcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLnNldEF0dHIobmFtZSwgdmFsKVxuICAgIH0pXG4gIH1cbn0iLCJcbmltcG9ydCBFZGl0b3IgZnJvbSAnLi9lZGl0b3IuanMnXG5pbXBvcnQgQWRkUmVjdCBmcm9tICcuL21vZHVsZXMvYWRkUmVjdC5qcydcbmltcG9ydCB7IERyYWdDYW52YXMgfSBmcm9tICcuL21vZHVsZXMvZHJhZ0NhbnZhcy5qcydcbmltcG9ydCBDb21tYW5kTWFuYWdlciBmcm9tICcuL2NvbW1hbmQvY29tbWFuZE1hbmFnZXIuanMnXG5pbXBvcnQgeyBFZGl0b3JTZXR0aW5nIH0gZnJvbSAnLi9zZXR0aW5nL2VkaXRvclNldHRpbmcuanMnXG5pbXBvcnQgeyBab29tTWFuYWdlciB9IGZyb20gJy4vbW9kdWxlcy96b29tLmpzJ1xuaW1wb3J0IHsgU2VsZWN0IH0gZnJvbSAnLi9tb2R1bGVzL3NlbGVjdC5qcydcbmltcG9ydCB7IFRvb2xNYW5hZ2VyIH0gZnJvbSAnLi90b29sTWFuYWdlci5qcydcblxuZnVuY3Rpb24gYWN0aXZlQnRuKG5hbWUpIHtcbiAgbmFtZSA9IHtcbiAgICAnc2VsZWN0JzogJ2J0bi1zZWxlY3QnLFxuICAgICdhZGRSZWN0JzogJ2J0bi1hZGQtcmVjdCcsXG4gICAgJ2RyYWdDYW52YXMnOiAnYnRuLWRyYWctY2FudmFzJyxcbiAgfVtuYW1lXVxuICBpZiAobmFtZSA9PSB1bmRlZmluZWQpIHJldHVyblxuXG4gIGNvbnN0IHRvb2xCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9vbC1iYXInKVxuICBjb25zdCB0b29sQnRucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRvb2xCYXIuY2hpbGRyZW4pXG4gIHRvb2xCdG5zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICB9KVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYW1lKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxufVxuXG5cbmNvbnN0IGVkaXRvciA9IG5ldyBFZGl0b3IoKVxud2luZG93LmVkaXRvciA9IGVkaXRvciAvLyBkZWJ1ZyBpbiBkZXZ0b29sXG5cbmNvbnN0IGNvbW1hbmRNYW5hZ2VyID0gbmV3IENvbW1hbmRNYW5hZ2VyKGVkaXRvcilcbmVkaXRvci5zZXRDb21tYW5kTWFuYWdlcihjb21tYW5kTWFuYWdlcilcblxuZWRpdG9yLnNldFNldHRpbmcobmV3IEVkaXRvclNldHRpbmcoKSlcbi8vIHJlZ2lzdGVyIHRvb2xzXG5cbmNvbnN0IHRvb2xNYW5hZ2VyID0gbmV3IFRvb2xNYW5hZ2VyKGVkaXRvcilcbmVkaXRvci5zZXRUb29sTWFuYWdlcih0b29sTWFuYWdlcilcbnRvb2xNYW5hZ2VyLnJlZ2lzdGVyVG9vbChuZXcgQWRkUmVjdCgpKVxudG9vbE1hbmFnZXIucmVnaXN0ZXJUb29sKG5ldyBEcmFnQ2FudmFzKCkpXG50b29sTWFuYWdlci5yZWdpc3RlclRvb2wobmV3IFNlbGVjdCgpKVxuXG5lZGl0b3IudG9vbE1hbmFnZXIub25Td2l0Y2hUb29sKG5hbWUgPT4ge1xuICBjb25zb2xlLmxvZygnc3dpdGNoZWQgdG9vbDonLCBuYW1lKVxuICBhY3RpdmVCdG4obmFtZSlcbn0pXG5cbnRvb2xNYW5hZ2VyLnNldEN1cnJlbnRUb29sKCdhZGRSZWN0JylcbnRvb2xNYW5hZ2VyLmJpbmRUb29sRXZlbnQoKVxuLy8gem9vbVxuZWRpdG9yLnNldFpvb21NYW5hZ2VyKG5ldyBab29tTWFuYWdlcigpKVxuXG5lZGl0b3IubW91bnQoJyNlZGl0b3ItYXJlYScpXG5cblxuLyoqIFxuICogYmluZCBldmVudCBpbiBidXR0b25cbiAqLyBcbi8vIHVuZG9cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tdW5kbycpLm9uY2xpY2sgPSAoKSA9PiB7XG4gIGVkaXRvci5leGVjdXRlQ29tbWFuZCgndW5kbycpXG59XG4vLyByZWRvXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXJlZG8nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIGVkaXRvci5leGVjdXRlQ29tbWFuZCgncmVkbycpXG59XG4vLyB6b29tSW5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tem9vbS1pbicpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLnpvb21NYW5hZ2VyLnpvb21JbigpXG59XG4vLyB6b29tT3V0XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXpvb20tb3V0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBlZGl0b3Iuem9vbU1hbmFnZXIuem9vbU91dCgpXG59XG4vLyBzZWxlY3QgYWRkUmVjdCB0b29sXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLWFkZC1yZWN0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBlZGl0b3Iuc2V0Q3VycmVudFRvb2woJ2FkZFJlY3QnKVxufVxuLy8gc2VsZWN0IGRyYWdjYW52YXMgdG9vbFxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1kcmFnLWNhbnZhcycpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLnNldEN1cnJlbnRUb29sKCdkcmFnQ2FudmFzJylcbn1cbi8vIHNlbGVjdCB0b29sXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXNlbGVjdCcpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLnNldEN1cnJlbnRUb29sKCdzZWxlY3QnKVxufVxuXG5cbi8vIGZpbGwgdmFsdWUgY29udHJvbFxuY29uc3QgZmlsbFRleHROb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VsZW1lbnQtaW5mby1maWxsJylcbmZpbGxUZXh0Tm9kZS5pbm5lckhUTUwgPSBlZGl0b3Iuc2V0dGluZy5nZXQoJ2ZpbGwnKVxuZWRpdG9yLnNldHRpbmcuYmluZEV2ZW50KCdmaWxsJywgdmFsID0+IHtcbiAgZmlsbFRleHROb2RlLmlubmVySFRNTCA9IHZhbFxufSlcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZXQtZmlsbC1idG4nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGZpbGwgPSB3aW5kb3cucHJvbXB0KCdQbGVhc2UgaW5wdXQgdmFsaWQgY29sb3IgdmFsdWXvvIhsaWtlICNmZmNlNDPvvIknLCBlZGl0b3Iuc2V0dGluZy5nZXQoJ2ZpbGwnKSlcbiAgaWYgKCFmaWxsKSByZXR1cm5cbiAgZmlsbFRleHROb2RlLmlubmVySFRNTCA9IGZpbGxcblxuICBlZGl0b3Iuc2V0dGluZy5zZXRGaWxsKGZpbGwpXG4gIGVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHNBdHRyKCdmaWxsJywgZmlsbClcbn1cblxuLy8gc3Ryb2tlIHZhbHVlIGNvbnRyb2xcbmNvbnN0IHN0cm9rZVRleHROb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VsZW1lbnQtaW5mby1zdHJva2UnKVxuc3Ryb2tlVGV4dE5vZGUuaW5uZXJIVE1MID0gZWRpdG9yLnNldHRpbmcuZ2V0KCdzdHJva2UnKVxuZWRpdG9yLnNldHRpbmcuYmluZEV2ZW50KCdzdHJva2UnLCB2YWwgPT4ge1xuICBzdHJva2VUZXh0Tm9kZS5pbm5lckhUTUwgPSB2YWxcbn0pXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2V0LXN0cm9rZS1idG4nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHN0cm9rZSA9IHdpbmRvdy5wcm9tcHQoJ1BsZWFzZSBpbnB1dCB2YWxpZCBjb2xvciB2YWx1Ze+8iGxpa2UgI2ZmY2U0M++8iScsIGVkaXRvci5zZXR0aW5nLmdldCgnc3Ryb2tlJykpXG4gIGlmICghc3Ryb2tlKSByZXR1cm5cbiAgc3Ryb2tlVGV4dE5vZGUuaW5uZXJIVE1MID0gc3Ryb2tlXG5cbiAgZWRpdG9yLnNldHRpbmcuc2V0U3Ryb2tlKHN0cm9rZSlcbiAgZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVsc0F0dHIoJ3N0cm9rZScsIHN0cm9rZSlcbn1cblxuLyoqXG4gKiDnkIbmg7MgYXBpIOS9v+eUqOS+i+WtkFxuICogXG4gKiBjb25zdCBlZGl0b3JCdWlsZGVyID0gbmV3IEVkaXRvci5idWlsZGVyKClcbiAqIGVkaXRvckJ1aWxkZXJcbiAqICAgLnNldENhbnZhc1NpemUoNDAwLCAzMDApXG4gKiAgIC5zZXRTdGFnZVNpemUoMTAwMCwgODAwKVxuICogICAuc2V0Vmlld3BvcnRTaXplKDgwMCwgNTAwKVxuICogICAuc2V0Wm9vbSgxMDApXG4gKiBcbiAqIGNvbnN0IGVkaXRvciA9IGVkaXRvckJ1aWxkZXIuYnVpbGQoKVxuICogZWRpdG9yLnJlZ2lzdGVyVG9vbCh0b29sTW92ZSlcbiAqIFxuICovIiwiXG5cblxuXG4vKipcbiAqIENvbW1hbmRNYW5hZ2VyXG4gKiBcbiAqIOWRveS7pOeuoeeQhuS6hlxuICogXG4gKiBDb21tYW5kTWFuYWdlci51bmRvKClcbiAqIENvbW1hbmRNYW5hZ2VyLnJlZG8oKVxuICovXG5cbmltcG9ydCB7IEFkZFJlY3RDb21tYW5kLCBETW92ZSB9IGZyb20gXCIuL2NvbW1hbmRzXCJcblxuY2xhc3MgQ29tbWFuZE1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcihlZGl0b3IpIHtcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICAgIHRoaXMucmVkb1N0YWNrID0gW11cbiAgICB0aGlzLnVuZG9TdGFjayA9IFtdXG4gICAgdGhpcy5jb21tYW5kQ2xhc3NlcyA9IHt9XG5cbiAgICB0aGlzLnJlc2lndGVyQ29tbWFuZENsYXNzKEFkZFJlY3RDb21tYW5kKVxuICAgIHRoaXMucmVzaWd0ZXJDb21tYW5kQ2xhc3MoRE1vdmUpXG4gIH1cbiAgc2V0RWRpdG9yKGVkaXRvcikge1xuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gIH1cbiAgZXhlY3V0ZShuYW1lLCAuLi5hcmdzKSB7XG4gICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKVxuICAgIGNvbnN0IENvbW1hbmRDbGFzcyA9IHRoaXMuY29tbWFuZENsYXNzZXNbbmFtZV1cblxuICAgIGNvbnN0IGNvbW1hbmQgPSBuZXcgQ29tbWFuZENsYXNzKHRoaXMuZWRpdG9yLCAuLi5hcmdzKSAvLyDliJvlu7ogY29tbWFuZCDlrp7kvotcblxuICAgIHRoaXMudW5kb1N0YWNrLnB1c2goY29tbWFuZClcbiAgICB0aGlzLnJlZG9TdGFjayA9IFtdXG4gIH1cbiAgdW5kbygpIHtcbiAgICBpZiAodGhpcy51bmRvU3RhY2subGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zb2xlLmxvZygn5Yiw5aS05LqG77yM5peg5rOV57un57ut5pKk5ZueJylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBjb21tYW5kID0gdGhpcy51bmRvU3RhY2sucG9wKClcbiAgICB0aGlzLnJlZG9TdGFjay5wdXNoKGNvbW1hbmQpXG4gICAgY29tbWFuZC51bmRvKClcbiAgfVxuICByZWRvKCkge1xuICAgIGlmICh0aGlzLnJlZG9TdGFjay5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKCfliLDlpLTkuobvvIzml6Dms5Xnu6fnu63ph43lgZonKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IGNvbW1hbmQgPSB0aGlzLnJlZG9TdGFjay5wb3AoKVxuICAgIHRoaXMudW5kb1N0YWNrLnB1c2goY29tbWFuZClcbiAgICBjb21tYW5kLnJlZG8oKVxuICB9XG4gIC8vIOazqOWGjOWRveS7pOexu+WIsOWRveS7pOeuoeeQhuWvueixoeS4reOAglxuICByZXNpZ3RlckNvbW1hbmRDbGFzcyhjb21tYW5kQ2xhc3MpIHtcbiAgICBuYW1lID0gY29tbWFuZENsYXNzLm5hbWUoKS50b0xvd2VyQ2FzZSgpXG4gICAgdGhpcy5jb21tYW5kQ2xhc3Nlc1tuYW1lXSA9IGNvbW1hbmRDbGFzc1xuICB9XG4gIGFmdGVyVW5kbygpIHtcblxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1hbmRNYW5hZ2VyIiwiaW1wb3J0IHsgTlMgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCJcblxuY2xhc3MgQmFzZUNvbW1hbmQge1xuICB1bmRvKCkge1xuICAgIHRocm93IG5ldyBFcnJvcigncGxlYXNlIG92ZXJyaWRlIHVuZG8gbWV0aG9kJylcbiAgfVxuICByZWRvKCkge1xuICAgIHRocm93IG5ldyBFcnJvcigncGxlYXNlIG92ZXJyaWRlIHJlZG8gbWV0aG9kJylcbiAgfVxufVxuXG4vKipcbiAqIGFkZFJlY3RcbiAqIFxuICogYWRkIHJlY3Qgc3ZnIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGNsYXNzIEFkZFJlY3RDb21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBjb25zdHJ1Y3RvcihlZGl0b3IsIHgsIHksIHcsIGgpIHtcbiAgICBzdXBlcigpXG4gICAgLy8gVE9ETzog5L2/55So57yW6L6R5Zmo5L2/55So55qE6aKc6Imy562J5qC35byPXG4gICAgY29uc3QgcmVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdyZWN0JylcbiAgICByZWN0LnNldEF0dHJpYnV0ZSgneCcsIHgpXG4gICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ3knLCB5KVxuICAgIHJlY3Quc2V0QXR0cmlidXRlKCd3aWR0aCcsIHcpXG4gICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGgpXG5cbiAgICBjb25zdCBmaWxsID0gZWRpdG9yLnNldHRpbmcuZ2V0KCdmaWxsJylcbiAgICBjb25zdCBzdHJva2UgPSBlZGl0b3Iuc2V0dGluZy5nZXQoJ3N0cm9rZScpXG4gICAgY29uc3Qgc3Ryb2tlV2lkdGggPSBlZGl0b3Iuc2V0dGluZy5nZXQoJ3N0cm9rZVdpZHRoJylcbiAgICByZWN0LnNldEF0dHJpYnV0ZSgnZmlsbCcsIGZpbGwpXG4gICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHN0cm9rZSlcbiAgICByZWN0LnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgc3Ryb2tlV2lkdGgpXG5cbiAgICBlZGl0b3IuZ2V0Q3VycmVudExheWVyKCkuYXBwZW5kQ2hpbGQocmVjdClcblxuICAgIHRoaXMubmV4dFNpYmxpbmcgPSByZWN0Lm5leHRFbGVtZW50U2libGluZyBcbiAgICB0aGlzLnBhcmVudCA9IHJlY3QucGFyZW50RWxlbWVudFxuICAgIHRoaXMuZWxlbWVudCA9IHJlY3RcbiAgfVxuXG4gIHN0YXRpYyBuYW1lKCkge1xuICAgIHJldHVybiAnYWRkUmVjdCdcbiAgfVxuXG4gIHJlZG8oKSB7XG4gICAgaWYgKHRoaXMubmV4dFNpYmxpbmcpIHtcbiAgICAgIHRoaXMucGFyZW50Lmluc2VydEJlZm9yZSh0aGlzLmVsZW1lbnQsIHRoaXMubmV4dFNpYmxpbmcpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudClcbiAgICB9XG4gIH1cblxuICB1bmRvKCkge1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmUoKVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBETW92ZSBleHRlbmRzIEJhc2VDb21tYW5kIHtcbiAgY29uc3RydWN0b3IoZWRpdG9yLCBlbHMsIGR4LCBkeSkge1xuICAgIHN1cGVyKClcblxuICAgIHRoaXMuZHggPSBkeFxuICAgIHRoaXMuZHkgPSBkeVxuICAgIHRoaXMuZWxzID0gZWxzXG5cbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLmRtb3ZlKHRoaXMuZHgsIHRoaXMuZHkpXG4gICAgfSlcbiAgICBcbiAgfVxuXG4gIHN0YXRpYyBuYW1lKCkge1xuICAgIHJldHVybiAnZG1vdmUnXG4gIH1cblxuICByZWRvKCkge1xuICAgIHRoaXMuZWxzLmZvckVhY2goZWwgPT4ge1xuICAgICAgZWwuZG1vdmUodGhpcy5keCwgdGhpcy5keSlcbiAgICB9KVxuICB9XG5cbiAgdW5kbygpIHtcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLmRtb3ZlKC10aGlzLmR4LCAtdGhpcy5keSlcbiAgICB9KVxuICB9XG59IiwiLy8g5bi46YePXG5cbmNvbnN0IE5TID0ge1xuICBIVE1MOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsXG4gIE1BVEg6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MJyxcbiAgU0U6ICdodHRwOi8vc3ZnLWVkaXQuZ29vZ2xlY29kZS5jb20nLFxuICBTVkc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gIFhMSU5LOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsXG4gIFhNTDogJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZScsXG4gIFhNTE5TOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nIC8vIHNlZSBodHRwOi8vd3d3LnczLm9yZy9UUi9SRUMteG1sLW5hbWVzLyN4bWxSZXNlcnZlZFxufTtcblxuZXhwb3J0IHtcbiAgTlMsXG59IFxuXG5cblxuIiwiaW1wb3J0IHsgQWN0aXZlZEVsc01hbmFnZXIgfSBmcm9tIFwiLi9hY3RpdmVkRWxzTWFuYWdlclwiXG5pbXBvcnQgeyBFZGl0b3JFdmVudENvbnRleHQgfSBmcm9tIFwiLi9lZGl0b3JFdmVudENvbnRleHRcIlxuaW1wb3J0IHsgSHVkTWFuYWdlciB9IGZyb20gXCIuL2xheWVyL2h1ZE1hbmFnZXJcIlxuXG5jbGFzcyBFZGl0b3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNldHRpbmcgPSBudWxsXG4gICAgdGhpcy5jb21tYW5kTWFuYWdlciA9IG51bGxcbiAgICB0aGlzLnpvb21NYW5hZ2VyID0gbnVsbFxuICAgIHRoaXMuYWN0aXZlZEVsc01hbmFnZXIgPSBuZXcgQWN0aXZlZEVsc01hbmFnZXIodGhpcylcblxuXG4gICAgLy8gY29uc3QgY29udGVudFdpZHRoID0gNDAwXG4gICAgLy8gY29uc3QgY29udGVudEhlaWdodCA9IDMwMFxuICAgIC8vIGNvbnN0IHN0YWdlV2lkdGggPSAxMDAwIC8vIOato+WcqOe6oOe7k+WRveWQjVxuICAgIC8vIGNvbnN0IHN0YWdlSGVpZ2h0ID0gNjAwXG4gICAgY29uc3Qgdmlld3BvcnRXaWR0aCA9IDgwMFxuICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0ID0gNTUwXG5cbiAgICBjb25zdCB2aWV3cG9ydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgdmlld3BvcnQuaWQgPSAndmlld3BvcnQnXG4gICAgdmlld3BvcnQuc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCAjMDAwJ1xuICAgIHZpZXdwb3J0LnN0eWxlLndpZHRoID0gdmlld3BvcnRXaWR0aCArICdweCdcbiAgICB2aWV3cG9ydC5zdHlsZS5oZWlnaHQgPSB2aWV3cG9ydEhlaWdodCArICdweCdcbiAgICB0aGlzLnZpZXdwb3J0ID0gdmlld3BvcnRcbiAgICBcbiAgICBjb25zdCBzdmdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHN2Z0NvbnRhaW5lci5pZCA9ICdzdmctY29udGFpbmVyJ1xuICAgIHN2Z0NvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2RkZCdcbiAgICBzdmdDb250YWluZXIuc3R5bGUud2lkdGggPSB2aWV3cG9ydFdpZHRoICsgJ3B4J1xuICAgIHN2Z0NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSB2aWV3cG9ydEhlaWdodCArICdweCdcbiAgICBzdmdDb250YWluZXIuc3R5bGUub3ZlcmZsb3cgPSAnc2Nyb2xsJ1xuICAgIHRoaXMuc3ZnQ29udGFpbmVyID0gc3ZnQ29udGFpbmVyXG5cbiAgICBjb25zdCBzdmdSb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKVxuICAgIHN2Z1Jvb3QuaWQgPSAnc3ZnLXJvb3QnXG4gICAgc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgMTAwMClcbiAgICBzdmdSb290LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgNjAwKVxuICAgIHN2Z1Jvb3Quc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAxMDAwIDYwMCcpXG4gICAgdGhpcy5zdmdSb290ID0gc3ZnUm9vdFxuXG4gICAgY29uc3Qgc3ZnU3RhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpXG4gICAgc3ZnU3RhZ2UuaWQgPSAnc3ZnLXN0YWdlJ1xuICAgIHN2Z1N0YWdlLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCA0MDApXG4gICAgc3ZnU3RhZ2Uuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAzMDApXG4gICAgc3ZnU3RhZ2Uuc2V0QXR0cmlidXRlKCd4JywgMzAwKVxuICAgIHN2Z1N0YWdlLnNldEF0dHJpYnV0ZSgneScsIDE1MClcbiAgICBzdmdTdGFnZS5zdHlsZS5vdmVyZmxvdyA9ICd2aXNpYmxlJ1xuICAgIHRoaXMuc3ZnU3RhZ2UgPSBzdmdTdGFnZVxuXG4gICAgY29uc3Qgc3ZnQmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2cnKVxuICAgIHN2Z0JnLmlkID0gJ2JhY2tncm91bmQnXG4gICAgLy8gc3ZnQmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsIDQwMClcbiAgICAvLyBzdmdCZy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDMwMClcbiAgICBzdmdCZy5zZXRBdHRyaWJ1dGUoJ3gnLCAwKVxuICAgIHN2Z0JnLnNldEF0dHJpYnV0ZSgneScsIDApXG5cbiAgICBjb25zdCBiZ1JlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3JlY3QnKVxuICAgIGJnUmVjdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKVxuICAgIGJnUmVjdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMDAlJylcbiAgICBiZ1JlY3Quc2V0QXR0cmlidXRlKCdmaWxsJywgJyNmZmYnKVxuXG4gICAgY29uc3Qgc3ZnQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnZycpXG4gICAgc3ZnQ29udGVudC5pZCA9ICdjb250ZW50J1xuICAgIC8vIHN2Z0NvbnRlbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsIDQwMClcbiAgICAvLyBzdmdDb250ZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgMzAwKVxuICAgIHN2Z0NvbnRlbnQuc2V0QXR0cmlidXRlKCd4JywgMClcbiAgICBzdmdDb250ZW50LnNldEF0dHJpYnV0ZSgneScsIDApXG4gICAgdGhpcy5zdmdDb250ZW50ID0gc3ZnQ29udGVudFxuXG4gICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2cnKVxuICAgIGxheWVyLmlkID0gJ2xheWVyLTEnXG4gICAgdGhpcy5jdXJyZW50TGF5ZXIgPSBsYXllclxuXG4gICAgdmlld3BvcnQuYXBwZW5kQ2hpbGQoc3ZnQ29udGFpbmVyKVxuICAgIHN2Z0NvbnRhaW5lci5hcHBlbmRDaGlsZChzdmdSb290KVxuICAgIHN2Z1Jvb3QuYXBwZW5kQ2hpbGQoc3ZnU3RhZ2UpXG5cbiAgICBzdmdTdGFnZS5hcHBlbmRDaGlsZChzdmdCZylcbiAgICBzdmdCZy5hcHBlbmRDaGlsZChiZ1JlY3QpXG4gICAgc3ZnU3RhZ2UuYXBwZW5kQ2hpbGQoc3ZnQ29udGVudClcbiAgICBzdmdDb250ZW50LmFwcGVuZENoaWxkKGxheWVyKVxuXG5cbiAgICB0aGlzLmh1ZE1hbmFnZXIgPSBuZXcgSHVkTWFuYWdlcigpXG4gICAgdGhpcy5odWRNYW5hZ2VyLm1vdW50KHN2Z1N0YWdlKVxuXG4gICAgLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWV3cG9ydClcbiAgfVxuICBtb3VudChzZWxlY3Rvcikge1xuICAgIGNvbnN0IG1vdW50Tm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgbW91bnROb2RlLmFwcGVuZENoaWxkKHRoaXMudmlld3BvcnQpXG4gIH1cbiAgZ2V0Q3VycmVudExheWVyKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRMYXllclxuICB9XG5cbiAgc2V0VG9vbE1hbmFnZXIodG9vbE1hbmFnZXIpIHtcbiAgICB0aGlzLnRvb2xNYW5hZ2VyID0gdG9vbE1hbmFnZXJcbiAgfVxuICAvLyB0b29sIHJlbGF0aXZlZCBtZXRob2RzXG4gIHNldEN1cnJlbnRUb29sKG5hbWUpIHtcbiAgICB0aGlzLnRvb2xNYW5hZ2VyLnNldEN1cnJlbnRUb29sKG5hbWUpXG4gIH1cbiAgcmVnaXN0ZXJUb29sKHRvb2wpIHtcbiAgICB0aGlzLnRvb2xNYW5hZ2VyLnJlZ2lzdGVyVG9vbCh0b29sKVxuICB9XG4gIHNldFNldHRpbmcoc2V0dGluZykge1xuICAgIHRoaXMuc2V0dGluZyA9IHNldHRpbmdcbiAgfVxuXG4gIC8vIOWRveS7pOebuOWFs1xuICBzZXRDb21tYW5kTWFuYWdlcihjb21tYW5kTWFuYWdlcikge1xuICAgIHRoaXMuY29tbWFuZE1hbmFnZXIgPSBjb21tYW5kTWFuYWdlclxuICB9XG4gIGV4ZWN1dGVDb21tYW5kKG5hbWUsIC4uLnBhcmFtcykge1xuICAgIGlmIChuYW1lID09ICd1bmRvJykge1xuICAgICAgdGhpcy5jb21tYW5kTWFuYWdlci51bmRvKClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAobmFtZSA9PSAncmVkbycpIHtcbiAgICAgIHRoaXMuY29tbWFuZE1hbmFnZXIucmVkbygpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5jb21tYW5kTWFuYWdlci5leGVjdXRlKG5hbWUsIC4uLnBhcmFtcylcbiAgfVxuXG4gIC8vIHpvb21cbiAgc2V0Wm9vbU1hbmFnZXIoem9vbU1hbmFnZXIpIHtcbiAgICB6b29tTWFuYWdlci5zZXRFZGl0b3IodGhpcylcbiAgICB0aGlzLnpvb21NYW5hZ2VyID0gem9vbU1hbmFnZXJcbiAgfVxuICBnZXRab29tKCkgeyAvLyDlsIHoo4VcbiAgICByZXR1cm4gdGhpcy56b29tTWFuYWdlci5nZXRab29tKClcbiAgfVxuXG4gIGdldFNjcm9sbCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogdGhpcy5zdmdDb250YWluZXIuc2Nyb2xsTGVmdCxcbiAgICAgIHk6IHRoaXMuc3ZnQ29udGFpbmVyLnNjcm9sbFRvcCxcbiAgICB9XG4gIH1cbiAgc2V0U2Nyb2xsKHgsIHkpIHtcbiAgICB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxMZWZ0ID0geFxuICAgIHRoaXMuc3ZnQ29udGFpbmVyLnNjcm9sbFRvcCA9IHlcbiAgfVxuICBnZXRDb250ZW50T2Zmc2V0KCkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiB0aGlzLnN2Z1N0YWdlLmdldEF0dHJpYnV0ZSgneCcpLFxuICAgICAgeTogdGhpcy5zdmdTdGFnZS5nZXRBdHRyaWJ1dGUoJ3knKSxcbiAgICB9XG4gIH1cblxuICBpc0NvbnRlbnRFbGVtZW50KGVsKSB7XG4gICAgd2hpbGUgKGVsKSB7XG4gICAgICBpZiAoZWwucGFyZW50RWxlbWVudCA9PSB0aGlzLnN2Z0NvbnRlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIGlmIChlbC5wYXJlbnRFbGVtZW50ID09IHRoaXMuc3ZnUm9vdCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudFxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFZGl0b3JcbiIsIlxuLyoqXG4gKiBjb250ZXh0IGNsYXNzXG4gKiBcbiAqIHVzZWQgZm9yIHRvb2wgZXZlbnRcbiAqL1xuXG5leHBvcnQgY2xhc3MgRWRpdG9yRXZlbnRDb250ZXh0IHtcbiAgY29uc3RydWN0b3IoZWRpdG9yLCBlKSB7XG4gICAgdGhpcy5tb3VzZVByZXNzZWQgPSBmYWxzZVxuICAgIHRoaXMub3JpZ2luRXZlbnQgPSBlXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgICB0aGlzLmlzRW5kSW5zaWRlID0gZmFsc2VcblxuICAgIHRoaXMuc3RhcnRYID0gMFxuICAgIHRoaXMuc3RhcnRZID0gMFxuXG4gICAgdGhpcy5vZmZzZXRYID0gMFxuICAgIHRoaXMub2Zmc2V0WSA9IDBcblxuICAgIHRoaXMuc3RhcnRDbGllbnRYID0gMCAvLyB1c2VkIHRvIGNhbGMgZHggYW5kIGR5LlxuICAgIHRoaXMuc3RhcnRDbGllbnRZID0gMFxuICAgIHRoaXMuZHggPSAwXG4gICAgdGhpcy5keSA9IDBcblxuICAgIHRoaXMuc2V0U3RhcnRQb3MoKVxuICB9XG4gIHNldE9yaWdpbkV2ZW50KGUpIHtcbiAgICB0aGlzLm9yaWdpbkV2ZW50ID0gZVxuICB9XG4gIHNldFN0YXJ0UG9zKCkge1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5nZXRQb3MoKVxuXG4gICAgdGhpcy5zdGFydFggPSB4XG4gICAgdGhpcy5zdGFydFkgPSB5XG5cbiAgICB0aGlzLnN0YXJ0Q2xpZW50WCA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WFxuICAgIHRoaXMuc3RhcnRDbGllbnRZID0gdGhpcy5vcmlnaW5FdmVudC5jbGllbnRZXG4gIH1cbiAgcmVsZWFzZU1vdXNlKCkge1xuICAgIHRoaXMubW91c2VQcmVzc2VkID0gZmFsc2VcbiAgfVxuICBwcmVzc01vdXNlKCkge1xuICAgIHRoaXMubW91c2VQcmVzc2VkID0gdHJ1ZVxuICB9XG4gIGdldFBvcygpIHtcbiAgICBjb25zdCB6b29tID0gdGhpcy5lZGl0b3IuZ2V0Wm9vbSgpXG4gICAgY29uc3Qge3gsIHl9ID0gdGhpcy5lZGl0b3IuZ2V0Q29udGVudE9mZnNldCgpXG4gICAgcmV0dXJuIHsgXG4gICAgICB4OiB0aGlzLm9yaWdpbkV2ZW50Lm9mZnNldFggLyB6b29tIC0geCwgXG4gICAgICB5OiB0aGlzLm9yaWdpbkV2ZW50Lm9mZnNldFkgLyB6b29tIC0geSxcbiAgICB9XG4gIH1cbiAgZ2V0U3RhcnRQb3MoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHRoaXMuc3RhcnRYLFxuICAgICAgeTogdGhpcy5zdGFydFksXG4gICAgfVxuICB9XG4gIC8vIHdpdGhvdXQgY2FsYyB3aXRoIHpvb20gdmFsdWVcbiAgZ2V0RGlmZlBvcygpIHtcbiAgICBjb25zdCB4ID0gdGhpcy5vcmlnaW5FdmVudC5jbGllbnRYIC0gdGhpcy5zdGFydENsaWVudFhcbiAgICBjb25zdCB5ID0gdGhpcy5vcmlnaW5FdmVudC5jbGllbnRZIC0gdGhpcy5zdGFydENsaWVudFlcbiAgICByZXR1cm4geyB4LCB5IH1cbiAgfVxuXG59IiwiXG4vKipcbiAqIOWvuSBTVkcg5YWD57Sg55qE566A5Y2V5bCB6KOFXG4gKi9cblxuZXhwb3J0IGNsYXNzIEZFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5lbF8gPSBudWxsXG4gIH1cbiAgZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxfXG4gIH1cbiAgc2V0QXR0cihwcm9wLCB2YWwpIHtcbiAgICByZXR1cm4gdGhpcy5lbF8uc2V0QXR0cmlidXRlKHByb3AsIHZhbClcbiAgfVxuICBnZXRBdHRyKHByb3ApIHtcbiAgICByZXR1cm4gdGhpcy5lbF8uZ2V0QXR0cmlidXRlKHByb3ApXG4gIH1cbiAgZ2V0QkJveCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbF8uZ2V0QkJveCgpXG4gIH1cbn0iLCJpbXBvcnQgeyBSZWN0IH0gZnJvbSBcIi4vcmVjdFwiXG5cblxuLyoqXG4gKiBGU1ZHXG4gKiBcbiAqIHNpbXBsZSBTVkdFbGVtZW50IGVuY2Fwc3VsYXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IEZTVkcgPSB7XG4gIFJlY3QsXG59IiwiXG4vKipcbiAqIOWvuSByZWN0IOWFg+e0oOeahOeugOWNleWwgeijhVxuICovXG5cbmltcG9ydCB7IE5TIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiXG5pbXBvcnQgeyBGRWxlbWVudCB9IGZyb20gXCIuL2Jhc2VFbGVtZW50XCJcblxuZXhwb3J0IGNsYXNzIFJlY3QgZXh0ZW5kcyBGRWxlbWVudCB7XG4gIC8vIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlcik7XG4gIC8vIGNvbnN0cnVjdG9yKGVsOiBTVkdFbGVtZW50KTtcbiAgY29uc3RydWN0b3IoeCwgeSwgdywgaCkge1xuICAgIHN1cGVyKClcbiAgICBpZiAodHlwZW9mIHggPT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMuZWxfID0geFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsXyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdyZWN0JylcbiAgICAgIHRoaXMuZWxfLnNldEF0dHIoJ3gnLCB4KVxuICAgICAgdGhpcy5lbF8uc2V0QXR0cigneScsIHkpXG4gICAgICB0aGlzLmVsXy5zZXRBdHRyKCd3aWR0aCcsIHcpXG4gICAgICB0aGlzLmVsXy5zZXRBdHRyKCdoZWlnaHQnLCBoKVxuICAgIH1cbiAgfVxuICBnZXRQb3MoKSB7XG4gICAgY29uc3QgeCA9IHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyKCd4JykpXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyKCd5JykpXG4gICAgcmV0dXJuIHsgeCwgeSB9XG4gIH1cbiAgZG1vdmUoZHgsIGR5KSB7XG4gICAgY29uc3QgcG9zID0gdGhpcy5nZXRQb3MoKVxuICAgIHRoaXMuc2V0QXR0cigneCcsIHBvcy54ICsgZHgpXG4gICAgdGhpcy5zZXRBdHRyKCd5JywgcG9zLnkgKyBkeSlcbiAgfVxufSIsIi8qKlxuICogZ3VpZGUgbGluZSBsYXllclxuICovXG5cbmltcG9ydCB7IE91dGxpbmVIdWQgfSBmcm9tIFwiLi9vdXRsaW5lSHVkXCI7XG5pbXBvcnQgeyBTZWxlY3RBcmVhIH0gZnJvbSBcIi4vc2VsZWN0QXJlYVwiO1xuY29uc3QgeyBOUyB9ID0gcmVxdWlyZShcIi4uL2NvbnN0YW50c1wiKTtcblxuZXhwb3J0IGNsYXNzIEh1ZE1hbmFnZXJ7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ2cnKVxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gJ2h1ZHMnXG5cbiAgICB0aGlzLnNlbGVjdEFyZWEgPSBuZXcgU2VsZWN0QXJlYSh0aGlzLmNvbnRhaW5lcilcbiAgICB0aGlzLm91dGxpbmVIdWQgPSBuZXcgT3V0bGluZUh1ZCh0aGlzLmNvbnRhaW5lcilcbiAgfVxuICBtb3VudChlbCkge1xuICAgIGVsLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKVxuICB9XG59XG5cbiIsIlxuXG4gIFxuY29uc3QgeyBOUyB9ID0gcmVxdWlyZShcIi4uL2NvbnN0YW50c1wiKTtcblxuLyoqXG4gKiA8cmVjdD4gb3V0bGluZVxuICovXG5leHBvcnQgY2xhc3MgT3V0bGluZUh1ZCB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudCkge1xuICAgIHRoaXMueCA9IDBcbiAgICB0aGlzLnkgPSAwXG4gICAgdGhpcy53ID0gMFxuICAgIHRoaXMuaCA9IDBcblxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ2cnKVxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gJ291dGxpbmUtaHVkJ1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcilcblxuICAgIHRoaXMub3V0bGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdwYXRoJylcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKVxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICcjZjA0JylcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd2ZWN0b3ItZWZmZWN0JywgJ25vbi1zY2FsaW5nLXN0cm9rZScpXG5cbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLm91dGxpbmUpXG4gIH1cbiAgY2xlYXIoKSB7XG4gICAgLy8gcGFyZW50LmlubmVySFRNTCA9ICcnXG4gICAgdGhpcy5vdXRsaW5lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgfVxuICBkcmF3UmVjdCh4LCB5LCB3LCBoKSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLncgPSB3XG4gICAgdGhpcy5oID0gaFxuXG4gICAgLy8gd2h5IGRvbid0IEkgdXNlIHJlY3QsIGp1c3Qgc29sdmUgdGhlIGNvbmRpdGlvbiB3aGVuIHdpZHRoIG9yIGhlaWdodCBpcyAwIHRoZSBvdXRsaW5lIGlzIGRpc2FwcGVyXG4gICAgY29uc3QgZCA9IGBNICR7eH0gJHt5fSBMICR7eCt3fSAke3l9IEwgJHt4K3d9ICR7eStofSBMICR7eH0gJHt5K2h9IFpgXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZCcsIGQpXG4gICAgdGhpcy5vdXRsaW5lLnN0eWxlLmRpc3BsYXkgPSAnJ1xuICB9XG4gIGdldFdpZHRoKCkgeyByZXR1cm4gdGhpcy53IH1cbiAgZ2V0SGVpZ2h0KCkgeyByZXR1cm4gdGhpcy5oIH1cbiAgZ2V0WCgpIHsgcmV0dXJuIHRoaXMueCB9XG4gIGdldFkoKSB7IHJldHVybiB0aGlzLnkgfVxufSIsIlxuY29uc3QgeyBOUyB9ID0gcmVxdWlyZShcIi4uL2NvbnN0YW50c1wiKTtcblxuLyoqXG4gKiBzZWxlY3QgYXJlYVxuICovXG5leHBvcnQgY2xhc3MgU2VsZWN0QXJlYSB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudCkge1xuICAgIHRoaXMueCA9IDBcbiAgICB0aGlzLnkgPSAwXG4gICAgdGhpcy53ID0gMFxuICAgIHRoaXMuaCA9IDBcblxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ2cnKVxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gJ3NlbGVjdC1hcmVhJ1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcilcblxuICAgIHRoaXMub3V0bGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdwYXRoJylcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKVxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICcjMDU0JylcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd2ZWN0b3ItZWZmZWN0JywgJ25vbi1zY2FsaW5nLXN0cm9rZScpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLWRhc2hhcnJheScsICc0cHgnKVxuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5vdXRsaW5lKVxuICB9XG4gIGNsZWFyKCkge1xuICAgIC8vIHBhcmVudC5pbm5lckhUTUwgPSAnJ1xuICAgIHRoaXMub3V0bGluZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIH1cbiAgZHJhd1JlY3QoeCwgeSwgdywgaCkge1xuICAgIHRoaXMueCA9IHhcbiAgICB0aGlzLnkgPSB5XG4gICAgdGhpcy53ID0gd1xuICAgIHRoaXMuaCA9IGhcblxuICAgIC8vIHdoeSBkb24ndCBJIHVzZSByZWN0LCBqdXN0IHNvbHZlIHRoZSBjb25kaXRpb24gd2hlbiB3aWR0aCBvciBoZWlnaHQgaXMgMCB0aGUgb3V0bGluZSBpcyBkaXNhcHBlclxuICAgIGNvbnN0IGQgPSBgTSAke3h9ICR7eX0gTCAke3grd30gJHt5fSBMICR7eCt3fSAke3kraH0gTCAke3h9ICR7eStofSBaYFxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2QnLCBkKVxuXG4gICAgLyogdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgneCcsIHgpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgneScsIHkpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3KVxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGgpICovXG4gICAgdGhpcy5vdXRsaW5lLnN0eWxlLmRpc3BsYXkgPSAnJ1xuICB9XG4gIGdldFdpZHRoKCkgeyByZXR1cm4gdGhpcy53IH1cbiAgZ2V0SGVpZ2h0KCkgeyByZXR1cm4gdGhpcy5oIH1cbiAgZ2V0WCgpIHsgcmV0dXJuIHRoaXMueCB9XG4gIGdldFkoKSB7IHJldHVybiB0aGlzLnkgfVxufSIsIlxuaW1wb3J0IHsgZ2V0Qm94QnkycG9pbnRzIH0gZnJvbSBcIi4uL3V0aWwvbWF0aFwiXG5cbmNsYXNzIEFkZFJlY3Qge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcbiAgfVxuICBuYW1lKCkge1xuICAgIHJldHVybiAnYWRkUmVjdCdcbiAgfVxuICBzZXRFZGl0b3IoZWRpdG9yKSB7IC8vIOS+nei1luazqOWFpVxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gIH1cbiAgc3RhcnQoY3R4KSB7fVxuICBtb3ZlKGN0eCkge1xuICAgIGNvbnN0IHsgeDogZW5kWCwgeTogZW5kWSB9ID0gY3R4LmdldFBvcygpXG4gICAgY29uc3QgeyB4OiBzdGFydFgsIHk6IHN0YXJ0WSB9ID0gY3R4LmdldFN0YXJ0UG9zKClcbiAgICBjb25zdCB7IHgsIHksIHcsIGggfSA9IGdldEJveEJ5MnBvaW50cyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSlcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuZHJhd1JlY3QoeCwgeSwgdywgaClcbiAgfVxuICBlbmQoY3R4KSB7XG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lSHVkLmNsZWFyKClcblxuICAgIGNvbnN0IHsgeDogZW5kWCwgeTogZW5kWSB9ID0gY3R4LmdldFBvcygpXG4gICAgY29uc3QgeyB4OiBzdGFydFgsIHk6IHN0YXJ0WSB9ID0gY3R4LmdldFN0YXJ0UG9zKClcbiAgICBjb25zdCB7IHgsIHksIHcsIGggfSA9IGdldEJveEJ5MnBvaW50cyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSlcbiAgICBpZiAodyA8IDIgJiYgaCA8IDIpIHtcbiAgICAgIC8vIFRPRE86IG9wZW4gYSBkaWFsb2cgdG8gaW5wdXQgd2lkdGggYW5kIGhlaWdodFxuICAgICAgY29uc29sZS5sb2coJ3dpZHRoIGFuZCBoZWlnaHQgYm90aCBsZXNzIGVxdWFsIHRvIDLvvIxkcmF3aW5nIG5vdGhpbmcnKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdhZGRSZWN0JywgeCwgeSwgdywgaClcbiAgfVxuICAvLyBtb3VzZWRvd24gb3V0c2lkZSB2aWV3cG9ydFxuICBlbmRPdXRzaWRlKCkge1xuICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIub3V0bGluZUh1ZC5jbGVhcigpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWRkUmVjdCIsIlxuZXhwb3J0IGNsYXNzIERyYWdDYW52YXMge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnN0YXJ0T2Zmc2V0WCA9IDBcbiAgICB0aGlzLnN0YXJ0T2Zmc2V0WSA9IDBcbiAgfVxuICBuYW1lKCkge1xuICAgIHJldHVybiAnZHJhZ0NhbnZhcydcbiAgfVxuICBzZXRFZGl0b3IoZWRpdG9yKSB7IC8vIOS+nei1luazqOWFpVxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gIH1cbiAgYmVmb3JlQWN0aXZlKCkge1xuICAgIC8vIGRvIHNvbWV0aGluZyBiZWZvcmUgc3dpdGNoIHRvIGN1cnJlbnQgdG9vbFxuICB9XG4gIHN0YXJ0KGN0eCkge1xuICAgIGNvbnN0IHNjcm9sbCA9IHRoaXMuZWRpdG9yLmdldFNjcm9sbCgpXG4gICAgdGhpcy5zdGFydE9mZnNldFggPSBzY3JvbGwueFxuICAgIHRoaXMuc3RhcnRPZmZzZXRZID0gc2Nyb2xsLnlcbiAgfVxuICBtb3ZlKGN0eCkge1xuICAgIGNvbnN0IHpvb20gPSB0aGlzLmVkaXRvci5nZXRab29tKClcbiAgICBjb25zdCB7IHg6IGR4LCB5OiBkeSB9ID0gY3R4LmdldERpZmZQb3MoKVxuICAgIHRoaXMuZWRpdG9yLnNldFNjcm9sbCh0aGlzLnN0YXJ0T2Zmc2V0WCAtIGR4LCB0aGlzLnN0YXJ0T2Zmc2V0WSAtIGR5KVxuICB9XG4gIGVuZCgpIHt9XG4gIGVuZE91dHNpZGUoKSB7fVxufVxuIiwiaW1wb3J0IHsgRlNWRyB9IGZyb20gXCIuLi9lbGVtZW50XCJcbmltcG9ydCB7IGdldEJveEJ5MnBvaW50cyB9IGZyb20gXCIuLi91dGlsL21hdGhcIlxuXG4vKipcbiAqIHNlbGVjdFxuICogXG4gKiDmraTmqKHlnZfpnZ7luLjlpI3mnYJcbiAqIFxuICogMS4g6byg5qCH5oyJ5LiL5pe277yM6YCJ5Lit5Y2V5Liq5YWD57SgXG4gKiAyLiDpvKDmoIfmjInkuIvkuLrnqbrvvIzmi5bmi73ml7bkuqfnlJ/pgInkuK3moYbvvIzlj6/ku6XpgInmi6nlpJrkuKrlhYPntKBcbiAqIDMuIOmAieS4reWNleS4qu+8iOaIlumAieWMuumAieS4reWkmuS4qu+8iSDnvKnmlL4g562J5o6n5Yi254K577yM5ouW5ou95pS55Y+Y5a696auYXG4gKiAzLiDliIfmlq3liIDov5nkuKrlt6Xlhbfml7bvvIzmv4DmtLvnmoTlhYPntKDov5vlhaXooqvpgInkuK3nirbmgIHvvIjova7lu5Pnur8r5o6n5Yi254K577yJ44CCXG4gKiA0LiDpgInljLrlkozlhYPntKDnm7jkuqTnmoTliKTlrppcbiAqIDUuIOa/gOa0u+WFg+e0oOWmguS9leS/neWtmO+8jOS/neWtmOWIsOWTqumHjFxuICovXG5leHBvcnQgY2xhc3MgU2VsZWN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBudWxsXG4gICAgdGhpcy5zZWxlY3RlZEVscyA9IFtdXG5cbiAgICB0aGlzLm91dGxpbmVTdGFydFggPSAwXG4gICAgdGhpcy5vdXRsaW5lU3RhcnRZID0gMFxuICB9XG4gIG5hbWUoKSB7XG4gICAgcmV0dXJuICdzZWxlY3QnXG4gIH1cbiAgc2V0RWRpdG9yKGVkaXRvcikge1xuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gIH1cbiAgaGFzU2VsZWN0ZWRFbHNXaGVuU3RhcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRFbHMubGVuZ3RoID4gMFxuICB9XG4gIHN0YXJ0KGN0eCkge1xuICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBjdHgub3JpZ2luRXZlbnQudGFyZ2V0XG4gICAgaWYgKCF0aGlzLmVkaXRvci5pc0NvbnRlbnRFbGVtZW50KHRhcmdldEVsZW1lbnQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRGRWxlbWVudCA9IG5ldyBGU1ZHLlJlY3QodGFyZ2V0RWxlbWVudCkgLy8g5pqC5pe25Y+q5pivIHJlY3QgVE9ETzog5pS55Li66YCa55So5YaZ5rOVXG4gICAgdGhpcy5zZWxlY3RlZEVscyA9IFsgdGFyZ2V0RkVsZW1lbnQgXSAvLyDpvKDmoIfmjInkuIvml7bvvIzlsLHpgInkuK3kuobkuIDkuKrlhYPntKBcbiAgICBjb25zdCB4ID0gcGFyc2VGbG9hdCh0YXJnZXRGRWxlbWVudC5nZXRBdHRyKCd4JykpXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQodGFyZ2V0RkVsZW1lbnQuZ2V0QXR0cigneScpKVxuICAgIGNvbnN0IHcgPSBwYXJzZUZsb2F0KHRhcmdldEZFbGVtZW50LmdldEF0dHIoJ3dpZHRoJykpXG4gICAgY29uc3QgaCA9IHBhcnNlRmxvYXQodGFyZ2V0RkVsZW1lbnQuZ2V0QXR0cignaGVpZ2h0JykpXG5cbiAgICB0aGlzLm91dGxpbmVTdGFydFggPSB4XG4gICAgdGhpcy5vdXRsaW5lU3RhcnRZID0geVxuXG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lSHVkLmRyYXdSZWN0KHgsIHksIHcsIGgpXG4gIH1cbiAgbW92ZShjdHgpIHtcbiAgICBpZiAoIXRoaXMuaGFzU2VsZWN0ZWRFbHNXaGVuU3RhcnQoKSkgeyAvLyBkcmF3IHNlbGVjdGluZyBhcmVhXG4gICAgICAvLyBzZWxlY3Qgbm8gZWxlbWVudCwgZHJhdyBzZWxlY3QgcmVjdFxuICAgICAgY29uc3QgeyB4OiBlbmRYLCB5OiBlbmRZIH0gPSBjdHguZ2V0UG9zKClcbiAgICAgIGNvbnN0IHsgeDogc3RhcnRYLCB5OiBzdGFydFkgfSA9IGN0eC5nZXRTdGFydFBvcygpXG4gICAgICBjb25zdCB7IHgsIHksIHcsIGggfSA9IGdldEJveEJ5MnBvaW50cyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSlcbiAgICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIuc2VsZWN0QXJlYS5kcmF3UmVjdCh4LCB5LCB3LCBoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgeyB4OiBkeCwgeTogZHkgfSA9IGN0eC5nZXREaWZmUG9zKClcbiAgICBjb25zdCBvdXRsaW5lSHVkID0gdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lSHVkXG4gICAgY29uc3QgdyA9IG91dGxpbmVIdWQuZ2V0V2lkdGgoKVxuICAgIGNvbnN0IGggPSBvdXRsaW5lSHVkLmdldEhlaWdodCgpXG4gICAgb3V0bGluZUh1ZC5kcmF3UmVjdCh0aGlzLm91dGxpbmVTdGFydFggKyBkeCwgdGhpcy5vdXRsaW5lU3RhcnRZICsgZHksIHcsIGgpXG4gIH1cbiAgZW5kKGN0eCkge1xuICAgIGlmICghdGhpcy5oYXNTZWxlY3RlZEVsc1doZW5TdGFydCgpKSB7IC8vIGZpbmlzaGVkIGRyYXduIHNlbGVjdGluZyBhcmVhXG4gICAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLnNlbGVjdEFyZWEuY2xlYXIoKVxuICAgICAgLy8gVE9ETzogYWN0aXZlIGZyYW1lIGJ5IHNlbGVjdCByZWN0LlxuICAgICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuY2xlYXIoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIub3V0bGluZUh1ZC5jbGVhcigpXG5cbiAgICBcbiAgICBjb25zdCB7IHg6IGR4LCB5OiBkeSB9ID0gY3R4LmdldERpZmZQb3MoKVxuICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdkbW92ZScsIHRoaXMuc2VsZWN0ZWRFbHMsIGR4LCBkeSlcbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHModGhpcy5zZWxlY3RlZEVscykgLy8gc2V0IGdsb2JhbCBhY3RpdmVkIGVsZW1lbnRzXG4gICAgdGhpcy5zZWxlY3RlZEVscyA9IFtdXG4gIH1cbiAgLy8gbW91c2Vkb3duIG91dHNpZGUgdmlld3BvcnRcbiAgZW5kT3V0c2lkZSgpIHtcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuY2xlYXIoKVxuICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIuc2VsZWN0QXJlYS5jbGVhcigpXG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuY2xlYXIoKVxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxuICB9XG59XG4iLCIvKiogem9vbSAqL1xuXG5jb25zdCB7IGdldFZpZXdCb3ggfSA9IHJlcXVpcmUoXCIuLi91dGlsL3N2Z1wiKVxuXG5leHBvcnQgY2xhc3MgWm9vbU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcbiAgfVxuICBzZXRFZGl0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgfVxuICBnZXRab29tKCkge1xuICAgIGNvbnN0IGFjdHVsV2lkdGggPSBwYXJzZUZsb2F0KHRoaXMuZWRpdG9yLnN2Z1Jvb3QuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKVxuICAgIGNvbnN0IHZpZXdCb3ggPSBnZXRWaWV3Qm94KHRoaXMuZWRpdG9yLnN2Z1Jvb3QpXG4gICAgY29uc3Qgem9vbSA9IGFjdHVsV2lkdGggLyB2aWV3Qm94LndcbiAgICByZXR1cm4gem9vbVxuICB9XG4gIHNldFpvb20oem9vbSkge1xuICAgIGNvbnNvbGUubG9nKHpvb20pXG4gICAgY29uc3Qgdmlld0JveCA9IGdldFZpZXdCb3godGhpcy5lZGl0b3Iuc3ZnUm9vdClcbiAgICBjb25zdCB3aWR0aCA9IHZpZXdCb3gudyAqIHpvb21cbiAgICBjb25zdCBoZWlnaHQgPSB2aWV3Qm94LmggKiB6b29tXG4gICAgdGhpcy5lZGl0b3Iuc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2lkdGgpXG4gICAgdGhpcy5lZGl0b3Iuc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGhlaWdodClcbiAgfVxuICB6b29tSW4oKSB7XG4gICAgY29uc3QgY3VycmVudFpvb20gPSB0aGlzLmdldFpvb20oKVxuICAgIHRoaXMuc2V0Wm9vbShjdXJyZW50Wm9vbSArIDAuMSlcbiAgfVxuICB6b29tT3V0KCkge1xuICAgIGNvbnN0IGN1cnJlbnRab29tID0gdGhpcy5nZXRab29tKClcbiAgICB0aGlzLnNldFpvb20oY3VycmVudFpvb20gLSAwLjEpXG4gIH1cbn0iLCJcbmV4cG9ydCBjbGFzcyBFZGl0b3JTZXR0aW5nIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zZXR0aW5nID0ge1xuICAgICAgLy8gZmlsbDogJyNmZmYnLFxuICAgICAgLy8gc3Ryb2tlOiAnIzAwMCcsXG4gICAgICAvLyBzdHJva2VXaWR0aDogJzJweCcsXG5cbiAgICAgIC8vIG91dGxpbmVXaWR0aFxuICAgICAgLy8gb3V0bGluZUNvbG9yXG4gICAgfVxuICAgIHRoaXMuYmluZGVkRXZlbnRGbnMgPSB7fVxuICAgIHRoaXMuc2V0RmlsbCgnI2ZmZicpXG4gICAgdGhpcy5zZXRTdHJva2UoJyMwMDAnKVxuICAgIHRoaXMuc2V0KCdzdHJva2VXaWR0aCcsICcxcHgnKVxuICB9XG4gIHNldEZpbGwodmFsKSB7XG4gICAgdGhpcy5zZXQoJ2ZpbGwnLCB2YWwpXG4gIH1cbiAgc2V0U3Ryb2tlKHZhbCkge1xuICAgIHRoaXMuc2V0KCdzdHJva2UnLCB2YWwpXG4gIH1cbiAgc2V0KG5hbWUsIHZhbCkge1xuICAgIHRoaXMuc2V0dGluZ1tuYW1lXSA9IHZhbFxuXG4gICAgY29uc3QgdG9DYWxsRm5zID0gdGhpcy5iaW5kZWRFdmVudEZuc1tuYW1lXVxuICAgIGlmICh0b0NhbGxGbnMpIHtcbiAgICAgIHRvQ2FsbEZucy5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgZm4odmFsKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgZ2V0KG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5nW25hbWVdXG4gIH1cbiAgYmluZEV2ZW50KG5hbWUsIGZuKSB7XG4gICAgaWYgKCF0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdKSB7XG4gICAgICB0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdID0gW11cbiAgICB9XG4gICAgdGhpcy5iaW5kZWRFdmVudEZuc1tuYW1lXS5wdXNoKGZuKVxuICB9XG4gIHJlbW92ZUV2ZW50KG5hbWUsIGZuKSB7XG4gICAgaWYgKCF0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdKSByZXR1cm4gZmFsc2VcblxuICAgIGNvbnN0IHJlbW92ZUZuSWR4ID0gdGhpcy5iaW5kZWRFdmVudEZuc1tuYW1lXS5maW5kSW5kZXgoZm4pXG4gICAgaWYgKHJlbW92ZUZuSWR4ID09PSAtMSkgcmV0dXJuIGZhbHNlXG4gICAgdGhpcy5iaW5kZWRFdmVudEZucy5zcGxpY2UocmVtb3ZlRm5JZHgsIDEpXG4gICAgcmV0dXJuIHRydWVcbiAgfVxufSIsImNvbnN0IHsgRWRpdG9yRXZlbnRDb250ZXh0IH0gPSByZXF1aXJlKFwiLi9lZGl0b3JFdmVudENvbnRleHRcIilcblxuZXhwb3J0IGNsYXNzIFRvb2xNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgICB0aGlzLnRvb2xzID0ge31cbiAgICB0aGlzLmN1cnJlbnRUb29sID0gbnVsbFxuICAgIHRoaXMuaW52b2tlV2hlblN3aXRjaCA9ICgpID0+IHt9XG5cbiAgICB0aGlzLmN0eCA9IG51bGwgLy8gdG9vbCBjb250ZXh0XG4gIH1cbiAgc2V0Q3VycmVudFRvb2wobmFtZSkge1xuICAgIHRoaXMuY3VycmVudFRvb2wgPSB0aGlzLnRvb2xzW25hbWVdXG4gICAgdGhpcy5pbnZva2VXaGVuU3dpdGNoKHRoaXMuZ2V0Q3VycmVudFRvb2xOYW1lKCkpXG4gIH1cbiAgb25Td2l0Y2hUb29sKGZuKSB7XG4gICAgdGhpcy5pbnZva2VXaGVuU3dpdGNoID0gZm5cbiAgfVxuICBnZXRDdXJyZW50VG9vbE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFRvb2wubmFtZSgpXG4gIH1cbiAgcmVnaXN0ZXJUb29sKHRvb2wpIHtcbiAgICB0aGlzLnRvb2xzW3Rvb2wubmFtZSgpXSA9IHRvb2xcbiAgICB0b29sLnNldEVkaXRvcih0aGlzLmVkaXRvcikgLy8gZGVwZW5kZW5jeSBpbmplY3Rpb25cbiAgfVxuXG4gIGJpbmRUb29sRXZlbnQoKSB7XG4gICAgY29uc3Qgc3ZnUm9vdCA9IHRoaXMuZWRpdG9yLnN2Z1Jvb3RcblxuICAgIHN2Z1Jvb3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZSA9PiB7XG4gICAgICBjb25zdCBjdHggPSBuZXcgRWRpdG9yRXZlbnRDb250ZXh0KHRoaXMuZWRpdG9yLCBlKVxuICAgICAgdGhpcy5jdHggPSBjdHhcbiAgICAgIHRoaXMuY3VycmVudFRvb2wuc3RhcnQoY3R4KVxuICAgIH0sIGZhbHNlKVxuXG4gICAgc3ZnUm9vdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4XG5cbiAgICAgIGlmICghY3R4KSByZXR1cm4gLy8gaWYgY3R4IGV4aXRzLCBwcmVzZW50IG1vdXNlZG93biBldmVudCBlbWl0IGp1c3QgYmVmb3JlXG4gICAgICBjdHguc2V0T3JpZ2luRXZlbnQoZSlcbiAgICAgIGN0eC5wcmVzc01vdXNlKClcbiAgICAgIHRoaXMuY3VycmVudFRvb2wubW92ZShjdHgpIC8vIG1vdmVcbiAgICB9LCBmYWxzZSlcbiAgICBcbiAgICBzdmdSb290LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlID0+IHtcbiAgICAgIC8vIHRoaXMuY3R4LnJlbGVhc2VNb3VzZSgpXG4gICAgICBjb25zdCBjdHggPSB0aGlzLmN0eFxuICAgICAgLy8gY3R4LnNldE9yaWdpbkV2ZW50KGUpIC8vIHRoZSBvZmZzZXRYIGFuZCBvZmZzZXRZIGluIG1vdXNldXAgYW5kIHRoZSBsYXN0IG1vdXNlbW92ZSBpcyBub3QgZXF1YWwgPz8gXG4gICAgICB0aGlzLmN1cnJlbnRUb29sLmVuZChjdHgpXG4gICAgICBjdHguaXNFbmRJbnNpZGUgPSB0cnVlXG4gICAgfSwgZmFsc2UpXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGUgPT4ge1xuICAgICAgaWYgKHRoaXMuY3R4ICYmIHRoaXMuY3R4LmlzRW5kSW5zaWRlID09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRvb2wuZW5kT3V0c2lkZSh0aGlzLmN0eClcbiAgICAgIH1cbiAgICAgIHRoaXMuY3R4ID0gbnVsbFxuICAgIH0sIGZhbHNlKVxuICB9XG59IiwiXG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm94QnkycG9pbnRzKHgxLCB5MSwgeDIsIHkyKSB7XG4gIGxldCB4LCB5LCB3LCBoXG4gIHcgPSBNYXRoLmFicyh4MiAtIHgxKVxuICBoID0gTWF0aC5hYnMoeTIgLSB5MSlcbiAgeCA9IE1hdGgubWluKHgyLCB4MSlcbiAgeSA9IE1hdGgubWluKHkyLCB5MSlcbiAgcmV0dXJuIHsgeCwgeSwgdywgaCB9XG59IiwiXG4vLyBUT0RPOiB0byBmaW5pc2hcbmV4cG9ydCBmdW5jdGlvbiBnZXRWaWV3Qm94KGVsKSB7XG4gIGNvbnN0IHZhbCA9IGVsLmdldEF0dHJpYnV0ZSgndmlld0JveCcpXG4gIGlmICghdmFsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdoYXMgbm90IHZpZXdCb3ggYXR0cmlidXRlJylcbiAgfVxuICBjb25zdCBbeCwgeSwgdywgaF0gPSB2YWwuc3BsaXQoL1tcXHMsXSsvKS5tYXAoaXRlbSA9PiBwYXJzZUZsb2F0KGl0ZW0pKVxuICByZXR1cm4geyB4LCB5LCB3LCBoIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=