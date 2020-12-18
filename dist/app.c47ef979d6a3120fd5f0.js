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
    if (!Array.isArray(els)) els = [els]
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

    const fills = els.map(el => {
      return el.getAttr('fill')
    })

    this.editor.setting.setFill(fills[0]) // FIXME:
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
// register shortcut
editor.shortcut.register('Undo', 'Cmd+Z', () => {
  editor.executeCommand('undo')
})
editor.shortcut.register('Redo', 'Cmd+Shift+Z', () => {
  editor.executeCommand('redo')
})
document.querySelector('#shortcut').innerHTML = editor.shortcut.formatPrint()

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
 * CommandManager Class
 * 
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
      console.log('undo stack is empty, can not undo')
      return
    }
    const command = this.undoStack.pop()
    this.redoStack.push(command)
    command.undo()
    command.afterUndo()
  }
  redo() {
    if (this.redoStack.length === 0) {
      console.log('redo stack is empty, can not redo')
      return
    }
    const command = this.redoStack.pop()
    this.undoStack.push(command)
    command.redo()
    command.afterRedo()
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
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../element */ "./src/element/index.js");
;


class BaseCommand {
  undo() {
    throw new Error('please override undo method')
  }
  redo() {
    throw new Error('please override redo method')
  }
  afterRedo() {}
  afterUndo() {}
}

/**
 * addRect
 * 
 * add rect svg element
 */
class AddRectCommand extends BaseCommand {
  constructor(editor, x, y, w, h) {
    super()
    this.editor = editor
    // TODO: 使用编辑器使用的颜色等样式
    const rect = new _element__WEBPACK_IMPORTED_MODULE_1__.FSVG.Rect(x, y, w, h)

    const fill = editor.setting.get('fill')
    const stroke = editor.setting.get('stroke')
    const strokeWidth = editor.setting.get('strokeWidth')
    rect.setAttr('fill', fill)
    rect.setAttr('stroke', stroke)
    rect.setAttr('stroke-width', strokeWidth)

    editor.getCurrentLayer().appendChild(rect.el())

    this.nextSibling = rect.el().nextElementSibling 
    this.parent = rect.el().parentElement
    this.rect = rect
  }
  static name() {
    return 'addRect'
  }
  redo() {
    const el = this.rect.el()
    if (this.nextSibling) {
      this.parent.insertBefore(el, this.nextSibling)
    } else {
      this.parent.appendChild(el)
    }
  }
  undo() {
    this.rect.el().remove()
  }
  afterUndo() {
    this.editor.activedElsManager.clear()
  }
  afterRedo() {
    this.editor.activedElsManager.setEls(this.rect)
  }
}

