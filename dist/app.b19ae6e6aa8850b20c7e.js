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
    hudManager.outlineBoxHud.clear()
  }
  contains(el) {
    for (let i = 0; i < this.els.length; i++) {
      if (this.els[i].el() === el) {
        return true
      }
    }
    return false
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

    hudManager.outlineBoxHud.drawRect(mergedBox.x, mergedBox.y, mergedBox.width, mergedBox.height)
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
/* harmony import */ var _outlineBoxHud__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./outlineBoxHud */ "./src/layer/outlineBoxHud.js");
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
    this.outlineBoxHud = new _outlineBoxHud__WEBPACK_IMPORTED_MODULE_0__.OutlineBoxHud(this.container)
  }
  mount(el) {
    el.appendChild(this.container)
  }
}



/***/ }),

/***/ "./src/layer/outlineBoxHud.js":
/*!************************************!*\
  !*** ./src/layer/outlineBoxHud.js ***!
  \************************************/
/*! namespace exports */
/*! export OutlineBoxHud [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OutlineBoxHud": () => /* binding */ OutlineBoxHud
/* harmony export */ });
/**
 * elements outline box
 * 
 */

const { NS } = __webpack_require__(/*! ../constants */ "./src/constants.js");

class OutlineBoxHud {
  constructor(parent) {
    this.x = 0
    this.y = 0
    this.w = 0
    this.h = 0

    this.container = document.createElementNS(NS.SVG, 'g')
    this.container.id = 'outline-box-hud'
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
    this.editor.hudManager.outlineBoxHud.drawRect(x, y, w, h)
  }
  end(ctx) {
    this.editor.hudManager.outlineBoxHud.clear()

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
    this.editor.hudManager.outlineBoxHud.clear()
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

    const targetFElement = _element__WEBPACK_IMPORTED_MODULE_0__.FSVG.create(targetElement)
    const activedElsManager = this.editor.activedElsManager
    
    if (activedElsManager.contains(targetElement)) {
      activedElsManager.heighligthEls()
    } else {
      activedElsManager.setEls(targetFElement)
    }

    this.selectedEls = activedElsManager.getEls()

    const outlineBoxHud = this.editor.hudManager.outlineBoxHud

    this.outlineStartX = outlineBoxHud.getX()
    this.outlineStartY = outlineBoxHud.getY()
  }
  move(ctx) {
    // draw selecting area
    if (!this.hasSelectedElsWhenStart()) { 
      // select no element, draw select rect
      const { x: endX, y: endY } = ctx.getPos()
      const { x: startX, y: startY } = ctx.getStartPos()
      const { x, y, w, h } = (0,_util_math__WEBPACK_IMPORTED_MODULE_1__.getBoxBy2points)(startX, startY, endX, endY)
      this.editor.hudManager.selectArea.drawRect(x, y, w, h)
      return
    }

    // move selected elements
    const { x: dx, y: dy } = ctx.getDiffPos()
    const outlineBoxHud = this.editor.hudManager.outlineBoxHud
    const w = outlineBoxHud.getWidth()
    const h = outlineBoxHud.getHeight()
    outlineBoxHud.drawRect(this.outlineStartX + dx, this.outlineStartY + dy, w, h)
  }
  end(ctx) {
    if (!this.hasSelectedElsWhenStart()) { // finished drawn selecting area
      const box = this.editor.hudManager.selectArea.getBox()
      this.editor.hudManager.selectArea.clear()

      this.editor.activedElsManager.setElsInBox(box)

      return
    }
    this.editor.hudManager.outlineBoxHud.clear()

    
    const { x: dx, y: dy } = ctx.getDiffPos()
    this.editor.executeCommand('dmove', this.selectedEls, dx, dy)
    this.editor.activedElsManager.setEls(this.selectedEls) // set global actived elements
    this.selectedEls = []
  }
  // mousedown outside viewport
  endOutside() {
    this.editor.hudManager.outlineBoxHud.clear()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2FjdGl2ZWRFbHNNYW5hZ2VyLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvY29tbWFuZC9jb21tYW5kTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2NvbW1hbmQvY29tbWFuZHMuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9kZXZDb25maWcuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lZGl0b3JFdmVudENvbnRleHQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lbGVtZW50L2Jhc2VFbGVtZW50LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvZWxlbWVudC9ib3guanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lbGVtZW50L2luZGV4LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvZWxlbWVudC9yZWN0LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbGF5ZXIvaHVkTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2xheWVyL291dGxpbmVCb3hIdWQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9sYXllci9zZWxlY3RBcmVhLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy9hZGRSZWN0LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy9kcmFnQ2FudmFzLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9tb2R1bGVzL3pvb20uanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9zZXR0aW5nL2VkaXRvclNldHRpbmcuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9zaG9ydGN1dC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL3Rvb2xNYW5hZ2VyLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvdXRpbC9jb21tb24uanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy91dGlsL21hdGguanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy91dGlsL3N2Zy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBZ0M7QUFDZ0I7O0FBRXpDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsOERBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsMEJBQTBCLHlEQUFVO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdktyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPOztBQUVsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYXBwLmIxOWFlNmU2YWE4ODUwYjIwYzdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOa/gOa0u+WFg+e0oOeuoeeQhuexu1xyXG4gKi9cclxuXHJcbmltcG9ydCB7IEZTVkcgfSBmcm9tIFwiLi9lbGVtZW50XCJcclxuaW1wb3J0IHsgZ2V0RWxlbWVudHNJbkJveCB9IGZyb20gXCIuL3V0aWwvY29tbW9uXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBBY3RpdmVkRWxzTWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gICAgdGhpcy5lbHMgPSBbXVxyXG4gIH1cclxuICBzZXRFbHMoZWxzKSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxzKSkgZWxzID0gW2Vsc11cclxuICAgIHRoaXMuZWxzID0gZWxzXHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmVkaXRvci50b29sTWFuYWdlci5nZXRDdXJyZW50VG9vbE5hbWUoKSlcclxuICAgIC8vIFRPRE86IGhpZ2hsaWdodCBvdXRsaW5lLCBhY2NvcmRpbmcgdG8gY3VycmVudCB0b29sXHJcbiAgICB0aGlzLmhlaWdobGlndGhFbHMoKVxyXG4gICAgdGhpcy5zZXRTZXR0aW5nRmlsbCgpXHJcbiAgfVxyXG4gIGdldEVscygpIHtcclxuICAgIHJldHVybiB0aGlzLmVsc1xyXG4gIH1cclxuICBzZXRFbHNJbkJveChib3gpIHtcclxuICAgIGlmIChib3gud2lkdGggPT09IDAgfHwgYm94LmhlaWdodCA9PT0gMCkge1xyXG4gICAgICB0aGlzLmNsZWFyKClcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZWxzSW5Cb3ggPSBnZXRFbGVtZW50c0luQm94KGJveCwgdGhpcy5lZGl0b3Iuc3ZnQ29udGVudClcclxuICAgIGlmIChlbHNJbkJveC5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5jbGVhcigpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNldEVscyhlbHNJbkJveClcclxuICAgIH1cclxuICB9XHJcbiAgaXNFbXB0eSgpIHtcclxuICAgIHJldHVybiB0aGlzLmVscy5sZW5ndGggPT0gMFxyXG4gIH1cclxuICBpc05vRW1wdHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbHMubGVuZ3RoID4gMFxyXG4gIH1cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMuZWxzID0gW11cclxuICAgIC8vIGNsZWFyIG91dGxpbmVcclxuICAgIGNvbnN0IGh1ZE1hbmFnZXIgPSB0aGlzLmVkaXRvci5odWRNYW5hZ2VyXHJcbiAgICBodWRNYW5hZ2VyLm91dGxpbmVCb3hIdWQuY2xlYXIoKVxyXG4gIH1cclxuICBjb250YWlucyhlbCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmVscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5lbHNbaV0uZWwoKSA9PT0gZWwpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcbiAgZ2V0TWVyZ2VCQm94KCkge1xyXG4gICAgLy8gVE9ETzpcclxuICAgIC8qIGxldCB4LCB5LCB3LCBoXHJcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgY29uc3QgYmJveCA9IGVsLmVsKCkuZ2V0YmJveCgpXHJcbiAgICB9KSAqL1xyXG4gIH1cclxuICAvLyBoZWlnaHRsaWdodCB0aGUgZWxlbWVudHNcclxuICBoZWlnaGxpZ3RoRWxzKCkge1xyXG4gICAgY29uc3QgZWxzID0gdGhpcy5lbHNcclxuICAgIGNvbnN0IGh1ZE1hbmFnZXIgPSB0aGlzLmVkaXRvci5odWRNYW5hZ2VyXHJcblxyXG4gICAgY29uc3QgZmlyc3RCb3ggPSBuZXcgRlNWRy5Cb3goZWxzWzBdLmdldEJCb3goKSlcclxuICAgIGNvbnN0IG1lcmdlZEJveCA9IGVscy5yZWR1Y2UoKHByZSwgY3VyRWwpID0+IHtcclxuICAgICAgY29uc3QgY3VyQm94ID0gY3VyRWwuZ2V0QkJveCgpXHJcbiAgICAgIHJldHVybiBwcmUubWVyZ2UobmV3IEZTVkcuQm94KGN1ckJveCkpXHJcbiAgICB9LCBmaXJzdEJveClcclxuXHJcbiAgICBodWRNYW5hZ2VyLm91dGxpbmVCb3hIdWQuZHJhd1JlY3QobWVyZ2VkQm94LngsIG1lcmdlZEJveC55LCBtZXJnZWRCb3gud2lkdGgsIG1lcmdlZEJveC5oZWlnaHQpXHJcbiAgfVxyXG4gIHNldFNldHRpbmdGaWxsKCkge1xyXG4gICAgY29uc3QgZWxzID0gdGhpcy5lbHNcclxuXHJcbiAgICBjb25zdCBmaWxscyA9IGVscy5tYXAoZWwgPT4ge1xyXG4gICAgICByZXR1cm4gZWwuZ2V0QXR0cignZmlsbCcpXHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMuZWRpdG9yLnNldHRpbmcuc2V0RmlsbChmaWxsc1swXSkgLy8gRklYTUU6XHJcbiAgfVxyXG4gIHNldEVsc0F0dHIobmFtZSwgdmFsKSB7XHJcbiAgICBpZiAodGhpcy5pc05vRW1wdHkoKSkge1xyXG4gICAgICB0aGlzLmVkaXRvci5leGVjdXRlQ29tbWFuZCgnc2V0QXR0cicsIHRoaXMuZWxzLCBuYW1lLCB2YWwpXHJcbiAgICB9XHJcbiAgfVxyXG59IiwiXHJcbmltcG9ydCBFZGl0b3IgZnJvbSAnLi9lZGl0b3IuanMnXHJcbmltcG9ydCBBZGRSZWN0IGZyb20gJy4vbW9kdWxlcy9hZGRSZWN0LmpzJ1xyXG5pbXBvcnQgeyBEcmFnQ2FudmFzIH0gZnJvbSAnLi9tb2R1bGVzL2RyYWdDYW52YXMuanMnXHJcbmltcG9ydCBDb21tYW5kTWFuYWdlciBmcm9tICcuL2NvbW1hbmQvY29tbWFuZE1hbmFnZXIuanMnXHJcbmltcG9ydCB7IEVkaXRvclNldHRpbmcgfSBmcm9tICcuL3NldHRpbmcvZWRpdG9yU2V0dGluZy5qcydcclxuaW1wb3J0IHsgWm9vbU1hbmFnZXIgfSBmcm9tICcuL21vZHVsZXMvem9vbS5qcydcclxuaW1wb3J0IHsgU2VsZWN0IH0gZnJvbSAnLi9tb2R1bGVzL3NlbGVjdC5qcydcclxuaW1wb3J0IHsgVG9vbE1hbmFnZXIgfSBmcm9tICcuL3Rvb2xNYW5hZ2VyLmpzJ1xyXG5cclxuZnVuY3Rpb24gYWN0aXZlQnRuKG5hbWUpIHtcclxuICBuYW1lID0ge1xyXG4gICAgJ3NlbGVjdCc6ICdidG4tc2VsZWN0JyxcclxuICAgICdhZGRSZWN0JzogJ2J0bi1hZGQtcmVjdCcsXHJcbiAgICAnZHJhZ0NhbnZhcyc6ICdidG4tZHJhZy1jYW52YXMnLFxyXG4gIH1bbmFtZV1cclxuICBpZiAobmFtZSA9PSB1bmRlZmluZWQpIHJldHVyblxyXG5cclxuICBjb25zdCB0b29sQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rvb2wtYmFyJylcclxuICBjb25zdCB0b29sQnRucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRvb2xCYXIuY2hpbGRyZW4pXHJcbiAgdG9vbEJ0bnMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICB9KVxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5hbWUpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbn1cclxuXHJcblxyXG5jb25zdCBlZGl0b3IgPSBuZXcgRWRpdG9yKClcclxud2luZG93LmVkaXRvciA9IGVkaXRvciAvLyBkZWJ1ZyBpbiBkZXZ0b29sXHJcblxyXG5jb25zdCBjb21tYW5kTWFuYWdlciA9IG5ldyBDb21tYW5kTWFuYWdlcihlZGl0b3IpXHJcbmVkaXRvci5zZXRDb21tYW5kTWFuYWdlcihjb21tYW5kTWFuYWdlcilcclxuXHJcbmVkaXRvci5zZXRTZXR0aW5nKG5ldyBFZGl0b3JTZXR0aW5nKCkpXHJcbi8vIHJlZ2lzdGVyIHRvb2xzXHJcblxyXG5jb25zdCB0b29sTWFuYWdlciA9IG5ldyBUb29sTWFuYWdlcihlZGl0b3IpXHJcbmVkaXRvci5zZXRUb29sTWFuYWdlcih0b29sTWFuYWdlcilcclxudG9vbE1hbmFnZXIucmVnaXN0ZXJUb29sKG5ldyBBZGRSZWN0KCkpXHJcbnRvb2xNYW5hZ2VyLnJlZ2lzdGVyVG9vbChuZXcgRHJhZ0NhbnZhcygpKVxyXG50b29sTWFuYWdlci5yZWdpc3RlclRvb2wobmV3IFNlbGVjdCgpKVxyXG5cclxuZWRpdG9yLnRvb2xNYW5hZ2VyLm9uU3dpdGNoVG9vbChuYW1lID0+IHtcclxuICBjb25zb2xlLmxvZygnc3dpdGNoZWQgdG9vbDonLCBuYW1lKVxyXG4gIGFjdGl2ZUJ0bihuYW1lKVxyXG59KVxyXG5cclxudG9vbE1hbmFnZXIuc2V0Q3VycmVudFRvb2woJ2FkZFJlY3QnKVxyXG50b29sTWFuYWdlci5iaW5kVG9vbEV2ZW50KClcclxuLy8gem9vbVxyXG5lZGl0b3Iuc2V0Wm9vbU1hbmFnZXIobmV3IFpvb21NYW5hZ2VyKCkpXHJcblxyXG5lZGl0b3IubW91bnQoJyNlZGl0b3ItYXJlYScpXHJcblxyXG5cclxuLyoqIFxyXG4gKiBiaW5kIGV2ZW50IGluIGJ1dHRvblxyXG4gKi8gXHJcbi8vIHVuZG9cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi11bmRvJykub25jbGljayA9ICgpID0+IHtcclxuICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3VuZG8nKVxyXG59XHJcbi8vIHJlZG9cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1yZWRvJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGVkaXRvci5leGVjdXRlQ29tbWFuZCgncmVkbycpXHJcbn1cclxuLy8gem9vbUluXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tem9vbS1pbicpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBlZGl0b3Iuem9vbU1hbmFnZXIuem9vbUluKClcclxufVxyXG4vLyB6b29tT3V0XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tem9vbS1vdXQnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgZWRpdG9yLnpvb21NYW5hZ2VyLnpvb21PdXQoKVxyXG59XHJcbi8vIHNlbGVjdCBhZGRSZWN0IHRvb2xcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1hZGQtcmVjdCcpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBlZGl0b3Iuc2V0Q3VycmVudFRvb2woJ2FkZFJlY3QnKVxyXG59XHJcbi8vIHNlbGVjdCBkcmFnY2FudmFzIHRvb2xcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1kcmFnLWNhbnZhcycpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBlZGl0b3Iuc2V0Q3VycmVudFRvb2woJ2RyYWdDYW52YXMnKVxyXG59XHJcbi8vIHNlbGVjdCB0b29sXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNidG4tc2VsZWN0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGVkaXRvci5zZXRDdXJyZW50VG9vbCgnc2VsZWN0JylcclxufVxyXG4vLyBkZWxldGUgc2VsZWN0ZWQgZWxlbWVudHNcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1kZWxldGUnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgaWYgKGVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5pc05vRW1wdHkoKSkge1xyXG4gICAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdyZW1vdmVTZWxlY3RlZEVsZW1lbnRzJylcclxuICB9XHJcbn1cclxuXHJcbi8vIGZpbGwgdmFsdWUgY29udHJvbFxyXG5jb25zdCBmaWxsVGV4dE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWxlbWVudC1pbmZvLWZpbGwnKVxyXG5maWxsVGV4dE5vZGUuaW5uZXJIVE1MID0gZWRpdG9yLnNldHRpbmcuZ2V0KCdmaWxsJylcclxuZWRpdG9yLnNldHRpbmcuYmluZEV2ZW50KCdmaWxsJywgdmFsID0+IHtcclxuICBmaWxsVGV4dE5vZGUuaW5uZXJIVE1MID0gdmFsXHJcbn0pXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZXQtZmlsbC1idG4nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgY29uc3QgZmlsbCA9IHdpbmRvdy5wcm9tcHQoJ1BsZWFzZSBpbnB1dCB2YWxpZCBjb2xvciB2YWx1Ze+8iGxpa2UgI2ZmY2U0M++8iScsIGVkaXRvci5zZXR0aW5nLmdldCgnZmlsbCcpKVxyXG4gIGlmICghZmlsbCkgcmV0dXJuXHJcbiAgZmlsbFRleHROb2RlLmlubmVySFRNTCA9IGZpbGxcclxuXHJcbiAgZWRpdG9yLnNldHRpbmcuc2V0RmlsbChmaWxsKVxyXG4gIGVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHNBdHRyKCdmaWxsJywgZmlsbClcclxufVxyXG5cclxuLy8gc3Ryb2tlIHZhbHVlIGNvbnRyb2xcclxuY29uc3Qgc3Ryb2tlVGV4dE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWxlbWVudC1pbmZvLXN0cm9rZScpXHJcbnN0cm9rZVRleHROb2RlLmlubmVySFRNTCA9IGVkaXRvci5zZXR0aW5nLmdldCgnc3Ryb2tlJylcclxuZWRpdG9yLnNldHRpbmcuYmluZEV2ZW50KCdzdHJva2UnLCB2YWwgPT4ge1xyXG4gIHN0cm9rZVRleHROb2RlLmlubmVySFRNTCA9IHZhbFxyXG59KVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2V0LXN0cm9rZS1idG4nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgY29uc3Qgc3Ryb2tlID0gd2luZG93LnByb21wdCgnUGxlYXNlIGlucHV0IHZhbGlkIGNvbG9yIHZhbHVl77yIbGlrZSAjZmZjZTQz77yJJywgZWRpdG9yLnNldHRpbmcuZ2V0KCdzdHJva2UnKSlcclxuICBpZiAoIXN0cm9rZSkgcmV0dXJuXHJcbiAgc3Ryb2tlVGV4dE5vZGUuaW5uZXJIVE1MID0gc3Ryb2tlXHJcblxyXG4gIGVkaXRvci5zZXR0aW5nLnNldFN0cm9rZShzdHJva2UpXHJcbiAgZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVsc0F0dHIoJ3N0cm9rZScsIHN0cm9rZSlcclxufVxyXG4vLyByZWdpc3RlciBzaG9ydGN1dFxyXG5lZGl0b3Iuc2hvcnRjdXQucmVnaXN0ZXIoJ1VuZG8nLCAnQ21kK1onLCAoKSA9PiB7XHJcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCd1bmRvJylcclxufSlcclxuZWRpdG9yLnNob3J0Y3V0LnJlZ2lzdGVyKCdVbmRvJywgJ0N0cmwrWicsICgpID0+IHtcclxuICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3VuZG8nKVxyXG59KVxyXG5lZGl0b3Iuc2hvcnRjdXQucmVnaXN0ZXIoJ1JlZG8nLCAnQ21kK1NoaWZ0K1onLCAoKSA9PiB7XHJcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdyZWRvJylcclxufSlcclxuZWRpdG9yLnNob3J0Y3V0LnJlZ2lzdGVyKCdSZWRvJywgJ0N0cmwrU2hpZnQrWicsICgpID0+IHtcclxuICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3JlZG8nKVxyXG59KVxyXG5lZGl0b3Iuc2hvcnRjdXQucmVnaXN0ZXIoJ0RlbGV0ZScsICdCYWNrc3BhY2UnLCAoKSA9PiB7XHJcbiAgaWYgKGVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5pc05vRW1wdHkoKSkge1xyXG4gICAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdyZW1vdmVTZWxlY3RlZEVsZW1lbnRzJylcclxuICB9XHJcbn0pXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaG9ydGN1dCcpLmlubmVySFRNTCA9IGVkaXRvci5zaG9ydGN1dC5mb3JtYXRQcmludCgpXHJcblxyXG4vKipcclxuICog55CG5oOzIGFwaSDkvb/nlKjkvovlrZBcclxuICogXHJcbiAqIGNvbnN0IGVkaXRvckJ1aWxkZXIgPSBuZXcgRWRpdG9yLmJ1aWxkZXIoKVxyXG4gKiBlZGl0b3JCdWlsZGVyXHJcbiAqICAgLnNldENhbnZhc1NpemUoNDAwLCAzMDApXHJcbiAqICAgLnNldFN0YWdlU2l6ZSgxMDAwLCA4MDApXHJcbiAqICAgLnNldFZpZXdwb3J0U2l6ZSg4MDAsIDUwMClcclxuICogICAuc2V0Wm9vbSgxMDApXHJcbiAqIFxyXG4gKiBjb25zdCBlZGl0b3IgPSBlZGl0b3JCdWlsZGVyLmJ1aWxkKClcclxuICogZWRpdG9yLnJlZ2lzdGVyVG9vbCh0b29sTW92ZSlcclxuICogXHJcbiAqLyIsIi8qKlxyXG4gKiBDb21tYW5kTWFuYWdlciBDbGFzc1xyXG4gKiBcclxuICogXHJcbiAqIENvbW1hbmRNYW5hZ2VyLnVuZG8oKVxyXG4gKiBDb21tYW5kTWFuYWdlci5yZWRvKClcclxuICovXHJcblxyXG5pbXBvcnQgeyBBZGRSZWN0LCBETW92ZSwgcmVtb3ZlU2VsZWN0ZWRFbGVtZW50cywgU2V0QXR0ciB9IGZyb20gXCIuL2NvbW1hbmRzXCJcclxuXHJcbmNsYXNzIENvbW1hbmRNYW5hZ2VyIHtcclxuICBjb25zdHJ1Y3RvcihlZGl0b3IpIHtcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgICB0aGlzLnJlZG9TdGFjayA9IFtdXHJcbiAgICB0aGlzLnVuZG9TdGFjayA9IFtdXHJcbiAgICB0aGlzLmNvbW1hbmRDbGFzc2VzID0ge31cclxuXHJcbiAgICB0aGlzLnJlc2lndGVyQ29tbWFuZENsYXNzKEFkZFJlY3QpXHJcbiAgICB0aGlzLnJlc2lndGVyQ29tbWFuZENsYXNzKERNb3ZlKVxyXG4gICAgdGhpcy5yZXNpZ3RlckNvbW1hbmRDbGFzcyhTZXRBdHRyKVxyXG4gICAgdGhpcy5yZXNpZ3RlckNvbW1hbmRDbGFzcyhyZW1vdmVTZWxlY3RlZEVsZW1lbnRzKVxyXG4gIH1cclxuICBzZXRFZGl0b3IoZWRpdG9yKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gIH1cclxuICBleGVjdXRlKG5hbWUsIC4uLmFyZ3MpIHtcclxuICAgIGNvbnN0IENvbW1hbmRDbGFzcyA9IHRoaXMuY29tbWFuZENsYXNzZXNbbmFtZV1cclxuICAgIGlmICghQ29tbWFuZENsYXNzKSB0aHJvdyBuZXcgRXJyb3IoYGVkaXRvciBoYXMgbm90IHRoZSAke25hbWV9IGNvbW1hbmRgKVxyXG4gICAgY29uc3QgY29tbWFuZCA9IG5ldyBDb21tYW5kQ2xhc3ModGhpcy5lZGl0b3IsIC4uLmFyZ3MpIC8vIOWIm+W7uiBjb21tYW5kIOWunuS+i1xyXG5cclxuICAgIHRoaXMudW5kb1N0YWNrLnB1c2goY29tbWFuZClcclxuICAgIHRoaXMucmVkb1N0YWNrID0gW11cclxuICB9XHJcbiAgdW5kbygpIHtcclxuICAgIGlmICh0aGlzLnVuZG9TdGFjay5sZW5ndGggPT09IDApIHtcclxuICAgICAgY29uc29sZS5sb2coJ3VuZG8gc3RhY2sgaXMgZW1wdHksIGNhbiBub3QgdW5kbycpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgY29uc3QgY29tbWFuZCA9IHRoaXMudW5kb1N0YWNrLnBvcCgpXHJcbiAgICB0aGlzLnJlZG9TdGFjay5wdXNoKGNvbW1hbmQpXHJcbiAgICBjb21tYW5kLnVuZG8oKVxyXG4gICAgY29tbWFuZC5hZnRlclVuZG8oKVxyXG4gIH1cclxuICByZWRvKCkge1xyXG4gICAgaWYgKHRoaXMucmVkb1N0YWNrLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjb25zb2xlLmxvZygncmVkbyBzdGFjayBpcyBlbXB0eSwgY2FuIG5vdCByZWRvJylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCBjb21tYW5kID0gdGhpcy5yZWRvU3RhY2sucG9wKClcclxuICAgIHRoaXMudW5kb1N0YWNrLnB1c2goY29tbWFuZClcclxuICAgIGNvbW1hbmQucmVkbygpXHJcbiAgICBjb21tYW5kLmFmdGVyUmVkbygpXHJcbiAgfVxyXG4gIC8vIOazqOWGjOWRveS7pOexu+WIsOWRveS7pOeuoeeQhuWvueixoeS4reOAglxyXG4gIHJlc2lndGVyQ29tbWFuZENsYXNzKGNvbW1hbmRDbGFzcykge1xyXG4gICAgY29uc3QgbmFtZSA9IGNvbW1hbmRDbGFzcy5uYW1lKClcclxuICAgIHRoaXMuY29tbWFuZENsYXNzZXNbbmFtZV0gPSBjb21tYW5kQ2xhc3NcclxuICB9XHJcbiAgYWZ0ZXJBbnlVbmRvKCkge1xyXG5cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbW1hbmRNYW5hZ2VyIiwiaW1wb3J0IHsgRlNWRyB9IGZyb20gXCIuLi9lbGVtZW50XCJcclxuXHJcbmNsYXNzIEJhc2VDb21tYW5kIHtcclxuICB1bmRvKCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdwbGVhc2Ugb3ZlcnJpZGUgdW5kbyBtZXRob2QnKVxyXG4gIH1cclxuICByZWRvKCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdwbGVhc2Ugb3ZlcnJpZGUgcmVkbyBtZXRob2QnKVxyXG4gIH1cclxuICBhZnRlclJlZG8oKSB7fVxyXG4gIGFmdGVyVW5kbygpIHt9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBhZGRSZWN0XHJcbiAqIFxyXG4gKiBhZGQgcmVjdCBzdmcgZWxlbWVudFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFkZFJlY3QgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IoZWRpdG9yLCB4LCB5LCB3LCBoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gICAgY29uc3QgcmVjdCA9IG5ldyBGU1ZHLlJlY3QoeCwgeSwgdywgaClcclxuXHJcbiAgICBjb25zdCBmaWxsID0gZWRpdG9yLnNldHRpbmcuZ2V0KCdmaWxsJylcclxuICAgIGNvbnN0IHN0cm9rZSA9IGVkaXRvci5zZXR0aW5nLmdldCgnc3Ryb2tlJylcclxuICAgIGNvbnN0IHN0cm9rZVdpZHRoID0gZWRpdG9yLnNldHRpbmcuZ2V0KCdzdHJva2VXaWR0aCcpXHJcbiAgICByZWN0LnNldEF0dHIoJ2ZpbGwnLCBmaWxsKVxyXG4gICAgcmVjdC5zZXRBdHRyKCdzdHJva2UnLCBzdHJva2UpXHJcbiAgICByZWN0LnNldEF0dHIoJ3N0cm9rZS13aWR0aCcsIHN0cm9rZVdpZHRoKVxyXG5cclxuICAgIGVkaXRvci5nZXRDdXJyZW50TGF5ZXIoKS5hcHBlbmRDaGlsZChyZWN0LmVsKCkpXHJcblxyXG4gICAgdGhpcy5uZXh0U2libGluZyA9IHJlY3QuZWwoKS5uZXh0RWxlbWVudFNpYmxpbmcgXHJcbiAgICB0aGlzLnBhcmVudCA9IHJlY3QuZWwoKS5wYXJlbnRFbGVtZW50XHJcbiAgICB0aGlzLnJlY3QgPSByZWN0XHJcblxyXG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzKHRoaXMucmVjdClcclxuICB9XHJcbiAgc3RhdGljIG5hbWUoKSB7XHJcbiAgICByZXR1cm4gJ2FkZFJlY3QnXHJcbiAgfVxyXG4gIHJlZG8oKSB7XHJcbiAgICBjb25zdCBlbCA9IHRoaXMucmVjdC5lbCgpXHJcbiAgICBpZiAodGhpcy5uZXh0U2libGluZykge1xyXG4gICAgICB0aGlzLnBhcmVudC5pbnNlcnRCZWZvcmUoZWwsIHRoaXMubmV4dFNpYmxpbmcpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZChlbClcclxuICAgIH1cclxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVscyh0aGlzLnJlY3QpXHJcbiAgfVxyXG4gIHVuZG8oKSB7XHJcbiAgICB0aGlzLnJlY3QuZWwoKS5yZW1vdmUoKVxyXG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuY2xlYXIoKVxyXG4gIH1cclxufVxyXG4vKipcclxuICogcmVtb3ZlIGVsZW1lbnRzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgcmVtb3ZlU2VsZWN0ZWRFbGVtZW50cyBleHRlbmRzIEJhc2VDb21tYW5kIHtcclxuICBjb25zdHJ1Y3RvcihlZGl0b3IpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcblxyXG4gICAgdGhpcy5lbHMgPSB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5nZXRFbHMoKVxyXG5cclxuICAgIGNvbnN0IHNpemUgPSB0aGlzLmVscy5sZW5ndGhcclxuICAgIHRoaXMucGFyZW50cyA9IG5ldyBBcnJheShzaXplKVxyXG4gICAgdGhpcy5uZXh0U2libGluZ3MgPSBuZXcgQXJyYXkoc2l6ZSlcclxuICAgIHRoaXMuZWxzLmZvckVhY2goKGVsLCBpZHgpID0+IHtcclxuICAgICAgdGhpcy5uZXh0U2libGluZ3NbaWR4XSA9IGVsLmVsKCkubmV4dEVsZW1lbnRTaWJsaW5nIFxyXG4gICAgICB0aGlzLnBhcmVudHNbaWR4XSA9IGVsLmVsKCkucGFyZW50RWxlbWVudFxyXG4gICAgfSlcclxuICAgIHRoaXMuZXhlY3V0ZSgpXHJcbiAgfVxyXG4gIHN0YXRpYyBuYW1lKCkge1xyXG4gICAgcmV0dXJuICdyZW1vdmVTZWxlY3RlZEVsZW1lbnRzJ1xyXG4gIH1cclxuICBleGVjdXRlKCkgeyAvLyBwcml2YXRlXHJcbiAgICB0aGlzLmVscy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBpdGVtLnJlbW92ZSgpXHJcbiAgICB9KVxyXG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuY2xlYXIoKVxyXG4gIH1cclxuICByZWRvKCkge1xyXG4gICAgdGhpcy5leGVjdXRlKClcclxuICB9XHJcbiAgdW5kbygpIHtcclxuICAgIGZvciAobGV0IGlkeCA9IHRoaXMuZWxzLmxlbmd0aCAtIDE7IGlkeCA+PSAwOyBpZHgtLSkge1xyXG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbHNbaWR4XVxyXG4gICAgICBjb25zdCBlbCA9IGVsZW1lbnQuZWwoKVxyXG4gICAgICBpZiAodGhpcy5uZXh0U2libGluZ3NbaWR4XSkge1xyXG4gICAgICAgIHRoaXMucGFyZW50c1tpZHhdLmluc2VydEJlZm9yZShlbCwgdGhpcy5uZXh0U2libGluZ3NbaWR4XSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBhcmVudHNbaWR4XS5hcHBlbmRDaGlsZChlbClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVscyh0aGlzLmVscylcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBETW92ZVxyXG4gKiBcclxuICogZG1vdmUgZWxlbWVudHNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBETW92ZSBleHRlbmRzIEJhc2VDb21tYW5kIHtcclxuICBjb25zdHJ1Y3RvcihlZGl0b3IsIGVscywgZHgsIGR5KSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gICAgdGhpcy5keCA9IGR4XHJcbiAgICB0aGlzLmR5ID0gZHlcclxuICAgIHRoaXMuZWxzID0gZWxzXHJcblxyXG4gICAgdGhpcy5lbHMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgIGVsLmRtb3ZlKHRoaXMuZHgsIHRoaXMuZHkpXHJcbiAgICB9KVxyXG4gIH1cclxuICBzdGF0aWMgbmFtZSgpIHtcclxuICAgIHJldHVybiAnZG1vdmUnXHJcbiAgfVxyXG4gIHJlZG8oKSB7XHJcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgZWwuZG1vdmUodGhpcy5keCwgdGhpcy5keSlcclxuICAgIH0pXHJcbiAgfVxyXG4gIHVuZG8oKSB7XHJcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgZWwuZG1vdmUoLXRoaXMuZHgsIC10aGlzLmR5KVxyXG4gICAgfSlcclxuICB9XHJcbiAgYWZ0ZXJSZWRvKCkge1xyXG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzKHRoaXMuZWxzKVxyXG4gIH1cclxuICBhZnRlclVuZG8oKSB7XHJcbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHModGhpcy5lbHMpXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogc2V0QXR0clxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNldEF0dHIgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IoZWRpdG9yLCBlbHMsIGF0dHJOYW1lLCB2YWwpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxzKSkgZWxzID0gW2Vsc11cclxuICAgIHRoaXMuZWxzID0gZWxzXHJcbiAgICB0aGlzLmF0dHJOYW1lID0gYXR0ck5hbWVcclxuICAgIHRoaXMuYmVmb3JlVmFsID0gdGhpcy5lbHMubWFwKGVsID0+IGVsLmdldEF0dHIoYXR0ck5hbWUpKVxyXG4gICAgdGhpcy5hZnRlclZhbCA9IHZhbFxyXG5cclxuICAgIHRoaXMuZWxzLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICBlbC5zZXRBdHRyKGF0dHJOYW1lLCB2YWwpXHJcbiAgICB9KVxyXG4gIH1cclxuICBzdGF0aWMgbmFtZSgpIHtcclxuICAgIHJldHVybiAnc2V0QXR0cidcclxuICB9XHJcbiAgcmVkbygpIHtcclxuICAgIHRoaXMuZWxzLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICBlbC5zZXRBdHRyKHRoaXMuYXR0ck5hbWUsIHRoaXMuYWZ0ZXJWYWwpXHJcbiAgICB9KVxyXG4gIH1cclxuICB1bmRvKCkge1xyXG4gICAgdGhpcy5lbHMuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgZWwuc2V0QXR0cih0aGlzLmF0dHJOYW1lLCB0aGlzLmJlZm9yZVZhbFtpXSlcclxuICAgIH0pXHJcbiAgfVxyXG59IiwiLy8g5bi46YePXHJcblxyXG5jb25zdCBOUyA9IHtcclxuICBIVE1MOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsXHJcbiAgTUFUSDogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwnLFxyXG4gIFNFOiAnaHR0cDovL3N2Zy1lZGl0Lmdvb2dsZWNvZGUuY29tJyxcclxuICBTVkc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXHJcbiAgWExJTks6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyxcclxuICBYTUw6ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnLFxyXG4gIFhNTE5TOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nIC8vIHNlZSBodHRwOi8vd3d3LnczLm9yZy9UUi9SRUMteG1sLW5hbWVzLyN4bWxSZXNlcnZlZFxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBOUyxcclxufSBcclxuXHJcblxyXG5cclxuIiwiZXhwb3J0IGNvbnN0IGlzRGVidWcgPSB0cnVlXHJcbiIsImltcG9ydCB7IEFjdGl2ZWRFbHNNYW5hZ2VyIH0gZnJvbSBcIi4vYWN0aXZlZEVsc01hbmFnZXJcIlxyXG5pbXBvcnQgeyBFZGl0b3JFdmVudENvbnRleHQgfSBmcm9tIFwiLi9lZGl0b3JFdmVudENvbnRleHRcIlxyXG5pbXBvcnQgeyBIdWRNYW5hZ2VyIH0gZnJvbSBcIi4vbGF5ZXIvaHVkTWFuYWdlclwiXHJcbmltcG9ydCB7IFNob3J0Y3V0IH0gZnJvbSBcIi4vc2hvcnRjdXRcIlxyXG5cclxuY2xhc3MgRWRpdG9yIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuc2V0dGluZyA9IG51bGxcclxuICAgIHRoaXMuY29tbWFuZE1hbmFnZXIgPSBudWxsXHJcbiAgICB0aGlzLnpvb21NYW5hZ2VyID0gbnVsbFxyXG4gICAgdGhpcy5hY3RpdmVkRWxzTWFuYWdlciA9IG5ldyBBY3RpdmVkRWxzTWFuYWdlcih0aGlzKVxyXG4gICAgdGhpcy5zaG9ydGN1dCA9IG5ldyBTaG9ydGN1dCh0aGlzKVxyXG5cclxuICAgIC8vIGNvbnN0IGNvbnRlbnRXaWR0aCA9IDQwMFxyXG4gICAgLy8gY29uc3QgY29udGVudEhlaWdodCA9IDMwMFxyXG4gICAgLy8gY29uc3Qgc3RhZ2VXaWR0aCA9IDEwMDAgLy8g5q2j5Zyo57qg57uT5ZG95ZCNXHJcbiAgICAvLyBjb25zdCBzdGFnZUhlaWdodCA9IDYwMFxyXG4gICAgY29uc3Qgdmlld3BvcnRXaWR0aCA9IDgwMFxyXG4gICAgY29uc3Qgdmlld3BvcnRIZWlnaHQgPSA1NTBcclxuXHJcbiAgICBjb25zdCB2aWV3cG9ydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICB2aWV3cG9ydC5pZCA9ICd2aWV3cG9ydCdcclxuICAgIHZpZXdwb3J0LnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgIzAwMCdcclxuICAgIHZpZXdwb3J0LnN0eWxlLndpZHRoID0gdmlld3BvcnRXaWR0aCArICdweCdcclxuICAgIHZpZXdwb3J0LnN0eWxlLmhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0ICsgJ3B4J1xyXG4gICAgdGhpcy52aWV3cG9ydCA9IHZpZXdwb3J0XHJcbiAgICBcclxuICAgIGNvbnN0IHN2Z0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICBzdmdDb250YWluZXIuaWQgPSAnc3ZnLWNvbnRhaW5lcidcclxuICAgIHN2Z0NvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2RkZCdcclxuICAgIHN2Z0NvbnRhaW5lci5zdHlsZS53aWR0aCA9IHZpZXdwb3J0V2lkdGggKyAncHgnXHJcbiAgICBzdmdDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gdmlld3BvcnRIZWlnaHQgKyAncHgnXHJcbiAgICBzdmdDb250YWluZXIuc3R5bGUub3ZlcmZsb3cgPSAnc2Nyb2xsJ1xyXG4gICAgdGhpcy5zdmdDb250YWluZXIgPSBzdmdDb250YWluZXJcclxuXHJcbiAgICBjb25zdCBzdmdSb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKVxyXG4gICAgc3ZnUm9vdC5pZCA9ICdzdmctcm9vdCdcclxuICAgIHN2Z1Jvb3Quc2V0QXR0cmlidXRlKCd3aWR0aCcsIDEwMDApXHJcbiAgICBzdmdSb290LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgNjAwKVxyXG4gICAgc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDEwMDAgNjAwJylcclxuICAgIHRoaXMuc3ZnUm9vdCA9IHN2Z1Jvb3RcclxuXHJcbiAgICBjb25zdCBzdmdTdGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJylcclxuICAgIHN2Z1N0YWdlLmlkID0gJ3N2Zy1zdGFnZSdcclxuICAgIHN2Z1N0YWdlLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCA0MDApXHJcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDMwMClcclxuICAgIHN2Z1N0YWdlLnNldEF0dHJpYnV0ZSgneCcsIDMwMClcclxuICAgIHN2Z1N0YWdlLnNldEF0dHJpYnV0ZSgneScsIDE1MClcclxuICAgIHN2Z1N0YWdlLnN0eWxlLm92ZXJmbG93ID0gJ3Zpc2libGUnXHJcbiAgICB0aGlzLnN2Z1N0YWdlID0gc3ZnU3RhZ2VcclxuXHJcbiAgICBjb25zdCBzdmdCZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnZycpXHJcbiAgICBzdmdCZy5pZCA9ICdiYWNrZ3JvdW5kJ1xyXG4gICAgLy8gc3ZnQmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsIDQwMClcclxuICAgIC8vIHN2Z0JnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgMzAwKVxyXG4gICAgc3ZnQmcuc2V0QXR0cmlidXRlKCd4JywgMClcclxuICAgIHN2Z0JnLnNldEF0dHJpYnV0ZSgneScsIDApXHJcblxyXG4gICAgY29uc3QgYmdSZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdyZWN0JylcclxuICAgIGJnUmVjdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKVxyXG4gICAgYmdSZWN0LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzEwMCUnKVxyXG4gICAgYmdSZWN0LnNldEF0dHJpYnV0ZSgnZmlsbCcsICcjZmZmJylcclxuXHJcbiAgICBjb25zdCBzdmdDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJylcclxuICAgIHN2Z0NvbnRlbnQuaWQgPSAnY29udGVudCdcclxuICAgIC8vIHN2Z0NvbnRlbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsIDQwMClcclxuICAgIC8vIHN2Z0NvbnRlbnQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAzMDApXHJcbiAgICBzdmdDb250ZW50LnNldEF0dHJpYnV0ZSgneCcsIDApXHJcbiAgICBzdmdDb250ZW50LnNldEF0dHJpYnV0ZSgneScsIDApXHJcbiAgICB0aGlzLnN2Z0NvbnRlbnQgPSBzdmdDb250ZW50XHJcblxyXG4gICAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2cnKVxyXG4gICAgbGF5ZXIuaWQgPSAnbGF5ZXItMSdcclxuICAgIHRoaXMuY3VycmVudExheWVyID0gbGF5ZXJcclxuXHJcbiAgICB2aWV3cG9ydC5hcHBlbmRDaGlsZChzdmdDb250YWluZXIpXHJcbiAgICBzdmdDb250YWluZXIuYXBwZW5kQ2hpbGQoc3ZnUm9vdClcclxuICAgIHN2Z1Jvb3QuYXBwZW5kQ2hpbGQoc3ZnU3RhZ2UpXHJcblxyXG4gICAgc3ZnU3RhZ2UuYXBwZW5kQ2hpbGQoc3ZnQmcpXHJcbiAgICBzdmdCZy5hcHBlbmRDaGlsZChiZ1JlY3QpXHJcbiAgICBzdmdTdGFnZS5hcHBlbmRDaGlsZChzdmdDb250ZW50KVxyXG4gICAgc3ZnQ29udGVudC5hcHBlbmRDaGlsZChsYXllcilcclxuXHJcblxyXG4gICAgdGhpcy5odWRNYW5hZ2VyID0gbmV3IEh1ZE1hbmFnZXIoKVxyXG4gICAgdGhpcy5odWRNYW5hZ2VyLm1vdW50KHN2Z1N0YWdlKVxyXG5cclxuICAgIC8vIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpXHJcbiAgfVxyXG4gIG1vdW50KHNlbGVjdG9yKSB7XHJcbiAgICBjb25zdCBtb3VudE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxyXG4gICAgbW91bnROb2RlLmFwcGVuZENoaWxkKHRoaXMudmlld3BvcnQpXHJcbiAgfVxyXG4gIGdldEN1cnJlbnRMYXllcigpIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRMYXllclxyXG4gIH1cclxuXHJcbiAgc2V0VG9vbE1hbmFnZXIodG9vbE1hbmFnZXIpIHtcclxuICAgIHRoaXMudG9vbE1hbmFnZXIgPSB0b29sTWFuYWdlclxyXG4gIH1cclxuICAvLyB0b29sIHJlbGF0aXZlZCBtZXRob2RzXHJcbiAgc2V0Q3VycmVudFRvb2wobmFtZSkge1xyXG4gICAgdGhpcy50b29sTWFuYWdlci5zZXRDdXJyZW50VG9vbChuYW1lKVxyXG4gIH1cclxuICByZWdpc3RlclRvb2wodG9vbCkge1xyXG4gICAgdGhpcy50b29sTWFuYWdlci5yZWdpc3RlclRvb2wodG9vbClcclxuICB9XHJcbiAgc2V0U2V0dGluZyhzZXR0aW5nKSB7XHJcbiAgICB0aGlzLnNldHRpbmcgPSBzZXR0aW5nXHJcbiAgfVxyXG5cclxuICAvLyDlkb3ku6Tnm7jlhbNcclxuICBzZXRDb21tYW5kTWFuYWdlcihjb21tYW5kTWFuYWdlcikge1xyXG4gICAgdGhpcy5jb21tYW5kTWFuYWdlciA9IGNvbW1hbmRNYW5hZ2VyXHJcbiAgfVxyXG4gIGV4ZWN1dGVDb21tYW5kKG5hbWUsIC4uLnBhcmFtcykge1xyXG4gICAgaWYgKG5hbWUgPT0gJ3VuZG8nKSB7XHJcbiAgICAgIHRoaXMuY29tbWFuZE1hbmFnZXIudW5kbygpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgaWYgKG5hbWUgPT0gJ3JlZG8nKSB7XHJcbiAgICAgIHRoaXMuY29tbWFuZE1hbmFnZXIucmVkbygpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgdGhpcy5jb21tYW5kTWFuYWdlci5leGVjdXRlKG5hbWUsIC4uLnBhcmFtcylcclxuICB9XHJcblxyXG4gIC8vIHpvb21cclxuICBzZXRab29tTWFuYWdlcih6b29tTWFuYWdlcikge1xyXG4gICAgem9vbU1hbmFnZXIuc2V0RWRpdG9yKHRoaXMpXHJcbiAgICB0aGlzLnpvb21NYW5hZ2VyID0gem9vbU1hbmFnZXJcclxuICB9XHJcbiAgZ2V0Wm9vbSgpIHsgLy8g5bCB6KOFXHJcbiAgICByZXR1cm4gdGhpcy56b29tTWFuYWdlci5nZXRab29tKClcclxuICB9XHJcblxyXG4gIGdldFNjcm9sbCgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IHRoaXMuc3ZnQ29udGFpbmVyLnNjcm9sbExlZnQsXHJcbiAgICAgIHk6IHRoaXMuc3ZnQ29udGFpbmVyLnNjcm9sbFRvcCxcclxuICAgIH1cclxuICB9XHJcbiAgc2V0U2Nyb2xsKHgsIHkpIHtcclxuICAgIHRoaXMuc3ZnQ29udGFpbmVyLnNjcm9sbExlZnQgPSB4XHJcbiAgICB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxUb3AgPSB5XHJcbiAgfVxyXG4gIGdldENvbnRlbnRPZmZzZXQoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiB0aGlzLnN2Z1N0YWdlLmdldEF0dHJpYnV0ZSgneCcpLFxyXG4gICAgICB5OiB0aGlzLnN2Z1N0YWdlLmdldEF0dHJpYnV0ZSgneScpLFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNDb250ZW50RWxlbWVudChlbCkge1xyXG4gICAgd2hpbGUgKGVsKSB7XHJcbiAgICAgIGlmIChlbC5wYXJlbnRFbGVtZW50ID09IHRoaXMuc3ZnQ29udGVudCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVsLnBhcmVudEVsZW1lbnQgPT0gdGhpcy5zdmdSb290KSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVkaXRvclxyXG4iLCJcclxuLyoqXHJcbiAqIGNvbnRleHQgY2xhc3NcclxuICogXHJcbiAqIHVzZWQgZm9yIHRvb2wgZXZlbnRcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgRWRpdG9yRXZlbnRDb250ZXh0IHtcclxuICBjb25zdHJ1Y3RvcihlZGl0b3IsIGUpIHtcclxuICAgIHRoaXMubW91c2VQcmVzc2VkID0gZmFsc2VcclxuICAgIHRoaXMub3JpZ2luRXZlbnQgPSBlXHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gICAgdGhpcy5pc0VuZEluc2lkZSA9IGZhbHNlXHJcblxyXG4gICAgdGhpcy5zdGFydFggPSAwXHJcbiAgICB0aGlzLnN0YXJ0WSA9IDBcclxuXHJcbiAgICB0aGlzLm9mZnNldFggPSAwXHJcbiAgICB0aGlzLm9mZnNldFkgPSAwXHJcblxyXG4gICAgdGhpcy5zdGFydENsaWVudFggPSAwIC8vIHVzZWQgdG8gY2FsYyBkeCBhbmQgZHkuXHJcbiAgICB0aGlzLnN0YXJ0Q2xpZW50WSA9IDBcclxuICAgIHRoaXMuZHggPSAwXHJcbiAgICB0aGlzLmR5ID0gMFxyXG5cclxuICAgIHRoaXMuc2V0U3RhcnRQb3MoKVxyXG4gIH1cclxuICBzZXRPcmlnaW5FdmVudChlKSB7XHJcbiAgICB0aGlzLm9yaWdpbkV2ZW50ID0gZVxyXG4gIH1cclxuICBzZXRTdGFydFBvcygpIHtcclxuICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5nZXRQb3MoKVxyXG5cclxuICAgIHRoaXMuc3RhcnRYID0geFxyXG4gICAgdGhpcy5zdGFydFkgPSB5XHJcblxyXG4gICAgdGhpcy5zdGFydENsaWVudFggPSB0aGlzLm9yaWdpbkV2ZW50LmNsaWVudFhcclxuICAgIHRoaXMuc3RhcnRDbGllbnRZID0gdGhpcy5vcmlnaW5FdmVudC5jbGllbnRZXHJcbiAgfVxyXG4gIHJlbGVhc2VNb3VzZSgpIHtcclxuICAgIHRoaXMubW91c2VQcmVzc2VkID0gZmFsc2VcclxuICB9XHJcbiAgcHJlc3NNb3VzZSgpIHtcclxuICAgIHRoaXMubW91c2VQcmVzc2VkID0gdHJ1ZVxyXG4gIH1cclxuICBnZXRQb3MoKSB7XHJcbiAgICBjb25zdCB6b29tID0gdGhpcy5lZGl0b3IuZ2V0Wm9vbSgpXHJcbiAgICBjb25zdCB7eCwgeX0gPSB0aGlzLmVkaXRvci5nZXRDb250ZW50T2Zmc2V0KClcclxuICAgIHJldHVybiB7IFxyXG4gICAgICB4OiB0aGlzLm9yaWdpbkV2ZW50Lm9mZnNldFggLyB6b29tIC0geCwgXHJcbiAgICAgIHk6IHRoaXMub3JpZ2luRXZlbnQub2Zmc2V0WSAvIHpvb20gLSB5LFxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRTdGFydFBvcygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IHRoaXMuc3RhcnRYLFxyXG4gICAgICB5OiB0aGlzLnN0YXJ0WSxcclxuICAgIH1cclxuICB9XHJcbiAgLy8gd2l0aG91dCBjYWxjIHdpdGggem9vbSB2YWx1ZVxyXG4gIGdldERpZmZQb3MoKSB7XHJcbiAgICBjb25zdCB4ID0gdGhpcy5vcmlnaW5FdmVudC5jbGllbnRYIC0gdGhpcy5zdGFydENsaWVudFhcclxuICAgIGNvbnN0IHkgPSB0aGlzLm9yaWdpbkV2ZW50LmNsaWVudFkgLSB0aGlzLnN0YXJ0Q2xpZW50WVxyXG4gICAgcmV0dXJuIHsgeCwgeSB9XHJcbiAgfVxyXG5cclxufSIsIlxyXG4vKipcclxuICog5a+5IFNWRyDlhYPntKDnmoTnroDljZXlsIHoo4VcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgRkVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5lbF8gPSBudWxsXHJcbiAgfVxyXG4gIGVsKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxfXHJcbiAgfVxyXG4gIHNldEF0dHIocHJvcCwgdmFsKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbF8uc2V0QXR0cmlidXRlKHByb3AsIHZhbClcclxuICB9XHJcbiAgZ2V0QXR0cihwcm9wKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbF8uZ2V0QXR0cmlidXRlKHByb3ApXHJcbiAgfVxyXG4gIGdldEJCb3goKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbF8uZ2V0QkJveCgpXHJcbiAgfVxyXG4gIHJlbW92ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmVsXy5yZW1vdmUoKVxyXG4gIH1cclxuIH0iLCJcclxuZXhwb3J0IGNsYXNzIEJveCB7XHJcbiAgY29uc3RydWN0b3IoeCwgeSwgdywgaCkge1xyXG4gICAgaWYgKHR5cGVvZiB4ID09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRoaXMueCA9IHgueFxyXG4gICAgICB0aGlzLnkgPSB4LnlcclxuICAgICAgdGhpcy53ID0geC53aWR0aFxyXG4gICAgICB0aGlzLmggPSB4LmhlaWdodFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy54ID0geFxyXG4gICAgICB0aGlzLnkgPSB5XHJcbiAgICAgIHRoaXMudyA9IHdcclxuICAgICAgdGhpcy5oID0gaFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMud2lkdGggPSB0aGlzLndcclxuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5oXHJcbiAgICB0aGlzLngyID0gdGhpcy54ICsgdGhpcy53XHJcbiAgICB0aGlzLnkyID0gdGhpcy55ICsgdGhpcy5oXHJcbiAgfVxyXG4gIGNvbnRhaW5zKG90aGVyQm94KSB7XHJcbiAgICByZXR1cm4gdGhpcy54IDw9IG90aGVyQm94LnggJiYgdGhpcy55IDw9IG90aGVyQm94LnkgJiZcclxuICAgICAgdGhpcy54MiA+PSBvdGhlckJveC54ICsgb3RoZXJCb3gud2lkdGggJiYgdGhpcy55MiA+PSBvdGhlckJveC55ICsgb3RoZXJCb3guaGVpZ2h0XHJcbiAgfVxyXG5cclxuICBtZXJnZShvdGhlckJveCkge1xyXG4gICAgY29uc3QgeCA9IE1hdGgubWluKHRoaXMueCwgb3RoZXJCb3gueClcclxuICAgIGNvbnN0IHkgPSBNYXRoLm1pbih0aGlzLnksIG90aGVyQm94LnkpXHJcbiAgICBjb25zdCB4MiA9IE1hdGgubWF4KHRoaXMueDIsIG90aGVyQm94LngyKVxyXG4gICAgY29uc3QgeTIgPSBNYXRoLm1heCh0aGlzLnkyLCBvdGhlckJveC55MilcclxuICAgIGNvbnN0IHcgPSB4MiAtIHhcclxuICAgIGNvbnN0IGggPSB5MiAtIHlcclxuICAgIHJldHVybiBuZXcgQm94KHgsIHksIHcsIGgpXHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgQm94IH0gZnJvbSBcIi4vYm94XCJcclxuaW1wb3J0IHsgUmVjdCB9IGZyb20gXCIuL3JlY3RcIlxyXG5cclxuXHJcbi8qKlxyXG4gKiBGU1ZHXHJcbiAqIFxyXG4gKiBzaW1wbGUgU1ZHRWxlbWVudCBlbmNhcHN1bGF0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGUoZWwpIHtcclxuICBjb25zdCB0YWdOYW1lID0gZWwudGFnTmFtZVxyXG4gIGlmICh0YWdOYW1lID09PSAncmVjdCcpIHtcclxuICAgIHJldHVybiBuZXcgRlNWRy5SZWN0KGVsKVxyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgQ2FuIG5vdCBjcmVhdCAke3RhZ05hbWV9IGluc3RhbmNlLCBubyBtYXRjaCBjbGFzcy5gKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEZTVkcgPSB7XHJcbiAgY3JlYXRlLFxyXG4gIFJlY3QsXHJcbiAgQm94LFxyXG59IiwiXHJcbi8qKlxyXG4gKiDlr7kgcmVjdCDlhYPntKDnmoTnroDljZXlsIHoo4VcclxuICovXHJcblxyXG5pbXBvcnQgeyBOUyB9IGZyb20gXCIuLi9jb25zdGFudHNcIlxyXG5pbXBvcnQgeyBGRWxlbWVudCB9IGZyb20gXCIuL2Jhc2VFbGVtZW50XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWN0IGV4dGVuZHMgRkVsZW1lbnQge1xyXG4gIC8vIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlcik7XHJcbiAgLy8gY29uc3RydWN0b3IoZWw6IFNWR0VsZW1lbnQpO1xyXG4gIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgpIHtcclxuICAgIHN1cGVyKClcclxuICAgIGlmICh0eXBlb2YgeCA9PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aGlzLmVsXyA9IHhcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWxfID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ3JlY3QnKVxyXG4gICAgICB0aGlzLnNldEF0dHIoJ3gnLCB4KVxyXG4gICAgICB0aGlzLnNldEF0dHIoJ3knLCB5KVxyXG4gICAgICB0aGlzLnNldEF0dHIoJ3dpZHRoJywgdylcclxuICAgICAgdGhpcy5zZXRBdHRyKCdoZWlnaHQnLCBoKVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRQb3MoKSB7XHJcbiAgICBjb25zdCB4ID0gcGFyc2VGbG9hdCh0aGlzLmdldEF0dHIoJ3gnKSlcclxuICAgIGNvbnN0IHkgPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cigneScpKVxyXG4gICAgcmV0dXJuIHsgeCwgeSB9XHJcbiAgfVxyXG4gIGRtb3ZlKGR4LCBkeSkge1xyXG4gICAgY29uc3QgcG9zID0gdGhpcy5nZXRQb3MoKVxyXG4gICAgdGhpcy5zZXRBdHRyKCd4JywgcG9zLnggKyBkeClcclxuICAgIHRoaXMuc2V0QXR0cigneScsIHBvcy55ICsgZHkpXHJcbiAgfVxyXG59IiwiLyoqXHJcbiAqIGd1aWRlIGxpbmUgbGF5ZXJcclxuICovXHJcblxyXG5pbXBvcnQgeyBPdXRsaW5lQm94SHVkIH0gZnJvbSBcIi4vb3V0bGluZUJveEh1ZFwiO1xyXG5pbXBvcnQgeyBTZWxlY3RBcmVhIH0gZnJvbSBcIi4vc2VsZWN0QXJlYVwiO1xyXG5jb25zdCB7IE5TIH0gPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEh1ZE1hbmFnZXJ7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdnJylcclxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gJ2h1ZHMnXHJcblxyXG4gICAgdGhpcy5zZWxlY3RBcmVhID0gbmV3IFNlbGVjdEFyZWEodGhpcy5jb250YWluZXIpXHJcbiAgICB0aGlzLm91dGxpbmVCb3hIdWQgPSBuZXcgT3V0bGluZUJveEh1ZCh0aGlzLmNvbnRhaW5lcilcclxuICB9XHJcbiAgbW91bnQoZWwpIHtcclxuICAgIGVsLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKVxyXG4gIH1cclxufVxyXG5cclxuIiwiLyoqXHJcbiAqIGVsZW1lbnRzIG91dGxpbmUgYm94XHJcbiAqIFxyXG4gKi9cclxuXHJcbmNvbnN0IHsgTlMgfSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgT3V0bGluZUJveEh1ZCB7XHJcbiAgY29uc3RydWN0b3IocGFyZW50KSB7XHJcbiAgICB0aGlzLnggPSAwXHJcbiAgICB0aGlzLnkgPSAwXHJcbiAgICB0aGlzLncgPSAwXHJcbiAgICB0aGlzLmggPSAwXHJcblxyXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAnZycpXHJcbiAgICB0aGlzLmNvbnRhaW5lci5pZCA9ICdvdXRsaW5lLWJveC1odWQnXHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpXHJcblxyXG4gICAgdGhpcy5vdXRsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ3BhdGgnKVxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJylcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICcjZjA0JylcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3ZlY3Rvci1lZmZlY3QnLCAnbm9uLXNjYWxpbmctc3Ryb2tlJylcclxuXHJcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLm91dGxpbmUpXHJcbiAgfVxyXG4gIGNsZWFyKCkge1xyXG4gICAgLy8gcGFyZW50LmlubmVySFRNTCA9ICcnXHJcbiAgICB0aGlzLm91dGxpbmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gIH1cclxuICBkcmF3UmVjdCh4LCB5LCB3LCBoKSB7XHJcbiAgICB0aGlzLnggPSB4XHJcbiAgICB0aGlzLnkgPSB5XHJcbiAgICB0aGlzLncgPSB3XHJcbiAgICB0aGlzLmggPSBoXHJcblxyXG4gICAgLy8gd2h5IGRvbid0IEkgdXNlIHJlY3QsIGp1c3Qgc29sdmUgdGhlIGNvbmRpdGlvbiB3aGVuIHdpZHRoIG9yIGhlaWdodCBpcyAwIHRoZSBvdXRsaW5lIGlzIGRpc2FwcGVyXHJcbiAgICBjb25zdCBkID0gYE0gJHt4fSAke3l9IEwgJHt4K3d9ICR7eX0gTCAke3grd30gJHt5K2h9IEwgJHt4fSAke3kraH0gWmBcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2QnLCBkKVxyXG4gICAgdGhpcy5vdXRsaW5lLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gIH1cclxuICBnZXRXaWR0aCgpIHsgcmV0dXJuIHRoaXMudyB9XHJcbiAgZ2V0SGVpZ2h0KCkgeyByZXR1cm4gdGhpcy5oIH1cclxuICBnZXRYKCkgeyByZXR1cm4gdGhpcy54IH1cclxuICBnZXRZKCkgeyByZXR1cm4gdGhpcy55IH1cclxufSIsIlxyXG5jb25zdCB7IE5TIH0gPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzXCIpO1xyXG5cclxuLyoqXHJcbiAqIHNlbGVjdCBhcmVhXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VsZWN0QXJlYSB7XHJcbiAgY29uc3RydWN0b3IocGFyZW50KSB7XHJcbiAgICB0aGlzLnggPSAwXHJcbiAgICB0aGlzLnkgPSAwXHJcbiAgICB0aGlzLncgPSAwXHJcbiAgICB0aGlzLmggPSAwXHJcblxyXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAnZycpXHJcbiAgICB0aGlzLmNvbnRhaW5lci5pZCA9ICdzZWxlY3QtYXJlYSdcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcilcclxuXHJcbiAgICB0aGlzLm91dGxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAncGF0aCcpXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKVxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJyMwNTQnKVxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgndmVjdG9yLWVmZmVjdCcsICdub24tc2NhbGluZy1zdHJva2UnKVxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLWRhc2hhcnJheScsICc0cHgnKVxyXG5cclxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMub3V0bGluZSlcclxuICB9XHJcbiAgY2xlYXIoKSB7XHJcbiAgICAvLyBwYXJlbnQuaW5uZXJIVE1MID0gJydcclxuICAgIHRoaXMueCA9IHRoaXMueSA9IHRoaXMudyA9IHRoaXMuaCA9IDBcclxuICAgIHRoaXMub3V0bGluZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgfVxyXG4gIGRyYXdSZWN0KHgsIHksIHcsIGgpIHtcclxuICAgIHRoaXMueCA9IHhcclxuICAgIHRoaXMueSA9IHlcclxuICAgIHRoaXMudyA9IHdcclxuICAgIHRoaXMuaCA9IGhcclxuXHJcbiAgICAvLyB3aHkgZG9uJ3QgSSB1c2UgcmVjdCwganVzdCBzb2x2ZSB0aGUgY29uZGl0aW9uIHdoZW4gd2lkdGggb3IgaGVpZ2h0IGlzIDAgdGhlIG91dGxpbmUgaXMgZGlzYXBwZXJcclxuICAgIGNvbnN0IGQgPSBgTSAke3h9ICR7eX0gTCAke3grd30gJHt5fSBMICR7eCt3fSAke3kraH0gTCAke3h9ICR7eStofSBaYFxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZCcsIGQpXHJcblxyXG4gICAgLyogdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgneCcsIHgpXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd5JywgeSlcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdylcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGgpICovXHJcbiAgICB0aGlzLm91dGxpbmUuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgfVxyXG4gIGdldFdpZHRoKCkgeyByZXR1cm4gdGhpcy53IH1cclxuICBnZXRIZWlnaHQoKSB7IHJldHVybiB0aGlzLmggfVxyXG4gIGdldFgoKSB7IHJldHVybiB0aGlzLnggfVxyXG4gIGdldFkoKSB7IHJldHVybiB0aGlzLnkgfVxyXG4gIGdldEJveCgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IHRoaXMueCxcclxuICAgICAgeTogdGhpcy55LFxyXG4gICAgICB3aWR0aDogdGhpcy53LFxyXG4gICAgICBoZWlnaHQ6IHRoaXMuaCxcclxuICAgICAgdzogdGhpcy53LFxyXG4gICAgICBoOiB0aGlzLmgsXHJcbiAgICB9XHJcbiAgfVxyXG59IiwiXHJcbmltcG9ydCB7IGdldEJveEJ5MnBvaW50cyB9IGZyb20gXCIuLi91dGlsL21hdGhcIlxyXG5cclxuY2xhc3MgQWRkUmVjdCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcclxuICB9XHJcbiAgbmFtZSgpIHtcclxuICAgIHJldHVybiAnYWRkUmVjdCdcclxuICB9XHJcbiAgc2V0RWRpdG9yKGVkaXRvcikgeyAvLyDkvp3otZbms6jlhaVcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgfVxyXG4gIHN0YXJ0KGN0eCkge31cclxuICBtb3ZlKGN0eCkge1xyXG4gICAgY29uc3QgeyB4OiBlbmRYLCB5OiBlbmRZIH0gPSBjdHguZ2V0UG9zKClcclxuICAgIGNvbnN0IHsgeDogc3RhcnRYLCB5OiBzdGFydFkgfSA9IGN0eC5nZXRTdGFydFBvcygpXHJcbiAgICBjb25zdCB7IHgsIHksIHcsIGggfSA9IGdldEJveEJ5MnBvaW50cyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSlcclxuICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIub3V0bGluZUJveEh1ZC5kcmF3UmVjdCh4LCB5LCB3LCBoKVxyXG4gIH1cclxuICBlbmQoY3R4KSB7XHJcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVCb3hIdWQuY2xlYXIoKVxyXG5cclxuICAgIGNvbnN0IHsgeDogZW5kWCwgeTogZW5kWSB9ID0gY3R4LmdldFBvcygpXHJcbiAgICBjb25zdCB7IHg6IHN0YXJ0WCwgeTogc3RhcnRZIH0gPSBjdHguZ2V0U3RhcnRQb3MoKVxyXG4gICAgY29uc3QgeyB4LCB5LCB3LCBoIH0gPSBnZXRCb3hCeTJwb2ludHMoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpXHJcbiAgICBpZiAodyA8IDIgJiYgaCA8IDIpIHtcclxuICAgICAgLy8gVE9ETzogb3BlbiBhIGRpYWxvZyB0byBpbnB1dCB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgICAgIGNvbnNvbGUubG9nKCd3aWR0aCBhbmQgaGVpZ2h0IGJvdGggbGVzcyBlcXVhbCB0byAy77yMZHJhd2luZyBub3RoaW5nJylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB0aGlzLmVkaXRvci5leGVjdXRlQ29tbWFuZCgnYWRkUmVjdCcsIHgsIHksIHcsIGgpXHJcbiAgfVxyXG4gIC8vIG1vdXNlZG93biBvdXRzaWRlIHZpZXdwb3J0XHJcbiAgZW5kT3V0c2lkZSgpIHtcclxuICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIub3V0bGluZUJveEh1ZC5jbGVhcigpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBZGRSZWN0IiwiXHJcbmV4cG9ydCBjbGFzcyBEcmFnQ2FudmFzIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuc3RhcnRPZmZzZXRYID0gMFxyXG4gICAgdGhpcy5zdGFydE9mZnNldFkgPSAwXHJcbiAgfVxyXG4gIG5hbWUoKSB7XHJcbiAgICByZXR1cm4gJ2RyYWdDYW52YXMnXHJcbiAgfVxyXG4gIHNldEVkaXRvcihlZGl0b3IpIHsgLy8g5L6d6LWW5rOo5YWlXHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gIH1cclxuICBiZWZvcmVBY3RpdmUoKSB7XHJcbiAgICAvLyBkbyBzb21ldGhpbmcgYmVmb3JlIHN3aXRjaCB0byBjdXJyZW50IHRvb2xcclxuICB9XHJcbiAgc3RhcnQoY3R4KSB7XHJcbiAgICBjb25zdCBzY3JvbGwgPSB0aGlzLmVkaXRvci5nZXRTY3JvbGwoKVxyXG4gICAgdGhpcy5zdGFydE9mZnNldFggPSBzY3JvbGwueFxyXG4gICAgdGhpcy5zdGFydE9mZnNldFkgPSBzY3JvbGwueVxyXG4gIH1cclxuICBtb3ZlKGN0eCkge1xyXG4gICAgY29uc3Qgem9vbSA9IHRoaXMuZWRpdG9yLmdldFpvb20oKVxyXG4gICAgY29uc3QgeyB4OiBkeCwgeTogZHkgfSA9IGN0eC5nZXREaWZmUG9zKClcclxuICAgIHRoaXMuZWRpdG9yLnNldFNjcm9sbCh0aGlzLnN0YXJ0T2Zmc2V0WCAtIGR4LCB0aGlzLnN0YXJ0T2Zmc2V0WSAtIGR5KVxyXG4gIH1cclxuICBlbmQoKSB7fVxyXG4gIGVuZE91dHNpZGUoKSB7fVxyXG59XHJcbiIsImltcG9ydCB7IEZTVkcgfSBmcm9tIFwiLi4vZWxlbWVudFwiXHJcbmltcG9ydCB7IGdldEJveEJ5MnBvaW50cyB9IGZyb20gXCIuLi91dGlsL21hdGhcIlxyXG5cclxuLyoqXHJcbiAqIHNlbGVjdFxyXG4gKiBcclxuICog5q2k5qih5Z2X6Z2e5bi45aSN5p2CXHJcbiAqIFxyXG4gKiAxLiDpvKDmoIfmjInkuIvml7bvvIzpgInkuK3ljZXkuKrlhYPntKBcclxuICogMi4g6byg5qCH5oyJ5LiL5Li656m677yM5ouW5ou95pe25Lqn55Sf6YCJ5Lit5qGG77yM5Y+v5Lul6YCJ5oup5aSa5Liq5YWD57SgXHJcbiAqIDMuIOmAieS4reWNleS4qu+8iOaIlumAieWMuumAieS4reWkmuS4qu+8iSDnvKnmlL4g562J5o6n5Yi254K577yM5ouW5ou95pS55Y+Y5a696auYXHJcbiAqIDMuIOWIh+aWreWIgOi/meS4quW3peWFt+aXtu+8jOa/gOa0u+eahOWFg+e0oOi/m+WFpeiiq+mAieS4reeKtuaAge+8iOi9ruW7k+e6vyvmjqfliLbngrnvvInjgIJcclxuICogNC4g6YCJ5Yy65ZKM5YWD57Sg55u45Lqk55qE5Yik5a6aXHJcbiAqIDUuIOa/gOa0u+WFg+e0oOWmguS9leS/neWtmO+8jOS/neWtmOWIsOWTqumHjFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlbGVjdCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcclxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxyXG5cclxuICAgIHRoaXMub3V0bGluZVN0YXJ0WCA9IDBcclxuICAgIHRoaXMub3V0bGluZVN0YXJ0WSA9IDBcclxuICB9XHJcbiAgbmFtZSgpIHtcclxuICAgIHJldHVybiAnc2VsZWN0J1xyXG4gIH1cclxuICBzZXRFZGl0b3IoZWRpdG9yKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gIH1cclxuICBoYXNTZWxlY3RlZEVsc1doZW5TdGFydCgpIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRWxzLmxlbmd0aCA+IDBcclxuICB9XHJcbiAgc3RhcnQoY3R4KSB7XHJcbiAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gY3R4Lm9yaWdpbkV2ZW50LnRhcmdldFxyXG4gICAgaWYgKCF0aGlzLmVkaXRvci5pc0NvbnRlbnRFbGVtZW50KHRhcmdldEVsZW1lbnQpKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRhcmdldEZFbGVtZW50ID0gRlNWRy5jcmVhdGUodGFyZ2V0RWxlbWVudClcclxuICAgIGNvbnN0IGFjdGl2ZWRFbHNNYW5hZ2VyID0gdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXJcclxuICAgIFxyXG4gICAgaWYgKGFjdGl2ZWRFbHNNYW5hZ2VyLmNvbnRhaW5zKHRhcmdldEVsZW1lbnQpKSB7XHJcbiAgICAgIGFjdGl2ZWRFbHNNYW5hZ2VyLmhlaWdobGlndGhFbHMoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzKHRhcmdldEZFbGVtZW50KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBhY3RpdmVkRWxzTWFuYWdlci5nZXRFbHMoKVxyXG5cclxuICAgIGNvbnN0IG91dGxpbmVCb3hIdWQgPSB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVCb3hIdWRcclxuXHJcbiAgICB0aGlzLm91dGxpbmVTdGFydFggPSBvdXRsaW5lQm94SHVkLmdldFgoKVxyXG4gICAgdGhpcy5vdXRsaW5lU3RhcnRZID0gb3V0bGluZUJveEh1ZC5nZXRZKClcclxuICB9XHJcbiAgbW92ZShjdHgpIHtcclxuICAgIC8vIGRyYXcgc2VsZWN0aW5nIGFyZWFcclxuICAgIGlmICghdGhpcy5oYXNTZWxlY3RlZEVsc1doZW5TdGFydCgpKSB7IFxyXG4gICAgICAvLyBzZWxlY3Qgbm8gZWxlbWVudCwgZHJhdyBzZWxlY3QgcmVjdFxyXG4gICAgICBjb25zdCB7IHg6IGVuZFgsIHk6IGVuZFkgfSA9IGN0eC5nZXRQb3MoKVxyXG4gICAgICBjb25zdCB7IHg6IHN0YXJ0WCwgeTogc3RhcnRZIH0gPSBjdHguZ2V0U3RhcnRQb3MoKVxyXG4gICAgICBjb25zdCB7IHgsIHksIHcsIGggfSA9IGdldEJveEJ5MnBvaW50cyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSlcclxuICAgICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5zZWxlY3RBcmVhLmRyYXdSZWN0KHgsIHksIHcsIGgpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8vIG1vdmUgc2VsZWN0ZWQgZWxlbWVudHNcclxuICAgIGNvbnN0IHsgeDogZHgsIHk6IGR5IH0gPSBjdHguZ2V0RGlmZlBvcygpXHJcbiAgICBjb25zdCBvdXRsaW5lQm94SHVkID0gdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lQm94SHVkXHJcbiAgICBjb25zdCB3ID0gb3V0bGluZUJveEh1ZC5nZXRXaWR0aCgpXHJcbiAgICBjb25zdCBoID0gb3V0bGluZUJveEh1ZC5nZXRIZWlnaHQoKVxyXG4gICAgb3V0bGluZUJveEh1ZC5kcmF3UmVjdCh0aGlzLm91dGxpbmVTdGFydFggKyBkeCwgdGhpcy5vdXRsaW5lU3RhcnRZICsgZHksIHcsIGgpXHJcbiAgfVxyXG4gIGVuZChjdHgpIHtcclxuICAgIGlmICghdGhpcy5oYXNTZWxlY3RlZEVsc1doZW5TdGFydCgpKSB7IC8vIGZpbmlzaGVkIGRyYXduIHNlbGVjdGluZyBhcmVhXHJcbiAgICAgIGNvbnN0IGJveCA9IHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIuc2VsZWN0QXJlYS5nZXRCb3goKVxyXG4gICAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLnNlbGVjdEFyZWEuY2xlYXIoKVxyXG5cclxuICAgICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzSW5Cb3goYm94KVxyXG5cclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVCb3hIdWQuY2xlYXIoKVxyXG5cclxuICAgIFxyXG4gICAgY29uc3QgeyB4OiBkeCwgeTogZHkgfSA9IGN0eC5nZXREaWZmUG9zKClcclxuICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdkbW92ZScsIHRoaXMuc2VsZWN0ZWRFbHMsIGR4LCBkeSlcclxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVscyh0aGlzLnNlbGVjdGVkRWxzKSAvLyBzZXQgZ2xvYmFsIGFjdGl2ZWQgZWxlbWVudHNcclxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxyXG4gIH1cclxuICAvLyBtb3VzZWRvd24gb3V0c2lkZSB2aWV3cG9ydFxyXG4gIGVuZE91dHNpZGUoKSB7XHJcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVCb3hIdWQuY2xlYXIoKVxyXG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5zZWxlY3RBcmVhLmNsZWFyKClcclxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLmNsZWFyKClcclxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxyXG4gIH1cclxufVxyXG4iLCIvKiogem9vbSAqL1xyXG5cclxuY29uc3QgeyBnZXRWaWV3Qm94IH0gPSByZXF1aXJlKFwiLi4vdXRpbC9zdmdcIilcclxuXHJcbmV4cG9ydCBjbGFzcyBab29tTWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcclxuICB9XHJcbiAgc2V0RWRpdG9yKGVkaXRvcikge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICB9XHJcbiAgZ2V0Wm9vbSgpIHtcclxuICAgIGNvbnN0IGFjdHVsV2lkdGggPSBwYXJzZUZsb2F0KHRoaXMuZWRpdG9yLnN2Z1Jvb3QuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKVxyXG4gICAgY29uc3Qgdmlld0JveCA9IGdldFZpZXdCb3godGhpcy5lZGl0b3Iuc3ZnUm9vdClcclxuICAgIGNvbnN0IHpvb20gPSBhY3R1bFdpZHRoIC8gdmlld0JveC53XHJcbiAgICByZXR1cm4gem9vbVxyXG4gIH1cclxuICBzZXRab29tKHpvb20pIHtcclxuICAgIGNvbnNvbGUubG9nKHpvb20pXHJcbiAgICBjb25zdCB2aWV3Qm94ID0gZ2V0Vmlld0JveCh0aGlzLmVkaXRvci5zdmdSb290KVxyXG4gICAgY29uc3Qgd2lkdGggPSB2aWV3Qm94LncgKiB6b29tXHJcbiAgICBjb25zdCBoZWlnaHQgPSB2aWV3Qm94LmggKiB6b29tXHJcbiAgICB0aGlzLmVkaXRvci5zdmdSb290LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aClcclxuICAgIHRoaXMuZWRpdG9yLnN2Z1Jvb3Quc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoZWlnaHQpXHJcbiAgfVxyXG4gIHpvb21JbigpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRab29tID0gdGhpcy5nZXRab29tKClcclxuICAgIHRoaXMuc2V0Wm9vbShjdXJyZW50Wm9vbSArIDAuMSlcclxuICB9XHJcbiAgem9vbU91dCgpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRab29tID0gdGhpcy5nZXRab29tKClcclxuICAgIHRoaXMuc2V0Wm9vbShjdXJyZW50Wm9vbSAtIDAuMSlcclxuICB9XHJcbn0iLCJcclxuZXhwb3J0IGNsYXNzIEVkaXRvclNldHRpbmcge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zZXR0aW5nID0ge1xyXG4gICAgICAvLyBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIC8vIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICAvLyBzdHJva2VXaWR0aDogJzJweCcsXHJcblxyXG4gICAgICAvLyBvdXRsaW5lV2lkdGhcclxuICAgICAgLy8gb3V0bGluZUNvbG9yXHJcbiAgICB9XHJcbiAgICB0aGlzLmJpbmRlZEV2ZW50Rm5zID0ge31cclxuICAgIHRoaXMuc2V0RmlsbCgnI2ZmZicpXHJcbiAgICB0aGlzLnNldFN0cm9rZSgnIzAwMCcpXHJcbiAgICB0aGlzLnNldCgnc3Ryb2tlV2lkdGgnLCAnMXB4JylcclxuICB9XHJcbiAgc2V0RmlsbCh2YWwpIHtcclxuICAgIHRoaXMuc2V0KCdmaWxsJywgdmFsKVxyXG4gIH1cclxuICBzZXRTdHJva2UodmFsKSB7XHJcbiAgICB0aGlzLnNldCgnc3Ryb2tlJywgdmFsKVxyXG4gIH1cclxuICBzZXQobmFtZSwgdmFsKSB7XHJcbiAgICB0aGlzLnNldHRpbmdbbmFtZV0gPSB2YWxcclxuXHJcbiAgICBjb25zdCB0b0NhbGxGbnMgPSB0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdXHJcbiAgICBpZiAodG9DYWxsRm5zKSB7XHJcbiAgICAgIHRvQ2FsbEZucy5mb3JFYWNoKGZuID0+IHtcclxuICAgICAgICBmbih2YWwpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldChuYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5nW25hbWVdXHJcbiAgfVxyXG4gIGJpbmRFdmVudChuYW1lLCBmbikge1xyXG4gICAgaWYgKCF0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdKSB7XHJcbiAgICAgIHRoaXMuYmluZGVkRXZlbnRGbnNbbmFtZV0gPSBbXVxyXG4gICAgfVxyXG4gICAgdGhpcy5iaW5kZWRFdmVudEZuc1tuYW1lXS5wdXNoKGZuKVxyXG4gIH1cclxuICByZW1vdmVFdmVudChuYW1lLCBmbikge1xyXG4gICAgaWYgKCF0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdKSByZXR1cm4gZmFsc2VcclxuXHJcbiAgICBjb25zdCByZW1vdmVGbklkeCA9IHRoaXMuYmluZGVkRXZlbnRGbnNbbmFtZV0uZmluZEluZGV4KGZuKVxyXG4gICAgaWYgKHJlbW92ZUZuSWR4ID09PSAtMSkgcmV0dXJuIGZhbHNlXHJcbiAgICB0aGlzLmJpbmRlZEV2ZW50Rm5zLnNwbGljZShyZW1vdmVGbklkeCwgMSlcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG59IiwiLyoqXHJcbiAqIGVkaXRvciBnbG9iYWwgc2hvcnRjdXRcclxuICovXHJcbmltcG9ydCB7IGlzRGVidWcgfSBmcm9tIFwiLi9kZXZDb25maWdcIlxyXG5cclxuZXhwb3J0IGNsYXNzIFNob3J0Y3V0IHtcclxuICBjb25zdHJ1Y3RvcihlZGl0b3IpIHtcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgICB0aGlzLnJlZ2lzdGVyZWRGbnMgPSB7fVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZSA9PiB7XHJcbiAgICAgIGNvbnN0IHByZXNzS2V5TmFtZSA9IGdldFByZXNzS2V5TmFtZShlKVxyXG4gICAgICBjb25zdCBmbiA9IHRoaXMucmVnaXN0ZXJlZEZuc1twcmVzc0tleU5hbWVdXHJcbiAgICAgIGlmIChmbikge1xyXG4gICAgICAgIC8qKiBkZWJ1ZyAqL1xyXG4gICAgICAgIGlmKGlzRGVidWcpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHByZXNzS2V5TmFtZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqIGRlYnVnIGVuZCAqL1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIGZuLmZuKGUpXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9LCBmYWxzZSlcclxuICB9XHJcbiAgLy8gdGhpcy5yZWdpc3RlcigndW5kbycsICdDdHJsK1onLCAoKSA9PiB7IGVkaXRvci5leGVjQ29tbWFuZCgndW5kbycpIH0pXHJcbiAgcmVnaXN0ZXIoY21kTmFtZSwgc2hvcnRjdXROYW1lLCBmbikge1xyXG4gICAgLy8gVE9ETzogdmFsaWQgc2hvcnRjdXROYW1lXHJcbiAgICB0aGlzLnJlZ2lzdGVyZWRGbnNbc2hvcnRjdXROYW1lXSA9IHsgY21kTmFtZSwgZm4gfVxyXG4gICAgXHJcbiAgfVxyXG4gIGZvcm1hdFByaW50KCkge1xyXG4gICAgY29uc3QgYXJyID0gW11cclxuICAgIGZvciAobGV0IHNob3J0Y3V0TmFtZSBpbiB0aGlzLnJlZ2lzdGVyZWRGbnMpIHtcclxuICAgICAgY29uc3QgY21kTmFtZSA9IHRoaXMucmVnaXN0ZXJlZEZuc1tzaG9ydGN1dE5hbWVdLmNtZE5hbWVcclxuICAgICAgYXJyLnB1c2goY21kTmFtZSArICc6ICcgKyBzaG9ydGN1dE5hbWUpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyLmpvaW4oJywgJylcclxuICB9XHJcbiAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFByZXNzS2V5TmFtZShlKSB7XHJcbiAgY29uc3QgcHJlc3NlZEtleXMgPSBbXVxyXG4gIGlmIChlLmN0cmxLZXkpIHByZXNzZWRLZXlzLnB1c2goJ0N0cmwnKVxyXG4gIGlmIChlLm1ldGFLZXkpIHByZXNzZWRLZXlzLnB1c2goJ0NtZCcpXHJcbiAgaWYgKGUuc2hpZnRLZXkpIHByZXNzZWRLZXlzLnB1c2goJ1NoaWZ0JylcclxuICAvLyBvbmx5IGNoZWNrIEF+WlxyXG4gIC8vIFRPRE86IHJlc29sdmUgYWxsIGtleVxyXG4gIGlmICgvS2V5Li8udGVzdChlLmNvZGUpKSB7XHJcbiAgICBwcmVzc2VkS2V5cy5wdXNoKGUuY29kZVtlLmNvZGUubGVuZ3RoIC0gMV0pXHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgcHJlc3NlZEtleXMucHVzaChlLmNvZGUpXHJcbiAgfVxyXG4gIGNvbnN0IG5hbWUgPSBwcmVzc2VkS2V5cy5qb2luKCcrJylcclxuICByZXR1cm4gbmFtZVxyXG59IiwiY29uc3QgeyBFZGl0b3JFdmVudENvbnRleHQgfSA9IHJlcXVpcmUoXCIuL2VkaXRvckV2ZW50Q29udGV4dFwiKVxyXG5cclxuZXhwb3J0IGNsYXNzIFRvb2xNYW5hZ2VyIHtcclxuICBjb25zdHJ1Y3RvcihlZGl0b3IpIHtcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgICB0aGlzLnRvb2xzID0ge31cclxuICAgIHRoaXMuY3VycmVudFRvb2wgPSBudWxsXHJcbiAgICB0aGlzLmludm9rZVdoZW5Td2l0Y2ggPSAoKSA9PiB7fVxyXG5cclxuICAgIHRoaXMuY3R4ID0gbnVsbCAvLyB0b29sIGNvbnRleHRcclxuICB9XHJcbiAgc2V0Q3VycmVudFRvb2wobmFtZSkge1xyXG4gICAgdGhpcy5jdXJyZW50VG9vbCA9IHRoaXMudG9vbHNbbmFtZV1cclxuICAgIHRoaXMuaW52b2tlV2hlblN3aXRjaCh0aGlzLmdldEN1cnJlbnRUb29sTmFtZSgpKVxyXG4gIH1cclxuICBvblN3aXRjaFRvb2woZm4pIHtcclxuICAgIHRoaXMuaW52b2tlV2hlblN3aXRjaCA9IGZuXHJcbiAgfVxyXG4gIGdldEN1cnJlbnRUb29sTmFtZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRUb29sLm5hbWUoKVxyXG4gIH1cclxuICByZWdpc3RlclRvb2wodG9vbCkge1xyXG4gICAgdGhpcy50b29sc1t0b29sLm5hbWUoKV0gPSB0b29sXHJcbiAgICB0b29sLnNldEVkaXRvcih0aGlzLmVkaXRvcikgLy8gZGVwZW5kZW5jeSBpbmplY3Rpb25cclxuICB9XHJcblxyXG4gIGJpbmRUb29sRXZlbnQoKSB7XHJcbiAgICBjb25zdCBzdmdSb290ID0gdGhpcy5lZGl0b3Iuc3ZnUm9vdFxyXG5cclxuICAgIHN2Z1Jvb3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZSA9PiB7XHJcbiAgICAgIGNvbnN0IGN0eCA9IG5ldyBFZGl0b3JFdmVudENvbnRleHQodGhpcy5lZGl0b3IsIGUpXHJcbiAgICAgIHRoaXMuY3R4ID0gY3R4XHJcbiAgICAgIHRoaXMuY3VycmVudFRvb2wuc3RhcnQoY3R4KVxyXG4gICAgfSwgZmFsc2UpXHJcblxyXG4gICAgc3ZnUm9vdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcclxuICAgICAgY29uc3QgY3R4ID0gdGhpcy5jdHhcclxuXHJcbiAgICAgIGlmICghY3R4KSByZXR1cm4gLy8gaWYgY3R4IGV4aXRzLCBwcmVzZW50IG1vdXNlZG93biBldmVudCBlbWl0IGp1c3QgYmVmb3JlXHJcbiAgICAgIGN0eC5zZXRPcmlnaW5FdmVudChlKVxyXG4gICAgICBjdHgucHJlc3NNb3VzZSgpXHJcbiAgICAgIHRoaXMuY3VycmVudFRvb2wubW92ZShjdHgpIC8vIG1vdmVcclxuICAgIH0sIGZhbHNlKVxyXG4gICAgXHJcbiAgICBzdmdSb290LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlID0+IHtcclxuICAgICAgLy8gdGhpcy5jdHgucmVsZWFzZU1vdXNlKClcclxuICAgICAgY29uc3QgY3R4ID0gdGhpcy5jdHhcclxuICAgICAgLy8gY3R4LnNldE9yaWdpbkV2ZW50KGUpIC8vIHRoZSBvZmZzZXRYIGFuZCBvZmZzZXRZIGluIG1vdXNldXAgYW5kIHRoZSBsYXN0IG1vdXNlbW92ZSBpcyBub3QgZXF1YWwgPz8gXHJcbiAgICAgIHRoaXMuY3VycmVudFRvb2wuZW5kKGN0eClcclxuICAgICAgY3R4LmlzRW5kSW5zaWRlID0gdHJ1ZVxyXG4gICAgfSwgZmFsc2UpXHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlID0+IHtcclxuICAgICAgaWYgKHRoaXMuY3R4ICYmIHRoaXMuY3R4LmlzRW5kSW5zaWRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VG9vbC5lbmRPdXRzaWRlKHRoaXMuY3R4KVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY3R4ID0gbnVsbFxyXG4gICAgfSwgZmFsc2UpXHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgRlNWRyB9IGZyb20gXCIuLi9lbGVtZW50XCJcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ZhaWxkQ29sb3JWYWwoKSB7XHJcbiAgLy8gVE9ETzpcclxuICAvLyAxLiBhbGwgY29sb3IgYnJvd2VyIHN1cHBvcnRlZFxyXG4gIC8vIDIuICNmZmYgYW5kICNmMGYwZjBcclxuICAvLyAzLiByZ2IoeCx4LHgpXHJcbiAgLy8gLi4uXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50c0luQm94KGJveCwgcGFyZW50KSB7XHJcbiAgY29uc3QgdGFnTmFtZUZvcmJpZExpc3QgPSBbJ2cnXVxyXG4gIGJveCA9IG5ldyBGU1ZHLkJveChib3gpXHJcbiAgY29uc3QgZWxzSW5Cb3ggPSBbXVxyXG5cclxuICBmdW5jdGlvbiByKGJveCwgcGFyZW50KSB7XHJcbiAgICBjb25zdCBlbGVtZW50cyA9IHBhcmVudC5jaGlsZHJlblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBlbCA9IGVsZW1lbnRzW2ldIC8vIEZTVkcuY3JlYXRlKGVsZW1lbnRzW2ldKVxyXG5cclxuICAgICAgaWYgKCF0YWdOYW1lRm9yYmlkTGlzdC5pbmNsdWRlcyhlbC50YWdOYW1lKSkge1xyXG4gICAgICAgIGNvbnN0IGJib3ggPSBlbC5nZXRCQm94KClcclxuICAgICAgICBpZiAoYm94LmNvbnRhaW5zKGJib3gpKSB7XHJcbiAgICAgICAgICBlbHNJbkJveC5wdXNoKCBGU1ZHLmNyZWF0ZShlbCkpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZWwuY2hpbGRyZW4ubGVuZ3RoID4gMCkgcihib3gsIGVsKVxyXG4gICAgfVxyXG4gIH1cclxuICByKGJveCwgcGFyZW50KVxyXG4gIHJldHVybiBlbHNJbkJveFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdW5pcShhcnIpIHtcclxuICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGFycikpXHJcbn0iLCJcclxuZXhwb3J0IGZ1bmN0aW9uIGdldEJveEJ5MnBvaW50cyh4MSwgeTEsIHgyLCB5Mikge1xyXG4gIGxldCB4LCB5LCB3LCBoXHJcbiAgdyA9IE1hdGguYWJzKHgyIC0geDEpXHJcbiAgaCA9IE1hdGguYWJzKHkyIC0geTEpXHJcbiAgeCA9IE1hdGgubWluKHgyLCB4MSlcclxuICB5ID0gTWF0aC5taW4oeTIsIHkxKVxyXG4gIHJldHVybiB7IHgsIHksIHcsIGggfVxyXG59XHJcbiIsIlxyXG4vLyBUT0RPOiB0byBmaW5pc2hcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFZpZXdCb3goZWwpIHtcclxuICBjb25zdCB2YWwgPSBlbC5nZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnKVxyXG4gIGlmICghdmFsKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2hhcyBub3Qgdmlld0JveCBhdHRyaWJ1dGUnKVxyXG4gIH1cclxuICBjb25zdCBbeCwgeSwgdywgaF0gPSB2YWwuc3BsaXQoL1tcXHMsXSsvKS5tYXAoaXRlbSA9PiBwYXJzZUZsb2F0KGl0ZW0pKVxyXG4gIHJldHVybiB7IHgsIHksIHcsIGggfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=