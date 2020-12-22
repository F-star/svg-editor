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
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActivedElsManager": () => /* binding */ ActivedElsManager
/* harmony export */ });
/* harmony import */ var _util_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/common */ "./src/util/common.js");
/**
 * 激活元素管理类
 */

;

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
  setElsInBox(box) {
    const elsInBox = (0,_util_common__WEBPACK_IMPORTED_MODULE_0__.getElementsInBox)(box, this.editor.svgContent)
    if (elsInBox.length === 0) this.clear()
    else this.setEls(elsInBox)
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

/***/ "./src/element/box.js":
/*!****************************!*\
  !*** ./src/element/box.js ***!
  \****************************/
/*! namespace exports */
/*! export Box [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Box": () => /* binding */ Box
/* harmony export */ });

class Box {
  constructor(x, y, w, h) {
    if (typeof x == 'object') {
      this.x = x.x
      this.y = x.y
      this.w = x.width
      this.h = x.height
    } else {
      this.x = x
      this.y = y
      this.w = w
      this.h = h
    }

    this.x2 = this.x + this.w
    this.y2 = this.y + this.h
  }
  contains(otherBox) {
    return this.x <= otherBox.x && this.y <= otherBox.y &&
      this.x2 >= otherBox.x + otherBox.width && this.y2 >= otherBox.y + otherBox.height
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
/* harmony import */ var _box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./box */ "./src/element/box.js");
/* harmony import */ var _rect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rect */ "./src/element/rect.js");
;



/**
 * FSVG
 * 
 * simple SVGElement encapsulation
 */
function create(el) {
  const tagName = el.tagName
  if (tagName === 'rect') {
    return new FSVG.Rect(el)
  }
  else {
    throw new Error(`Can not creat ${tagName} instance, no match class.`)
  }
}

const FSVG = {
  create,
  Rect: _rect__WEBPACK_IMPORTED_MODULE_1__.Rect,
  Box: _box__WEBPACK_IMPORTED_MODULE_0__.Box,
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
  getBox() {
    return {
      x: this.x,
      y: this.y,
      width: this.w,
      height: this.h,
      w: this.w,
      h: this.h,
    }
  }
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

      console.log('select area')
      const box = this.editor.hudManager.selectArea.getBox()
      this.editor.hudManager.selectArea.clear()

      this.editor.activedElsManager.setElsInBox(box)

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
/**
 * editor global shortcut
 */
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

/***/ "./src/util/common.js":
/*!****************************!*\
  !*** ./src/util/common.js ***!
  \****************************/
/*! namespace exports */
/*! export getElementsInBox [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isVaildColorVal [provided] [no usage info] [missing usage info prevents renaming] */
/*! export uniq [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isVaildColorVal": () => /* binding */ isVaildColorVal,
/* harmony export */   "getElementsInBox": () => /* binding */ getElementsInBox,
/* harmony export */   "uniq": () => /* binding */ uniq
/* harmony export */ });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../element */ "./src/element/index.js");
;

function isVaildColorVal() {
  // TODO:
  // 1. all color brower supported
  // 2. #fff and #f0f0f0
  // 3. rgb(x,x,x)
  // ...
}

function getElementsInBox(box, parent) {
  const tagNameForbidList = ['g']
  box = new _element__WEBPACK_IMPORTED_MODULE_0__.FSVG.Box(box)
  const elsInBox = []

  function r(box, parent) {
    const elements = parent.children
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i] // FSVG.create(elements[i])

      if (!tagNameForbidList.includes(el.tagName)) {
        const bbox = el.getBBox()
        if (box.contains(bbox)) {
          elsInBox.push( _element__WEBPACK_IMPORTED_MODULE_0__.FSVG.create(el))
        }
      }

      if (el.children.length > 0) r(box, el)
    }
  }
  r(box, parent)
  return elsInBox
}

