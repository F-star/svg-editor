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
  getEls() {
    return this.els
  }
  isEmpty() {
    return this.els.length == 0
  }
  isNoEmpty() {
    return this.els.length > 0
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
  getMergeBBox() {
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
    if (this.isNoEmpty()) {
      this.editor.executeCommand('setAttr', this.els, name, val)
    }
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
// delete selected elements
document.querySelector('#btn-delete').onclick = function() {
  if (editor.activedElsManager.isNoEmpty()) {
    editor.executeCommand('removeSelectedElements')
  }
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
editor.shortcut.register('Undo', 'Ctrl+Z', () => {
  editor.executeCommand('undo')
})
editor.shortcut.register('Redo', 'Cmd+Shift+Z', () => {
  editor.executeCommand('redo')
})
editor.shortcut.register('Redo', 'Ctrl+Shift+Z', () => {
  editor.executeCommand('redo')
})
editor.shortcut.register('Delete', 'Backspace', () => {
  if (editor.activedElsManager.isNoEmpty()) {
    editor.executeCommand('removeSelectedElements')
  }
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

    this.resigterCommandClass(_commands__WEBPACK_IMPORTED_MODULE_0__.AddRect)
    this.resigterCommandClass(_commands__WEBPACK_IMPORTED_MODULE_0__.DMove)
    this.resigterCommandClass(_commands__WEBPACK_IMPORTED_MODULE_0__.SetAttr)
    this.resigterCommandClass(_commands__WEBPACK_IMPORTED_MODULE_0__.removeSelectedElements)
  }
  setEditor(editor) {
    this.editor = editor
  }
  execute(name, ...args) {
    const CommandClass = this.commandClasses[name]
    if (!CommandClass) throw new Error(`editor has not the ${name} command`)
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
    const name = commandClass.name()
    this.commandClasses[name] = commandClass
  }
  afterAnyUndo() {

  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommandManager);

/***/ }),

/***/ "./src/command/commands.js":
/*!*********************************!*\
  !*** ./src/command/commands.js ***!
  \*********************************/
/*! namespace exports */
/*! export AddRect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DMove [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SetAttr [provided] [no usage info] [missing usage info prevents renaming] */
/*! export removeSelectedElements [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddRect": () => /* binding */ AddRect,
/* harmony export */   "removeSelectedElements": () => /* binding */ removeSelectedElements,
/* harmony export */   "DMove": () => /* binding */ DMove,
/* harmony export */   "SetAttr": () => /* binding */ SetAttr
/* harmony export */ });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../element */ "./src/element/index.js");
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
class AddRect extends BaseCommand {
  constructor(editor, x, y, w, h) {
    super()
    this.editor = editor
    const rect = new _element__WEBPACK_IMPORTED_MODULE_0__.FSVG.Rect(x, y, w, h)

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
/**
 * remove elements
 */
class removeSelectedElements extends BaseCommand {
  constructor(editor) {
    super()
    this.editor = editor

    this.els = this.editor.activedElsManager.getEls()

    const size = this.els.length
    this.parents = new Array(size)
    this.nextSiblings = new Array(size)
    this.els.forEach((el, idx) => {
      this.nextSiblings[idx] = el.el().nextElementSibling 
      this.parents[idx] = el.el().parentElement
    })
    this.execute()
  }
  static name() {
    return 'removeSelectedElements'
  }
  execute() { // private
    this.els.forEach(item => {
      item.remove()
    })
    this.editor.activedElsManager.clear()
  }
  redo() {
    this.execute()
  }
  undo() {
    this.els.forEach((element, idx) => {
      const el = element.el()
      if (this.nextSiblings[idx]) {
        this.parents[idx].insertBefore(el, this.nextSiblings[idx])
      } else {
        this.parents[idx].appendChild(el)
      }
    })

    this.editor.activedElsManager.setEls(this.els)
  }
}

/**
 * DMove
 * 
 * dmove elements
 */
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

/**
 * setAttr
 */
class SetAttr extends BaseCommand {
  constructor(editor, els, attrName, val) {
    super()
    this.editor = editor
    if (!Array.isArray(els)) els = [els]
    this.els = els
    this.attrName = attrName
    this.beforeVal = this.els.map(el => el.getAttr(attrName))
    this.afterVal = val

    this.els.forEach(el => {
      el.setAttr(attrName, val)
    })
  }
  static name() {
    return 'setAttr'
  }
  redo() {
    this.els.forEach(el => {
      el.setAttr(this.attrName, this.afterVal)
    })
  }
  undo() {
    this.els.forEach((el, i) => {
      el.setAttr(this.attrName, this.beforeVal[i])
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

/***/ "./src/devConfig.js":
/*!**************************!*\
  !*** ./src/devConfig.js ***!
  \**************************/
/*! namespace exports */
/*! export isDebug [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isDebug": () => /* binding */ isDebug
/* harmony export */ });
const isDebug = true


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
  remove() {
    return this.el_.remove()
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
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shortcut": () => /* binding */ Shortcut
/* harmony export */ });
/* harmony import */ var _devConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./devConfig */ "./src/devConfig.js");
;


class Shortcut {
  constructor(editor) {
    this.editor = editor
    this.registeredFns = {}

    window.addEventListener('keydown', e => {
      const pressKeyName = getPressKeyName(e)
      const fn = this.registeredFns[pressKeyName]
      if (fn) {
        /** debug */
        if(_devConfig__WEBPACK_IMPORTED_MODULE_0__.isDebug) {
          console.log(pressKeyName)
        }
        /** debug end */
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
  if (/Key./.test(e.code)) {
    pressedKeys.push(e.code[e.code.length - 1])
  }
  else {
    pressedKeys.push(e.code)
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2FjdGl2ZWRFbHNNYW5hZ2VyLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvY29tbWFuZC9jb21tYW5kTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2NvbW1hbmQvY29tbWFuZHMuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9kZXZDb25maWcuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3JFdmVudENvbnRleHQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lbGVtZW50L2Jhc2VFbGVtZW50LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvZWxlbWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2VsZW1lbnQvcmVjdC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2xheWVyL2h1ZE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9sYXllci9vdXRsaW5lSHVkLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbGF5ZXIvc2VsZWN0QXJlYS5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvYWRkUmVjdC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvZHJhZ0NhbnZhcy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvc2VsZWN0LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy96b29tLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvc2V0dGluZy9lZGl0b3JTZXR0aW5nLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvc2hvcnRjdXQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy90b29sTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL3V0aWwvbWF0aC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL3V0aWwvc3ZnLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxvQkFBb0I7QUFDakM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xFQSxDQUFnQztBQUNVO0FB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Q0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJhcHAuZTE0NTU0Nzc3NGM5MjgyMDJhNTcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIOa/gOa0u+WFg+e0oOeuoeeQhuexu1xuICovXG5cbmV4cG9ydCBjbGFzcyBBY3RpdmVkRWxzTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKGVkaXRvcikge1xuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gICAgdGhpcy5lbHMgPSBbXVxuICB9XG4gIHNldEVscyhlbHMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxzKSkgZWxzID0gW2Vsc11cbiAgICB0aGlzLmVscyA9IGVsc1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZWRpdG9yLnRvb2xNYW5hZ2VyLmdldEN1cnJlbnRUb29sTmFtZSgpKVxuICAgIC8vIFRPRE86IGhpZ2hsaWdodCBvdXRsaW5lLCBhY2NvcmRpbmcgdG8gY3VycmVudCB0b29sXG4gICAgdGhpcy5oZWlnaGxpZ3RoRWxzKClcbiAgICB0aGlzLnNldFNldHRpbmdGaWxsKClcbiAgfVxuICBnZXRFbHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxzXG4gIH1cbiAgaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbHMubGVuZ3RoID09IDBcbiAgfVxuICBpc05vRW1wdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxzLmxlbmd0aCA+IDBcbiAgfVxuICBjbGVhcigpIHtcbiAgICB0aGlzLmVscyA9IFtdXG4gICAgLy8gY2xlYXIgb3V0bGluZVxuICAgIGNvbnN0IGh1ZE1hbmFnZXIgPSB0aGlzLmVkaXRvci5odWRNYW5hZ2VyXG4gICAgaHVkTWFuYWdlci5vdXRsaW5lSHVkLmNsZWFyKClcbiAgfVxuICBjb250YWlucyhlbCkge1xuICAgIC8vIFRPRE86XG4gIH1cbiAgZ2V0TWVyZ2VCQm94KCkge1xuICAgIC8vIFRPRE86XG4gICAgLyogbGV0IHgsIHksIHcsIGhcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGNvbnN0IGJib3ggPSBlbC5lbCgpLmdldGJib3goKVxuICAgIH0pICovXG4gIH1cbiAgLy8gaGVpZ2h0bGlnaHQgdGhlIGVsZW1lbnRzXG4gIGhlaWdobGlndGhFbHMoKSB7XG4gICAgLy8gVE9ETzpcbiAgICBjb25zdCBlbHMgPSB0aGlzLmVsc1xuICAgIGNvbnN0IGh1ZE1hbmFnZXIgPSB0aGlzLmVkaXRvci5odWRNYW5hZ2VyXG4gICAgZWxzLmZvckVhY2goZWwgPT4ge1xuICAgICAgY29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gZWwuZ2V0QkJveCgpXG4gICAgICAvLyBjb25zb2xlLmxvZyhib3gpXG4gICAgICBodWRNYW5hZ2VyLm91dGxpbmVIdWQuZHJhd1JlY3QoeCwgeSwgd2lkdGgsIGhlaWdodClcbiAgICB9KVxuICB9XG4gIHNldFNldHRpbmdGaWxsKCkge1xuICAgIGNvbnN0IGVscyA9IHRoaXMuZWxzXG5cbiAgICBjb25zdCBmaWxscyA9IGVscy5tYXAoZWwgPT4ge1xuICAgICAgcmV0dXJuIGVsLmdldEF0dHIoJ2ZpbGwnKVxuICAgIH0pXG5cbiAgICB0aGlzLmVkaXRvci5zZXR0aW5nLnNldEZpbGwoZmlsbHNbMF0pIC8vIEZJWE1FOlxuICB9XG4gIHNldEVsc0F0dHIobmFtZSwgdmFsKSB7XG4gICAgaWYgKHRoaXMuaXNOb0VtcHR5KCkpIHtcbiAgICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdzZXRBdHRyJywgdGhpcy5lbHMsIG5hbWUsIHZhbClcbiAgICB9XG4gIH1cbn0iLCJcbmltcG9ydCBFZGl0b3IgZnJvbSAnLi9lZGl0b3IuanMnXG5pbXBvcnQgQWRkUmVjdCBmcm9tICcuL21vZHVsZXMvYWRkUmVjdC5qcydcbmltcG9ydCB7IERyYWdDYW52YXMgfSBmcm9tICcuL21vZHVsZXMvZHJhZ0NhbnZhcy5qcydcbmltcG9ydCBDb21tYW5kTWFuYWdlciBmcm9tICcuL2NvbW1hbmQvY29tbWFuZE1hbmFnZXIuanMnXG5pbXBvcnQgeyBFZGl0b3JTZXR0aW5nIH0gZnJvbSAnLi9zZXR0aW5nL2VkaXRvclNldHRpbmcuanMnXG5pbXBvcnQgeyBab29tTWFuYWdlciB9IGZyb20gJy4vbW9kdWxlcy96b29tLmpzJ1xuaW1wb3J0IHsgU2VsZWN0IH0gZnJvbSAnLi9tb2R1bGVzL3NlbGVjdC5qcydcbmltcG9ydCB7IFRvb2xNYW5hZ2VyIH0gZnJvbSAnLi90b29sTWFuYWdlci5qcydcblxuZnVuY3Rpb24gYWN0aXZlQnRuKG5hbWUpIHtcbiAgbmFtZSA9IHtcbiAgICAnc2VsZWN0JzogJ2J0bi1zZWxlY3QnLFxuICAgICdhZGRSZWN0JzogJ2J0bi1hZGQtcmVjdCcsXG4gICAgJ2RyYWdDYW52YXMnOiAnYnRuLWRyYWctY2FudmFzJyxcbiAgfVtuYW1lXVxuICBpZiAobmFtZSA9PSB1bmRlZmluZWQpIHJldHVyblxuXG4gIGNvbnN0IHRvb2xCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9vbC1iYXInKVxuICBjb25zdCB0b29sQnRucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRvb2xCYXIuY2hpbGRyZW4pXG4gIHRvb2xCdG5zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICB9KVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYW1lKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxufVxuXG5cbmNvbnN0IGVkaXRvciA9IG5ldyBFZGl0b3IoKVxud2luZG93LmVkaXRvciA9IGVkaXRvciAvLyBkZWJ1ZyBpbiBkZXZ0b29sXG5cbmNvbnN0IGNvbW1hbmRNYW5hZ2VyID0gbmV3IENvbW1hbmRNYW5hZ2VyKGVkaXRvcilcbmVkaXRvci5zZXRDb21tYW5kTWFuYWdlcihjb21tYW5kTWFuYWdlcilcblxuZWRpdG9yLnNldFNldHRpbmcobmV3IEVkaXRvclNldHRpbmcoKSlcbi8vIHJlZ2lzdGVyIHRvb2xzXG5cbmNvbnN0IHRvb2xNYW5hZ2VyID0gbmV3IFRvb2xNYW5hZ2VyKGVkaXRvcilcbmVkaXRvci5zZXRUb29sTWFuYWdlcih0b29sTWFuYWdlcilcbnRvb2xNYW5hZ2VyLnJlZ2lzdGVyVG9vbChuZXcgQWRkUmVjdCgpKVxudG9vbE1hbmFnZXIucmVnaXN0ZXJUb29sKG5ldyBEcmFnQ2FudmFzKCkpXG50b29sTWFuYWdlci5yZWdpc3RlclRvb2wobmV3IFNlbGVjdCgpKVxuXG5lZGl0b3IudG9vbE1hbmFnZXIub25Td2l0Y2hUb29sKG5hbWUgPT4ge1xuICBjb25zb2xlLmxvZygnc3dpdGNoZWQgdG9vbDonLCBuYW1lKVxuICBhY3RpdmVCdG4obmFtZSlcbn0pXG5cbnRvb2xNYW5hZ2VyLnNldEN1cnJlbnRUb29sKCdhZGRSZWN0JylcbnRvb2xNYW5hZ2VyLmJpbmRUb29sRXZlbnQoKVxuLy8gem9vbVxuZWRpdG9yLnNldFpvb21NYW5hZ2VyKG5ldyBab29tTWFuYWdlcigpKVxuXG5lZGl0b3IubW91bnQoJyNlZGl0b3ItYXJlYScpXG5cblxuLyoqIFxuICogYmluZCBldmVudCBpbiBidXR0b25cbiAqLyBcbi8vIHVuZG9cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tdW5kbycpLm9uY2xpY2sgPSAoKSA9PiB7XG4gIGVkaXRvci5leGVjdXRlQ29tbWFuZCgndW5kbycpXG59XG4vLyByZWRvXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXJlZG8nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIGVkaXRvci5leGVjdXRlQ29tbWFuZCgncmVkbycpXG59XG4vLyB6b29tSW5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tem9vbS1pbicpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLnpvb21NYW5hZ2VyLnpvb21JbigpXG59XG4vLyB6b29tT3V0XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXpvb20tb3V0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBlZGl0b3Iuem9vbU1hbmFnZXIuem9vbU91dCgpXG59XG4vLyBzZWxlY3QgYWRkUmVjdCB0b29sXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLWFkZC1yZWN0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBlZGl0b3Iuc2V0Q3VycmVudFRvb2woJ2FkZFJlY3QnKVxufVxuLy8gc2VsZWN0IGRyYWdjYW52YXMgdG9vbFxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1kcmFnLWNhbnZhcycpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLnNldEN1cnJlbnRUb29sKCdkcmFnQ2FudmFzJylcbn1cbi8vIHNlbGVjdCB0b29sXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXNlbGVjdCcpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLnNldEN1cnJlbnRUb29sKCdzZWxlY3QnKVxufVxuLy8gZGVsZXRlIHNlbGVjdGVkIGVsZW1lbnRzXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLWRlbGV0ZScpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgaWYgKGVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5pc05vRW1wdHkoKSkge1xuICAgIGVkaXRvci5leGVjdXRlQ29tbWFuZCgncmVtb3ZlU2VsZWN0ZWRFbGVtZW50cycpXG4gIH1cbn1cblxuLy8gZmlsbCB2YWx1ZSBjb250cm9sXG5jb25zdCBmaWxsVGV4dE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWxlbWVudC1pbmZvLWZpbGwnKVxuZmlsbFRleHROb2RlLmlubmVySFRNTCA9IGVkaXRvci5zZXR0aW5nLmdldCgnZmlsbCcpXG5lZGl0b3Iuc2V0dGluZy5iaW5kRXZlbnQoJ2ZpbGwnLCB2YWwgPT4ge1xuICBmaWxsVGV4dE5vZGUuaW5uZXJIVE1MID0gdmFsXG59KVxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NldC1maWxsLWJ0bicpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgZmlsbCA9IHdpbmRvdy5wcm9tcHQoJ1BsZWFzZSBpbnB1dCB2YWxpZCBjb2xvciB2YWx1Ze+8iGxpa2UgI2ZmY2U0M++8iScsIGVkaXRvci5zZXR0aW5nLmdldCgnZmlsbCcpKVxuICBpZiAoIWZpbGwpIHJldHVyblxuICBmaWxsVGV4dE5vZGUuaW5uZXJIVE1MID0gZmlsbFxuXG4gIGVkaXRvci5zZXR0aW5nLnNldEZpbGwoZmlsbClcbiAgZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVsc0F0dHIoJ2ZpbGwnLCBmaWxsKVxufVxuXG4vLyBzdHJva2UgdmFsdWUgY29udHJvbFxuY29uc3Qgc3Ryb2tlVGV4dE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWxlbWVudC1pbmZvLXN0cm9rZScpXG5zdHJva2VUZXh0Tm9kZS5pbm5lckhUTUwgPSBlZGl0b3Iuc2V0dGluZy5nZXQoJ3N0cm9rZScpXG5lZGl0b3Iuc2V0dGluZy5iaW5kRXZlbnQoJ3N0cm9rZScsIHZhbCA9PiB7XG4gIHN0cm9rZVRleHROb2RlLmlubmVySFRNTCA9IHZhbFxufSlcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZXQtc3Ryb2tlLWJ0bicpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgc3Ryb2tlID0gd2luZG93LnByb21wdCgnUGxlYXNlIGlucHV0IHZhbGlkIGNvbG9yIHZhbHVl77yIbGlrZSAjZmZjZTQz77yJJywgZWRpdG9yLnNldHRpbmcuZ2V0KCdzdHJva2UnKSlcbiAgaWYgKCFzdHJva2UpIHJldHVyblxuICBzdHJva2VUZXh0Tm9kZS5pbm5lckhUTUwgPSBzdHJva2VcblxuICBlZGl0b3Iuc2V0dGluZy5zZXRTdHJva2Uoc3Ryb2tlKVxuICBlZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzQXR0cignc3Ryb2tlJywgc3Ryb2tlKVxufVxuLy8gcmVnaXN0ZXIgc2hvcnRjdXRcbmVkaXRvci5zaG9ydGN1dC5yZWdpc3RlcignVW5kbycsICdDbWQrWicsICgpID0+IHtcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCd1bmRvJylcbn0pXG5lZGl0b3Iuc2hvcnRjdXQucmVnaXN0ZXIoJ1VuZG8nLCAnQ3RybCtaJywgKCkgPT4ge1xuICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3VuZG8nKVxufSlcbmVkaXRvci5zaG9ydGN1dC5yZWdpc3RlcignUmVkbycsICdDbWQrU2hpZnQrWicsICgpID0+IHtcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdyZWRvJylcbn0pXG5lZGl0b3Iuc2hvcnRjdXQucmVnaXN0ZXIoJ1JlZG8nLCAnQ3RybCtTaGlmdCtaJywgKCkgPT4ge1xuICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3JlZG8nKVxufSlcbmVkaXRvci5zaG9ydGN1dC5yZWdpc3RlcignRGVsZXRlJywgJ0JhY2tzcGFjZScsICgpID0+IHtcbiAgaWYgKGVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5pc05vRW1wdHkoKSkge1xuICAgIGVkaXRvci5leGVjdXRlQ29tbWFuZCgncmVtb3ZlU2VsZWN0ZWRFbGVtZW50cycpXG4gIH1cbn0pXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hvcnRjdXQnKS5pbm5lckhUTUwgPSBlZGl0b3Iuc2hvcnRjdXQuZm9ybWF0UHJpbnQoKVxuXG4vKipcbiAqIOeQhuaDsyBhcGkg5L2/55So5L6L5a2QXG4gKiBcbiAqIGNvbnN0IGVkaXRvckJ1aWxkZXIgPSBuZXcgRWRpdG9yLmJ1aWxkZXIoKVxuICogZWRpdG9yQnVpbGRlclxuICogICAuc2V0Q2FudmFzU2l6ZSg0MDAsIDMwMClcbiAqICAgLnNldFN0YWdlU2l6ZSgxMDAwLCA4MDApXG4gKiAgIC5zZXRWaWV3cG9ydFNpemUoODAwLCA1MDApXG4gKiAgIC5zZXRab29tKDEwMClcbiAqIFxuICogY29uc3QgZWRpdG9yID0gZWRpdG9yQnVpbGRlci5idWlsZCgpXG4gKiBlZGl0b3IucmVnaXN0ZXJUb29sKHRvb2xNb3ZlKVxuICogXG4gKi8iLCIvKipcbiAqIENvbW1hbmRNYW5hZ2VyIENsYXNzXG4gKiBcbiAqIFxuICogQ29tbWFuZE1hbmFnZXIudW5kbygpXG4gKiBDb21tYW5kTWFuYWdlci5yZWRvKClcbiAqL1xuXG5pbXBvcnQgeyBBZGRSZWN0LCBETW92ZSwgcmVtb3ZlU2VsZWN0ZWRFbGVtZW50cywgU2V0QXR0ciB9IGZyb20gXCIuL2NvbW1hbmRzXCJcblxuY2xhc3MgQ29tbWFuZE1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcihlZGl0b3IpIHtcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICAgIHRoaXMucmVkb1N0YWNrID0gW11cbiAgICB0aGlzLnVuZG9TdGFjayA9IFtdXG4gICAgdGhpcy5jb21tYW5kQ2xhc3NlcyA9IHt9XG5cbiAgICB0aGlzLnJlc2lndGVyQ29tbWFuZENsYXNzKEFkZFJlY3QpXG4gICAgdGhpcy5yZXNpZ3RlckNvbW1hbmRDbGFzcyhETW92ZSlcbiAgICB0aGlzLnJlc2lndGVyQ29tbWFuZENsYXNzKFNldEF0dHIpXG4gICAgdGhpcy5yZXNpZ3RlckNvbW1hbmRDbGFzcyhyZW1vdmVTZWxlY3RlZEVsZW1lbnRzKVxuICB9XG4gIHNldEVkaXRvcihlZGl0b3IpIHtcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICB9XG4gIGV4ZWN1dGUobmFtZSwgLi4uYXJncykge1xuICAgIGNvbnN0IENvbW1hbmRDbGFzcyA9IHRoaXMuY29tbWFuZENsYXNzZXNbbmFtZV1cbiAgICBpZiAoIUNvbW1hbmRDbGFzcykgdGhyb3cgbmV3IEVycm9yKGBlZGl0b3IgaGFzIG5vdCB0aGUgJHtuYW1lfSBjb21tYW5kYClcbiAgICBjb25zdCBjb21tYW5kID0gbmV3IENvbW1hbmRDbGFzcyh0aGlzLmVkaXRvciwgLi4uYXJncykgLy8g5Yib5bu6IGNvbW1hbmQg5a6e5L6LXG5cbiAgICB0aGlzLnVuZG9TdGFjay5wdXNoKGNvbW1hbmQpXG4gICAgdGhpcy5yZWRvU3RhY2sgPSBbXVxuICB9XG4gIHVuZG8oKSB7XG4gICAgaWYgKHRoaXMudW5kb1N0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc29sZS5sb2coJ3VuZG8gc3RhY2sgaXMgZW1wdHksIGNhbiBub3QgdW5kbycpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgY29tbWFuZCA9IHRoaXMudW5kb1N0YWNrLnBvcCgpXG4gICAgdGhpcy5yZWRvU3RhY2sucHVzaChjb21tYW5kKVxuICAgIGNvbW1hbmQudW5kbygpXG4gICAgY29tbWFuZC5hZnRlclVuZG8oKVxuICB9XG4gIHJlZG8oKSB7XG4gICAgaWYgKHRoaXMucmVkb1N0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc29sZS5sb2coJ3JlZG8gc3RhY2sgaXMgZW1wdHksIGNhbiBub3QgcmVkbycpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgY29tbWFuZCA9IHRoaXMucmVkb1N0YWNrLnBvcCgpXG4gICAgdGhpcy51bmRvU3RhY2sucHVzaChjb21tYW5kKVxuICAgIGNvbW1hbmQucmVkbygpXG4gICAgY29tbWFuZC5hZnRlclJlZG8oKVxuICB9XG4gIC8vIOazqOWGjOWRveS7pOexu+WIsOWRveS7pOeuoeeQhuWvueixoeS4reOAglxuICByZXNpZ3RlckNvbW1hbmRDbGFzcyhjb21tYW5kQ2xhc3MpIHtcbiAgICBjb25zdCBuYW1lID0gY29tbWFuZENsYXNzLm5hbWUoKVxuICAgIHRoaXMuY29tbWFuZENsYXNzZXNbbmFtZV0gPSBjb21tYW5kQ2xhc3NcbiAgfVxuICBhZnRlckFueVVuZG8oKSB7XG5cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb21tYW5kTWFuYWdlciIsImltcG9ydCB7IEZTVkcgfSBmcm9tIFwiLi4vZWxlbWVudFwiXG5cbmNsYXNzIEJhc2VDb21tYW5kIHtcbiAgdW5kbygpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3BsZWFzZSBvdmVycmlkZSB1bmRvIG1ldGhvZCcpXG4gIH1cbiAgcmVkbygpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3BsZWFzZSBvdmVycmlkZSByZWRvIG1ldGhvZCcpXG4gIH1cbiAgYWZ0ZXJSZWRvKCkge31cbiAgYWZ0ZXJVbmRvKCkge31cbn1cblxuLyoqXG4gKiBhZGRSZWN0XG4gKiBcbiAqIGFkZCByZWN0IHN2ZyBlbGVtZW50XG4gKi9cbmV4cG9ydCBjbGFzcyBBZGRSZWN0IGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBjb25zdHJ1Y3RvcihlZGl0b3IsIHgsIHksIHcsIGgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgICBjb25zdCByZWN0ID0gbmV3IEZTVkcuUmVjdCh4LCB5LCB3LCBoKVxuXG4gICAgY29uc3QgZmlsbCA9IGVkaXRvci5zZXR0aW5nLmdldCgnZmlsbCcpXG4gICAgY29uc3Qgc3Ryb2tlID0gZWRpdG9yLnNldHRpbmcuZ2V0KCdzdHJva2UnKVxuICAgIGNvbnN0IHN0cm9rZVdpZHRoID0gZWRpdG9yLnNldHRpbmcuZ2V0KCdzdHJva2VXaWR0aCcpXG4gICAgcmVjdC5zZXRBdHRyKCdmaWxsJywgZmlsbClcbiAgICByZWN0LnNldEF0dHIoJ3N0cm9rZScsIHN0cm9rZSlcbiAgICByZWN0LnNldEF0dHIoJ3N0cm9rZS13aWR0aCcsIHN0cm9rZVdpZHRoKVxuXG4gICAgZWRpdG9yLmdldEN1cnJlbnRMYXllcigpLmFwcGVuZENoaWxkKHJlY3QuZWwoKSlcblxuICAgIHRoaXMubmV4dFNpYmxpbmcgPSByZWN0LmVsKCkubmV4dEVsZW1lbnRTaWJsaW5nIFxuICAgIHRoaXMucGFyZW50ID0gcmVjdC5lbCgpLnBhcmVudEVsZW1lbnRcbiAgICB0aGlzLnJlY3QgPSByZWN0XG4gIH1cbiAgc3RhdGljIG5hbWUoKSB7XG4gICAgcmV0dXJuICdhZGRSZWN0J1xuICB9XG4gIHJlZG8oKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzLnJlY3QuZWwoKVxuICAgIGlmICh0aGlzLm5leHRTaWJsaW5nKSB7XG4gICAgICB0aGlzLnBhcmVudC5pbnNlcnRCZWZvcmUoZWwsIHRoaXMubmV4dFNpYmxpbmcpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKGVsKVxuICAgIH1cbiAgfVxuICB1bmRvKCkge1xuICAgIHRoaXMucmVjdC5lbCgpLnJlbW92ZSgpXG4gIH1cbiAgYWZ0ZXJVbmRvKCkge1xuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLmNsZWFyKClcbiAgfVxuICBhZnRlclJlZG8oKSB7XG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzKHRoaXMucmVjdClcbiAgfVxufVxuLyoqXG4gKiByZW1vdmUgZWxlbWVudHNcbiAqL1xuZXhwb3J0IGNsYXNzIHJlbW92ZVNlbGVjdGVkRWxlbWVudHMgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XG4gIGNvbnN0cnVjdG9yKGVkaXRvcikge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuXG4gICAgdGhpcy5lbHMgPSB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5nZXRFbHMoKVxuXG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuZWxzLmxlbmd0aFxuICAgIHRoaXMucGFyZW50cyA9IG5ldyBBcnJheShzaXplKVxuICAgIHRoaXMubmV4dFNpYmxpbmdzID0gbmV3IEFycmF5KHNpemUpXG4gICAgdGhpcy5lbHMuZm9yRWFjaCgoZWwsIGlkeCkgPT4ge1xuICAgICAgdGhpcy5uZXh0U2libGluZ3NbaWR4XSA9IGVsLmVsKCkubmV4dEVsZW1lbnRTaWJsaW5nIFxuICAgICAgdGhpcy5wYXJlbnRzW2lkeF0gPSBlbC5lbCgpLnBhcmVudEVsZW1lbnRcbiAgICB9KVxuICAgIHRoaXMuZXhlY3V0ZSgpXG4gIH1cbiAgc3RhdGljIG5hbWUoKSB7XG4gICAgcmV0dXJuICdyZW1vdmVTZWxlY3RlZEVsZW1lbnRzJ1xuICB9XG4gIGV4ZWN1dGUoKSB7IC8vIHByaXZhdGVcbiAgICB0aGlzLmVscy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5yZW1vdmUoKVxuICAgIH0pXG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuY2xlYXIoKVxuICB9XG4gIHJlZG8oKSB7XG4gICAgdGhpcy5leGVjdXRlKClcbiAgfVxuICB1bmRvKCkge1xuICAgIHRoaXMuZWxzLmZvckVhY2goKGVsZW1lbnQsIGlkeCkgPT4ge1xuICAgICAgY29uc3QgZWwgPSBlbGVtZW50LmVsKClcbiAgICAgIGlmICh0aGlzLm5leHRTaWJsaW5nc1tpZHhdKSB7XG4gICAgICAgIHRoaXMucGFyZW50c1tpZHhdLmluc2VydEJlZm9yZShlbCwgdGhpcy5uZXh0U2libGluZ3NbaWR4XSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFyZW50c1tpZHhdLmFwcGVuZENoaWxkKGVsKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHModGhpcy5lbHMpXG4gIH1cbn1cblxuLyoqXG4gKiBETW92ZVxuICogXG4gKiBkbW92ZSBlbGVtZW50c1xuICovXG5leHBvcnQgY2xhc3MgRE1vdmUgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgZWxzLCBkeCwgZHkpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgICB0aGlzLmR4ID0gZHhcbiAgICB0aGlzLmR5ID0gZHlcbiAgICB0aGlzLmVscyA9IGVsc1xuXG4gICAgdGhpcy5lbHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5kbW92ZSh0aGlzLmR4LCB0aGlzLmR5KVxuICAgIH0pXG4gIH1cbiAgc3RhdGljIG5hbWUoKSB7XG4gICAgcmV0dXJuICdkbW92ZSdcbiAgfVxuICByZWRvKCkge1xuICAgIHRoaXMuZWxzLmZvckVhY2goZWwgPT4ge1xuICAgICAgZWwuZG1vdmUodGhpcy5keCwgdGhpcy5keSlcbiAgICB9KVxuICB9XG4gIHVuZG8oKSB7XG4gICAgdGhpcy5lbHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5kbW92ZSgtdGhpcy5keCwgLXRoaXMuZHkpXG4gICAgfSlcbiAgfVxuICBhZnRlclJlZG8oKSB7XG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzKHRoaXMuZWxzKVxuICB9XG4gIGFmdGVyVW5kbygpIHtcbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHModGhpcy5lbHMpXG4gIH1cbn1cblxuLyoqXG4gKiBzZXRBdHRyXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXRBdHRyIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBjb25zdHJ1Y3RvcihlZGl0b3IsIGVscywgYXR0ck5hbWUsIHZhbCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICAgIGlmICghQXJyYXkuaXNBcnJheShlbHMpKSBlbHMgPSBbZWxzXVxuICAgIHRoaXMuZWxzID0gZWxzXG4gICAgdGhpcy5hdHRyTmFtZSA9IGF0dHJOYW1lXG4gICAgdGhpcy5iZWZvcmVWYWwgPSB0aGlzLmVscy5tYXAoZWwgPT4gZWwuZ2V0QXR0cihhdHRyTmFtZSkpXG4gICAgdGhpcy5hZnRlclZhbCA9IHZhbFxuXG4gICAgdGhpcy5lbHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5zZXRBdHRyKGF0dHJOYW1lLCB2YWwpXG4gICAgfSlcbiAgfVxuICBzdGF0aWMgbmFtZSgpIHtcbiAgICByZXR1cm4gJ3NldEF0dHInXG4gIH1cbiAgcmVkbygpIHtcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLnNldEF0dHIodGhpcy5hdHRyTmFtZSwgdGhpcy5hZnRlclZhbClcbiAgICB9KVxuICB9XG4gIHVuZG8oKSB7XG4gICAgdGhpcy5lbHMuZm9yRWFjaCgoZWwsIGkpID0+IHtcbiAgICAgIGVsLnNldEF0dHIodGhpcy5hdHRyTmFtZSwgdGhpcy5iZWZvcmVWYWxbaV0pXG4gICAgfSlcbiAgfVxufSIsIi8vIOW4uOmHj1xuXG5jb25zdCBOUyA9IHtcbiAgSFRNTDogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLFxuICBNQVRIOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCcsXG4gIFNFOiAnaHR0cDovL3N2Zy1lZGl0Lmdvb2dsZWNvZGUuY29tJyxcbiAgU1ZHOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICBYTElOSzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLFxuICBYTUw6ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnLFxuICBYTUxOUzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvJyAvLyBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvUkVDLXhtbC1uYW1lcy8jeG1sUmVzZXJ2ZWRcbn07XG5cbmV4cG9ydCB7XG4gIE5TLFxufSBcblxuXG5cbiIsImV4cG9ydCBjb25zdCBpc0RlYnVnID0gdHJ1ZVxuIiwiaW1wb3J0IHsgQWN0aXZlZEVsc01hbmFnZXIgfSBmcm9tIFwiLi9hY3RpdmVkRWxzTWFuYWdlclwiXG5pbXBvcnQgeyBFZGl0b3JFdmVudENvbnRleHQgfSBmcm9tIFwiLi9lZGl0b3JFdmVudENvbnRleHRcIlxuaW1wb3J0IHsgSHVkTWFuYWdlciB9IGZyb20gXCIuL2xheWVyL2h1ZE1hbmFnZXJcIlxuaW1wb3J0IHsgU2hvcnRjdXQgfSBmcm9tIFwiLi9zaG9ydGN1dFwiXG5cbmNsYXNzIEVkaXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2V0dGluZyA9IG51bGxcbiAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyID0gbnVsbFxuICAgIHRoaXMuem9vbU1hbmFnZXIgPSBudWxsXG4gICAgdGhpcy5hY3RpdmVkRWxzTWFuYWdlciA9IG5ldyBBY3RpdmVkRWxzTWFuYWdlcih0aGlzKVxuICAgIHRoaXMuc2hvcnRjdXQgPSBuZXcgU2hvcnRjdXQodGhpcylcblxuICAgIC8vIGNvbnN0IGNvbnRlbnRXaWR0aCA9IDQwMFxuICAgIC8vIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSAzMDBcbiAgICAvLyBjb25zdCBzdGFnZVdpZHRoID0gMTAwMCAvLyDmraPlnKjnuqDnu5Plkb3lkI1cbiAgICAvLyBjb25zdCBzdGFnZUhlaWdodCA9IDYwMFxuICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPSA4MDBcbiAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IDU1MFxuXG4gICAgY29uc3Qgdmlld3BvcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHZpZXdwb3J0LmlkID0gJ3ZpZXdwb3J0J1xuICAgIHZpZXdwb3J0LnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgIzAwMCdcbiAgICB2aWV3cG9ydC5zdHlsZS53aWR0aCA9IHZpZXdwb3J0V2lkdGggKyAncHgnXG4gICAgdmlld3BvcnQuc3R5bGUuaGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQgKyAncHgnXG4gICAgdGhpcy52aWV3cG9ydCA9IHZpZXdwb3J0XG4gICAgXG4gICAgY29uc3Qgc3ZnQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBzdmdDb250YWluZXIuaWQgPSAnc3ZnLWNvbnRhaW5lcidcbiAgICBzdmdDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNkZGQnXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLndpZHRoID0gdmlld3BvcnRXaWR0aCArICdweCdcbiAgICBzdmdDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQgKyAncHgnXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCdcbiAgICB0aGlzLnN2Z0NvbnRhaW5lciA9IHN2Z0NvbnRhaW5lclxuXG4gICAgY29uc3Qgc3ZnUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJylcbiAgICBzdmdSb290LmlkID0gJ3N2Zy1yb290J1xuICAgIHN2Z1Jvb3Quc2V0QXR0cmlidXRlKCd3aWR0aCcsIDEwMDApXG4gICAgc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDYwMClcbiAgICBzdmdSb290LnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgMTAwMCA2MDAnKVxuICAgIHRoaXMuc3ZnUm9vdCA9IHN2Z1Jvb3RcblxuICAgIGNvbnN0IHN2Z1N0YWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKVxuICAgIHN2Z1N0YWdlLmlkID0gJ3N2Zy1zdGFnZSdcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgNDAwKVxuICAgIHN2Z1N0YWdlLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgMzAwKVxuICAgIHN2Z1N0YWdlLnNldEF0dHJpYnV0ZSgneCcsIDMwMClcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ3knLCAxNTApXG4gICAgc3ZnU3RhZ2Uuc3R5bGUub3ZlcmZsb3cgPSAndmlzaWJsZSdcbiAgICB0aGlzLnN2Z1N0YWdlID0gc3ZnU3RhZ2VcblxuICAgIGNvbnN0IHN2Z0JnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJylcbiAgICBzdmdCZy5pZCA9ICdiYWNrZ3JvdW5kJ1xuICAgIC8vIHN2Z0JnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCA0MDApXG4gICAgLy8gc3ZnQmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAzMDApXG4gICAgc3ZnQmcuc2V0QXR0cmlidXRlKCd4JywgMClcbiAgICBzdmdCZy5zZXRBdHRyaWJ1dGUoJ3knLCAwKVxuXG4gICAgY29uc3QgYmdSZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdyZWN0JylcbiAgICBiZ1JlY3Quc2V0QXR0cmlidXRlKCd3aWR0aCcsICcxMDAlJylcbiAgICBiZ1JlY3Quc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpXG4gICAgYmdSZWN0LnNldEF0dHJpYnV0ZSgnZmlsbCcsICcjZmZmJylcblxuICAgIGNvbnN0IHN2Z0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2cnKVxuICAgIHN2Z0NvbnRlbnQuaWQgPSAnY29udGVudCdcbiAgICAvLyBzdmdDb250ZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCA0MDApXG4gICAgLy8gc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDMwMClcbiAgICBzdmdDb250ZW50LnNldEF0dHJpYnV0ZSgneCcsIDApXG4gICAgc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3knLCAwKVxuICAgIHRoaXMuc3ZnQ29udGVudCA9IHN2Z0NvbnRlbnRcblxuICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJylcbiAgICBsYXllci5pZCA9ICdsYXllci0xJ1xuICAgIHRoaXMuY3VycmVudExheWVyID0gbGF5ZXJcblxuICAgIHZpZXdwb3J0LmFwcGVuZENoaWxkKHN2Z0NvbnRhaW5lcilcbiAgICBzdmdDb250YWluZXIuYXBwZW5kQ2hpbGQoc3ZnUm9vdClcbiAgICBzdmdSb290LmFwcGVuZENoaWxkKHN2Z1N0YWdlKVxuXG4gICAgc3ZnU3RhZ2UuYXBwZW5kQ2hpbGQoc3ZnQmcpXG4gICAgc3ZnQmcuYXBwZW5kQ2hpbGQoYmdSZWN0KVxuICAgIHN2Z1N0YWdlLmFwcGVuZENoaWxkKHN2Z0NvbnRlbnQpXG4gICAgc3ZnQ29udGVudC5hcHBlbmRDaGlsZChsYXllcilcblxuXG4gICAgdGhpcy5odWRNYW5hZ2VyID0gbmV3IEh1ZE1hbmFnZXIoKVxuICAgIHRoaXMuaHVkTWFuYWdlci5tb3VudChzdmdTdGFnZSlcblxuICAgIC8vIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpXG4gIH1cbiAgbW91bnQoc2VsZWN0b3IpIHtcbiAgICBjb25zdCBtb3VudE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICAgIG1vdW50Tm9kZS5hcHBlbmRDaGlsZCh0aGlzLnZpZXdwb3J0KVxuICB9XG4gIGdldEN1cnJlbnRMYXllcigpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50TGF5ZXJcbiAgfVxuXG4gIHNldFRvb2xNYW5hZ2VyKHRvb2xNYW5hZ2VyKSB7XG4gICAgdGhpcy50b29sTWFuYWdlciA9IHRvb2xNYW5hZ2VyXG4gIH1cbiAgLy8gdG9vbCByZWxhdGl2ZWQgbWV0aG9kc1xuICBzZXRDdXJyZW50VG9vbChuYW1lKSB7XG4gICAgdGhpcy50b29sTWFuYWdlci5zZXRDdXJyZW50VG9vbChuYW1lKVxuICB9XG4gIHJlZ2lzdGVyVG9vbCh0b29sKSB7XG4gICAgdGhpcy50b29sTWFuYWdlci5yZWdpc3RlclRvb2wodG9vbClcbiAgfVxuICBzZXRTZXR0aW5nKHNldHRpbmcpIHtcbiAgICB0aGlzLnNldHRpbmcgPSBzZXR0aW5nXG4gIH1cblxuICAvLyDlkb3ku6Tnm7jlhbNcbiAgc2V0Q29tbWFuZE1hbmFnZXIoY29tbWFuZE1hbmFnZXIpIHtcbiAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyID0gY29tbWFuZE1hbmFnZXJcbiAgfVxuICBleGVjdXRlQ29tbWFuZChuYW1lLCAuLi5wYXJhbXMpIHtcbiAgICBpZiAobmFtZSA9PSAndW5kbycpIHtcbiAgICAgIHRoaXMuY29tbWFuZE1hbmFnZXIudW5kbygpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKG5hbWUgPT0gJ3JlZG8nKSB7XG4gICAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyLnJlZG8oKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuY29tbWFuZE1hbmFnZXIuZXhlY3V0ZShuYW1lLCAuLi5wYXJhbXMpXG4gIH1cblxuICAvLyB6b29tXG4gIHNldFpvb21NYW5hZ2VyKHpvb21NYW5hZ2VyKSB7XG4gICAgem9vbU1hbmFnZXIuc2V0RWRpdG9yKHRoaXMpXG4gICAgdGhpcy56b29tTWFuYWdlciA9IHpvb21NYW5hZ2VyXG4gIH1cbiAgZ2V0Wm9vbSgpIHsgLy8g5bCB6KOFXG4gICAgcmV0dXJuIHRoaXMuem9vbU1hbmFnZXIuZ2V0Wm9vbSgpXG4gIH1cblxuICBnZXRTY3JvbGwoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHRoaXMuc3ZnQ29udGFpbmVyLnNjcm9sbExlZnQsXG4gICAgICB5OiB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxUb3AsXG4gICAgfVxuICB9XG4gIHNldFNjcm9sbCh4LCB5KSB7XG4gICAgdGhpcy5zdmdDb250YWluZXIuc2Nyb2xsTGVmdCA9IHhcbiAgICB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxUb3AgPSB5XG4gIH1cbiAgZ2V0Q29udGVudE9mZnNldCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogdGhpcy5zdmdTdGFnZS5nZXRBdHRyaWJ1dGUoJ3gnKSxcbiAgICAgIHk6IHRoaXMuc3ZnU3RhZ2UuZ2V0QXR0cmlidXRlKCd5JyksXG4gICAgfVxuICB9XG5cbiAgaXNDb250ZW50RWxlbWVudChlbCkge1xuICAgIHdoaWxlIChlbCkge1xuICAgICAgaWYgKGVsLnBhcmVudEVsZW1lbnQgPT0gdGhpcy5zdmdDb250ZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICBpZiAoZWwucGFyZW50RWxlbWVudCA9PSB0aGlzLnN2Z1Jvb3QpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgICBlbCA9IGVsLnBhcmVudEVsZW1lbnRcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRWRpdG9yXG4iLCJcbi8qKlxuICogY29udGV4dCBjbGFzc1xuICogXG4gKiB1c2VkIGZvciB0b29sIGV2ZW50XG4gKi9cblxuZXhwb3J0IGNsYXNzIEVkaXRvckV2ZW50Q29udGV4dCB7XG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgZSkge1xuICAgIHRoaXMubW91c2VQcmVzc2VkID0gZmFsc2VcbiAgICB0aGlzLm9yaWdpbkV2ZW50ID0gZVxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gICAgdGhpcy5pc0VuZEluc2lkZSA9IGZhbHNlXG5cbiAgICB0aGlzLnN0YXJ0WCA9IDBcbiAgICB0aGlzLnN0YXJ0WSA9IDBcblxuICAgIHRoaXMub2Zmc2V0WCA9IDBcbiAgICB0aGlzLm9mZnNldFkgPSAwXG5cbiAgICB0aGlzLnN0YXJ0Q2xpZW50WCA9IDAgLy8gdXNlZCB0byBjYWxjIGR4IGFuZCBkeS5cbiAgICB0aGlzLnN0YXJ0Q2xpZW50WSA9IDBcbiAgICB0aGlzLmR4ID0gMFxuICAgIHRoaXMuZHkgPSAwXG5cbiAgICB0aGlzLnNldFN0YXJ0UG9zKClcbiAgfVxuICBzZXRPcmlnaW5FdmVudChlKSB7XG4gICAgdGhpcy5vcmlnaW5FdmVudCA9IGVcbiAgfVxuICBzZXRTdGFydFBvcygpIHtcbiAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMuZ2V0UG9zKClcblxuICAgIHRoaXMuc3RhcnRYID0geFxuICAgIHRoaXMuc3RhcnRZID0geVxuXG4gICAgdGhpcy5zdGFydENsaWVudFggPSB0aGlzLm9yaWdpbkV2ZW50LmNsaWVudFhcbiAgICB0aGlzLnN0YXJ0Q2xpZW50WSA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WVxuICB9XG4gIHJlbGVhc2VNb3VzZSgpIHtcbiAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IGZhbHNlXG4gIH1cbiAgcHJlc3NNb3VzZSgpIHtcbiAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IHRydWVcbiAgfVxuICBnZXRQb3MoKSB7XG4gICAgY29uc3Qgem9vbSA9IHRoaXMuZWRpdG9yLmdldFpvb20oKVxuICAgIGNvbnN0IHt4LCB5fSA9IHRoaXMuZWRpdG9yLmdldENvbnRlbnRPZmZzZXQoKVxuICAgIHJldHVybiB7IFxuICAgICAgeDogdGhpcy5vcmlnaW5FdmVudC5vZmZzZXRYIC8gem9vbSAtIHgsIFxuICAgICAgeTogdGhpcy5vcmlnaW5FdmVudC5vZmZzZXRZIC8gem9vbSAtIHksXG4gICAgfVxuICB9XG4gIGdldFN0YXJ0UG9zKCkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiB0aGlzLnN0YXJ0WCxcbiAgICAgIHk6IHRoaXMuc3RhcnRZLFxuICAgIH1cbiAgfVxuICAvLyB3aXRob3V0IGNhbGMgd2l0aCB6b29tIHZhbHVlXG4gIGdldERpZmZQb3MoKSB7XG4gICAgY29uc3QgeCA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WCAtIHRoaXMuc3RhcnRDbGllbnRYXG4gICAgY29uc3QgeSA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WSAtIHRoaXMuc3RhcnRDbGllbnRZXG4gICAgcmV0dXJuIHsgeCwgeSB9XG4gIH1cblxufSIsIlxuLyoqXG4gKiDlr7kgU1ZHIOWFg+e0oOeahOeugOWNleWwgeijhVxuICovXG5cbmV4cG9ydCBjbGFzcyBGRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZWxfID0gbnVsbFxuICB9XG4gIGVsKCkge1xuICAgIHJldHVybiB0aGlzLmVsX1xuICB9XG4gIHNldEF0dHIocHJvcCwgdmFsKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxfLnNldEF0dHJpYnV0ZShwcm9wLCB2YWwpXG4gIH1cbiAgZ2V0QXR0cihwcm9wKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxfLmdldEF0dHJpYnV0ZShwcm9wKVxuICB9XG4gIGdldEJCb3goKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxfLmdldEJCb3goKVxuICB9XG4gIHJlbW92ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbF8ucmVtb3ZlKClcbiAgfVxuIH0iLCJpbXBvcnQgeyBSZWN0IH0gZnJvbSBcIi4vcmVjdFwiXG5cblxuLyoqXG4gKiBGU1ZHXG4gKiBcbiAqIHNpbXBsZSBTVkdFbGVtZW50IGVuY2Fwc3VsYXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IEZTVkcgPSB7XG4gIFJlY3QsXG59IiwiXG4vKipcbiAqIOWvuSByZWN0IOWFg+e0oOeahOeugOWNleWwgeijhVxuICovXG5cbmltcG9ydCB7IE5TIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiXG5pbXBvcnQgeyBGRWxlbWVudCB9IGZyb20gXCIuL2Jhc2VFbGVtZW50XCJcblxuZXhwb3J0IGNsYXNzIFJlY3QgZXh0ZW5kcyBGRWxlbWVudCB7XG4gIC8vIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlcik7XG4gIC8vIGNvbnN0cnVjdG9yKGVsOiBTVkdFbGVtZW50KTtcbiAgY29uc3RydWN0b3IoeCwgeSwgdywgaCkge1xuICAgIHN1cGVyKClcbiAgICBpZiAodHlwZW9mIHggPT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMuZWxfID0geFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsXyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdyZWN0JylcbiAgICAgIHRoaXMuc2V0QXR0cigneCcsIHgpXG4gICAgICB0aGlzLnNldEF0dHIoJ3knLCB5KVxuICAgICAgdGhpcy5zZXRBdHRyKCd3aWR0aCcsIHcpXG4gICAgICB0aGlzLnNldEF0dHIoJ2hlaWdodCcsIGgpXG4gICAgfVxuICB9XG4gIGdldFBvcygpIHtcbiAgICBjb25zdCB4ID0gcGFyc2VGbG9hdCh0aGlzLmdldEF0dHIoJ3gnKSlcbiAgICBjb25zdCB5ID0gcGFyc2VGbG9hdCh0aGlzLmdldEF0dHIoJ3knKSlcbiAgICByZXR1cm4geyB4LCB5IH1cbiAgfVxuICBkbW92ZShkeCwgZHkpIHtcbiAgICBjb25zdCBwb3MgPSB0aGlzLmdldFBvcygpXG4gICAgdGhpcy5zZXRBdHRyKCd4JywgcG9zLnggKyBkeClcbiAgICB0aGlzLnNldEF0dHIoJ3knLCBwb3MueSArIGR5KVxuICB9XG59IiwiLyoqXG4gKiBndWlkZSBsaW5lIGxheWVyXG4gKi9cblxuaW1wb3J0IHsgT3V0bGluZUh1ZCB9IGZyb20gXCIuL291dGxpbmVIdWRcIjtcbmltcG9ydCB7IFNlbGVjdEFyZWEgfSBmcm9tIFwiLi9zZWxlY3RBcmVhXCI7XG5jb25zdCB7IE5TIH0gPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzXCIpO1xuXG5leHBvcnQgY2xhc3MgSHVkTWFuYWdlcntcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAnZycpXG4gICAgdGhpcy5jb250YWluZXIuaWQgPSAnaHVkcydcblxuICAgIHRoaXMuc2VsZWN0QXJlYSA9IG5ldyBTZWxlY3RBcmVhKHRoaXMuY29udGFpbmVyKVxuICAgIHRoaXMub3V0bGluZUh1ZCA9IG5ldyBPdXRsaW5lSHVkKHRoaXMuY29udGFpbmVyKVxuICB9XG4gIG1vdW50KGVsKSB7XG4gICAgZWwuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpXG4gIH1cbn1cblxuIiwiXG5cbiAgXG5jb25zdCB7IE5TIH0gPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzXCIpO1xuXG4vKipcbiAqIDxyZWN0PiBvdXRsaW5lXG4gKi9cbmV4cG9ydCBjbGFzcyBPdXRsaW5lSHVkIHtcbiAgY29uc3RydWN0b3IocGFyZW50KSB7XG4gICAgdGhpcy54ID0gMFxuICAgIHRoaXMueSA9IDBcbiAgICB0aGlzLncgPSAwXG4gICAgdGhpcy5oID0gMFxuXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAnZycpXG4gICAgdGhpcy5jb250YWluZXIuaWQgPSAnb3V0bGluZS1odWQnXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKVxuXG4gICAgdGhpcy5vdXRsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ3BhdGgnKVxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJyNmMDQnKVxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3ZlY3Rvci1lZmZlY3QnLCAnbm9uLXNjYWxpbmctc3Ryb2tlJylcblxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMub3V0bGluZSlcbiAgfVxuICBjbGVhcigpIHtcbiAgICAvLyBwYXJlbnQuaW5uZXJIVE1MID0gJydcbiAgICB0aGlzLm91dGxpbmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICB9XG4gIGRyYXdSZWN0KHgsIHksIHcsIGgpIHtcbiAgICB0aGlzLnggPSB4XG4gICAgdGhpcy55ID0geVxuICAgIHRoaXMudyA9IHdcbiAgICB0aGlzLmggPSBoXG5cbiAgICAvLyB3aHkgZG9uJ3QgSSB1c2UgcmVjdCwganVzdCBzb2x2ZSB0aGUgY29uZGl0aW9uIHdoZW4gd2lkdGggb3IgaGVpZ2h0IGlzIDAgdGhlIG91dGxpbmUgaXMgZGlzYXBwZXJcbiAgICBjb25zdCBkID0gYE0gJHt4fSAke3l9IEwgJHt4K3d9ICR7eX0gTCAke3grd30gJHt5K2h9IEwgJHt4fSAke3kraH0gWmBcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdkJywgZClcbiAgICB0aGlzLm91dGxpbmUuc3R5bGUuZGlzcGxheSA9ICcnXG4gIH1cbiAgZ2V0V2lkdGgoKSB7IHJldHVybiB0aGlzLncgfVxuICBnZXRIZWlnaHQoKSB7IHJldHVybiB0aGlzLmggfVxuICBnZXRYKCkgeyByZXR1cm4gdGhpcy54IH1cbiAgZ2V0WSgpIHsgcmV0dXJuIHRoaXMueSB9XG59IiwiXG5jb25zdCB7IE5TIH0gPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzXCIpO1xuXG4vKipcbiAqIHNlbGVjdCBhcmVhXG4gKi9cbmV4cG9ydCBjbGFzcyBTZWxlY3RBcmVhIHtcbiAgY29uc3RydWN0b3IocGFyZW50KSB7XG4gICAgdGhpcy54ID0gMFxuICAgIHRoaXMueSA9IDBcbiAgICB0aGlzLncgPSAwXG4gICAgdGhpcy5oID0gMFxuXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAnZycpXG4gICAgdGhpcy5jb250YWluZXIuaWQgPSAnc2VsZWN0LWFyZWEnXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKVxuXG4gICAgdGhpcy5vdXRsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ3BhdGgnKVxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJyMwNTQnKVxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3ZlY3Rvci1lZmZlY3QnLCAnbm9uLXNjYWxpbmctc3Ryb2tlJylcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UtZGFzaGFycmF5JywgJzRweCcpXG5cbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLm91dGxpbmUpXG4gIH1cbiAgY2xlYXIoKSB7XG4gICAgLy8gcGFyZW50LmlubmVySFRNTCA9ICcnXG4gICAgdGhpcy5vdXRsaW5lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgfVxuICBkcmF3UmVjdCh4LCB5LCB3LCBoKSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLncgPSB3XG4gICAgdGhpcy5oID0gaFxuXG4gICAgLy8gd2h5IGRvbid0IEkgdXNlIHJlY3QsIGp1c3Qgc29sdmUgdGhlIGNvbmRpdGlvbiB3aGVuIHdpZHRoIG9yIGhlaWdodCBpcyAwIHRoZSBvdXRsaW5lIGlzIGRpc2FwcGVyXG4gICAgY29uc3QgZCA9IGBNICR7eH0gJHt5fSBMICR7eCt3fSAke3l9IEwgJHt4K3d9ICR7eStofSBMICR7eH0gJHt5K2h9IFpgXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZCcsIGQpXG5cbiAgICAvKiB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd4JywgeClcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd5JywgeSlcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHcpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaCkgKi9cbiAgICB0aGlzLm91dGxpbmUuc3R5bGUuZGlzcGxheSA9ICcnXG4gIH1cbiAgZ2V0V2lkdGgoKSB7IHJldHVybiB0aGlzLncgfVxuICBnZXRIZWlnaHQoKSB7IHJldHVybiB0aGlzLmggfVxuICBnZXRYKCkgeyByZXR1cm4gdGhpcy54IH1cbiAgZ2V0WSgpIHsgcmV0dXJuIHRoaXMueSB9XG59IiwiXG5pbXBvcnQgeyBnZXRCb3hCeTJwb2ludHMgfSBmcm9tIFwiLi4vdXRpbC9tYXRoXCJcblxuY2xhc3MgQWRkUmVjdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZWRpdG9yID0gbnVsbFxuICB9XG4gIG5hbWUoKSB7XG4gICAgcmV0dXJuICdhZGRSZWN0J1xuICB9XG4gIHNldEVkaXRvcihlZGl0b3IpIHsgLy8g5L6d6LWW5rOo5YWlXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgfVxuICBzdGFydChjdHgpIHt9XG4gIG1vdmUoY3R4KSB7XG4gICAgY29uc3QgeyB4OiBlbmRYLCB5OiBlbmRZIH0gPSBjdHguZ2V0UG9zKClcbiAgICBjb25zdCB7IHg6IHN0YXJ0WCwgeTogc3RhcnRZIH0gPSBjdHguZ2V0U3RhcnRQb3MoKVxuICAgIGNvbnN0IHsgeCwgeSwgdywgaCB9ID0gZ2V0Qm94QnkycG9pbnRzKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZKVxuICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIub3V0bGluZUh1ZC5kcmF3UmVjdCh4LCB5LCB3LCBoKVxuICB9XG4gIGVuZChjdHgpIHtcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuY2xlYXIoKVxuXG4gICAgY29uc3QgeyB4OiBlbmRYLCB5OiBlbmRZIH0gPSBjdHguZ2V0UG9zKClcbiAgICBjb25zdCB7IHg6IHN0YXJ0WCwgeTogc3RhcnRZIH0gPSBjdHguZ2V0U3RhcnRQb3MoKVxuICAgIGNvbnN0IHsgeCwgeSwgdywgaCB9ID0gZ2V0Qm94QnkycG9pbnRzKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZKVxuICAgIGlmICh3IDwgMiAmJiBoIDwgMikge1xuICAgICAgLy8gVE9ETzogb3BlbiBhIGRpYWxvZyB0byBpbnB1dCB3aWR0aCBhbmQgaGVpZ2h0XG4gICAgICBjb25zb2xlLmxvZygnd2lkdGggYW5kIGhlaWdodCBib3RoIGxlc3MgZXF1YWwgdG8gMu+8jGRyYXdpbmcgbm90aGluZycpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5lZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ2FkZFJlY3QnLCB4LCB5LCB3LCBoKVxuICB9XG4gIC8vIG1vdXNlZG93biBvdXRzaWRlIHZpZXdwb3J0XG4gIGVuZE91dHNpZGUoKSB7XG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lSHVkLmNsZWFyKClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBZGRSZWN0IiwiXG5leHBvcnQgY2xhc3MgRHJhZ0NhbnZhcyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc3RhcnRPZmZzZXRYID0gMFxuICAgIHRoaXMuc3RhcnRPZmZzZXRZID0gMFxuICB9XG4gIG5hbWUoKSB7XG4gICAgcmV0dXJuICdkcmFnQ2FudmFzJ1xuICB9XG4gIHNldEVkaXRvcihlZGl0b3IpIHsgLy8g5L6d6LWW5rOo5YWlXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgfVxuICBiZWZvcmVBY3RpdmUoKSB7XG4gICAgLy8gZG8gc29tZXRoaW5nIGJlZm9yZSBzd2l0Y2ggdG8gY3VycmVudCB0b29sXG4gIH1cbiAgc3RhcnQoY3R4KSB7XG4gICAgY29uc3Qgc2Nyb2xsID0gdGhpcy5lZGl0b3IuZ2V0U2Nyb2xsKClcbiAgICB0aGlzLnN0YXJ0T2Zmc2V0WCA9IHNjcm9sbC54XG4gICAgdGhpcy5zdGFydE9mZnNldFkgPSBzY3JvbGwueVxuICB9XG4gIG1vdmUoY3R4KSB7XG4gICAgY29uc3Qgem9vbSA9IHRoaXMuZWRpdG9yLmdldFpvb20oKVxuICAgIGNvbnN0IHsgeDogZHgsIHk6IGR5IH0gPSBjdHguZ2V0RGlmZlBvcygpXG4gICAgdGhpcy5lZGl0b3Iuc2V0U2Nyb2xsKHRoaXMuc3RhcnRPZmZzZXRYIC0gZHgsIHRoaXMuc3RhcnRPZmZzZXRZIC0gZHkpXG4gIH1cbiAgZW5kKCkge31cbiAgZW5kT3V0c2lkZSgpIHt9XG59XG4iLCJpbXBvcnQgeyBGU1ZHIH0gZnJvbSBcIi4uL2VsZW1lbnRcIlxuaW1wb3J0IHsgZ2V0Qm94QnkycG9pbnRzIH0gZnJvbSBcIi4uL3V0aWwvbWF0aFwiXG5cbi8qKlxuICogc2VsZWN0XG4gKiBcbiAqIOatpOaooeWdl+mdnuW4uOWkjeadglxuICogXG4gKiAxLiDpvKDmoIfmjInkuIvml7bvvIzpgInkuK3ljZXkuKrlhYPntKBcbiAqIDIuIOm8oOagh+aMieS4i+S4uuepuu+8jOaLluaLveaXtuS6p+eUn+mAieS4reahhu+8jOWPr+S7pemAieaLqeWkmuS4quWFg+e0oFxuICogMy4g6YCJ5Lit5Y2V5Liq77yI5oiW6YCJ5Yy66YCJ5Lit5aSa5Liq77yJIOe8qeaUviDnrYnmjqfliLbngrnvvIzmi5bmi73mlLnlj5jlrr3pq5hcbiAqIDMuIOWIh+aWreWIgOi/meS4quW3peWFt+aXtu+8jOa/gOa0u+eahOWFg+e0oOi/m+WFpeiiq+mAieS4reeKtuaAge+8iOi9ruW7k+e6vyvmjqfliLbngrnvvInjgIJcbiAqIDQuIOmAieWMuuWSjOWFg+e0oOebuOS6pOeahOWIpOWumlxuICogNS4g5r+A5rS75YWD57Sg5aaC5L2V5L+d5a2Y77yM5L+d5a2Y5Yiw5ZOq6YeMXG4gKi9cbmV4cG9ydCBjbGFzcyBTZWxlY3Qge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcbiAgICB0aGlzLnNlbGVjdGVkRWxzID0gW11cblxuICAgIHRoaXMub3V0bGluZVN0YXJ0WCA9IDBcbiAgICB0aGlzLm91dGxpbmVTdGFydFkgPSAwXG4gIH1cbiAgbmFtZSgpIHtcbiAgICByZXR1cm4gJ3NlbGVjdCdcbiAgfVxuICBzZXRFZGl0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgfVxuICBoYXNTZWxlY3RlZEVsc1doZW5TdGFydCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEVscy5sZW5ndGggPiAwXG4gIH1cbiAgc3RhcnQoY3R4KSB7XG4gICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGN0eC5vcmlnaW5FdmVudC50YXJnZXRcbiAgICBpZiAoIXRoaXMuZWRpdG9yLmlzQ29udGVudEVsZW1lbnQodGFyZ2V0RWxlbWVudCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldEZFbGVtZW50ID0gbmV3IEZTVkcuUmVjdCh0YXJnZXRFbGVtZW50KSAvLyDmmoLml7blj6rmmK8gcmVjdCBUT0RPOiDmlLnkuLrpgJrnlKjlhpnms5VcbiAgICB0aGlzLnNlbGVjdGVkRWxzID0gWyB0YXJnZXRGRWxlbWVudCBdIC8vIOm8oOagh+aMieS4i+aXtu+8jOWwsemAieS4reS6huS4gOS4quWFg+e0oFxuICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KHRhcmdldEZFbGVtZW50LmdldEF0dHIoJ3gnKSlcbiAgICBjb25zdCB5ID0gcGFyc2VGbG9hdCh0YXJnZXRGRWxlbWVudC5nZXRBdHRyKCd5JykpXG4gICAgY29uc3QgdyA9IHBhcnNlRmxvYXQodGFyZ2V0RkVsZW1lbnQuZ2V0QXR0cignd2lkdGgnKSlcbiAgICBjb25zdCBoID0gcGFyc2VGbG9hdCh0YXJnZXRGRWxlbWVudC5nZXRBdHRyKCdoZWlnaHQnKSlcblxuICAgIHRoaXMub3V0bGluZVN0YXJ0WCA9IHhcbiAgICB0aGlzLm91dGxpbmVTdGFydFkgPSB5XG5cbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuZHJhd1JlY3QoeCwgeSwgdywgaClcbiAgfVxuICBtb3ZlKGN0eCkge1xuICAgIGlmICghdGhpcy5oYXNTZWxlY3RlZEVsc1doZW5TdGFydCgpKSB7IC8vIGRyYXcgc2VsZWN0aW5nIGFyZWFcbiAgICAgIC8vIHNlbGVjdCBubyBlbGVtZW50LCBkcmF3IHNlbGVjdCByZWN0XG4gICAgICBjb25zdCB7IHg6IGVuZFgsIHk6IGVuZFkgfSA9IGN0eC5nZXRQb3MoKVxuICAgICAgY29uc3QgeyB4OiBzdGFydFgsIHk6IHN0YXJ0WSB9ID0gY3R4LmdldFN0YXJ0UG9zKClcbiAgICAgIGNvbnN0IHsgeCwgeSwgdywgaCB9ID0gZ2V0Qm94QnkycG9pbnRzKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZKVxuICAgICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5zZWxlY3RBcmVhLmRyYXdSZWN0KHgsIHksIHcsIGgpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB7IHg6IGR4LCB5OiBkeSB9ID0gY3R4LmdldERpZmZQb3MoKVxuICAgIGNvbnN0IG91dGxpbmVIdWQgPSB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWRcbiAgICBjb25zdCB3ID0gb3V0bGluZUh1ZC5nZXRXaWR0aCgpXG4gICAgY29uc3QgaCA9IG91dGxpbmVIdWQuZ2V0SGVpZ2h0KClcbiAgICBvdXRsaW5lSHVkLmRyYXdSZWN0KHRoaXMub3V0bGluZVN0YXJ0WCArIGR4LCB0aGlzLm91dGxpbmVTdGFydFkgKyBkeSwgdywgaClcbiAgfVxuICBlbmQoY3R4KSB7XG4gICAgaWYgKCF0aGlzLmhhc1NlbGVjdGVkRWxzV2hlblN0YXJ0KCkpIHsgLy8gZmluaXNoZWQgZHJhd24gc2VsZWN0aW5nIGFyZWFcbiAgICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIuc2VsZWN0QXJlYS5jbGVhcigpXG4gICAgICAvLyBUT0RPOiBhY3RpdmUgZnJhbWUgYnkgc2VsZWN0IHJlY3QuXG4gICAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5jbGVhcigpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lSHVkLmNsZWFyKClcblxuICAgIFxuICAgIGNvbnN0IHsgeDogZHgsIHk6IGR5IH0gPSBjdHguZ2V0RGlmZlBvcygpXG4gICAgdGhpcy5lZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ2Rtb3ZlJywgdGhpcy5zZWxlY3RlZEVscywgZHgsIGR5KVxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVscyh0aGlzLnNlbGVjdGVkRWxzKSAvLyBzZXQgZ2xvYmFsIGFjdGl2ZWQgZWxlbWVudHNcbiAgICB0aGlzLnNlbGVjdGVkRWxzID0gW11cbiAgfVxuICAvLyBtb3VzZWRvd24gb3V0c2lkZSB2aWV3cG9ydFxuICBlbmRPdXRzaWRlKCkge1xuICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIub3V0bGluZUh1ZC5jbGVhcigpXG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5zZWxlY3RBcmVhLmNsZWFyKClcbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5jbGVhcigpXG4gICAgdGhpcy5zZWxlY3RlZEVscyA9IFtdXG4gIH1cbn1cbiIsIi8qKiB6b29tICovXG5cbmNvbnN0IHsgZ2V0Vmlld0JveCB9ID0gcmVxdWlyZShcIi4uL3V0aWwvc3ZnXCIpXG5cbmV4cG9ydCBjbGFzcyBab29tTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZWRpdG9yID0gbnVsbFxuICB9XG4gIHNldEVkaXRvcihlZGl0b3IpIHtcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICB9XG4gIGdldFpvb20oKSB7XG4gICAgY29uc3QgYWN0dWxXaWR0aCA9IHBhcnNlRmxvYXQodGhpcy5lZGl0b3Iuc3ZnUm9vdC5nZXRBdHRyaWJ1dGUoJ3dpZHRoJykpXG4gICAgY29uc3Qgdmlld0JveCA9IGdldFZpZXdCb3godGhpcy5lZGl0b3Iuc3ZnUm9vdClcbiAgICBjb25zdCB6b29tID0gYWN0dWxXaWR0aCAvIHZpZXdCb3gud1xuICAgIHJldHVybiB6b29tXG4gIH1cbiAgc2V0Wm9vbSh6b29tKSB7XG4gICAgY29uc29sZS5sb2coem9vbSlcbiAgICBjb25zdCB2aWV3Qm94ID0gZ2V0Vmlld0JveCh0aGlzLmVkaXRvci5zdmdSb290KVxuICAgIGNvbnN0IHdpZHRoID0gdmlld0JveC53ICogem9vbVxuICAgIGNvbnN0IGhlaWdodCA9IHZpZXdCb3guaCAqIHpvb21cbiAgICB0aGlzLmVkaXRvci5zdmdSb290LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aClcbiAgICB0aGlzLmVkaXRvci5zdmdSb290LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaGVpZ2h0KVxuICB9XG4gIHpvb21JbigpIHtcbiAgICBjb25zdCBjdXJyZW50Wm9vbSA9IHRoaXMuZ2V0Wm9vbSgpXG4gICAgdGhpcy5zZXRab29tKGN1cnJlbnRab29tICsgMC4xKVxuICB9XG4gIHpvb21PdXQoKSB7XG4gICAgY29uc3QgY3VycmVudFpvb20gPSB0aGlzLmdldFpvb20oKVxuICAgIHRoaXMuc2V0Wm9vbShjdXJyZW50Wm9vbSAtIDAuMSlcbiAgfVxufSIsIlxuZXhwb3J0IGNsYXNzIEVkaXRvclNldHRpbmcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNldHRpbmcgPSB7XG4gICAgICAvLyBmaWxsOiAnI2ZmZicsXG4gICAgICAvLyBzdHJva2U6ICcjMDAwJyxcbiAgICAgIC8vIHN0cm9rZVdpZHRoOiAnMnB4JyxcblxuICAgICAgLy8gb3V0bGluZVdpZHRoXG4gICAgICAvLyBvdXRsaW5lQ29sb3JcbiAgICB9XG4gICAgdGhpcy5iaW5kZWRFdmVudEZucyA9IHt9XG4gICAgdGhpcy5zZXRGaWxsKCcjZmZmJylcbiAgICB0aGlzLnNldFN0cm9rZSgnIzAwMCcpXG4gICAgdGhpcy5zZXQoJ3N0cm9rZVdpZHRoJywgJzFweCcpXG4gIH1cbiAgc2V0RmlsbCh2YWwpIHtcbiAgICB0aGlzLnNldCgnZmlsbCcsIHZhbClcbiAgfVxuICBzZXRTdHJva2UodmFsKSB7XG4gICAgdGhpcy5zZXQoJ3N0cm9rZScsIHZhbClcbiAgfVxuICBzZXQobmFtZSwgdmFsKSB7XG4gICAgdGhpcy5zZXR0aW5nW25hbWVdID0gdmFsXG5cbiAgICBjb25zdCB0b0NhbGxGbnMgPSB0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdXG4gICAgaWYgKHRvQ2FsbEZucykge1xuICAgICAgdG9DYWxsRm5zLmZvckVhY2goZm4gPT4ge1xuICAgICAgICBmbih2YWwpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBnZXQobmFtZSkge1xuICAgIHJldHVybiB0aGlzLnNldHRpbmdbbmFtZV1cbiAgfVxuICBiaW5kRXZlbnQobmFtZSwgZm4pIHtcbiAgICBpZiAoIXRoaXMuYmluZGVkRXZlbnRGbnNbbmFtZV0pIHtcbiAgICAgIHRoaXMuYmluZGVkRXZlbnRGbnNbbmFtZV0gPSBbXVxuICAgIH1cbiAgICB0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdLnB1c2goZm4pXG4gIH1cbiAgcmVtb3ZlRXZlbnQobmFtZSwgZm4pIHtcbiAgICBpZiAoIXRoaXMuYmluZGVkRXZlbnRGbnNbbmFtZV0pIHJldHVybiBmYWxzZVxuXG4gICAgY29uc3QgcmVtb3ZlRm5JZHggPSB0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdLmZpbmRJbmRleChmbilcbiAgICBpZiAocmVtb3ZlRm5JZHggPT09IC0xKSByZXR1cm4gZmFsc2VcbiAgICB0aGlzLmJpbmRlZEV2ZW50Rm5zLnNwbGljZShyZW1vdmVGbklkeCwgMSlcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG59IiwiaW1wb3J0IHsgaXNEZWJ1ZyB9IGZyb20gXCIuL2RldkNvbmZpZ1wiXG5cblxuZXhwb3J0IGNsYXNzIFNob3J0Y3V0IHtcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgICB0aGlzLnJlZ2lzdGVyZWRGbnMgPSB7fVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcbiAgICAgIGNvbnN0IHByZXNzS2V5TmFtZSA9IGdldFByZXNzS2V5TmFtZShlKVxuICAgICAgY29uc3QgZm4gPSB0aGlzLnJlZ2lzdGVyZWRGbnNbcHJlc3NLZXlOYW1lXVxuICAgICAgaWYgKGZuKSB7XG4gICAgICAgIC8qKiBkZWJ1ZyAqL1xuICAgICAgICBpZihpc0RlYnVnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocHJlc3NLZXlOYW1lKVxuICAgICAgICB9XG4gICAgICAgIC8qKiBkZWJ1ZyBlbmQgKi9cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGZuLmZuKGUpXG4gICAgICB9XG4gICAgICBcbiAgICB9LCBmYWxzZSlcbiAgfVxuICAvLyB0aGlzLnJlZ2lzdGVyKCd1bmRvJywgJ0N0cmwrWicsICgpID0+IHsgZWRpdG9yLmV4ZWNDb21tYW5kKCd1bmRvJykgfSlcbiAgcmVnaXN0ZXIoY21kTmFtZSwgc2hvcnRjdXROYW1lLCBmbikge1xuICAgIC8vIFRPRE86IHZhbGlkIHNob3J0Y3V0TmFtZVxuICAgIHRoaXMucmVnaXN0ZXJlZEZuc1tzaG9ydGN1dE5hbWVdID0geyBjbWROYW1lLCBmbiB9XG4gICAgXG4gIH1cbiAgZm9ybWF0UHJpbnQoKSB7XG4gICAgY29uc3QgYXJyID0gW11cbiAgICBmb3IgKGxldCBzaG9ydGN1dE5hbWUgaW4gdGhpcy5yZWdpc3RlcmVkRm5zKSB7XG4gICAgICBjb25zdCBjbWROYW1lID0gdGhpcy5yZWdpc3RlcmVkRm5zW3Nob3J0Y3V0TmFtZV0uY21kTmFtZVxuICAgICAgYXJyLnB1c2goY21kTmFtZSArICc6ICcgKyBzaG9ydGN1dE5hbWUpXG4gICAgfVxuICAgIHJldHVybiBhcnIuam9pbignLCAnKVxuICB9XG4gIFxufVxuXG5mdW5jdGlvbiBnZXRQcmVzc0tleU5hbWUoZSkge1xuICBjb25zdCBwcmVzc2VkS2V5cyA9IFtdXG4gIGlmIChlLmN0cmxLZXkpIHByZXNzZWRLZXlzLnB1c2goJ0N0cmwnKVxuICBpZiAoZS5tZXRhS2V5KSBwcmVzc2VkS2V5cy5wdXNoKCdDbWQnKVxuICBpZiAoZS5zaGlmdEtleSkgcHJlc3NlZEtleXMucHVzaCgnU2hpZnQnKVxuICAvLyBvbmx5IGNoZWNrIEF+WlxuICAvLyBUT0RPOiByZXNvbHZlIGFsbCBrZXlcbiAgaWYgKC9LZXkuLy50ZXN0KGUuY29kZSkpIHtcbiAgICBwcmVzc2VkS2V5cy5wdXNoKGUuY29kZVtlLmNvZGUubGVuZ3RoIC0gMV0pXG4gIH1cbiAgZWxzZSB7XG4gICAgcHJlc3NlZEtleXMucHVzaChlLmNvZGUpXG4gIH1cbiAgY29uc3QgbmFtZSA9IHByZXNzZWRLZXlzLmpvaW4oJysnKVxuICByZXR1cm4gbmFtZVxufSIsImNvbnN0IHsgRWRpdG9yRXZlbnRDb250ZXh0IH0gPSByZXF1aXJlKFwiLi9lZGl0b3JFdmVudENvbnRleHRcIilcblxuZXhwb3J0IGNsYXNzIFRvb2xNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgICB0aGlzLnRvb2xzID0ge31cbiAgICB0aGlzLmN1cnJlbnRUb29sID0gbnVsbFxuICAgIHRoaXMuaW52b2tlV2hlblN3aXRjaCA9ICgpID0+IHt9XG5cbiAgICB0aGlzLmN0eCA9IG51bGwgLy8gdG9vbCBjb250ZXh0XG4gIH1cbiAgc2V0Q3VycmVudFRvb2wobmFtZSkge1xuICAgIHRoaXMuY3VycmVudFRvb2wgPSB0aGlzLnRvb2xzW25hbWVdXG4gICAgdGhpcy5pbnZva2VXaGVuU3dpdGNoKHRoaXMuZ2V0Q3VycmVudFRvb2xOYW1lKCkpXG4gIH1cbiAgb25Td2l0Y2hUb29sKGZuKSB7XG4gICAgdGhpcy5pbnZva2VXaGVuU3dpdGNoID0gZm5cbiAgfVxuICBnZXRDdXJyZW50VG9vbE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFRvb2wubmFtZSgpXG4gIH1cbiAgcmVnaXN0ZXJUb29sKHRvb2wpIHtcbiAgICB0aGlzLnRvb2xzW3Rvb2wubmFtZSgpXSA9IHRvb2xcbiAgICB0b29sLnNldEVkaXRvcih0aGlzLmVkaXRvcikgLy8gZGVwZW5kZW5jeSBpbmplY3Rpb25cbiAgfVxuXG4gIGJpbmRUb29sRXZlbnQoKSB7XG4gICAgY29uc3Qgc3ZnUm9vdCA9IHRoaXMuZWRpdG9yLnN2Z1Jvb3RcblxuICAgIHN2Z1Jvb3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZSA9PiB7XG4gICAgICBjb25zdCBjdHggPSBuZXcgRWRpdG9yRXZlbnRDb250ZXh0KHRoaXMuZWRpdG9yLCBlKVxuICAgICAgdGhpcy5jdHggPSBjdHhcbiAgICAgIHRoaXMuY3VycmVudFRvb2wuc3RhcnQoY3R4KVxuICAgIH0sIGZhbHNlKVxuXG4gICAgc3ZnUm9vdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4XG5cbiAgICAgIGlmICghY3R4KSByZXR1cm4gLy8gaWYgY3R4IGV4aXRzLCBwcmVzZW50IG1vdXNlZG93biBldmVudCBlbWl0IGp1c3QgYmVmb3JlXG4gICAgICBjdHguc2V0T3JpZ2luRXZlbnQoZSlcbiAgICAgIGN0eC5wcmVzc01vdXNlKClcbiAgICAgIHRoaXMuY3VycmVudFRvb2wubW92ZShjdHgpIC8vIG1vdmVcbiAgICB9LCBmYWxzZSlcbiAgICBcbiAgICBzdmdSb290LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlID0+IHtcbiAgICAgIC8vIHRoaXMuY3R4LnJlbGVhc2VNb3VzZSgpXG4gICAgICBjb25zdCBjdHggPSB0aGlzLmN0eFxuICAgICAgLy8gY3R4LnNldE9yaWdpbkV2ZW50KGUpIC8vIHRoZSBvZmZzZXRYIGFuZCBvZmZzZXRZIGluIG1vdXNldXAgYW5kIHRoZSBsYXN0IG1vdXNlbW92ZSBpcyBub3QgZXF1YWwgPz8gXG4gICAgICB0aGlzLmN1cnJlbnRUb29sLmVuZChjdHgpXG4gICAgICBjdHguaXNFbmRJbnNpZGUgPSB0cnVlXG4gICAgfSwgZmFsc2UpXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGUgPT4ge1xuICAgICAgaWYgKHRoaXMuY3R4ICYmIHRoaXMuY3R4LmlzRW5kSW5zaWRlID09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRvb2wuZW5kT3V0c2lkZSh0aGlzLmN0eClcbiAgICAgIH1cbiAgICAgIHRoaXMuY3R4ID0gbnVsbFxuICAgIH0sIGZhbHNlKVxuICB9XG59IiwiXG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm94QnkycG9pbnRzKHgxLCB5MSwgeDIsIHkyKSB7XG4gIGxldCB4LCB5LCB3LCBoXG4gIHcgPSBNYXRoLmFicyh4MiAtIHgxKVxuICBoID0gTWF0aC5hYnMoeTIgLSB5MSlcbiAgeCA9IE1hdGgubWluKHgyLCB4MSlcbiAgeSA9IE1hdGgubWluKHkyLCB5MSlcbiAgcmV0dXJuIHsgeCwgeSwgdywgaCB9XG59IiwiXG4vLyBUT0RPOiB0byBmaW5pc2hcbmV4cG9ydCBmdW5jdGlvbiBnZXRWaWV3Qm94KGVsKSB7XG4gIGNvbnN0IHZhbCA9IGVsLmdldEF0dHJpYnV0ZSgndmlld0JveCcpXG4gIGlmICghdmFsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdoYXMgbm90IHZpZXdCb3ggYXR0cmlidXRlJylcbiAgfVxuICBjb25zdCBbeCwgeSwgdywgaF0gPSB2YWwuc3BsaXQoL1tcXHMsXSsvKS5tYXAoaXRlbSA9PiBwYXJzZUZsb2F0KGl0ZW0pKVxuICByZXR1cm4geyB4LCB5LCB3LCBoIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=