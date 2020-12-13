/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/command.js":
/*!************************!*\
  !*** ./src/command.js ***!
  \************************/
/*! namespace exports */
/*! export AddRectCommand [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Move [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddRectCommand": () => /* binding */ AddRectCommand,
/* harmony export */   "Move": () => /* binding */ Move
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


class Move extends BaseCommand {
  constructor(editor, el, x, y) {
    super()

    this.afterX = x
    this.afterY = y
    this.beforeX = parseFloat(el.getAttribute('x'))
    this.beforeY = parseFloat(el.getAttribute('y'))
    this.el = el

    el.setAttribute('x', x)
    el.setAttribute('y', y)
  }

  static name() {
    return 'move'
  }

  redo() {
    this.el.setAttribute('x', this.afterX)
    this.el.setAttribute('y', this.afterY)
  }

  undo() {
    this.el.setAttribute('x', this.beforeX)
    this.el.setAttribute('y', this.beforeY)
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
commandManager.resigterCommandClass(_command_js__WEBPACK_IMPORTED_MODULE_4__.Move)
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
// select drawRect tool
const drawRectToolBtn = document.createElement('button')
drawRectToolBtn.innerText = 'drawRect'
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
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GuideLine": () => /* binding */ GuideLine
/* harmony export */ });
/**
 * guide line layer
 */

const { NS } = __webpack_require__(/*! ../constants */ "./src/constants.js");