function uniq(arr) {
  return Array.from(new Set(arr))
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2FjdGl2ZWRFbHNNYW5hZ2VyLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvY29tbWFuZC9jb21tYW5kTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2NvbW1hbmQvY29tbWFuZHMuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9kZXZDb25maWcuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3JFdmVudENvbnRleHQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lbGVtZW50L2Jhc2VFbGVtZW50LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvZWxlbWVudC9ib3guanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lbGVtZW50L2luZGV4LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvZWxlbWVudC9yZWN0LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbGF5ZXIvaHVkTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2xheWVyL291dGxpbmVIdWQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9sYXllci9zZWxlY3RBcmVhLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy9hZGRSZWN0LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy9kcmFnQ2FudmFzLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9tb2R1bGVzL3pvb20uanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9zZXR0aW5nL2VkaXRvclNldHRpbmcuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9zaG9ydGN1dC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL3Rvb2xNYW5hZ2VyLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvdXRpbC9jb21tb24uanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy91dGlsL21hdGguanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy91dGlsL3N2Zy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQSxDQUFnRDs7QUFFekM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw4REFBZ0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsb0JBQW9C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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLDBCQUEwQix5REFBVTtBQUNwQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZLckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTzs7QUFFbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRUE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0QkEsQ0FBMkI7QUFDRTs7O0FBRzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsUUFBUTtBQUM3QztBQUNBOztBQUVPO0FBQ1A7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBaUM7QUFDTzs7QUFFakMsbUJBQW1CLGtEQUFRO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCwwQ0FBMEMsOENBQU07QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakNBO0FBQ0E7QUFDQTs7QUFFQSxDQUEwQztBQUNBO0FBQzFDLE9BQU8sS0FBSyxHQUFHLG1CQUFPLENBQUMsd0NBQWM7O0FBRTlCO0FBQ1A7QUFDQTtBQUNBOztBQUVBLDBCQUEwQixtREFBVTtBQUNwQywwQkFBMEIsbURBQVU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQkEsT0FBTyxLQUFLLEdBQUcsbUJBQU8sQ0FBQyx3Q0FBYzs7QUFFckM7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLEtBQUssSUFBSSxHQUFHLEVBQUUsS0FBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUUsR0FBRyxJQUFJO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxlQUFlO0FBQ2YsVUFBVTtBQUNWLFVBQVU7QUFDVixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBLE9BQU8sS0FBSyxHQUFHLG1CQUFPLENBQUMsd0NBQWM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLEtBQUssSUFBSSxHQUFHLEVBQUUsS0FBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUUsR0FBRyxJQUFJO0FBQ3RFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxlQUFlO0FBQ2YsVUFBVTtBQUNWLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMURBLENBQThDOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsdUJBQXVCO0FBQ2xDLFdBQVcsYUFBYSxHQUFHLDJEQUFlO0FBQzFDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsdUJBQXVCO0FBQ2xDLFdBQVcsYUFBYSxHQUFHLDJEQUFlO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENSO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxlQUFlO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNCQSxDQUFpQztBQUNhOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtCQUErQiwrQ0FBUztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0EsYUFBYSxtQkFBbUI7QUFDaEMsYUFBYSx1QkFBdUI7QUFDcEMsYUFBYSxhQUFhLEdBQUcsMkRBQWU7QUFDNUM7QUFDQTtBQUNBOztBQUVBLFdBQVcsZUFBZTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7O0FBRTFDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBLFdBQVcsZUFBZTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RkE7O0FBRUEsT0FBTyxhQUFhLEdBQUcsbUJBQU8sQ0FBQyxzQ0FBYTs7QUFFckM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBLENBQXFDOztBQUU5QjtBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVywrQ0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0EsNENBQTRDLDZCQUE2QjtBQUN6RTtBQUNBO0FBQ0Esd0NBQXdDOztBQUV4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekRBLE9BQU8scUJBQXFCLEdBQUcsbUJBQU8sQ0FBQyx5REFBc0I7O0FBRXREO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNEQSxDQUFpQzs7QUFFMUI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBLFlBQVksOENBQVE7QUFDcEI7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixxQkFBcUI7QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGlEQUFXO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7Ozs7OztVQ1RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJhcHAuNmFiNWQ1YWMxNTk2NjBmNWI3MGMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5r+A5rS75YWD57Sg566h55CG57G7XHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgZ2V0RWxlbWVudHNJbkJveCB9IGZyb20gXCIuL3V0aWwvY29tbW9uXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBBY3RpdmVkRWxzTWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gICAgdGhpcy5lbHMgPSBbXVxyXG4gIH1cclxuICBzZXRFbHMoZWxzKSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxzKSkgZWxzID0gW2Vsc11cclxuICAgIHRoaXMuZWxzID0gZWxzXHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmVkaXRvci50b29sTWFuYWdlci5nZXRDdXJyZW50VG9vbE5hbWUoKSlcclxuICAgIC8vIFRPRE86IGhpZ2hsaWdodCBvdXRsaW5lLCBhY2NvcmRpbmcgdG8gY3VycmVudCB0b29sXHJcbiAgICB0aGlzLmhlaWdobGlndGhFbHMoKVxyXG4gICAgdGhpcy5zZXRTZXR0aW5nRmlsbCgpXHJcbiAgfVxyXG4gIGdldEVscygpIHtcclxuICAgIHJldHVybiB0aGlzLmVsc1xyXG4gIH1cclxuICBzZXRFbHNJbkJveChib3gpIHtcclxuICAgIGNvbnN0IGVsc0luQm94ID0gZ2V0RWxlbWVudHNJbkJveChib3gsIHRoaXMuZWRpdG9yLnN2Z0NvbnRlbnQpXHJcbiAgICBpZiAoZWxzSW5Cb3gubGVuZ3RoID09PSAwKSB0aGlzLmNsZWFyKClcclxuICAgIGVsc2UgdGhpcy5zZXRFbHMoZWxzSW5Cb3gpXHJcbiAgfVxyXG4gIGlzRW1wdHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbHMubGVuZ3RoID09IDBcclxuICB9XHJcbiAgaXNOb0VtcHR5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxzLmxlbmd0aCA+IDBcclxuICB9XHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLmVscyA9IFtdXHJcbiAgICAvLyBjbGVhciBvdXRsaW5lXHJcbiAgICBjb25zdCBodWRNYW5hZ2VyID0gdGhpcy5lZGl0b3IuaHVkTWFuYWdlclxyXG4gICAgaHVkTWFuYWdlci5vdXRsaW5lSHVkLmNsZWFyKClcclxuICB9XHJcbiAgY29udGFpbnMoZWwpIHtcclxuICAgIC8vIFRPRE86XHJcbiAgfVxyXG4gIGdldE1lcmdlQkJveCgpIHtcclxuICAgIC8vIFRPRE86XHJcbiAgICAvKiBsZXQgeCwgeSwgdywgaFxyXG4gICAgdGhpcy5lbHMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgIGNvbnN0IGJib3ggPSBlbC5lbCgpLmdldGJib3goKVxyXG4gICAgfSkgKi9cclxuICB9XHJcbiAgLy8gaGVpZ2h0bGlnaHQgdGhlIGVsZW1lbnRzXHJcbiAgaGVpZ2hsaWd0aEVscygpIHtcclxuICAgIC8vIFRPRE86XHJcbiAgICBjb25zdCBlbHMgPSB0aGlzLmVsc1xyXG4gICAgY29uc3QgaHVkTWFuYWdlciA9IHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXJcclxuICAgIGVscy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgY29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gZWwuZ2V0QkJveCgpXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKGJveClcclxuICAgICAgaHVkTWFuYWdlci5vdXRsaW5lSHVkLmRyYXdSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpXHJcbiAgICB9KVxyXG4gIH1cclxuICBzZXRTZXR0aW5nRmlsbCgpIHtcclxuICAgIGNvbnN0IGVscyA9IHRoaXMuZWxzXHJcblxyXG4gICAgY29uc3QgZmlsbHMgPSBlbHMubWFwKGVsID0+IHtcclxuICAgICAgcmV0dXJuIGVsLmdldEF0dHIoJ2ZpbGwnKVxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLmVkaXRvci5zZXR0aW5nLnNldEZpbGwoZmlsbHNbMF0pIC8vIEZJWE1FOlxyXG4gIH1cclxuICBzZXRFbHNBdHRyKG5hbWUsIHZhbCkge1xyXG4gICAgaWYgKHRoaXMuaXNOb0VtcHR5KCkpIHtcclxuICAgICAgdGhpcy5lZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3NldEF0dHInLCB0aGlzLmVscywgbmFtZSwgdmFsKVxyXG4gICAgfVxyXG4gIH1cclxufSIsIlxyXG5pbXBvcnQgRWRpdG9yIGZyb20gJy4vZWRpdG9yLmpzJ1xyXG5pbXBvcnQgQWRkUmVjdCBmcm9tICcuL21vZHVsZXMvYWRkUmVjdC5qcydcclxuaW1wb3J0IHsgRHJhZ0NhbnZhcyB9IGZyb20gJy4vbW9kdWxlcy9kcmFnQ2FudmFzLmpzJ1xyXG5pbXBvcnQgQ29tbWFuZE1hbmFnZXIgZnJvbSAnLi9jb21tYW5kL2NvbW1hbmRNYW5hZ2VyLmpzJ1xyXG5pbXBvcnQgeyBFZGl0b3JTZXR0aW5nIH0gZnJvbSAnLi9zZXR0aW5nL2VkaXRvclNldHRpbmcuanMnXHJcbmltcG9ydCB7IFpvb21NYW5hZ2VyIH0gZnJvbSAnLi9tb2R1bGVzL3pvb20uanMnXHJcbmltcG9ydCB7IFNlbGVjdCB9IGZyb20gJy4vbW9kdWxlcy9zZWxlY3QuanMnXHJcbmltcG9ydCB7IFRvb2xNYW5hZ2VyIH0gZnJvbSAnLi90b29sTWFuYWdlci5qcydcclxuXHJcbmZ1bmN0aW9uIGFjdGl2ZUJ0bihuYW1lKSB7XHJcbiAgbmFtZSA9IHtcclxuICAgICdzZWxlY3QnOiAnYnRuLXNlbGVjdCcsXHJcbiAgICAnYWRkUmVjdCc6ICdidG4tYWRkLXJlY3QnLFxyXG4gICAgJ2RyYWdDYW52YXMnOiAnYnRuLWRyYWctY2FudmFzJyxcclxuICB9W25hbWVdXHJcbiAgaWYgKG5hbWUgPT0gdW5kZWZpbmVkKSByZXR1cm5cclxuXHJcbiAgY29uc3QgdG9vbEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b29sLWJhcicpXHJcbiAgY29uc3QgdG9vbEJ0bnMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0b29sQmFyLmNoaWxkcmVuKVxyXG4gIHRvb2xCdG5zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgfSlcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYW1lKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG59XHJcblxyXG5cclxuY29uc3QgZWRpdG9yID0gbmV3IEVkaXRvcigpXHJcbndpbmRvdy5lZGl0b3IgPSBlZGl0b3IgLy8gZGVidWcgaW4gZGV2dG9vbFxyXG5cclxuY29uc3QgY29tbWFuZE1hbmFnZXIgPSBuZXcgQ29tbWFuZE1hbmFnZXIoZWRpdG9yKVxyXG5lZGl0b3Iuc2V0Q29tbWFuZE1hbmFnZXIoY29tbWFuZE1hbmFnZXIpXHJcblxyXG5lZGl0b3Iuc2V0U2V0dGluZyhuZXcgRWRpdG9yU2V0dGluZygpKVxyXG4vLyByZWdpc3RlciB0b29sc1xyXG5cclxuY29uc3QgdG9vbE1hbmFnZXIgPSBuZXcgVG9vbE1hbmFnZXIoZWRpdG9yKVxyXG5lZGl0b3Iuc2V0VG9vbE1hbmFnZXIodG9vbE1hbmFnZXIpXHJcbnRvb2xNYW5hZ2VyLnJlZ2lzdGVyVG9vbChuZXcgQWRkUmVjdCgpKVxyXG50b29sTWFuYWdlci5yZWdpc3RlclRvb2wobmV3IERyYWdDYW52YXMoKSlcclxudG9vbE1hbmFnZXIucmVnaXN0ZXJUb29sKG5ldyBTZWxlY3QoKSlcclxuXHJcbmVkaXRvci50b29sTWFuYWdlci5vblN3aXRjaFRvb2wobmFtZSA9PiB7XHJcbiAgY29uc29sZS5sb2coJ3N3aXRjaGVkIHRvb2w6JywgbmFtZSlcclxuICBhY3RpdmVCdG4obmFtZSlcclxufSlcclxuXHJcbnRvb2xNYW5hZ2VyLnNldEN1cnJlbnRUb29sKCdhZGRSZWN0JylcclxudG9vbE1hbmFnZXIuYmluZFRvb2xFdmVudCgpXHJcbi8vIHpvb21cclxuZWRpdG9yLnNldFpvb21NYW5hZ2VyKG5ldyBab29tTWFuYWdlcigpKVxyXG5cclxuZWRpdG9yLm1vdW50KCcjZWRpdG9yLWFyZWEnKVxyXG5cclxuXHJcbi8qKiBcclxuICogYmluZCBldmVudCBpbiBidXR0b25cclxuICovIFxyXG4vLyB1bmRvXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tdW5kbycpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCd1bmRvJylcclxufVxyXG4vLyByZWRvXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tcmVkbycpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3JlZG8nKVxyXG59XHJcbi8vIHpvb21JblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXpvb20taW4nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgZWRpdG9yLnpvb21NYW5hZ2VyLnpvb21JbigpXHJcbn1cclxuLy8gem9vbU91dFxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXpvb20tb3V0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGVkaXRvci56b29tTWFuYWdlci56b29tT3V0KClcclxufVxyXG4vLyBzZWxlY3QgYWRkUmVjdCB0b29sXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tYWRkLXJlY3QnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgZWRpdG9yLnNldEN1cnJlbnRUb29sKCdhZGRSZWN0JylcclxufVxyXG4vLyBzZWxlY3QgZHJhZ2NhbnZhcyB0b29sXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tZHJhZy1jYW52YXMnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgZWRpdG9yLnNldEN1cnJlbnRUb29sKCdkcmFnQ2FudmFzJylcclxufVxyXG4vLyBzZWxlY3QgdG9vbFxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXNlbGVjdCcpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBlZGl0b3Iuc2V0Q3VycmVudFRvb2woJ3NlbGVjdCcpXHJcbn1cclxuLy8gZGVsZXRlIHNlbGVjdGVkIGVsZW1lbnRzXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tZGVsZXRlJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGlmIChlZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuaXNOb0VtcHR5KCkpIHtcclxuICAgIGVkaXRvci5leGVjdXRlQ29tbWFuZCgncmVtb3ZlU2VsZWN0ZWRFbGVtZW50cycpXHJcbiAgfVxyXG59XHJcblxyXG4vLyBmaWxsIHZhbHVlIGNvbnRyb2xcclxuY29uc3QgZmlsbFRleHROb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VsZW1lbnQtaW5mby1maWxsJylcclxuZmlsbFRleHROb2RlLmlubmVySFRNTCA9IGVkaXRvci5zZXR0aW5nLmdldCgnZmlsbCcpXHJcbmVkaXRvci5zZXR0aW5nLmJpbmRFdmVudCgnZmlsbCcsIHZhbCA9PiB7XHJcbiAgZmlsbFRleHROb2RlLmlubmVySFRNTCA9IHZhbFxyXG59KVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2V0LWZpbGwtYnRuJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGNvbnN0IGZpbGwgPSB3aW5kb3cucHJvbXB0KCdQbGVhc2UgaW5wdXQgdmFsaWQgY29sb3IgdmFsdWXvvIhsaWtlICNmZmNlNDPvvIknLCBlZGl0b3Iuc2V0dGluZy5nZXQoJ2ZpbGwnKSlcclxuICBpZiAoIWZpbGwpIHJldHVyblxyXG4gIGZpbGxUZXh0Tm9kZS5pbm5lckhUTUwgPSBmaWxsXHJcblxyXG4gIGVkaXRvci5zZXR0aW5nLnNldEZpbGwoZmlsbClcclxuICBlZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzQXR0cignZmlsbCcsIGZpbGwpXHJcbn1cclxuXHJcbi8vIHN0cm9rZSB2YWx1ZSBjb250cm9sXHJcbmNvbnN0IHN0cm9rZVRleHROb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VsZW1lbnQtaW5mby1zdHJva2UnKVxyXG5zdHJva2VUZXh0Tm9kZS5pbm5lckhUTUwgPSBlZGl0b3Iuc2V0dGluZy5nZXQoJ3N0cm9rZScpXHJcbmVkaXRvci5zZXR0aW5nLmJpbmRFdmVudCgnc3Ryb2tlJywgdmFsID0+IHtcclxuICBzdHJva2VUZXh0Tm9kZS5pbm5lckhUTUwgPSB2YWxcclxufSlcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NldC1zdHJva2UtYnRuJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGNvbnN0IHN0cm9rZSA9IHdpbmRvdy5wcm9tcHQoJ1BsZWFzZSBpbnB1dCB2YWxpZCBjb2xvciB2YWx1Ze+8iGxpa2UgI2ZmY2U0M++8iScsIGVkaXRvci5zZXR0aW5nLmdldCgnc3Ryb2tlJykpXHJcbiAgaWYgKCFzdHJva2UpIHJldHVyblxyXG4gIHN0cm9rZVRleHROb2RlLmlubmVySFRNTCA9IHN0cm9rZVxyXG5cclxuICBlZGl0b3Iuc2V0dGluZy5zZXRTdHJva2Uoc3Ryb2tlKVxyXG4gIGVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHNBdHRyKCdzdHJva2UnLCBzdHJva2UpXHJcbn1cclxuLy8gcmVnaXN0ZXIgc2hvcnRjdXRcclxuZWRpdG9yLnNob3J0Y3V0LnJlZ2lzdGVyKCdVbmRvJywgJ0NtZCtaJywgKCkgPT4ge1xyXG4gIGVkaXRvci5leGVjdXRlQ29tbWFuZCgndW5kbycpXHJcbn0pXHJcbmVkaXRvci5zaG9ydGN1dC5yZWdpc3RlcignVW5kbycsICdDdHJsK1onLCAoKSA9PiB7XHJcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCd1bmRvJylcclxufSlcclxuZWRpdG9yLnNob3J0Y3V0LnJlZ2lzdGVyKCdSZWRvJywgJ0NtZCtTaGlmdCtaJywgKCkgPT4ge1xyXG4gIGVkaXRvci5leGVjdXRlQ29tbWFuZCgncmVkbycpXHJcbn0pXHJcbmVkaXRvci5zaG9ydGN1dC5yZWdpc3RlcignUmVkbycsICdDdHJsK1NoaWZ0K1onLCAoKSA9PiB7XHJcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdyZWRvJylcclxufSlcclxuZWRpdG9yLnNob3J0Y3V0LnJlZ2lzdGVyKCdEZWxldGUnLCAnQmFja3NwYWNlJywgKCkgPT4ge1xyXG4gIGlmIChlZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuaXNOb0VtcHR5KCkpIHtcclxuICAgIGVkaXRvci5leGVjdXRlQ29tbWFuZCgncmVtb3ZlU2VsZWN0ZWRFbGVtZW50cycpXHJcbiAgfVxyXG59KVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hvcnRjdXQnKS5pbm5lckhUTUwgPSBlZGl0b3Iuc2hvcnRjdXQuZm9ybWF0UHJpbnQoKVxyXG5cclxuLyoqXHJcbiAqIOeQhuaDsyBhcGkg5L2/55So5L6L5a2QXHJcbiAqIFxyXG4gKiBjb25zdCBlZGl0b3JCdWlsZGVyID0gbmV3IEVkaXRvci5idWlsZGVyKClcclxuICogZWRpdG9yQnVpbGRlclxyXG4gKiAgIC5zZXRDYW52YXNTaXplKDQwMCwgMzAwKVxyXG4gKiAgIC5zZXRTdGFnZVNpemUoMTAwMCwgODAwKVxyXG4gKiAgIC5zZXRWaWV3cG9ydFNpemUoODAwLCA1MDApXHJcbiAqICAgLnNldFpvb20oMTAwKVxyXG4gKiBcclxuICogY29uc3QgZWRpdG9yID0gZWRpdG9yQnVpbGRlci5idWlsZCgpXHJcbiAqIGVkaXRvci5yZWdpc3RlclRvb2wodG9vbE1vdmUpXHJcbiAqIFxyXG4gKi8iLCIvKipcclxuICogQ29tbWFuZE1hbmFnZXIgQ2xhc3NcclxuICogXHJcbiAqIFxyXG4gKiBDb21tYW5kTWFuYWdlci51bmRvKClcclxuICogQ29tbWFuZE1hbmFnZXIucmVkbygpXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgQWRkUmVjdCwgRE1vdmUsIHJlbW92ZVNlbGVjdGVkRWxlbWVudHMsIFNldEF0dHIgfSBmcm9tIFwiLi9jb21tYW5kc1wiXHJcblxyXG5jbGFzcyBDb21tYW5kTWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gICAgdGhpcy5yZWRvU3RhY2sgPSBbXVxyXG4gICAgdGhpcy51bmRvU3RhY2sgPSBbXVxyXG4gICAgdGhpcy5jb21tYW5kQ2xhc3NlcyA9IHt9XHJcblxyXG4gICAgdGhpcy5yZXNpZ3RlckNvbW1hbmRDbGFzcyhBZGRSZWN0KVxyXG4gICAgdGhpcy5yZXNpZ3RlckNvbW1hbmRDbGFzcyhETW92ZSlcclxuICAgIHRoaXMucmVzaWd0ZXJDb21tYW5kQ2xhc3MoU2V0QXR0cilcclxuICAgIHRoaXMucmVzaWd0ZXJDb21tYW5kQ2xhc3MocmVtb3ZlU2VsZWN0ZWRFbGVtZW50cylcclxuICB9XHJcbiAgc2V0RWRpdG9yKGVkaXRvcikge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICB9XHJcbiAgZXhlY3V0ZShuYW1lLCAuLi5hcmdzKSB7XHJcbiAgICBjb25zdCBDb21tYW5kQ2xhc3MgPSB0aGlzLmNvbW1hbmRDbGFzc2VzW25hbWVdXHJcbiAgICBpZiAoIUNvbW1hbmRDbGFzcykgdGhyb3cgbmV3IEVycm9yKGBlZGl0b3IgaGFzIG5vdCB0aGUgJHtuYW1lfSBjb21tYW5kYClcclxuICAgIGNvbnN0IGNvbW1hbmQgPSBuZXcgQ29tbWFuZENsYXNzKHRoaXMuZWRpdG9yLCAuLi5hcmdzKSAvLyDliJvlu7ogY29tbWFuZCDlrp7kvotcclxuXHJcbiAgICB0aGlzLnVuZG9TdGFjay5wdXNoKGNvbW1hbmQpXHJcbiAgICB0aGlzLnJlZG9TdGFjayA9IFtdXHJcbiAgfVxyXG4gIHVuZG8oKSB7XHJcbiAgICBpZiAodGhpcy51bmRvU3RhY2subGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd1bmRvIHN0YWNrIGlzIGVtcHR5LCBjYW4gbm90IHVuZG8nKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IGNvbW1hbmQgPSB0aGlzLnVuZG9TdGFjay5wb3AoKVxyXG4gICAgdGhpcy5yZWRvU3RhY2sucHVzaChjb21tYW5kKVxyXG4gICAgY29tbWFuZC51bmRvKClcclxuICAgIGNvbW1hbmQuYWZ0ZXJVbmRvKClcclxuICB9XHJcbiAgcmVkbygpIHtcclxuICAgIGlmICh0aGlzLnJlZG9TdGFjay5sZW5ndGggPT09IDApIHtcclxuICAgICAgY29uc29sZS5sb2coJ3JlZG8gc3RhY2sgaXMgZW1wdHksIGNhbiBub3QgcmVkbycpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgY29uc3QgY29tbWFuZCA9IHRoaXMucmVkb1N0YWNrLnBvcCgpXHJcbiAgICB0aGlzLnVuZG9TdGFjay5wdXNoKGNvbW1hbmQpXHJcbiAgICBjb21tYW5kLnJlZG8oKVxyXG4gICAgY29tbWFuZC5hZnRlclJlZG8oKVxyXG4gIH1cclxuICAvLyDms6jlhozlkb3ku6TnsbvliLDlkb3ku6TnrqHnkIblr7nosaHkuK3jgIJcclxuICByZXNpZ3RlckNvbW1hbmRDbGFzcyhjb21tYW5kQ2xhc3MpIHtcclxuICAgIGNvbnN0IG5hbWUgPSBjb21tYW5kQ2xhc3MubmFtZSgpXHJcbiAgICB0aGlzLmNvbW1hbmRDbGFzc2VzW25hbWVdID0gY29tbWFuZENsYXNzXHJcbiAgfVxyXG4gIGFmdGVyQW55VW5kbygpIHtcclxuXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21tYW5kTWFuYWdlciIsImltcG9ydCB7IEZTVkcgfSBmcm9tIFwiLi4vZWxlbWVudFwiXHJcblxyXG5jbGFzcyBCYXNlQ29tbWFuZCB7XHJcbiAgdW5kbygpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcigncGxlYXNlIG92ZXJyaWRlIHVuZG8gbWV0aG9kJylcclxuICB9XHJcbiAgcmVkbygpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcigncGxlYXNlIG92ZXJyaWRlIHJlZG8gbWV0aG9kJylcclxuICB9XHJcbiAgYWZ0ZXJSZWRvKCkge31cclxuICBhZnRlclVuZG8oKSB7fVxyXG59XHJcblxyXG4vKipcclxuICogYWRkUmVjdFxyXG4gKiBcclxuICogYWRkIHJlY3Qgc3ZnIGVsZW1lbnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBZGRSZWN0IGV4dGVuZHMgQmFzZUNvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgeCwgeSwgdywgaCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICAgIGNvbnN0IHJlY3QgPSBuZXcgRlNWRy5SZWN0KHgsIHksIHcsIGgpXHJcblxyXG4gICAgY29uc3QgZmlsbCA9IGVkaXRvci5zZXR0aW5nLmdldCgnZmlsbCcpXHJcbiAgICBjb25zdCBzdHJva2UgPSBlZGl0b3Iuc2V0dGluZy5nZXQoJ3N0cm9rZScpXHJcbiAgICBjb25zdCBzdHJva2VXaWR0aCA9IGVkaXRvci5zZXR0aW5nLmdldCgnc3Ryb2tlV2lkdGgnKVxyXG4gICAgcmVjdC5zZXRBdHRyKCdmaWxsJywgZmlsbClcclxuICAgIHJlY3Quc2V0QXR0cignc3Ryb2tlJywgc3Ryb2tlKVxyXG4gICAgcmVjdC5zZXRBdHRyKCdzdHJva2Utd2lkdGgnLCBzdHJva2VXaWR0aClcclxuXHJcbiAgICBlZGl0b3IuZ2V0Q3VycmVudExheWVyKCkuYXBwZW5kQ2hpbGQocmVjdC5lbCgpKVxyXG5cclxuICAgIHRoaXMubmV4dFNpYmxpbmcgPSByZWN0LmVsKCkubmV4dEVsZW1lbnRTaWJsaW5nIFxyXG4gICAgdGhpcy5wYXJlbnQgPSByZWN0LmVsKCkucGFyZW50RWxlbWVudFxyXG4gICAgdGhpcy5yZWN0ID0gcmVjdFxyXG4gIH1cclxuICBzdGF0aWMgbmFtZSgpIHtcclxuICAgIHJldHVybiAnYWRkUmVjdCdcclxuICB9XHJcbiAgcmVkbygpIHtcclxuICAgIGNvbnN0IGVsID0gdGhpcy5yZWN0LmVsKClcclxuICAgIGlmICh0aGlzLm5leHRTaWJsaW5nKSB7XHJcbiAgICAgIHRoaXMucGFyZW50Lmluc2VydEJlZm9yZShlbCwgdGhpcy5uZXh0U2libGluZylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKGVsKVxyXG4gICAgfVxyXG4gIH1cclxuICB1bmRvKCkge1xyXG4gICAgdGhpcy5yZWN0LmVsKCkucmVtb3ZlKClcclxuICB9XHJcbiAgYWZ0ZXJVbmRvKCkge1xyXG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuY2xlYXIoKVxyXG4gIH1cclxuICBhZnRlclJlZG8oKSB7XHJcbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHModGhpcy5yZWN0KVxyXG4gIH1cclxufVxyXG4vKipcclxuICogcmVtb3ZlIGVsZW1lbnRzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgcmVtb3ZlU2VsZWN0ZWRFbGVtZW50cyBleHRlbmRzIEJhc2VDb21tYW5kIHtcclxuICBjb25zdHJ1Y3RvcihlZGl0b3IpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcblxyXG4gICAgdGhpcy5lbHMgPSB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5nZXRFbHMoKVxyXG5cclxuICAgIGNvbnN0IHNpemUgPSB0aGlzLmVscy5sZW5ndGhcclxuICAgIHRoaXMucGFyZW50cyA9IG5ldyBBcnJheShzaXplKVxyXG4gICAgdGhpcy5uZXh0U2libGluZ3MgPSBuZXcgQXJyYXkoc2l6ZSlcclxuICAgIHRoaXMuZWxzLmZvckVhY2goKGVsLCBpZHgpID0+IHtcclxuICAgICAgdGhpcy5uZXh0U2libGluZ3NbaWR4XSA9IGVsLmVsKCkubmV4dEVsZW1lbnRTaWJsaW5nIFxyXG4gICAgICB0aGlzLnBhcmVudHNbaWR4XSA9IGVsLmVsKCkucGFyZW50RWxlbWVudFxyXG4gICAgfSlcclxuICAgIHRoaXMuZXhlY3V0ZSgpXHJcbiAgfVxyXG4gIHN0YXRpYyBuYW1lKCkge1xyXG4gICAgcmV0dXJuICdyZW1vdmVTZWxlY3RlZEVsZW1lbnRzJ1xyXG4gIH1cclxuICBleGVjdXRlKCkgeyAvLyBwcml2YXRlXHJcbiAgICB0aGlzLmVscy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBpdGVtLnJlbW92ZSgpXHJcbiAgICB9KVxyXG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuY2xlYXIoKVxyXG4gIH1cclxuICByZWRvKCkge1xyXG4gICAgdGhpcy5leGVjdXRlKClcclxuICB9XHJcbiAgdW5kbygpIHtcclxuICAgIHRoaXMuZWxzLmZvckVhY2goKGVsZW1lbnQsIGlkeCkgPT4ge1xyXG4gICAgICBjb25zdCBlbCA9IGVsZW1lbnQuZWwoKVxyXG4gICAgICBpZiAodGhpcy5uZXh0U2libGluZ3NbaWR4XSkge1xyXG4gICAgICAgIHRoaXMucGFyZW50c1tpZHhdLmluc2VydEJlZm9yZShlbCwgdGhpcy5uZXh0U2libGluZ3NbaWR4XSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBhcmVudHNbaWR4XS5hcHBlbmRDaGlsZChlbClcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHModGhpcy5lbHMpXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogRE1vdmVcclxuICogXHJcbiAqIGRtb3ZlIGVsZW1lbnRzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRE1vdmUgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IoZWRpdG9yLCBlbHMsIGR4LCBkeSkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICAgIHRoaXMuZHggPSBkeFxyXG4gICAgdGhpcy5keSA9IGR5XHJcbiAgICB0aGlzLmVscyA9IGVsc1xyXG5cclxuICAgIHRoaXMuZWxzLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICBlbC5kbW92ZSh0aGlzLmR4LCB0aGlzLmR5KVxyXG4gICAgfSlcclxuICB9XHJcbiAgc3RhdGljIG5hbWUoKSB7XHJcbiAgICByZXR1cm4gJ2Rtb3ZlJ1xyXG4gIH1cclxuICByZWRvKCkge1xyXG4gICAgdGhpcy5lbHMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgIGVsLmRtb3ZlKHRoaXMuZHgsIHRoaXMuZHkpXHJcbiAgICB9KVxyXG4gIH1cclxuICB1bmRvKCkge1xyXG4gICAgdGhpcy5lbHMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgIGVsLmRtb3ZlKC10aGlzLmR4LCAtdGhpcy5keSlcclxuICAgIH0pXHJcbiAgfVxyXG4gIGFmdGVyUmVkbygpIHtcclxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVscyh0aGlzLmVscylcclxuICB9XHJcbiAgYWZ0ZXJVbmRvKCkge1xyXG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzKHRoaXMuZWxzKVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIHNldEF0dHJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXRBdHRyIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgZWxzLCBhdHRyTmFtZSwgdmFsKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGVscykpIGVscyA9IFtlbHNdXHJcbiAgICB0aGlzLmVscyA9IGVsc1xyXG4gICAgdGhpcy5hdHRyTmFtZSA9IGF0dHJOYW1lXHJcbiAgICB0aGlzLmJlZm9yZVZhbCA9IHRoaXMuZWxzLm1hcChlbCA9PiBlbC5nZXRBdHRyKGF0dHJOYW1lKSlcclxuICAgIHRoaXMuYWZ0ZXJWYWwgPSB2YWxcclxuXHJcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgZWwuc2V0QXR0cihhdHRyTmFtZSwgdmFsKVxyXG4gICAgfSlcclxuICB9XHJcbiAgc3RhdGljIG5hbWUoKSB7XHJcbiAgICByZXR1cm4gJ3NldEF0dHInXHJcbiAgfVxyXG4gIHJlZG8oKSB7XHJcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgZWwuc2V0QXR0cih0aGlzLmF0dHJOYW1lLCB0aGlzLmFmdGVyVmFsKVxyXG4gICAgfSlcclxuICB9XHJcbiAgdW5kbygpIHtcclxuICAgIHRoaXMuZWxzLmZvckVhY2goKGVsLCBpKSA9PiB7XHJcbiAgICAgIGVsLnNldEF0dHIodGhpcy5hdHRyTmFtZSwgdGhpcy5iZWZvcmVWYWxbaV0pXHJcbiAgICB9KVxyXG4gIH1cclxufSIsIi8vIOW4uOmHj1xyXG5cclxuY29uc3QgTlMgPSB7XHJcbiAgSFRNTDogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLFxyXG4gIE1BVEg6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MJyxcclxuICBTRTogJ2h0dHA6Ly9zdmctZWRpdC5nb29nbGVjb2RlLmNvbScsXHJcbiAgU1ZHOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxyXG4gIFhMSU5LOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsXHJcbiAgWE1MOiAnaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlJyxcclxuICBYTUxOUzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvJyAvLyBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvUkVDLXhtbC1uYW1lcy8jeG1sUmVzZXJ2ZWRcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgTlMsXHJcbn0gXHJcblxyXG5cclxuXHJcbiIsImV4cG9ydCBjb25zdCBpc0RlYnVnID0gdHJ1ZVxyXG4iLCJpbXBvcnQgeyBBY3RpdmVkRWxzTWFuYWdlciB9IGZyb20gXCIuL2FjdGl2ZWRFbHNNYW5hZ2VyXCJcclxuaW1wb3J0IHsgRWRpdG9yRXZlbnRDb250ZXh0IH0gZnJvbSBcIi4vZWRpdG9yRXZlbnRDb250ZXh0XCJcclxuaW1wb3J0IHsgSHVkTWFuYWdlciB9IGZyb20gXCIuL2xheWVyL2h1ZE1hbmFnZXJcIlxyXG5pbXBvcnQgeyBTaG9ydGN1dCB9IGZyb20gXCIuL3Nob3J0Y3V0XCJcclxuXHJcbmNsYXNzIEVkaXRvciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnNldHRpbmcgPSBudWxsXHJcbiAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyID0gbnVsbFxyXG4gICAgdGhpcy56b29tTWFuYWdlciA9IG51bGxcclxuICAgIHRoaXMuYWN0aXZlZEVsc01hbmFnZXIgPSBuZXcgQWN0aXZlZEVsc01hbmFnZXIodGhpcylcclxuICAgIHRoaXMuc2hvcnRjdXQgPSBuZXcgU2hvcnRjdXQodGhpcylcclxuXHJcbiAgICAvLyBjb25zdCBjb250ZW50V2lkdGggPSA0MDBcclxuICAgIC8vIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSAzMDBcclxuICAgIC8vIGNvbnN0IHN0YWdlV2lkdGggPSAxMDAwIC8vIOato+WcqOe6oOe7k+WRveWQjVxyXG4gICAgLy8gY29uc3Qgc3RhZ2VIZWlnaHQgPSA2MDBcclxuICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPSA4MDBcclxuICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0ID0gNTUwXHJcblxyXG4gICAgY29uc3Qgdmlld3BvcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgdmlld3BvcnQuaWQgPSAndmlld3BvcnQnXHJcbiAgICB2aWV3cG9ydC5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkICMwMDAnXHJcbiAgICB2aWV3cG9ydC5zdHlsZS53aWR0aCA9IHZpZXdwb3J0V2lkdGggKyAncHgnXHJcbiAgICB2aWV3cG9ydC5zdHlsZS5oZWlnaHQgPSB2aWV3cG9ydEhlaWdodCArICdweCdcclxuICAgIHRoaXMudmlld3BvcnQgPSB2aWV3cG9ydFxyXG4gICAgXHJcbiAgICBjb25zdCBzdmdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgc3ZnQ29udGFpbmVyLmlkID0gJ3N2Zy1jb250YWluZXInXHJcbiAgICBzdmdDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNkZGQnXHJcbiAgICBzdmdDb250YWluZXIuc3R5bGUud2lkdGggPSB2aWV3cG9ydFdpZHRoICsgJ3B4J1xyXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0ICsgJ3B4J1xyXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCdcclxuICAgIHRoaXMuc3ZnQ29udGFpbmVyID0gc3ZnQ29udGFpbmVyXHJcblxyXG4gICAgY29uc3Qgc3ZnUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJylcclxuICAgIHN2Z1Jvb3QuaWQgPSAnc3ZnLXJvb3QnXHJcbiAgICBzdmdSb290LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAxMDAwKVxyXG4gICAgc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDYwMClcclxuICAgIHN2Z1Jvb3Quc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAxMDAwIDYwMCcpXHJcbiAgICB0aGlzLnN2Z1Jvb3QgPSBzdmdSb290XHJcblxyXG4gICAgY29uc3Qgc3ZnU3RhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpXHJcbiAgICBzdmdTdGFnZS5pZCA9ICdzdmctc3RhZ2UnXHJcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgNDAwKVxyXG4gICAgc3ZnU3RhZ2Uuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAzMDApXHJcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ3gnLCAzMDApXHJcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ3knLCAxNTApXHJcbiAgICBzdmdTdGFnZS5zdHlsZS5vdmVyZmxvdyA9ICd2aXNpYmxlJ1xyXG4gICAgdGhpcy5zdmdTdGFnZSA9IHN2Z1N0YWdlXHJcblxyXG4gICAgY29uc3Qgc3ZnQmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2cnKVxyXG4gICAgc3ZnQmcuaWQgPSAnYmFja2dyb3VuZCdcclxuICAgIC8vIHN2Z0JnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCA0MDApXHJcbiAgICAvLyBzdmdCZy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDMwMClcclxuICAgIHN2Z0JnLnNldEF0dHJpYnV0ZSgneCcsIDApXHJcbiAgICBzdmdCZy5zZXRBdHRyaWJ1dGUoJ3knLCAwKVxyXG5cclxuICAgIGNvbnN0IGJnUmVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAncmVjdCcpXHJcbiAgICBiZ1JlY3Quc2V0QXR0cmlidXRlKCd3aWR0aCcsICcxMDAlJylcclxuICAgIGJnUmVjdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMDAlJylcclxuICAgIGJnUmVjdC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnI2ZmZicpXHJcblxyXG4gICAgY29uc3Qgc3ZnQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnZycpXHJcbiAgICBzdmdDb250ZW50LmlkID0gJ2NvbnRlbnQnXHJcbiAgICAvLyBzdmdDb250ZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCA0MDApXHJcbiAgICAvLyBzdmdDb250ZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgMzAwKVxyXG4gICAgc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3gnLCAwKVxyXG4gICAgc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3knLCAwKVxyXG4gICAgdGhpcy5zdmdDb250ZW50ID0gc3ZnQ29udGVudFxyXG5cclxuICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJylcclxuICAgIGxheWVyLmlkID0gJ2xheWVyLTEnXHJcbiAgICB0aGlzLmN1cnJlbnRMYXllciA9IGxheWVyXHJcblxyXG4gICAgdmlld3BvcnQuYXBwZW5kQ2hpbGQoc3ZnQ29udGFpbmVyKVxyXG4gICAgc3ZnQ29udGFpbmVyLmFwcGVuZENoaWxkKHN2Z1Jvb3QpXHJcbiAgICBzdmdSb290LmFwcGVuZENoaWxkKHN2Z1N0YWdlKVxyXG5cclxuICAgIHN2Z1N0YWdlLmFwcGVuZENoaWxkKHN2Z0JnKVxyXG4gICAgc3ZnQmcuYXBwZW5kQ2hpbGQoYmdSZWN0KVxyXG4gICAgc3ZnU3RhZ2UuYXBwZW5kQ2hpbGQoc3ZnQ29udGVudClcclxuICAgIHN2Z0NvbnRlbnQuYXBwZW5kQ2hpbGQobGF5ZXIpXHJcblxyXG5cclxuICAgIHRoaXMuaHVkTWFuYWdlciA9IG5ldyBIdWRNYW5hZ2VyKClcclxuICAgIHRoaXMuaHVkTWFuYWdlci5tb3VudChzdmdTdGFnZSlcclxuXHJcbiAgICAvLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZXdwb3J0KVxyXG4gIH1cclxuICBtb3VudChzZWxlY3Rvcikge1xyXG4gICAgY29uc3QgbW91bnROb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcclxuICAgIG1vdW50Tm9kZS5hcHBlbmRDaGlsZCh0aGlzLnZpZXdwb3J0KVxyXG4gIH1cclxuICBnZXRDdXJyZW50TGF5ZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50TGF5ZXJcclxuICB9XHJcblxyXG4gIHNldFRvb2xNYW5hZ2VyKHRvb2xNYW5hZ2VyKSB7XHJcbiAgICB0aGlzLnRvb2xNYW5hZ2VyID0gdG9vbE1hbmFnZXJcclxuICB9XHJcbiAgLy8gdG9vbCByZWxhdGl2ZWQgbWV0aG9kc1xyXG4gIHNldEN1cnJlbnRUb29sKG5hbWUpIHtcclxuICAgIHRoaXMudG9vbE1hbmFnZXIuc2V0Q3VycmVudFRvb2wobmFtZSlcclxuICB9XHJcbiAgcmVnaXN0ZXJUb29sKHRvb2wpIHtcclxuICAgIHRoaXMudG9vbE1hbmFnZXIucmVnaXN0ZXJUb29sKHRvb2wpXHJcbiAgfVxyXG4gIHNldFNldHRpbmcoc2V0dGluZykge1xyXG4gICAgdGhpcy5zZXR0aW5nID0gc2V0dGluZ1xyXG4gIH1cclxuXHJcbiAgLy8g5ZG95Luk55u45YWzXHJcbiAgc2V0Q29tbWFuZE1hbmFnZXIoY29tbWFuZE1hbmFnZXIpIHtcclxuICAgIHRoaXMuY29tbWFuZE1hbmFnZXIgPSBjb21tYW5kTWFuYWdlclxyXG4gIH1cclxuICBleGVjdXRlQ29tbWFuZChuYW1lLCAuLi5wYXJhbXMpIHtcclxuICAgIGlmIChuYW1lID09ICd1bmRvJykge1xyXG4gICAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyLnVuZG8oKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGlmIChuYW1lID09ICdyZWRvJykge1xyXG4gICAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyLnJlZG8oKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIHRoaXMuY29tbWFuZE1hbmFnZXIuZXhlY3V0ZShuYW1lLCAuLi5wYXJhbXMpXHJcbiAgfVxyXG5cclxuICAvLyB6b29tXHJcbiAgc2V0Wm9vbU1hbmFnZXIoem9vbU1hbmFnZXIpIHtcclxuICAgIHpvb21NYW5hZ2VyLnNldEVkaXRvcih0aGlzKVxyXG4gICAgdGhpcy56b29tTWFuYWdlciA9IHpvb21NYW5hZ2VyXHJcbiAgfVxyXG4gIGdldFpvb20oKSB7IC8vIOWwgeijhVxyXG4gICAgcmV0dXJuIHRoaXMuem9vbU1hbmFnZXIuZ2V0Wm9vbSgpXHJcbiAgfVxyXG5cclxuICBnZXRTY3JvbGwoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxMZWZ0LFxyXG4gICAgICB5OiB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxUb3AsXHJcbiAgICB9XHJcbiAgfVxyXG4gIHNldFNjcm9sbCh4LCB5KSB7XHJcbiAgICB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxMZWZ0ID0geFxyXG4gICAgdGhpcy5zdmdDb250YWluZXIuc2Nyb2xsVG9wID0geVxyXG4gIH1cclxuICBnZXRDb250ZW50T2Zmc2V0KCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogdGhpcy5zdmdTdGFnZS5nZXRBdHRyaWJ1dGUoJ3gnKSxcclxuICAgICAgeTogdGhpcy5zdmdTdGFnZS5nZXRBdHRyaWJ1dGUoJ3knKSxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzQ29udGVudEVsZW1lbnQoZWwpIHtcclxuICAgIHdoaWxlIChlbCkge1xyXG4gICAgICBpZiAoZWwucGFyZW50RWxlbWVudCA9PSB0aGlzLnN2Z0NvbnRlbnQpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChlbC5wYXJlbnRFbGVtZW50ID09IHRoaXMuc3ZnUm9vdCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFZGl0b3JcclxuIiwiXHJcbi8qKlxyXG4gKiBjb250ZXh0IGNsYXNzXHJcbiAqIFxyXG4gKiB1c2VkIGZvciB0b29sIGV2ZW50XHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEVkaXRvckV2ZW50Q29udGV4dCB7XHJcbiAgY29uc3RydWN0b3IoZWRpdG9yLCBlKSB7XHJcbiAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IGZhbHNlXHJcbiAgICB0aGlzLm9yaWdpbkV2ZW50ID0gZVxyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICAgIHRoaXMuaXNFbmRJbnNpZGUgPSBmYWxzZVxyXG5cclxuICAgIHRoaXMuc3RhcnRYID0gMFxyXG4gICAgdGhpcy5zdGFydFkgPSAwXHJcblxyXG4gICAgdGhpcy5vZmZzZXRYID0gMFxyXG4gICAgdGhpcy5vZmZzZXRZID0gMFxyXG5cclxuICAgIHRoaXMuc3RhcnRDbGllbnRYID0gMCAvLyB1c2VkIHRvIGNhbGMgZHggYW5kIGR5LlxyXG4gICAgdGhpcy5zdGFydENsaWVudFkgPSAwXHJcbiAgICB0aGlzLmR4ID0gMFxyXG4gICAgdGhpcy5keSA9IDBcclxuXHJcbiAgICB0aGlzLnNldFN0YXJ0UG9zKClcclxuICB9XHJcbiAgc2V0T3JpZ2luRXZlbnQoZSkge1xyXG4gICAgdGhpcy5vcmlnaW5FdmVudCA9IGVcclxuICB9XHJcbiAgc2V0U3RhcnRQb3MoKSB7XHJcbiAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMuZ2V0UG9zKClcclxuXHJcbiAgICB0aGlzLnN0YXJ0WCA9IHhcclxuICAgIHRoaXMuc3RhcnRZID0geVxyXG5cclxuICAgIHRoaXMuc3RhcnRDbGllbnRYID0gdGhpcy5vcmlnaW5FdmVudC5jbGllbnRYXHJcbiAgICB0aGlzLnN0YXJ0Q2xpZW50WSA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WVxyXG4gIH1cclxuICByZWxlYXNlTW91c2UoKSB7XHJcbiAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IGZhbHNlXHJcbiAgfVxyXG4gIHByZXNzTW91c2UoKSB7XHJcbiAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IHRydWVcclxuICB9XHJcbiAgZ2V0UG9zKCkge1xyXG4gICAgY29uc3Qgem9vbSA9IHRoaXMuZWRpdG9yLmdldFpvb20oKVxyXG4gICAgY29uc3Qge3gsIHl9ID0gdGhpcy5lZGl0b3IuZ2V0Q29udGVudE9mZnNldCgpXHJcbiAgICByZXR1cm4geyBcclxuICAgICAgeDogdGhpcy5vcmlnaW5FdmVudC5vZmZzZXRYIC8gem9vbSAtIHgsIFxyXG4gICAgICB5OiB0aGlzLm9yaWdpbkV2ZW50Lm9mZnNldFkgLyB6b29tIC0geSxcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0U3RhcnRQb3MoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiB0aGlzLnN0YXJ0WCxcclxuICAgICAgeTogdGhpcy5zdGFydFksXHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIHdpdGhvdXQgY2FsYyB3aXRoIHpvb20gdmFsdWVcclxuICBnZXREaWZmUG9zKCkge1xyXG4gICAgY29uc3QgeCA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WCAtIHRoaXMuc3RhcnRDbGllbnRYXHJcbiAgICBjb25zdCB5ID0gdGhpcy5vcmlnaW5FdmVudC5jbGllbnRZIC0gdGhpcy5zdGFydENsaWVudFlcclxuICAgIHJldHVybiB7IHgsIHkgfVxyXG4gIH1cclxuXHJcbn0iLCJcclxuLyoqXHJcbiAqIOWvuSBTVkcg5YWD57Sg55qE566A5Y2V5bCB6KOFXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEZFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuZWxfID0gbnVsbFxyXG4gIH1cclxuICBlbCgpIHtcclxuICAgIHJldHVybiB0aGlzLmVsX1xyXG4gIH1cclxuICBzZXRBdHRyKHByb3AsIHZhbCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxfLnNldEF0dHJpYnV0ZShwcm9wLCB2YWwpXHJcbiAgfVxyXG4gIGdldEF0dHIocHJvcCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxfLmdldEF0dHJpYnV0ZShwcm9wKVxyXG4gIH1cclxuICBnZXRCQm94KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxfLmdldEJCb3goKVxyXG4gIH1cclxuICByZW1vdmUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbF8ucmVtb3ZlKClcclxuICB9XHJcbiB9IiwiXHJcbmV4cG9ydCBjbGFzcyBCb3gge1xyXG4gIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgpIHtcclxuICAgIGlmICh0eXBlb2YgeCA9PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aGlzLnggPSB4LnhcclxuICAgICAgdGhpcy55ID0geC55XHJcbiAgICAgIHRoaXMudyA9IHgud2lkdGhcclxuICAgICAgdGhpcy5oID0geC5oZWlnaHRcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMueCA9IHhcclxuICAgICAgdGhpcy55ID0geVxyXG4gICAgICB0aGlzLncgPSB3XHJcbiAgICAgIHRoaXMuaCA9IGhcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLngyID0gdGhpcy54ICsgdGhpcy53XHJcbiAgICB0aGlzLnkyID0gdGhpcy55ICsgdGhpcy5oXHJcbiAgfVxyXG4gIGNvbnRhaW5zKG90aGVyQm94KSB7XHJcbiAgICByZXR1cm4gdGhpcy54IDw9IG90aGVyQm94LnggJiYgdGhpcy55IDw9IG90aGVyQm94LnkgJiZcclxuICAgICAgdGhpcy54MiA+PSBvdGhlckJveC54ICsgb3RoZXJCb3gud2lkdGggJiYgdGhpcy55MiA+PSBvdGhlckJveC55ICsgb3RoZXJCb3guaGVpZ2h0XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgQm94IH0gZnJvbSBcIi4vYm94XCJcclxuaW1wb3J0IHsgUmVjdCB9IGZyb20gXCIuL3JlY3RcIlxyXG5cclxuXHJcbi8qKlxyXG4gKiBGU1ZHXHJcbiAqIFxyXG4gKiBzaW1wbGUgU1ZHRWxlbWVudCBlbmNhcHN1bGF0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGUoZWwpIHtcclxuICBjb25zdCB0YWdOYW1lID0gZWwudGFnTmFtZVxyXG4gIGlmICh0YWdOYW1lID09PSAncmVjdCcpIHtcclxuICAgIHJldHVybiBuZXcgRlNWRy5SZWN0KGVsKVxyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgQ2FuIG5vdCBjcmVhdCAke3RhZ05hbWV9IGluc3RhbmNlLCBubyBtYXRjaCBjbGFzcy5gKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEZTVkcgPSB7XHJcbiAgY3JlYXRlLFxyXG4gIFJlY3QsXHJcbiAgQm94LFxyXG59IiwiXHJcbi8qKlxyXG4gKiDlr7kgcmVjdCDlhYPntKDnmoTnroDljZXlsIHoo4VcclxuICovXHJcblxyXG5pbXBvcnQgeyBOUyB9IGZyb20gXCIuLi9jb25zdGFudHNcIlxyXG5pbXBvcnQgeyBGRWxlbWVudCB9IGZyb20gXCIuL2Jhc2VFbGVtZW50XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWN0IGV4dGVuZHMgRkVsZW1lbnQge1xyXG4gIC8vIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlcik7XHJcbiAgLy8gY29uc3RydWN0b3IoZWw6IFNWR0VsZW1lbnQpO1xyXG4gIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgpIHtcclxuICAgIHN1cGVyKClcclxuICAgIGlmICh0eXBlb2YgeCA9PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aGlzLmVsXyA9IHhcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWxfID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ3JlY3QnKVxyXG4gICAgICB0aGlzLnNldEF0dHIoJ3gnLCB4KVxyXG4gICAgICB0aGlzLnNldEF0dHIoJ3knLCB5KVxyXG4gICAgICB0aGlzLnNldEF0dHIoJ3dpZHRoJywgdylcclxuICAgICAgdGhpcy5zZXRBdHRyKCdoZWlnaHQnLCBoKVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRQb3MoKSB7XHJcbiAgICBjb25zdCB4ID0gcGFyc2VGbG9hdCh0aGlzLmdldEF0dHIoJ3gnKSlcclxuICAgIGNvbnN0IHkgPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cigneScpKVxyXG4gICAgcmV0dXJuIHsgeCwgeSB9XHJcbiAgfVxyXG4gIGRtb3ZlKGR4LCBkeSkge1xyXG4gICAgY29uc3QgcG9zID0gdGhpcy5nZXRQb3MoKVxyXG4gICAgdGhpcy5zZXRBdHRyKCd4JywgcG9zLnggKyBkeClcclxuICAgIHRoaXMuc2V0QXR0cigneScsIHBvcy55ICsgZHkpXHJcbiAgfVxyXG59IiwiLyoqXHJcbiAqIGd1aWRlIGxpbmUgbGF5ZXJcclxuICovXHJcblxyXG5pbXBvcnQgeyBPdXRsaW5lSHVkIH0gZnJvbSBcIi4vb3V0bGluZUh1ZFwiO1xyXG5pbXBvcnQgeyBTZWxlY3RBcmVhIH0gZnJvbSBcIi4vc2VsZWN0QXJlYVwiO1xyXG5jb25zdCB7IE5TIH0gPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEh1ZE1hbmFnZXJ7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdnJylcclxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gJ2h1ZHMnXHJcblxyXG4gICAgdGhpcy5zZWxlY3RBcmVhID0gbmV3IFNlbGVjdEFyZWEodGhpcy5jb250YWluZXIpXHJcbiAgICB0aGlzLm91dGxpbmVIdWQgPSBuZXcgT3V0bGluZUh1ZCh0aGlzLmNvbnRhaW5lcilcclxuICB9XHJcbiAgbW91bnQoZWwpIHtcclxuICAgIGVsLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKVxyXG4gIH1cclxufVxyXG5cclxuIiwiXHJcblxyXG4gIFxyXG5jb25zdCB7IE5TIH0gPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzXCIpO1xyXG5cclxuLyoqXHJcbiAqIDxyZWN0PiBvdXRsaW5lXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT3V0bGluZUh1ZCB7XHJcbiAgY29uc3RydWN0b3IocGFyZW50KSB7XHJcbiAgICB0aGlzLnggPSAwXHJcbiAgICB0aGlzLnkgPSAwXHJcbiAgICB0aGlzLncgPSAwXHJcbiAgICB0aGlzLmggPSAwXHJcblxyXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAnZycpXHJcbiAgICB0aGlzLmNvbnRhaW5lci5pZCA9ICdvdXRsaW5lLWh1ZCdcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcilcclxuXHJcbiAgICB0aGlzLm91dGxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAncGF0aCcpXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKVxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJyNmMDQnKVxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgndmVjdG9yLWVmZmVjdCcsICdub24tc2NhbGluZy1zdHJva2UnKVxyXG5cclxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMub3V0bGluZSlcclxuICB9XHJcbiAgY2xlYXIoKSB7XHJcbiAgICAvLyBwYXJlbnQuaW5uZXJIVE1MID0gJydcclxuICAgIHRoaXMub3V0bGluZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgfVxyXG4gIGRyYXdSZWN0KHgsIHksIHcsIGgpIHtcclxuICAgIHRoaXMueCA9IHhcclxuICAgIHRoaXMueSA9IHlcclxuICAgIHRoaXMudyA9IHdcclxuICAgIHRoaXMuaCA9IGhcclxuXHJcbiAgICAvLyB3aHkgZG9uJ3QgSSB1c2UgcmVjdCwganVzdCBzb2x2ZSB0aGUgY29uZGl0aW9uIHdoZW4gd2lkdGggb3IgaGVpZ2h0IGlzIDAgdGhlIG91dGxpbmUgaXMgZGlzYXBwZXJcclxuICAgIGNvbnN0IGQgPSBgTSAke3h9ICR7eX0gTCAke3grd30gJHt5fSBMICR7eCt3fSAke3kraH0gTCAke3h9ICR7eStofSBaYFxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZCcsIGQpXHJcbiAgICB0aGlzLm91dGxpbmUuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgfVxyXG4gIGdldFdpZHRoKCkgeyByZXR1cm4gdGhpcy53IH1cclxuICBnZXRIZWlnaHQoKSB7IHJldHVybiB0aGlzLmggfVxyXG4gIGdldFgoKSB7IHJldHVybiB0aGlzLnggfVxyXG4gIGdldFkoKSB7IHJldHVybiB0aGlzLnkgfVxyXG59IiwiXHJcbmNvbnN0IHsgTlMgfSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XHJcblxyXG4vKipcclxuICogc2VsZWN0IGFyZWFcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RBcmVhIHtcclxuICBjb25zdHJ1Y3RvcihwYXJlbnQpIHtcclxuICAgIHRoaXMueCA9IDBcclxuICAgIHRoaXMueSA9IDBcclxuICAgIHRoaXMudyA9IDBcclxuICAgIHRoaXMuaCA9IDBcclxuXHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdnJylcclxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gJ3NlbGVjdC1hcmVhJ1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKVxyXG5cclxuICAgIHRoaXMub3V0bGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdwYXRoJylcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAnIzA1NCcpXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd2ZWN0b3ItZWZmZWN0JywgJ25vbi1zY2FsaW5nLXN0cm9rZScpXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UtZGFzaGFycmF5JywgJzRweCcpXHJcblxyXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5vdXRsaW5lKVxyXG4gIH1cclxuICBjbGVhcigpIHtcclxuICAgIC8vIHBhcmVudC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgdGhpcy5vdXRsaW5lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICB9XHJcbiAgZHJhd1JlY3QoeCwgeSwgdywgaCkge1xyXG4gICAgdGhpcy54ID0geFxyXG4gICAgdGhpcy55ID0geVxyXG4gICAgdGhpcy53ID0gd1xyXG4gICAgdGhpcy5oID0gaFxyXG5cclxuICAgIC8vIHdoeSBkb24ndCBJIHVzZSByZWN0LCBqdXN0IHNvbHZlIHRoZSBjb25kaXRpb24gd2hlbiB3aWR0aCBvciBoZWlnaHQgaXMgMCB0aGUgb3V0bGluZSBpcyBkaXNhcHBlclxyXG4gICAgY29uc3QgZCA9IGBNICR7eH0gJHt5fSBMICR7eCt3fSAke3l9IEwgJHt4K3d9ICR7eStofSBMICR7eH0gJHt5K2h9IFpgXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdkJywgZClcclxuXHJcbiAgICAvKiB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd4JywgeClcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3knLCB5KVxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3KVxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaCkgKi9cclxuICAgIHRoaXMub3V0bGluZS5zdHlsZS5kaXNwbGF5ID0gJydcclxuICB9XHJcbiAgZ2V0V2lkdGgoKSB7IHJldHVybiB0aGlzLncgfVxyXG4gIGdldEhlaWdodCgpIHsgcmV0dXJuIHRoaXMuaCB9XHJcbiAgZ2V0WCgpIHsgcmV0dXJuIHRoaXMueCB9XHJcbiAgZ2V0WSgpIHsgcmV0dXJuIHRoaXMueSB9XHJcbiAgZ2V0Qm94KCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogdGhpcy54LFxyXG4gICAgICB5OiB0aGlzLnksXHJcbiAgICAgIHdpZHRoOiB0aGlzLncsXHJcbiAgICAgIGhlaWdodDogdGhpcy5oLFxyXG4gICAgICB3OiB0aGlzLncsXHJcbiAgICAgIGg6IHRoaXMuaCxcclxuICAgIH1cclxuICB9XHJcbn0iLCJcclxuaW1wb3J0IHsgZ2V0Qm94QnkycG9pbnRzIH0gZnJvbSBcIi4uL3V0aWwvbWF0aFwiXHJcblxyXG5jbGFzcyBBZGRSZWN0IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuZWRpdG9yID0gbnVsbFxyXG4gIH1cclxuICBuYW1lKCkge1xyXG4gICAgcmV0dXJuICdhZGRSZWN0J1xyXG4gIH1cclxuICBzZXRFZGl0b3IoZWRpdG9yKSB7IC8vIOS+nei1luazqOWFpVxyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICB9XHJcbiAgc3RhcnQoY3R4KSB7fVxyXG4gIG1vdmUoY3R4KSB7XHJcbiAgICBjb25zdCB7IHg6IGVuZFgsIHk6IGVuZFkgfSA9IGN0eC5nZXRQb3MoKVxyXG4gICAgY29uc3QgeyB4OiBzdGFydFgsIHk6IHN0YXJ0WSB9ID0gY3R4LmdldFN0YXJ0UG9zKClcclxuICAgIGNvbnN0IHsgeCwgeSwgdywgaCB9ID0gZ2V0Qm94QnkycG9pbnRzKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZKVxyXG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lSHVkLmRyYXdSZWN0KHgsIHksIHcsIGgpXHJcbiAgfVxyXG4gIGVuZChjdHgpIHtcclxuICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIub3V0bGluZUh1ZC5jbGVhcigpXHJcblxyXG4gICAgY29uc3QgeyB4OiBlbmRYLCB5OiBlbmRZIH0gPSBjdHguZ2V0UG9zKClcclxuICAgIGNvbnN0IHsgeDogc3RhcnRYLCB5OiBzdGFydFkgfSA9IGN0eC5nZXRTdGFydFBvcygpXHJcbiAgICBjb25zdCB7IHgsIHksIHcsIGggfSA9IGdldEJveEJ5MnBvaW50cyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSlcclxuICAgIGlmICh3IDwgMiAmJiBoIDwgMikge1xyXG4gICAgICAvLyBUT0RPOiBvcGVuIGEgZGlhbG9nIHRvIGlucHV0IHdpZHRoIGFuZCBoZWlnaHRcclxuICAgICAgY29uc29sZS5sb2coJ3dpZHRoIGFuZCBoZWlnaHQgYm90aCBsZXNzIGVxdWFsIHRvIDLvvIxkcmF3aW5nIG5vdGhpbmcnKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdhZGRSZWN0JywgeCwgeSwgdywgaClcclxuICB9XHJcbiAgLy8gbW91c2Vkb3duIG91dHNpZGUgdmlld3BvcnRcclxuICBlbmRPdXRzaWRlKCkge1xyXG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lSHVkLmNsZWFyKClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFkZFJlY3QiLCJcclxuZXhwb3J0IGNsYXNzIERyYWdDYW52YXMge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zdGFydE9mZnNldFggPSAwXHJcbiAgICB0aGlzLnN0YXJ0T2Zmc2V0WSA9IDBcclxuICB9XHJcbiAgbmFtZSgpIHtcclxuICAgIHJldHVybiAnZHJhZ0NhbnZhcydcclxuICB9XHJcbiAgc2V0RWRpdG9yKGVkaXRvcikgeyAvLyDkvp3otZbms6jlhaVcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgfVxyXG4gIGJlZm9yZUFjdGl2ZSgpIHtcclxuICAgIC8vIGRvIHNvbWV0aGluZyBiZWZvcmUgc3dpdGNoIHRvIGN1cnJlbnQgdG9vbFxyXG4gIH1cclxuICBzdGFydChjdHgpIHtcclxuICAgIGNvbnN0IHNjcm9sbCA9IHRoaXMuZWRpdG9yLmdldFNjcm9sbCgpXHJcbiAgICB0aGlzLnN0YXJ0T2Zmc2V0WCA9IHNjcm9sbC54XHJcbiAgICB0aGlzLnN0YXJ0T2Zmc2V0WSA9IHNjcm9sbC55XHJcbiAgfVxyXG4gIG1vdmUoY3R4KSB7XHJcbiAgICBjb25zdCB6b29tID0gdGhpcy5lZGl0b3IuZ2V0Wm9vbSgpXHJcbiAgICBjb25zdCB7IHg6IGR4LCB5OiBkeSB9ID0gY3R4LmdldERpZmZQb3MoKVxyXG4gICAgdGhpcy5lZGl0b3Iuc2V0U2Nyb2xsKHRoaXMuc3RhcnRPZmZzZXRYIC0gZHgsIHRoaXMuc3RhcnRPZmZzZXRZIC0gZHkpXHJcbiAgfVxyXG4gIGVuZCgpIHt9XHJcbiAgZW5kT3V0c2lkZSgpIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgRlNWRyB9IGZyb20gXCIuLi9lbGVtZW50XCJcclxuaW1wb3J0IHsgZ2V0Qm94QnkycG9pbnRzIH0gZnJvbSBcIi4uL3V0aWwvbWF0aFwiXHJcblxyXG4vKipcclxuICogc2VsZWN0XHJcbiAqIFxyXG4gKiDmraTmqKHlnZfpnZ7luLjlpI3mnYJcclxuICogXHJcbiAqIDEuIOm8oOagh+aMieS4i+aXtu+8jOmAieS4reWNleS4quWFg+e0oFxyXG4gKiAyLiDpvKDmoIfmjInkuIvkuLrnqbrvvIzmi5bmi73ml7bkuqfnlJ/pgInkuK3moYbvvIzlj6/ku6XpgInmi6nlpJrkuKrlhYPntKBcclxuICogMy4g6YCJ5Lit5Y2V5Liq77yI5oiW6YCJ5Yy66YCJ5Lit5aSa5Liq77yJIOe8qeaUviDnrYnmjqfliLbngrnvvIzmi5bmi73mlLnlj5jlrr3pq5hcclxuICogMy4g5YiH5pat5YiA6L+Z5Liq5bel5YW35pe277yM5r+A5rS755qE5YWD57Sg6L+b5YWl6KKr6YCJ5Lit54q25oCB77yI6L2u5buT57q/K+aOp+WItueCue+8ieOAglxyXG4gKiA0LiDpgInljLrlkozlhYPntKDnm7jkuqTnmoTliKTlrppcclxuICogNS4g5r+A5rS75YWD57Sg5aaC5L2V5L+d5a2Y77yM5L+d5a2Y5Yiw5ZOq6YeMXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VsZWN0IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuZWRpdG9yID0gbnVsbFxyXG4gICAgdGhpcy5zZWxlY3RlZEVscyA9IFtdXHJcblxyXG4gICAgdGhpcy5vdXRsaW5lU3RhcnRYID0gMFxyXG4gICAgdGhpcy5vdXRsaW5lU3RhcnRZID0gMFxyXG4gIH1cclxuICBuYW1lKCkge1xyXG4gICAgcmV0dXJuICdzZWxlY3QnXHJcbiAgfVxyXG4gIHNldEVkaXRvcihlZGl0b3IpIHtcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgfVxyXG4gIGhhc1NlbGVjdGVkRWxzV2hlblN0YXJ0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRFbHMubGVuZ3RoID4gMFxyXG4gIH1cclxuICBzdGFydChjdHgpIHtcclxuICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBjdHgub3JpZ2luRXZlbnQudGFyZ2V0XHJcbiAgICBpZiAoIXRoaXMuZWRpdG9yLmlzQ29udGVudEVsZW1lbnQodGFyZ2V0RWxlbWVudCkpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0RkVsZW1lbnQgPSBuZXcgRlNWRy5SZWN0KHRhcmdldEVsZW1lbnQpIC8vIOaaguaXtuWPquaYryByZWN0IFRPRE86IOaUueS4uumAmueUqOWGmeazlVxyXG4gICAgdGhpcy5zZWxlY3RlZEVscyA9IFsgdGFyZ2V0RkVsZW1lbnQgXSAvLyDpvKDmoIfmjInkuIvml7bvvIzlsLHpgInkuK3kuobkuIDkuKrlhYPntKBcclxuICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KHRhcmdldEZFbGVtZW50LmdldEF0dHIoJ3gnKSlcclxuICAgIGNvbnN0IHkgPSBwYXJzZUZsb2F0KHRhcmdldEZFbGVtZW50LmdldEF0dHIoJ3knKSlcclxuICAgIGNvbnN0IHcgPSBwYXJzZUZsb2F0KHRhcmdldEZFbGVtZW50LmdldEF0dHIoJ3dpZHRoJykpXHJcbiAgICBjb25zdCBoID0gcGFyc2VGbG9hdCh0YXJnZXRGRWxlbWVudC5nZXRBdHRyKCdoZWlnaHQnKSlcclxuXHJcbiAgICB0aGlzLm91dGxpbmVTdGFydFggPSB4XHJcbiAgICB0aGlzLm91dGxpbmVTdGFydFkgPSB5XHJcblxyXG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lSHVkLmRyYXdSZWN0KHgsIHksIHcsIGgpXHJcbiAgfVxyXG4gIG1vdmUoY3R4KSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzU2VsZWN0ZWRFbHNXaGVuU3RhcnQoKSkgeyAvLyBkcmF3IHNlbGVjdGluZyBhcmVhXHJcbiAgICAgIC8vIHNlbGVjdCBubyBlbGVtZW50LCBkcmF3IHNlbGVjdCByZWN0XHJcbiAgICAgIGNvbnN0IHsgeDogZW5kWCwgeTogZW5kWSB9ID0gY3R4LmdldFBvcygpXHJcbiAgICAgIGNvbnN0IHsgeDogc3RhcnRYLCB5OiBzdGFydFkgfSA9IGN0eC5nZXRTdGFydFBvcygpXHJcbiAgICAgIGNvbnN0IHsgeCwgeSwgdywgaCB9ID0gZ2V0Qm94QnkycG9pbnRzKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZKVxyXG4gICAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLnNlbGVjdEFyZWEuZHJhd1JlY3QoeCwgeSwgdywgaClcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyB4OiBkeCwgeTogZHkgfSA9IGN0eC5nZXREaWZmUG9zKClcclxuICAgIGNvbnN0IG91dGxpbmVIdWQgPSB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWRcclxuICAgIGNvbnN0IHcgPSBvdXRsaW5lSHVkLmdldFdpZHRoKClcclxuICAgIGNvbnN0IGggPSBvdXRsaW5lSHVkLmdldEhlaWdodCgpXHJcbiAgICBvdXRsaW5lSHVkLmRyYXdSZWN0KHRoaXMub3V0bGluZVN0YXJ0WCArIGR4LCB0aGlzLm91dGxpbmVTdGFydFkgKyBkeSwgdywgaClcclxuICB9XHJcbiAgZW5kKGN0eCkge1xyXG4gICAgaWYgKCF0aGlzLmhhc1NlbGVjdGVkRWxzV2hlblN0YXJ0KCkpIHsgLy8gZmluaXNoZWQgZHJhd24gc2VsZWN0aW5nIGFyZWFcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKCdzZWxlY3QgYXJlYScpXHJcbiAgICAgIGNvbnN0IGJveCA9IHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIuc2VsZWN0QXJlYS5nZXRCb3goKVxyXG4gICAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLnNlbGVjdEFyZWEuY2xlYXIoKVxyXG5cclxuICAgICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzSW5Cb3goYm94KVxyXG5cclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuY2xlYXIoKVxyXG5cclxuICAgIFxyXG4gICAgY29uc3QgeyB4OiBkeCwgeTogZHkgfSA9IGN0eC5nZXREaWZmUG9zKClcclxuICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdkbW92ZScsIHRoaXMuc2VsZWN0ZWRFbHMsIGR4LCBkeSlcclxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVscyh0aGlzLnNlbGVjdGVkRWxzKSAvLyBzZXQgZ2xvYmFsIGFjdGl2ZWQgZWxlbWVudHNcclxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxyXG4gIH1cclxuICAvLyBtb3VzZWRvd24gb3V0c2lkZSB2aWV3cG9ydFxyXG4gIGVuZE91dHNpZGUoKSB7XHJcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuY2xlYXIoKVxyXG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5zZWxlY3RBcmVhLmNsZWFyKClcclxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLmNsZWFyKClcclxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxyXG4gIH1cclxufVxyXG4iLCIvKiogem9vbSAqL1xyXG5cclxuY29uc3QgeyBnZXRWaWV3Qm94IH0gPSByZXF1aXJlKFwiLi4vdXRpbC9zdmdcIilcclxuXHJcbmV4cG9ydCBjbGFzcyBab29tTWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcclxuICB9XHJcbiAgc2V0RWRpdG9yKGVkaXRvcikge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICB9XHJcbiAgZ2V0Wm9vbSgpIHtcclxuICAgIGNvbnN0IGFjdHVsV2lkdGggPSBwYXJzZUZsb2F0KHRoaXMuZWRpdG9yLnN2Z1Jvb3QuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKVxyXG4gICAgY29uc3Qgdmlld0JveCA9IGdldFZpZXdCb3godGhpcy5lZGl0b3Iuc3ZnUm9vdClcclxuICAgIGNvbnN0IHpvb20gPSBhY3R1bFdpZHRoIC8gdmlld0JveC53XHJcbiAgICByZXR1cm4gem9vbVxyXG4gIH1cclxuICBzZXRab29tKHpvb20pIHtcclxuICAgIGNvbnNvbGUubG9nKHpvb20pXHJcbiAgICBjb25zdCB2aWV3Qm94ID0gZ2V0Vmlld0JveCh0aGlzLmVkaXRvci5zdmdSb290KVxyXG4gICAgY29uc3Qgd2lkdGggPSB2aWV3Qm94LncgKiB6b29tXHJcbiAgICBjb25zdCBoZWlnaHQgPSB2aWV3Qm94LmggKiB6b29tXHJcbiAgICB0aGlzLmVkaXRvci5zdmdSb290LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aClcclxuICAgIHRoaXMuZWRpdG9yLnN2Z1Jvb3Quc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoZWlnaHQpXHJcbiAgfVxyXG4gIHpvb21JbigpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRab29tID0gdGhpcy5nZXRab29tKClcclxuICAgIHRoaXMuc2V0Wm9vbShjdXJyZW50Wm9vbSArIDAuMSlcclxuICB9XHJcbiAgem9vbU91dCgpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRab29tID0gdGhpcy5nZXRab29tKClcclxuICAgIHRoaXMuc2V0Wm9vbShjdXJyZW50Wm9vbSAtIDAuMSlcclxuICB9XHJcbn0iLCJcclxuZXhwb3J0IGNsYXNzIEVkaXRvclNldHRpbmcge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zZXR0aW5nID0ge1xyXG4gICAgICAvLyBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIC8vIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICAvLyBzdHJva2VXaWR0aDogJzJweCcsXHJcblxyXG4gICAgICAvLyBvdXRsaW5lV2lkdGhcclxuICAgICAgLy8gb3V0bGluZUNvbG9yXHJcbiAgICB9XHJcbiAgICB0aGlzLmJpbmRlZEV2ZW50Rm5zID0ge31cclxuICAgIHRoaXMuc2V0RmlsbCgnI2ZmZicpXHJcbiAgICB0aGlzLnNldFN0cm9rZSgnIzAwMCcpXHJcbiAgICB0aGlzLnNldCgnc3Ryb2tlV2lkdGgnLCAnMXB4JylcclxuICB9XHJcbiAgc2V0RmlsbCh2YWwpIHtcclxuICAgIHRoaXMuc2V0KCdmaWxsJywgdmFsKVxyXG4gIH1cclxuICBzZXRTdHJva2UodmFsKSB7XHJcbiAgICB0aGlzLnNldCgnc3Ryb2tlJywgdmFsKVxyXG4gIH1cclxuICBzZXQobmFtZSwgdmFsKSB7XHJcbiAgICB0aGlzLnNldHRpbmdbbmFtZV0gPSB2YWxcclxuXHJcbiAgICBjb25zdCB0b0NhbGxGbnMgPSB0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdXHJcbiAgICBpZiAodG9DYWxsRm5zKSB7XHJcbiAgICAgIHRvQ2FsbEZucy5mb3JFYWNoKGZuID0+IHtcclxuICAgICAgICBmbih2YWwpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldChuYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5nW25hbWVdXHJcbiAgfVxyXG4gIGJpbmRFdmVudChuYW1lLCBmbikge1xyXG4gICAgaWYgKCF0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdKSB7XHJcbiAgICAgIHRoaXMuYmluZGVkRXZlbnRGbnNbbmFtZV0gPSBbXVxyXG4gICAgfVxyXG4gICAgdGhpcy5iaW5kZWRFdmVudEZuc1tuYW1lXS5wdXNoKGZuKVxyXG4gIH1cclxuICByZW1vdmVFdmVudChuYW1lLCBmbikge1xyXG4gICAgaWYgKCF0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdKSByZXR1cm4gZmFsc2VcclxuXHJcbiAgICBjb25zdCByZW1vdmVGbklkeCA9IHRoaXMuYmluZGVkRXZlbnRGbnNbbmFtZV0uZmluZEluZGV4KGZuKVxyXG4gICAgaWYgKHJlbW92ZUZuSWR4ID09PSAtMSkgcmV0dXJuIGZhbHNlXHJcbiAgICB0aGlzLmJpbmRlZEV2ZW50Rm5zLnNwbGljZShyZW1vdmVGbklkeCwgMSlcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG59IiwiLyoqXHJcbiAqIGVkaXRvciBnbG9iYWwgc2hvcnRjdXRcclxuICovXHJcbmltcG9ydCB7IGlzRGVidWcgfSBmcm9tIFwiLi9kZXZDb25maWdcIlxyXG5cclxuZXhwb3J0IGNsYXNzIFNob3J0Y3V0IHtcclxuICBjb25zdHJ1Y3RvcihlZGl0b3IpIHtcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgICB0aGlzLnJlZ2lzdGVyZWRGbnMgPSB7fVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZSA9PiB7XHJcbiAgICAgIGNvbnN0IHByZXNzS2V5TmFtZSA9IGdldFByZXNzS2V5TmFtZShlKVxyXG4gICAgICBjb25zdCBmbiA9IHRoaXMucmVnaXN0ZXJlZEZuc1twcmVzc0tleU5hbWVdXHJcbiAgICAgIGlmIChmbikge1xyXG4gICAgICAgIC8qKiBkZWJ1ZyAqL1xyXG4gICAgICAgIGlmKGlzRGVidWcpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHByZXNzS2V5TmFtZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqIGRlYnVnIGVuZCAqL1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIGZuLmZuKGUpXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9LCBmYWxzZSlcclxuICB9XHJcbiAgLy8gdGhpcy5yZWdpc3RlcigndW5kbycsICdDdHJsK1onLCAoKSA9PiB7IGVkaXRvci5leGVjQ29tbWFuZCgndW5kbycpIH0pXHJcbiAgcmVnaXN0ZXIoY21kTmFtZSwgc2hvcnRjdXROYW1lLCBmbikge1xyXG4gICAgLy8gVE9ETzogdmFsaWQgc2hvcnRjdXROYW1lXHJcbiAgICB0aGlzLnJlZ2lzdGVyZWRGbnNbc2hvcnRjdXROYW1lXSA9IHsgY21kTmFtZSwgZm4gfVxyXG4gICAgXHJcbiAgfVxyXG4gIGZvcm1hdFByaW50KCkge1xyXG4gICAgY29uc3QgYXJyID0gW11cclxuICAgIGZvciAobGV0IHNob3J0Y3V0TmFtZSBpbiB0aGlzLnJlZ2lzdGVyZWRGbnMpIHtcclxuICAgICAgY29uc3QgY21kTmFtZSA9IHRoaXMucmVnaXN0ZXJlZEZuc1tzaG9ydGN1dE5hbWVdLmNtZE5hbWVcclxuICAgICAgYXJyLnB1c2goY21kTmFtZSArICc6ICcgKyBzaG9ydGN1dE5hbWUpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyLmpvaW4oJywgJylcclxuICB9XHJcbiAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFByZXNzS2V5TmFtZShlKSB7XHJcbiAgY29uc3QgcHJlc3NlZEtleXMgPSBbXVxyXG4gIGlmIChlLmN0cmxLZXkpIHByZXNzZWRLZXlzLnB1c2goJ0N0cmwnKVxyXG4gIGlmIChlLm1ldGFLZXkpIHByZXNzZWRLZXlzLnB1c2goJ0NtZCcpXHJcbiAgaWYgKGUuc2hpZnRLZXkpIHByZXNzZWRLZXlzLnB1c2goJ1NoaWZ0JylcclxuICAvLyBvbmx5IGNoZWNrIEF+WlxyXG4gIC8vIFRPRE86IHJlc29sdmUgYWxsIGtleVxyXG4gIGlmICgvS2V5Li8udGVzdChlLmNvZGUpKSB7XHJcbiAgICBwcmVzc2VkS2V5cy5wdXNoKGUuY29kZVtlLmNvZGUubGVuZ3RoIC0gMV0pXHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgcHJlc3NlZEtleXMucHVzaChlLmNvZGUpXHJcbiAgfVxyXG4gIGNvbnN0IG5hbWUgPSBwcmVzc2VkS2V5cy5qb2luKCcrJylcclxuICByZXR1cm4gbmFtZVxyXG59IiwiY29uc3QgeyBFZGl0b3JFdmVudENvbnRleHQgfSA9IHJlcXVpcmUoXCIuL2VkaXRvckV2ZW50Q29udGV4dFwiKVxyXG5cclxuZXhwb3J0IGNsYXNzIFRvb2xNYW5hZ2VyIHtcclxuICBjb25zdHJ1Y3RvcihlZGl0b3IpIHtcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgICB0aGlzLnRvb2xzID0ge31cclxuICAgIHRoaXMuY3VycmVudFRvb2wgPSBudWxsXHJcbiAgICB0aGlzLmludm9rZVdoZW5Td2l0Y2ggPSAoKSA9PiB7fVxyXG5cclxuICAgIHRoaXMuY3R4ID0gbnVsbCAvLyB0b29sIGNvbnRleHRcclxuICB9XHJcbiAgc2V0Q3VycmVudFRvb2wobmFtZSkge1xyXG4gICAgdGhpcy5jdXJyZW50VG9vbCA9IHRoaXMudG9vbHNbbmFtZV1cclxuICAgIHRoaXMuaW52b2tlV2hlblN3aXRjaCh0aGlzLmdldEN1cnJlbnRUb29sTmFtZSgpKVxyXG4gIH1cclxuICBvblN3aXRjaFRvb2woZm4pIHtcclxuICAgIHRoaXMuaW52b2tlV2hlblN3aXRjaCA9IGZuXHJcbiAgfVxyXG4gIGdldEN1cnJlbnRUb29sTmFtZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRUb29sLm5hbWUoKVxyXG4gIH1cclxuICByZWdpc3RlclRvb2wodG9vbCkge1xyXG4gICAgdGhpcy50b29sc1t0b29sLm5hbWUoKV0gPSB0b29sXHJcbiAgICB0b29sLnNldEVkaXRvcih0aGlzLmVkaXRvcikgLy8gZGVwZW5kZW5jeSBpbmplY3Rpb25cclxuICB9XHJcblxyXG4gIGJpbmRUb29sRXZlbnQoKSB7XHJcbiAgICBjb25zdCBzdmdSb290ID0gdGhpcy5lZGl0b3Iuc3ZnUm9vdFxyXG5cclxuICAgIHN2Z1Jvb3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZSA9PiB7XHJcbiAgICAgIGNvbnN0IGN0eCA9IG5ldyBFZGl0b3JFdmVudENvbnRleHQodGhpcy5lZGl0b3IsIGUpXHJcbiAgICAgIHRoaXMuY3R4ID0gY3R4XHJcbiAgICAgIHRoaXMuY3VycmVudFRvb2wuc3RhcnQoY3R4KVxyXG4gICAgfSwgZmFsc2UpXHJcblxyXG4gICAgc3ZnUm9vdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcclxuICAgICAgY29uc3QgY3R4ID0gdGhpcy5jdHhcclxuXHJcbiAgICAgIGlmICghY3R4KSByZXR1cm4gLy8gaWYgY3R4IGV4aXRzLCBwcmVzZW50IG1vdXNlZG93biBldmVudCBlbWl0IGp1c3QgYmVmb3JlXHJcbiAgICAgIGN0eC5zZXRPcmlnaW5FdmVudChlKVxyXG4gICAgICBjdHgucHJlc3NNb3VzZSgpXHJcbiAgICAgIHRoaXMuY3VycmVudFRvb2wubW92ZShjdHgpIC8vIG1vdmVcclxuICAgIH0sIGZhbHNlKVxyXG4gICAgXHJcbiAgICBzdmdSb290LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlID0+IHtcclxuICAgICAgLy8gdGhpcy5jdHgucmVsZWFzZU1vdXNlKClcclxuICAgICAgY29uc3QgY3R4ID0gdGhpcy5jdHhcclxuICAgICAgLy8gY3R4LnNldE9yaWdpbkV2ZW50KGUpIC8vIHRoZSBvZmZzZXRYIGFuZCBvZmZzZXRZIGluIG1vdXNldXAgYW5kIHRoZSBsYXN0IG1vdXNlbW92ZSBpcyBub3QgZXF1YWwgPz8gXHJcbiAgICAgIHRoaXMuY3VycmVudFRvb2wuZW5kKGN0eClcclxuICAgICAgY3R4LmlzRW5kSW5zaWRlID0gdHJ1ZVxyXG4gICAgfSwgZmFsc2UpXHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlID0+IHtcclxuICAgICAgaWYgKHRoaXMuY3R4ICYmIHRoaXMuY3R4LmlzRW5kSW5zaWRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VG9vbC5lbmRPdXRzaWRlKHRoaXMuY3R4KVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY3R4ID0gbnVsbFxyXG4gICAgfSwgZmFsc2UpXHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgRlNWRyB9IGZyb20gXCIuLi9lbGVtZW50XCJcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ZhaWxkQ29sb3JWYWwoKSB7XHJcbiAgLy8gVE9ETzpcclxuICAvLyAxLiBhbGwgY29sb3IgYnJvd2VyIHN1cHBvcnRlZFxyXG4gIC8vIDIuICNmZmYgYW5kICNmMGYwZjBcclxuICAvLyAzLiByZ2IoeCx4LHgpXHJcbiAgLy8gLi4uXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50c0luQm94KGJveCwgcGFyZW50KSB7XHJcbiAgY29uc3QgdGFnTmFtZUZvcmJpZExpc3QgPSBbJ2cnXVxyXG4gIGJveCA9IG5ldyBGU1ZHLkJveChib3gpXHJcbiAgY29uc3QgZWxzSW5Cb3ggPSBbXVxyXG5cclxuICBmdW5jdGlvbiByKGJveCwgcGFyZW50KSB7XHJcbiAgICBjb25zdCBlbGVtZW50cyA9IHBhcmVudC5jaGlsZHJlblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBlbCA9IGVsZW1lbnRzW2ldIC8vIEZTVkcuY3JlYXRlKGVsZW1lbnRzW2ldKVxyXG5cclxuICAgICAgaWYgKCF0YWdOYW1lRm9yYmlkTGlzdC5pbmNsdWRlcyhlbC50YWdOYW1lKSkge1xyXG4gICAgICAgIGNvbnN0IGJib3ggPSBlbC5nZXRCQm94KClcclxuICAgICAgICBpZiAoYm94LmNvbnRhaW5zKGJib3gpKSB7XHJcbiAgICAgICAgICBlbHNJbkJveC5wdXNoKCBGU1ZHLmNyZWF0ZShlbCkpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZWwuY2hpbGRyZW4ubGVuZ3RoID4gMCkgcihib3gsIGVsKVxyXG4gICAgfVxyXG4gIH1cclxuICByKGJveCwgcGFyZW50KVxyXG4gIHJldHVybiBlbHNJbkJveFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdW5pcShhcnIpIHtcclxuICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGFycikpXHJcbn0iLCJcclxuZXhwb3J0IGZ1bmN0aW9uIGdldEJveEJ5MnBvaW50cyh4MSwgeTEsIHgyLCB5Mikge1xyXG4gIGxldCB4LCB5LCB3LCBoXHJcbiAgdyA9IE1hdGguYWJzKHgyIC0geDEpXHJcbiAgaCA9IE1hdGguYWJzKHkyIC0geTEpXHJcbiAgeCA9IE1hdGgubWluKHgyLCB4MSlcclxuICB5ID0gTWF0aC5taW4oeTIsIHkxKVxyXG4gIHJldHVybiB7IHgsIHksIHcsIGggfVxyXG59XHJcbiIsIlxyXG4vLyBUT0RPOiB0byBmaW5pc2hcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFZpZXdCb3goZWwpIHtcclxuICBjb25zdCB2YWwgPSBlbC5nZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnKVxyXG4gIGlmICghdmFsKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2hhcyBub3Qgdmlld0JveCBhdHRyaWJ1dGUnKVxyXG4gIH1cclxuICBjb25zdCBbeCwgeSwgdywgaF0gPSB2YWwuc3BsaXQoL1tcXHMsXSsvKS5tYXAoaXRlbSA9PiBwYXJzZUZsb2F0KGl0ZW0pKVxyXG4gIHJldHVybiB7IHgsIHksIHcsIGggfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=