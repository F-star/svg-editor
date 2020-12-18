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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2FjdGl2ZWRFbHNNYW5hZ2VyLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvY29tbWFuZC9jb21tYW5kTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2NvbW1hbmQvY29tbWFuZHMuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3JFdmVudENvbnRleHQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lbGVtZW50L2Jhc2VFbGVtZW50LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvZWxlbWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2VsZW1lbnQvcmVjdC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2xheWVyL2h1ZE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9sYXllci9vdXRsaW5lSHVkLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbGF5ZXIvc2VsZWN0QXJlYS5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvYWRkUmVjdC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvZHJhZ0NhbnZhcy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvc2VsZWN0LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy96b29tLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvc2V0dGluZy9lZGl0b3JTZXR0aW5nLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvc2hvcnRjdXQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy90b29sTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL3V0aWwvbWF0aC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL3V0aWwvc3ZnLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxvQkFBb0I7QUFDakM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekRBLENBQWdDO0FBQ1U7QUFDVTtBQUNJO0FBQ0U7QUFDWDtBQUNIO0FBQ0U7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSwwQkFBMEIseURBQVU7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2S3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87O0FBRWxCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsS0FB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Q1YsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOzs7Ozs7O1VDVEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIOa/gOa0u+WFg+e0oOeuoeeQhuexu1xuICovXG5cbmV4cG9ydCBjbGFzcyBBY3RpdmVkRWxzTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKGVkaXRvcikge1xuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gICAgdGhpcy5lbHMgPSBbXVxuICB9XG4gIHNldEVscyhlbHMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxzKSkgZWxzID0gW2Vsc11cbiAgICB0aGlzLmVscyA9IGVsc1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZWRpdG9yLnRvb2xNYW5hZ2VyLmdldEN1cnJlbnRUb29sTmFtZSgpKVxuICAgIC8vIFRPRE86IGhpZ2hsaWdodCBvdXRsaW5lLCBhY2NvcmRpbmcgdG8gY3VycmVudCB0b29sXG4gICAgdGhpcy5oZWlnaGxpZ3RoRWxzKClcbiAgICB0aGlzLnNldFNldHRpbmdGaWxsKClcbiAgfVxuICBjbGVhcigpIHtcbiAgICB0aGlzLmVscyA9IFtdXG4gICAgLy8gY2xlYXIgb3V0bGluZVxuICAgIGNvbnN0IGh1ZE1hbmFnZXIgPSB0aGlzLmVkaXRvci5odWRNYW5hZ2VyXG4gICAgaHVkTWFuYWdlci5vdXRsaW5lSHVkLmNsZWFyKClcbiAgfVxuICBjb250YWlucyhlbCkge1xuICAgIC8vIFRPRE86XG4gIH1cbiAgZ2V0YmJveCgpIHtcbiAgICAvLyBUT0RPOlxuICAgIC8qIGxldCB4LCB5LCB3LCBoXG4gICAgdGhpcy5lbHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICBjb25zdCBiYm94ID0gZWwuZWwoKS5nZXRiYm94KClcbiAgICB9KSAqL1xuICB9XG4gIC8vIGhlaWdodGxpZ2h0IHRoZSBlbGVtZW50c1xuICBoZWlnaGxpZ3RoRWxzKCkge1xuICAgIC8vIFRPRE86XG4gICAgY29uc3QgZWxzID0gdGhpcy5lbHNcbiAgICBjb25zdCBodWRNYW5hZ2VyID0gdGhpcy5lZGl0b3IuaHVkTWFuYWdlclxuICAgIGVscy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IGVsLmdldEJCb3goKVxuICAgICAgLy8gY29uc29sZS5sb2coYm94KVxuICAgICAgaHVkTWFuYWdlci5vdXRsaW5lSHVkLmRyYXdSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpXG4gICAgfSlcbiAgfVxuICBzZXRTZXR0aW5nRmlsbCgpIHtcbiAgICBjb25zdCBlbHMgPSB0aGlzLmVsc1xuXG4gICAgY29uc3QgZmlsbHMgPSBlbHMubWFwKGVsID0+IHtcbiAgICAgIHJldHVybiBlbC5nZXRBdHRyKCdmaWxsJylcbiAgICB9KVxuXG4gICAgdGhpcy5lZGl0b3Iuc2V0dGluZy5zZXRGaWxsKGZpbGxzWzBdKSAvLyBGSVhNRTpcbiAgfVxuICBzZXRFbHNBdHRyKG5hbWUsIHZhbCkge1xuICAgIHRoaXMuZWxzLmZvckVhY2goZWwgPT4ge1xuICAgICAgZWwuc2V0QXR0cihuYW1lLCB2YWwpXG4gICAgfSlcbiAgfVxufSIsIlxuaW1wb3J0IEVkaXRvciBmcm9tICcuL2VkaXRvci5qcydcbmltcG9ydCBBZGRSZWN0IGZyb20gJy4vbW9kdWxlcy9hZGRSZWN0LmpzJ1xuaW1wb3J0IHsgRHJhZ0NhbnZhcyB9IGZyb20gJy4vbW9kdWxlcy9kcmFnQ2FudmFzLmpzJ1xuaW1wb3J0IENvbW1hbmRNYW5hZ2VyIGZyb20gJy4vY29tbWFuZC9jb21tYW5kTWFuYWdlci5qcydcbmltcG9ydCB7IEVkaXRvclNldHRpbmcgfSBmcm9tICcuL3NldHRpbmcvZWRpdG9yU2V0dGluZy5qcydcbmltcG9ydCB7IFpvb21NYW5hZ2VyIH0gZnJvbSAnLi9tb2R1bGVzL3pvb20uanMnXG5pbXBvcnQgeyBTZWxlY3QgfSBmcm9tICcuL21vZHVsZXMvc2VsZWN0LmpzJ1xuaW1wb3J0IHsgVG9vbE1hbmFnZXIgfSBmcm9tICcuL3Rvb2xNYW5hZ2VyLmpzJ1xuXG5mdW5jdGlvbiBhY3RpdmVCdG4obmFtZSkge1xuICBuYW1lID0ge1xuICAgICdzZWxlY3QnOiAnYnRuLXNlbGVjdCcsXG4gICAgJ2FkZFJlY3QnOiAnYnRuLWFkZC1yZWN0JyxcbiAgICAnZHJhZ0NhbnZhcyc6ICdidG4tZHJhZy1jYW52YXMnLFxuICB9W25hbWVdXG4gIGlmIChuYW1lID09IHVuZGVmaW5lZCkgcmV0dXJuXG5cbiAgY29uc3QgdG9vbEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b29sLWJhcicpXG4gIGNvbnN0IHRvb2xCdG5zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodG9vbEJhci5jaGlsZHJlbilcbiAgdG9vbEJ0bnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gIH0pXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5hbWUpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG59XG5cblxuY29uc3QgZWRpdG9yID0gbmV3IEVkaXRvcigpXG53aW5kb3cuZWRpdG9yID0gZWRpdG9yIC8vIGRlYnVnIGluIGRldnRvb2xcblxuY29uc3QgY29tbWFuZE1hbmFnZXIgPSBuZXcgQ29tbWFuZE1hbmFnZXIoZWRpdG9yKVxuZWRpdG9yLnNldENvbW1hbmRNYW5hZ2VyKGNvbW1hbmRNYW5hZ2VyKVxuXG5lZGl0b3Iuc2V0U2V0dGluZyhuZXcgRWRpdG9yU2V0dGluZygpKVxuLy8gcmVnaXN0ZXIgdG9vbHNcblxuY29uc3QgdG9vbE1hbmFnZXIgPSBuZXcgVG9vbE1hbmFnZXIoZWRpdG9yKVxuZWRpdG9yLnNldFRvb2xNYW5hZ2VyKHRvb2xNYW5hZ2VyKVxudG9vbE1hbmFnZXIucmVnaXN0ZXJUb29sKG5ldyBBZGRSZWN0KCkpXG50b29sTWFuYWdlci5yZWdpc3RlclRvb2wobmV3IERyYWdDYW52YXMoKSlcbnRvb2xNYW5hZ2VyLnJlZ2lzdGVyVG9vbChuZXcgU2VsZWN0KCkpXG5cbmVkaXRvci50b29sTWFuYWdlci5vblN3aXRjaFRvb2wobmFtZSA9PiB7XG4gIGNvbnNvbGUubG9nKCdzd2l0Y2hlZCB0b29sOicsIG5hbWUpXG4gIGFjdGl2ZUJ0bihuYW1lKVxufSlcblxudG9vbE1hbmFnZXIuc2V0Q3VycmVudFRvb2woJ2FkZFJlY3QnKVxudG9vbE1hbmFnZXIuYmluZFRvb2xFdmVudCgpXG4vLyB6b29tXG5lZGl0b3Iuc2V0Wm9vbU1hbmFnZXIobmV3IFpvb21NYW5hZ2VyKCkpXG5cbmVkaXRvci5tb3VudCgnI2VkaXRvci1hcmVhJylcblxuXG4vKiogXG4gKiBiaW5kIGV2ZW50IGluIGJ1dHRvblxuICovIFxuLy8gdW5kb1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi11bmRvJykub25jbGljayA9ICgpID0+IHtcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCd1bmRvJylcbn1cbi8vIHJlZG9cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tcmVkbycpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdyZWRvJylcbn1cbi8vIHpvb21JblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi16b29tLWluJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBlZGl0b3Iuem9vbU1hbmFnZXIuem9vbUluKClcbn1cbi8vIHpvb21PdXRcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tem9vbS1vdXQnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIGVkaXRvci56b29tTWFuYWdlci56b29tT3V0KClcbn1cbi8vIHNlbGVjdCBhZGRSZWN0IHRvb2xcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tYWRkLXJlY3QnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIGVkaXRvci5zZXRDdXJyZW50VG9vbCgnYWRkUmVjdCcpXG59XG4vLyBzZWxlY3QgZHJhZ2NhbnZhcyB0b29sXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLWRyYWctY2FudmFzJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBlZGl0b3Iuc2V0Q3VycmVudFRvb2woJ2RyYWdDYW52YXMnKVxufVxuLy8gc2VsZWN0IHRvb2xcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tc2VsZWN0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBlZGl0b3Iuc2V0Q3VycmVudFRvb2woJ3NlbGVjdCcpXG59XG5cblxuLy8gZmlsbCB2YWx1ZSBjb250cm9sXG5jb25zdCBmaWxsVGV4dE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWxlbWVudC1pbmZvLWZpbGwnKVxuZmlsbFRleHROb2RlLmlubmVySFRNTCA9IGVkaXRvci5zZXR0aW5nLmdldCgnZmlsbCcpXG5lZGl0b3Iuc2V0dGluZy5iaW5kRXZlbnQoJ2ZpbGwnLCB2YWwgPT4ge1xuICBmaWxsVGV4dE5vZGUuaW5uZXJIVE1MID0gdmFsXG59KVxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NldC1maWxsLWJ0bicpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgZmlsbCA9IHdpbmRvdy5wcm9tcHQoJ1BsZWFzZSBpbnB1dCB2YWxpZCBjb2xvciB2YWx1Ze+8iGxpa2UgI2ZmY2U0M++8iScsIGVkaXRvci5zZXR0aW5nLmdldCgnZmlsbCcpKVxuICBpZiAoIWZpbGwpIHJldHVyblxuICBmaWxsVGV4dE5vZGUuaW5uZXJIVE1MID0gZmlsbFxuXG4gIGVkaXRvci5zZXR0aW5nLnNldEZpbGwoZmlsbClcbiAgZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVsc0F0dHIoJ2ZpbGwnLCBmaWxsKVxufVxuXG4vLyBzdHJva2UgdmFsdWUgY29udHJvbFxuY29uc3Qgc3Ryb2tlVGV4dE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWxlbWVudC1pbmZvLXN0cm9rZScpXG5zdHJva2VUZXh0Tm9kZS5pbm5lckhUTUwgPSBlZGl0b3Iuc2V0dGluZy5nZXQoJ3N0cm9rZScpXG5lZGl0b3Iuc2V0dGluZy5iaW5kRXZlbnQoJ3N0cm9rZScsIHZhbCA9PiB7XG4gIHN0cm9rZVRleHROb2RlLmlubmVySFRNTCA9IHZhbFxufSlcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZXQtc3Ryb2tlLWJ0bicpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgc3Ryb2tlID0gd2luZG93LnByb21wdCgnUGxlYXNlIGlucHV0IHZhbGlkIGNvbG9yIHZhbHVl77yIbGlrZSAjZmZjZTQz77yJJywgZWRpdG9yLnNldHRpbmcuZ2V0KCdzdHJva2UnKSlcbiAgaWYgKCFzdHJva2UpIHJldHVyblxuICBzdHJva2VUZXh0Tm9kZS5pbm5lckhUTUwgPSBzdHJva2VcblxuICBlZGl0b3Iuc2V0dGluZy5zZXRTdHJva2Uoc3Ryb2tlKVxuICBlZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzQXR0cignc3Ryb2tlJywgc3Ryb2tlKVxufVxuLy8gcmVnaXN0ZXIgc2hvcnRjdXRcbmVkaXRvci5zaG9ydGN1dC5yZWdpc3RlcignVW5kbycsICdDbWQrWicsICgpID0+IHtcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCd1bmRvJylcbn0pXG5lZGl0b3Iuc2hvcnRjdXQucmVnaXN0ZXIoJ1JlZG8nLCAnQ21kK1NoaWZ0K1onLCAoKSA9PiB7XG4gIGVkaXRvci5leGVjdXRlQ29tbWFuZCgncmVkbycpXG59KVxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Nob3J0Y3V0JykuaW5uZXJIVE1MID0gZWRpdG9yLnNob3J0Y3V0LmZvcm1hdFByaW50KClcblxuLyoqXG4gKiDnkIbmg7MgYXBpIOS9v+eUqOS+i+WtkFxuICogXG4gKiBjb25zdCBlZGl0b3JCdWlsZGVyID0gbmV3IEVkaXRvci5idWlsZGVyKClcbiAqIGVkaXRvckJ1aWxkZXJcbiAqICAgLnNldENhbnZhc1NpemUoNDAwLCAzMDApXG4gKiAgIC5zZXRTdGFnZVNpemUoMTAwMCwgODAwKVxuICogICAuc2V0Vmlld3BvcnRTaXplKDgwMCwgNTAwKVxuICogICAuc2V0Wm9vbSgxMDApXG4gKiBcbiAqIGNvbnN0IGVkaXRvciA9IGVkaXRvckJ1aWxkZXIuYnVpbGQoKVxuICogZWRpdG9yLnJlZ2lzdGVyVG9vbCh0b29sTW92ZSlcbiAqIFxuICovIiwiLyoqXG4gKiBDb21tYW5kTWFuYWdlciBDbGFzc1xuICogXG4gKiBcbiAqIENvbW1hbmRNYW5hZ2VyLnVuZG8oKVxuICogQ29tbWFuZE1hbmFnZXIucmVkbygpXG4gKi9cblxuaW1wb3J0IHsgQWRkUmVjdENvbW1hbmQsIERNb3ZlIH0gZnJvbSBcIi4vY29tbWFuZHNcIlxuXG5jbGFzcyBDb21tYW5kTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKGVkaXRvcikge1xuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gICAgdGhpcy5yZWRvU3RhY2sgPSBbXVxuICAgIHRoaXMudW5kb1N0YWNrID0gW11cbiAgICB0aGlzLmNvbW1hbmRDbGFzc2VzID0ge31cblxuICAgIHRoaXMucmVzaWd0ZXJDb21tYW5kQ2xhc3MoQWRkUmVjdENvbW1hbmQpXG4gICAgdGhpcy5yZXNpZ3RlckNvbW1hbmRDbGFzcyhETW92ZSlcbiAgfVxuICBzZXRFZGl0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgfVxuICBleGVjdXRlKG5hbWUsIC4uLmFyZ3MpIHtcbiAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgY29uc3QgQ29tbWFuZENsYXNzID0gdGhpcy5jb21tYW5kQ2xhc3Nlc1tuYW1lXVxuXG4gICAgY29uc3QgY29tbWFuZCA9IG5ldyBDb21tYW5kQ2xhc3ModGhpcy5lZGl0b3IsIC4uLmFyZ3MpIC8vIOWIm+W7uiBjb21tYW5kIOWunuS+i1xuXG4gICAgdGhpcy51bmRvU3RhY2sucHVzaChjb21tYW5kKVxuICAgIHRoaXMucmVkb1N0YWNrID0gW11cbiAgfVxuICB1bmRvKCkge1xuICAgIGlmICh0aGlzLnVuZG9TdGFjay5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKCd1bmRvIHN0YWNrIGlzIGVtcHR5LCBjYW4gbm90IHVuZG8nKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IGNvbW1hbmQgPSB0aGlzLnVuZG9TdGFjay5wb3AoKVxuICAgIHRoaXMucmVkb1N0YWNrLnB1c2goY29tbWFuZClcbiAgICBjb21tYW5kLnVuZG8oKVxuICAgIGNvbW1hbmQuYWZ0ZXJVbmRvKClcbiAgfVxuICByZWRvKCkge1xuICAgIGlmICh0aGlzLnJlZG9TdGFjay5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKCdyZWRvIHN0YWNrIGlzIGVtcHR5LCBjYW4gbm90IHJlZG8nKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IGNvbW1hbmQgPSB0aGlzLnJlZG9TdGFjay5wb3AoKVxuICAgIHRoaXMudW5kb1N0YWNrLnB1c2goY29tbWFuZClcbiAgICBjb21tYW5kLnJlZG8oKVxuICAgIGNvbW1hbmQuYWZ0ZXJSZWRvKClcbiAgfVxuICAvLyDms6jlhozlkb3ku6TnsbvliLDlkb3ku6TnrqHnkIblr7nosaHkuK3jgIJcbiAgcmVzaWd0ZXJDb21tYW5kQ2xhc3MoY29tbWFuZENsYXNzKSB7XG4gICAgbmFtZSA9IGNvbW1hbmRDbGFzcy5uYW1lKCkudG9Mb3dlckNhc2UoKVxuICAgIHRoaXMuY29tbWFuZENsYXNzZXNbbmFtZV0gPSBjb21tYW5kQ2xhc3NcbiAgfVxuICBhZnRlclVuZG8oKSB7XG5cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb21tYW5kTWFuYWdlciIsImltcG9ydCB7IE5TIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiXG5pbXBvcnQgeyBGU1ZHIH0gZnJvbSBcIi4uL2VsZW1lbnRcIlxuXG5jbGFzcyBCYXNlQ29tbWFuZCB7XG4gIHVuZG8oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwbGVhc2Ugb3ZlcnJpZGUgdW5kbyBtZXRob2QnKVxuICB9XG4gIHJlZG8oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwbGVhc2Ugb3ZlcnJpZGUgcmVkbyBtZXRob2QnKVxuICB9XG4gIGFmdGVyUmVkbygpIHt9XG4gIGFmdGVyVW5kbygpIHt9XG59XG5cbi8qKlxuICogYWRkUmVjdFxuICogXG4gKiBhZGQgcmVjdCBzdmcgZWxlbWVudFxuICovXG5leHBvcnQgY2xhc3MgQWRkUmVjdENvbW1hbmQgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgeCwgeSwgdywgaCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICAgIC8vIFRPRE86IOS9v+eUqOe8lui+keWZqOS9v+eUqOeahOminOiJsuetieagt+W8j1xuICAgIGNvbnN0IHJlY3QgPSBuZXcgRlNWRy5SZWN0KHgsIHksIHcsIGgpXG5cbiAgICBjb25zdCBmaWxsID0gZWRpdG9yLnNldHRpbmcuZ2V0KCdmaWxsJylcbiAgICBjb25zdCBzdHJva2UgPSBlZGl0b3Iuc2V0dGluZy5nZXQoJ3N0cm9rZScpXG4gICAgY29uc3Qgc3Ryb2tlV2lkdGggPSBlZGl0b3Iuc2V0dGluZy5nZXQoJ3N0cm9rZVdpZHRoJylcbiAgICByZWN0LnNldEF0dHIoJ2ZpbGwnLCBmaWxsKVxuICAgIHJlY3Quc2V0QXR0cignc3Ryb2tlJywgc3Ryb2tlKVxuICAgIHJlY3Quc2V0QXR0cignc3Ryb2tlLXdpZHRoJywgc3Ryb2tlV2lkdGgpXG5cbiAgICBlZGl0b3IuZ2V0Q3VycmVudExheWVyKCkuYXBwZW5kQ2hpbGQocmVjdC5lbCgpKVxuXG4gICAgdGhpcy5uZXh0U2libGluZyA9IHJlY3QuZWwoKS5uZXh0RWxlbWVudFNpYmxpbmcgXG4gICAgdGhpcy5wYXJlbnQgPSByZWN0LmVsKCkucGFyZW50RWxlbWVudFxuICAgIHRoaXMucmVjdCA9IHJlY3RcbiAgfVxuICBzdGF0aWMgbmFtZSgpIHtcbiAgICByZXR1cm4gJ2FkZFJlY3QnXG4gIH1cbiAgcmVkbygpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMucmVjdC5lbCgpXG4gICAgaWYgKHRoaXMubmV4dFNpYmxpbmcpIHtcbiAgICAgIHRoaXMucGFyZW50Lmluc2VydEJlZm9yZShlbCwgdGhpcy5uZXh0U2libGluZylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQoZWwpXG4gICAgfVxuICB9XG4gIHVuZG8oKSB7XG4gICAgdGhpcy5yZWN0LmVsKCkucmVtb3ZlKClcbiAgfVxuICBhZnRlclVuZG8oKSB7XG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuY2xlYXIoKVxuICB9XG4gIGFmdGVyUmVkbygpIHtcbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHModGhpcy5yZWN0KVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBETW92ZSBleHRlbmRzIEJhc2VDb21tYW5kIHtcbiAgY29uc3RydWN0b3IoZWRpdG9yLCBlbHMsIGR4LCBkeSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICAgIHRoaXMuZHggPSBkeFxuICAgIHRoaXMuZHkgPSBkeVxuICAgIHRoaXMuZWxzID0gZWxzXG5cbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLmRtb3ZlKHRoaXMuZHgsIHRoaXMuZHkpXG4gICAgfSlcbiAgfVxuICBzdGF0aWMgbmFtZSgpIHtcbiAgICByZXR1cm4gJ2Rtb3ZlJ1xuICB9XG4gIHJlZG8oKSB7XG4gICAgdGhpcy5lbHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5kbW92ZSh0aGlzLmR4LCB0aGlzLmR5KVxuICAgIH0pXG4gIH1cbiAgdW5kbygpIHtcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLmRtb3ZlKC10aGlzLmR4LCAtdGhpcy5keSlcbiAgICB9KVxuICB9XG4gIGFmdGVyUmVkbygpIHtcbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHModGhpcy5lbHMpXG4gIH1cbiAgYWZ0ZXJVbmRvKCkge1xuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVscyh0aGlzLmVscylcbiAgfVxufSIsIi8vIOW4uOmHj1xuXG5jb25zdCBOUyA9IHtcbiAgSFRNTDogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLFxuICBNQVRIOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCcsXG4gIFNFOiAnaHR0cDovL3N2Zy1lZGl0Lmdvb2dsZWNvZGUuY29tJyxcbiAgU1ZHOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICBYTElOSzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLFxuICBYTUw6ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnLFxuICBYTUxOUzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvJyAvLyBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvUkVDLXhtbC1uYW1lcy8jeG1sUmVzZXJ2ZWRcbn07XG5cbmV4cG9ydCB7XG4gIE5TLFxufSBcblxuXG5cbiIsImltcG9ydCB7IEFjdGl2ZWRFbHNNYW5hZ2VyIH0gZnJvbSBcIi4vYWN0aXZlZEVsc01hbmFnZXJcIlxuaW1wb3J0IHsgRWRpdG9yRXZlbnRDb250ZXh0IH0gZnJvbSBcIi4vZWRpdG9yRXZlbnRDb250ZXh0XCJcbmltcG9ydCB7IEh1ZE1hbmFnZXIgfSBmcm9tIFwiLi9sYXllci9odWRNYW5hZ2VyXCJcbmltcG9ydCB7IFNob3J0Y3V0IH0gZnJvbSBcIi4vc2hvcnRjdXRcIlxuXG5jbGFzcyBFZGl0b3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNldHRpbmcgPSBudWxsXG4gICAgdGhpcy5jb21tYW5kTWFuYWdlciA9IG51bGxcbiAgICB0aGlzLnpvb21NYW5hZ2VyID0gbnVsbFxuICAgIHRoaXMuYWN0aXZlZEVsc01hbmFnZXIgPSBuZXcgQWN0aXZlZEVsc01hbmFnZXIodGhpcylcbiAgICB0aGlzLnNob3J0Y3V0ID0gbmV3IFNob3J0Y3V0KHRoaXMpXG5cbiAgICAvLyBjb25zdCBjb250ZW50V2lkdGggPSA0MDBcbiAgICAvLyBjb25zdCBjb250ZW50SGVpZ2h0ID0gMzAwXG4gICAgLy8gY29uc3Qgc3RhZ2VXaWR0aCA9IDEwMDAgLy8g5q2j5Zyo57qg57uT5ZG95ZCNXG4gICAgLy8gY29uc3Qgc3RhZ2VIZWlnaHQgPSA2MDBcbiAgICBjb25zdCB2aWV3cG9ydFdpZHRoID0gODAwXG4gICAgY29uc3Qgdmlld3BvcnRIZWlnaHQgPSA1NTBcblxuICAgIGNvbnN0IHZpZXdwb3J0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB2aWV3cG9ydC5pZCA9ICd2aWV3cG9ydCdcbiAgICB2aWV3cG9ydC5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkICMwMDAnXG4gICAgdmlld3BvcnQuc3R5bGUud2lkdGggPSB2aWV3cG9ydFdpZHRoICsgJ3B4J1xuICAgIHZpZXdwb3J0LnN0eWxlLmhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0ICsgJ3B4J1xuICAgIHRoaXMudmlld3BvcnQgPSB2aWV3cG9ydFxuICAgIFxuICAgIGNvbnN0IHN2Z0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgc3ZnQ29udGFpbmVyLmlkID0gJ3N2Zy1jb250YWluZXInXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZGRkJ1xuICAgIHN2Z0NvbnRhaW5lci5zdHlsZS53aWR0aCA9IHZpZXdwb3J0V2lkdGggKyAncHgnXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0ICsgJ3B4J1xuICAgIHN2Z0NvbnRhaW5lci5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnXG4gICAgdGhpcy5zdmdDb250YWluZXIgPSBzdmdDb250YWluZXJcblxuICAgIGNvbnN0IHN2Z1Jvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpXG4gICAgc3ZnUm9vdC5pZCA9ICdzdmctcm9vdCdcbiAgICBzdmdSb290LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAxMDAwKVxuICAgIHN2Z1Jvb3Quc2V0QXR0cmlidXRlKCdoZWlnaHQnLCA2MDApXG4gICAgc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDEwMDAgNjAwJylcbiAgICB0aGlzLnN2Z1Jvb3QgPSBzdmdSb290XG5cbiAgICBjb25zdCBzdmdTdGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJylcbiAgICBzdmdTdGFnZS5pZCA9ICdzdmctc3RhZ2UnXG4gICAgc3ZnU3RhZ2Uuc2V0QXR0cmlidXRlKCd3aWR0aCcsIDQwMClcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDMwMClcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ3gnLCAzMDApXG4gICAgc3ZnU3RhZ2Uuc2V0QXR0cmlidXRlKCd5JywgMTUwKVxuICAgIHN2Z1N0YWdlLnN0eWxlLm92ZXJmbG93ID0gJ3Zpc2libGUnXG4gICAgdGhpcy5zdmdTdGFnZSA9IHN2Z1N0YWdlXG5cbiAgICBjb25zdCBzdmdCZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnZycpXG4gICAgc3ZnQmcuaWQgPSAnYmFja2dyb3VuZCdcbiAgICAvLyBzdmdCZy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgNDAwKVxuICAgIC8vIHN2Z0JnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgMzAwKVxuICAgIHN2Z0JnLnNldEF0dHJpYnV0ZSgneCcsIDApXG4gICAgc3ZnQmcuc2V0QXR0cmlidXRlKCd5JywgMClcblxuICAgIGNvbnN0IGJnUmVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAncmVjdCcpXG4gICAgYmdSZWN0LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMTAwJScpXG4gICAgYmdSZWN0LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzEwMCUnKVxuICAgIGJnUmVjdC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnI2ZmZicpXG5cbiAgICBjb25zdCBzdmdDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJylcbiAgICBzdmdDb250ZW50LmlkID0gJ2NvbnRlbnQnXG4gICAgLy8gc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgNDAwKVxuICAgIC8vIHN2Z0NvbnRlbnQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAzMDApXG4gICAgc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3gnLCAwKVxuICAgIHN2Z0NvbnRlbnQuc2V0QXR0cmlidXRlKCd5JywgMClcbiAgICB0aGlzLnN2Z0NvbnRlbnQgPSBzdmdDb250ZW50XG5cbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnZycpXG4gICAgbGF5ZXIuaWQgPSAnbGF5ZXItMSdcbiAgICB0aGlzLmN1cnJlbnRMYXllciA9IGxheWVyXG5cbiAgICB2aWV3cG9ydC5hcHBlbmRDaGlsZChzdmdDb250YWluZXIpXG4gICAgc3ZnQ29udGFpbmVyLmFwcGVuZENoaWxkKHN2Z1Jvb3QpXG4gICAgc3ZnUm9vdC5hcHBlbmRDaGlsZChzdmdTdGFnZSlcblxuICAgIHN2Z1N0YWdlLmFwcGVuZENoaWxkKHN2Z0JnKVxuICAgIHN2Z0JnLmFwcGVuZENoaWxkKGJnUmVjdClcbiAgICBzdmdTdGFnZS5hcHBlbmRDaGlsZChzdmdDb250ZW50KVxuICAgIHN2Z0NvbnRlbnQuYXBwZW5kQ2hpbGQobGF5ZXIpXG5cblxuICAgIHRoaXMuaHVkTWFuYWdlciA9IG5ldyBIdWRNYW5hZ2VyKClcbiAgICB0aGlzLmh1ZE1hbmFnZXIubW91bnQoc3ZnU3RhZ2UpXG5cbiAgICAvLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZXdwb3J0KVxuICB9XG4gIG1vdW50KHNlbGVjdG9yKSB7XG4gICAgY29uc3QgbW91bnROb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICBtb3VudE5vZGUuYXBwZW5kQ2hpbGQodGhpcy52aWV3cG9ydClcbiAgfVxuICBnZXRDdXJyZW50TGF5ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudExheWVyXG4gIH1cblxuICBzZXRUb29sTWFuYWdlcih0b29sTWFuYWdlcikge1xuICAgIHRoaXMudG9vbE1hbmFnZXIgPSB0b29sTWFuYWdlclxuICB9XG4gIC8vIHRvb2wgcmVsYXRpdmVkIG1ldGhvZHNcbiAgc2V0Q3VycmVudFRvb2wobmFtZSkge1xuICAgIHRoaXMudG9vbE1hbmFnZXIuc2V0Q3VycmVudFRvb2wobmFtZSlcbiAgfVxuICByZWdpc3RlclRvb2wodG9vbCkge1xuICAgIHRoaXMudG9vbE1hbmFnZXIucmVnaXN0ZXJUb29sKHRvb2wpXG4gIH1cbiAgc2V0U2V0dGluZyhzZXR0aW5nKSB7XG4gICAgdGhpcy5zZXR0aW5nID0gc2V0dGluZ1xuICB9XG5cbiAgLy8g5ZG95Luk55u45YWzXG4gIHNldENvbW1hbmRNYW5hZ2VyKGNvbW1hbmRNYW5hZ2VyKSB7XG4gICAgdGhpcy5jb21tYW5kTWFuYWdlciA9IGNvbW1hbmRNYW5hZ2VyXG4gIH1cbiAgZXhlY3V0ZUNvbW1hbmQobmFtZSwgLi4ucGFyYW1zKSB7XG4gICAgaWYgKG5hbWUgPT0gJ3VuZG8nKSB7XG4gICAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyLnVuZG8oKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChuYW1lID09ICdyZWRvJykge1xuICAgICAgdGhpcy5jb21tYW5kTWFuYWdlci5yZWRvKClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyLmV4ZWN1dGUobmFtZSwgLi4ucGFyYW1zKVxuICB9XG5cbiAgLy8gem9vbVxuICBzZXRab29tTWFuYWdlcih6b29tTWFuYWdlcikge1xuICAgIHpvb21NYW5hZ2VyLnNldEVkaXRvcih0aGlzKVxuICAgIHRoaXMuem9vbU1hbmFnZXIgPSB6b29tTWFuYWdlclxuICB9XG4gIGdldFpvb20oKSB7IC8vIOWwgeijhVxuICAgIHJldHVybiB0aGlzLnpvb21NYW5hZ2VyLmdldFpvb20oKVxuICB9XG5cbiAgZ2V0U2Nyb2xsKCkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxMZWZ0LFxuICAgICAgeTogdGhpcy5zdmdDb250YWluZXIuc2Nyb2xsVG9wLFxuICAgIH1cbiAgfVxuICBzZXRTY3JvbGwoeCwgeSkge1xuICAgIHRoaXMuc3ZnQ29udGFpbmVyLnNjcm9sbExlZnQgPSB4XG4gICAgdGhpcy5zdmdDb250YWluZXIuc2Nyb2xsVG9wID0geVxuICB9XG4gIGdldENvbnRlbnRPZmZzZXQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHRoaXMuc3ZnU3RhZ2UuZ2V0QXR0cmlidXRlKCd4JyksXG4gICAgICB5OiB0aGlzLnN2Z1N0YWdlLmdldEF0dHJpYnV0ZSgneScpLFxuICAgIH1cbiAgfVxuXG4gIGlzQ29udGVudEVsZW1lbnQoZWwpIHtcbiAgICB3aGlsZSAoZWwpIHtcbiAgICAgIGlmIChlbC5wYXJlbnRFbGVtZW50ID09IHRoaXMuc3ZnQ29udGVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgaWYgKGVsLnBhcmVudEVsZW1lbnQgPT0gdGhpcy5zdmdSb290KSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVkaXRvclxuIiwiXG4vKipcbiAqIGNvbnRleHQgY2xhc3NcbiAqIFxuICogdXNlZCBmb3IgdG9vbCBldmVudFxuICovXG5cbmV4cG9ydCBjbGFzcyBFZGl0b3JFdmVudENvbnRleHQge1xuICBjb25zdHJ1Y3RvcihlZGl0b3IsIGUpIHtcbiAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IGZhbHNlXG4gICAgdGhpcy5vcmlnaW5FdmVudCA9IGVcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICAgIHRoaXMuaXNFbmRJbnNpZGUgPSBmYWxzZVxuXG4gICAgdGhpcy5zdGFydFggPSAwXG4gICAgdGhpcy5zdGFydFkgPSAwXG5cbiAgICB0aGlzLm9mZnNldFggPSAwXG4gICAgdGhpcy5vZmZzZXRZID0gMFxuXG4gICAgdGhpcy5zdGFydENsaWVudFggPSAwIC8vIHVzZWQgdG8gY2FsYyBkeCBhbmQgZHkuXG4gICAgdGhpcy5zdGFydENsaWVudFkgPSAwXG4gICAgdGhpcy5keCA9IDBcbiAgICB0aGlzLmR5ID0gMFxuXG4gICAgdGhpcy5zZXRTdGFydFBvcygpXG4gIH1cbiAgc2V0T3JpZ2luRXZlbnQoZSkge1xuICAgIHRoaXMub3JpZ2luRXZlbnQgPSBlXG4gIH1cbiAgc2V0U3RhcnRQb3MoKSB7XG4gICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLmdldFBvcygpXG5cbiAgICB0aGlzLnN0YXJ0WCA9IHhcbiAgICB0aGlzLnN0YXJ0WSA9IHlcblxuICAgIHRoaXMuc3RhcnRDbGllbnRYID0gdGhpcy5vcmlnaW5FdmVudC5jbGllbnRYXG4gICAgdGhpcy5zdGFydENsaWVudFkgPSB0aGlzLm9yaWdpbkV2ZW50LmNsaWVudFlcbiAgfVxuICByZWxlYXNlTW91c2UoKSB7XG4gICAgdGhpcy5tb3VzZVByZXNzZWQgPSBmYWxzZVxuICB9XG4gIHByZXNzTW91c2UoKSB7XG4gICAgdGhpcy5tb3VzZVByZXNzZWQgPSB0cnVlXG4gIH1cbiAgZ2V0UG9zKCkge1xuICAgIGNvbnN0IHpvb20gPSB0aGlzLmVkaXRvci5nZXRab29tKClcbiAgICBjb25zdCB7eCwgeX0gPSB0aGlzLmVkaXRvci5nZXRDb250ZW50T2Zmc2V0KClcbiAgICByZXR1cm4geyBcbiAgICAgIHg6IHRoaXMub3JpZ2luRXZlbnQub2Zmc2V0WCAvIHpvb20gLSB4LCBcbiAgICAgIHk6IHRoaXMub3JpZ2luRXZlbnQub2Zmc2V0WSAvIHpvb20gLSB5LFxuICAgIH1cbiAgfVxuICBnZXRTdGFydFBvcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogdGhpcy5zdGFydFgsXG4gICAgICB5OiB0aGlzLnN0YXJ0WSxcbiAgICB9XG4gIH1cbiAgLy8gd2l0aG91dCBjYWxjIHdpdGggem9vbSB2YWx1ZVxuICBnZXREaWZmUG9zKCkge1xuICAgIGNvbnN0IHggPSB0aGlzLm9yaWdpbkV2ZW50LmNsaWVudFggLSB0aGlzLnN0YXJ0Q2xpZW50WFxuICAgIGNvbnN0IHkgPSB0aGlzLm9yaWdpbkV2ZW50LmNsaWVudFkgLSB0aGlzLnN0YXJ0Q2xpZW50WVxuICAgIHJldHVybiB7IHgsIHkgfVxuICB9XG5cbn0iLCJcbi8qKlxuICog5a+5IFNWRyDlhYPntKDnmoTnroDljZXlsIHoo4VcbiAqL1xuXG5leHBvcnQgY2xhc3MgRkVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmVsXyA9IG51bGxcbiAgfVxuICBlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbF9cbiAgfVxuICBzZXRBdHRyKHByb3AsIHZhbCkge1xuICAgIHJldHVybiB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUocHJvcCwgdmFsKVxuICB9XG4gIGdldEF0dHIocHJvcCkge1xuICAgIHJldHVybiB0aGlzLmVsXy5nZXRBdHRyaWJ1dGUocHJvcClcbiAgfVxuICBnZXRCQm94KCkge1xuICAgIHJldHVybiB0aGlzLmVsXy5nZXRCQm94KClcbiAgfVxufSIsImltcG9ydCB7IFJlY3QgfSBmcm9tIFwiLi9yZWN0XCJcblxuXG4vKipcbiAqIEZTVkdcbiAqIFxuICogc2ltcGxlIFNWR0VsZW1lbnQgZW5jYXBzdWxhdGlvblxuICovXG5leHBvcnQgY29uc3QgRlNWRyA9IHtcbiAgUmVjdCxcbn0iLCJcbi8qKlxuICog5a+5IHJlY3Qg5YWD57Sg55qE566A5Y2V5bCB6KOFXG4gKi9cblxuaW1wb3J0IHsgTlMgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCJcbmltcG9ydCB7IEZFbGVtZW50IH0gZnJvbSBcIi4vYmFzZUVsZW1lbnRcIlxuXG5leHBvcnQgY2xhc3MgUmVjdCBleHRlbmRzIEZFbGVtZW50IHtcbiAgLy8gY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyKTtcbiAgLy8gY29uc3RydWN0b3IoZWw6IFNWR0VsZW1lbnQpO1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB3LCBoKSB7XG4gICAgc3VwZXIoKVxuICAgIGlmICh0eXBlb2YgeCA9PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5lbF8gPSB4XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxfID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ3JlY3QnKVxuICAgICAgdGhpcy5zZXRBdHRyKCd4JywgeClcbiAgICAgIHRoaXMuc2V0QXR0cigneScsIHkpXG4gICAgICB0aGlzLnNldEF0dHIoJ3dpZHRoJywgdylcbiAgICAgIHRoaXMuc2V0QXR0cignaGVpZ2h0JywgaClcbiAgICB9XG4gIH1cbiAgZ2V0UG9zKCkge1xuICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cigneCcpKVxuICAgIGNvbnN0IHkgPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cigneScpKVxuICAgIHJldHVybiB7IHgsIHkgfVxuICB9XG4gIGRtb3ZlKGR4LCBkeSkge1xuICAgIGNvbnN0IHBvcyA9IHRoaXMuZ2V0UG9zKClcbiAgICB0aGlzLnNldEF0dHIoJ3gnLCBwb3MueCArIGR4KVxuICAgIHRoaXMuc2V0QXR0cigneScsIHBvcy55ICsgZHkpXG4gIH1cbn0iLCIvKipcbiAqIGd1aWRlIGxpbmUgbGF5ZXJcbiAqL1xuXG5pbXBvcnQgeyBPdXRsaW5lSHVkIH0gZnJvbSBcIi4vb3V0bGluZUh1ZFwiO1xuaW1wb3J0IHsgU2VsZWN0QXJlYSB9IGZyb20gXCIuL3NlbGVjdEFyZWFcIjtcbmNvbnN0IHsgTlMgfSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XG5cbmV4cG9ydCBjbGFzcyBIdWRNYW5hZ2Vye1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdnJylcbiAgICB0aGlzLmNvbnRhaW5lci5pZCA9ICdodWRzJ1xuXG4gICAgdGhpcy5zZWxlY3RBcmVhID0gbmV3IFNlbGVjdEFyZWEodGhpcy5jb250YWluZXIpXG4gICAgdGhpcy5vdXRsaW5lSHVkID0gbmV3IE91dGxpbmVIdWQodGhpcy5jb250YWluZXIpXG4gIH1cbiAgbW91bnQoZWwpIHtcbiAgICBlbC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcilcbiAgfVxufVxuXG4iLCJcblxuICBcbmNvbnN0IHsgTlMgfSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XG5cbi8qKlxuICogPHJlY3Q+IG91dGxpbmVcbiAqL1xuZXhwb3J0IGNsYXNzIE91dGxpbmVIdWQge1xuICBjb25zdHJ1Y3RvcihwYXJlbnQpIHtcbiAgICB0aGlzLnggPSAwXG4gICAgdGhpcy55ID0gMFxuICAgIHRoaXMudyA9IDBcbiAgICB0aGlzLmggPSAwXG5cbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdnJylcbiAgICB0aGlzLmNvbnRhaW5lci5pZCA9ICdvdXRsaW5lLWh1ZCdcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpXG5cbiAgICB0aGlzLm91dGxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAncGF0aCcpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJylcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAnI2YwNCcpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgndmVjdG9yLWVmZmVjdCcsICdub24tc2NhbGluZy1zdHJva2UnKVxuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5vdXRsaW5lKVxuICB9XG4gIGNsZWFyKCkge1xuICAgIC8vIHBhcmVudC5pbm5lckhUTUwgPSAnJ1xuICAgIHRoaXMub3V0bGluZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIH1cbiAgZHJhd1JlY3QoeCwgeSwgdywgaCkge1xuICAgIHRoaXMueCA9IHhcbiAgICB0aGlzLnkgPSB5XG4gICAgdGhpcy53ID0gd1xuICAgIHRoaXMuaCA9IGhcblxuICAgIC8vIHdoeSBkb24ndCBJIHVzZSByZWN0LCBqdXN0IHNvbHZlIHRoZSBjb25kaXRpb24gd2hlbiB3aWR0aCBvciBoZWlnaHQgaXMgMCB0aGUgb3V0bGluZSBpcyBkaXNhcHBlclxuICAgIGNvbnN0IGQgPSBgTSAke3h9ICR7eX0gTCAke3grd30gJHt5fSBMICR7eCt3fSAke3kraH0gTCAke3h9ICR7eStofSBaYFxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2QnLCBkKVxuICAgIHRoaXMub3V0bGluZS5zdHlsZS5kaXNwbGF5ID0gJydcbiAgfVxuICBnZXRXaWR0aCgpIHsgcmV0dXJuIHRoaXMudyB9XG4gIGdldEhlaWdodCgpIHsgcmV0dXJuIHRoaXMuaCB9XG4gIGdldFgoKSB7IHJldHVybiB0aGlzLnggfVxuICBnZXRZKCkgeyByZXR1cm4gdGhpcy55IH1cbn0iLCJcbmNvbnN0IHsgTlMgfSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XG5cbi8qKlxuICogc2VsZWN0IGFyZWFcbiAqL1xuZXhwb3J0IGNsYXNzIFNlbGVjdEFyZWEge1xuICBjb25zdHJ1Y3RvcihwYXJlbnQpIHtcbiAgICB0aGlzLnggPSAwXG4gICAgdGhpcy55ID0gMFxuICAgIHRoaXMudyA9IDBcbiAgICB0aGlzLmggPSAwXG5cbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdnJylcbiAgICB0aGlzLmNvbnRhaW5lci5pZCA9ICdzZWxlY3QtYXJlYSdcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpXG5cbiAgICB0aGlzLm91dGxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAncGF0aCcpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJylcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAnIzA1NCcpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgndmVjdG9yLWVmZmVjdCcsICdub24tc2NhbGluZy1zdHJva2UnKVxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1kYXNoYXJyYXknLCAnNHB4JylcblxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMub3V0bGluZSlcbiAgfVxuICBjbGVhcigpIHtcbiAgICAvLyBwYXJlbnQuaW5uZXJIVE1MID0gJydcbiAgICB0aGlzLm91dGxpbmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICB9XG4gIGRyYXdSZWN0KHgsIHksIHcsIGgpIHtcbiAgICB0aGlzLnggPSB4XG4gICAgdGhpcy55ID0geVxuICAgIHRoaXMudyA9IHdcbiAgICB0aGlzLmggPSBoXG5cbiAgICAvLyB3aHkgZG9uJ3QgSSB1c2UgcmVjdCwganVzdCBzb2x2ZSB0aGUgY29uZGl0aW9uIHdoZW4gd2lkdGggb3IgaGVpZ2h0IGlzIDAgdGhlIG91dGxpbmUgaXMgZGlzYXBwZXJcbiAgICBjb25zdCBkID0gYE0gJHt4fSAke3l9IEwgJHt4K3d9ICR7eX0gTCAke3grd30gJHt5K2h9IEwgJHt4fSAke3kraH0gWmBcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdkJywgZClcblxuICAgIC8qIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3gnLCB4KVxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3knLCB5KVxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdylcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoKSAqL1xuICAgIHRoaXMub3V0bGluZS5zdHlsZS5kaXNwbGF5ID0gJydcbiAgfVxuICBnZXRXaWR0aCgpIHsgcmV0dXJuIHRoaXMudyB9XG4gIGdldEhlaWdodCgpIHsgcmV0dXJuIHRoaXMuaCB9XG4gIGdldFgoKSB7IHJldHVybiB0aGlzLnggfVxuICBnZXRZKCkgeyByZXR1cm4gdGhpcy55IH1cbn0iLCJcbmltcG9ydCB7IGdldEJveEJ5MnBvaW50cyB9IGZyb20gXCIuLi91dGlsL21hdGhcIlxuXG5jbGFzcyBBZGRSZWN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBudWxsXG4gIH1cbiAgbmFtZSgpIHtcbiAgICByZXR1cm4gJ2FkZFJlY3QnXG4gIH1cbiAgc2V0RWRpdG9yKGVkaXRvcikgeyAvLyDkvp3otZbms6jlhaVcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICB9XG4gIHN0YXJ0KGN0eCkge31cbiAgbW92ZShjdHgpIHtcbiAgICBjb25zdCB7IHg6IGVuZFgsIHk6IGVuZFkgfSA9IGN0eC5nZXRQb3MoKVxuICAgIGNvbnN0IHsgeDogc3RhcnRYLCB5OiBzdGFydFkgfSA9IGN0eC5nZXRTdGFydFBvcygpXG4gICAgY29uc3QgeyB4LCB5LCB3LCBoIH0gPSBnZXRCb3hCeTJwb2ludHMoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpXG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lSHVkLmRyYXdSZWN0KHgsIHksIHcsIGgpXG4gIH1cbiAgZW5kKGN0eCkge1xuICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIub3V0bGluZUh1ZC5jbGVhcigpXG5cbiAgICBjb25zdCB7IHg6IGVuZFgsIHk6IGVuZFkgfSA9IGN0eC5nZXRQb3MoKVxuICAgIGNvbnN0IHsgeDogc3RhcnRYLCB5OiBzdGFydFkgfSA9IGN0eC5nZXRTdGFydFBvcygpXG4gICAgY29uc3QgeyB4LCB5LCB3LCBoIH0gPSBnZXRCb3hCeTJwb2ludHMoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpXG4gICAgaWYgKHcgPCAyICYmIGggPCAyKSB7XG4gICAgICAvLyBUT0RPOiBvcGVuIGEgZGlhbG9nIHRvIGlucHV0IHdpZHRoIGFuZCBoZWlnaHRcbiAgICAgIGNvbnNvbGUubG9nKCd3aWR0aCBhbmQgaGVpZ2h0IGJvdGggbGVzcyBlcXVhbCB0byAy77yMZHJhd2luZyBub3RoaW5nJylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmVkaXRvci5leGVjdXRlQ29tbWFuZCgnYWRkUmVjdCcsIHgsIHksIHcsIGgpXG4gIH1cbiAgLy8gbW91c2Vkb3duIG91dHNpZGUgdmlld3BvcnRcbiAgZW5kT3V0c2lkZSgpIHtcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuY2xlYXIoKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFkZFJlY3QiLCJcbmV4cG9ydCBjbGFzcyBEcmFnQ2FudmFzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdGFydE9mZnNldFggPSAwXG4gICAgdGhpcy5zdGFydE9mZnNldFkgPSAwXG4gIH1cbiAgbmFtZSgpIHtcbiAgICByZXR1cm4gJ2RyYWdDYW52YXMnXG4gIH1cbiAgc2V0RWRpdG9yKGVkaXRvcikgeyAvLyDkvp3otZbms6jlhaVcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICB9XG4gIGJlZm9yZUFjdGl2ZSgpIHtcbiAgICAvLyBkbyBzb21ldGhpbmcgYmVmb3JlIHN3aXRjaCB0byBjdXJyZW50IHRvb2xcbiAgfVxuICBzdGFydChjdHgpIHtcbiAgICBjb25zdCBzY3JvbGwgPSB0aGlzLmVkaXRvci5nZXRTY3JvbGwoKVxuICAgIHRoaXMuc3RhcnRPZmZzZXRYID0gc2Nyb2xsLnhcbiAgICB0aGlzLnN0YXJ0T2Zmc2V0WSA9IHNjcm9sbC55XG4gIH1cbiAgbW92ZShjdHgpIHtcbiAgICBjb25zdCB6b29tID0gdGhpcy5lZGl0b3IuZ2V0Wm9vbSgpXG4gICAgY29uc3QgeyB4OiBkeCwgeTogZHkgfSA9IGN0eC5nZXREaWZmUG9zKClcbiAgICB0aGlzLmVkaXRvci5zZXRTY3JvbGwodGhpcy5zdGFydE9mZnNldFggLSBkeCwgdGhpcy5zdGFydE9mZnNldFkgLSBkeSlcbiAgfVxuICBlbmQoKSB7fVxuICBlbmRPdXRzaWRlKCkge31cbn1cbiIsImltcG9ydCB7IEZTVkcgfSBmcm9tIFwiLi4vZWxlbWVudFwiXG5pbXBvcnQgeyBnZXRCb3hCeTJwb2ludHMgfSBmcm9tIFwiLi4vdXRpbC9tYXRoXCJcblxuLyoqXG4gKiBzZWxlY3RcbiAqIFxuICog5q2k5qih5Z2X6Z2e5bi45aSN5p2CXG4gKiBcbiAqIDEuIOm8oOagh+aMieS4i+aXtu+8jOmAieS4reWNleS4quWFg+e0oFxuICogMi4g6byg5qCH5oyJ5LiL5Li656m677yM5ouW5ou95pe25Lqn55Sf6YCJ5Lit5qGG77yM5Y+v5Lul6YCJ5oup5aSa5Liq5YWD57SgXG4gKiAzLiDpgInkuK3ljZXkuKrvvIjmiJbpgInljLrpgInkuK3lpJrkuKrvvIkg57yp5pS+IOetieaOp+WItueCue+8jOaLluaLveaUueWPmOWuvemrmFxuICogMy4g5YiH5pat5YiA6L+Z5Liq5bel5YW35pe277yM5r+A5rS755qE5YWD57Sg6L+b5YWl6KKr6YCJ5Lit54q25oCB77yI6L2u5buT57q/K+aOp+WItueCue+8ieOAglxuICogNC4g6YCJ5Yy65ZKM5YWD57Sg55u45Lqk55qE5Yik5a6aXG4gKiA1LiDmv4DmtLvlhYPntKDlpoLkvZXkv53lrZjvvIzkv53lrZjliLDlk6rph4xcbiAqL1xuZXhwb3J0IGNsYXNzIFNlbGVjdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZWRpdG9yID0gbnVsbFxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxuXG4gICAgdGhpcy5vdXRsaW5lU3RhcnRYID0gMFxuICAgIHRoaXMub3V0bGluZVN0YXJ0WSA9IDBcbiAgfVxuICBuYW1lKCkge1xuICAgIHJldHVybiAnc2VsZWN0J1xuICB9XG4gIHNldEVkaXRvcihlZGl0b3IpIHtcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICB9XG4gIGhhc1NlbGVjdGVkRWxzV2hlblN0YXJ0KCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRWxzLmxlbmd0aCA+IDBcbiAgfVxuICBzdGFydChjdHgpIHtcbiAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gY3R4Lm9yaWdpbkV2ZW50LnRhcmdldFxuICAgIGlmICghdGhpcy5lZGl0b3IuaXNDb250ZW50RWxlbWVudCh0YXJnZXRFbGVtZW50KSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0RkVsZW1lbnQgPSBuZXcgRlNWRy5SZWN0KHRhcmdldEVsZW1lbnQpIC8vIOaaguaXtuWPquaYryByZWN0IFRPRE86IOaUueS4uumAmueUqOWGmeazlVxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbIHRhcmdldEZFbGVtZW50IF0gLy8g6byg5qCH5oyJ5LiL5pe277yM5bCx6YCJ5Lit5LqG5LiA5Liq5YWD57SgXG4gICAgY29uc3QgeCA9IHBhcnNlRmxvYXQodGFyZ2V0RkVsZW1lbnQuZ2V0QXR0cigneCcpKVxuICAgIGNvbnN0IHkgPSBwYXJzZUZsb2F0KHRhcmdldEZFbGVtZW50LmdldEF0dHIoJ3knKSlcbiAgICBjb25zdCB3ID0gcGFyc2VGbG9hdCh0YXJnZXRGRWxlbWVudC5nZXRBdHRyKCd3aWR0aCcpKVxuICAgIGNvbnN0IGggPSBwYXJzZUZsb2F0KHRhcmdldEZFbGVtZW50LmdldEF0dHIoJ2hlaWdodCcpKVxuXG4gICAgdGhpcy5vdXRsaW5lU3RhcnRYID0geFxuICAgIHRoaXMub3V0bGluZVN0YXJ0WSA9IHlcblxuICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIub3V0bGluZUh1ZC5kcmF3UmVjdCh4LCB5LCB3LCBoKVxuICB9XG4gIG1vdmUoY3R4KSB7XG4gICAgaWYgKCF0aGlzLmhhc1NlbGVjdGVkRWxzV2hlblN0YXJ0KCkpIHsgLy8gZHJhdyBzZWxlY3RpbmcgYXJlYVxuICAgICAgLy8gc2VsZWN0IG5vIGVsZW1lbnQsIGRyYXcgc2VsZWN0IHJlY3RcbiAgICAgIGNvbnN0IHsgeDogZW5kWCwgeTogZW5kWSB9ID0gY3R4LmdldFBvcygpXG4gICAgICBjb25zdCB7IHg6IHN0YXJ0WCwgeTogc3RhcnRZIH0gPSBjdHguZ2V0U3RhcnRQb3MoKVxuICAgICAgY29uc3QgeyB4LCB5LCB3LCBoIH0gPSBnZXRCb3hCeTJwb2ludHMoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpXG4gICAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLnNlbGVjdEFyZWEuZHJhd1JlY3QoeCwgeSwgdywgaClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHsgeDogZHgsIHk6IGR5IH0gPSBjdHguZ2V0RGlmZlBvcygpXG4gICAgY29uc3Qgb3V0bGluZUh1ZCA9IHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIub3V0bGluZUh1ZFxuICAgIGNvbnN0IHcgPSBvdXRsaW5lSHVkLmdldFdpZHRoKClcbiAgICBjb25zdCBoID0gb3V0bGluZUh1ZC5nZXRIZWlnaHQoKVxuICAgIG91dGxpbmVIdWQuZHJhd1JlY3QodGhpcy5vdXRsaW5lU3RhcnRYICsgZHgsIHRoaXMub3V0bGluZVN0YXJ0WSArIGR5LCB3LCBoKVxuICB9XG4gIGVuZChjdHgpIHtcbiAgICBpZiAoIXRoaXMuaGFzU2VsZWN0ZWRFbHNXaGVuU3RhcnQoKSkgeyAvLyBmaW5pc2hlZCBkcmF3biBzZWxlY3RpbmcgYXJlYVxuICAgICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5zZWxlY3RBcmVhLmNsZWFyKClcbiAgICAgIC8vIFRPRE86IGFjdGl2ZSBmcmFtZSBieSBzZWxlY3QgcmVjdC5cbiAgICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLmNsZWFyKClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuY2xlYXIoKVxuXG4gICAgXG4gICAgY29uc3QgeyB4OiBkeCwgeTogZHkgfSA9IGN0eC5nZXREaWZmUG9zKClcbiAgICB0aGlzLmVkaXRvci5leGVjdXRlQ29tbWFuZCgnZG1vdmUnLCB0aGlzLnNlbGVjdGVkRWxzLCBkeCwgZHkpXG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzKHRoaXMuc2VsZWN0ZWRFbHMpIC8vIHNldCBnbG9iYWwgYWN0aXZlZCBlbGVtZW50c1xuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxuICB9XG4gIC8vIG1vdXNlZG93biBvdXRzaWRlIHZpZXdwb3J0XG4gIGVuZE91dHNpZGUoKSB7XG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lSHVkLmNsZWFyKClcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLnNlbGVjdEFyZWEuY2xlYXIoKVxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLmNsZWFyKClcbiAgICB0aGlzLnNlbGVjdGVkRWxzID0gW11cbiAgfVxufVxuIiwiLyoqIHpvb20gKi9cblxuY29uc3QgeyBnZXRWaWV3Qm94IH0gPSByZXF1aXJlKFwiLi4vdXRpbC9zdmdcIilcblxuZXhwb3J0IGNsYXNzIFpvb21NYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBudWxsXG4gIH1cbiAgc2V0RWRpdG9yKGVkaXRvcikge1xuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gIH1cbiAgZ2V0Wm9vbSgpIHtcbiAgICBjb25zdCBhY3R1bFdpZHRoID0gcGFyc2VGbG9hdCh0aGlzLmVkaXRvci5zdmdSb290LmdldEF0dHJpYnV0ZSgnd2lkdGgnKSlcbiAgICBjb25zdCB2aWV3Qm94ID0gZ2V0Vmlld0JveCh0aGlzLmVkaXRvci5zdmdSb290KVxuICAgIGNvbnN0IHpvb20gPSBhY3R1bFdpZHRoIC8gdmlld0JveC53XG4gICAgcmV0dXJuIHpvb21cbiAgfVxuICBzZXRab29tKHpvb20pIHtcbiAgICBjb25zb2xlLmxvZyh6b29tKVxuICAgIGNvbnN0IHZpZXdCb3ggPSBnZXRWaWV3Qm94KHRoaXMuZWRpdG9yLnN2Z1Jvb3QpXG4gICAgY29uc3Qgd2lkdGggPSB2aWV3Qm94LncgKiB6b29tXG4gICAgY29uc3QgaGVpZ2h0ID0gdmlld0JveC5oICogem9vbVxuICAgIHRoaXMuZWRpdG9yLnN2Z1Jvb3Quc2V0QXR0cmlidXRlKCd3aWR0aCcsIHdpZHRoKVxuICAgIHRoaXMuZWRpdG9yLnN2Z1Jvb3Quc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoZWlnaHQpXG4gIH1cbiAgem9vbUluKCkge1xuICAgIGNvbnN0IGN1cnJlbnRab29tID0gdGhpcy5nZXRab29tKClcbiAgICB0aGlzLnNldFpvb20oY3VycmVudFpvb20gKyAwLjEpXG4gIH1cbiAgem9vbU91dCgpIHtcbiAgICBjb25zdCBjdXJyZW50Wm9vbSA9IHRoaXMuZ2V0Wm9vbSgpXG4gICAgdGhpcy5zZXRab29tKGN1cnJlbnRab29tIC0gMC4xKVxuICB9XG59IiwiXG5leHBvcnQgY2xhc3MgRWRpdG9yU2V0dGluZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2V0dGluZyA9IHtcbiAgICAgIC8vIGZpbGw6ICcjZmZmJyxcbiAgICAgIC8vIHN0cm9rZTogJyMwMDAnLFxuICAgICAgLy8gc3Ryb2tlV2lkdGg6ICcycHgnLFxuXG4gICAgICAvLyBvdXRsaW5lV2lkdGhcbiAgICAgIC8vIG91dGxpbmVDb2xvclxuICAgIH1cbiAgICB0aGlzLmJpbmRlZEV2ZW50Rm5zID0ge31cbiAgICB0aGlzLnNldEZpbGwoJyNmZmYnKVxuICAgIHRoaXMuc2V0U3Ryb2tlKCcjMDAwJylcbiAgICB0aGlzLnNldCgnc3Ryb2tlV2lkdGgnLCAnMXB4JylcbiAgfVxuICBzZXRGaWxsKHZhbCkge1xuICAgIHRoaXMuc2V0KCdmaWxsJywgdmFsKVxuICB9XG4gIHNldFN0cm9rZSh2YWwpIHtcbiAgICB0aGlzLnNldCgnc3Ryb2tlJywgdmFsKVxuICB9XG4gIHNldChuYW1lLCB2YWwpIHtcbiAgICB0aGlzLnNldHRpbmdbbmFtZV0gPSB2YWxcblxuICAgIGNvbnN0IHRvQ2FsbEZucyA9IHRoaXMuYmluZGVkRXZlbnRGbnNbbmFtZV1cbiAgICBpZiAodG9DYWxsRm5zKSB7XG4gICAgICB0b0NhbGxGbnMuZm9yRWFjaChmbiA9PiB7XG4gICAgICAgIGZuKHZhbClcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIGdldChuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ1tuYW1lXVxuICB9XG4gIGJpbmRFdmVudChuYW1lLCBmbikge1xuICAgIGlmICghdGhpcy5iaW5kZWRFdmVudEZuc1tuYW1lXSkge1xuICAgICAgdGhpcy5iaW5kZWRFdmVudEZuc1tuYW1lXSA9IFtdXG4gICAgfVxuICAgIHRoaXMuYmluZGVkRXZlbnRGbnNbbmFtZV0ucHVzaChmbilcbiAgfVxuICByZW1vdmVFdmVudChuYW1lLCBmbikge1xuICAgIGlmICghdGhpcy5iaW5kZWRFdmVudEZuc1tuYW1lXSkgcmV0dXJuIGZhbHNlXG5cbiAgICBjb25zdCByZW1vdmVGbklkeCA9IHRoaXMuYmluZGVkRXZlbnRGbnNbbmFtZV0uZmluZEluZGV4KGZuKVxuICAgIGlmIChyZW1vdmVGbklkeCA9PT0gLTEpIHJldHVybiBmYWxzZVxuICAgIHRoaXMuYmluZGVkRXZlbnRGbnMuc3BsaWNlKHJlbW92ZUZuSWR4LCAxKVxuICAgIHJldHVybiB0cnVlXG4gIH1cbn0iLCJcbmV4cG9ydCBjbGFzcyBTaG9ydGN1dCB7XG4gIGNvbnN0cnVjdG9yKGVkaXRvcikge1xuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gICAgdGhpcy5yZWdpc3RlcmVkRm5zID0ge31cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZSA9PiB7XG4gICAgICBjb25zdCBwcmVzc0tleU5hbWUgPSBnZXRQcmVzc0tleU5hbWUoZSlcblxuICAgICAgY29uc3QgZm4gPSB0aGlzLnJlZ2lzdGVyZWRGbnNbcHJlc3NLZXlOYW1lXVxuICAgICAgaWYgKGZuKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBmbi5mbihlKVxuICAgICAgfVxuICAgICAgXG4gICAgfSwgZmFsc2UpXG4gIH1cbiAgLy8gdGhpcy5yZWdpc3RlcigndW5kbycsICdDdHJsK1onLCAoKSA9PiB7IGVkaXRvci5leGVjQ29tbWFuZCgndW5kbycpIH0pXG4gIHJlZ2lzdGVyKGNtZE5hbWUsIHNob3J0Y3V0TmFtZSwgZm4pIHtcbiAgICAvLyBUT0RPOiB2YWxpZCBzaG9ydGN1dE5hbWVcbiAgICB0aGlzLnJlZ2lzdGVyZWRGbnNbc2hvcnRjdXROYW1lXSA9IHsgY21kTmFtZSwgZm4gfVxuICAgIFxuICB9XG4gIGZvcm1hdFByaW50KCkge1xuICAgIGNvbnN0IGFyciA9IFtdXG4gICAgZm9yIChsZXQgc2hvcnRjdXROYW1lIGluIHRoaXMucmVnaXN0ZXJlZEZucykge1xuICAgICAgY29uc3QgY21kTmFtZSA9IHRoaXMucmVnaXN0ZXJlZEZuc1tzaG9ydGN1dE5hbWVdLmNtZE5hbWVcbiAgICAgIGFyci5wdXNoKGNtZE5hbWUgKyAnOiAnICsgc2hvcnRjdXROYW1lKVxuICAgIH1cbiAgICByZXR1cm4gYXJyLmpvaW4oJywgJylcbiAgfVxuICBcbn1cblxuZnVuY3Rpb24gZ2V0UHJlc3NLZXlOYW1lKGUpIHtcbiAgY29uc3QgcHJlc3NlZEtleXMgPSBbXVxuICBpZiAoZS5jdHJsS2V5KSBwcmVzc2VkS2V5cy5wdXNoKCdDdHJsJylcbiAgaWYgKGUubWV0YUtleSkgcHJlc3NlZEtleXMucHVzaCgnQ21kJylcbiAgaWYgKGUuc2hpZnRLZXkpIHByZXNzZWRLZXlzLnB1c2goJ1NoaWZ0JylcbiAgLy8gb25seSBjaGVjayBBflpcbiAgLy8gVE9ETzogcmVzb2x2ZSBhbGwga2V5XG4gIGlmICgvS2V5Li8udGVzdChlLmNvZGUpKSBwcmVzc2VkS2V5cy5wdXNoKGUuY29kZVtlLmNvZGUubGVuZ3RoIC0gMV0pXG4gIGNvbnN0IG5hbWUgPSBwcmVzc2VkS2V5cy5qb2luKCcrJylcbiAgcmV0dXJuIG5hbWVcbn0iLCJjb25zdCB7IEVkaXRvckV2ZW50Q29udGV4dCB9ID0gcmVxdWlyZShcIi4vZWRpdG9yRXZlbnRDb250ZXh0XCIpXG5cbmV4cG9ydCBjbGFzcyBUb29sTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKGVkaXRvcikge1xuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gICAgdGhpcy50b29scyA9IHt9XG4gICAgdGhpcy5jdXJyZW50VG9vbCA9IG51bGxcbiAgICB0aGlzLmludm9rZVdoZW5Td2l0Y2ggPSAoKSA9PiB7fVxuXG4gICAgdGhpcy5jdHggPSBudWxsIC8vIHRvb2wgY29udGV4dFxuICB9XG4gIHNldEN1cnJlbnRUb29sKG5hbWUpIHtcbiAgICB0aGlzLmN1cnJlbnRUb29sID0gdGhpcy50b29sc1tuYW1lXVxuICAgIHRoaXMuaW52b2tlV2hlblN3aXRjaCh0aGlzLmdldEN1cnJlbnRUb29sTmFtZSgpKVxuICB9XG4gIG9uU3dpdGNoVG9vbChmbikge1xuICAgIHRoaXMuaW52b2tlV2hlblN3aXRjaCA9IGZuXG4gIH1cbiAgZ2V0Q3VycmVudFRvb2xOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRUb29sLm5hbWUoKVxuICB9XG4gIHJlZ2lzdGVyVG9vbCh0b29sKSB7XG4gICAgdGhpcy50b29sc1t0b29sLm5hbWUoKV0gPSB0b29sXG4gICAgdG9vbC5zZXRFZGl0b3IodGhpcy5lZGl0b3IpIC8vIGRlcGVuZGVuY3kgaW5qZWN0aW9uXG4gIH1cblxuICBiaW5kVG9vbEV2ZW50KCkge1xuICAgIGNvbnN0IHN2Z1Jvb3QgPSB0aGlzLmVkaXRvci5zdmdSb290XG5cbiAgICBzdmdSb290LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGUgPT4ge1xuICAgICAgY29uc3QgY3R4ID0gbmV3IEVkaXRvckV2ZW50Q29udGV4dCh0aGlzLmVkaXRvciwgZSlcbiAgICAgIHRoaXMuY3R4ID0gY3R4XG4gICAgICB0aGlzLmN1cnJlbnRUb29sLnN0YXJ0KGN0eClcbiAgICB9LCBmYWxzZSlcblxuICAgIHN2Z1Jvb3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XG4gICAgICBjb25zdCBjdHggPSB0aGlzLmN0eFxuXG4gICAgICBpZiAoIWN0eCkgcmV0dXJuIC8vIGlmIGN0eCBleGl0cywgcHJlc2VudCBtb3VzZWRvd24gZXZlbnQgZW1pdCBqdXN0IGJlZm9yZVxuICAgICAgY3R4LnNldE9yaWdpbkV2ZW50KGUpXG4gICAgICBjdHgucHJlc3NNb3VzZSgpXG4gICAgICB0aGlzLmN1cnJlbnRUb29sLm1vdmUoY3R4KSAvLyBtb3ZlXG4gICAgfSwgZmFsc2UpXG4gICAgXG4gICAgc3ZnUm9vdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZSA9PiB7XG4gICAgICAvLyB0aGlzLmN0eC5yZWxlYXNlTW91c2UoKVxuICAgICAgY29uc3QgY3R4ID0gdGhpcy5jdHhcbiAgICAgIC8vIGN0eC5zZXRPcmlnaW5FdmVudChlKSAvLyB0aGUgb2Zmc2V0WCBhbmQgb2Zmc2V0WSBpbiBtb3VzZXVwIGFuZCB0aGUgbGFzdCBtb3VzZW1vdmUgaXMgbm90IGVxdWFsID8/IFxuICAgICAgdGhpcy5jdXJyZW50VG9vbC5lbmQoY3R4KVxuICAgICAgY3R4LmlzRW5kSW5zaWRlID0gdHJ1ZVxuICAgIH0sIGZhbHNlKVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlID0+IHtcbiAgICAgIGlmICh0aGlzLmN0eCAmJiB0aGlzLmN0eC5pc0VuZEluc2lkZSA9PSBmYWxzZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUb29sLmVuZE91dHNpZGUodGhpcy5jdHgpXG4gICAgICB9XG4gICAgICB0aGlzLmN0eCA9IG51bGxcbiAgICB9LCBmYWxzZSlcbiAgfVxufSIsIlxuZXhwb3J0IGZ1bmN0aW9uIGdldEJveEJ5MnBvaW50cyh4MSwgeTEsIHgyLCB5Mikge1xuICBsZXQgeCwgeSwgdywgaFxuICB3ID0gTWF0aC5hYnMoeDIgLSB4MSlcbiAgaCA9IE1hdGguYWJzKHkyIC0geTEpXG4gIHggPSBNYXRoLm1pbih4MiwgeDEpXG4gIHkgPSBNYXRoLm1pbih5MiwgeTEpXG4gIHJldHVybiB7IHgsIHksIHcsIGggfVxufSIsIlxuLy8gVE9ETzogdG8gZmluaXNoXG5leHBvcnQgZnVuY3Rpb24gZ2V0Vmlld0JveChlbCkge1xuICBjb25zdCB2YWwgPSBlbC5nZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnKVxuICBpZiAoIXZhbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaGFzIG5vdCB2aWV3Qm94IGF0dHJpYnV0ZScpXG4gIH1cbiAgY29uc3QgW3gsIHksIHcsIGhdID0gdmFsLnNwbGl0KC9bXFxzLF0rLykubWFwKGl0ZW0gPT4gcGFyc2VGbG9hdChpdGVtKSlcbiAgcmV0dXJuIHsgeCwgeSwgdywgaCB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAuanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9