class GuideLine{
  constructor() {
    this.container = document.createElementNS(NS.SVG, 'g')
    this.container.id = 'guide-layout'
    this.rectGuide = new RectGuide(this.container)
  }
  mount(el) {
    el.appendChild(this.container)
  }
}

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
    this.editor.guideLine.rectGuide.drawRect(x, y, w, h)
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
/* harmony import */ var _util_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/math */ "./src/util/math.js");
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
    this.selectedElement = null

    this.outlineStartX = 0
    this.outlineStartY = 0
  }
  name() {
    return 'select'
  }
  setEditor(editor) {
    this.editor = editor
  }
  start(ctx) {
    const targetElement = ctx.originEvent.target
    if (!this.editor.isContentElement(targetElement)) {
      return
    }

    this.selectedElement = targetElement
    const x = parseFloat(targetElement.getAttribute('x'))
    const y = parseFloat(targetElement.getAttribute('y'))
    const w = parseFloat(targetElement.getAttribute('width'))
    const h = parseFloat(targetElement.getAttribute('height'))
    
    this.outlineStartX = x
    this.outlineStartY = y

    this.editor.guideLine.rectGuide.drawRect(x, y, w, h)
  }
  move(ctx) {
    if (!this.selectedElement) {
      // select no element, draw select rect
      const { x: endX, y: endY } = ctx.getPos()
      const { x: startX, y: startY } = ctx.getStartPos()
      const { x, y, w, h } = (0,_util_math__WEBPACK_IMPORTED_MODULE_0__.getBoxBy2points)(startX, startY, endX, endY)
      this.editor.guideLine.rectGuide.drawRect(x, y, w, h)
      return
    }

    const { x: dx, y: dy } = ctx.getDiffPos()
    const rectGuide = this.editor.guideLine.rectGuide
    const w = rectGuide.getWidth()
    const h = rectGuide.getHeight()
    rectGuide.drawRect(this.outlineStartX + dx, this.outlineStartY + dy, w, h)
  }
  end() {
    if (!this.selectedElement) {
      this.editor.guideLine.rectGuide.clear()
      // TODO: active frame by select rect.

      return
    }
    const rectGuide = this.editor.guideLine.rectGuide
    rectGuide.clear()

    const x = rectGuide.getX()
    const y = rectGuide.getY()
    
    this.editor.executeCommand('move', this.selectedElement, x, y)
    this.selectedElement = null
  }
  // mousedown outside viewport
  endOutside() {
    this.editor.guideLine.rectGuide.clear()
    this.selectedElement = null
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2NvbW1hbmQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9jb21tYW5kTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2VkaXRvci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2VkaXRvckV2ZW50Q29udGV4dC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2VkaXRvclNldHRpbmcuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2xheWVyL2d1aWRlTGluZS5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvYWRkUmVjdC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvZHJhZ0NhbnZhcy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvc2VsZWN0LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy96b29tLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvdG9vbE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy91dGlsL21hdGguanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy91dGlsL3N2Zy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQ0FBZ0M7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDhDQUFNO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR087QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLGM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hEZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVkEsQ0FBeUQ7QUFDWjs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLHlCQUF5Qix1REFBUztBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQixtRUFBa0I7QUFDeEM7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEs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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakNBLE9BQU8scUJBQXFCLEdBQUcsbUJBQU8sQ0FBQyx5REFBc0I7O0FBRXREO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7Ozs7OztVQ1RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTlMgfSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5jbGFzcyBCYXNlQ29tbWFuZCB7XG4gIHVuZG8oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwbGVhc2Ugb3ZlcnJpZGUgdW5kbyBtZXRob2QnKVxuICB9XG4gIHJlZG8oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwbGVhc2Ugb3ZlcnJpZGUgcmVkbyBtZXRob2QnKVxuICB9XG59XG5cbi8qKlxuICogYWRkUmVjdFxuICogXG4gKiBhZGQgcmVjdCBzdmcgZWxlbWVudFxuICovXG5leHBvcnQgY2xhc3MgQWRkUmVjdENvbW1hbmQgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgeCwgeSwgdywgaCkge1xuICAgIHN1cGVyKClcbiAgICAvLyBUT0RPOiDkvb/nlKjnvJbovpHlmajkvb/nlKjnmoTpopzoibLnrYnmoLflvI9cbiAgICBjb25zdCByZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ3JlY3QnKVxuICAgIHJlY3Quc2V0QXR0cmlidXRlKCd4JywgeClcbiAgICByZWN0LnNldEF0dHJpYnV0ZSgneScsIHkpXG4gICAgcmVjdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdylcbiAgICByZWN0LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaClcblxuICAgIGNvbnN0IGZpbGwgPSBlZGl0b3Iuc2V0dGluZy5nZXQoJ2ZpbGwnKVxuICAgIGNvbnN0IHN0cm9rZSA9IGVkaXRvci5zZXR0aW5nLmdldCgnc3Ryb2tlJylcbiAgICBjb25zdCBzdHJva2VXaWR0aCA9IGVkaXRvci5zZXR0aW5nLmdldCgnc3Ryb2tlV2lkdGgnKVxuICAgIHJlY3Quc2V0QXR0cmlidXRlKCdmaWxsJywgZmlsbClcbiAgICByZWN0LnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgc3Ryb2tlKVxuICAgIHJlY3Quc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCBzdHJva2VXaWR0aClcblxuICAgIGVkaXRvci5nZXRDdXJyZW50TGF5ZXIoKS5hcHBlbmRDaGlsZChyZWN0KVxuXG4gICAgdGhpcy5uZXh0U2libGluZyA9IHJlY3QubmV4dEVsZW1lbnRTaWJsaW5nIFxuICAgIHRoaXMucGFyZW50ID0gcmVjdC5wYXJlbnRFbGVtZW50XG4gICAgdGhpcy5lbGVtZW50ID0gcmVjdFxuICB9XG5cbiAgc3RhdGljIG5hbWUoKSB7XG4gICAgcmV0dXJuICdhZGRSZWN0J1xuICB9XG5cbiAgcmVkbygpIHtcbiAgICBpZiAodGhpcy5uZXh0U2libGluZykge1xuICAgICAgdGhpcy5wYXJlbnQuaW5zZXJ0QmVmb3JlKHRoaXMuZWxlbWVudCwgdGhpcy5uZXh0U2libGluZylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIHVuZG8oKSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZSgpXG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgTW92ZSBleHRlbmRzIEJhc2VDb21tYW5kIHtcbiAgY29uc3RydWN0b3IoZWRpdG9yLCBlbCwgeCwgeSkge1xuICAgIHN1cGVyKClcblxuICAgIHRoaXMuYWZ0ZXJYID0geFxuICAgIHRoaXMuYWZ0ZXJZID0geVxuICAgIHRoaXMuYmVmb3JlWCA9IHBhcnNlRmxvYXQoZWwuZ2V0QXR0cmlidXRlKCd4JykpXG4gICAgdGhpcy5iZWZvcmVZID0gcGFyc2VGbG9hdChlbC5nZXRBdHRyaWJ1dGUoJ3knKSlcbiAgICB0aGlzLmVsID0gZWxcblxuICAgIGVsLnNldEF0dHJpYnV0ZSgneCcsIHgpXG4gICAgZWwuc2V0QXR0cmlidXRlKCd5JywgeSlcbiAgfVxuXG4gIHN0YXRpYyBuYW1lKCkge1xuICAgIHJldHVybiAnbW92ZSdcbiAgfVxuXG4gIHJlZG8oKSB7XG4gICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ3gnLCB0aGlzLmFmdGVyWClcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgneScsIHRoaXMuYWZ0ZXJZKVxuICB9XG5cbiAgdW5kbygpIHtcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgneCcsIHRoaXMuYmVmb3JlWClcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgneScsIHRoaXMuYmVmb3JlWSlcbiAgfVxufSIsIlxuXG5cblxuLyoqXG4gKiBDb21tYW5kTWFuYWdlclxuICogXG4gKiDlkb3ku6TnrqHnkIbkuoZcbiAqIFxuICogQ29tbWFuZE1hbmFnZXIudW5kbygpXG4gKiBDb21tYW5kTWFuYWdlci5yZWRvKClcbiAqL1xuY2xhc3MgQ29tbWFuZE1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJlZG9TdGFjayA9IFtdXG4gICAgdGhpcy51bmRvU3RhY2sgPSBbXVxuICAgIHRoaXMuY29tbWFuZENsYXNzZXMgPSB7fVxuICB9XG4gIHNldEVkaXRvcihlZGl0b3IpIHtcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICB9XG4gIGV4ZWN1dGUobmFtZSwgLi4uYXJncykge1xuICAgIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKClcbiAgICBjb25zdCBDb21tYW5kQ2xhc3MgPSB0aGlzLmNvbW1hbmRDbGFzc2VzW25hbWVdXG5cbiAgICBjb25zdCBjb21tYW5kID0gbmV3IENvbW1hbmRDbGFzcyh0aGlzLmVkaXRvciwgLi4uYXJncykgLy8g5Yib5bu6IGNvbW1hbmQg5a6e5L6LXG5cbiAgICB0aGlzLnVuZG9TdGFjay5wdXNoKGNvbW1hbmQpXG4gICAgdGhpcy5yZWRvU3RhY2sgPSBbXVxuICB9XG4gIHVuZG8oKSB7XG4gICAgaWYgKHRoaXMudW5kb1N0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc29sZS5sb2coJ+WIsOWktOS6hu+8jOaXoOazlee7p+e7reaSpOWbnicpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgY29tbWFuZCA9IHRoaXMudW5kb1N0YWNrLnBvcCgpXG4gICAgdGhpcy5yZWRvU3RhY2sucHVzaChjb21tYW5kKVxuICAgIGNvbW1hbmQudW5kbygpXG4gIH1cbiAgcmVkbygpIHtcbiAgICBpZiAodGhpcy5yZWRvU3RhY2subGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zb2xlLmxvZygn5Yiw5aS05LqG77yM5peg5rOV57un57ut6YeN5YGaJylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBjb21tYW5kID0gdGhpcy5yZWRvU3RhY2sucG9wKClcbiAgICB0aGlzLnVuZG9TdGFjay5wdXNoKGNvbW1hbmQpXG4gICAgY29tbWFuZC5yZWRvKClcbiAgfVxuXG4gIC8vIOazqOWGjOWRveS7pOexu+WIsOWRveS7pOeuoeeQhuWvueixoeS4reOAglxuICByZXNpZ3RlckNvbW1hbmRDbGFzcyhjb21tYW5kQ2xhc3MpIHtcbiAgICBuYW1lID0gY29tbWFuZENsYXNzLm5hbWUoKS50b0xvd2VyQ2FzZSgpXG4gICAgdGhpcy5jb21tYW5kQ2xhc3Nlc1tuYW1lXSA9IGNvbW1hbmRDbGFzc1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1hbmRNYW5hZ2VyIiwiLy8g5bi46YePXG5cbmNvbnN0IE5TID0ge1xuICBIVE1MOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsXG4gIE1BVEg6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MJyxcbiAgU0U6ICdodHRwOi8vc3ZnLWVkaXQuZ29vZ2xlY29kZS5jb20nLFxuICBTVkc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gIFhMSU5LOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsXG4gIFhNTDogJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZScsXG4gIFhNTE5TOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nIC8vIHNlZSBodHRwOi8vd3d3LnczLm9yZy9UUi9SRUMteG1sLW5hbWVzLyN4bWxSZXNlcnZlZFxufTtcblxuZXhwb3J0IHtcbiAgTlMsXG59IFxuXG5cblxuIiwiaW1wb3J0IHsgRWRpdG9yRXZlbnRDb250ZXh0IH0gZnJvbSBcIi4vZWRpdG9yRXZlbnRDb250ZXh0XCJcbmltcG9ydCB7IEd1aWRlTGluZSB9IGZyb20gXCIuL2xheWVyL2d1aWRlTGluZVwiXG5cbmNsYXNzIEVkaXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2V0dGluZyA9IG51bGxcbiAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyID0gbnVsbFxuICAgIHRoaXMuem9vbU1hbmFnZXIgPSBudWxsXG5cblxuICAgIC8vIGNvbnN0IGNvbnRlbnRXaWR0aCA9IDQwMFxuICAgIC8vIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSAzMDBcbiAgICAvLyBjb25zdCBzdGFnZVdpZHRoID0gMTAwMCAvLyDmraPlnKjnuqDnu5Plkb3lkI1cbiAgICAvLyBjb25zdCBzdGFnZUhlaWdodCA9IDYwMFxuICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPSA4MDBcbiAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IDU1MFxuXG4gICAgY29uc3Qgdmlld3BvcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHZpZXdwb3J0LmlkID0gJ3ZpZXdwb3J0J1xuICAgIHZpZXdwb3J0LnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgIzAwMCdcbiAgICB2aWV3cG9ydC5zdHlsZS53aWR0aCA9IHZpZXdwb3J0V2lkdGggKyAncHgnXG4gICAgdmlld3BvcnQuc3R5bGUuaGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQgKyAncHgnXG4gICAgXG4gICAgY29uc3Qgc3ZnQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBzdmdDb250YWluZXIuaWQgPSAnc3ZnLWNvbnRhaW5lcidcbiAgICBzdmdDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNkZGQnXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLndpZHRoID0gdmlld3BvcnRXaWR0aCArICdweCdcbiAgICBzdmdDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQgKyAncHgnXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCdcbiAgICB0aGlzLnN2Z0NvbnRhaW5lciA9IHN2Z0NvbnRhaW5lclxuXG4gICAgY29uc3Qgc3ZnUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJylcbiAgICBzdmdSb290LmlkID0gJ3N2Zy1yb290J1xuICAgIHN2Z1Jvb3Quc2V0QXR0cmlidXRlKCd3aWR0aCcsIDEwMDApXG4gICAgc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDYwMClcbiAgICBzdmdSb290LnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgMTAwMCA2MDAnKVxuICAgIHRoaXMuc3ZnUm9vdCA9IHN2Z1Jvb3RcblxuICAgIGNvbnN0IHN2Z1N0YWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKVxuICAgIHN2Z1N0YWdlLmlkID0gJ3N2Zy1zdGFnZSdcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgNDAwKVxuICAgIHN2Z1N0YWdlLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgMzAwKVxuICAgIHN2Z1N0YWdlLnNldEF0dHJpYnV0ZSgneCcsIDMwMClcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ3knLCAxNTApXG4gICAgc3ZnU3RhZ2Uuc3R5bGUub3ZlcmZsb3cgPSAndmlzaWJsZSdcbiAgICB0aGlzLnN2Z1N0YWdlID0gc3ZnU3RhZ2VcblxuICAgIGNvbnN0IHN2Z0JnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJylcbiAgICBzdmdCZy5pZCA9ICdiYWNrZ3JvdW5kJ1xuICAgIC8vIHN2Z0JnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCA0MDApXG4gICAgLy8gc3ZnQmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAzMDApXG4gICAgc3ZnQmcuc2V0QXR0cmlidXRlKCd4JywgMClcbiAgICBzdmdCZy5zZXRBdHRyaWJ1dGUoJ3knLCAwKVxuXG4gICAgY29uc3QgYmdSZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdyZWN0JylcbiAgICBiZ1JlY3Quc2V0QXR0cmlidXRlKCd3aWR0aCcsICcxMDAlJylcbiAgICBiZ1JlY3Quc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpXG4gICAgYmdSZWN0LnNldEF0dHJpYnV0ZSgnZmlsbCcsICcjZmZmJylcblxuICAgIGNvbnN0IHN2Z0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2cnKVxuICAgIHN2Z0NvbnRlbnQuaWQgPSAnY29udGVudCdcbiAgICAvLyBzdmdDb250ZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCA0MDApXG4gICAgLy8gc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDMwMClcbiAgICBzdmdDb250ZW50LnNldEF0dHJpYnV0ZSgneCcsIDApXG4gICAgc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3knLCAwKVxuICAgIHRoaXMuc3ZnQ29udGVudCA9IHN2Z0NvbnRlbnRcblxuICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJylcbiAgICBsYXllci5pZCA9ICdsYXllci0xJ1xuICAgIHRoaXMuY3VycmVudExheWVyID0gbGF5ZXJcblxuICAgIHZpZXdwb3J0LmFwcGVuZENoaWxkKHN2Z0NvbnRhaW5lcilcbiAgICBzdmdDb250YWluZXIuYXBwZW5kQ2hpbGQoc3ZnUm9vdClcbiAgICBzdmdSb290LmFwcGVuZENoaWxkKHN2Z1N0YWdlKVxuXG4gICAgc3ZnU3RhZ2UuYXBwZW5kQ2hpbGQoc3ZnQmcpXG4gICAgc3ZnQmcuYXBwZW5kQ2hpbGQoYmdSZWN0KVxuICAgIHN2Z1N0YWdlLmFwcGVuZENoaWxkKHN2Z0NvbnRlbnQpXG4gICAgc3ZnQ29udGVudC5hcHBlbmRDaGlsZChsYXllcilcblxuXG4gICAgdGhpcy5ndWlkZUxpbmUgPSBuZXcgR3VpZGVMaW5lKClcbiAgICB0aGlzLmd1aWRlTGluZS5tb3VudChzdmdTdGFnZSlcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpXG4gIH1cbiAgZ2V0Q3VycmVudExheWVyKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRMYXllclxuICB9XG5cbiAgc2V0VG9vbE1hbmFnZXIodG9vbE1hbmFnZXIpIHtcbiAgICB0aGlzLnRvb2xNYW5hZ2VyID0gdG9vbE1hbmFnZXJcbiAgfVxuICAvLyB0b29sIHJlbGF0aXZlZCBtZXRob2RzXG4gIHNldEN1cnJlbnRUb29sKG5hbWUpIHtcbiAgICB0aGlzLnRvb2xNYW5hZ2VyLnNldEN1cnJlbnRUb29sKG5hbWUpXG4gIH1cbiAgcmVnaXN0ZXJUb29sKHRvb2wpIHtcbiAgICB0aGlzLnRvb2xNYW5hZ2VyLnJlZ2lzdGVyVG9vbCh0b29sKVxuICB9XG4gIHNldFNldHRpbmcoc2V0dGluZykge1xuICAgIHRoaXMuc2V0dGluZyA9IHNldHRpbmdcbiAgfVxuXG4gIC8vIOWRveS7pOebuOWFs1xuICBzZXRDb21tYW5kTWFuYWdlcihjb21tYW5kTWFuYWdlcikge1xuICAgIHRoaXMuY29tbWFuZE1hbmFnZXIgPSBjb21tYW5kTWFuYWdlclxuICAgIGNvbW1hbmRNYW5hZ2VyLnNldEVkaXRvcih0aGlzKVxuICB9XG4gIGV4ZWN1dGVDb21tYW5kKG5hbWUsIC4uLnBhcmFtcykge1xuICAgIGlmIChuYW1lID09ICd1bmRvJykge1xuICAgICAgdGhpcy5jb21tYW5kTWFuYWdlci51bmRvKClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAobmFtZSA9PSAncmVkbycpIHtcbiAgICAgIHRoaXMuY29tbWFuZE1hbmFnZXIucmVkbygpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5jb21tYW5kTWFuYWdlci5leGVjdXRlKG5hbWUsIC4uLnBhcmFtcylcbiAgfVxuXG4gIC8vIHpvb21cbiAgc2V0Wm9vbU1hbmFnZXIoem9vbU1hbmFnZXIpIHtcbiAgICB6b29tTWFuYWdlci5zZXRFZGl0b3IodGhpcylcbiAgICB0aGlzLnpvb21NYW5hZ2VyID0gem9vbU1hbmFnZXJcbiAgfVxuICBnZXRab29tKCkgeyAvLyDlsIHoo4VcbiAgICByZXR1cm4gdGhpcy56b29tTWFuYWdlci5nZXRab29tKClcbiAgfVxuXG4gIGdldFNjcm9sbCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogdGhpcy5zdmdDb250YWluZXIuc2Nyb2xsTGVmdCxcbiAgICAgIHk6IHRoaXMuc3ZnQ29udGFpbmVyLnNjcm9sbFRvcCxcbiAgICB9XG4gIH1cbiAgc2V0U2Nyb2xsKHgsIHkpIHtcbiAgICB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxMZWZ0ID0geFxuICAgIHRoaXMuc3ZnQ29udGFpbmVyLnNjcm9sbFRvcCA9IHlcbiAgfVxuICBnZXRDb250ZW50T2Zmc2V0KCkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiB0aGlzLnN2Z1N0YWdlLmdldEF0dHJpYnV0ZSgneCcpLFxuICAgICAgeTogdGhpcy5zdmdTdGFnZS5nZXRBdHRyaWJ1dGUoJ3knKSxcbiAgICB9XG4gIH1cblxuICBpc0NvbnRlbnRFbGVtZW50KGVsKSB7XG4gICAgd2hpbGUgKGVsKSB7XG4gICAgICBpZiAoZWwucGFyZW50RWxlbWVudCA9PSB0aGlzLnN2Z0NvbnRlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIGlmIChlbC5wYXJlbnRFbGVtZW50ID09IHRoaXMuc3ZnUm9vdCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudFxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGJpbmRUb29sRXZlbnQoKSB7XG4gICAgdGhpcy5zdmdSb290LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGUgPT4ge1xuICAgICAgY29uc3QgY3R4ID0gbmV3IEVkaXRvckV2ZW50Q29udGV4dCh0aGlzLCBlKVxuICAgICAgdGhpcy5jdHggPSBjdHhcbiAgICAgIHRoaXMuY3VycmVudFRvb2wuc3RhcnQoY3R4KVxuICAgIH0sIGZhbHNlKVxuXG4gICAgdGhpcy5zdmdSb290LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGUgPT4ge1xuICAgICAgY29uc3QgY3R4ID0gdGhpcy5jdHhcblxuICAgICAgaWYgKCFjdHgpIHJldHVybiAvLyBpZiBjdHggZXhpdHMsIHByZXNlbnQgbW91c2Vkb3duIGV2ZW50IGVtaXQganVzdCBiZWZvcmVcbiAgICAgIGN0eC5zZXRPcmlnaW5FdmVudChlKVxuICAgICAgY3R4LnByZXNzTW91c2UoKVxuICAgICAgdGhpcy5jdXJyZW50VG9vbC5tb3ZlKGN0eClcbiAgICB9LCBmYWxzZSlcbiAgICBcbiAgICB0aGlzLnN2Z1Jvb3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGUgPT4ge1xuICAgICAgLy8gdGhpcy5jdHgucmVsZWFzZU1vdXNlKClcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4XG4gICAgICAvLyBjdHguc2V0T3JpZ2luRXZlbnQoZSkgLy8gdGhlIG9mZnNldFggYW5kIG9mZnNldFkgaW4gbW91c2V1cCBhbmQgdGhlIGxhc3QgbW91c2Vtb3ZlIGlzIG5vdCBlcXVhbCA/PyBcbiAgICAgIHRoaXMuY3VycmVudFRvb2wuZW5kKGN0eClcbiAgICAgIGN0eC5pc0VuZEluc2lkZSA9IHRydWVcbiAgICB9LCBmYWxzZSlcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZSA9PiB7XG4gICAgICBpZiAodGhpcy5jdHggJiYgdGhpcy5jdHguaXNFbmRJbnNpZGUgPT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VG9vbC5lbmRPdXRzaWRlKHRoaXMuY3R4KVxuICAgICAgfVxuICAgICAgdGhpcy5jdHggPSBudWxsXG4gICAgfSwgZmFsc2UpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRWRpdG9yXG4iLCJcbi8qKlxuICogY29udGV4dCBjbGFzc1xuICogXG4gKiB1c2VkIGZvciB0b29sIGV2ZW50XG4gKi9cblxuZXhwb3J0IGNsYXNzIEVkaXRvckV2ZW50Q29udGV4dCB7XG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgZSkge1xuICAgIHRoaXMubW91c2VQcmVzc2VkID0gZmFsc2VcbiAgICB0aGlzLm9yaWdpbkV2ZW50ID0gZVxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gICAgdGhpcy5pc0VuZEluc2lkZSA9IGZhbHNlXG5cbiAgICB0aGlzLnN0YXJ0WCA9IDBcbiAgICB0aGlzLnN0YXJ0WSA9IDBcblxuICAgIHRoaXMub2Zmc2V0WCA9IDBcbiAgICB0aGlzLm9mZnNldFkgPSAwXG5cbiAgICB0aGlzLnN0YXJ0Q2xpZW50WCA9IDAgLy8gdXNlZCB0byBjYWxjIGR4IGFuZCBkeS5cbiAgICB0aGlzLnN0YXJ0Q2xpZW50WSA9IDBcbiAgICB0aGlzLmR4ID0gMFxuICAgIHRoaXMuZHkgPSAwXG5cbiAgICB0aGlzLnNldFN0YXJ0UG9zKClcbiAgfVxuICBzZXRPcmlnaW5FdmVudChlKSB7XG4gICAgdGhpcy5vcmlnaW5FdmVudCA9IGVcbiAgfVxuICBzZXRTdGFydFBvcygpIHtcbiAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMuZ2V0UG9zKClcblxuICAgIHRoaXMuc3RhcnRYID0geFxuICAgIHRoaXMuc3RhcnRZID0geVxuXG4gICAgdGhpcy5zdGFydENsaWVudFggPSB0aGlzLm9yaWdpbkV2ZW50LmNsaWVudFhcbiAgICB0aGlzLnN0YXJ0Q2xpZW50WSA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WVxuICB9XG4gIHJlbGVhc2VNb3VzZSgpIHtcbiAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IGZhbHNlXG4gIH1cbiAgcHJlc3NNb3VzZSgpIHtcbiAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IHRydWVcbiAgfVxuICBnZXRQb3MoKSB7XG4gICAgY29uc3Qgem9vbSA9IHRoaXMuZWRpdG9yLmdldFpvb20oKVxuICAgIGNvbnN0IHt4LCB5fSA9IHRoaXMuZWRpdG9yLmdldENvbnRlbnRPZmZzZXQoKVxuICAgIHJldHVybiB7IFxuICAgICAgeDogdGhpcy5vcmlnaW5FdmVudC5vZmZzZXRYIC8gem9vbSAtIHgsIFxuICAgICAgeTogdGhpcy5vcmlnaW5FdmVudC5vZmZzZXRZIC8gem9vbSAtIHksXG4gICAgfVxuICB9XG4gIGdldFN0YXJ0UG9zKCkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiB0aGlzLnN0YXJ0WCxcbiAgICAgIHk6IHRoaXMuc3RhcnRZLFxuICAgIH1cbiAgfVxuICAvLyB3aXRob3V0IGNhbGMgd2l0aCB6b29tIHZhbHVlXG4gIGdldERpZmZQb3MoKSB7XG4gICAgY29uc3QgeCA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WCAtIHRoaXMuc3RhcnRDbGllbnRYXG4gICAgY29uc3QgeSA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WSAtIHRoaXMuc3RhcnRDbGllbnRZXG4gICAgcmV0dXJuIHsgeCwgeSB9XG4gIH1cblxufSIsIlxuZXhwb3J0IGNsYXNzIEVkaXRvclNldHRpbmcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNldHRpbmcgPSB7XG4gICAgICBmaWxsOiAnI2ZmZicsXG4gICAgICBzdHJva2U6ICcjMDAwJyxcbiAgICAgIHN0cm9rZVdpZHRoOiAnMnB4JyxcblxuICAgICAgLy8gb3V0bGluZVdpZHRoXG4gICAgICAvLyBvdXRsaW5lQ29sb3JcbiAgICB9XG4gIH1cbiAgc2V0RmlsbCh2YWwpIHtcbiAgICB0aGlzLnNldHRpbmcuZmlsbCA9IHZhbFxuICB9XG4gIHNldFN0cm9rZSh2YWwpIHtcbiAgICB0aGlzLnNldHRpbmcuZmlsbCA9IHZhbFxuICB9XG4gIHNldChuYW1lLCB2YWwpIHtcbiAgICB0aGlzLnNldHRpbmdbbmFtZV0gPSB2YWxcbiAgfVxuICBnZXQobmFtZSkge1xuICAgIHJldHVybiB0aGlzLnNldHRpbmdbbmFtZV1cbiAgfVxufSIsImltcG9ydCBDb21tYW5kTWFuYWdlciBmcm9tICcuL2NvbW1hbmRNYW5hZ2VyLmpzJ1xuaW1wb3J0IEVkaXRvciBmcm9tICcuL2VkaXRvci5qcydcbmltcG9ydCBBZGRSZWN0IGZyb20gJy4vbW9kdWxlcy9hZGRSZWN0LmpzJ1xuaW1wb3J0IHsgRHJhZ0NhbnZhcyB9IGZyb20gJy4vbW9kdWxlcy9kcmFnQ2FudmFzLmpzJ1xuXG5pbXBvcnQgeyBBZGRSZWN0Q29tbWFuZCwgTW92ZSB9IGZyb20gJy4vY29tbWFuZC5qcydcbmltcG9ydCB7IEVkaXRvclNldHRpbmcgfSBmcm9tICcuL2VkaXRvclNldHRpbmcuanMnXG5pbXBvcnQgeyBab29tTWFuYWdlciB9IGZyb20gJy4vbW9kdWxlcy96b29tLmpzJ1xuaW1wb3J0IHsgU2VsZWN0IH0gZnJvbSAnLi9tb2R1bGVzL3NlbGVjdC5qcydcbmltcG9ydCB7IFRvb2xNYW5hZ2VyIH0gZnJvbSAnLi90b29sTWFuYWdlci5qcydcblxuY29uc3QgZWRpdG9yID0gbmV3IEVkaXRvcigpXG5cbi8vIHJlZ2lzdGVyIGNvbW1hbmRzXG5jb25zdCBjb21tYW5kTWFuYWdlciA9IG5ldyBDb21tYW5kTWFuYWdlcigpXG5jb21tYW5kTWFuYWdlci5yZXNpZ3RlckNvbW1hbmRDbGFzcyhBZGRSZWN0Q29tbWFuZClcbmNvbW1hbmRNYW5hZ2VyLnJlc2lndGVyQ29tbWFuZENsYXNzKE1vdmUpXG4vLyBzZXR0aW5nXG5lZGl0b3Iuc2V0U2V0dGluZyhuZXcgRWRpdG9yU2V0dGluZygpKVxuXG5lZGl0b3Iuc2V0Q29tbWFuZE1hbmFnZXIoY29tbWFuZE1hbmFnZXIpXG4vLyByZWdpc3RlciB0b29sc1xuXG5jb25zdCB0b29sTWFuYWdlciA9IG5ldyBUb29sTWFuYWdlcihlZGl0b3IpXG5lZGl0b3Iuc2V0VG9vbE1hbmFnZXIodG9vbE1hbmFnZXIpXG50b29sTWFuYWdlci5yZWdpc3RlclRvb2wobmV3IEFkZFJlY3QoKSlcbnRvb2xNYW5hZ2VyLnJlZ2lzdGVyVG9vbChuZXcgRHJhZ0NhbnZhcygpKVxudG9vbE1hbmFnZXIucmVnaXN0ZXJUb29sKG5ldyBTZWxlY3QoKSlcbi8vIHRvb2xNYW5hZ2VyLnNldEN1cnJlbnRUb29sKCdhZGRSZWN0JylcbnRvb2xNYW5hZ2VyLnNldEN1cnJlbnRUb29sKCdzZWxlY3QnKVxudG9vbE1hbmFnZXIuYmluZFRvb2xFdmVudCgpXG4vLyB6b29tXG5lZGl0b3Iuc2V0Wm9vbU1hbmFnZXIobmV3IFpvb21NYW5hZ2VyKCkpXG5cblxuLyoqIFxuICogYmluZCBldmVudCBpbiBidXR0b25cbiAqLyBcblxuLy8gdW5kb1xuY29uc3QgdW5kb0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG51bmRvQnRuLmlubmVyVGV4dCA9ICd1bmRvJ1xudW5kb0J0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIGVkaXRvci5leGVjdXRlQ29tbWFuZCgndW5kbycpXG59XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHVuZG9CdG4pXG4vLyByZWRvXG5jb25zdCByZWRvQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbnJlZG9CdG4uaW5uZXJUZXh0ID0gJ3JlZG8nXG5yZWRvQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdyZWRvJylcbn1cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVkb0J0bilcbi8vIHpvb21JblxuY29uc3Qgem9vbUluQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbnpvb21JbkJ0bi5pbm5lclRleHQgPSAnem9vbUluJ1xuem9vbUluQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLnpvb21NYW5hZ2VyLnpvb21JbigpXG59XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHpvb21JbkJ0bilcbi8vIHpvb21PdXRcbmNvbnN0IHpvb21PdXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuem9vbU91dEJ0bi5pbm5lclRleHQgPSAnem9vbU91dCdcbnpvb21PdXRCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBlZGl0b3Iuem9vbU1hbmFnZXIuem9vbU91dCgpXG59XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHpvb21PdXRCdG4pXG4vLyBzZWxlY3QgZHJhd1JlY3QgdG9vbFxuY29uc3QgZHJhd1JlY3RUb29sQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbmRyYXdSZWN0VG9vbEJ0bi5pbm5lclRleHQgPSAnZHJhd1JlY3QnXG5kcmF3UmVjdFRvb2xCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBlZGl0b3Iuc2V0Q3VycmVudFRvb2woJ2FkZFJlY3QnKVxufVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkcmF3UmVjdFRvb2xCdG4pXG4vLyBzZWxlY3QgZHJhZ2NhbnZhcyB0b29sXG5jb25zdCBkcmFnQ2FudmFzVG9vbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG5kcmFnQ2FudmFzVG9vbEJ0bi5pbm5lclRleHQgPSAnZHJhZ0NhbnZhcydcbmRyYWdDYW52YXNUb29sQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLnNldEN1cnJlbnRUb29sKCdkcmFnQ2FudmFzJylcbn1cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZHJhZ0NhbnZhc1Rvb2xCdG4pXG4vLyBzZWxlY3QgdG9vbFxuY29uc3Qgc2VsZWN0VG9vbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG5zZWxlY3RUb29sQnRuLmlubmVyVGV4dCA9ICdzZWxlY3QnXG5zZWxlY3RUb29sQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLnNldEN1cnJlbnRUb29sKCdzZWxlY3QnKVxufVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWxlY3RUb29sQnRuKVxuXG4vKipcbiAqIOeQhuaDsyBhcGkg5L2/55So5L6L5a2QXG4gKiBcbiAqIGNvbnN0IGVkaXRvckJ1aWxkZXIgPSBuZXcgRWRpdG9yLmJ1aWxkZXIoKVxuICogZWRpdG9yQnVpbGRlclxuICogICAuc2V0Q2FudmFzU2l6ZSg0MDAsIDMwMClcbiAqICAgLnNldFN0YWdlU2l6ZSgxMDAwLCA4MDApXG4gKiAgIC5zZXRWaWV3cG9ydFNpemUoODAwLCA1MDApXG4gKiAgIC5zZXRab29tKDEwMClcbiAqIFxuICogY29uc3QgZWRpdG9yID0gZWRpdG9yQnVpbGRlci5idWlsZCgpXG4gKiBlZGl0b3IucmVnaXN0ZXJUb29sKHRvb2xNb3ZlKVxuICogXG4gKi8iLCIvKipcbiAqIGd1aWRlIGxpbmUgbGF5ZXJcbiAqL1xuXG5jb25zdCB7IE5TIH0gPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzXCIpO1xuXG5leHBvcnQgY2xhc3MgR3VpZGVMaW5le1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdnJylcbiAgICB0aGlzLmNvbnRhaW5lci5pZCA9ICdndWlkZS1sYXlvdXQnXG4gICAgdGhpcy5yZWN0R3VpZGUgPSBuZXcgUmVjdEd1aWRlKHRoaXMuY29udGFpbmVyKVxuICB9XG4gIG1vdW50KGVsKSB7XG4gICAgZWwuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpXG4gIH1cbn1cblxuY2xhc3MgUmVjdEd1aWRlIHtcbiAgY29uc3RydWN0b3IocGFyZW50KSB7XG4gICAgdGhpcy54ID0gMFxuICAgIHRoaXMueSA9IDBcbiAgICB0aGlzLncgPSAwXG4gICAgdGhpcy5oID0gMFxuXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAnZycpXG4gICAgdGhpcy5jb250YWluZXIuaWQgPSAncmVjdC1ndWlkZSdcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpXG5cbiAgICB0aGlzLm91dGxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAncGF0aCcpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJylcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAnI2YwNCcpXG5cbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLm91dGxpbmUpXG4gIH1cbiAgY2xlYXIoKSB7XG4gICAgLy8gcGFyZW50LmlubmVySFRNTCA9ICcnXG4gICAgdGhpcy5vdXRsaW5lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgfVxuICBkcmF3UmVjdCh4LCB5LCB3LCBoKSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLncgPSB3XG4gICAgdGhpcy5oID0gaFxuXG4gICAgLy8gd2h5IGRvbid0IEkgdXNlIHJlY3QsIGp1c3Qgc29sdmUgdGhlIGNvbmRpdGlvbiB3aGVuIHdpZHRoIG9yIGhlaWdodCBpcyAwIHRoZSBvdXRsaW5lIGlzIGRpc2FwcGVyXG4gICAgY29uc3QgZCA9IGBNICR7eH0gJHt5fSBMICR7eCt3fSAke3l9IEwgJHt4K3d9ICR7eStofSBMICR7eH0gJHt5K2h9IFpgXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZCcsIGQpXG5cbiAgICAvKiB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd4JywgeClcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd5JywgeSlcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHcpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaCkgKi9cbiAgICB0aGlzLm91dGxpbmUuc3R5bGUuZGlzcGxheSA9ICcnXG4gIH1cbiAgZ2V0V2lkdGgoKSB7IHJldHVybiB0aGlzLncgfVxuICBnZXRIZWlnaHQoKSB7IHJldHVybiB0aGlzLmggfVxuICBnZXRYKCkgeyByZXR1cm4gdGhpcy54IH1cbiAgZ2V0WSgpIHsgcmV0dXJuIHRoaXMueSB9XG59XG4iLCJcbmltcG9ydCB7IGdldEJveEJ5MnBvaW50cyB9IGZyb20gXCIuLi91dGlsL21hdGhcIlxuXG5jbGFzcyBBZGRSZWN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBudWxsXG4gIH1cbiAgbmFtZSgpIHtcbiAgICByZXR1cm4gJ2FkZFJlY3QnXG4gIH1cbiAgc2V0RWRpdG9yKGVkaXRvcikgeyAvLyDkvp3otZbms6jlhaVcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICB9XG4gIHN0YXJ0KGN0eCkge31cbiAgbW92ZShjdHgpIHtcbiAgICBjb25zdCB7IHg6IGVuZFgsIHk6IGVuZFkgfSA9IGN0eC5nZXRQb3MoKVxuICAgIGNvbnN0IHsgeDogc3RhcnRYLCB5OiBzdGFydFkgfSA9IGN0eC5nZXRTdGFydFBvcygpXG4gICAgY29uc3QgeyB4LCB5LCB3LCBoIH0gPSBnZXRCb3hCeTJwb2ludHMoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpXG4gICAgdGhpcy5lZGl0b3IuZ3VpZGVMaW5lLnJlY3RHdWlkZS5kcmF3UmVjdCh4LCB5LCB3LCBoKVxuICB9XG4gIGVuZChjdHgpIHtcbiAgICB0aGlzLmVkaXRvci5ndWlkZUxpbmUucmVjdEd1aWRlLmNsZWFyKClcblxuICAgIGNvbnN0IHsgeDogZW5kWCwgeTogZW5kWSB9ID0gY3R4LmdldFBvcygpXG4gICAgY29uc3QgeyB4OiBzdGFydFgsIHk6IHN0YXJ0WSB9ID0gY3R4LmdldFN0YXJ0UG9zKClcbiAgICBjb25zdCB7IHgsIHksIHcsIGggfSA9IGdldEJveEJ5MnBvaW50cyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSlcbiAgICBpZiAodyA8IDIgJiYgaCA8IDIpIHtcbiAgICAgIC8vIFRPRE86IG9wZW4gYSBkaWFsb2cgdG8gaW5wdXQgd2lkdGggYW5kIGhlaWdodFxuICAgICAgY29uc29sZS5sb2coJ3dpZHRoIGFuZCBoZWlnaHQgYm90aCBsZXNzIGVxdWFsIHRvIDLvvIxkcmF3aW5nIG5vdGhpbmcnKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdhZGRSZWN0JywgeCwgeSwgdywgaClcbiAgfVxuICAvLyBtb3VzZWRvd24gb3V0c2lkZSB2aWV3cG9ydFxuICBlbmRPdXRzaWRlKCkge1xuICAgIHRoaXMuZWRpdG9yLmd1aWRlTGluZS5yZWN0R3VpZGUuY2xlYXIoKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFkZFJlY3QiLCJcbmV4cG9ydCBjbGFzcyBEcmFnQ2FudmFzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdGFydE9mZnNldFggPSAwXG4gICAgdGhpcy5zdGFydE9mZnNldFkgPSAwXG4gIH1cbiAgbmFtZSgpIHtcbiAgICByZXR1cm4gJ2RyYWdDYW52YXMnXG4gIH1cbiAgc2V0RWRpdG9yKGVkaXRvcikgeyAvLyDkvp3otZbms6jlhaVcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICB9XG4gIGJlZm9yZUFjdGl2ZSgpIHtcbiAgICAvLyBkbyBzb21ldGhpbmcgYmVmb3JlIHN3aXRjaCB0byBjdXJyZW50IHRvb2xcbiAgfVxuICBzdGFydChjdHgpIHtcbiAgICBjb25zdCBzY3JvbGwgPSB0aGlzLmVkaXRvci5nZXRTY3JvbGwoKVxuICAgIHRoaXMuc3RhcnRPZmZzZXRYID0gc2Nyb2xsLnhcbiAgICB0aGlzLnN0YXJ0T2Zmc2V0WSA9IHNjcm9sbC55XG4gIH1cbiAgbW92ZShjdHgpIHtcbiAgICBjb25zdCB6b29tID0gdGhpcy5lZGl0b3IuZ2V0Wm9vbSgpXG4gICAgY29uc3QgeyB4OiBkeCwgeTogZHkgfSA9IGN0eC5nZXREaWZmUG9zKClcbiAgICB0aGlzLmVkaXRvci5zZXRTY3JvbGwodGhpcy5zdGFydE9mZnNldFggLSBkeCwgdGhpcy5zdGFydE9mZnNldFkgLSBkeSlcbiAgfVxuICBlbmQoKSB7fVxuICBlbmRPdXRzaWRlKCkge31cbn1cbiIsImltcG9ydCB7IGdldEJveEJ5MnBvaW50cyB9IGZyb20gXCIuLi91dGlsL21hdGhcIlxuXG4vKipcbiAqIHNlbGVjdFxuICogXG4gKiDmraTmqKHlnZfpnZ7luLjlpI3mnYJcbiAqIFxuICogMS4g6byg5qCH5oyJ5LiL5pe277yM6YCJ5Lit5Y2V5Liq5YWD57SgXG4gKiAyLiDpvKDmoIfmjInkuIvkuLrnqbrvvIzmi5bmi73ml7bkuqfnlJ/pgInkuK3moYbvvIzlj6/ku6XpgInmi6nlpJrkuKrlhYPntKBcbiAqIDMuIOmAieS4reWNleS4qu+8iOaIlumAieWMuumAieS4reWkmuS4qu+8iSDnvKnmlL4g562J5o6n5Yi254K577yM5ouW5ou95pS55Y+Y5a696auYXG4gKiAzLiDliIfmlq3liIDov5nkuKrlt6Xlhbfml7bvvIzmv4DmtLvnmoTlhYPntKDov5vlhaXooqvpgInkuK3nirbmgIHvvIjova7lu5Pnur8r5o6n5Yi254K577yJ44CCXG4gKiA0LiDpgInljLrlkozlhYPntKDnm7jkuqTnmoTliKTlrppcbiAqIDUuIOa/gOa0u+WFg+e0oOWmguS9leS/neWtmO+8jOS/neWtmOWIsOWTqumHjFxuICovXG5leHBvcnQgY2xhc3MgU2VsZWN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBudWxsXG4gICAgdGhpcy5zZWxlY3RlZEVsZW1lbnQgPSBudWxsXG5cbiAgICB0aGlzLm91dGxpbmVTdGFydFggPSAwXG4gICAgdGhpcy5vdXRsaW5lU3RhcnRZID0gMFxuICB9XG4gIG5hbWUoKSB7XG4gICAgcmV0dXJuICdzZWxlY3QnXG4gIH1cbiAgc2V0RWRpdG9yKGVkaXRvcikge1xuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gIH1cbiAgc3RhcnQoY3R4KSB7XG4gICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGN0eC5vcmlnaW5FdmVudC50YXJnZXRcbiAgICBpZiAoIXRoaXMuZWRpdG9yLmlzQ29udGVudEVsZW1lbnQodGFyZ2V0RWxlbWVudCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWRFbGVtZW50ID0gdGFyZ2V0RWxlbWVudFxuICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KHRhcmdldEVsZW1lbnQuZ2V0QXR0cmlidXRlKCd4JykpXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQodGFyZ2V0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3knKSlcbiAgICBjb25zdCB3ID0gcGFyc2VGbG9hdCh0YXJnZXRFbGVtZW50LmdldEF0dHJpYnV0ZSgnd2lkdGgnKSlcbiAgICBjb25zdCBoID0gcGFyc2VGbG9hdCh0YXJnZXRFbGVtZW50LmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykpXG4gICAgXG4gICAgdGhpcy5vdXRsaW5lU3RhcnRYID0geFxuICAgIHRoaXMub3V0bGluZVN0YXJ0WSA9IHlcblxuICAgIHRoaXMuZWRpdG9yLmd1aWRlTGluZS5yZWN0R3VpZGUuZHJhd1JlY3QoeCwgeSwgdywgaClcbiAgfVxuICBtb3ZlKGN0eCkge1xuICAgIGlmICghdGhpcy5zZWxlY3RlZEVsZW1lbnQpIHtcbiAgICAgIC8vIHNlbGVjdCBubyBlbGVtZW50LCBkcmF3IHNlbGVjdCByZWN0XG4gICAgICBjb25zdCB7IHg6IGVuZFgsIHk6IGVuZFkgfSA9IGN0eC5nZXRQb3MoKVxuICAgICAgY29uc3QgeyB4OiBzdGFydFgsIHk6IHN0YXJ0WSB9ID0gY3R4LmdldFN0YXJ0UG9zKClcbiAgICAgIGNvbnN0IHsgeCwgeSwgdywgaCB9ID0gZ2V0Qm94QnkycG9pbnRzKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZKVxuICAgICAgdGhpcy5lZGl0b3IuZ3VpZGVMaW5lLnJlY3RHdWlkZS5kcmF3UmVjdCh4LCB5LCB3LCBoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgeyB4OiBkeCwgeTogZHkgfSA9IGN0eC5nZXREaWZmUG9zKClcbiAgICBjb25zdCByZWN0R3VpZGUgPSB0aGlzLmVkaXRvci5ndWlkZUxpbmUucmVjdEd1aWRlXG4gICAgY29uc3QgdyA9IHJlY3RHdWlkZS5nZXRXaWR0aCgpXG4gICAgY29uc3QgaCA9IHJlY3RHdWlkZS5nZXRIZWlnaHQoKVxuICAgIHJlY3RHdWlkZS5kcmF3UmVjdCh0aGlzLm91dGxpbmVTdGFydFggKyBkeCwgdGhpcy5vdXRsaW5lU3RhcnRZICsgZHksIHcsIGgpXG4gIH1cbiAgZW5kKCkge1xuICAgIGlmICghdGhpcy5zZWxlY3RlZEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuZWRpdG9yLmd1aWRlTGluZS5yZWN0R3VpZGUuY2xlYXIoKVxuICAgICAgLy8gVE9ETzogYWN0aXZlIGZyYW1lIGJ5IHNlbGVjdCByZWN0LlxuXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgcmVjdEd1aWRlID0gdGhpcy5lZGl0b3IuZ3VpZGVMaW5lLnJlY3RHdWlkZVxuICAgIHJlY3RHdWlkZS5jbGVhcigpXG5cbiAgICBjb25zdCB4ID0gcmVjdEd1aWRlLmdldFgoKVxuICAgIGNvbnN0IHkgPSByZWN0R3VpZGUuZ2V0WSgpXG4gICAgXG4gICAgdGhpcy5lZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ21vdmUnLCB0aGlzLnNlbGVjdGVkRWxlbWVudCwgeCwgeSlcbiAgICB0aGlzLnNlbGVjdGVkRWxlbWVudCA9IG51bGxcbiAgfVxuICAvLyBtb3VzZWRvd24gb3V0c2lkZSB2aWV3cG9ydFxuICBlbmRPdXRzaWRlKCkge1xuICAgIHRoaXMuZWRpdG9yLmd1aWRlTGluZS5yZWN0R3VpZGUuY2xlYXIoKVxuICAgIHRoaXMuc2VsZWN0ZWRFbGVtZW50ID0gbnVsbFxuICB9XG59XG4iLCIvKiogem9vbSAqL1xuXG5jb25zdCB7IGdldFZpZXdCb3ggfSA9IHJlcXVpcmUoXCIuLi91dGlsL3N2Z1wiKVxuXG5leHBvcnQgY2xhc3MgWm9vbU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcbiAgfVxuICBzZXRFZGl0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgfVxuICBnZXRab29tKCkge1xuICAgIGNvbnN0IGFjdHVsV2lkdGggPSBwYXJzZUZsb2F0KHRoaXMuZWRpdG9yLnN2Z1Jvb3QuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKVxuICAgIGNvbnN0IHZpZXdCb3ggPSBnZXRWaWV3Qm94KHRoaXMuZWRpdG9yLnN2Z1Jvb3QpXG4gICAgY29uc3Qgem9vbSA9IGFjdHVsV2lkdGggLyB2aWV3Qm94LndcbiAgICByZXR1cm4gem9vbVxuICB9XG4gIHNldFpvb20oem9vbSkge1xuICAgIGNvbnNvbGUubG9nKHpvb20pXG4gICAgY29uc3Qgdmlld0JveCA9IGdldFZpZXdCb3godGhpcy5lZGl0b3Iuc3ZnUm9vdClcbiAgICBjb25zdCB3aWR0aCA9IHZpZXdCb3gudyAqIHpvb21cbiAgICBjb25zdCBoZWlnaHQgPSB2aWV3Qm94LmggKiB6b29tXG4gICAgdGhpcy5lZGl0b3Iuc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2lkdGgpXG4gICAgdGhpcy5lZGl0b3Iuc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGhlaWdodClcbiAgfVxuICB6b29tSW4oKSB7XG4gICAgY29uc3QgY3VycmVudFpvb20gPSB0aGlzLmdldFpvb20oKVxuICAgIHRoaXMuc2V0Wm9vbShjdXJyZW50Wm9vbSArIDAuMSlcbiAgfVxuICB6b29tT3V0KCkge1xuICAgIGNvbnN0IGN1cnJlbnRab29tID0gdGhpcy5nZXRab29tKClcbiAgICB0aGlzLnNldFpvb20oY3VycmVudFpvb20gLSAwLjEpXG4gIH1cbn0iLCJjb25zdCB7IEVkaXRvckV2ZW50Q29udGV4dCB9ID0gcmVxdWlyZShcIi4vZWRpdG9yRXZlbnRDb250ZXh0XCIpXG5cbmV4cG9ydCBjbGFzcyBUb29sTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKGVkaXRvcikge1xuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gICAgdGhpcy50b29scyA9IHt9XG4gICAgdGhpcy5jdXJyZW50VG9vbCA9ICdzZWxlY3QnXG5cbiAgICB0aGlzLmN0eCA9IG51bGwgLy8gdG9vbCBjb250ZXh0XG4gIH1cbiAgc2V0Q3VycmVudFRvb2wobmFtZSkge1xuICAgIHRoaXMuY3VycmVudFRvb2wgPSB0aGlzLnRvb2xzW25hbWVdXG4gIH1cbiAgcmVnaXN0ZXJUb29sKHRvb2wpIHtcbiAgICB0aGlzLnRvb2xzW3Rvb2wubmFtZSgpXSA9IHRvb2xcbiAgICB0b29sLnNldEVkaXRvcih0aGlzLmVkaXRvcikgLy8gZGVwZW5kZW5jeSBpbmplY3Rpb25cbiAgfVxuXG4gIGJpbmRUb29sRXZlbnQoKSB7XG4gICAgY29uc3Qgc3ZnUm9vdCA9IHRoaXMuZWRpdG9yLnN2Z1Jvb3RcblxuICAgIHN2Z1Jvb3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZSA9PiB7XG4gICAgICBjb25zdCBjdHggPSBuZXcgRWRpdG9yRXZlbnRDb250ZXh0KHRoaXMuZWRpdG9yLCBlKVxuICAgICAgdGhpcy5jdHggPSBjdHhcbiAgICAgIHRoaXMuY3VycmVudFRvb2wuc3RhcnQoY3R4KVxuICAgIH0sIGZhbHNlKVxuXG4gICAgc3ZnUm9vdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4XG5cbiAgICAgIGlmICghY3R4KSByZXR1cm4gLy8gaWYgY3R4IGV4aXRzLCBwcmVzZW50IG1vdXNlZG93biBldmVudCBlbWl0IGp1c3QgYmVmb3JlXG4gICAgICBjdHguc2V0T3JpZ2luRXZlbnQoZSlcbiAgICAgIGN0eC5wcmVzc01vdXNlKClcbiAgICAgIHRoaXMuY3VycmVudFRvb2wubW92ZShjdHgpIC8vIG1vdmVcbiAgICB9LCBmYWxzZSlcbiAgICBcbiAgICBzdmdSb290LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlID0+IHtcbiAgICAgIC8vIHRoaXMuY3R4LnJlbGVhc2VNb3VzZSgpXG4gICAgICBjb25zdCBjdHggPSB0aGlzLmN0eFxuICAgICAgLy8gY3R4LnNldE9yaWdpbkV2ZW50KGUpIC8vIHRoZSBvZmZzZXRYIGFuZCBvZmZzZXRZIGluIG1vdXNldXAgYW5kIHRoZSBsYXN0IG1vdXNlbW92ZSBpcyBub3QgZXF1YWwgPz8gXG4gICAgICB0aGlzLmN1cnJlbnRUb29sLmVuZChjdHgpXG4gICAgICBjdHguaXNFbmRJbnNpZGUgPSB0cnVlXG4gICAgfSwgZmFsc2UpXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGUgPT4ge1xuICAgICAgaWYgKHRoaXMuY3R4ICYmIHRoaXMuY3R4LmlzRW5kSW5zaWRlID09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRvb2wuZW5kT3V0c2lkZSh0aGlzLmN0eClcbiAgICAgIH1cbiAgICAgIHRoaXMuY3R4ID0gbnVsbFxuICAgIH0sIGZhbHNlKVxuICB9XG59IiwiXG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm94QnkycG9pbnRzKHgxLCB5MSwgeDIsIHkyKSB7XG4gIGxldCB4LCB5LCB3LCBoXG4gIHcgPSBNYXRoLmFicyh4MiAtIHgxKVxuICBoID0gTWF0aC5hYnMoeTIgLSB5MSlcbiAgeCA9IE1hdGgubWluKHgyLCB4MSlcbiAgeSA9IE1hdGgubWluKHkyLCB5MSlcbiAgcmV0dXJuIHsgeCwgeSwgdywgaCB9XG59IiwiXG4vLyBUT0RPOiB0byBmaW5pc2hcbmV4cG9ydCBmdW5jdGlvbiBnZXRWaWV3Qm94KGVsKSB7XG4gIGNvbnN0IHZhbCA9IGVsLmdldEF0dHJpYnV0ZSgndmlld0JveCcpXG4gIGlmICghdmFsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdoYXMgbm90IHZpZXdCb3ggYXR0cmlidXRlJylcbiAgfVxuICBjb25zdCBbeCwgeSwgdywgaF0gPSB2YWwuc3BsaXQoL1tcXHMsXSsvKS5tYXAoaXRlbSA9PiBwYXJzZUZsb2F0KGl0ZW0pKVxuICByZXR1cm4geyB4LCB5LCB3LCBoIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==