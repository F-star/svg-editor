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
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ "./src/element/index.js");
/* harmony import */ var _util_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/common */ "./src/util/common.js");
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
    if (box.width === 0 || box.height === 0) {
      this.clear()
      return
    }

    const elsInBox = (0,_util_common__WEBPACK_IMPORTED_MODULE_1__.getElementsInBox)(box, this.editor.svgContent)
    if (elsInBox.length === 0) {
      this.clear()
    } else {
      this.setEls(elsInBox)
    }
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
    const els = this.els
    const hudManager = this.editor.hudManager

    const firstBox = new _element__WEBPACK_IMPORTED_MODULE_0__.FSVG.Box(els[0].getBBox())
    const mergedBox = els.reduce((pre, curEl) => {
      const curBox = curEl.getBBox()
      return pre.merge(new _element__WEBPACK_IMPORTED_MODULE_0__.FSVG.Box(curBox))
    }, firstBox)

    hudManager.outlineHud.drawRect(mergedBox.x, mergedBox.y, mergedBox.width, mergedBox.height)
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

    this.editor.activedElsManager.setEls(this.rect)
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
    this.editor.activedElsManager.setEls(this.rect)
  }
  undo() {
    this.rect.el().remove()
    this.editor.activedElsManager.clear()
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
    for (let idx = this.els.length - 1; idx >= 0; idx--) {
      const element = this.els[idx]
      const el = element.el()
      if (this.nextSiblings[idx]) {
        this.parents[idx].insertBefore(el, this.nextSiblings[idx])
      } else {
        this.parents[idx].appendChild(el)
      }
    }

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

    this.width = this.w
    this.height = this.h
    this.x2 = this.x + this.w
    this.y2 = this.y + this.h
  }
  contains(otherBox) {
    return this.x <= otherBox.x && this.y <= otherBox.y &&
      this.x2 >= otherBox.x + otherBox.width && this.y2 >= otherBox.y + otherBox.height
  }

  merge(otherBox) {
    const x = Math.min(this.x, otherBox.x)
    const y = Math.min(this.y, otherBox.y)
    const x2 = Math.max(this.x2, otherBox.x2)
    const y2 = Math.max(this.y2, otherBox.y2)
    const w = x2 - x
    const h = y2 - y
    return new Box(x, y, w, h)
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
    this.x = this.y = this.w = this.h = 0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2FjdGl2ZWRFbHNNYW5hZ2VyLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvY29tbWFuZC9jb21tYW5kTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2NvbW1hbmQvY29tbWFuZHMuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9kZXZDb25maWcuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3JFdmVudENvbnRleHQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lbGVtZW50L2Jhc2VFbGVtZW50LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvZWxlbWVudC9ib3guanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lbGVtZW50L2luZGV4LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvZWxlbWVudC9yZWN0LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbGF5ZXIvaHVkTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2xheWVyL291dGxpbmVIdWQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9sYXllci9zZWxlY3RBcmVhLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy9hZGRSZWN0LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy9kcmFnQ2FudmFzLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9tb2R1bGVzL3pvb20uanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9zZXR0aW5nL2VkaXRvclNldHRpbmcuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9zaG9ydGN1dC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL3Rvb2xNYW5hZ2VyLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvdXRpbC9jb21tb24uanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy91dGlsL21hdGguanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy91dGlsL3N2Zy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBZ0M7QUFDZ0I7O0FBRXpDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsOERBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFD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QTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImFwcC5hYmIwNDhiMjcxZDM0Njk3ODUyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICog5r+A5rS75YWD57Sg566h55CG57G7XG4gKi9cblxuaW1wb3J0IHsgRlNWRyB9IGZyb20gXCIuL2VsZW1lbnRcIlxuaW1wb3J0IHsgZ2V0RWxlbWVudHNJbkJveCB9IGZyb20gXCIuL3V0aWwvY29tbW9uXCJcblxuZXhwb3J0IGNsYXNzIEFjdGl2ZWRFbHNNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgICB0aGlzLmVscyA9IFtdXG4gIH1cbiAgc2V0RWxzKGVscykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShlbHMpKSBlbHMgPSBbZWxzXVxuICAgIHRoaXMuZWxzID0gZWxzXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5lZGl0b3IudG9vbE1hbmFnZXIuZ2V0Q3VycmVudFRvb2xOYW1lKCkpXG4gICAgLy8gVE9ETzogaGlnaGxpZ2h0IG91dGxpbmUsIGFjY29yZGluZyB0byBjdXJyZW50IHRvb2xcbiAgICB0aGlzLmhlaWdobGlndGhFbHMoKVxuICAgIHRoaXMuc2V0U2V0dGluZ0ZpbGwoKVxuICB9XG4gIGdldEVscygpIHtcbiAgICByZXR1cm4gdGhpcy5lbHNcbiAgfVxuICBzZXRFbHNJbkJveChib3gpIHtcbiAgICBpZiAoYm94LndpZHRoID09PSAwIHx8IGJveC5oZWlnaHQgPT09IDApIHtcbiAgICAgIHRoaXMuY2xlYXIoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgZWxzSW5Cb3ggPSBnZXRFbGVtZW50c0luQm94KGJveCwgdGhpcy5lZGl0b3Iuc3ZnQ29udGVudClcbiAgICBpZiAoZWxzSW5Cb3gubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLmNsZWFyKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRFbHMoZWxzSW5Cb3gpXG4gICAgfVxuICB9XG4gIGlzRW1wdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxzLmxlbmd0aCA9PSAwXG4gIH1cbiAgaXNOb0VtcHR5KCkge1xuICAgIHJldHVybiB0aGlzLmVscy5sZW5ndGggPiAwXG4gIH1cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5lbHMgPSBbXVxuICAgIC8vIGNsZWFyIG91dGxpbmVcbiAgICBjb25zdCBodWRNYW5hZ2VyID0gdGhpcy5lZGl0b3IuaHVkTWFuYWdlclxuICAgIGh1ZE1hbmFnZXIub3V0bGluZUh1ZC5jbGVhcigpXG4gIH1cbiAgY29udGFpbnMoZWwpIHtcbiAgICAvLyBUT0RPOlxuICB9XG4gIGdldE1lcmdlQkJveCgpIHtcbiAgICAvLyBUT0RPOlxuICAgIC8qIGxldCB4LCB5LCB3LCBoXG4gICAgdGhpcy5lbHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICBjb25zdCBiYm94ID0gZWwuZWwoKS5nZXRiYm94KClcbiAgICB9KSAqL1xuICB9XG4gIC8vIGhlaWdodGxpZ2h0IHRoZSBlbGVtZW50c1xuICBoZWlnaGxpZ3RoRWxzKCkge1xuICAgIGNvbnN0IGVscyA9IHRoaXMuZWxzXG4gICAgY29uc3QgaHVkTWFuYWdlciA9IHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXJcblxuICAgIGNvbnN0IGZpcnN0Qm94ID0gbmV3IEZTVkcuQm94KGVsc1swXS5nZXRCQm94KCkpXG4gICAgY29uc3QgbWVyZ2VkQm94ID0gZWxzLnJlZHVjZSgocHJlLCBjdXJFbCkgPT4ge1xuICAgICAgY29uc3QgY3VyQm94ID0gY3VyRWwuZ2V0QkJveCgpXG4gICAgICByZXR1cm4gcHJlLm1lcmdlKG5ldyBGU1ZHLkJveChjdXJCb3gpKVxuICAgIH0sIGZpcnN0Qm94KVxuXG4gICAgaHVkTWFuYWdlci5vdXRsaW5lSHVkLmRyYXdSZWN0KG1lcmdlZEJveC54LCBtZXJnZWRCb3gueSwgbWVyZ2VkQm94LndpZHRoLCBtZXJnZWRCb3guaGVpZ2h0KVxuICB9XG4gIHNldFNldHRpbmdGaWxsKCkge1xuICAgIGNvbnN0IGVscyA9IHRoaXMuZWxzXG5cbiAgICBjb25zdCBmaWxscyA9IGVscy5tYXAoZWwgPT4ge1xuICAgICAgcmV0dXJuIGVsLmdldEF0dHIoJ2ZpbGwnKVxuICAgIH0pXG5cbiAgICB0aGlzLmVkaXRvci5zZXR0aW5nLnNldEZpbGwoZmlsbHNbMF0pIC8vIEZJWE1FOlxuICB9XG4gIHNldEVsc0F0dHIobmFtZSwgdmFsKSB7XG4gICAgaWYgKHRoaXMuaXNOb0VtcHR5KCkpIHtcbiAgICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdzZXRBdHRyJywgdGhpcy5lbHMsIG5hbWUsIHZhbClcbiAgICB9XG4gIH1cbn0iLCJcbmltcG9ydCBFZGl0b3IgZnJvbSAnLi9lZGl0b3IuanMnXG5pbXBvcnQgQWRkUmVjdCBmcm9tICcuL21vZHVsZXMvYWRkUmVjdC5qcydcbmltcG9ydCB7IERyYWdDYW52YXMgfSBmcm9tICcuL21vZHVsZXMvZHJhZ0NhbnZhcy5qcydcbmltcG9ydCBDb21tYW5kTWFuYWdlciBmcm9tICcuL2NvbW1hbmQvY29tbWFuZE1hbmFnZXIuanMnXG5pbXBvcnQgeyBFZGl0b3JTZXR0aW5nIH0gZnJvbSAnLi9zZXR0aW5nL2VkaXRvclNldHRpbmcuanMnXG5pbXBvcnQgeyBab29tTWFuYWdlciB9IGZyb20gJy4vbW9kdWxlcy96b29tLmpzJ1xuaW1wb3J0IHsgU2VsZWN0IH0gZnJvbSAnLi9tb2R1bGVzL3NlbGVjdC5qcydcbmltcG9ydCB7IFRvb2xNYW5hZ2VyIH0gZnJvbSAnLi90b29sTWFuYWdlci5qcydcblxuZnVuY3Rpb24gYWN0aXZlQnRuKG5hbWUpIHtcbiAgbmFtZSA9IHtcbiAgICAnc2VsZWN0JzogJ2J0bi1zZWxlY3QnLFxuICAgICdhZGRSZWN0JzogJ2J0bi1hZGQtcmVjdCcsXG4gICAgJ2RyYWdDYW52YXMnOiAnYnRuLWRyYWctY2FudmFzJyxcbiAgfVtuYW1lXVxuICBpZiAobmFtZSA9PSB1bmRlZmluZWQpIHJldHVyblxuXG4gIGNvbnN0IHRvb2xCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9vbC1iYXInKVxuICBjb25zdCB0b29sQnRucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRvb2xCYXIuY2hpbGRyZW4pXG4gIHRvb2xCdG5zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICB9KVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYW1lKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxufVxuXG5cbmNvbnN0IGVkaXRvciA9IG5ldyBFZGl0b3IoKVxud2luZG93LmVkaXRvciA9IGVkaXRvciAvLyBkZWJ1ZyBpbiBkZXZ0b29sXG5cbmNvbnN0IGNvbW1hbmRNYW5hZ2VyID0gbmV3IENvbW1hbmRNYW5hZ2VyKGVkaXRvcilcbmVkaXRvci5zZXRDb21tYW5kTWFuYWdlcihjb21tYW5kTWFuYWdlcilcblxuZWRpdG9yLnNldFNldHRpbmcobmV3IEVkaXRvclNldHRpbmcoKSlcbi8vIHJlZ2lzdGVyIHRvb2xzXG5cbmNvbnN0IHRvb2xNYW5hZ2VyID0gbmV3IFRvb2xNYW5hZ2VyKGVkaXRvcilcbmVkaXRvci5zZXRUb29sTWFuYWdlcih0b29sTWFuYWdlcilcbnRvb2xNYW5hZ2VyLnJlZ2lzdGVyVG9vbChuZXcgQWRkUmVjdCgpKVxudG9vbE1hbmFnZXIucmVnaXN0ZXJUb29sKG5ldyBEcmFnQ2FudmFzKCkpXG50b29sTWFuYWdlci5yZWdpc3RlclRvb2wobmV3IFNlbGVjdCgpKVxuXG5lZGl0b3IudG9vbE1hbmFnZXIub25Td2l0Y2hUb29sKG5hbWUgPT4ge1xuICBjb25zb2xlLmxvZygnc3dpdGNoZWQgdG9vbDonLCBuYW1lKVxuICBhY3RpdmVCdG4obmFtZSlcbn0pXG5cbnRvb2xNYW5hZ2VyLnNldEN1cnJlbnRUb29sKCdhZGRSZWN0JylcbnRvb2xNYW5hZ2VyLmJpbmRUb29sRXZlbnQoKVxuLy8gem9vbVxuZWRpdG9yLnNldFpvb21NYW5hZ2VyKG5ldyBab29tTWFuYWdlcigpKVxuXG5lZGl0b3IubW91bnQoJyNlZGl0b3ItYXJlYScpXG5cblxuLyoqIFxuICogYmluZCBldmVudCBpbiBidXR0b25cbiAqLyBcbi8vIHVuZG9cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tdW5kbycpLm9uY2xpY2sgPSAoKSA9PiB7XG4gIGVkaXRvci5leGVjdXRlQ29tbWFuZCgndW5kbycpXG59XG4vLyByZWRvXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXJlZG8nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIGVkaXRvci5leGVjdXRlQ29tbWFuZCgncmVkbycpXG59XG4vLyB6b29tSW5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tem9vbS1pbicpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLnpvb21NYW5hZ2VyLnpvb21JbigpXG59XG4vLyB6b29tT3V0XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXpvb20tb3V0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBlZGl0b3Iuem9vbU1hbmFnZXIuem9vbU91dCgpXG59XG4vLyBzZWxlY3QgYWRkUmVjdCB0b29sXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLWFkZC1yZWN0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBlZGl0b3Iuc2V0Q3VycmVudFRvb2woJ2FkZFJlY3QnKVxufVxuLy8gc2VsZWN0IGRyYWdjYW52YXMgdG9vbFxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1kcmFnLWNhbnZhcycpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLnNldEN1cnJlbnRUb29sKCdkcmFnQ2FudmFzJylcbn1cbi8vIHNlbGVjdCB0b29sXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXNlbGVjdCcpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgZWRpdG9yLnNldEN1cnJlbnRUb29sKCdzZWxlY3QnKVxufVxuLy8gZGVsZXRlIHNlbGVjdGVkIGVsZW1lbnRzXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLWRlbGV0ZScpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgaWYgKGVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5pc05vRW1wdHkoKSkge1xuICAgIGVkaXRvci5leGVjdXRlQ29tbWFuZCgncmVtb3ZlU2VsZWN0ZWRFbGVtZW50cycpXG4gIH1cbn1cblxuLy8gZmlsbCB2YWx1ZSBjb250cm9sXG5jb25zdCBmaWxsVGV4dE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWxlbWVudC1pbmZvLWZpbGwnKVxuZmlsbFRleHROb2RlLmlubmVySFRNTCA9IGVkaXRvci5zZXR0aW5nLmdldCgnZmlsbCcpXG5lZGl0b3Iuc2V0dGluZy5iaW5kRXZlbnQoJ2ZpbGwnLCB2YWwgPT4ge1xuICBmaWxsVGV4dE5vZGUuaW5uZXJIVE1MID0gdmFsXG59KVxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NldC1maWxsLWJ0bicpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgZmlsbCA9IHdpbmRvdy5wcm9tcHQoJ1BsZWFzZSBpbnB1dCB2YWxpZCBjb2xvciB2YWx1Ze+8iGxpa2UgI2ZmY2U0M++8iScsIGVkaXRvci5zZXR0aW5nLmdldCgnZmlsbCcpKVxuICBpZiAoIWZpbGwpIHJldHVyblxuICBmaWxsVGV4dE5vZGUuaW5uZXJIVE1MID0gZmlsbFxuXG4gIGVkaXRvci5zZXR0aW5nLnNldEZpbGwoZmlsbClcbiAgZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVsc0F0dHIoJ2ZpbGwnLCBmaWxsKVxufVxuXG4vLyBzdHJva2UgdmFsdWUgY29udHJvbFxuY29uc3Qgc3Ryb2tlVGV4dE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWxlbWVudC1pbmZvLXN0cm9rZScpXG5zdHJva2VUZXh0Tm9kZS5pbm5lckhUTUwgPSBlZGl0b3Iuc2V0dGluZy5nZXQoJ3N0cm9rZScpXG5lZGl0b3Iuc2V0dGluZy5iaW5kRXZlbnQoJ3N0cm9rZScsIHZhbCA9PiB7XG4gIHN0cm9rZVRleHROb2RlLmlubmVySFRNTCA9IHZhbFxufSlcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZXQtc3Ryb2tlLWJ0bicpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgc3Ryb2tlID0gd2luZG93LnByb21wdCgnUGxlYXNlIGlucHV0IHZhbGlkIGNvbG9yIHZhbHVl77yIbGlrZSAjZmZjZTQz77yJJywgZWRpdG9yLnNldHRpbmcuZ2V0KCdzdHJva2UnKSlcbiAgaWYgKCFzdHJva2UpIHJldHVyblxuICBzdHJva2VUZXh0Tm9kZS5pbm5lckhUTUwgPSBzdHJva2VcblxuICBlZGl0b3Iuc2V0dGluZy5zZXRTdHJva2Uoc3Ryb2tlKVxuICBlZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzQXR0cignc3Ryb2tlJywgc3Ryb2tlKVxufVxuLy8gcmVnaXN0ZXIgc2hvcnRjdXRcbmVkaXRvci5zaG9ydGN1dC5yZWdpc3RlcignVW5kbycsICdDbWQrWicsICgpID0+IHtcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCd1bmRvJylcbn0pXG5lZGl0b3Iuc2hvcnRjdXQucmVnaXN0ZXIoJ1VuZG8nLCAnQ3RybCtaJywgKCkgPT4ge1xuICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3VuZG8nKVxufSlcbmVkaXRvci5zaG9ydGN1dC5yZWdpc3RlcignUmVkbycsICdDbWQrU2hpZnQrWicsICgpID0+IHtcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdyZWRvJylcbn0pXG5lZGl0b3Iuc2hvcnRjdXQucmVnaXN0ZXIoJ1JlZG8nLCAnQ3RybCtTaGlmdCtaJywgKCkgPT4ge1xuICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3JlZG8nKVxufSlcbmVkaXRvci5zaG9ydGN1dC5yZWdpc3RlcignRGVsZXRlJywgJ0JhY2tzcGFjZScsICgpID0+IHtcbiAgaWYgKGVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5pc05vRW1wdHkoKSkge1xuICAgIGVkaXRvci5leGVjdXRlQ29tbWFuZCgncmVtb3ZlU2VsZWN0ZWRFbGVtZW50cycpXG4gIH1cbn0pXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hvcnRjdXQnKS5pbm5lckhUTUwgPSBlZGl0b3Iuc2hvcnRjdXQuZm9ybWF0UHJpbnQoKVxuXG4vKipcbiAqIOeQhuaDsyBhcGkg5L2/55So5L6L5a2QXG4gKiBcbiAqIGNvbnN0IGVkaXRvckJ1aWxkZXIgPSBuZXcgRWRpdG9yLmJ1aWxkZXIoKVxuICogZWRpdG9yQnVpbGRlclxuICogICAuc2V0Q2FudmFzU2l6ZSg0MDAsIDMwMClcbiAqICAgLnNldFN0YWdlU2l6ZSgxMDAwLCA4MDApXG4gKiAgIC5zZXRWaWV3cG9ydFNpemUoODAwLCA1MDApXG4gKiAgIC5zZXRab29tKDEwMClcbiAqIFxuICogY29uc3QgZWRpdG9yID0gZWRpdG9yQnVpbGRlci5idWlsZCgpXG4gKiBlZGl0b3IucmVnaXN0ZXJUb29sKHRvb2xNb3ZlKVxuICogXG4gKi8iLCIvKipcbiAqIENvbW1hbmRNYW5hZ2VyIENsYXNzXG4gKiBcbiAqIFxuICogQ29tbWFuZE1hbmFnZXIudW5kbygpXG4gKiBDb21tYW5kTWFuYWdlci5yZWRvKClcbiAqL1xuXG5pbXBvcnQgeyBBZGRSZWN0LCBETW92ZSwgcmVtb3ZlU2VsZWN0ZWRFbGVtZW50cywgU2V0QXR0ciB9IGZyb20gXCIuL2NvbW1hbmRzXCJcblxuY2xhc3MgQ29tbWFuZE1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcihlZGl0b3IpIHtcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICAgIHRoaXMucmVkb1N0YWNrID0gW11cbiAgICB0aGlzLnVuZG9TdGFjayA9IFtdXG4gICAgdGhpcy5jb21tYW5kQ2xhc3NlcyA9IHt9XG5cbiAgICB0aGlzLnJlc2lndGVyQ29tbWFuZENsYXNzKEFkZFJlY3QpXG4gICAgdGhpcy5yZXNpZ3RlckNvbW1hbmRDbGFzcyhETW92ZSlcbiAgICB0aGlzLnJlc2lndGVyQ29tbWFuZENsYXNzKFNldEF0dHIpXG4gICAgdGhpcy5yZXNpZ3RlckNvbW1hbmRDbGFzcyhyZW1vdmVTZWxlY3RlZEVsZW1lbnRzKVxuICB9XG4gIHNldEVkaXRvcihlZGl0b3IpIHtcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICB9XG4gIGV4ZWN1dGUobmFtZSwgLi4uYXJncykge1xuICAgIGNvbnN0IENvbW1hbmRDbGFzcyA9IHRoaXMuY29tbWFuZENsYXNzZXNbbmFtZV1cbiAgICBpZiAoIUNvbW1hbmRDbGFzcykgdGhyb3cgbmV3IEVycm9yKGBlZGl0b3IgaGFzIG5vdCB0aGUgJHtuYW1lfSBjb21tYW5kYClcbiAgICBjb25zdCBjb21tYW5kID0gbmV3IENvbW1hbmRDbGFzcyh0aGlzLmVkaXRvciwgLi4uYXJncykgLy8g5Yib5bu6IGNvbW1hbmQg5a6e5L6LXG5cbiAgICB0aGlzLnVuZG9TdGFjay5wdXNoKGNvbW1hbmQpXG4gICAgdGhpcy5yZWRvU3RhY2sgPSBbXVxuICB9XG4gIHVuZG8oKSB7XG4gICAgaWYgKHRoaXMudW5kb1N0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc29sZS5sb2coJ3VuZG8gc3RhY2sgaXMgZW1wdHksIGNhbiBub3QgdW5kbycpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgY29tbWFuZCA9IHRoaXMudW5kb1N0YWNrLnBvcCgpXG4gICAgdGhpcy5yZWRvU3RhY2sucHVzaChjb21tYW5kKVxuICAgIGNvbW1hbmQudW5kbygpXG4gICAgY29tbWFuZC5hZnRlclVuZG8oKVxuICB9XG4gIHJlZG8oKSB7XG4gICAgaWYgKHRoaXMucmVkb1N0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc29sZS5sb2coJ3JlZG8gc3RhY2sgaXMgZW1wdHksIGNhbiBub3QgcmVkbycpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgY29tbWFuZCA9IHRoaXMucmVkb1N0YWNrLnBvcCgpXG4gICAgdGhpcy51bmRvU3RhY2sucHVzaChjb21tYW5kKVxuICAgIGNvbW1hbmQucmVkbygpXG4gICAgY29tbWFuZC5hZnRlclJlZG8oKVxuICB9XG4gIC8vIOazqOWGjOWRveS7pOexu+WIsOWRveS7pOeuoeeQhuWvueixoeS4reOAglxuICByZXNpZ3RlckNvbW1hbmRDbGFzcyhjb21tYW5kQ2xhc3MpIHtcbiAgICBjb25zdCBuYW1lID0gY29tbWFuZENsYXNzLm5hbWUoKVxuICAgIHRoaXMuY29tbWFuZENsYXNzZXNbbmFtZV0gPSBjb21tYW5kQ2xhc3NcbiAgfVxuICBhZnRlckFueVVuZG8oKSB7XG5cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb21tYW5kTWFuYWdlciIsImltcG9ydCB7IEZTVkcgfSBmcm9tIFwiLi4vZWxlbWVudFwiXG5cbmNsYXNzIEJhc2VDb21tYW5kIHtcbiAgdW5kbygpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3BsZWFzZSBvdmVycmlkZSB1bmRvIG1ldGhvZCcpXG4gIH1cbiAgcmVkbygpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3BsZWFzZSBvdmVycmlkZSByZWRvIG1ldGhvZCcpXG4gIH1cbiAgYWZ0ZXJSZWRvKCkge31cbiAgYWZ0ZXJVbmRvKCkge31cbn1cblxuLyoqXG4gKiBhZGRSZWN0XG4gKiBcbiAqIGFkZCByZWN0IHN2ZyBlbGVtZW50XG4gKi9cbmV4cG9ydCBjbGFzcyBBZGRSZWN0IGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBjb25zdHJ1Y3RvcihlZGl0b3IsIHgsIHksIHcsIGgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgICBjb25zdCByZWN0ID0gbmV3IEZTVkcuUmVjdCh4LCB5LCB3LCBoKVxuXG4gICAgY29uc3QgZmlsbCA9IGVkaXRvci5zZXR0aW5nLmdldCgnZmlsbCcpXG4gICAgY29uc3Qgc3Ryb2tlID0gZWRpdG9yLnNldHRpbmcuZ2V0KCdzdHJva2UnKVxuICAgIGNvbnN0IHN0cm9rZVdpZHRoID0gZWRpdG9yLnNldHRpbmcuZ2V0KCdzdHJva2VXaWR0aCcpXG4gICAgcmVjdC5zZXRBdHRyKCdmaWxsJywgZmlsbClcbiAgICByZWN0LnNldEF0dHIoJ3N0cm9rZScsIHN0cm9rZSlcbiAgICByZWN0LnNldEF0dHIoJ3N0cm9rZS13aWR0aCcsIHN0cm9rZVdpZHRoKVxuXG4gICAgZWRpdG9yLmdldEN1cnJlbnRMYXllcigpLmFwcGVuZENoaWxkKHJlY3QuZWwoKSlcblxuICAgIHRoaXMubmV4dFNpYmxpbmcgPSByZWN0LmVsKCkubmV4dEVsZW1lbnRTaWJsaW5nIFxuICAgIHRoaXMucGFyZW50ID0gcmVjdC5lbCgpLnBhcmVudEVsZW1lbnRcbiAgICB0aGlzLnJlY3QgPSByZWN0XG5cbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHModGhpcy5yZWN0KVxuICB9XG4gIHN0YXRpYyBuYW1lKCkge1xuICAgIHJldHVybiAnYWRkUmVjdCdcbiAgfVxuICByZWRvKCkge1xuICAgIGNvbnN0IGVsID0gdGhpcy5yZWN0LmVsKClcbiAgICBpZiAodGhpcy5uZXh0U2libGluZykge1xuICAgICAgdGhpcy5wYXJlbnQuaW5zZXJ0QmVmb3JlKGVsLCB0aGlzLm5leHRTaWJsaW5nKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZChlbClcbiAgICB9XG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzKHRoaXMucmVjdClcbiAgfVxuICB1bmRvKCkge1xuICAgIHRoaXMucmVjdC5lbCgpLnJlbW92ZSgpXG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuY2xlYXIoKVxuICB9XG59XG4vKipcbiAqIHJlbW92ZSBlbGVtZW50c1xuICovXG5leHBvcnQgY2xhc3MgcmVtb3ZlU2VsZWN0ZWRFbGVtZW50cyBleHRlbmRzIEJhc2VDb21tYW5kIHtcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG5cbiAgICB0aGlzLmVscyA9IHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLmdldEVscygpXG5cbiAgICBjb25zdCBzaXplID0gdGhpcy5lbHMubGVuZ3RoXG4gICAgdGhpcy5wYXJlbnRzID0gbmV3IEFycmF5KHNpemUpXG4gICAgdGhpcy5uZXh0U2libGluZ3MgPSBuZXcgQXJyYXkoc2l6ZSlcbiAgICB0aGlzLmVscy5mb3JFYWNoKChlbCwgaWR4KSA9PiB7XG4gICAgICB0aGlzLm5leHRTaWJsaW5nc1tpZHhdID0gZWwuZWwoKS5uZXh0RWxlbWVudFNpYmxpbmcgXG4gICAgICB0aGlzLnBhcmVudHNbaWR4XSA9IGVsLmVsKCkucGFyZW50RWxlbWVudFxuICAgIH0pXG4gICAgdGhpcy5leGVjdXRlKClcbiAgfVxuICBzdGF0aWMgbmFtZSgpIHtcbiAgICByZXR1cm4gJ3JlbW92ZVNlbGVjdGVkRWxlbWVudHMnXG4gIH1cbiAgZXhlY3V0ZSgpIHsgLy8gcHJpdmF0ZVxuICAgIHRoaXMuZWxzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpdGVtLnJlbW92ZSgpXG4gICAgfSlcbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5jbGVhcigpXG4gIH1cbiAgcmVkbygpIHtcbiAgICB0aGlzLmV4ZWN1dGUoKVxuICB9XG4gIHVuZG8oKSB7XG4gICAgZm9yIChsZXQgaWR4ID0gdGhpcy5lbHMubGVuZ3RoIC0gMTsgaWR4ID49IDA7IGlkeC0tKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbHNbaWR4XVxuICAgICAgY29uc3QgZWwgPSBlbGVtZW50LmVsKClcbiAgICAgIGlmICh0aGlzLm5leHRTaWJsaW5nc1tpZHhdKSB7XG4gICAgICAgIHRoaXMucGFyZW50c1tpZHhdLmluc2VydEJlZm9yZShlbCwgdGhpcy5uZXh0U2libGluZ3NbaWR4XSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFyZW50c1tpZHhdLmFwcGVuZENoaWxkKGVsKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVscyh0aGlzLmVscylcbiAgfVxufVxuXG4vKipcbiAqIERNb3ZlXG4gKiBcbiAqIGRtb3ZlIGVsZW1lbnRzXG4gKi9cbmV4cG9ydCBjbGFzcyBETW92ZSBleHRlbmRzIEJhc2VDb21tYW5kIHtcbiAgY29uc3RydWN0b3IoZWRpdG9yLCBlbHMsIGR4LCBkeSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxuICAgIHRoaXMuZHggPSBkeFxuICAgIHRoaXMuZHkgPSBkeVxuICAgIHRoaXMuZWxzID0gZWxzXG5cbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLmRtb3ZlKHRoaXMuZHgsIHRoaXMuZHkpXG4gICAgfSlcbiAgfVxuICBzdGF0aWMgbmFtZSgpIHtcbiAgICByZXR1cm4gJ2Rtb3ZlJ1xuICB9XG4gIHJlZG8oKSB7XG4gICAgdGhpcy5lbHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5kbW92ZSh0aGlzLmR4LCB0aGlzLmR5KVxuICAgIH0pXG4gIH1cbiAgdW5kbygpIHtcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLmRtb3ZlKC10aGlzLmR4LCAtdGhpcy5keSlcbiAgICB9KVxuICB9XG4gIGFmdGVyUmVkbygpIHtcbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHModGhpcy5lbHMpXG4gIH1cbiAgYWZ0ZXJVbmRvKCkge1xuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVscyh0aGlzLmVscylcbiAgfVxufVxuXG4vKipcbiAqIHNldEF0dHJcbiAqL1xuZXhwb3J0IGNsYXNzIFNldEF0dHIgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgZWxzLCBhdHRyTmFtZSwgdmFsKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGVscykpIGVscyA9IFtlbHNdXG4gICAgdGhpcy5lbHMgPSBlbHNcbiAgICB0aGlzLmF0dHJOYW1lID0gYXR0ck5hbWVcbiAgICB0aGlzLmJlZm9yZVZhbCA9IHRoaXMuZWxzLm1hcChlbCA9PiBlbC5nZXRBdHRyKGF0dHJOYW1lKSlcbiAgICB0aGlzLmFmdGVyVmFsID0gdmFsXG5cbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLnNldEF0dHIoYXR0ck5hbWUsIHZhbClcbiAgICB9KVxuICB9XG4gIHN0YXRpYyBuYW1lKCkge1xuICAgIHJldHVybiAnc2V0QXR0cidcbiAgfVxuICByZWRvKCkge1xuICAgIHRoaXMuZWxzLmZvckVhY2goZWwgPT4ge1xuICAgICAgZWwuc2V0QXR0cih0aGlzLmF0dHJOYW1lLCB0aGlzLmFmdGVyVmFsKVxuICAgIH0pXG4gIH1cbiAgdW5kbygpIHtcbiAgICB0aGlzLmVscy5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgICAgZWwuc2V0QXR0cih0aGlzLmF0dHJOYW1lLCB0aGlzLmJlZm9yZVZhbFtpXSlcbiAgICB9KVxuICB9XG59IiwiLy8g5bi46YePXG5cbmNvbnN0IE5TID0ge1xuICBIVE1MOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsXG4gIE1BVEg6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MJyxcbiAgU0U6ICdodHRwOi8vc3ZnLWVkaXQuZ29vZ2xlY29kZS5jb20nLFxuICBTVkc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gIFhMSU5LOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsXG4gIFhNTDogJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZScsXG4gIFhNTE5TOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nIC8vIHNlZSBodHRwOi8vd3d3LnczLm9yZy9UUi9SRUMteG1sLW5hbWVzLyN4bWxSZXNlcnZlZFxufTtcblxuZXhwb3J0IHtcbiAgTlMsXG59IFxuXG5cblxuIiwiZXhwb3J0IGNvbnN0IGlzRGVidWcgPSB0cnVlXG4iLCJpbXBvcnQgeyBBY3RpdmVkRWxzTWFuYWdlciB9IGZyb20gXCIuL2FjdGl2ZWRFbHNNYW5hZ2VyXCJcbmltcG9ydCB7IEVkaXRvckV2ZW50Q29udGV4dCB9IGZyb20gXCIuL2VkaXRvckV2ZW50Q29udGV4dFwiXG5pbXBvcnQgeyBIdWRNYW5hZ2VyIH0gZnJvbSBcIi4vbGF5ZXIvaHVkTWFuYWdlclwiXG5pbXBvcnQgeyBTaG9ydGN1dCB9IGZyb20gXCIuL3Nob3J0Y3V0XCJcblxuY2xhc3MgRWRpdG9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zZXR0aW5nID0gbnVsbFxuICAgIHRoaXMuY29tbWFuZE1hbmFnZXIgPSBudWxsXG4gICAgdGhpcy56b29tTWFuYWdlciA9IG51bGxcbiAgICB0aGlzLmFjdGl2ZWRFbHNNYW5hZ2VyID0gbmV3IEFjdGl2ZWRFbHNNYW5hZ2VyKHRoaXMpXG4gICAgdGhpcy5zaG9ydGN1dCA9IG5ldyBTaG9ydGN1dCh0aGlzKVxuXG4gICAgLy8gY29uc3QgY29udGVudFdpZHRoID0gNDAwXG4gICAgLy8gY29uc3QgY29udGVudEhlaWdodCA9IDMwMFxuICAgIC8vIGNvbnN0IHN0YWdlV2lkdGggPSAxMDAwIC8vIOato+WcqOe6oOe7k+WRveWQjVxuICAgIC8vIGNvbnN0IHN0YWdlSGVpZ2h0ID0gNjAwXG4gICAgY29uc3Qgdmlld3BvcnRXaWR0aCA9IDgwMFxuICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0ID0gNTUwXG5cbiAgICBjb25zdCB2aWV3cG9ydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgdmlld3BvcnQuaWQgPSAndmlld3BvcnQnXG4gICAgdmlld3BvcnQuc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCAjMDAwJ1xuICAgIHZpZXdwb3J0LnN0eWxlLndpZHRoID0gdmlld3BvcnRXaWR0aCArICdweCdcbiAgICB2aWV3cG9ydC5zdHlsZS5oZWlnaHQgPSB2aWV3cG9ydEhlaWdodCArICdweCdcbiAgICB0aGlzLnZpZXdwb3J0ID0gdmlld3BvcnRcbiAgICBcbiAgICBjb25zdCBzdmdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHN2Z0NvbnRhaW5lci5pZCA9ICdzdmctY29udGFpbmVyJ1xuICAgIHN2Z0NvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2RkZCdcbiAgICBzdmdDb250YWluZXIuc3R5bGUud2lkdGggPSB2aWV3cG9ydFdpZHRoICsgJ3B4J1xuICAgIHN2Z0NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSB2aWV3cG9ydEhlaWdodCArICdweCdcbiAgICBzdmdDb250YWluZXIuc3R5bGUub3ZlcmZsb3cgPSAnc2Nyb2xsJ1xuICAgIHRoaXMuc3ZnQ29udGFpbmVyID0gc3ZnQ29udGFpbmVyXG5cbiAgICBjb25zdCBzdmdSb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKVxuICAgIHN2Z1Jvb3QuaWQgPSAnc3ZnLXJvb3QnXG4gICAgc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgMTAwMClcbiAgICBzdmdSb290LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgNjAwKVxuICAgIHN2Z1Jvb3Quc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAxMDAwIDYwMCcpXG4gICAgdGhpcy5zdmdSb290ID0gc3ZnUm9vdFxuXG4gICAgY29uc3Qgc3ZnU3RhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpXG4gICAgc3ZnU3RhZ2UuaWQgPSAnc3ZnLXN0YWdlJ1xuICAgIHN2Z1N0YWdlLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCA0MDApXG4gICAgc3ZnU3RhZ2Uuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAzMDApXG4gICAgc3ZnU3RhZ2Uuc2V0QXR0cmlidXRlKCd4JywgMzAwKVxuICAgIHN2Z1N0YWdlLnNldEF0dHJpYnV0ZSgneScsIDE1MClcbiAgICBzdmdTdGFnZS5zdHlsZS5vdmVyZmxvdyA9ICd2aXNpYmxlJ1xuICAgIHRoaXMuc3ZnU3RhZ2UgPSBzdmdTdGFnZVxuXG4gICAgY29uc3Qgc3ZnQmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2cnKVxuICAgIHN2Z0JnLmlkID0gJ2JhY2tncm91bmQnXG4gICAgLy8gc3ZnQmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsIDQwMClcbiAgICAvLyBzdmdCZy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDMwMClcbiAgICBzdmdCZy5zZXRBdHRyaWJ1dGUoJ3gnLCAwKVxuICAgIHN2Z0JnLnNldEF0dHJpYnV0ZSgneScsIDApXG5cbiAgICBjb25zdCBiZ1JlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3JlY3QnKVxuICAgIGJnUmVjdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKVxuICAgIGJnUmVjdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMDAlJylcbiAgICBiZ1JlY3Quc2V0QXR0cmlidXRlKCdmaWxsJywgJyNmZmYnKVxuXG4gICAgY29uc3Qgc3ZnQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnZycpXG4gICAgc3ZnQ29udGVudC5pZCA9ICdjb250ZW50J1xuICAgIC8vIHN2Z0NvbnRlbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsIDQwMClcbiAgICAvLyBzdmdDb250ZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgMzAwKVxuICAgIHN2Z0NvbnRlbnQuc2V0QXR0cmlidXRlKCd4JywgMClcbiAgICBzdmdDb250ZW50LnNldEF0dHJpYnV0ZSgneScsIDApXG4gICAgdGhpcy5zdmdDb250ZW50ID0gc3ZnQ29udGVudFxuXG4gICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2cnKVxuICAgIGxheWVyLmlkID0gJ2xheWVyLTEnXG4gICAgdGhpcy5jdXJyZW50TGF5ZXIgPSBsYXllclxuXG4gICAgdmlld3BvcnQuYXBwZW5kQ2hpbGQoc3ZnQ29udGFpbmVyKVxuICAgIHN2Z0NvbnRhaW5lci5hcHBlbmRDaGlsZChzdmdSb290KVxuICAgIHN2Z1Jvb3QuYXBwZW5kQ2hpbGQoc3ZnU3RhZ2UpXG5cbiAgICBzdmdTdGFnZS5hcHBlbmRDaGlsZChzdmdCZylcbiAgICBzdmdCZy5hcHBlbmRDaGlsZChiZ1JlY3QpXG4gICAgc3ZnU3RhZ2UuYXBwZW5kQ2hpbGQoc3ZnQ29udGVudClcbiAgICBzdmdDb250ZW50LmFwcGVuZENoaWxkKGxheWVyKVxuXG5cbiAgICB0aGlzLmh1ZE1hbmFnZXIgPSBuZXcgSHVkTWFuYWdlcigpXG4gICAgdGhpcy5odWRNYW5hZ2VyLm1vdW50KHN2Z1N0YWdlKVxuXG4gICAgLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWV3cG9ydClcbiAgfVxuICBtb3VudChzZWxlY3Rvcikge1xuICAgIGNvbnN0IG1vdW50Tm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgbW91bnROb2RlLmFwcGVuZENoaWxkKHRoaXMudmlld3BvcnQpXG4gIH1cbiAgZ2V0Q3VycmVudExheWVyKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRMYXllclxuICB9XG5cbiAgc2V0VG9vbE1hbmFnZXIodG9vbE1hbmFnZXIpIHtcbiAgICB0aGlzLnRvb2xNYW5hZ2VyID0gdG9vbE1hbmFnZXJcbiAgfVxuICAvLyB0b29sIHJlbGF0aXZlZCBtZXRob2RzXG4gIHNldEN1cnJlbnRUb29sKG5hbWUpIHtcbiAgICB0aGlzLnRvb2xNYW5hZ2VyLnNldEN1cnJlbnRUb29sKG5hbWUpXG4gIH1cbiAgcmVnaXN0ZXJUb29sKHRvb2wpIHtcbiAgICB0aGlzLnRvb2xNYW5hZ2VyLnJlZ2lzdGVyVG9vbCh0b29sKVxuICB9XG4gIHNldFNldHRpbmcoc2V0dGluZykge1xuICAgIHRoaXMuc2V0dGluZyA9IHNldHRpbmdcbiAgfVxuXG4gIC8vIOWRveS7pOebuOWFs1xuICBzZXRDb21tYW5kTWFuYWdlcihjb21tYW5kTWFuYWdlcikge1xuICAgIHRoaXMuY29tbWFuZE1hbmFnZXIgPSBjb21tYW5kTWFuYWdlclxuICB9XG4gIGV4ZWN1dGVDb21tYW5kKG5hbWUsIC4uLnBhcmFtcykge1xuICAgIGlmIChuYW1lID09ICd1bmRvJykge1xuICAgICAgdGhpcy5jb21tYW5kTWFuYWdlci51bmRvKClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAobmFtZSA9PSAncmVkbycpIHtcbiAgICAgIHRoaXMuY29tbWFuZE1hbmFnZXIucmVkbygpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5jb21tYW5kTWFuYWdlci5leGVjdXRlKG5hbWUsIC4uLnBhcmFtcylcbiAgfVxuXG4gIC8vIHpvb21cbiAgc2V0Wm9vbU1hbmFnZXIoem9vbU1hbmFnZXIpIHtcbiAgICB6b29tTWFuYWdlci5zZXRFZGl0b3IodGhpcylcbiAgICB0aGlzLnpvb21NYW5hZ2VyID0gem9vbU1hbmFnZXJcbiAgfVxuICBnZXRab29tKCkgeyAvLyDlsIHoo4VcbiAgICByZXR1cm4gdGhpcy56b29tTWFuYWdlci5nZXRab29tKClcbiAgfVxuXG4gIGdldFNjcm9sbCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogdGhpcy5zdmdDb250YWluZXIuc2Nyb2xsTGVmdCxcbiAgICAgIHk6IHRoaXMuc3ZnQ29udGFpbmVyLnNjcm9sbFRvcCxcbiAgICB9XG4gIH1cbiAgc2V0U2Nyb2xsKHgsIHkpIHtcbiAgICB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxMZWZ0ID0geFxuICAgIHRoaXMuc3ZnQ29udGFpbmVyLnNjcm9sbFRvcCA9IHlcbiAgfVxuICBnZXRDb250ZW50T2Zmc2V0KCkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiB0aGlzLnN2Z1N0YWdlLmdldEF0dHJpYnV0ZSgneCcpLFxuICAgICAgeTogdGhpcy5zdmdTdGFnZS5nZXRBdHRyaWJ1dGUoJ3knKSxcbiAgICB9XG4gIH1cblxuICBpc0NvbnRlbnRFbGVtZW50KGVsKSB7XG4gICAgd2hpbGUgKGVsKSB7XG4gICAgICBpZiAoZWwucGFyZW50RWxlbWVudCA9PSB0aGlzLnN2Z0NvbnRlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIGlmIChlbC5wYXJlbnRFbGVtZW50ID09IHRoaXMuc3ZnUm9vdCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudFxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFZGl0b3JcbiIsIlxuLyoqXG4gKiBjb250ZXh0IGNsYXNzXG4gKiBcbiAqIHVzZWQgZm9yIHRvb2wgZXZlbnRcbiAqL1xuXG5leHBvcnQgY2xhc3MgRWRpdG9yRXZlbnRDb250ZXh0IHtcbiAgY29uc3RydWN0b3IoZWRpdG9yLCBlKSB7XG4gICAgdGhpcy5tb3VzZVByZXNzZWQgPSBmYWxzZVxuICAgIHRoaXMub3JpZ2luRXZlbnQgPSBlXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgICB0aGlzLmlzRW5kSW5zaWRlID0gZmFsc2VcblxuICAgIHRoaXMuc3RhcnRYID0gMFxuICAgIHRoaXMuc3RhcnRZID0gMFxuXG4gICAgdGhpcy5vZmZzZXRYID0gMFxuICAgIHRoaXMub2Zmc2V0WSA9IDBcblxuICAgIHRoaXMuc3RhcnRDbGllbnRYID0gMCAvLyB1c2VkIHRvIGNhbGMgZHggYW5kIGR5LlxuICAgIHRoaXMuc3RhcnRDbGllbnRZID0gMFxuICAgIHRoaXMuZHggPSAwXG4gICAgdGhpcy5keSA9IDBcblxuICAgIHRoaXMuc2V0U3RhcnRQb3MoKVxuICB9XG4gIHNldE9yaWdpbkV2ZW50KGUpIHtcbiAgICB0aGlzLm9yaWdpbkV2ZW50ID0gZVxuICB9XG4gIHNldFN0YXJ0UG9zKCkge1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5nZXRQb3MoKVxuXG4gICAgdGhpcy5zdGFydFggPSB4XG4gICAgdGhpcy5zdGFydFkgPSB5XG5cbiAgICB0aGlzLnN0YXJ0Q2xpZW50WCA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WFxuICAgIHRoaXMuc3RhcnRDbGllbnRZID0gdGhpcy5vcmlnaW5FdmVudC5jbGllbnRZXG4gIH1cbiAgcmVsZWFzZU1vdXNlKCkge1xuICAgIHRoaXMubW91c2VQcmVzc2VkID0gZmFsc2VcbiAgfVxuICBwcmVzc01vdXNlKCkge1xuICAgIHRoaXMubW91c2VQcmVzc2VkID0gdHJ1ZVxuICB9XG4gIGdldFBvcygpIHtcbiAgICBjb25zdCB6b29tID0gdGhpcy5lZGl0b3IuZ2V0Wm9vbSgpXG4gICAgY29uc3Qge3gsIHl9ID0gdGhpcy5lZGl0b3IuZ2V0Q29udGVudE9mZnNldCgpXG4gICAgcmV0dXJuIHsgXG4gICAgICB4OiB0aGlzLm9yaWdpbkV2ZW50Lm9mZnNldFggLyB6b29tIC0geCwgXG4gICAgICB5OiB0aGlzLm9yaWdpbkV2ZW50Lm9mZnNldFkgLyB6b29tIC0geSxcbiAgICB9XG4gIH1cbiAgZ2V0U3RhcnRQb3MoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHRoaXMuc3RhcnRYLFxuICAgICAgeTogdGhpcy5zdGFydFksXG4gICAgfVxuICB9XG4gIC8vIHdpdGhvdXQgY2FsYyB3aXRoIHpvb20gdmFsdWVcbiAgZ2V0RGlmZlBvcygpIHtcbiAgICBjb25zdCB4ID0gdGhpcy5vcmlnaW5FdmVudC5jbGllbnRYIC0gdGhpcy5zdGFydENsaWVudFhcbiAgICBjb25zdCB5ID0gdGhpcy5vcmlnaW5FdmVudC5jbGllbnRZIC0gdGhpcy5zdGFydENsaWVudFlcbiAgICByZXR1cm4geyB4LCB5IH1cbiAgfVxuXG59IiwiXG4vKipcbiAqIOWvuSBTVkcg5YWD57Sg55qE566A5Y2V5bCB6KOFXG4gKi9cblxuZXhwb3J0IGNsYXNzIEZFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5lbF8gPSBudWxsXG4gIH1cbiAgZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxfXG4gIH1cbiAgc2V0QXR0cihwcm9wLCB2YWwpIHtcbiAgICByZXR1cm4gdGhpcy5lbF8uc2V0QXR0cmlidXRlKHByb3AsIHZhbClcbiAgfVxuICBnZXRBdHRyKHByb3ApIHtcbiAgICByZXR1cm4gdGhpcy5lbF8uZ2V0QXR0cmlidXRlKHByb3ApXG4gIH1cbiAgZ2V0QkJveCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbF8uZ2V0QkJveCgpXG4gIH1cbiAgcmVtb3ZlKCkge1xuICAgIHJldHVybiB0aGlzLmVsXy5yZW1vdmUoKVxuICB9XG4gfSIsIlxuZXhwb3J0IGNsYXNzIEJveCB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgpIHtcbiAgICBpZiAodHlwZW9mIHggPT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMueCA9IHgueFxuICAgICAgdGhpcy55ID0geC55XG4gICAgICB0aGlzLncgPSB4LndpZHRoXG4gICAgICB0aGlzLmggPSB4LmhlaWdodFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnggPSB4XG4gICAgICB0aGlzLnkgPSB5XG4gICAgICB0aGlzLncgPSB3XG4gICAgICB0aGlzLmggPSBoXG4gICAgfVxuXG4gICAgdGhpcy53aWR0aCA9IHRoaXMud1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5oXG4gICAgdGhpcy54MiA9IHRoaXMueCArIHRoaXMud1xuICAgIHRoaXMueTIgPSB0aGlzLnkgKyB0aGlzLmhcbiAgfVxuICBjb250YWlucyhvdGhlckJveCkge1xuICAgIHJldHVybiB0aGlzLnggPD0gb3RoZXJCb3gueCAmJiB0aGlzLnkgPD0gb3RoZXJCb3gueSAmJlxuICAgICAgdGhpcy54MiA+PSBvdGhlckJveC54ICsgb3RoZXJCb3gud2lkdGggJiYgdGhpcy55MiA+PSBvdGhlckJveC55ICsgb3RoZXJCb3guaGVpZ2h0XG4gIH1cblxuICBtZXJnZShvdGhlckJveCkge1xuICAgIGNvbnN0IHggPSBNYXRoLm1pbih0aGlzLngsIG90aGVyQm94LngpXG4gICAgY29uc3QgeSA9IE1hdGgubWluKHRoaXMueSwgb3RoZXJCb3gueSlcbiAgICBjb25zdCB4MiA9IE1hdGgubWF4KHRoaXMueDIsIG90aGVyQm94LngyKVxuICAgIGNvbnN0IHkyID0gTWF0aC5tYXgodGhpcy55Miwgb3RoZXJCb3gueTIpXG4gICAgY29uc3QgdyA9IHgyIC0geFxuICAgIGNvbnN0IGggPSB5MiAtIHlcbiAgICByZXR1cm4gbmV3IEJveCh4LCB5LCB3LCBoKVxuICB9XG59IiwiaW1wb3J0IHsgQm94IH0gZnJvbSBcIi4vYm94XCJcbmltcG9ydCB7IFJlY3QgfSBmcm9tIFwiLi9yZWN0XCJcblxuXG4vKipcbiAqIEZTVkdcbiAqIFxuICogc2ltcGxlIFNWR0VsZW1lbnQgZW5jYXBzdWxhdGlvblxuICovXG5mdW5jdGlvbiBjcmVhdGUoZWwpIHtcbiAgY29uc3QgdGFnTmFtZSA9IGVsLnRhZ05hbWVcbiAgaWYgKHRhZ05hbWUgPT09ICdyZWN0Jykge1xuICAgIHJldHVybiBuZXcgRlNWRy5SZWN0KGVsKVxuICB9XG4gIGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ2FuIG5vdCBjcmVhdCAke3RhZ05hbWV9IGluc3RhbmNlLCBubyBtYXRjaCBjbGFzcy5gKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBGU1ZHID0ge1xuICBjcmVhdGUsXG4gIFJlY3QsXG4gIEJveCxcbn0iLCJcbi8qKlxuICog5a+5IHJlY3Qg5YWD57Sg55qE566A5Y2V5bCB6KOFXG4gKi9cblxuaW1wb3J0IHsgTlMgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCJcbmltcG9ydCB7IEZFbGVtZW50IH0gZnJvbSBcIi4vYmFzZUVsZW1lbnRcIlxuXG5leHBvcnQgY2xhc3MgUmVjdCBleHRlbmRzIEZFbGVtZW50IHtcbiAgLy8gY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyKTtcbiAgLy8gY29uc3RydWN0b3IoZWw6IFNWR0VsZW1lbnQpO1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB3LCBoKSB7XG4gICAgc3VwZXIoKVxuICAgIGlmICh0eXBlb2YgeCA9PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5lbF8gPSB4XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxfID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ3JlY3QnKVxuICAgICAgdGhpcy5zZXRBdHRyKCd4JywgeClcbiAgICAgIHRoaXMuc2V0QXR0cigneScsIHkpXG4gICAgICB0aGlzLnNldEF0dHIoJ3dpZHRoJywgdylcbiAgICAgIHRoaXMuc2V0QXR0cignaGVpZ2h0JywgaClcbiAgICB9XG4gIH1cbiAgZ2V0UG9zKCkge1xuICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cigneCcpKVxuICAgIGNvbnN0IHkgPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cigneScpKVxuICAgIHJldHVybiB7IHgsIHkgfVxuICB9XG4gIGRtb3ZlKGR4LCBkeSkge1xuICAgIGNvbnN0IHBvcyA9IHRoaXMuZ2V0UG9zKClcbiAgICB0aGlzLnNldEF0dHIoJ3gnLCBwb3MueCArIGR4KVxuICAgIHRoaXMuc2V0QXR0cigneScsIHBvcy55ICsgZHkpXG4gIH1cbn0iLCIvKipcbiAqIGd1aWRlIGxpbmUgbGF5ZXJcbiAqL1xuXG5pbXBvcnQgeyBPdXRsaW5lSHVkIH0gZnJvbSBcIi4vb3V0bGluZUh1ZFwiO1xuaW1wb3J0IHsgU2VsZWN0QXJlYSB9IGZyb20gXCIuL3NlbGVjdEFyZWFcIjtcbmNvbnN0IHsgTlMgfSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XG5cbmV4cG9ydCBjbGFzcyBIdWRNYW5hZ2Vye1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdnJylcbiAgICB0aGlzLmNvbnRhaW5lci5pZCA9ICdodWRzJ1xuXG4gICAgdGhpcy5zZWxlY3RBcmVhID0gbmV3IFNlbGVjdEFyZWEodGhpcy5jb250YWluZXIpXG4gICAgdGhpcy5vdXRsaW5lSHVkID0gbmV3IE91dGxpbmVIdWQodGhpcy5jb250YWluZXIpXG4gIH1cbiAgbW91bnQoZWwpIHtcbiAgICBlbC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcilcbiAgfVxufVxuXG4iLCJcblxuICBcbmNvbnN0IHsgTlMgfSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XG5cbi8qKlxuICogPHJlY3Q+IG91dGxpbmVcbiAqL1xuZXhwb3J0IGNsYXNzIE91dGxpbmVIdWQge1xuICBjb25zdHJ1Y3RvcihwYXJlbnQpIHtcbiAgICB0aGlzLnggPSAwXG4gICAgdGhpcy55ID0gMFxuICAgIHRoaXMudyA9IDBcbiAgICB0aGlzLmggPSAwXG5cbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdnJylcbiAgICB0aGlzLmNvbnRhaW5lci5pZCA9ICdvdXRsaW5lLWh1ZCdcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpXG5cbiAgICB0aGlzLm91dGxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAncGF0aCcpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJylcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAnI2YwNCcpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgndmVjdG9yLWVmZmVjdCcsICdub24tc2NhbGluZy1zdHJva2UnKVxuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5vdXRsaW5lKVxuICB9XG4gIGNsZWFyKCkge1xuICAgIC8vIHBhcmVudC5pbm5lckhUTUwgPSAnJ1xuICAgIHRoaXMub3V0bGluZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIH1cbiAgZHJhd1JlY3QoeCwgeSwgdywgaCkge1xuICAgIHRoaXMueCA9IHhcbiAgICB0aGlzLnkgPSB5XG4gICAgdGhpcy53ID0gd1xuICAgIHRoaXMuaCA9IGhcblxuICAgIC8vIHdoeSBkb24ndCBJIHVzZSByZWN0LCBqdXN0IHNvbHZlIHRoZSBjb25kaXRpb24gd2hlbiB3aWR0aCBvciBoZWlnaHQgaXMgMCB0aGUgb3V0bGluZSBpcyBkaXNhcHBlclxuICAgIGNvbnN0IGQgPSBgTSAke3h9ICR7eX0gTCAke3grd30gJHt5fSBMICR7eCt3fSAke3kraH0gTCAke3h9ICR7eStofSBaYFxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2QnLCBkKVxuICAgIHRoaXMub3V0bGluZS5zdHlsZS5kaXNwbGF5ID0gJydcbiAgfVxuICBnZXRXaWR0aCgpIHsgcmV0dXJuIHRoaXMudyB9XG4gIGdldEhlaWdodCgpIHsgcmV0dXJuIHRoaXMuaCB9XG4gIGdldFgoKSB7IHJldHVybiB0aGlzLnggfVxuICBnZXRZKCkgeyByZXR1cm4gdGhpcy55IH1cbn0iLCJcbmNvbnN0IHsgTlMgfSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XG5cbi8qKlxuICogc2VsZWN0IGFyZWFcbiAqL1xuZXhwb3J0IGNsYXNzIFNlbGVjdEFyZWEge1xuICBjb25zdHJ1Y3RvcihwYXJlbnQpIHtcbiAgICB0aGlzLnggPSAwXG4gICAgdGhpcy55ID0gMFxuICAgIHRoaXMudyA9IDBcbiAgICB0aGlzLmggPSAwXG5cbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdnJylcbiAgICB0aGlzLmNvbnRhaW5lci5pZCA9ICdzZWxlY3QtYXJlYSdcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpXG5cbiAgICB0aGlzLm91dGxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAncGF0aCcpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJylcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAnIzA1NCcpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgndmVjdG9yLWVmZmVjdCcsICdub24tc2NhbGluZy1zdHJva2UnKVxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1kYXNoYXJyYXknLCAnNHB4JylcblxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMub3V0bGluZSlcbiAgfVxuICBjbGVhcigpIHtcbiAgICAvLyBwYXJlbnQuaW5uZXJIVE1MID0gJydcbiAgICB0aGlzLnggPSB0aGlzLnkgPSB0aGlzLncgPSB0aGlzLmggPSAwXG4gICAgdGhpcy5vdXRsaW5lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgfVxuICBkcmF3UmVjdCh4LCB5LCB3LCBoKSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLncgPSB3XG4gICAgdGhpcy5oID0gaFxuXG4gICAgLy8gd2h5IGRvbid0IEkgdXNlIHJlY3QsIGp1c3Qgc29sdmUgdGhlIGNvbmRpdGlvbiB3aGVuIHdpZHRoIG9yIGhlaWdodCBpcyAwIHRoZSBvdXRsaW5lIGlzIGRpc2FwcGVyXG4gICAgY29uc3QgZCA9IGBNICR7eH0gJHt5fSBMICR7eCt3fSAke3l9IEwgJHt4K3d9ICR7eStofSBMICR7eH0gJHt5K2h9IFpgXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZCcsIGQpXG5cbiAgICAvKiB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd4JywgeClcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd5JywgeSlcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHcpXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaCkgKi9cbiAgICB0aGlzLm91dGxpbmUuc3R5bGUuZGlzcGxheSA9ICcnXG4gIH1cbiAgZ2V0V2lkdGgoKSB7IHJldHVybiB0aGlzLncgfVxuICBnZXRIZWlnaHQoKSB7IHJldHVybiB0aGlzLmggfVxuICBnZXRYKCkgeyByZXR1cm4gdGhpcy54IH1cbiAgZ2V0WSgpIHsgcmV0dXJuIHRoaXMueSB9XG4gIGdldEJveCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogdGhpcy54LFxuICAgICAgeTogdGhpcy55LFxuICAgICAgd2lkdGg6IHRoaXMudyxcbiAgICAgIGhlaWdodDogdGhpcy5oLFxuICAgICAgdzogdGhpcy53LFxuICAgICAgaDogdGhpcy5oLFxuICAgIH1cbiAgfVxufSIsIlxuaW1wb3J0IHsgZ2V0Qm94QnkycG9pbnRzIH0gZnJvbSBcIi4uL3V0aWwvbWF0aFwiXG5cbmNsYXNzIEFkZFJlY3Qge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcbiAgfVxuICBuYW1lKCkge1xuICAgIHJldHVybiAnYWRkUmVjdCdcbiAgfVxuICBzZXRFZGl0b3IoZWRpdG9yKSB7IC8vIOS+nei1luazqOWFpVxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gIH1cbiAgc3RhcnQoY3R4KSB7fVxuICBtb3ZlKGN0eCkge1xuICAgIGNvbnN0IHsgeDogZW5kWCwgeTogZW5kWSB9ID0gY3R4LmdldFBvcygpXG4gICAgY29uc3QgeyB4OiBzdGFydFgsIHk6IHN0YXJ0WSB9ID0gY3R4LmdldFN0YXJ0UG9zKClcbiAgICBjb25zdCB7IHgsIHksIHcsIGggfSA9IGdldEJveEJ5MnBvaW50cyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSlcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuZHJhd1JlY3QoeCwgeSwgdywgaClcbiAgfVxuICBlbmQoY3R4KSB7XG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lSHVkLmNsZWFyKClcblxuICAgIGNvbnN0IHsgeDogZW5kWCwgeTogZW5kWSB9ID0gY3R4LmdldFBvcygpXG4gICAgY29uc3QgeyB4OiBzdGFydFgsIHk6IHN0YXJ0WSB9ID0gY3R4LmdldFN0YXJ0UG9zKClcbiAgICBjb25zdCB7IHgsIHksIHcsIGggfSA9IGdldEJveEJ5MnBvaW50cyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSlcbiAgICBpZiAodyA8IDIgJiYgaCA8IDIpIHtcbiAgICAgIC8vIFRPRE86IG9wZW4gYSBkaWFsb2cgdG8gaW5wdXQgd2lkdGggYW5kIGhlaWdodFxuICAgICAgY29uc29sZS5sb2coJ3dpZHRoIGFuZCBoZWlnaHQgYm90aCBsZXNzIGVxdWFsIHRvIDLvvIxkcmF3aW5nIG5vdGhpbmcnKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdhZGRSZWN0JywgeCwgeSwgdywgaClcbiAgfVxuICAvLyBtb3VzZWRvd24gb3V0c2lkZSB2aWV3cG9ydFxuICBlbmRPdXRzaWRlKCkge1xuICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIub3V0bGluZUh1ZC5jbGVhcigpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWRkUmVjdCIsIlxuZXhwb3J0IGNsYXNzIERyYWdDYW52YXMge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnN0YXJ0T2Zmc2V0WCA9IDBcbiAgICB0aGlzLnN0YXJ0T2Zmc2V0WSA9IDBcbiAgfVxuICBuYW1lKCkge1xuICAgIHJldHVybiAnZHJhZ0NhbnZhcydcbiAgfVxuICBzZXRFZGl0b3IoZWRpdG9yKSB7IC8vIOS+nei1luazqOWFpVxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gIH1cbiAgYmVmb3JlQWN0aXZlKCkge1xuICAgIC8vIGRvIHNvbWV0aGluZyBiZWZvcmUgc3dpdGNoIHRvIGN1cnJlbnQgdG9vbFxuICB9XG4gIHN0YXJ0KGN0eCkge1xuICAgIGNvbnN0IHNjcm9sbCA9IHRoaXMuZWRpdG9yLmdldFNjcm9sbCgpXG4gICAgdGhpcy5zdGFydE9mZnNldFggPSBzY3JvbGwueFxuICAgIHRoaXMuc3RhcnRPZmZzZXRZID0gc2Nyb2xsLnlcbiAgfVxuICBtb3ZlKGN0eCkge1xuICAgIGNvbnN0IHpvb20gPSB0aGlzLmVkaXRvci5nZXRab29tKClcbiAgICBjb25zdCB7IHg6IGR4LCB5OiBkeSB9ID0gY3R4LmdldERpZmZQb3MoKVxuICAgIHRoaXMuZWRpdG9yLnNldFNjcm9sbCh0aGlzLnN0YXJ0T2Zmc2V0WCAtIGR4LCB0aGlzLnN0YXJ0T2Zmc2V0WSAtIGR5KVxuICB9XG4gIGVuZCgpIHt9XG4gIGVuZE91dHNpZGUoKSB7fVxufVxuIiwiaW1wb3J0IHsgRlNWRyB9IGZyb20gXCIuLi9lbGVtZW50XCJcbmltcG9ydCB7IGdldEJveEJ5MnBvaW50cyB9IGZyb20gXCIuLi91dGlsL21hdGhcIlxuXG4vKipcbiAqIHNlbGVjdFxuICogXG4gKiDmraTmqKHlnZfpnZ7luLjlpI3mnYJcbiAqIFxuICogMS4g6byg5qCH5oyJ5LiL5pe277yM6YCJ5Lit5Y2V5Liq5YWD57SgXG4gKiAyLiDpvKDmoIfmjInkuIvkuLrnqbrvvIzmi5bmi73ml7bkuqfnlJ/pgInkuK3moYbvvIzlj6/ku6XpgInmi6nlpJrkuKrlhYPntKBcbiAqIDMuIOmAieS4reWNleS4qu+8iOaIlumAieWMuumAieS4reWkmuS4qu+8iSDnvKnmlL4g562J5o6n5Yi254K577yM5ouW5ou95pS55Y+Y5a696auYXG4gKiAzLiDliIfmlq3liIDov5nkuKrlt6Xlhbfml7bvvIzmv4DmtLvnmoTlhYPntKDov5vlhaXooqvpgInkuK3nirbmgIHvvIjova7lu5Pnur8r5o6n5Yi254K577yJ44CCXG4gKiA0LiDpgInljLrlkozlhYPntKDnm7jkuqTnmoTliKTlrppcbiAqIDUuIOa/gOa0u+WFg+e0oOWmguS9leS/neWtmO+8jOS/neWtmOWIsOWTqumHjFxuICovXG5leHBvcnQgY2xhc3MgU2VsZWN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBudWxsXG4gICAgdGhpcy5zZWxlY3RlZEVscyA9IFtdXG5cbiAgICB0aGlzLm91dGxpbmVTdGFydFggPSAwXG4gICAgdGhpcy5vdXRsaW5lU3RhcnRZID0gMFxuICB9XG4gIG5hbWUoKSB7XG4gICAgcmV0dXJuICdzZWxlY3QnXG4gIH1cbiAgc2V0RWRpdG9yKGVkaXRvcikge1xuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXG4gIH1cbiAgaGFzU2VsZWN0ZWRFbHNXaGVuU3RhcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRFbHMubGVuZ3RoID4gMFxuICB9XG4gIHN0YXJ0KGN0eCkge1xuICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBjdHgub3JpZ2luRXZlbnQudGFyZ2V0XG4gICAgaWYgKCF0aGlzLmVkaXRvci5pc0NvbnRlbnRFbGVtZW50KHRhcmdldEVsZW1lbnQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRGRWxlbWVudCA9IG5ldyBGU1ZHLlJlY3QodGFyZ2V0RWxlbWVudCkgLy8g5pqC5pe25Y+q5pivIHJlY3QgVE9ETzog5pS55Li66YCa55So5YaZ5rOVXG4gICAgdGhpcy5zZWxlY3RlZEVscyA9IFsgdGFyZ2V0RkVsZW1lbnQgXSAvLyDpvKDmoIfmjInkuIvml7bvvIzlsLHpgInkuK3kuobkuIDkuKrlhYPntKBcbiAgICBjb25zdCB4ID0gcGFyc2VGbG9hdCh0YXJnZXRGRWxlbWVudC5nZXRBdHRyKCd4JykpXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQodGFyZ2V0RkVsZW1lbnQuZ2V0QXR0cigneScpKVxuICAgIGNvbnN0IHcgPSBwYXJzZUZsb2F0KHRhcmdldEZFbGVtZW50LmdldEF0dHIoJ3dpZHRoJykpXG4gICAgY29uc3QgaCA9IHBhcnNlRmxvYXQodGFyZ2V0RkVsZW1lbnQuZ2V0QXR0cignaGVpZ2h0JykpXG5cbiAgICB0aGlzLm91dGxpbmVTdGFydFggPSB4XG4gICAgdGhpcy5vdXRsaW5lU3RhcnRZID0geVxuXG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lSHVkLmRyYXdSZWN0KHgsIHksIHcsIGgpXG4gIH1cbiAgbW92ZShjdHgpIHtcbiAgICBpZiAoIXRoaXMuaGFzU2VsZWN0ZWRFbHNXaGVuU3RhcnQoKSkgeyAvLyBkcmF3IHNlbGVjdGluZyBhcmVhXG4gICAgICAvLyBzZWxlY3Qgbm8gZWxlbWVudCwgZHJhdyBzZWxlY3QgcmVjdFxuICAgICAgY29uc3QgeyB4OiBlbmRYLCB5OiBlbmRZIH0gPSBjdHguZ2V0UG9zKClcbiAgICAgIGNvbnN0IHsgeDogc3RhcnRYLCB5OiBzdGFydFkgfSA9IGN0eC5nZXRTdGFydFBvcygpXG4gICAgICBjb25zdCB7IHgsIHksIHcsIGggfSA9IGdldEJveEJ5MnBvaW50cyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSlcbiAgICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIuc2VsZWN0QXJlYS5kcmF3UmVjdCh4LCB5LCB3LCBoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgeyB4OiBkeCwgeTogZHkgfSA9IGN0eC5nZXREaWZmUG9zKClcbiAgICBjb25zdCBvdXRsaW5lSHVkID0gdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lSHVkXG4gICAgY29uc3QgdyA9IG91dGxpbmVIdWQuZ2V0V2lkdGgoKVxuICAgIGNvbnN0IGggPSBvdXRsaW5lSHVkLmdldEhlaWdodCgpXG4gICAgb3V0bGluZUh1ZC5kcmF3UmVjdCh0aGlzLm91dGxpbmVTdGFydFggKyBkeCwgdGhpcy5vdXRsaW5lU3RhcnRZICsgZHksIHcsIGgpXG4gIH1cbiAgZW5kKGN0eCkge1xuICAgIGlmICghdGhpcy5oYXNTZWxlY3RlZEVsc1doZW5TdGFydCgpKSB7IC8vIGZpbmlzaGVkIGRyYXduIHNlbGVjdGluZyBhcmVhXG4gICAgICBjb25zdCBib3ggPSB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLnNlbGVjdEFyZWEuZ2V0Qm94KClcbiAgICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIuc2VsZWN0QXJlYS5jbGVhcigpXG5cbiAgICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVsc0luQm94KGJveClcblxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIub3V0bGluZUh1ZC5jbGVhcigpXG5cbiAgICBcbiAgICBjb25zdCB7IHg6IGR4LCB5OiBkeSB9ID0gY3R4LmdldERpZmZQb3MoKVxuICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdkbW92ZScsIHRoaXMuc2VsZWN0ZWRFbHMsIGR4LCBkeSlcbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHModGhpcy5zZWxlY3RlZEVscykgLy8gc2V0IGdsb2JhbCBhY3RpdmVkIGVsZW1lbnRzXG4gICAgdGhpcy5zZWxlY3RlZEVscyA9IFtdXG4gIH1cbiAgLy8gbW91c2Vkb3duIG91dHNpZGUgdmlld3BvcnRcbiAgZW5kT3V0c2lkZSgpIHtcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVIdWQuY2xlYXIoKVxuICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIuc2VsZWN0QXJlYS5jbGVhcigpXG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuY2xlYXIoKVxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxuICB9XG59XG4iLCIvKiogem9vbSAqL1xuXG5jb25zdCB7IGdldFZpZXdCb3ggfSA9IHJlcXVpcmUoXCIuLi91dGlsL3N2Z1wiKVxuXG5leHBvcnQgY2xhc3MgWm9vbU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcbiAgfVxuICBzZXRFZGl0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgfVxuICBnZXRab29tKCkge1xuICAgIGNvbnN0IGFjdHVsV2lkdGggPSBwYXJzZUZsb2F0KHRoaXMuZWRpdG9yLnN2Z1Jvb3QuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKVxuICAgIGNvbnN0IHZpZXdCb3ggPSBnZXRWaWV3Qm94KHRoaXMuZWRpdG9yLnN2Z1Jvb3QpXG4gICAgY29uc3Qgem9vbSA9IGFjdHVsV2lkdGggLyB2aWV3Qm94LndcbiAgICByZXR1cm4gem9vbVxuICB9XG4gIHNldFpvb20oem9vbSkge1xuICAgIGNvbnNvbGUubG9nKHpvb20pXG4gICAgY29uc3Qgdmlld0JveCA9IGdldFZpZXdCb3godGhpcy5lZGl0b3Iuc3ZnUm9vdClcbiAgICBjb25zdCB3aWR0aCA9IHZpZXdCb3gudyAqIHpvb21cbiAgICBjb25zdCBoZWlnaHQgPSB2aWV3Qm94LmggKiB6b29tXG4gICAgdGhpcy5lZGl0b3Iuc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2lkdGgpXG4gICAgdGhpcy5lZGl0b3Iuc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGhlaWdodClcbiAgfVxuICB6b29tSW4oKSB7XG4gICAgY29uc3QgY3VycmVudFpvb20gPSB0aGlzLmdldFpvb20oKVxuICAgIHRoaXMuc2V0Wm9vbShjdXJyZW50Wm9vbSArIDAuMSlcbiAgfVxuICB6b29tT3V0KCkge1xuICAgIGNvbnN0IGN1cnJlbnRab29tID0gdGhpcy5nZXRab29tKClcbiAgICB0aGlzLnNldFpvb20oY3VycmVudFpvb20gLSAwLjEpXG4gIH1cbn0iLCJcbmV4cG9ydCBjbGFzcyBFZGl0b3JTZXR0aW5nIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zZXR0aW5nID0ge1xuICAgICAgLy8gZmlsbDogJyNmZmYnLFxuICAgICAgLy8gc3Ryb2tlOiAnIzAwMCcsXG4gICAgICAvLyBzdHJva2VXaWR0aDogJzJweCcsXG5cbiAgICAgIC8vIG91dGxpbmVXaWR0aFxuICAgICAgLy8gb3V0bGluZUNvbG9yXG4gICAgfVxuICAgIHRoaXMuYmluZGVkRXZlbnRGbnMgPSB7fVxuICAgIHRoaXMuc2V0RmlsbCgnI2ZmZicpXG4gICAgdGhpcy5zZXRTdHJva2UoJyMwMDAnKVxuICAgIHRoaXMuc2V0KCdzdHJva2VXaWR0aCcsICcxcHgnKVxuICB9XG4gIHNldEZpbGwodmFsKSB7XG4gICAgdGhpcy5zZXQoJ2ZpbGwnLCB2YWwpXG4gIH1cbiAgc2V0U3Ryb2tlKHZhbCkge1xuICAgIHRoaXMuc2V0KCdzdHJva2UnLCB2YWwpXG4gIH1cbiAgc2V0KG5hbWUsIHZhbCkge1xuICAgIHRoaXMuc2V0dGluZ1tuYW1lXSA9IHZhbFxuXG4gICAgY29uc3QgdG9DYWxsRm5zID0gdGhpcy5iaW5kZWRFdmVudEZuc1tuYW1lXVxuICAgIGlmICh0b0NhbGxGbnMpIHtcbiAgICAgIHRvQ2FsbEZucy5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgZm4odmFsKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgZ2V0KG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5nW25hbWVdXG4gIH1cbiAgYmluZEV2ZW50KG5hbWUsIGZuKSB7XG4gICAgaWYgKCF0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdKSB7XG4gICAgICB0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdID0gW11cbiAgICB9XG4gICAgdGhpcy5iaW5kZWRFdmVudEZuc1tuYW1lXS5wdXNoKGZuKVxuICB9XG4gIHJlbW92ZUV2ZW50KG5hbWUsIGZuKSB7XG4gICAgaWYgKCF0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdKSByZXR1cm4gZmFsc2VcblxuICAgIGNvbnN0IHJlbW92ZUZuSWR4ID0gdGhpcy5iaW5kZWRFdmVudEZuc1tuYW1lXS5maW5kSW5kZXgoZm4pXG4gICAgaWYgKHJlbW92ZUZuSWR4ID09PSAtMSkgcmV0dXJuIGZhbHNlXG4gICAgdGhpcy5iaW5kZWRFdmVudEZucy5zcGxpY2UocmVtb3ZlRm5JZHgsIDEpXG4gICAgcmV0dXJuIHRydWVcbiAgfVxufSIsIi8qKlxuICogZWRpdG9yIGdsb2JhbCBzaG9ydGN1dFxuICovXG5pbXBvcnQgeyBpc0RlYnVnIH0gZnJvbSBcIi4vZGV2Q29uZmlnXCJcblxuZXhwb3J0IGNsYXNzIFNob3J0Y3V0IHtcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgICB0aGlzLnJlZ2lzdGVyZWRGbnMgPSB7fVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcbiAgICAgIGNvbnN0IHByZXNzS2V5TmFtZSA9IGdldFByZXNzS2V5TmFtZShlKVxuICAgICAgY29uc3QgZm4gPSB0aGlzLnJlZ2lzdGVyZWRGbnNbcHJlc3NLZXlOYW1lXVxuICAgICAgaWYgKGZuKSB7XG4gICAgICAgIC8qKiBkZWJ1ZyAqL1xuICAgICAgICBpZihpc0RlYnVnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocHJlc3NLZXlOYW1lKVxuICAgICAgICB9XG4gICAgICAgIC8qKiBkZWJ1ZyBlbmQgKi9cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGZuLmZuKGUpXG4gICAgICB9XG4gICAgICBcbiAgICB9LCBmYWxzZSlcbiAgfVxuICAvLyB0aGlzLnJlZ2lzdGVyKCd1bmRvJywgJ0N0cmwrWicsICgpID0+IHsgZWRpdG9yLmV4ZWNDb21tYW5kKCd1bmRvJykgfSlcbiAgcmVnaXN0ZXIoY21kTmFtZSwgc2hvcnRjdXROYW1lLCBmbikge1xuICAgIC8vIFRPRE86IHZhbGlkIHNob3J0Y3V0TmFtZVxuICAgIHRoaXMucmVnaXN0ZXJlZEZuc1tzaG9ydGN1dE5hbWVdID0geyBjbWROYW1lLCBmbiB9XG4gICAgXG4gIH1cbiAgZm9ybWF0UHJpbnQoKSB7XG4gICAgY29uc3QgYXJyID0gW11cbiAgICBmb3IgKGxldCBzaG9ydGN1dE5hbWUgaW4gdGhpcy5yZWdpc3RlcmVkRm5zKSB7XG4gICAgICBjb25zdCBjbWROYW1lID0gdGhpcy5yZWdpc3RlcmVkRm5zW3Nob3J0Y3V0TmFtZV0uY21kTmFtZVxuICAgICAgYXJyLnB1c2goY21kTmFtZSArICc6ICcgKyBzaG9ydGN1dE5hbWUpXG4gICAgfVxuICAgIHJldHVybiBhcnIuam9pbignLCAnKVxuICB9XG4gIFxufVxuXG5mdW5jdGlvbiBnZXRQcmVzc0tleU5hbWUoZSkge1xuICBjb25zdCBwcmVzc2VkS2V5cyA9IFtdXG4gIGlmIChlLmN0cmxLZXkpIHByZXNzZWRLZXlzLnB1c2goJ0N0cmwnKVxuICBpZiAoZS5tZXRhS2V5KSBwcmVzc2VkS2V5cy5wdXNoKCdDbWQnKVxuICBpZiAoZS5zaGlmdEtleSkgcHJlc3NlZEtleXMucHVzaCgnU2hpZnQnKVxuICAvLyBvbmx5IGNoZWNrIEF+WlxuICAvLyBUT0RPOiByZXNvbHZlIGFsbCBrZXlcbiAgaWYgKC9LZXkuLy50ZXN0KGUuY29kZSkpIHtcbiAgICBwcmVzc2VkS2V5cy5wdXNoKGUuY29kZVtlLmNvZGUubGVuZ3RoIC0gMV0pXG4gIH1cbiAgZWxzZSB7XG4gICAgcHJlc3NlZEtleXMucHVzaChlLmNvZGUpXG4gIH1cbiAgY29uc3QgbmFtZSA9IHByZXNzZWRLZXlzLmpvaW4oJysnKVxuICByZXR1cm4gbmFtZVxufSIsImNvbnN0IHsgRWRpdG9yRXZlbnRDb250ZXh0IH0gPSByZXF1aXJlKFwiLi9lZGl0b3JFdmVudENvbnRleHRcIilcblxuZXhwb3J0IGNsYXNzIFRvb2xNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcbiAgICB0aGlzLnRvb2xzID0ge31cbiAgICB0aGlzLmN1cnJlbnRUb29sID0gbnVsbFxuICAgIHRoaXMuaW52b2tlV2hlblN3aXRjaCA9ICgpID0+IHt9XG5cbiAgICB0aGlzLmN0eCA9IG51bGwgLy8gdG9vbCBjb250ZXh0XG4gIH1cbiAgc2V0Q3VycmVudFRvb2wobmFtZSkge1xuICAgIHRoaXMuY3VycmVudFRvb2wgPSB0aGlzLnRvb2xzW25hbWVdXG4gICAgdGhpcy5pbnZva2VXaGVuU3dpdGNoKHRoaXMuZ2V0Q3VycmVudFRvb2xOYW1lKCkpXG4gIH1cbiAgb25Td2l0Y2hUb29sKGZuKSB7XG4gICAgdGhpcy5pbnZva2VXaGVuU3dpdGNoID0gZm5cbiAgfVxuICBnZXRDdXJyZW50VG9vbE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFRvb2wubmFtZSgpXG4gIH1cbiAgcmVnaXN0ZXJUb29sKHRvb2wpIHtcbiAgICB0aGlzLnRvb2xzW3Rvb2wubmFtZSgpXSA9IHRvb2xcbiAgICB0b29sLnNldEVkaXRvcih0aGlzLmVkaXRvcikgLy8gZGVwZW5kZW5jeSBpbmplY3Rpb25cbiAgfVxuXG4gIGJpbmRUb29sRXZlbnQoKSB7XG4gICAgY29uc3Qgc3ZnUm9vdCA9IHRoaXMuZWRpdG9yLnN2Z1Jvb3RcblxuICAgIHN2Z1Jvb3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZSA9PiB7XG4gICAgICBjb25zdCBjdHggPSBuZXcgRWRpdG9yRXZlbnRDb250ZXh0KHRoaXMuZWRpdG9yLCBlKVxuICAgICAgdGhpcy5jdHggPSBjdHhcbiAgICAgIHRoaXMuY3VycmVudFRvb2wuc3RhcnQoY3R4KVxuICAgIH0sIGZhbHNlKVxuXG4gICAgc3ZnUm9vdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4XG5cbiAgICAgIGlmICghY3R4KSByZXR1cm4gLy8gaWYgY3R4IGV4aXRzLCBwcmVzZW50IG1vdXNlZG93biBldmVudCBlbWl0IGp1c3QgYmVmb3JlXG4gICAgICBjdHguc2V0T3JpZ2luRXZlbnQoZSlcbiAgICAgIGN0eC5wcmVzc01vdXNlKClcbiAgICAgIHRoaXMuY3VycmVudFRvb2wubW92ZShjdHgpIC8vIG1vdmVcbiAgICB9LCBmYWxzZSlcbiAgICBcbiAgICBzdmdSb290LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlID0+IHtcbiAgICAgIC8vIHRoaXMuY3R4LnJlbGVhc2VNb3VzZSgpXG4gICAgICBjb25zdCBjdHggPSB0aGlzLmN0eFxuICAgICAgLy8gY3R4LnNldE9yaWdpbkV2ZW50KGUpIC8vIHRoZSBvZmZzZXRYIGFuZCBvZmZzZXRZIGluIG1vdXNldXAgYW5kIHRoZSBsYXN0IG1vdXNlbW92ZSBpcyBub3QgZXF1YWwgPz8gXG4gICAgICB0aGlzLmN1cnJlbnRUb29sLmVuZChjdHgpXG4gICAgICBjdHguaXNFbmRJbnNpZGUgPSB0cnVlXG4gICAgfSwgZmFsc2UpXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGUgPT4ge1xuICAgICAgaWYgKHRoaXMuY3R4ICYmIHRoaXMuY3R4LmlzRW5kSW5zaWRlID09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRvb2wuZW5kT3V0c2lkZSh0aGlzLmN0eClcbiAgICAgIH1cbiAgICAgIHRoaXMuY3R4ID0gbnVsbFxuICAgIH0sIGZhbHNlKVxuICB9XG59IiwiaW1wb3J0IHsgRlNWRyB9IGZyb20gXCIuLi9lbGVtZW50XCJcblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFpbGRDb2xvclZhbCgpIHtcbiAgLy8gVE9ETzpcbiAgLy8gMS4gYWxsIGNvbG9yIGJyb3dlciBzdXBwb3J0ZWRcbiAgLy8gMi4gI2ZmZiBhbmQgI2YwZjBmMFxuICAvLyAzLiByZ2IoeCx4LHgpXG4gIC8vIC4uLlxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWxlbWVudHNJbkJveChib3gsIHBhcmVudCkge1xuICBjb25zdCB0YWdOYW1lRm9yYmlkTGlzdCA9IFsnZyddXG4gIGJveCA9IG5ldyBGU1ZHLkJveChib3gpXG4gIGNvbnN0IGVsc0luQm94ID0gW11cblxuICBmdW5jdGlvbiByKGJveCwgcGFyZW50KSB7XG4gICAgY29uc3QgZWxlbWVudHMgPSBwYXJlbnQuY2hpbGRyZW5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlbCA9IGVsZW1lbnRzW2ldIC8vIEZTVkcuY3JlYXRlKGVsZW1lbnRzW2ldKVxuXG4gICAgICBpZiAoIXRhZ05hbWVGb3JiaWRMaXN0LmluY2x1ZGVzKGVsLnRhZ05hbWUpKSB7XG4gICAgICAgIGNvbnN0IGJib3ggPSBlbC5nZXRCQm94KClcbiAgICAgICAgaWYgKGJveC5jb250YWlucyhiYm94KSkge1xuICAgICAgICAgIGVsc0luQm94LnB1c2goIEZTVkcuY3JlYXRlKGVsKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZWwuY2hpbGRyZW4ubGVuZ3RoID4gMCkgcihib3gsIGVsKVxuICAgIH1cbiAgfVxuICByKGJveCwgcGFyZW50KVxuICByZXR1cm4gZWxzSW5Cb3hcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuaXEoYXJyKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQoYXJyKSlcbn0iLCJcbmV4cG9ydCBmdW5jdGlvbiBnZXRCb3hCeTJwb2ludHMoeDEsIHkxLCB4MiwgeTIpIHtcbiAgbGV0IHgsIHksIHcsIGhcbiAgdyA9IE1hdGguYWJzKHgyIC0geDEpXG4gIGggPSBNYXRoLmFicyh5MiAtIHkxKVxuICB4ID0gTWF0aC5taW4oeDIsIHgxKVxuICB5ID0gTWF0aC5taW4oeTIsIHkxKVxuICByZXR1cm4geyB4LCB5LCB3LCBoIH1cbn1cbiIsIlxuLy8gVE9ETzogdG8gZmluaXNoXG5leHBvcnQgZnVuY3Rpb24gZ2V0Vmlld0JveChlbCkge1xuICBjb25zdCB2YWwgPSBlbC5nZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnKVxuICBpZiAoIXZhbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaGFzIG5vdCB2aWV3Qm94IGF0dHJpYnV0ZScpXG4gIH1cbiAgY29uc3QgW3gsIHksIHcsIGhdID0gdmFsLnNwbGl0KC9bXFxzLF0rLykubWFwKGl0ZW0gPT4gcGFyc2VGbG9hdChpdGVtKSlcbiAgcmV0dXJuIHsgeCwgeSwgdywgaCB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAuanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9