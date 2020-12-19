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
  isEmpty() {
    return this.els.length == 0
  }
  remove() {
    if (this.isEmpty()) return
    this.editor.executeCommand('removeElements', this.els)
    this.clear()
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
    if (this.isEmpty()) return
    this.editor.executeCommand('setAttr', this.els, name, val)
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
  editor.activedElsManager.remove()
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
    this.resigterCommandClass(_commands__WEBPACK_IMPORTED_MODULE_0__.removeElements)
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
    const name = commandClass.name().toLowerCase()
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
/*! export removeElements [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddRect": () => /* binding */ AddRect,
/* harmony export */   "removeElements": () => /* binding */ removeElements,
/* harmony export */   "DMove": () => /* binding */ DMove,
/* harmony export */   "SetAttr": () => /* binding */ SetAttr
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
class AddRect extends BaseCommand {
  constructor(editor, x, y, w, h) {
    super()
    this.editor = editor
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

class removeElements extends BaseCommand {
  constructor(editor, els) {
    super()
    this.editor = editor

    // TODO:
  }
  static name() {
    return 'removeElements'
  }
  redo() {
    
  }
  undo() {

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2FjdGl2ZWRFbHNNYW5hZ2VyLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvY29tbWFuZC9jb21tYW5kTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2NvbW1hbmQvY29tbWFuZHMuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3JFdmVudENvbnRleHQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lbGVtZW50L2Jhc2VFbGVtZW50LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvZWxlbWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2VsZW1lbnQvcmVjdC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2xheWVyL2h1ZE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9sYXllci9vdXRsaW5lSHVkLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbGF5ZXIvc2VsZWN0QXJlYS5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvYWRkUmVjdC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvZHJhZ0NhbnZhcy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL21vZHVsZXMvc2VsZWN0LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy96b29tLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvc2V0dGluZy9lZGl0b3JTZXR0aW5nLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvc2hvcnRjdXQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy90b29sTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL3V0aWwvbWF0aC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL3V0aWwvc3ZnLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsb0JBQW9CO0FBQ2pDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEVBLENBQWdDO0FBQ1U7QUFDVTtBQUNJO0FBQ0U7QUFDWDtBQUNIO0FBQ0U7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FB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Ozs7O0FDNUNBLE9BQU8scUJBQXFCLEdBQUcsbUJBQU8sQ0FBQyx5REFBc0I7O0FBRXREO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMURPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUEE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7Ozs7Ozs7VUNUQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYXBwLjBkMTIyYjI2MWYwYjgzMmJiYzFkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOa/gOa0u+WFg+e0oOeuoeeQhuexu1xyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBBY3RpdmVkRWxzTWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gICAgdGhpcy5lbHMgPSBbXVxyXG4gIH1cclxuICBzZXRFbHMoZWxzKSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxzKSkgZWxzID0gW2Vsc11cclxuICAgIHRoaXMuZWxzID0gZWxzXHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmVkaXRvci50b29sTWFuYWdlci5nZXRDdXJyZW50VG9vbE5hbWUoKSlcclxuICAgIC8vIFRPRE86IGhpZ2hsaWdodCBvdXRsaW5lLCBhY2NvcmRpbmcgdG8gY3VycmVudCB0b29sXHJcbiAgICB0aGlzLmhlaWdobGlndGhFbHMoKVxyXG4gICAgdGhpcy5zZXRTZXR0aW5nRmlsbCgpXHJcbiAgfVxyXG4gIGlzRW1wdHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbHMubGVuZ3RoID09IDBcclxuICB9XHJcbiAgcmVtb3ZlKCkge1xyXG4gICAgaWYgKHRoaXMuaXNFbXB0eSgpKSByZXR1cm5cclxuICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdyZW1vdmVFbGVtZW50cycsIHRoaXMuZWxzKVxyXG4gICAgdGhpcy5jbGVhcigpXHJcbiAgfVxyXG4gIGNsZWFyKCkge1xyXG4gICAgdGhpcy5lbHMgPSBbXVxyXG4gICAgLy8gY2xlYXIgb3V0bGluZVxyXG4gICAgY29uc3QgaHVkTWFuYWdlciA9IHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXJcclxuICAgIGh1ZE1hbmFnZXIub3V0bGluZUh1ZC5jbGVhcigpXHJcbiAgfVxyXG4gIGNvbnRhaW5zKGVsKSB7XHJcbiAgICAvLyBUT0RPOlxyXG4gIH1cclxuICBnZXRNZXJnZUJCb3goKSB7XHJcbiAgICAvLyBUT0RPOlxyXG4gICAgLyogbGV0IHgsIHksIHcsIGhcclxuICAgIHRoaXMuZWxzLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICBjb25zdCBiYm94ID0gZWwuZWwoKS5nZXRiYm94KClcclxuICAgIH0pICovXHJcbiAgfVxyXG4gIC8vIGhlaWdodGxpZ2h0IHRoZSBlbGVtZW50c1xyXG4gIGhlaWdobGlndGhFbHMoKSB7XHJcbiAgICAvLyBUT0RPOlxyXG4gICAgY29uc3QgZWxzID0gdGhpcy5lbHNcclxuICAgIGNvbnN0IGh1ZE1hbmFnZXIgPSB0aGlzLmVkaXRvci5odWRNYW5hZ2VyXHJcbiAgICBlbHMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgIGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IGVsLmdldEJCb3goKVxyXG4gICAgICAvLyBjb25zb2xlLmxvZyhib3gpXHJcbiAgICAgIGh1ZE1hbmFnZXIub3V0bGluZUh1ZC5kcmF3UmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KVxyXG4gICAgfSlcclxuICB9XHJcbiAgc2V0U2V0dGluZ0ZpbGwoKSB7XHJcbiAgICBjb25zdCBlbHMgPSB0aGlzLmVsc1xyXG5cclxuICAgIGNvbnN0IGZpbGxzID0gZWxzLm1hcChlbCA9PiB7XHJcbiAgICAgIHJldHVybiBlbC5nZXRBdHRyKCdmaWxsJylcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5lZGl0b3Iuc2V0dGluZy5zZXRGaWxsKGZpbGxzWzBdKSAvLyBGSVhNRTpcclxuICB9XHJcbiAgc2V0RWxzQXR0cihuYW1lLCB2YWwpIHtcclxuICAgIGlmICh0aGlzLmlzRW1wdHkoKSkgcmV0dXJuXHJcbiAgICB0aGlzLmVkaXRvci5leGVjdXRlQ29tbWFuZCgnc2V0QXR0cicsIHRoaXMuZWxzLCBuYW1lLCB2YWwpXHJcbiAgfVxyXG59IiwiXHJcbmltcG9ydCBFZGl0b3IgZnJvbSAnLi9lZGl0b3IuanMnXHJcbmltcG9ydCBBZGRSZWN0IGZyb20gJy4vbW9kdWxlcy9hZGRSZWN0LmpzJ1xyXG5pbXBvcnQgeyBEcmFnQ2FudmFzIH0gZnJvbSAnLi9tb2R1bGVzL2RyYWdDYW52YXMuanMnXHJcbmltcG9ydCBDb21tYW5kTWFuYWdlciBmcm9tICcuL2NvbW1hbmQvY29tbWFuZE1hbmFnZXIuanMnXHJcbmltcG9ydCB7IEVkaXRvclNldHRpbmcgfSBmcm9tICcuL3NldHRpbmcvZWRpdG9yU2V0dGluZy5qcydcclxuaW1wb3J0IHsgWm9vbU1hbmFnZXIgfSBmcm9tICcuL21vZHVsZXMvem9vbS5qcydcclxuaW1wb3J0IHsgU2VsZWN0IH0gZnJvbSAnLi9tb2R1bGVzL3NlbGVjdC5qcydcclxuaW1wb3J0IHsgVG9vbE1hbmFnZXIgfSBmcm9tICcuL3Rvb2xNYW5hZ2VyLmpzJ1xyXG5cclxuZnVuY3Rpb24gYWN0aXZlQnRuKG5hbWUpIHtcclxuICBuYW1lID0ge1xyXG4gICAgJ3NlbGVjdCc6ICdidG4tc2VsZWN0JyxcclxuICAgICdhZGRSZWN0JzogJ2J0bi1hZGQtcmVjdCcsXHJcbiAgICAnZHJhZ0NhbnZhcyc6ICdidG4tZHJhZy1jYW52YXMnLFxyXG4gIH1bbmFtZV1cclxuICBpZiAobmFtZSA9PSB1bmRlZmluZWQpIHJldHVyblxyXG5cclxuICBjb25zdCB0b29sQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rvb2wtYmFyJylcclxuICBjb25zdCB0b29sQnRucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRvb2xCYXIuY2hpbGRyZW4pXHJcbiAgdG9vbEJ0bnMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICB9KVxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5hbWUpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbn1cclxuXHJcblxyXG5jb25zdCBlZGl0b3IgPSBuZXcgRWRpdG9yKClcclxud2luZG93LmVkaXRvciA9IGVkaXRvciAvLyBkZWJ1ZyBpbiBkZXZ0b29sXHJcblxyXG5jb25zdCBjb21tYW5kTWFuYWdlciA9IG5ldyBDb21tYW5kTWFuYWdlcihlZGl0b3IpXHJcbmVkaXRvci5zZXRDb21tYW5kTWFuYWdlcihjb21tYW5kTWFuYWdlcilcclxuXHJcbmVkaXRvci5zZXRTZXR0aW5nKG5ldyBFZGl0b3JTZXR0aW5nKCkpXHJcbi8vIHJlZ2lzdGVyIHRvb2xzXHJcblxyXG5jb25zdCB0b29sTWFuYWdlciA9IG5ldyBUb29sTWFuYWdlcihlZGl0b3IpXHJcbmVkaXRvci5zZXRUb29sTWFuYWdlcih0b29sTWFuYWdlcilcclxudG9vbE1hbmFnZXIucmVnaXN0ZXJUb29sKG5ldyBBZGRSZWN0KCkpXHJcbnRvb2xNYW5hZ2VyLnJlZ2lzdGVyVG9vbChuZXcgRHJhZ0NhbnZhcygpKVxyXG50b29sTWFuYWdlci5yZWdpc3RlclRvb2wobmV3IFNlbGVjdCgpKVxyXG5cclxuZWRpdG9yLnRvb2xNYW5hZ2VyLm9uU3dpdGNoVG9vbChuYW1lID0+IHtcclxuICBjb25zb2xlLmxvZygnc3dpdGNoZWQgdG9vbDonLCBuYW1lKVxyXG4gIGFjdGl2ZUJ0bihuYW1lKVxyXG59KVxyXG5cclxudG9vbE1hbmFnZXIuc2V0Q3VycmVudFRvb2woJ2FkZFJlY3QnKVxyXG50b29sTWFuYWdlci5iaW5kVG9vbEV2ZW50KClcclxuLy8gem9vbVxyXG5lZGl0b3Iuc2V0Wm9vbU1hbmFnZXIobmV3IFpvb21NYW5hZ2VyKCkpXHJcblxyXG5lZGl0b3IubW91bnQoJyNlZGl0b3ItYXJlYScpXHJcblxyXG5cclxuLyoqIFxyXG4gKiBiaW5kIGV2ZW50IGluIGJ1dHRvblxyXG4gKi8gXHJcbi8vIHVuZG9cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi11bmRvJykub25jbGljayA9ICgpID0+IHtcclxuICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3VuZG8nKVxyXG59XHJcbi8vIHJlZG9cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1yZWRvJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGVkaXRvci5leGVjdXRlQ29tbWFuZCgncmVkbycpXHJcbn1cclxuLy8gem9vbUluXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tem9vbS1pbicpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBlZGl0b3Iuem9vbU1hbmFnZXIuem9vbUluKClcclxufVxyXG4vLyB6b29tT3V0XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tem9vbS1vdXQnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgZWRpdG9yLnpvb21NYW5hZ2VyLnpvb21PdXQoKVxyXG59XHJcbi8vIHNlbGVjdCBhZGRSZWN0IHRvb2xcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1hZGQtcmVjdCcpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBlZGl0b3Iuc2V0Q3VycmVudFRvb2woJ2FkZFJlY3QnKVxyXG59XHJcbi8vIHNlbGVjdCBkcmFnY2FudmFzIHRvb2xcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1kcmFnLWNhbnZhcycpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBlZGl0b3Iuc2V0Q3VycmVudFRvb2woJ2RyYWdDYW52YXMnKVxyXG59XHJcbi8vIHNlbGVjdCB0b29sXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tc2VsZWN0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGVkaXRvci5zZXRDdXJyZW50VG9vbCgnc2VsZWN0JylcclxufVxyXG4vLyBkZWxldGUgc2VsZWN0ZWQgZWxlbWVudHNcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1kZWxldGUnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnJlbW92ZSgpXHJcbn1cclxuXHJcbi8vIGZpbGwgdmFsdWUgY29udHJvbFxyXG5jb25zdCBmaWxsVGV4dE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWxlbWVudC1pbmZvLWZpbGwnKVxyXG5maWxsVGV4dE5vZGUuaW5uZXJIVE1MID0gZWRpdG9yLnNldHRpbmcuZ2V0KCdmaWxsJylcclxuZWRpdG9yLnNldHRpbmcuYmluZEV2ZW50KCdmaWxsJywgdmFsID0+IHtcclxuICBmaWxsVGV4dE5vZGUuaW5uZXJIVE1MID0gdmFsXHJcbn0pXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZXQtZmlsbC1idG4nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgY29uc3QgZmlsbCA9IHdpbmRvdy5wcm9tcHQoJ1BsZWFzZSBpbnB1dCB2YWxpZCBjb2xvciB2YWx1Ze+8iGxpa2UgI2ZmY2U0M++8iScsIGVkaXRvci5zZXR0aW5nLmdldCgnZmlsbCcpKVxyXG4gIGlmICghZmlsbCkgcmV0dXJuXHJcbiAgZmlsbFRleHROb2RlLmlubmVySFRNTCA9IGZpbGxcclxuXHJcbiAgZWRpdG9yLnNldHRpbmcuc2V0RmlsbChmaWxsKVxyXG4gIGVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHNBdHRyKCdmaWxsJywgZmlsbClcclxufVxyXG5cclxuLy8gc3Ryb2tlIHZhbHVlIGNvbnRyb2xcclxuY29uc3Qgc3Ryb2tlVGV4dE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWxlbWVudC1pbmZvLXN0cm9rZScpXHJcbnN0cm9rZVRleHROb2RlLmlubmVySFRNTCA9IGVkaXRvci5zZXR0aW5nLmdldCgnc3Ryb2tlJylcclxuZWRpdG9yLnNldHRpbmcuYmluZEV2ZW50KCdzdHJva2UnLCB2YWwgPT4ge1xyXG4gIHN0cm9rZVRleHROb2RlLmlubmVySFRNTCA9IHZhbFxyXG59KVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2V0LXN0cm9rZS1idG4nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgY29uc3Qgc3Ryb2tlID0gd2luZG93LnByb21wdCgnUGxlYXNlIGlucHV0IHZhbGlkIGNvbG9yIHZhbHVl77yIbGlrZSAjZmZjZTQz77yJJywgZWRpdG9yLnNldHRpbmcuZ2V0KCdzdHJva2UnKSlcclxuICBpZiAoIXN0cm9rZSkgcmV0dXJuXHJcbiAgc3Ryb2tlVGV4dE5vZGUuaW5uZXJIVE1MID0gc3Ryb2tlXHJcblxyXG4gIGVkaXRvci5zZXR0aW5nLnNldFN0cm9rZShzdHJva2UpXHJcbiAgZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVsc0F0dHIoJ3N0cm9rZScsIHN0cm9rZSlcclxufVxyXG4vLyByZWdpc3RlciBzaG9ydGN1dFxyXG5lZGl0b3Iuc2hvcnRjdXQucmVnaXN0ZXIoJ1VuZG8nLCAnQ21kK1onLCAoKSA9PiB7XHJcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCd1bmRvJylcclxufSlcclxuZWRpdG9yLnNob3J0Y3V0LnJlZ2lzdGVyKCdVbmRvJywgJ0N0cmwrWicsICgpID0+IHtcclxuICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3VuZG8nKVxyXG59KVxyXG5lZGl0b3Iuc2hvcnRjdXQucmVnaXN0ZXIoJ1JlZG8nLCAnQ21kK1NoaWZ0K1onLCAoKSA9PiB7XHJcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdyZWRvJylcclxufSlcclxuZWRpdG9yLnNob3J0Y3V0LnJlZ2lzdGVyKCdSZWRvJywgJ0N0cmwrU2hpZnQrWicsICgpID0+IHtcclxuICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3JlZG8nKVxyXG59KVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hvcnRjdXQnKS5pbm5lckhUTUwgPSBlZGl0b3Iuc2hvcnRjdXQuZm9ybWF0UHJpbnQoKVxyXG5cclxuLyoqXHJcbiAqIOeQhuaDsyBhcGkg5L2/55So5L6L5a2QXHJcbiAqIFxyXG4gKiBjb25zdCBlZGl0b3JCdWlsZGVyID0gbmV3IEVkaXRvci5idWlsZGVyKClcclxuICogZWRpdG9yQnVpbGRlclxyXG4gKiAgIC5zZXRDYW52YXNTaXplKDQwMCwgMzAwKVxyXG4gKiAgIC5zZXRTdGFnZVNpemUoMTAwMCwgODAwKVxyXG4gKiAgIC5zZXRWaWV3cG9ydFNpemUoODAwLCA1MDApXHJcbiAqICAgLnNldFpvb20oMTAwKVxyXG4gKiBcclxuICogY29uc3QgZWRpdG9yID0gZWRpdG9yQnVpbGRlci5idWlsZCgpXHJcbiAqIGVkaXRvci5yZWdpc3RlclRvb2wodG9vbE1vdmUpXHJcbiAqIFxyXG4gKi8iLCIvKipcclxuICogQ29tbWFuZE1hbmFnZXIgQ2xhc3NcclxuICogXHJcbiAqIFxyXG4gKiBDb21tYW5kTWFuYWdlci51bmRvKClcclxuICogQ29tbWFuZE1hbmFnZXIucmVkbygpXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgQWRkUmVjdCwgRE1vdmUsIHJlbW92ZUVsZW1lbnRzLCBTZXRBdHRyIH0gZnJvbSBcIi4vY29tbWFuZHNcIlxyXG5cclxuY2xhc3MgQ29tbWFuZE1hbmFnZXIge1xyXG4gIGNvbnN0cnVjdG9yKGVkaXRvcikge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICAgIHRoaXMucmVkb1N0YWNrID0gW11cclxuICAgIHRoaXMudW5kb1N0YWNrID0gW11cclxuICAgIHRoaXMuY29tbWFuZENsYXNzZXMgPSB7fVxyXG5cclxuICAgIHRoaXMucmVzaWd0ZXJDb21tYW5kQ2xhc3MoQWRkUmVjdClcclxuICAgIHRoaXMucmVzaWd0ZXJDb21tYW5kQ2xhc3MoRE1vdmUpXHJcbiAgICB0aGlzLnJlc2lndGVyQ29tbWFuZENsYXNzKFNldEF0dHIpXHJcbiAgICB0aGlzLnJlc2lndGVyQ29tbWFuZENsYXNzKHJlbW92ZUVsZW1lbnRzKVxyXG4gIH1cclxuICBzZXRFZGl0b3IoZWRpdG9yKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gIH1cclxuICBleGVjdXRlKG5hbWUsIC4uLmFyZ3MpIHtcclxuICAgIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKClcclxuICAgIGNvbnN0IENvbW1hbmRDbGFzcyA9IHRoaXMuY29tbWFuZENsYXNzZXNbbmFtZV1cclxuXHJcbiAgICBjb25zdCBjb21tYW5kID0gbmV3IENvbW1hbmRDbGFzcyh0aGlzLmVkaXRvciwgLi4uYXJncykgLy8g5Yib5bu6IGNvbW1hbmQg5a6e5L6LXHJcblxyXG4gICAgdGhpcy51bmRvU3RhY2sucHVzaChjb21tYW5kKVxyXG4gICAgdGhpcy5yZWRvU3RhY2sgPSBbXVxyXG4gIH1cclxuICB1bmRvKCkge1xyXG4gICAgaWYgKHRoaXMudW5kb1N0YWNrLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjb25zb2xlLmxvZygndW5kbyBzdGFjayBpcyBlbXB0eSwgY2FuIG5vdCB1bmRvJylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCBjb21tYW5kID0gdGhpcy51bmRvU3RhY2sucG9wKClcclxuICAgIHRoaXMucmVkb1N0YWNrLnB1c2goY29tbWFuZClcclxuICAgIGNvbW1hbmQudW5kbygpXHJcbiAgICBjb21tYW5kLmFmdGVyVW5kbygpXHJcbiAgfVxyXG4gIHJlZG8oKSB7XHJcbiAgICBpZiAodGhpcy5yZWRvU3RhY2subGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdyZWRvIHN0YWNrIGlzIGVtcHR5LCBjYW4gbm90IHJlZG8nKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IGNvbW1hbmQgPSB0aGlzLnJlZG9TdGFjay5wb3AoKVxyXG4gICAgdGhpcy51bmRvU3RhY2sucHVzaChjb21tYW5kKVxyXG4gICAgY29tbWFuZC5yZWRvKClcclxuICAgIGNvbW1hbmQuYWZ0ZXJSZWRvKClcclxuICB9XHJcbiAgLy8g5rOo5YaM5ZG95Luk57G75Yiw5ZG95Luk566h55CG5a+56LGh5Lit44CCXHJcbiAgcmVzaWd0ZXJDb21tYW5kQ2xhc3MoY29tbWFuZENsYXNzKSB7XHJcbiAgICBjb25zdCBuYW1lID0gY29tbWFuZENsYXNzLm5hbWUoKS50b0xvd2VyQ2FzZSgpXHJcbiAgICB0aGlzLmNvbW1hbmRDbGFzc2VzW25hbWVdID0gY29tbWFuZENsYXNzXHJcbiAgfVxyXG4gIGFmdGVyQW55VW5kbygpIHtcclxuXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21tYW5kTWFuYWdlciIsImltcG9ydCB7IE5TIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiXHJcbmltcG9ydCB7IEZTVkcgfSBmcm9tIFwiLi4vZWxlbWVudFwiXHJcblxyXG5jbGFzcyBCYXNlQ29tbWFuZCB7XHJcbiAgdW5kbygpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcigncGxlYXNlIG92ZXJyaWRlIHVuZG8gbWV0aG9kJylcclxuICB9XHJcbiAgcmVkbygpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcigncGxlYXNlIG92ZXJyaWRlIHJlZG8gbWV0aG9kJylcclxuICB9XHJcbiAgYWZ0ZXJSZWRvKCkge31cclxuICBhZnRlclVuZG8oKSB7fVxyXG59XHJcblxyXG4vKipcclxuICogYWRkUmVjdFxyXG4gKiBcclxuICogYWRkIHJlY3Qgc3ZnIGVsZW1lbnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBZGRSZWN0IGV4dGVuZHMgQmFzZUNvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgeCwgeSwgdywgaCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICAgIGNvbnN0IHJlY3QgPSBuZXcgRlNWRy5SZWN0KHgsIHksIHcsIGgpXHJcblxyXG4gICAgY29uc3QgZmlsbCA9IGVkaXRvci5zZXR0aW5nLmdldCgnZmlsbCcpXHJcbiAgICBjb25zdCBzdHJva2UgPSBlZGl0b3Iuc2V0dGluZy5nZXQoJ3N0cm9rZScpXHJcbiAgICBjb25zdCBzdHJva2VXaWR0aCA9IGVkaXRvci5zZXR0aW5nLmdldCgnc3Ryb2tlV2lkdGgnKVxyXG4gICAgcmVjdC5zZXRBdHRyKCdmaWxsJywgZmlsbClcclxuICAgIHJlY3Quc2V0QXR0cignc3Ryb2tlJywgc3Ryb2tlKVxyXG4gICAgcmVjdC5zZXRBdHRyKCdzdHJva2Utd2lkdGgnLCBzdHJva2VXaWR0aClcclxuXHJcbiAgICBlZGl0b3IuZ2V0Q3VycmVudExheWVyKCkuYXBwZW5kQ2hpbGQocmVjdC5lbCgpKVxyXG5cclxuICAgIHRoaXMubmV4dFNpYmxpbmcgPSByZWN0LmVsKCkubmV4dEVsZW1lbnRTaWJsaW5nIFxyXG4gICAgdGhpcy5wYXJlbnQgPSByZWN0LmVsKCkucGFyZW50RWxlbWVudFxyXG4gICAgdGhpcy5yZWN0ID0gcmVjdFxyXG4gIH1cclxuICBzdGF0aWMgbmFtZSgpIHtcclxuICAgIHJldHVybiAnYWRkUmVjdCdcclxuICB9XHJcbiAgcmVkbygpIHtcclxuICAgIGNvbnN0IGVsID0gdGhpcy5yZWN0LmVsKClcclxuICAgIGlmICh0aGlzLm5leHRTaWJsaW5nKSB7XHJcbiAgICAgIHRoaXMucGFyZW50Lmluc2VydEJlZm9yZShlbCwgdGhpcy5uZXh0U2libGluZylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKGVsKVxyXG4gICAgfVxyXG4gIH1cclxuICB1bmRvKCkge1xyXG4gICAgdGhpcy5yZWN0LmVsKCkucmVtb3ZlKClcclxuICB9XHJcbiAgYWZ0ZXJVbmRvKCkge1xyXG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuY2xlYXIoKVxyXG4gIH1cclxuICBhZnRlclJlZG8oKSB7XHJcbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHModGhpcy5yZWN0KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHJlbW92ZUVsZW1lbnRzIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgZWxzKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG5cclxuICAgIC8vIFRPRE86XHJcbiAgfVxyXG4gIHN0YXRpYyBuYW1lKCkge1xyXG4gICAgcmV0dXJuICdyZW1vdmVFbGVtZW50cydcclxuICB9XHJcbiAgcmVkbygpIHtcclxuICAgIFxyXG4gIH1cclxuICB1bmRvKCkge1xyXG5cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBETW92ZVxyXG4gKiBcclxuICogZG1vdmUgZWxlbWVudHNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBETW92ZSBleHRlbmRzIEJhc2VDb21tYW5kIHtcclxuICBjb25zdHJ1Y3RvcihlZGl0b3IsIGVscywgZHgsIGR5KSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gICAgdGhpcy5keCA9IGR4XHJcbiAgICB0aGlzLmR5ID0gZHlcclxuICAgIHRoaXMuZWxzID0gZWxzXHJcblxyXG4gICAgdGhpcy5lbHMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgIGVsLmRtb3ZlKHRoaXMuZHgsIHRoaXMuZHkpXHJcbiAgICB9KVxyXG4gIH1cclxuICBzdGF0aWMgbmFtZSgpIHtcclxuICAgIHJldHVybiAnZG1vdmUnXHJcbiAgfVxyXG4gIHJlZG8oKSB7XHJcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgZWwuZG1vdmUodGhpcy5keCwgdGhpcy5keSlcclxuICAgIH0pXHJcbiAgfVxyXG4gIHVuZG8oKSB7XHJcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgZWwuZG1vdmUoLXRoaXMuZHgsIC10aGlzLmR5KVxyXG4gICAgfSlcclxuICB9XHJcbiAgYWZ0ZXJSZWRvKCkge1xyXG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzKHRoaXMuZWxzKVxyXG4gIH1cclxuICBhZnRlclVuZG8oKSB7XHJcbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHModGhpcy5lbHMpXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogc2V0QXR0clxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNldEF0dHIgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IoZWRpdG9yLCBlbHMsIGF0dHJOYW1lLCB2YWwpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxzKSkgZWxzID0gW2Vsc11cclxuICAgIHRoaXMuZWxzID0gZWxzXHJcbiAgICB0aGlzLmF0dHJOYW1lID0gYXR0ck5hbWVcclxuICAgIHRoaXMuYmVmb3JlVmFsID0gdGhpcy5lbHMubWFwKGVsID0+IGVsLmdldEF0dHIoYXR0ck5hbWUpKVxyXG4gICAgdGhpcy5hZnRlclZhbCA9IHZhbFxyXG5cclxuICAgIHRoaXMuZWxzLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICBlbC5zZXRBdHRyKGF0dHJOYW1lLCB2YWwpXHJcbiAgICB9KVxyXG4gIH1cclxuICBzdGF0aWMgbmFtZSgpIHtcclxuICAgIHJldHVybiAnc2V0QXR0cidcclxuICB9XHJcbiAgcmVkbygpIHtcclxuICAgIHRoaXMuZWxzLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICBlbC5zZXRBdHRyKHRoaXMuYXR0ck5hbWUsIHRoaXMuYWZ0ZXJWYWwpXHJcbiAgICB9KVxyXG4gIH1cclxuICB1bmRvKCkge1xyXG4gICAgdGhpcy5lbHMuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgZWwuc2V0QXR0cih0aGlzLmF0dHJOYW1lLCB0aGlzLmJlZm9yZVZhbFtpXSlcclxuICAgIH0pXHJcbiAgfVxyXG59IiwiLy8g5bi46YePXHJcblxyXG5jb25zdCBOUyA9IHtcclxuICBIVE1MOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsXHJcbiAgTUFUSDogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwnLFxyXG4gIFNFOiAnaHR0cDovL3N2Zy1lZGl0Lmdvb2dsZWNvZGUuY29tJyxcclxuICBTVkc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXHJcbiAgWExJTks6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyxcclxuICBYTUw6ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnLFxyXG4gIFhNTE5TOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nIC8vIHNlZSBodHRwOi8vd3d3LnczLm9yZy9UUi9SRUMteG1sLW5hbWVzLyN4bWxSZXNlcnZlZFxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBOUyxcclxufSBcclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IHsgQWN0aXZlZEVsc01hbmFnZXIgfSBmcm9tIFwiLi9hY3RpdmVkRWxzTWFuYWdlclwiXHJcbmltcG9ydCB7IEVkaXRvckV2ZW50Q29udGV4dCB9IGZyb20gXCIuL2VkaXRvckV2ZW50Q29udGV4dFwiXHJcbmltcG9ydCB7IEh1ZE1hbmFnZXIgfSBmcm9tIFwiLi9sYXllci9odWRNYW5hZ2VyXCJcclxuaW1wb3J0IHsgU2hvcnRjdXQgfSBmcm9tIFwiLi9zaG9ydGN1dFwiXHJcblxyXG5jbGFzcyBFZGl0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zZXR0aW5nID0gbnVsbFxyXG4gICAgdGhpcy5jb21tYW5kTWFuYWdlciA9IG51bGxcclxuICAgIHRoaXMuem9vbU1hbmFnZXIgPSBudWxsXHJcbiAgICB0aGlzLmFjdGl2ZWRFbHNNYW5hZ2VyID0gbmV3IEFjdGl2ZWRFbHNNYW5hZ2VyKHRoaXMpXHJcbiAgICB0aGlzLnNob3J0Y3V0ID0gbmV3IFNob3J0Y3V0KHRoaXMpXHJcblxyXG4gICAgLy8gY29uc3QgY29udGVudFdpZHRoID0gNDAwXHJcbiAgICAvLyBjb25zdCBjb250ZW50SGVpZ2h0ID0gMzAwXHJcbiAgICAvLyBjb25zdCBzdGFnZVdpZHRoID0gMTAwMCAvLyDmraPlnKjnuqDnu5Plkb3lkI1cclxuICAgIC8vIGNvbnN0IHN0YWdlSGVpZ2h0ID0gNjAwXHJcbiAgICBjb25zdCB2aWV3cG9ydFdpZHRoID0gODAwXHJcbiAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IDU1MFxyXG5cclxuICAgIGNvbnN0IHZpZXdwb3J0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIHZpZXdwb3J0LmlkID0gJ3ZpZXdwb3J0J1xyXG4gICAgdmlld3BvcnQuc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCAjMDAwJ1xyXG4gICAgdmlld3BvcnQuc3R5bGUud2lkdGggPSB2aWV3cG9ydFdpZHRoICsgJ3B4J1xyXG4gICAgdmlld3BvcnQuc3R5bGUuaGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQgKyAncHgnXHJcbiAgICB0aGlzLnZpZXdwb3J0ID0gdmlld3BvcnRcclxuICAgIFxyXG4gICAgY29uc3Qgc3ZnQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIHN2Z0NvbnRhaW5lci5pZCA9ICdzdmctY29udGFpbmVyJ1xyXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZGRkJ1xyXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLndpZHRoID0gdmlld3BvcnRXaWR0aCArICdweCdcclxuICAgIHN2Z0NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSB2aWV3cG9ydEhlaWdodCArICdweCdcclxuICAgIHN2Z0NvbnRhaW5lci5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnXHJcbiAgICB0aGlzLnN2Z0NvbnRhaW5lciA9IHN2Z0NvbnRhaW5lclxyXG5cclxuICAgIGNvbnN0IHN2Z1Jvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpXHJcbiAgICBzdmdSb290LmlkID0gJ3N2Zy1yb290J1xyXG4gICAgc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgMTAwMClcclxuICAgIHN2Z1Jvb3Quc2V0QXR0cmlidXRlKCdoZWlnaHQnLCA2MDApXHJcbiAgICBzdmdSb290LnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgMTAwMCA2MDAnKVxyXG4gICAgdGhpcy5zdmdSb290ID0gc3ZnUm9vdFxyXG5cclxuICAgIGNvbnN0IHN2Z1N0YWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKVxyXG4gICAgc3ZnU3RhZ2UuaWQgPSAnc3ZnLXN0YWdlJ1xyXG4gICAgc3ZnU3RhZ2Uuc2V0QXR0cmlidXRlKCd3aWR0aCcsIDQwMClcclxuICAgIHN2Z1N0YWdlLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgMzAwKVxyXG4gICAgc3ZnU3RhZ2Uuc2V0QXR0cmlidXRlKCd4JywgMzAwKVxyXG4gICAgc3ZnU3RhZ2Uuc2V0QXR0cmlidXRlKCd5JywgMTUwKVxyXG4gICAgc3ZnU3RhZ2Uuc3R5bGUub3ZlcmZsb3cgPSAndmlzaWJsZSdcclxuICAgIHRoaXMuc3ZnU3RhZ2UgPSBzdmdTdGFnZVxyXG5cclxuICAgIGNvbnN0IHN2Z0JnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJylcclxuICAgIHN2Z0JnLmlkID0gJ2JhY2tncm91bmQnXHJcbiAgICAvLyBzdmdCZy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgNDAwKVxyXG4gICAgLy8gc3ZnQmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAzMDApXHJcbiAgICBzdmdCZy5zZXRBdHRyaWJ1dGUoJ3gnLCAwKVxyXG4gICAgc3ZnQmcuc2V0QXR0cmlidXRlKCd5JywgMClcclxuXHJcbiAgICBjb25zdCBiZ1JlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3JlY3QnKVxyXG4gICAgYmdSZWN0LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMTAwJScpXHJcbiAgICBiZ1JlY3Quc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpXHJcbiAgICBiZ1JlY3Quc2V0QXR0cmlidXRlKCdmaWxsJywgJyNmZmYnKVxyXG5cclxuICAgIGNvbnN0IHN2Z0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2cnKVxyXG4gICAgc3ZnQ29udGVudC5pZCA9ICdjb250ZW50J1xyXG4gICAgLy8gc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgNDAwKVxyXG4gICAgLy8gc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDMwMClcclxuICAgIHN2Z0NvbnRlbnQuc2V0QXR0cmlidXRlKCd4JywgMClcclxuICAgIHN2Z0NvbnRlbnQuc2V0QXR0cmlidXRlKCd5JywgMClcclxuICAgIHRoaXMuc3ZnQ29udGVudCA9IHN2Z0NvbnRlbnRcclxuXHJcbiAgICBjb25zdCBsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnZycpXHJcbiAgICBsYXllci5pZCA9ICdsYXllci0xJ1xyXG4gICAgdGhpcy5jdXJyZW50TGF5ZXIgPSBsYXllclxyXG5cclxuICAgIHZpZXdwb3J0LmFwcGVuZENoaWxkKHN2Z0NvbnRhaW5lcilcclxuICAgIHN2Z0NvbnRhaW5lci5hcHBlbmRDaGlsZChzdmdSb290KVxyXG4gICAgc3ZnUm9vdC5hcHBlbmRDaGlsZChzdmdTdGFnZSlcclxuXHJcbiAgICBzdmdTdGFnZS5hcHBlbmRDaGlsZChzdmdCZylcclxuICAgIHN2Z0JnLmFwcGVuZENoaWxkKGJnUmVjdClcclxuICAgIHN2Z1N0YWdlLmFwcGVuZENoaWxkKHN2Z0NvbnRlbnQpXHJcbiAgICBzdmdDb250ZW50LmFwcGVuZENoaWxkKGxheWVyKVxyXG5cclxuXHJcbiAgICB0aGlzLmh1ZE1hbmFnZXIgPSBuZXcgSHVkTWFuYWdlcigpXHJcbiAgICB0aGlzLmh1ZE1hbmFnZXIubW91bnQoc3ZnU3RhZ2UpXHJcblxyXG4gICAgLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWV3cG9ydClcclxuICB9XHJcbiAgbW91bnQoc2VsZWN0b3IpIHtcclxuICAgIGNvbnN0IG1vdW50Tm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXHJcbiAgICBtb3VudE5vZGUuYXBwZW5kQ2hpbGQodGhpcy52aWV3cG9ydClcclxuICB9XHJcbiAgZ2V0Q3VycmVudExheWVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudExheWVyXHJcbiAgfVxyXG5cclxuICBzZXRUb29sTWFuYWdlcih0b29sTWFuYWdlcikge1xyXG4gICAgdGhpcy50b29sTWFuYWdlciA9IHRvb2xNYW5hZ2VyXHJcbiAgfVxyXG4gIC8vIHRvb2wgcmVsYXRpdmVkIG1ldGhvZHNcclxuICBzZXRDdXJyZW50VG9vbChuYW1lKSB7XHJcbiAgICB0aGlzLnRvb2xNYW5hZ2VyLnNldEN1cnJlbnRUb29sKG5hbWUpXHJcbiAgfVxyXG4gIHJlZ2lzdGVyVG9vbCh0b29sKSB7XHJcbiAgICB0aGlzLnRvb2xNYW5hZ2VyLnJlZ2lzdGVyVG9vbCh0b29sKVxyXG4gIH1cclxuICBzZXRTZXR0aW5nKHNldHRpbmcpIHtcclxuICAgIHRoaXMuc2V0dGluZyA9IHNldHRpbmdcclxuICB9XHJcblxyXG4gIC8vIOWRveS7pOebuOWFs1xyXG4gIHNldENvbW1hbmRNYW5hZ2VyKGNvbW1hbmRNYW5hZ2VyKSB7XHJcbiAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyID0gY29tbWFuZE1hbmFnZXJcclxuICB9XHJcbiAgZXhlY3V0ZUNvbW1hbmQobmFtZSwgLi4ucGFyYW1zKSB7XHJcbiAgICBpZiAobmFtZSA9PSAndW5kbycpIHtcclxuICAgICAgdGhpcy5jb21tYW5kTWFuYWdlci51bmRvKClcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBpZiAobmFtZSA9PSAncmVkbycpIHtcclxuICAgICAgdGhpcy5jb21tYW5kTWFuYWdlci5yZWRvKClcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyLmV4ZWN1dGUobmFtZSwgLi4ucGFyYW1zKVxyXG4gIH1cclxuXHJcbiAgLy8gem9vbVxyXG4gIHNldFpvb21NYW5hZ2VyKHpvb21NYW5hZ2VyKSB7XHJcbiAgICB6b29tTWFuYWdlci5zZXRFZGl0b3IodGhpcylcclxuICAgIHRoaXMuem9vbU1hbmFnZXIgPSB6b29tTWFuYWdlclxyXG4gIH1cclxuICBnZXRab29tKCkgeyAvLyDlsIHoo4VcclxuICAgIHJldHVybiB0aGlzLnpvb21NYW5hZ2VyLmdldFpvb20oKVxyXG4gIH1cclxuXHJcbiAgZ2V0U2Nyb2xsKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogdGhpcy5zdmdDb250YWluZXIuc2Nyb2xsTGVmdCxcclxuICAgICAgeTogdGhpcy5zdmdDb250YWluZXIuc2Nyb2xsVG9wLFxyXG4gICAgfVxyXG4gIH1cclxuICBzZXRTY3JvbGwoeCwgeSkge1xyXG4gICAgdGhpcy5zdmdDb250YWluZXIuc2Nyb2xsTGVmdCA9IHhcclxuICAgIHRoaXMuc3ZnQ29udGFpbmVyLnNjcm9sbFRvcCA9IHlcclxuICB9XHJcbiAgZ2V0Q29udGVudE9mZnNldCgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IHRoaXMuc3ZnU3RhZ2UuZ2V0QXR0cmlidXRlKCd4JyksXHJcbiAgICAgIHk6IHRoaXMuc3ZnU3RhZ2UuZ2V0QXR0cmlidXRlKCd5JyksXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc0NvbnRlbnRFbGVtZW50KGVsKSB7XHJcbiAgICB3aGlsZSAoZWwpIHtcclxuICAgICAgaWYgKGVsLnBhcmVudEVsZW1lbnQgPT0gdGhpcy5zdmdDb250ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfVxyXG4gICAgICBpZiAoZWwucGFyZW50RWxlbWVudCA9PSB0aGlzLnN2Z1Jvb3QpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBlbCA9IGVsLnBhcmVudEVsZW1lbnRcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRWRpdG9yXHJcbiIsIlxyXG4vKipcclxuICogY29udGV4dCBjbGFzc1xyXG4gKiBcclxuICogdXNlZCBmb3IgdG9vbCBldmVudFxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBFZGl0b3JFdmVudENvbnRleHQge1xyXG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgZSkge1xyXG4gICAgdGhpcy5tb3VzZVByZXNzZWQgPSBmYWxzZVxyXG4gICAgdGhpcy5vcmlnaW5FdmVudCA9IGVcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgICB0aGlzLmlzRW5kSW5zaWRlID0gZmFsc2VcclxuXHJcbiAgICB0aGlzLnN0YXJ0WCA9IDBcclxuICAgIHRoaXMuc3RhcnRZID0gMFxyXG5cclxuICAgIHRoaXMub2Zmc2V0WCA9IDBcclxuICAgIHRoaXMub2Zmc2V0WSA9IDBcclxuXHJcbiAgICB0aGlzLnN0YXJ0Q2xpZW50WCA9IDAgLy8gdXNlZCB0byBjYWxjIGR4IGFuZCBkeS5cclxuICAgIHRoaXMuc3RhcnRDbGllbnRZID0gMFxyXG4gICAgdGhpcy5keCA9IDBcclxuICAgIHRoaXMuZHkgPSAwXHJcblxyXG4gICAgdGhpcy5zZXRTdGFydFBvcygpXHJcbiAgfVxyXG4gIHNldE9yaWdpbkV2ZW50KGUpIHtcclxuICAgIHRoaXMub3JpZ2luRXZlbnQgPSBlXHJcbiAgfVxyXG4gIHNldFN0YXJ0UG9zKCkge1xyXG4gICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLmdldFBvcygpXHJcblxyXG4gICAgdGhpcy5zdGFydFggPSB4XHJcbiAgICB0aGlzLnN0YXJ0WSA9IHlcclxuXHJcbiAgICB0aGlzLnN0YXJ0Q2xpZW50WCA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WFxyXG4gICAgdGhpcy5zdGFydENsaWVudFkgPSB0aGlzLm9yaWdpbkV2ZW50LmNsaWVudFlcclxuICB9XHJcbiAgcmVsZWFzZU1vdXNlKCkge1xyXG4gICAgdGhpcy5tb3VzZVByZXNzZWQgPSBmYWxzZVxyXG4gIH1cclxuICBwcmVzc01vdXNlKCkge1xyXG4gICAgdGhpcy5tb3VzZVByZXNzZWQgPSB0cnVlXHJcbiAgfVxyXG4gIGdldFBvcygpIHtcclxuICAgIGNvbnN0IHpvb20gPSB0aGlzLmVkaXRvci5nZXRab29tKClcclxuICAgIGNvbnN0IHt4LCB5fSA9IHRoaXMuZWRpdG9yLmdldENvbnRlbnRPZmZzZXQoKVxyXG4gICAgcmV0dXJuIHsgXHJcbiAgICAgIHg6IHRoaXMub3JpZ2luRXZlbnQub2Zmc2V0WCAvIHpvb20gLSB4LCBcclxuICAgICAgeTogdGhpcy5vcmlnaW5FdmVudC5vZmZzZXRZIC8gem9vbSAtIHksXHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldFN0YXJ0UG9zKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogdGhpcy5zdGFydFgsXHJcbiAgICAgIHk6IHRoaXMuc3RhcnRZLFxyXG4gICAgfVxyXG4gIH1cclxuICAvLyB3aXRob3V0IGNhbGMgd2l0aCB6b29tIHZhbHVlXHJcbiAgZ2V0RGlmZlBvcygpIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLm9yaWdpbkV2ZW50LmNsaWVudFggLSB0aGlzLnN0YXJ0Q2xpZW50WFxyXG4gICAgY29uc3QgeSA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WSAtIHRoaXMuc3RhcnRDbGllbnRZXHJcbiAgICByZXR1cm4geyB4LCB5IH1cclxuICB9XHJcblxyXG59IiwiXHJcbi8qKlxyXG4gKiDlr7kgU1ZHIOWFg+e0oOeahOeugOWNleWwgeijhVxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBGRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmVsXyA9IG51bGxcclxuICB9XHJcbiAgZWwoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbF9cclxuICB9XHJcbiAgc2V0QXR0cihwcm9wLCB2YWwpIHtcclxuICAgIHJldHVybiB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUocHJvcCwgdmFsKVxyXG4gIH1cclxuICBnZXRBdHRyKHByb3ApIHtcclxuICAgIHJldHVybiB0aGlzLmVsXy5nZXRBdHRyaWJ1dGUocHJvcClcclxuICB9XHJcbiAgZ2V0QkJveCgpIHtcclxuICAgIHJldHVybiB0aGlzLmVsXy5nZXRCQm94KClcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBSZWN0IH0gZnJvbSBcIi4vcmVjdFwiXHJcblxyXG5cclxuLyoqXHJcbiAqIEZTVkdcclxuICogXHJcbiAqIHNpbXBsZSBTVkdFbGVtZW50IGVuY2Fwc3VsYXRpb25cclxuICovXHJcbmV4cG9ydCBjb25zdCBGU1ZHID0ge1xyXG4gIFJlY3QsXHJcbn0iLCJcclxuLyoqXHJcbiAqIOWvuSByZWN0IOWFg+e0oOeahOeugOWNleWwgeijhVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IE5TIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiXHJcbmltcG9ydCB7IEZFbGVtZW50IH0gZnJvbSBcIi4vYmFzZUVsZW1lbnRcIlxyXG5cclxuZXhwb3J0IGNsYXNzIFJlY3QgZXh0ZW5kcyBGRWxlbWVudCB7XHJcbiAgLy8gY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyKTtcclxuICAvLyBjb25zdHJ1Y3RvcihlbDogU1ZHRWxlbWVudCk7XHJcbiAgY29uc3RydWN0b3IoeCwgeSwgdywgaCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgaWYgKHR5cGVvZiB4ID09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRoaXMuZWxfID0geFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbF8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAncmVjdCcpXHJcbiAgICAgIHRoaXMuc2V0QXR0cigneCcsIHgpXHJcbiAgICAgIHRoaXMuc2V0QXR0cigneScsIHkpXHJcbiAgICAgIHRoaXMuc2V0QXR0cignd2lkdGgnLCB3KVxyXG4gICAgICB0aGlzLnNldEF0dHIoJ2hlaWdodCcsIGgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldFBvcygpIHtcclxuICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cigneCcpKVxyXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyKCd5JykpXHJcbiAgICByZXR1cm4geyB4LCB5IH1cclxuICB9XHJcbiAgZG1vdmUoZHgsIGR5KSB7XHJcbiAgICBjb25zdCBwb3MgPSB0aGlzLmdldFBvcygpXHJcbiAgICB0aGlzLnNldEF0dHIoJ3gnLCBwb3MueCArIGR4KVxyXG4gICAgdGhpcy5zZXRBdHRyKCd5JywgcG9zLnkgKyBkeSlcclxuICB9XHJcbn0iLCIvKipcclxuICogZ3VpZGUgbGluZSBsYXllclxyXG4gKi9cclxuXHJcbmltcG9ydCB7IE91dGxpbmVIdWQgfSBmcm9tIFwiLi9vdXRsaW5lSHVkXCI7XHJcbmltcG9ydCB7IFNlbGVjdEFyZWEgfSBmcm9tIFwiLi9zZWxlY3RBcmVhXCI7XHJcbmNvbnN0IHsgTlMgfSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgSHVkTWFuYWdlcntcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ2cnKVxyXG4gICAgdGhpcy5jb250YWluZXIuaWQgPSAnaHVkcydcclxuXHJcbiAgICB0aGlzLnNlbGVjdEFyZWEgPSBuZXcgU2VsZWN0QXJlYSh0aGlzLmNvbnRhaW5lcilcclxuICAgIHRoaXMub3V0bGluZUh1ZCA9IG5ldyBPdXRsaW5lSHVkKHRoaXMuY29udGFpbmVyKVxyXG4gIH1cclxuICBtb3VudChlbCkge1xyXG4gICAgZWwuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpXHJcbiAgfVxyXG59XHJcblxyXG4iLCJcclxuXHJcbiAgXHJcbmNvbnN0IHsgTlMgfSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XHJcblxyXG4vKipcclxuICogPHJlY3Q+IG91dGxpbmVcclxuICovXHJcbmV4cG9ydCBjbGFzcyBPdXRsaW5lSHVkIHtcclxuICBjb25zdHJ1Y3RvcihwYXJlbnQpIHtcclxuICAgIHRoaXMueCA9IDBcclxuICAgIHRoaXMueSA9IDBcclxuICAgIHRoaXMudyA9IDBcclxuICAgIHRoaXMuaCA9IDBcclxuXHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdnJylcclxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gJ291dGxpbmUtaHVkJ1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKVxyXG5cclxuICAgIHRoaXMub3V0bGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdwYXRoJylcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAnI2YwNCcpXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd2ZWN0b3ItZWZmZWN0JywgJ25vbi1zY2FsaW5nLXN0cm9rZScpXHJcblxyXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5vdXRsaW5lKVxyXG4gIH1cclxuICBjbGVhcigpIHtcclxuICAgIC8vIHBhcmVudC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgdGhpcy5vdXRsaW5lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICB9XHJcbiAgZHJhd1JlY3QoeCwgeSwgdywgaCkge1xyXG4gICAgdGhpcy54ID0geFxyXG4gICAgdGhpcy55ID0geVxyXG4gICAgdGhpcy53ID0gd1xyXG4gICAgdGhpcy5oID0gaFxyXG5cclxuICAgIC8vIHdoeSBkb24ndCBJIHVzZSByZWN0LCBqdXN0IHNvbHZlIHRoZSBjb25kaXRpb24gd2hlbiB3aWR0aCBvciBoZWlnaHQgaXMgMCB0aGUgb3V0bGluZSBpcyBkaXNhcHBlclxyXG4gICAgY29uc3QgZCA9IGBNICR7eH0gJHt5fSBMICR7eCt3fSAke3l9IEwgJHt4K3d9ICR7eStofSBMICR7eH0gJHt5K2h9IFpgXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdkJywgZClcclxuICAgIHRoaXMub3V0bGluZS5zdHlsZS5kaXNwbGF5ID0gJydcclxuICB9XHJcbiAgZ2V0V2lkdGgoKSB7IHJldHVybiB0aGlzLncgfVxyXG4gIGdldEhlaWdodCgpIHsgcmV0dXJuIHRoaXMuaCB9XHJcbiAgZ2V0WCgpIHsgcmV0dXJuIHRoaXMueCB9XHJcbiAgZ2V0WSgpIHsgcmV0dXJuIHRoaXMueSB9XHJcbn0iLCJcclxuY29uc3QgeyBOUyB9ID0gcmVxdWlyZShcIi4uL2NvbnN0YW50c1wiKTtcclxuXHJcbi8qKlxyXG4gKiBzZWxlY3QgYXJlYVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlbGVjdEFyZWEge1xyXG4gIGNvbnN0cnVjdG9yKHBhcmVudCkge1xyXG4gICAgdGhpcy54ID0gMFxyXG4gICAgdGhpcy55ID0gMFxyXG4gICAgdGhpcy53ID0gMFxyXG4gICAgdGhpcy5oID0gMFxyXG5cclxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ2cnKVxyXG4gICAgdGhpcy5jb250YWluZXIuaWQgPSAnc2VsZWN0LWFyZWEnXHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpXHJcblxyXG4gICAgdGhpcy5vdXRsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ3BhdGgnKVxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJylcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICcjMDU0JylcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3ZlY3Rvci1lZmZlY3QnLCAnbm9uLXNjYWxpbmctc3Ryb2tlJylcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1kYXNoYXJyYXknLCAnNHB4JylcclxuXHJcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLm91dGxpbmUpXHJcbiAgfVxyXG4gIGNsZWFyKCkge1xyXG4gICAgLy8gcGFyZW50LmlubmVySFRNTCA9ICcnXHJcbiAgICB0aGlzLm91dGxpbmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gIH1cclxuICBkcmF3UmVjdCh4LCB5LCB3LCBoKSB7XHJcbiAgICB0aGlzLnggPSB4XHJcbiAgICB0aGlzLnkgPSB5XHJcbiAgICB0aGlzLncgPSB3XHJcbiAgICB0aGlzLmggPSBoXHJcblxyXG4gICAgLy8gd2h5IGRvbid0IEkgdXNlIHJlY3QsIGp1c3Qgc29sdmUgdGhlIGNvbmRpdGlvbiB3aGVuIHdpZHRoIG9yIGhlaWdodCBpcyAwIHRoZSBvdXRsaW5lIGlzIGRpc2FwcGVyXHJcbiAgICBjb25zdCBkID0gYE0gJHt4fSAke3l9IEwgJHt4K3d9ICR7eX0gTCAke3grd30gJHt5K2h9IEwgJHt4fSAke3kraH0gWmBcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2QnLCBkKVxyXG5cclxuICAgIC8qIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3gnLCB4KVxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgneScsIHkpXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHcpXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoKSAqL1xyXG4gICAgdGhpcy5vdXRsaW5lLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gIH1cclxuICBnZXRXaWR0aCgpIHsgcmV0dXJuIHRoaXMudyB9XHJcbiAgZ2V0SGVpZ2h0KCkgeyByZXR1cm4gdGhpcy5oIH1cclxuICBnZXRYKCkgeyByZXR1cm4gdGhpcy54IH1cclxuICBnZXRZKCkgeyByZXR1cm4gdGhpcy55IH1cclxufSIsIlxyXG5pbXBvcnQgeyBnZXRCb3hCeTJwb2ludHMgfSBmcm9tIFwiLi4vdXRpbC9tYXRoXCJcclxuXHJcbmNsYXNzIEFkZFJlY3Qge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBudWxsXHJcbiAgfVxyXG4gIG5hbWUoKSB7XHJcbiAgICByZXR1cm4gJ2FkZFJlY3QnXHJcbiAgfVxyXG4gIHNldEVkaXRvcihlZGl0b3IpIHsgLy8g5L6d6LWW5rOo5YWlXHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gIH1cclxuICBzdGFydChjdHgpIHt9XHJcbiAgbW92ZShjdHgpIHtcclxuICAgIGNvbnN0IHsgeDogZW5kWCwgeTogZW5kWSB9ID0gY3R4LmdldFBvcygpXHJcbiAgICBjb25zdCB7IHg6IHN0YXJ0WCwgeTogc3RhcnRZIH0gPSBjdHguZ2V0U3RhcnRQb3MoKVxyXG4gICAgY29uc3QgeyB4LCB5LCB3LCBoIH0gPSBnZXRCb3hCeTJwb2ludHMoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpXHJcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuZHJhd1JlY3QoeCwgeSwgdywgaClcclxuICB9XHJcbiAgZW5kKGN0eCkge1xyXG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lSHVkLmNsZWFyKClcclxuXHJcbiAgICBjb25zdCB7IHg6IGVuZFgsIHk6IGVuZFkgfSA9IGN0eC5nZXRQb3MoKVxyXG4gICAgY29uc3QgeyB4OiBzdGFydFgsIHk6IHN0YXJ0WSB9ID0gY3R4LmdldFN0YXJ0UG9zKClcclxuICAgIGNvbnN0IHsgeCwgeSwgdywgaCB9ID0gZ2V0Qm94QnkycG9pbnRzKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZKVxyXG4gICAgaWYgKHcgPCAyICYmIGggPCAyKSB7XHJcbiAgICAgIC8vIFRPRE86IG9wZW4gYSBkaWFsb2cgdG8gaW5wdXQgd2lkdGggYW5kIGhlaWdodFxyXG4gICAgICBjb25zb2xlLmxvZygnd2lkdGggYW5kIGhlaWdodCBib3RoIGxlc3MgZXF1YWwgdG8gMu+8jGRyYXdpbmcgbm90aGluZycpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgdGhpcy5lZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ2FkZFJlY3QnLCB4LCB5LCB3LCBoKVxyXG4gIH1cclxuICAvLyBtb3VzZWRvd24gb3V0c2lkZSB2aWV3cG9ydFxyXG4gIGVuZE91dHNpZGUoKSB7XHJcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuY2xlYXIoKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWRkUmVjdCIsIlxyXG5leHBvcnQgY2xhc3MgRHJhZ0NhbnZhcyB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnN0YXJ0T2Zmc2V0WCA9IDBcclxuICAgIHRoaXMuc3RhcnRPZmZzZXRZID0gMFxyXG4gIH1cclxuICBuYW1lKCkge1xyXG4gICAgcmV0dXJuICdkcmFnQ2FudmFzJ1xyXG4gIH1cclxuICBzZXRFZGl0b3IoZWRpdG9yKSB7IC8vIOS+nei1luazqOWFpVxyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICB9XHJcbiAgYmVmb3JlQWN0aXZlKCkge1xyXG4gICAgLy8gZG8gc29tZXRoaW5nIGJlZm9yZSBzd2l0Y2ggdG8gY3VycmVudCB0b29sXHJcbiAgfVxyXG4gIHN0YXJ0KGN0eCkge1xyXG4gICAgY29uc3Qgc2Nyb2xsID0gdGhpcy5lZGl0b3IuZ2V0U2Nyb2xsKClcclxuICAgIHRoaXMuc3RhcnRPZmZzZXRYID0gc2Nyb2xsLnhcclxuICAgIHRoaXMuc3RhcnRPZmZzZXRZID0gc2Nyb2xsLnlcclxuICB9XHJcbiAgbW92ZShjdHgpIHtcclxuICAgIGNvbnN0IHpvb20gPSB0aGlzLmVkaXRvci5nZXRab29tKClcclxuICAgIGNvbnN0IHsgeDogZHgsIHk6IGR5IH0gPSBjdHguZ2V0RGlmZlBvcygpXHJcbiAgICB0aGlzLmVkaXRvci5zZXRTY3JvbGwodGhpcy5zdGFydE9mZnNldFggLSBkeCwgdGhpcy5zdGFydE9mZnNldFkgLSBkeSlcclxuICB9XHJcbiAgZW5kKCkge31cclxuICBlbmRPdXRzaWRlKCkge31cclxufVxyXG4iLCJpbXBvcnQgeyBGU1ZHIH0gZnJvbSBcIi4uL2VsZW1lbnRcIlxyXG5pbXBvcnQgeyBnZXRCb3hCeTJwb2ludHMgfSBmcm9tIFwiLi4vdXRpbC9tYXRoXCJcclxuXHJcbi8qKlxyXG4gKiBzZWxlY3RcclxuICogXHJcbiAqIOatpOaooeWdl+mdnuW4uOWkjeadglxyXG4gKiBcclxuICogMS4g6byg5qCH5oyJ5LiL5pe277yM6YCJ5Lit5Y2V5Liq5YWD57SgXHJcbiAqIDIuIOm8oOagh+aMieS4i+S4uuepuu+8jOaLluaLveaXtuS6p+eUn+mAieS4reahhu+8jOWPr+S7pemAieaLqeWkmuS4quWFg+e0oFxyXG4gKiAzLiDpgInkuK3ljZXkuKrvvIjmiJbpgInljLrpgInkuK3lpJrkuKrvvIkg57yp5pS+IOetieaOp+WItueCue+8jOaLluaLveaUueWPmOWuvemrmFxyXG4gKiAzLiDliIfmlq3liIDov5nkuKrlt6Xlhbfml7bvvIzmv4DmtLvnmoTlhYPntKDov5vlhaXooqvpgInkuK3nirbmgIHvvIjova7lu5Pnur8r5o6n5Yi254K577yJ44CCXHJcbiAqIDQuIOmAieWMuuWSjOWFg+e0oOebuOS6pOeahOWIpOWumlxyXG4gKiA1LiDmv4DmtLvlhYPntKDlpoLkvZXkv53lrZjvvIzkv53lrZjliLDlk6rph4xcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3Qge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBudWxsXHJcbiAgICB0aGlzLnNlbGVjdGVkRWxzID0gW11cclxuXHJcbiAgICB0aGlzLm91dGxpbmVTdGFydFggPSAwXHJcbiAgICB0aGlzLm91dGxpbmVTdGFydFkgPSAwXHJcbiAgfVxyXG4gIG5hbWUoKSB7XHJcbiAgICByZXR1cm4gJ3NlbGVjdCdcclxuICB9XHJcbiAgc2V0RWRpdG9yKGVkaXRvcikge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICB9XHJcbiAgaGFzU2VsZWN0ZWRFbHNXaGVuU3RhcnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEVscy5sZW5ndGggPiAwXHJcbiAgfVxyXG4gIHN0YXJ0KGN0eCkge1xyXG4gICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGN0eC5vcmlnaW5FdmVudC50YXJnZXRcclxuICAgIGlmICghdGhpcy5lZGl0b3IuaXNDb250ZW50RWxlbWVudCh0YXJnZXRFbGVtZW50KSkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0YXJnZXRGRWxlbWVudCA9IG5ldyBGU1ZHLlJlY3QodGFyZ2V0RWxlbWVudCkgLy8g5pqC5pe25Y+q5pivIHJlY3QgVE9ETzog5pS55Li66YCa55So5YaZ5rOVXHJcbiAgICB0aGlzLnNlbGVjdGVkRWxzID0gWyB0YXJnZXRGRWxlbWVudCBdIC8vIOm8oOagh+aMieS4i+aXtu+8jOWwsemAieS4reS6huS4gOS4quWFg+e0oFxyXG4gICAgY29uc3QgeCA9IHBhcnNlRmxvYXQodGFyZ2V0RkVsZW1lbnQuZ2V0QXR0cigneCcpKVxyXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQodGFyZ2V0RkVsZW1lbnQuZ2V0QXR0cigneScpKVxyXG4gICAgY29uc3QgdyA9IHBhcnNlRmxvYXQodGFyZ2V0RkVsZW1lbnQuZ2V0QXR0cignd2lkdGgnKSlcclxuICAgIGNvbnN0IGggPSBwYXJzZUZsb2F0KHRhcmdldEZFbGVtZW50LmdldEF0dHIoJ2hlaWdodCcpKVxyXG5cclxuICAgIHRoaXMub3V0bGluZVN0YXJ0WCA9IHhcclxuICAgIHRoaXMub3V0bGluZVN0YXJ0WSA9IHlcclxuXHJcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuZHJhd1JlY3QoeCwgeSwgdywgaClcclxuICB9XHJcbiAgbW92ZShjdHgpIHtcclxuICAgIGlmICghdGhpcy5oYXNTZWxlY3RlZEVsc1doZW5TdGFydCgpKSB7IC8vIGRyYXcgc2VsZWN0aW5nIGFyZWFcclxuICAgICAgLy8gc2VsZWN0IG5vIGVsZW1lbnQsIGRyYXcgc2VsZWN0IHJlY3RcclxuICAgICAgY29uc3QgeyB4OiBlbmRYLCB5OiBlbmRZIH0gPSBjdHguZ2V0UG9zKClcclxuICAgICAgY29uc3QgeyB4OiBzdGFydFgsIHk6IHN0YXJ0WSB9ID0gY3R4LmdldFN0YXJ0UG9zKClcclxuICAgICAgY29uc3QgeyB4LCB5LCB3LCBoIH0gPSBnZXRCb3hCeTJwb2ludHMoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpXHJcbiAgICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIuc2VsZWN0QXJlYS5kcmF3UmVjdCh4LCB5LCB3LCBoKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IHg6IGR4LCB5OiBkeSB9ID0gY3R4LmdldERpZmZQb3MoKVxyXG4gICAgY29uc3Qgb3V0bGluZUh1ZCA9IHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIub3V0bGluZUh1ZFxyXG4gICAgY29uc3QgdyA9IG91dGxpbmVIdWQuZ2V0V2lkdGgoKVxyXG4gICAgY29uc3QgaCA9IG91dGxpbmVIdWQuZ2V0SGVpZ2h0KClcclxuICAgIG91dGxpbmVIdWQuZHJhd1JlY3QodGhpcy5vdXRsaW5lU3RhcnRYICsgZHgsIHRoaXMub3V0bGluZVN0YXJ0WSArIGR5LCB3LCBoKVxyXG4gIH1cclxuICBlbmQoY3R4KSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzU2VsZWN0ZWRFbHNXaGVuU3RhcnQoKSkgeyAvLyBmaW5pc2hlZCBkcmF3biBzZWxlY3RpbmcgYXJlYVxyXG4gICAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLnNlbGVjdEFyZWEuY2xlYXIoKVxyXG4gICAgICAvLyBUT0RPOiBhY3RpdmUgZnJhbWUgYnkgc2VsZWN0IHJlY3QuXHJcbiAgICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLmNsZWFyKClcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuY2xlYXIoKVxyXG5cclxuICAgIFxyXG4gICAgY29uc3QgeyB4OiBkeCwgeTogZHkgfSA9IGN0eC5nZXREaWZmUG9zKClcclxuICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdkbW92ZScsIHRoaXMuc2VsZWN0ZWRFbHMsIGR4LCBkeSlcclxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVscyh0aGlzLnNlbGVjdGVkRWxzKSAvLyBzZXQgZ2xvYmFsIGFjdGl2ZWQgZWxlbWVudHNcclxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxyXG4gIH1cclxuICAvLyBtb3VzZWRvd24gb3V0c2lkZSB2aWV3cG9ydFxyXG4gIGVuZE91dHNpZGUoKSB7XHJcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuY2xlYXIoKVxyXG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5zZWxlY3RBcmVhLmNsZWFyKClcclxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLmNsZWFyKClcclxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxyXG4gIH1cclxufVxyXG4iLCIvKiogem9vbSAqL1xyXG5cclxuY29uc3QgeyBnZXRWaWV3Qm94IH0gPSByZXF1aXJlKFwiLi4vdXRpbC9zdmdcIilcclxuXHJcbmV4cG9ydCBjbGFzcyBab29tTWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcclxuICB9XHJcbiAgc2V0RWRpdG9yKGVkaXRvcikge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICB9XHJcbiAgZ2V0Wm9vbSgpIHtcclxuICAgIGNvbnN0IGFjdHVsV2lkdGggPSBwYXJzZUZsb2F0KHRoaXMuZWRpdG9yLnN2Z1Jvb3QuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKVxyXG4gICAgY29uc3Qgdmlld0JveCA9IGdldFZpZXdCb3godGhpcy5lZGl0b3Iuc3ZnUm9vdClcclxuICAgIGNvbnN0IHpvb20gPSBhY3R1bFdpZHRoIC8gdmlld0JveC53XHJcbiAgICByZXR1cm4gem9vbVxyXG4gIH1cclxuICBzZXRab29tKHpvb20pIHtcclxuICAgIGNvbnNvbGUubG9nKHpvb20pXHJcbiAgICBjb25zdCB2aWV3Qm94ID0gZ2V0Vmlld0JveCh0aGlzLmVkaXRvci5zdmdSb290KVxyXG4gICAgY29uc3Qgd2lkdGggPSB2aWV3Qm94LncgKiB6b29tXHJcbiAgICBjb25zdCBoZWlnaHQgPSB2aWV3Qm94LmggKiB6b29tXHJcbiAgICB0aGlzLmVkaXRvci5zdmdSb290LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aClcclxuICAgIHRoaXMuZWRpdG9yLnN2Z1Jvb3Quc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoZWlnaHQpXHJcbiAgfVxyXG4gIHpvb21JbigpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRab29tID0gdGhpcy5nZXRab29tKClcclxuICAgIHRoaXMuc2V0Wm9vbShjdXJyZW50Wm9vbSArIDAuMSlcclxuICB9XHJcbiAgem9vbU91dCgpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRab29tID0gdGhpcy5nZXRab29tKClcclxuICAgIHRoaXMuc2V0Wm9vbShjdXJyZW50Wm9vbSAtIDAuMSlcclxuICB9XHJcbn0iLCJcclxuZXhwb3J0IGNsYXNzIEVkaXRvclNldHRpbmcge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zZXR0aW5nID0ge1xyXG4gICAgICAvLyBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIC8vIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICAvLyBzdHJva2VXaWR0aDogJzJweCcsXHJcblxyXG4gICAgICAvLyBvdXRsaW5lV2lkdGhcclxuICAgICAgLy8gb3V0bGluZUNvbG9yXHJcbiAgICB9XHJcbiAgICB0aGlzLmJpbmRlZEV2ZW50Rm5zID0ge31cclxuICAgIHRoaXMuc2V0RmlsbCgnI2ZmZicpXHJcbiAgICB0aGlzLnNldFN0cm9rZSgnIzAwMCcpXHJcbiAgICB0aGlzLnNldCgnc3Ryb2tlV2lkdGgnLCAnMXB4JylcclxuICB9XHJcbiAgc2V0RmlsbCh2YWwpIHtcclxuICAgIHRoaXMuc2V0KCdmaWxsJywgdmFsKVxyXG4gIH1cclxuICBzZXRTdHJva2UodmFsKSB7XHJcbiAgICB0aGlzLnNldCgnc3Ryb2tlJywgdmFsKVxyXG4gIH1cclxuICBzZXQobmFtZSwgdmFsKSB7XHJcbiAgICB0aGlzLnNldHRpbmdbbmFtZV0gPSB2YWxcclxuXHJcbiAgICBjb25zdCB0b0NhbGxGbnMgPSB0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdXHJcbiAgICBpZiAodG9DYWxsRm5zKSB7XHJcbiAgICAgIHRvQ2FsbEZucy5mb3JFYWNoKGZuID0+IHtcclxuICAgICAgICBmbih2YWwpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldChuYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5nW25hbWVdXHJcbiAgfVxyXG4gIGJpbmRFdmVudChuYW1lLCBmbikge1xyXG4gICAgaWYgKCF0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdKSB7XHJcbiAgICAgIHRoaXMuYmluZGVkRXZlbnRGbnNbbmFtZV0gPSBbXVxyXG4gICAgfVxyXG4gICAgdGhpcy5iaW5kZWRFdmVudEZuc1tuYW1lXS5wdXNoKGZuKVxyXG4gIH1cclxuICByZW1vdmVFdmVudChuYW1lLCBmbikge1xyXG4gICAgaWYgKCF0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdKSByZXR1cm4gZmFsc2VcclxuXHJcbiAgICBjb25zdCByZW1vdmVGbklkeCA9IHRoaXMuYmluZGVkRXZlbnRGbnNbbmFtZV0uZmluZEluZGV4KGZuKVxyXG4gICAgaWYgKHJlbW92ZUZuSWR4ID09PSAtMSkgcmV0dXJuIGZhbHNlXHJcbiAgICB0aGlzLmJpbmRlZEV2ZW50Rm5zLnNwbGljZShyZW1vdmVGbklkeCwgMSlcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG59IiwiXHJcbmV4cG9ydCBjbGFzcyBTaG9ydGN1dCB7XHJcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gICAgdGhpcy5yZWdpc3RlcmVkRm5zID0ge31cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xyXG4gICAgICBjb25zdCBwcmVzc0tleU5hbWUgPSBnZXRQcmVzc0tleU5hbWUoZSlcclxuXHJcbiAgICAgIGNvbnN0IGZuID0gdGhpcy5yZWdpc3RlcmVkRm5zW3ByZXNzS2V5TmFtZV1cclxuICAgICAgaWYgKGZuKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgZm4uZm4oZSlcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH0sIGZhbHNlKVxyXG4gIH1cclxuICAvLyB0aGlzLnJlZ2lzdGVyKCd1bmRvJywgJ0N0cmwrWicsICgpID0+IHsgZWRpdG9yLmV4ZWNDb21tYW5kKCd1bmRvJykgfSlcclxuICByZWdpc3RlcihjbWROYW1lLCBzaG9ydGN1dE5hbWUsIGZuKSB7XHJcbiAgICAvLyBUT0RPOiB2YWxpZCBzaG9ydGN1dE5hbWVcclxuICAgIHRoaXMucmVnaXN0ZXJlZEZuc1tzaG9ydGN1dE5hbWVdID0geyBjbWROYW1lLCBmbiB9XHJcbiAgICBcclxuICB9XHJcbiAgZm9ybWF0UHJpbnQoKSB7XHJcbiAgICBjb25zdCBhcnIgPSBbXVxyXG4gICAgZm9yIChsZXQgc2hvcnRjdXROYW1lIGluIHRoaXMucmVnaXN0ZXJlZEZucykge1xyXG4gICAgICBjb25zdCBjbWROYW1lID0gdGhpcy5yZWdpc3RlcmVkRm5zW3Nob3J0Y3V0TmFtZV0uY21kTmFtZVxyXG4gICAgICBhcnIucHVzaChjbWROYW1lICsgJzogJyArIHNob3J0Y3V0TmFtZSlcclxuICAgIH1cclxuICAgIHJldHVybiBhcnIuam9pbignLCAnKVxyXG4gIH1cclxuICBcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UHJlc3NLZXlOYW1lKGUpIHtcclxuICBjb25zdCBwcmVzc2VkS2V5cyA9IFtdXHJcbiAgaWYgKGUuY3RybEtleSkgcHJlc3NlZEtleXMucHVzaCgnQ3RybCcpXHJcbiAgaWYgKGUubWV0YUtleSkgcHJlc3NlZEtleXMucHVzaCgnQ21kJylcclxuICBpZiAoZS5zaGlmdEtleSkgcHJlc3NlZEtleXMucHVzaCgnU2hpZnQnKVxyXG4gIC8vIG9ubHkgY2hlY2sgQX5aXHJcbiAgLy8gVE9ETzogcmVzb2x2ZSBhbGwga2V5XHJcbiAgaWYgKC9LZXkuLy50ZXN0KGUuY29kZSkpIHByZXNzZWRLZXlzLnB1c2goZS5jb2RlW2UuY29kZS5sZW5ndGggLSAxXSlcclxuICBjb25zdCBuYW1lID0gcHJlc3NlZEtleXMuam9pbignKycpXHJcbiAgcmV0dXJuIG5hbWVcclxufSIsImNvbnN0IHsgRWRpdG9yRXZlbnRDb250ZXh0IH0gPSByZXF1aXJlKFwiLi9lZGl0b3JFdmVudENvbnRleHRcIilcclxuXHJcbmV4cG9ydCBjbGFzcyBUb29sTWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gICAgdGhpcy50b29scyA9IHt9XHJcbiAgICB0aGlzLmN1cnJlbnRUb29sID0gbnVsbFxyXG4gICAgdGhpcy5pbnZva2VXaGVuU3dpdGNoID0gKCkgPT4ge31cclxuXHJcbiAgICB0aGlzLmN0eCA9IG51bGwgLy8gdG9vbCBjb250ZXh0XHJcbiAgfVxyXG4gIHNldEN1cnJlbnRUb29sKG5hbWUpIHtcclxuICAgIHRoaXMuY3VycmVudFRvb2wgPSB0aGlzLnRvb2xzW25hbWVdXHJcbiAgICB0aGlzLmludm9rZVdoZW5Td2l0Y2godGhpcy5nZXRDdXJyZW50VG9vbE5hbWUoKSlcclxuICB9XHJcbiAgb25Td2l0Y2hUb29sKGZuKSB7XHJcbiAgICB0aGlzLmludm9rZVdoZW5Td2l0Y2ggPSBmblxyXG4gIH1cclxuICBnZXRDdXJyZW50VG9vbE5hbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VG9vbC5uYW1lKClcclxuICB9XHJcbiAgcmVnaXN0ZXJUb29sKHRvb2wpIHtcclxuICAgIHRoaXMudG9vbHNbdG9vbC5uYW1lKCldID0gdG9vbFxyXG4gICAgdG9vbC5zZXRFZGl0b3IodGhpcy5lZGl0b3IpIC8vIGRlcGVuZGVuY3kgaW5qZWN0aW9uXHJcbiAgfVxyXG5cclxuICBiaW5kVG9vbEV2ZW50KCkge1xyXG4gICAgY29uc3Qgc3ZnUm9vdCA9IHRoaXMuZWRpdG9yLnN2Z1Jvb3RcclxuXHJcbiAgICBzdmdSb290LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGUgPT4ge1xyXG4gICAgICBjb25zdCBjdHggPSBuZXcgRWRpdG9yRXZlbnRDb250ZXh0KHRoaXMuZWRpdG9yLCBlKVxyXG4gICAgICB0aGlzLmN0eCA9IGN0eFxyXG4gICAgICB0aGlzLmN1cnJlbnRUb29sLnN0YXJ0KGN0eClcclxuICAgIH0sIGZhbHNlKVxyXG5cclxuICAgIHN2Z1Jvb3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XHJcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4XHJcblxyXG4gICAgICBpZiAoIWN0eCkgcmV0dXJuIC8vIGlmIGN0eCBleGl0cywgcHJlc2VudCBtb3VzZWRvd24gZXZlbnQgZW1pdCBqdXN0IGJlZm9yZVxyXG4gICAgICBjdHguc2V0T3JpZ2luRXZlbnQoZSlcclxuICAgICAgY3R4LnByZXNzTW91c2UoKVxyXG4gICAgICB0aGlzLmN1cnJlbnRUb29sLm1vdmUoY3R4KSAvLyBtb3ZlXHJcbiAgICB9LCBmYWxzZSlcclxuICAgIFxyXG4gICAgc3ZnUm9vdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZSA9PiB7XHJcbiAgICAgIC8vIHRoaXMuY3R4LnJlbGVhc2VNb3VzZSgpXHJcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4XHJcbiAgICAgIC8vIGN0eC5zZXRPcmlnaW5FdmVudChlKSAvLyB0aGUgb2Zmc2V0WCBhbmQgb2Zmc2V0WSBpbiBtb3VzZXVwIGFuZCB0aGUgbGFzdCBtb3VzZW1vdmUgaXMgbm90IGVxdWFsID8/IFxyXG4gICAgICB0aGlzLmN1cnJlbnRUb29sLmVuZChjdHgpXHJcbiAgICAgIGN0eC5pc0VuZEluc2lkZSA9IHRydWVcclxuICAgIH0sIGZhbHNlKVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmN0eCAmJiB0aGlzLmN0eC5pc0VuZEluc2lkZSA9PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRvb2wuZW5kT3V0c2lkZSh0aGlzLmN0eClcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmN0eCA9IG51bGxcclxuICAgIH0sIGZhbHNlKVxyXG4gIH1cclxufSIsIlxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm94QnkycG9pbnRzKHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgbGV0IHgsIHksIHcsIGhcclxuICB3ID0gTWF0aC5hYnMoeDIgLSB4MSlcclxuICBoID0gTWF0aC5hYnMoeTIgLSB5MSlcclxuICB4ID0gTWF0aC5taW4oeDIsIHgxKVxyXG4gIHkgPSBNYXRoLm1pbih5MiwgeTEpXHJcbiAgcmV0dXJuIHsgeCwgeSwgdywgaCB9XHJcbn0iLCJcclxuLy8gVE9ETzogdG8gZmluaXNoXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRWaWV3Qm94KGVsKSB7XHJcbiAgY29uc3QgdmFsID0gZWwuZ2V0QXR0cmlidXRlKCd2aWV3Qm94JylcclxuICBpZiAoIXZhbCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdoYXMgbm90IHZpZXdCb3ggYXR0cmlidXRlJylcclxuICB9XHJcbiAgY29uc3QgW3gsIHksIHcsIGhdID0gdmFsLnNwbGl0KC9bXFxzLF0rLykubWFwKGl0ZW0gPT4gcGFyc2VGbG9hdChpdGVtKSlcclxuICByZXR1cm4geyB4LCB5LCB3LCBoIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAuanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9