class DMove extends BaseCommand {
  constructor(editor, els, dx, dy) {
    super()
    this.editor = editor
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
  afterRedo() {
    this.editor.activedElsManager.setEls(this.els)
  }
  afterUndo() {
    this.editor.activedElsManager.setEls(this.els)
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
/* harmony import */ var _shortcut__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shortcut */ "./src/shortcut.js");
;




class Editor {
  constructor() {
    this.setting = null
    this.commandManager = null
    this.zoomManager = null
    this.activedElsManager = new _activedElsManager__WEBPACK_IMPORTED_MODULE_0__.ActivedElsManager(this)
    this.shortcut = new _shortcut__WEBPACK_IMPORTED_MODULE_3__.Shortcut(this)

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
      this.setAttr('x', x)
      this.setAttr('y', y)
      this.setAttr('width', w)
      this.setAttr('height', h)
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

/***/ "./src/shortcut.js":
/*!*************************!*\
  !*** ./src/shortcut.js ***!
  \*************************/
/*! namespace exports */
/*! export Shortcut [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shortcut": () => /* binding */ Shortcut
/* harmony export */ });

class Shortcut {
  constructor(editor) {
    this.editor = editor
    this.registeredFns = {}

    window.addEventListener('keydown', e => {
      const pressKeyName = getPressKeyName(e)

      const fn = this.registeredFns[pressKeyName]
      if (fn) {
        e.preventDefault()
        fn.fn(e)
      }
      
    }, false)
  }
  // this.register('undo', 'Ctrl+Z', () => { editor.execCommand('undo') })
  register(cmdName, shortcutName, fn) {
    // TODO: valid shortcutName
    this.registeredFns[shortcutName] = { cmdName, fn }
    
  }
  formatPrint() {
    const arr = []
    for (let shortcutName in this.registeredFns) {
      const cmdName = this.registeredFns[shortcutName].cmdName
      arr.push(cmdName + ': ' + shortcutName)
    }
    return arr.join(', ')
  }
  
}

function getPressKeyName(e) {
  const pressedKeys = []
  if (e.ctrlKey) pressedKeys.push('Ctrl')
  if (e.metaKey) pressedKeys.push('Cmd')
  if (e.shiftKey) pressedKeys.push('Shift')
  // only check A~Z
  // TODO: resolve all key
  if (/Key./.test(e.code)) pressedKeys.push(e.code[e.code.length - 1])
  const name = pressedKeys.join('+')
  return name
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2FjdGl2ZWRFbHNNYW5hZ2VyLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvY29tbWFuZC9jb21tYW5kTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2NvbW1hbmQvY29tbWFuZHMuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3JFdmVudENvbnRleHQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lbGVtZW50L2Jhc2VFbGVtZW50LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvZWxlbWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2VsZW1lbnQvcmVjdC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2xheWVyL2h1ZE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9sYXllci9vdXRsaW5lSHVkLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbGF5ZXIvc2VsZWN0QXJlYS5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvYWRkUmVjdC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvZHJhZ0NhbnZhcy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvc2VsZWN0LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy96b29tLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvc2V0dGluZy9lZGl0b3JTZXR0aW5nLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvc2hvcnRjdXQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy90b29sTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL3V0aWwvbWF0aC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL3V0aWwvc3ZnLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxvQkFBb0I7QUFDakM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekRBLENBQWdDO0FBQ1U7QUFDVTtBQUNJO0FBQ0U7QUFDWDtBQUNIO0FBQ0U7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSwwQkFBMEIseURBQVU7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2S3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87O0FBRWxCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsS0FB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Q1YsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOzs7Ozs7O1VDVEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImFwcC5jNDdlZjk3OWQ2YTMxMjBmZDVmMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICog5r+A5rS75YWD57Sg566h55CG57G7XG4gKi9cblxuZXhwb3J0IGNsYXNzIEFjdGl2ZWRFbHNNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgICB0aGlzLmVscyA9IFtdXG4gIH1cbiAgc2V0RWxzKGVscykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShlbHMpKSBlbHMgPSBbZWxzXVxuICAgIHRoaXMuZWxzID0gZWxzXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5lZGl0b3IudG9vbE1hbmFnZXIuZ2V0Q3VycmVudFRvb2xOYW1lKCkpXG4gICAgLy8gVE9ETzogaGlnaGxpZ2h0IG91dGxpbmUsIGFjY29yZGluZyB0byBjdXJyZW50IHRvb2xcbiAgICB0aGlzLmhlaWdobGlndGhFbHMoKVxuICAgIHRoaXMuc2V0U2V0dGluZ0ZpbGwoKVxuICB9XG4gIGNsZWFyKCkge1xuICAgIHRoaXMuZWxzID0gW11cbiAgICAvLyBjbGVhciBvdXRsaW5lXG4gICAgY29uc3QgaHVkTWFuYWdlciA9IHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXJcbiAgICBodWRNYW5hZ2VyLm91dGxpbmVIdWQuY2xlYXIoKVxuICB9XG4gIGNvbnRhaW5zKGVsKSB7XG4gICAgLy8gVE9ETzpcbiAgfVxuICBnZXRiYm94KCkge1xuICAgIC8vIFRPRE86XG4gICAgLyogbGV0IHgsIHksIHcsIGhcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGNvbnN0IGJib3ggPSBlbC5lbCgpLmdldGJib3goKVxuICAgIH0pICovXG4gIH1cbiAgLy8gaGVpZ2h0bGlnaHQgdGhlIGVsZW1lbnRzXG4gIGhlaWdobGlndGhFbHMoKSB7XG4gICAgLy8gVE9ETzpcbiAgICBjb25zdCBlbHMgPSB0aGlzLmVsc1xuICAgIGNvbnN0IGh1ZE1hbmFnZXIgPSB0aGlzLmVkaXRvci5odWRNYW5hZ2VyXG4gICAgZWxzLmZvckVhY2goZWwgPT4ge1xuICAgICAgY29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gZWwuZ2V0QkJveCgpXG4gICAgICAvLyBjb25zb2xlLmxvZyhib3gpXG4gICAgICBodWRNYW5hZ2VyLm91dGxpbmVIdWQuZHJhd1JlY3QoeCwgeSwgd2lkdGgsIGhlaWdodClcbiAgICB9KVxuICB9XG4gIHNldFNldHRpbmdGaWxsKCkge1xuICAgIGNvbnN0IGVscyA9IHRoaXMuZWxzXG5cbiAgICBjb25zdCBmaWxscyA9IGVscy5tYXAoZWwgPT4ge1xuICAgICAgcmV0dXJuIGVsLmdldEF0dHIoJ2ZpbGwnKVxuICAgIH0pXG5cbiAgICB0aGlzLmVkaXRvci5zZXR0aW5nLnNldEZpbGwoZmlsbHNbMF0pIC8vIEZJWE1FOlxuICB9XG4gIHNldEVsc0F0dHIobmFtZSwgdmFsKSB7XG4gICAgdGhpcy5lbHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5zZXRBdHRyKG5hbWUsIHZhbClcbiAgICB9KVxuICB9XG59IiwiXG5pbXBvcnQgRWRpdG9yIGZyb20gJy4vZWRpdG9yLmpzJ1xuaW1wb3J0IEFkZFJlY3QgZnJvbSAnLi9tb2R1bGVzL2FkZFJlY3QuanMnXG5pbXBvcnQgeyBEcmFnQ2FudmFzIH0gZnJvbSAnLi9tb2R1bGVzL2RyYWdDYW52YXMuanMnXG5pbXBvcnQgQ29tbWFuZE1hbmFnZXIgZnJvbSAnLi9jb21tYW5kL2NvbW1hbmRNYW5hZ2VyLmpzJ1xuaW1wb3J0IHsgRWRpdG9yU2V0dGluZyB9IGZyb20gJy4vc2V0dGluZy9lZGl0b3JTZXR0aW5nLmpzJ1xuaW1wb3J0IHsgWm9vbU1hbmFnZXIgfSBmcm9tICcuL21vZHVsZXMvem9vbS5qcydcbmltcG9ydCB7IFNlbGVjdCB9IGZyb20gJy4vbW9kdWxlcy9zZWxlY3QuanMnXG5pbXBvcnQgeyBUb29sTWFuYWdlciB9IGZyb20gJy4vdG9vbE1hbmFnZXIuanMnXG5cbmZ1bmN0aW9uIGFjdGl2ZUJ0bihuYW1lKSB7XG4gIG5hbWUgPSB7XG4gICAgJ3NlbGVjdCc6ICdidG4tc2VsZWN0JyxcbiAgICAnYWRkUmVjdCc6ICdidG4tYWRkLXJlY3QnLFxuICAgICdkcmFnQ2FudmFzJzogJ2J0bi1kcmFnLWNhbnZhcycsXG4gIH1bbmFtZV1cbiAgaWYgKG5hbWUgPT0gdW5kZWZpbmVkKSByZXR1cm5cblxuICBjb25zdCB0b29sQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rvb2wtYmFyJylcbiAgY29uc3QgdG9vbEJ0bnMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0b29sQmFyLmNoaWxkcmVuKVxuICB0b29sQnRucy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgfSlcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmFtZSkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbn1cblxuXG5jb25zdCBlZGl0b3IgPSBuZXcgRWRpdG9yKClcbndpbmRvdy5lZGl0b3IgPSBlZGl0b3IgLy8gZGVidWcgaW4gZGV2dG9vbFxuXG5jb25zdCBjb21tYW5kTWFuYWdlciA9IG5ldyBDb21tYW5kTWFuYWdlcihlZGl0b3IpXG5lZGl0b3Iuc2V0Q29tbWFuZE1hbmFnZXIoY29tbWFuZE1hbmFnZXIpXG5cbmVkaXRvci5zZXRTZXR0aW5nKG5ldyBFZGl0b3JTZXR0aW5nKCkpXG4vLyByZWdpc3RlciB0b29sc1xuXG5jb25zdCB0b29sTWFuYWdlciA9IG5ldyBUb29sTWFuYWdlcihlZGl0b3IpXG5lZGl0b3Iuc2V0VG9vbE1hbmFnZXIodG9vbE1hbmFnZXIpXG50b29sTWFuYWdlci5yZWdpc3RlclRvb2wobmV3IEFkZFJlY3QoKSlcbnRvb2xNYW5hZ2VyLnJlZ2lzdGVyVG9vbChuZXcgRHJhZ0NhbnZhcygpKVxudG9vbE1hbmFnZXIucmVnaXN0ZXJUb29sKG5ldyBTZWxlY3QoKSlcblxuZWRpdG9yLnRvb2xNYW5hZ2VyLm9uU3dpdGNoVG9vbChuYW1lID0+IHtcbiAgY29uc29sZS5sb2coJ3N3aXRjaGVkIHRvb2w6JywgbmFtZSlcbiAgYWN0aXZlQnRuKG5hbWUpXG59KVxuXG50b29sTWFuYWdlci5zZXRDdXJyZW50VG9vbCgnYWRkUmVjdCcpXG50b29sTWFuYWdlci5iaW5kVG9vbEV2ZW50KClcbi8vIHpvb21cbmVkaXRvci5zZXRab29tTWFuYWdlcihuZXcgWm9vbU1hbmFnZXIoKSlcblxuZWRpdG9yLm1vdW50KCcjZWRpdG9yLWFyZWEnKVxuXG5cbi8qKiBcbiAqIGJpbmQgZXZlbnQgaW4gYnV0dG9uXG4gKi8gXG4vLyB1bmRvXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXVuZG8nKS5vbmNsaWNrID0gKCkgPT4ge1xuICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3VuZG8nKVxufVxuLy8gcmVkb1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1yZWRvJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3JlZG8nKVxufVxuLy8gem9vbUluXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXpvb20taW4nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIGVkaXRvci56b29tTWFuYWdlci56b29tSW4oKVxufVxuLy8gem9vbU91dFxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi16b29tLW91dCcpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLnpvb21NYW5hZ2VyLnpvb21PdXQoKVxufVxuLy8gc2VsZWN0IGFkZFJlY3QgdG9vbFxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1hZGQtcmVjdCcpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLnNldEN1cnJlbnRUb29sKCdhZGRSZWN0Jylcbn1cbi8vIHNlbGVjdCBkcmFnY2FudmFzIHRvb2xcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tZHJhZy1jYW52YXMnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIGVkaXRvci5zZXRDdXJyZW50VG9vbCgnZHJhZ0NhbnZhcycpXG59XG4vLyBzZWxlY3QgdG9vbFxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1zZWxlY3QnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIGVkaXRvci5zZXRDdXJyZW50VG9vbCgnc2VsZWN0Jylcbn1cblxuXG4vLyBmaWxsIHZhbHVlIGNvbnRyb2xcbmNvbnN0IGZpbGxUZXh0Tm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbGVtZW50LWluZm8tZmlsbCcpXG5maWxsVGV4dE5vZGUuaW5uZXJIVE1MID0gZWRpdG9yLnNldHRpbmcuZ2V0KCdmaWxsJylcbmVkaXRvci5zZXR0aW5nLmJpbmRFdmVudCgnZmlsbCcsIHZhbCA9PiB7XG4gIGZpbGxUZXh0Tm9kZS5pbm5lckhUTUwgPSB2YWxcbn0pXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2V0LWZpbGwtYnRuJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBmaWxsID0gd2luZG93LnByb21wdCgnUGxlYXNlIGlucHV0IHZhbGlkIGNvbG9yIHZhbHVl77yIbGlrZSAjZmZjZTQz77yJJywgZWRpdG9yLnNldHRpbmcuZ2V0KCdmaWxsJykpXG4gIGlmICghZmlsbCkgcmV0dXJuXG4gIGZpbGxUZXh0Tm9kZS5pbm5lckhUTUwgPSBmaWxsXG5cbiAgZWRpdG9yLnNldHRpbmcuc2V0RmlsbChmaWxsKVxuICBlZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzQXR0cignZmlsbCcsIGZpbGwpXG59XG5cbi8vIHN0cm9rZSB2YWx1ZSBjb250cm9sXG5jb25zdCBzdHJva2VUZXh0Tm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbGVtZW50LWluZm8tc3Ryb2tlJylcbnN0cm9rZVRleHROb2RlLmlubmVySFRNTCA9IGVkaXRvci5zZXR0aW5nLmdldCgnc3Ryb2tlJylcbmVkaXRvci5zZXR0aW5nLmJpbmRFdmVudCgnc3Ryb2tlJywgdmFsID0+IHtcbiAgc3Ryb2tlVGV4dE5vZGUuaW5uZXJIVE1MID0gdmFsXG59KVxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NldC1zdHJva2UtYnRuJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBzdHJva2UgPSB3aW5kb3cucHJvbXB0KCdQbGVhc2UgaW5wdXQgdmFsaWQgY29sb3IgdmFsdWXvvIhsaWtlICNmZmNlNDPvvIknLCBlZGl0b3Iuc2V0dGluZy5nZXQoJ3N0cm9rZScpKVxuICBpZiAoIXN0cm9rZSkgcmV0dXJuXG4gIHN0cm9rZVRleHROb2RlLmlubmVySFRNTCA9IHN0cm9rZVxuXG4gIGVkaXRvci5zZXR0aW5nLnNldFN0cm9rZShzdHJva2UpXG4gIGVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHNBdHRyKCdzdHJva2UnLCBzdHJva2UpXG59XG4vLyByZWdpc3RlciBzaG9ydGN1dFxuZWRpdG9yLnNob3J0Y3V0LnJlZ2lzdGVyKCdVbmRvJywgJ0NtZCtaJywgKCkgPT4ge1xuICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3VuZG8nKVxufSlcbmVkaXRvci5zaG9ydGN1dC5yZWdpc3RlcignUmVkbycsICdDbWQrU2hpZnQrWicsICgpID0+IHtcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdyZWRvJylcbn0pXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hvcnRjdXQnKS5pbm5lckhUTUwgPSBlZGl0b3Iuc2hvcnRjdXQuZm9ybWF0UHJpbnQoKVxuXG4vKipcbiAqIOeQhuaDsyBhcGkg5L2/55So5L6L5a2QXG4gKiBcbiAqIGNvbnN0IGVkaXRvckJ1aWxkZXIgPSBuZXcgRWRpdG9yLmJ1aWxkZXIoKVxuICogZWRpdG9yQnVpbGRlclxuICogICAuc2V0Q2FudmFzU2l6ZSg0MDAsIDMwMClcbiAqICAgLnNldFN0YWdlU2l6ZSgxMDAwLCA4MDApXG4gKiAgIC5zZXRWaWV3cG9ydFNpemUoODAwLCA1MDApXG4gKiAgIC5zZXRab29tKDEwMClcbiAqIFxuICogY29uc3QgZWRpdG9yID0gZWRpdG9yQnVpbGRlci5idWlsZCgpXG4gKiBlZGl0b3IucmVnaXN0ZXJUb29sKHRvb2xNb3ZlKVxuICogXG4gKi8iLCIvKipcbiAqIENvbW1hbmRNYW5hZ2VyIENsYXNzXG4gKiBcbiAqIFxuICogQ29tbWFuZE1hbmFnZXIudW5kbygpXG4gKiBDb21tYW5kTWFuYWdlci5yZWRvKClcbiAqL1xuXG5pbXBvcnQgeyBBZGRSZWN0Q29tbWFuZCwgRE1vdmUgfSBmcm9tIFwiLi9jb21tYW5kc1wiXG5cbmNsYXNzIENvbW1hbmRNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgICB0aGlzLnJlZG9TdGFjayA9IFtdXG4gICAgdGhpcy51bmRvU3RhY2sgPSBbXVxuICAgIHRoaXMuY29tbWFuZENsYXNzZXMgPSB7fVxuXG4gICAgdGhpcy5yZXNpZ3RlckNvbW1hbmRDbGFzcyhBZGRSZWN0Q29tbWFuZClcbiAgICB0aGlzLnJlc2lndGVyQ29tbWFuZENsYXNzKERNb3ZlKVxuICB9XG4gIHNldEVkaXRvcihlZGl0b3IpIHtcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICB9XG4gIGV4ZWN1dGUobmFtZSwgLi4uYXJncykge1xuICAgIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKClcbiAgICBjb25zdCBDb21tYW5kQ2xhc3MgPSB0aGlzLmNvbW1hbmRDbGFzc2VzW25hbWVdXG5cbiAgICBjb25zdCBjb21tYW5kID0gbmV3IENvbW1hbmRDbGFzcyh0aGlzLmVkaXRvciwgLi4uYXJncykgLy8g5Yib5bu6IGNvbW1hbmQg5a6e5L6LXG5cbiAgICB0aGlzLnVuZG9TdGFjay5wdXNoKGNvbW1hbmQpXG4gICAgdGhpcy5yZWRvU3RhY2sgPSBbXVxuICB9XG4gIHVuZG8oKSB7XG4gICAgaWYgKHRoaXMudW5kb1N0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc29sZS5sb2coJ3VuZG8gc3RhY2sgaXMgZW1wdHksIGNhbiBub3QgdW5kbycpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgY29tbWFuZCA9IHRoaXMudW5kb1N0YWNrLnBvcCgpXG4gICAgdGhpcy5yZWRvU3RhY2sucHVzaChjb21tYW5kKVxuICAgIGNvbW1hbmQudW5kbygpXG4gICAgY29tbWFuZC5hZnRlclVuZG8oKVxuICB9XG4gIHJlZG8oKSB7XG4gICAgaWYgKHRoaXMucmVkb1N0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc29sZS5sb2coJ3JlZG8gc3RhY2sgaXMgZW1wdHksIGNhbiBub3QgcmVkbycpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgY29tbWFuZCA9IHRoaXMucmVkb1N0YWNrLnBvcCgpXG4gICAgdGhpcy51bmRvU3RhY2sucHVzaChjb21tYW5kKVxuICAgIGNvbW1hbmQucmVkbygpXG4gICAgY29tbWFuZC5hZnRlclJlZG8oKVxuICB9XG4gIC8vIOazqOWGjOWRveS7pOexu+WIsOWRveS7pOeuoeeQhuWvueixoeS4reOAglxuICByZXNpZ3RlckNvbW1hbmRDbGFzcyhjb21tYW5kQ2xhc3MpIHtcbiAgICBuYW1lID0gY29tbWFuZENsYXNzLm5hbWUoKS50b0xvd2VyQ2FzZSgpXG4gICAgdGhpcy5jb21tYW5kQ2xhc3Nlc1tuYW1lXSA9IGNvbW1hbmRDbGFzc1xuICB9XG4gIGFmdGVyVW5kbygpIHtcblxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1hbmRNYW5hZ2VyIiwiaW1wb3J0IHsgTlMgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCJcbmltcG9ydCB7IEZTVkcgfSBmcm9tIFwiLi4vZWxlbWVudFwiXG5cbmNsYXNzIEJhc2VDb21tYW5kIHtcbiAgdW5kbygpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3BsZWFzZSBvdmVycmlkZSB1bmRvIG1ldGhvZCcpXG4gIH1cbiAgcmVkbygpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3BsZWFzZSBvdmVycmlkZSByZWRvIG1ldGhvZCcpXG4gIH1cbiAgYWZ0ZXJSZWRvKCkge31cbiAgYWZ0ZXJVbmRvKCkge31cbn1cblxuLyoqXG4gKiBhZGRSZWN0XG4gKiBcbiAqIGFkZCByZWN0IHN2ZyBlbGVtZW50XG4gKi9cbmV4cG9ydCBjbGFzcyBBZGRSZWN0Q29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kIHtcbiAgY29uc3RydWN0b3IoZWRpdG9yLCB4LCB5LCB3LCBoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gICAgLy8gVE9ETzog5L2/55So57yW6L6R5Zmo5L2/55So55qE6aKc6Imy562J5qC35byPXG4gICAgY29uc3QgcmVjdCA9IG5ldyBGU1ZHLlJlY3QoeCwgeSwgdywgaClcblxuICAgIGNvbnN0IGZpbGwgPSBlZGl0b3Iuc2V0dGluZy5nZXQoJ2ZpbGwnKVxuICAgIGNvbnN0IHN0cm9rZSA9IGVkaXRvci5zZXR0aW5nLmdldCgnc3Ryb2tlJylcbiAgICBjb25zdCBzdHJva2VXaWR0aCA9IGVkaXRvci5zZXR0aW5nLmdldCgnc3Ryb2tlV2lkdGgnKVxuICAgIHJlY3Quc2V0QXR0cignZmlsbCcsIGZpbGwpXG4gICAgcmVjdC5zZXRBdHRyKCdzdHJva2UnLCBzdHJva2UpXG4gICAgcmVjdC5zZXRBdHRyKCdzdHJva2Utd2lkdGgnLCBzdHJva2VXaWR0aClcblxuICAgIGVkaXRvci5nZXRDdXJyZW50TGF5ZXIoKS5hcHBlbmRDaGlsZChyZWN0LmVsKCkpXG5cbiAgICB0aGlzLm5leHRTaWJsaW5nID0gcmVjdC5lbCgpLm5leHRFbGVtZW50U2libGluZyBcbiAgICB0aGlzLnBhcmVudCA9IHJlY3QuZWwoKS5wYXJlbnRFbGVtZW50XG4gICAgdGhpcy5yZWN0ID0gcmVjdFxuICB9XG4gIHN0YXRpYyBuYW1lKCkge1xuICAgIHJldHVybiAnYWRkUmVjdCdcbiAgfVxuICByZWRvKCkge1xuICAgIGNvbnN0IGVsID0gdGhpcy5yZWN0LmVsKClcbiAgICBpZiAodGhpcy5uZXh0U2libGluZykge1xuICAgICAgdGhpcy5wYXJlbnQuaW5zZXJ0QmVmb3JlKGVsLCB0aGlzLm5leHRTaWJsaW5nKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZChlbClcbiAgICB9XG4gIH1cbiAgdW5kbygpIHtcbiAgICB0aGlzLnJlY3QuZWwoKS5yZW1vdmUoKVxuICB9XG4gIGFmdGVyVW5kbygpIHtcbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5jbGVhcigpXG4gIH1cbiAgYWZ0ZXJSZWRvKCkge1xuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVscyh0aGlzLnJlY3QpXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERNb3ZlIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBjb25zdHJ1Y3RvcihlZGl0b3IsIGVscywgZHgsIGR5KSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gICAgdGhpcy5keCA9IGR4XG4gICAgdGhpcy5keSA9IGR5XG4gICAgdGhpcy5lbHMgPSBlbHNcblxuICAgIHRoaXMuZWxzLmZvckVhY2goZWwgPT4ge1xuICAgICAgZWwuZG1vdmUodGhpcy5keCwgdGhpcy5keSlcbiAgICB9KVxuICB9XG4gIHN0YXRpYyBuYW1lKCkge1xuICAgIHJldHVybiAnZG1vdmUnXG4gIH1cbiAgcmVkbygpIHtcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLmRtb3ZlKHRoaXMuZHgsIHRoaXMuZHkpXG4gICAgfSlcbiAgfVxuICB1bmRvKCkge1xuICAgIHRoaXMuZWxzLmZvckVhY2goZWwgPT4ge1xuICAgICAgZWwuZG1vdmUoLXRoaXMuZHgsIC10aGlzLmR5KVxuICAgIH0pXG4gIH1cbiAgYWZ0ZXJSZWRvKCkge1xuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVscyh0aGlzLmVscylcbiAgfVxuICBhZnRlclVuZG8oKSB7XG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzKHRoaXMuZWxzKVxuICB9XG59IiwiLy8g5bi46YePXG5cbmNvbnN0IE5TID0ge1xuICBIVE1MOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsXG4gIE1BVEg6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MJyxcbiAgU0U6ICdodHRwOi8vc3ZnLWVkaXQuZ29vZ2xlY29kZS5jb20nLFxuICBTVkc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gIFhMSU5LOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsXG4gIFhNTDogJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZScsXG4gIFhNTE5TOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nIC8vIHNlZSBodHRwOi8vd3d3LnczLm9yZy9UUi9SRUMteG1sLW5hbWVzLyN4bWxSZXNlcnZlZFxufTtcblxuZXhwb3J0IHtcbiAgTlMsXG59IFxuXG5cblxuIiwiaW1wb3J0IHsgQWN0aXZlZEVsc01hbmFnZXIgfSBmcm9tIFwiLi9hY3RpdmVkRWxzTWFuYWdlclwiXG5pbXBvcnQgeyBFZGl0b3JFdmVudENvbnRleHQgfSBmcm9tIFwiLi9lZGl0b3JFdmVudENvbnRleHRcIlxuaW1wb3J0IHsgSHVkTWFuYWdlciB9IGZyb20gXCIuL2xheWVyL2h1ZE1hbmFnZXJcIlxuaW1wb3J0IHsgU2hvcnRjdXQgfSBmcm9tIFwiLi9zaG9ydGN1dFwiXG5cbmNsYXNzIEVkaXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2V0dGluZyA9IG51bGxcbiAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyID0gbnVsbFxuICAgIHRoaXMuem9vbU1hbmFnZXIgPSBudWxsXG4gICAgdGhpcy5hY3RpdmVkRWxzTWFuYWdlciA9IG5ldyBBY3RpdmVkRWxzTWFuYWdlcih0aGlzKVxuICAgIHRoaXMuc2hvcnRjdXQgPSBuZXcgU2hvcnRjdXQodGhpcylcblxuICAgIC8vIGNvbnN0IGNvbnRlbnRXaWR0aCA9IDQwMFxuICAgIC8vIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSAzMDBcbiAgICAvLyBjb25zdCBzdGFnZVdpZHRoID0gMTAwMCAvLyDmraPlnKjnuqDnu5Plkb3lkI1cbiAgICAvLyBjb25zdCBzdGFnZUhlaWdodCA9IDYwMFxuICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPSA4MDBcbiAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IDU1MFxuXG4gICAgY29uc3Qgdmlld3BvcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHZpZXdwb3J0LmlkID0gJ3ZpZXdwb3J0J1xuICAgIHZpZXdwb3J0LnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgIzAwMCdcbiAgICB2aWV3cG9ydC5zdHlsZS53aWR0aCA9IHZpZXdwb3J0V2lkdGggKyAncHgnXG4gICAgdmlld3BvcnQuc3R5bGUuaGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQgKyAncHgnXG4gICAgdGhpcy52aWV3cG9ydCA9IHZpZXdwb3J0XG4gICAgXG4gICAgY29uc3Qgc3ZnQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBzdmdDb250YWluZXIuaWQgPSAnc3ZnLWNvbnRhaW5lcidcbiAgICBzdmdDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNkZGQnXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLndpZHRoID0gdmlld3BvcnRXaWR0aCArICdweCdcbiAgICBzdmdDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQgKyAncHgnXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCdcbiAgICB0aGlzLnN2Z0NvbnRhaW5lciA9IHN2Z0NvbnRhaW5lclxuXG4gICAgY29uc3Qgc3ZnUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJylcbiAgICBzdmdSb290LmlkID0gJ3N2Zy1yb290J1xuICAgIHN2Z1Jvb3Quc2V0QXR0cmlidXRlKCd3aWR0aCcsIDEwMDApXG4gICAgc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDYwMClcbiAgICBzdmdSb290LnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgMTAwMCA2MDAnKVxuICAgIHRoaXMuc3ZnUm9vdCA9IHN2Z1Jvb3RcblxuICAgIGNvbnN0IHN2Z1N0YWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKVxuICAgIHN2Z1N0YWdlLmlkID0gJ3N2Zy1zdGFnZSdcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgNDAwKVxuICAgIHN2Z1N0YWdlLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgMzAwKVxuICAgIHN2Z1N0YWdlLnNldEF0dHJpYnV0ZSgneCcsIDMwMClcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ3knLCAxNTApXG4gICAgc3ZnU3RhZ2Uuc3R5bGUub3ZlcmZsb3cgPSAndmlzaWJsZSdcbiAgICB0aGlzLnN2Z1N0YWdlID0gc3ZnU3RhZ2VcblxuICAgIGNvbnN0IHN2Z0JnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJylcbiAgICBzdmdCZy5pZCA9ICdiYWNrZ3JvdW5kJ1xuICAgIC8vIHN2Z0JnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCA0MDApXG4gICAgLy8gc3ZnQmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAzMDApXG4gICAgc3ZnQmcuc2V0QXR0cmlidXRlKCd4JywgMClcbiAgICBzdmdCZy5zZXRBdHRyaWJ1dGUoJ3knLCAwKVxuXG4gICAgY29uc3QgYmdSZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdyZWN0JylcbiAgICBiZ1JlY3Quc2V0QXR0cmlidXRlKCd3aWR0aCcsICcxMDAlJylcbiAgICBiZ1JlY3Quc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpXG4gICAgYmdSZWN0LnNldEF0dHJpYnV0ZSgnZmlsbCcsICcjZmZmJylcblxuICAgIGNvbnN0IHN2Z0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2cnKVxuICAgIHN2Z0NvbnRlbnQuaWQgPSAnY29udGVudCdcbiAgICAvLyBzdmdDb250ZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCA0MDApXG4gICAgLy8gc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDMwMClcbiAgICBzdmdDb250ZW50LnNldEF0dHJpYnV0ZSgneCcsIDApXG4gICAgc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3knLCAwKVxuICAgIHRoaXMuc3ZnQ29udGVudCA9IHN2Z0NvbnRlbnRcblxuICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJylcbiAgICBsYXllci5pZCA9ICdsYXllci0xJ1xuICAgIHRoaXMuY3VycmVudExheWVyID0gbGF5ZXJcblxuICAgIHZpZXdwb3J0LmFwcGVuZENoaWxkKHN2Z0NvbnRhaW5lcilcbiAgICBzdmdDb250YWluZXIuYXBwZW5kQ2hpbGQoc3ZnUm9vdClcbiAgICBzdmdSb290LmFwcGVuZENoaWxkKHN2Z1N0YWdlKVxuXG4gICAgc3ZnU3RhZ2UuYXBwZW5kQ2hpbGQoc3ZnQmcpXG4gICAgc3ZnQmcuYXBwZW5kQ2hpbGQoYmdSZWN0KVxuICAgIHN2Z1N0YWdlLmFwcGVuZENoaWxkKHN2Z0NvbnRlbnQpXG4gICAgc3ZnQ29udGVudC5hcHBlbmRDaGlsZChsYXllcilcblxuXG4gICAgdGhpcy5odWRNYW5hZ2VyID0gbmV3IEh1ZE1hbmFnZXIoKVxuICAgIHRoaXMuaHVkTWFuYWdlci5tb3VudChzdmdTdGFnZSlcblxuICAgIC8vIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpXG4gIH1cbiAgbW91bnQoc2VsZWN0b3IpIHtcbiAgICBjb25zdCBtb3VudE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICAgIG1vdW50Tm9kZS5hcHBlbmRDaGlsZCh0aGlzLnZpZXdwb3J0KVxuICB9XG4gIGdldEN1cnJlbnRMYXllcigpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50TGF5ZXJcbiAgfVxuXG4gIHNldFRvb2xNYW5hZ2VyKHRvb2xNYW5hZ2VyKSB7XG4gICAgdGhpcy50b29sTWFuYWdlciA9IHRvb2xNYW5hZ2VyXG4gIH1cbiAgLy8gdG9vbCByZWxhdGl2ZWQgbWV0aG9kc1xuICBzZXRDdXJyZW50VG9vbChuYW1lKSB7XG4gICAgdGhpcy50b29sTWFuYWdlci5zZXRDdXJyZW50VG9vbChuYW1lKVxuICB9XG4gIHJlZ2lzdGVyVG9vbCh0b29sKSB7XG4gICAgdGhpcy50b29sTWFuYWdlci5yZWdpc3RlclRvb2wodG9vbClcbiAgfVxuICBzZXRTZXR0aW5nKHNldHRpbmcpIHtcbiAgICB0aGlzLnNldHRpbmcgPSBzZXR0aW5nXG4gIH1cblxuICAvLyDlkb3ku6Tnm7jlhbNcbiAgc2V0Q29tbWFuZE1hbmFnZXIoY29tbWFuZE1hbmFnZXIpIHtcbiAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyID0gY29tbWFuZE1hbmFnZXJcbiAgfVxuICBleGVjdXRlQ29tbWFuZChuYW1lLCAuLi5wYXJhbXMpIHtcbiAgICBpZiAobmFtZSA9PSAndW5kbycpIHtcbiAgICAgIHRoaXMuY29tbWFuZE1hbmFnZXIudW5kbygpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKG5hbWUgPT0gJ3JlZG8nKSB7XG4gICAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyLnJlZG8oKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuY29tbWFuZE1hbmFnZXIuZXhlY3V0ZShuYW1lLCAuLi5wYXJhbXMpXG4gIH1cblxuICAvLyB6b29tXG4gIHNldFpvb21NYW5hZ2VyKHpvb21NYW5hZ2VyKSB7XG4gICAgem9vbU1hbmFnZXIuc2V0RWRpdG9yKHRoaXMpXG4gICAgdGhpcy56b29tTWFuYWdlciA9IHpvb21NYW5hZ2VyXG4gIH1cbiAgZ2V0Wm9vbSgpIHsgLy8g5bCB6KOFXG4gICAgcmV0dXJuIHRoaXMuem9vbU1hbmFnZXIuZ2V0Wm9vbSgpXG4gIH1cblxuICBnZXRTY3JvbGwoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHRoaXMuc3ZnQ29udGFpbmVyLnNjcm9sbExlZnQsXG4gICAgICB5OiB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxUb3AsXG4gICAgfVxuICB9XG4gIHNldFNjcm9sbCh4LCB5KSB7XG4gICAgdGhpcy5zdmdDb250YWluZXIuc2Nyb2xsTGVmdCA9IHhcbiAgICB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxUb3AgPSB5XG4gIH1cbiAgZ2V0Q29udGVudE9mZnNldCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogdGhpcy5zdmdTdGFnZS5nZXRBdHRyaWJ1dGUoJ3gnKSxcbiAgICAgIHk6IHRoaXMuc3ZnU3RhZ2UuZ2V0QXR0cmlidXRlKCd5JyksXG4gICAgfVxuICB9XG5cbiAgaXNDb250ZW50RWxlbWVudChlbCkge1xuICAgIHdoaWxlIChlbCkge1xuICAgICAgaWYgKGVsLnBhcmVudEVsZW1lbnQgPT0gdGhpcy5zdmdDb250ZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICBpZiAoZWwucGFyZW50RWxlbWVudCA9PSB0aGlzLnN2Z1Jvb3QpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgICBlbCA9IGVsLnBhcmVudEVsZW1lbnRcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRWRpdG9yXG4iLCJcbi8qKlxuICogY29udGV4dCBjbGFzc1xuICogXG4gKiB1c2VkIGZvciB0b29sIGV2ZW50XG4gKi9cblxuZXhwb3J0IGNsYXNzIEVkaXRvckV2ZW50Q29udGV4dCB7XG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgZSkge1xuICAgIHRoaXMubW91c2VQcmVzc2VkID0gZmFsc2VcbiAgICB0aGlzLm9yaWdpbkV2ZW50ID0gZVxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gICAgdGhpcy5pc0VuZEluc2lkZSA9IGZhbHNlXG5cbiAgICB0aGlzLnN0YXJ0WCA9IDBcbiAgICB0aGlzLnN0YXJ0WSA9IDBcblxuICAgIHRoaXMub2Zmc2V0WCA9IDBcbiAgICB0aGlzLm9mZnNldFkgPSAwXG5cbiAgICB0aGlzLnN0YXJ0Q2xpZW50WCA9IDAgLy8gdXNlZCB0byBjYWxjIGR4IGFuZCBkeS5cbiAgICB0aGlzLnN0YXJ0Q2xpZW50WSA9IDBcbiAgICB0aGlzLmR4ID0gMFxuICAgIHRoaXMuZHkgPSAwXG5cbiAgICB0aGlzLnNldFN0YXJ0UG9zKClcbiAgfVxuICBzZXRPcmlnaW5FdmVudChlKSB7XG4gICAgdGhpcy5vcmlnaW5FdmVudCA9IGVcbiAgfVxuICBzZXRTdGFydFBvcygpIHtcbiAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMuZ2V0UG9zKClcblxuICAgIHRoaXMuc3RhcnRYID0geFxuICAgIHRoaXMuc3RhcnRZID0geVxuXG4gICAgdGhpcy5zdGFydENsaWVudFggPSB0aGlzLm9yaWdpbkV2ZW50LmNsaWVudFhcbiAgICB0aGlzLnN0YXJ0Q2xpZW50WSA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WVxuICB9XG4gIHJlbGVhc2VNb3VzZSgpIHtcbiAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IGZhbHNlXG4gIH1cbiAgcHJlc3NNb3VzZSgpIHtcbiAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IHRydWVcbiAgfVxuICBnZXRQb3MoKSB7XG4gICAgY29uc3Qgem9vbSA9IHRoaXMuZWRpdG9yLmdldFpvb20oKVxuICAgIGNvbnN0IHt4LCB5fSA9IHRoaXMuZWRpdG9yLmdldENvbnRlbnRPZmZzZXQoKVxuICAgIHJldHVybiB7IFxuICAgICAgeDogdGhpcy5vcmlnaW5FdmVudC5vZmZzZXRYIC8gem9vbSAtIHgsIFxuICAgICAgeTogdGhpcy5vcmlnaW5FdmVudC5vZmZzZXRZIC8gem9vbSAtIHksXG4gICAgfVxuICB9XG4gIGdldFN0YXJ0UG9zKCkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiB0aGlzLnN0YXJ0WCxcbiAgICAgIHk6IHRoaXMuc3RhcnRZLFxuICAgIH1cbiAgfVxuICAvLyB3aXRob3V0IGNhbGMgd2l0aCB6b29tIHZhbHVlXG4gIGdldERpZmZQb3MoKSB7XG4gICAgY29uc3QgeCA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WCAtIHRoaXMuc3RhcnRDbGllbnRYXG4gICAgY29uc3QgeSA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WSAtIHRoaXMuc3RhcnRDbGllbnRZXG4gICAgcmV0dXJuIHsgeCwgeSB9XG4gIH1cblxufSIsIlxuLyoqXG4gKiDlr7kgU1ZHIOWFg+e0oOeahOeugOWNleWwgeijhVxuICovXG5cbmV4cG9ydCBjbGFzcyBGRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZWxfID0gbnVsbFxuICB9XG4gIGVsKCkge1xuICAgIHJldHVybiB0aGlzLmVsX1xuICB9XG4gIHNldEF0dHIocHJvcCwgdmFsKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxfLnNldEF0dHJpYnV0ZShwcm9wLCB2YWwpXG4gIH1cbiAgZ2V0QXR0cihwcm9wKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxfLmdldEF0dHJpYnV0ZShwcm9wKVxuICB9XG4gIGdldEJCb3goKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxfLmdldEJCb3goKVxuICB9XG59IiwiaW1wb3J0IHsgUmVjdCB9IGZyb20gXCIuL3JlY3RcIlxuXG5cbi8qKlxuICogRlNWR1xuICogXG4gKiBzaW1wbGUgU1ZHRWxlbWVudCBlbmNhcHN1bGF0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBGU1ZHID0ge1xuICBSZWN0LFxufSIsIlxuLyoqXG4gKiDlr7kgcmVjdCDlhYPntKDnmoTnroDljZXlsIHoo4VcbiAqL1xuXG5pbXBvcnQgeyBOUyB9IGZyb20gXCIuLi9jb25zdGFudHNcIlxuaW1wb3J0IHsgRkVsZW1lbnQgfSBmcm9tIFwiLi9iYXNlRWxlbWVudFwiXG5cbmV4cG9ydCBjbGFzcyBSZWN0IGV4dGVuZHMgRkVsZW1lbnQge1xuICAvLyBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIpO1xuICAvLyBjb25zdHJ1Y3RvcihlbDogU1ZHRWxlbWVudCk7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgpIHtcbiAgICBzdXBlcigpXG4gICAgaWYgKHR5cGVvZiB4ID09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLmVsXyA9IHhcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbF8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAncmVjdCcpXG4gICAgICB0aGlzLnNldEF0dHIoJ3gnLCB4KVxuICAgICAgdGhpcy5zZXRBdHRyKCd5JywgeSlcbiAgICAgIHRoaXMuc2V0QXR0cignd2lkdGgnLCB3KVxuICAgICAgdGhpcy5zZXRBdHRyKCdoZWlnaHQnLCBoKVxuICAgIH1cbiAgfVxuICBnZXRQb3MoKSB7XG4gICAgY29uc3QgeCA9IHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyKCd4JykpXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyKCd5JykpXG4gICAgcmV0dXJuIHsgeCwgeSB9XG4gIH1cbiAgZG1vdmUoZHgsIGR5KSB7XG4gICAgY29uc3QgcG9zID0gdGhpcy5nZXRQb3MoKVxuICAgIHRoaXMuc2V0QXR0cigneCcsIHBvcy54ICsgZHgpXG4gICAgdGhpcy5zZXRBdHRyKCd5JywgcG9zLnkgKyBkeSlcbiAgfVxufSIsIi8qKlxuICogZ3VpZGUgbGluZSBsYXllclxuICovXG5cbmltcG9ydCB7IE91dGxpbmVIdWQgfSBmcm9tIFwiLi9vdXRsaW5lSHVkXCI7XG5pbXBvcnQgeyBTZWxlY3RBcmVhIH0gZnJvbSBcIi4vc2VsZWN0QXJlYVwiO1xuY29uc3QgeyBOUyB9ID0gcmVxdWlyZShcIi4uL2NvbnN0YW50c1wiKTtcblxuZXhwb3J0IGNsYXNzIEh1ZE1hbmFnZXJ7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ2cnKVxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gJ2h1ZHMnXG5cbiAgICB0aGlzLnNlbGVjdEFyZWEgPSBuZXcgU2VsZWN0QXJlYSh0aGlzLmNvbnRhaW5lcilcbiAgICB0aGlzLm91dGxpbmVIdWQgPSBuZXcgT3V0bGluZUh1ZCh0aGlzLmNvbnRhaW5lcilcbiAgfVxuICBtb3VudChlbCkge1xuICAgIGVsLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKVxuICB9XG59XG5cbiIsIlxuXG4gIFxuY29uc3QgeyBOUyB9ID0gcmVxdWlyZShcIi4uL2NvbnN0YW50c1wiKTtcblxuLyoqXG4gKiA8cmVjdD4gb3V0bGluZVxuICovXG5leHBvcnQgY2xhc3MgT3V0bGluZUh1ZCB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudCkge1xuICAgIHRoaXMueCA9IDBcbiAgICB0aGlzLnkgPSAwXG4gICAgdGhpcy53ID0gMFxuICAgIHRoaXMuaCA9IDBcblxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ2cnKVxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gJ291dGxpbmUtaHVkJ1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcilcblxuICAgIHRoaXMub3V0bGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdwYXRoJylcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKVxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICcjZjA0JylcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd2ZWN0b3ItZWZmZWN0JywgJ25vbi1zY2FsaW5nLXN0cm9rZScpXG5cbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLm91dGxpbmUpXG4gIH1cbiAgY2xlYXIoKSB7XG4gICAgLy8gcGFyZW50LmlubmVySFRNTCA9ICcnXG4gICAgdGhpcy5vdXRsaW5lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgfVxuICBkcmF3UmVjdCh4LCB5LCB3LCBoKSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLncgPSB3XG4gICAgdGhpcy5oID0gaFxuXG4gICAgLy8gd2h5IGRvbid0IEkgdXNlIHJlY3QsIGp1c3Qgc29sdmUgdGhlIGNvbmRpdGlvbiB3aGVuIHdpZHRoIG9yIGhlaWdodCBpcyAwIHRoZSBvdXRsaW5lIGlzIGRpc2FwcGVyXG4gICAgY29uc3QgZCA9IGBNICR7eH0gJHt5fSBMICR7eCt3fSAke3l9IEwgJHt4K3d9ICR7eStofSBMICR7eH0gJHt5K2h9IFpgXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZCcsIGQpXG4gICAgdGhpcy5vdXRsaW5lLnN0eWxlLmRpc3BsYXkgPSAnJ1xuICB9XG4gIGdldFdpZHRoKCkgeyByZXR1cm4gdGhpcy53IH1cbiAgZ2V0SGVpZ2h0KCkgeyByZXR1cm4gdGhpcy5oIH1cbiAgZ2V0WCgpIHsgcmV0dXJuIHRoaXMueCB9XG4gIGdldFkoKSB7IHJldHVybiB0aGlzLnkgfVxufSIsIlxuY29uc3QgeyBOUyB9ID0gcmVxdWlyZShcIi4uL2NvbnN0YW50c1wiKTtcblxuLyoqXG4gKiBzZWxlY3QgYXJlYVxuICovXG5leHBvcnQgY2xhc3MgU2VsZWN0QXJlYSB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudCkge1xuICAgIHRoaXMueCA9IDBcbiAgICB0aGlzLnkgPSAwXG4gICAgdGhpcy53ID0gMFxuICAgIHRoaXMuaCA9IDBcblxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ2cnKVxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gJ3NlbGVjdC1hcmVhJ1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcilcblxuICAgIHRoaXMub3V0bGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdwYXRoJylcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKVxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICcjMDU0JylcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd2ZWN0b3ItZWZmZWN0JywgJ25vbi1zY2FsaW5nLXN0cm9rZScpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLWRhc2hhcnJheScsICc0cHgnKVxuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5vdXRsaW5lKVxuICB9XG4gIGNsZWFyKCkge1xuICAgIC8vIHBhcmVudC5pbm5lckhUTUwgPSAnJ1xuICAgIHRoaXMub3V0bGluZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIH1cbiAgZHJhd1JlY3QoeCwgeSwgdywgaCkge1xuICAgIHRoaXMueCA9IHhcbiAgICB0aGlzLnkgPSB5XG4gICAgdGhpcy53ID0gd1xuICAgIHRoaXMuaCA9IGhcblxuICAgIC8vIHdoeSBkb24ndCBJIHVzZSByZWN0LCBqdXN0IHNvbHZlIHRoZSBjb25kaXRpb24gd2hlbiB3aWR0aCBvciBoZWlnaHQgaXMgMCB0aGUgb3V0bGluZSBpcyBkaXNhcHBlclxuICAgIGNvbnN0IGQgPSBgTSAke3h9ICR7eX0gTCAke3grd30gJHt5fSBMICR7eCt3fSAke3kraH0gTCAke3h9ICR7eStofSBaYFxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2QnLCBkKVxuXG4gICAgLyogdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgneCcsIHgpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgneScsIHkpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3KVxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGgpICovXG4gICAgdGhpcy5vdXRsaW5lLnN0eWxlLmRpc3BsYXkgPSAnJ1xuICB9XG4gIGdldFdpZHRoKCkgeyByZXR1cm4gdGhpcy53IH1cbiAgZ2V0SGVpZ2h0KCkgeyByZXR1cm4gdGhpcy5oIH1cbiAgZ2V0WCgpIHsgcmV0dXJuIHRoaXMueCB9XG4gIGdldFkoKSB7IHJldHVybiB0aGlzLnkgfVxufSIsIlxuaW1wb3J0IHsgZ2V0Qm94QnkycG9pbnRzIH0gZnJvbSBcIi4uL3V0aWwvbWF0aFwiXG5cbmNsYXNzIEFkZFJlY3Qge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcbiAgfVxuICBuYW1lKCkge1xuICAgIHJldHVybiAnYWRkUmVjdCdcbiAgfVxuICBzZXRFZGl0b3IoZWRpdG9yKSB7IC8vIOS+nei1luazqOWFpVxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gIH1cbiAgc3RhcnQoY3R4KSB7fVxuICBtb3ZlKGN0eCkge1xuICAgIGNvbnN0IHsgeDogZW5kWCwgeTogZW5kWSB9ID0gY3R4LmdldFBvcygpXG4gICAgY29uc3QgeyB4OiBzdGFydFgsIHk6IHN0YXJ0WSB9ID0gY3R4LmdldFN0YXJ0UG9zKClcbiAgICBjb25zdCB7IHgsIHksIHcsIGggfSA9IGdldEJveEJ5MnBvaW50cyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSlcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuZHJhd1JlY3QoeCwgeSwgdywgaClcbiAgfVxuICBlbmQoY3R4KSB7XG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lSHVkLmNsZWFyKClcblxuICAgIGNvbnN0IHsgeDogZW5kWCwgeTogZW5kWSB9ID0gY3R4LmdldFBvcygpXG4gICAgY29uc3QgeyB4OiBzdGFydFgsIHk6IHN0YXJ0WSB9ID0gY3R4LmdldFN0YXJ0UG9zKClcbiAgICBjb25zdCB7IHgsIHksIHcsIGggfSA9IGdldEJveEJ5MnBvaW50cyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSlcbiAgICBpZiAodyA8IDIgJiYgaCA8IDIpIHtcbiAgICAgIC8vIFRPRE86IG9wZW4gYSBkaWFsb2cgdG8gaW5wdXQgd2lkdGggYW5kIGhlaWdodFxuICAgICAgY29uc29sZS5sb2coJ3dpZHRoIGFuZCBoZWlnaHQgYm90aCBsZXNzIGVxdWFsIHRvIDLvvIxkcmF3aW5nIG5vdGhpbmcnKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdhZGRSZWN0JywgeCwgeSwgdywgaClcbiAgfVxuICAvLyBtb3VzZWRvd24gb3V0c2lkZSB2aWV3cG9ydFxuICBlbmRPdXRzaWRlKCkge1xuICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIub3V0bGluZUh1ZC5jbGVhcigpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWRkUmVjdCIsIlxuZXhwb3J0IGNsYXNzIERyYWdDYW52YXMge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnN0YXJ0T2Zmc2V0WCA9IDBcbiAgICB0aGlzLnN0YXJ0T2Zmc2V0WSA9IDBcbiAgfVxuICBuYW1lKCkge1xuICAgIHJldHVybiAnZHJhZ0NhbnZhcydcbiAgfVxuICBzZXRFZGl0b3IoZWRpdG9yKSB7IC8vIOS+nei1luazqOWFpVxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gIH1cbiAgYmVmb3JlQWN0aXZlKCkge1xuICAgIC8vIGRvIHNvbWV0aGluZyBiZWZvcmUgc3dpdGNoIHRvIGN1cnJlbnQgdG9vbFxuICB9XG4gIHN0YXJ0KGN0eCkge1xuICAgIGNvbnN0IHNjcm9sbCA9IHRoaXMuZWRpdG9yLmdldFNjcm9sbCgpXG4gICAgdGhpcy5zdGFydE9mZnNldFggPSBzY3JvbGwueFxuICAgIHRoaXMuc3RhcnRPZmZzZXRZID0gc2Nyb2xsLnlcbiAgfVxuICBtb3ZlKGN0eCkge1xuICAgIGNvbnN0IHpvb20gPSB0aGlzLmVkaXRvci5nZXRab29tKClcbiAgICBjb25zdCB7IHg6IGR4LCB5OiBkeSB9ID0gY3R4LmdldERpZmZQb3MoKVxuICAgIHRoaXMuZWRpdG9yLnNldFNjcm9sbCh0aGlzLnN0YXJ0T2Zmc2V0WCAtIGR4LCB0aGlzLnN0YXJ0T2Zmc2V0WSAtIGR5KVxuICB9XG4gIGVuZCgpIHt9XG4gIGVuZE91dHNpZGUoKSB7fVxufVxuIiwiaW1wb3J0IHsgRlNWRyB9IGZyb20gXCIuLi9lbGVtZW50XCJcbmltcG9ydCB7IGdldEJveEJ5MnBvaW50cyB9IGZyb20gXCIuLi91dGlsL21hdGhcIlxuXG4vKipcbiAqIHNlbGVjdFxuICogXG4gKiDmraTmqKHlnZfpnZ7luLjlpI3mnYJcbiAqIFxuICogMS4g6byg5qCH5oyJ5LiL5pe277yM6YCJ5Lit5Y2V5Liq5YWD57SgXG4gKiAyLiDpvKDmoIfmjInkuIvkuLrnqbrvvIzmi5bmi73ml7bkuqfnlJ/pgInkuK3moYbvvIzlj6/ku6XpgInmi6nlpJrkuKrlhYPntKBcbiAqIDMuIOmAieS4reWNleS4qu+8iOaIlumAieWMuumAieS4reWkmuS4qu+8iSDnvKnmlL4g562J5o6n5Yi254K577yM5ouW5ou95pS55Y+Y5a696auYXG4gKiAzLiDliIfmlq3liIDov5nkuKrlt6Xlhbfml7bvvIzmv4DmtLvnmoTlhYPntKDov5vlhaXooqvpgInkuK3nirbmgIHvvIjova7lu5Pnur8r5o6n5Yi254K577yJ44CCXG4gKiA0LiDpgInljLrlkozlhYPntKDnm7jkuqTnmoTliKTlrppcbiAqIDUuIOa/gOa0u+WFg+e0oOWmguS9leS/neWtmO+8jOS/neWtmOWIsOWTqumHjFxuICovXG5leHBvcnQgY2xhc3MgU2VsZWN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBudWxsXG4gICAgdGhpcy5zZWxlY3RlZEVscyA9IFtdXG5cbiAgICB0aGlzLm91dGxpbmVTdGFydFggPSAwXG4gICAgdGhpcy5vdXRsaW5lU3RhcnRZID0gMFxuICB9XG4gIG5hbWUoKSB7XG4gICAgcmV0dXJuICdzZWxlY3QnXG4gIH1cbiAgc2V0RWRpdG9yKGVkaXRvcikge1xuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gIH1cbiAgaGFzU2VsZWN0ZWRFbHNXaGVuU3RhcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRFbHMubGVuZ3RoID4gMFxuICB9XG4gIHN0YXJ0KGN0eCkge1xuICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBjdHgub3JpZ2luRXZlbnQudGFyZ2V0XG4gICAgaWYgKCF0aGlzLmVkaXRvci5pc0NvbnRlbnRFbGVtZW50KHRhcmdldEVsZW1lbnQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRGRWxlbWVudCA9IG5ldyBGU1ZHLlJlY3QodGFyZ2V0RWxlbWVudCkgLy8g5pqC5pe25Y+q5pivIHJlY3QgVE9ETzog5pS55Li66YCa55So5YaZ5rOVXG4gICAgdGhpcy5zZWxlY3RlZEVscyA9IFsgdGFyZ2V0RkVsZW1lbnQgXSAvLyDpvKDmoIfmjInkuIvml7bvvIzlsLHpgInkuK3kuobkuIDkuKrlhYPntKBcbiAgICBjb25zdCB4ID0gcGFyc2VGbG9hdCh0YXJnZXRGRWxlbWVudC5nZXRBdHRyKCd4JykpXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQodGFyZ2V0RkVsZW1lbnQuZ2V0QXR0cigneScpKVxuICAgIGNvbnN0IHcgPSBwYXJzZUZsb2F0KHRhcmdldEZFbGVtZW50LmdldEF0dHIoJ3dpZHRoJykpXG4gICAgY29uc3QgaCA9IHBhcnNlRmxvYXQodGFyZ2V0RkVsZW1lbnQuZ2V0QXR0cignaGVpZ2h0JykpXG5cbiAgICB0aGlzLm91dGxpbmVTdGFydFggPSB4XG4gICAgdGhpcy5vdXRsaW5lU3RhcnRZID0geVxuXG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lSHVkLmRyYXdSZWN0KHgsIHksIHcsIGgpXG4gIH1cbiAgbW92ZShjdHgpIHtcbiAgICBpZiAoIXRoaXMuaGFzU2VsZWN0ZWRFbHNXaGVuU3RhcnQoKSkgeyAvLyBkcmF3IHNlbGVjdGluZyBhcmVhXG4gICAgICAvLyBzZWxlY3Qgbm8gZWxlbWVudCwgZHJhdyBzZWxlY3QgcmVjdFxuICAgICAgY29uc3QgeyB4OiBlbmRYLCB5OiBlbmRZIH0gPSBjdHguZ2V0UG9zKClcbiAgICAgIGNvbnN0IHsgeDogc3RhcnRYLCB5OiBzdGFydFkgfSA9IGN0eC5nZXRTdGFydFBvcygpXG4gICAgICBjb25zdCB7IHgsIHksIHcsIGggfSA9IGdldEJveEJ5MnBvaW50cyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSlcbiAgICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIuc2VsZWN0QXJlYS5kcmF3UmVjdCh4LCB5LCB3LCBoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgeyB4OiBkeCwgeTogZHkgfSA9IGN0eC5nZXREaWZmUG9zKClcbiAgICBjb25zdCBvdXRsaW5lSHVkID0gdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lSHVkXG4gICAgY29uc3QgdyA9IG91dGxpbmVIdWQuZ2V0V2lkdGgoKVxuICAgIGNvbnN0IGggPSBvdXRsaW5lSHVkLmdldEhlaWdodCgpXG4gICAgb3V0bGluZUh1ZC5kcmF3UmVjdCh0aGlzLm91dGxpbmVTdGFydFggKyBkeCwgdGhpcy5vdXRsaW5lU3RhcnRZICsgZHksIHcsIGgpXG4gIH1cbiAgZW5kKGN0eCkge1xuICAgIGlmICghdGhpcy5oYXNTZWxlY3RlZEVsc1doZW5TdGFydCgpKSB7IC8vIGZpbmlzaGVkIGRyYXduIHNlbGVjdGluZyBhcmVhXG4gICAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLnNlbGVjdEFyZWEuY2xlYXIoKVxuICAgICAgLy8gVE9ETzogYWN0aXZlIGZyYW1lIGJ5IHNlbGVjdCByZWN0LlxuICAgICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuY2xlYXIoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIub3V0bGluZUh1ZC5jbGVhcigpXG5cbiAgICBcbiAgICBjb25zdCB7IHg6IGR4LCB5OiBkeSB9ID0gY3R4LmdldERpZmZQb3MoKVxuICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdkbW92ZScsIHRoaXMuc2VsZWN0ZWRFbHMsIGR4LCBkeSlcbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHModGhpcy5zZWxlY3RlZEVscykgLy8gc2V0IGdsb2JhbCBhY3RpdmVkIGVsZW1lbnRzXG4gICAgdGhpcy5zZWxlY3RlZEVscyA9IFtdXG4gIH1cbiAgLy8gbW91c2Vkb3duIG91dHNpZGUgdmlld3BvcnRcbiAgZW5kT3V0c2lkZSgpIHtcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuY2xlYXIoKVxuICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIuc2VsZWN0QXJlYS5jbGVhcigpXG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuY2xlYXIoKVxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxuICB9XG59XG4iLCIvKiogem9vbSAqL1xuXG5jb25zdCB7IGdldFZpZXdCb3ggfSA9IHJlcXVpcmUoXCIuLi91dGlsL3N2Z1wiKVxuXG5leHBvcnQgY2xhc3MgWm9vbU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcbiAgfVxuICBzZXRFZGl0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgfVxuICBnZXRab29tKCkge1xuICAgIGNvbnN0IGFjdHVsV2lkdGggPSBwYXJzZUZsb2F0KHRoaXMuZWRpdG9yLnN2Z1Jvb3QuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKVxuICAgIGNvbnN0IHZpZXdCb3ggPSBnZXRWaWV3Qm94KHRoaXMuZWRpdG9yLnN2Z1Jvb3QpXG4gICAgY29uc3Qgem9vbSA9IGFjdHVsV2lkdGggLyB2aWV3Qm94LndcbiAgICByZXR1cm4gem9vbVxuICB9XG4gIHNldFpvb20oem9vbSkge1xuICAgIGNvbnNvbGUubG9nKHpvb20pXG4gICAgY29uc3Qgdmlld0JveCA9IGdldFZpZXdCb3godGhpcy5lZGl0b3Iuc3ZnUm9vdClcbiAgICBjb25zdCB3aWR0aCA9IHZpZXdCb3gudyAqIHpvb21cbiAgICBjb25zdCBoZWlnaHQgPSB2aWV3Qm94LmggKiB6b29tXG4gICAgdGhpcy5lZGl0b3Iuc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2lkdGgpXG4gICAgdGhpcy5lZGl0b3Iuc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGhlaWdodClcbiAgfVxuICB6b29tSW4oKSB7XG4gICAgY29uc3QgY3VycmVudFpvb20gPSB0aGlzLmdldFpvb20oKVxuICAgIHRoaXMuc2V0Wm9vbShjdXJyZW50Wm9vbSArIDAuMSlcbiAgfVxuICB6b29tT3V0KCkge1xuICAgIGNvbnN0IGN1cnJlbnRab29tID0gdGhpcy5nZXRab29tKClcbiAgICB0aGlzLnNldFpvb20oY3VycmVudFpvb20gLSAwLjEpXG4gIH1cbn0iLCJcbmV4cG9ydCBjbGFzcyBFZGl0b3JTZXR0aW5nIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zZXR0aW5nID0ge1xuICAgICAgLy8gZmlsbDogJyNmZmYnLFxuICAgICAgLy8gc3Ryb2tlOiAnIzAwMCcsXG4gICAgICAvLyBzdHJva2VXaWR0aDogJzJweCcsXG5cbiAgICAgIC8vIG91dGxpbmVXaWR0aFxuICAgICAgLy8gb3V0bGluZUNvbG9yXG4gICAgfVxuICAgIHRoaXMuYmluZGVkRXZlbnRGbnMgPSB7fVxuICAgIHRoaXMuc2V0RmlsbCgnI2ZmZicpXG4gICAgdGhpcy5zZXRTdHJva2UoJyMwMDAnKVxuICAgIHRoaXMuc2V0KCdzdHJva2VXaWR0aCcsICcxcHgnKVxuICB9XG4gIHNldEZpbGwodmFsKSB7XG4gICAgdGhpcy5zZXQoJ2ZpbGwnLCB2YWwpXG4gIH1cbiAgc2V0U3Ryb2tlKHZhbCkge1xuICAgIHRoaXMuc2V0KCdzdHJva2UnLCB2YWwpXG4gIH1cbiAgc2V0KG5hbWUsIHZhbCkge1xuICAgIHRoaXMuc2V0dGluZ1tuYW1lXSA9IHZhbFxuXG4gICAgY29uc3QgdG9DYWxsRm5zID0gdGhpcy5iaW5kZWRFdmVudEZuc1tuYW1lXVxuICAgIGlmICh0b0NhbGxGbnMpIHtcbiAgICAgIHRvQ2FsbEZucy5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgZm4odmFsKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgZ2V0KG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5nW25hbWVdXG4gIH1cbiAgYmluZEV2ZW50KG5hbWUsIGZuKSB7XG4gICAgaWYgKCF0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdKSB7XG4gICAgICB0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdID0gW11cbiAgICB9XG4gICAgdGhpcy5iaW5kZWRFdmVudEZuc1tuYW1lXS5wdXNoKGZuKVxuICB9XG4gIHJlbW92ZUV2ZW50KG5hbWUsIGZuKSB7XG4gICAgaWYgKCF0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdKSByZXR1cm4gZmFsc2VcblxuICAgIGNvbnN0IHJlbW92ZUZuSWR4ID0gdGhpcy5iaW5kZWRFdmVudEZuc1tuYW1lXS5maW5kSW5kZXgoZm4pXG4gICAgaWYgKHJlbW92ZUZuSWR4ID09PSAtMSkgcmV0dXJuIGZhbHNlXG4gICAgdGhpcy5iaW5kZWRFdmVudEZucy5zcGxpY2UocmVtb3ZlRm5JZHgsIDEpXG4gICAgcmV0dXJuIHRydWVcbiAgfVxufSIsIlxuZXhwb3J0IGNsYXNzIFNob3J0Y3V0IHtcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgICB0aGlzLnJlZ2lzdGVyZWRGbnMgPSB7fVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcbiAgICAgIGNvbnN0IHByZXNzS2V5TmFtZSA9IGdldFByZXNzS2V5TmFtZShlKVxuXG4gICAgICBjb25zdCBmbiA9IHRoaXMucmVnaXN0ZXJlZEZuc1twcmVzc0tleU5hbWVdXG4gICAgICBpZiAoZm4pIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGZuLmZuKGUpXG4gICAgICB9XG4gICAgICBcbiAgICB9LCBmYWxzZSlcbiAgfVxuICAvLyB0aGlzLnJlZ2lzdGVyKCd1bmRvJywgJ0N0cmwrWicsICgpID0+IHsgZWRpdG9yLmV4ZWNDb21tYW5kKCd1bmRvJykgfSlcbiAgcmVnaXN0ZXIoY21kTmFtZSwgc2hvcnRjdXROYW1lLCBmbikge1xuICAgIC8vIFRPRE86IHZhbGlkIHNob3J0Y3V0TmFtZVxuICAgIHRoaXMucmVnaXN0ZXJlZEZuc1tzaG9ydGN1dE5hbWVdID0geyBjbWROYW1lLCBmbiB9XG4gICAgXG4gIH1cbiAgZm9ybWF0UHJpbnQoKSB7XG4gICAgY29uc3QgYXJyID0gW11cbiAgICBmb3IgKGxldCBzaG9ydGN1dE5hbWUgaW4gdGhpcy5yZWdpc3RlcmVkRm5zKSB7XG4gICAgICBjb25zdCBjbWROYW1lID0gdGhpcy5yZWdpc3RlcmVkRm5zW3Nob3J0Y3V0TmFtZV0uY21kTmFtZVxuICAgICAgYXJyLnB1c2goY21kTmFtZSArICc6ICcgKyBzaG9ydGN1dE5hbWUpXG4gICAgfVxuICAgIHJldHVybiBhcnIuam9pbignLCAnKVxuICB9XG4gIFxufVxuXG5mdW5jdGlvbiBnZXRQcmVzc0tleU5hbWUoZSkge1xuICBjb25zdCBwcmVzc2VkS2V5cyA9IFtdXG4gIGlmIChlLmN0cmxLZXkpIHByZXNzZWRLZXlzLnB1c2goJ0N0cmwnKVxuICBpZiAoZS5tZXRhS2V5KSBwcmVzc2VkS2V5cy5wdXNoKCdDbWQnKVxuICBpZiAoZS5zaGlmdEtleSkgcHJlc3NlZEtleXMucHVzaCgnU2hpZnQnKVxuICAvLyBvbmx5IGNoZWNrIEF+WlxuICAvLyBUT0RPOiByZXNvbHZlIGFsbCBrZXlcbiAgaWYgKC9LZXkuLy50ZXN0KGUuY29kZSkpIHByZXNzZWRLZXlzLnB1c2goZS5jb2RlW2UuY29kZS5sZW5ndGggLSAxXSlcbiAgY29uc3QgbmFtZSA9IHByZXNzZWRLZXlzLmpvaW4oJysnKVxuICByZXR1cm4gbmFtZVxufSIsImNvbnN0IHsgRWRpdG9yRXZlbnRDb250ZXh0IH0gPSByZXF1aXJlKFwiLi9lZGl0b3JFdmVudENvbnRleHRcIilcblxuZXhwb3J0IGNsYXNzIFRvb2xNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgICB0aGlzLnRvb2xzID0ge31cbiAgICB0aGlzLmN1cnJlbnRUb29sID0gbnVsbFxuICAgIHRoaXMuaW52b2tlV2hlblN3aXRjaCA9ICgpID0+IHt9XG5cbiAgICB0aGlzLmN0eCA9IG51bGwgLy8gdG9vbCBjb250ZXh0XG4gIH1cbiAgc2V0Q3VycmVudFRvb2wobmFtZSkge1xuICAgIHRoaXMuY3VycmVudFRvb2wgPSB0aGlzLnRvb2xzW25hbWVdXG4gICAgdGhpcy5pbnZva2VXaGVuU3dpdGNoKHRoaXMuZ2V0Q3VycmVudFRvb2xOYW1lKCkpXG4gIH1cbiAgb25Td2l0Y2hUb29sKGZuKSB7XG4gICAgdGhpcy5pbnZva2VXaGVuU3dpdGNoID0gZm5cbiAgfVxuICBnZXRDdXJyZW50VG9vbE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFRvb2wubmFtZSgpXG4gIH1cbiAgcmVnaXN0ZXJUb29sKHRvb2wpIHtcbiAgICB0aGlzLnRvb2xzW3Rvb2wubmFtZSgpXSA9IHRvb2xcbiAgICB0b29sLnNldEVkaXRvcih0aGlzLmVkaXRvcikgLy8gZGVwZW5kZW5jeSBpbmplY3Rpb25cbiAgfVxuXG4gIGJpbmRUb29sRXZlbnQoKSB7XG4gICAgY29uc3Qgc3ZnUm9vdCA9IHRoaXMuZWRpdG9yLnN2Z1Jvb3RcblxuICAgIHN2Z1Jvb3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZSA9PiB7XG4gICAgICBjb25zdCBjdHggPSBuZXcgRWRpdG9yRXZlbnRDb250ZXh0KHRoaXMuZWRpdG9yLCBlKVxuICAgICAgdGhpcy5jdHggPSBjdHhcbiAgICAgIHRoaXMuY3VycmVudFRvb2wuc3RhcnQoY3R4KVxuICAgIH0sIGZhbHNlKVxuXG4gICAgc3ZnUm9vdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4XG5cbiAgICAgIGlmICghY3R4KSByZXR1cm4gLy8gaWYgY3R4IGV4aXRzLCBwcmVzZW50IG1vdXNlZG93biBldmVudCBlbWl0IGp1c3QgYmVmb3JlXG4gICAgICBjdHguc2V0T3JpZ2luRXZlbnQoZSlcbiAgICAgIGN0eC5wcmVzc01vdXNlKClcbiAgICAgIHRoaXMuY3VycmVudFRvb2wubW92ZShjdHgpIC8vIG1vdmVcbiAgICB9LCBmYWxzZSlcbiAgICBcbiAgICBzdmdSb290LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlID0+IHtcbiAgICAgIC8vIHRoaXMuY3R4LnJlbGVhc2VNb3VzZSgpXG4gICAgICBjb25zdCBjdHggPSB0aGlzLmN0eFxuICAgICAgLy8gY3R4LnNldE9yaWdpbkV2ZW50KGUpIC8vIHRoZSBvZmZzZXRYIGFuZCBvZmZzZXRZIGluIG1vdXNldXAgYW5kIHRoZSBsYXN0IG1vdXNlbW92ZSBpcyBub3QgZXF1YWwgPz8gXG4gICAgICB0aGlzLmN1cnJlbnRUb29sLmVuZChjdHgpXG4gICAgICBjdHguaXNFbmRJbnNpZGUgPSB0cnVlXG4gICAgfSwgZmFsc2UpXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGUgPT4ge1xuICAgICAgaWYgKHRoaXMuY3R4ICYmIHRoaXMuY3R4LmlzRW5kSW5zaWRlID09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRvb2wuZW5kT3V0c2lkZSh0aGlzLmN0eClcbiAgICAgIH1cbiAgICAgIHRoaXMuY3R4ID0gbnVsbFxuICAgIH0sIGZhbHNlKVxuICB9XG59IiwiXG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm94QnkycG9pbnRzKHgxLCB5MSwgeDIsIHkyKSB7XG4gIGxldCB4LCB5LCB3LCBoXG4gIHcgPSBNYXRoLmFicyh4MiAtIHgxKVxuICBoID0gTWF0aC5hYnMoeTIgLSB5MSlcbiAgeCA9IE1hdGgubWluKHgyLCB4MSlcbiAgeSA9IE1hdGgubWluKHkyLCB5MSlcbiAgcmV0dXJuIHsgeCwgeSwgdywgaCB9XG59IiwiXG4vLyBUT0RPOiB0byBmaW5pc2hcbmV4cG9ydCBmdW5jdGlvbiBnZXRWaWV3Qm94KGVsKSB7XG4gIGNvbnN0IHZhbCA9IGVsLmdldEF0dHJpYnV0ZSgndmlld0JveCcpXG4gIGlmICghdmFsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdoYXMgbm90IHZpZXdCb3ggYXR0cmlidXRlJylcbiAgfVxuICBjb25zdCBbeCwgeSwgdywgaF0gPSB2YWwuc3BsaXQoL1tcXHMsXSsvKS5tYXAoaXRlbSA9PiBwYXJzZUZsb2F0KGl0ZW0pKVxuICByZXR1cm4geyB4LCB5LCB3LCBoIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=