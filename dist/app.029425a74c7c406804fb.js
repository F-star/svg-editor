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
// front elements
document.querySelector('#btn-front').onclick = function() {
  if (editor.activedElsManager.isNoEmpty()) {
    editor.executeCommand('front')
  }
}
document.querySelector('#btn-back').onclick = function() {
  if (editor.activedElsManager.isNoEmpty()) {
    editor.executeCommand('back')
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

/***/ "./src/command/arranging.js":
/*!**********************************!*\
  !*** ./src/command/arranging.js ***!
  \**********************************/
/*! namespace exports */
/*! export ArrangingBack [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ArrangingFront [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArrangingFront": () => /* binding */ ArrangingFront,
/* harmony export */   "ArrangingBack": () => /* binding */ ArrangingBack
/* harmony export */ });
/* harmony import */ var _commands__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commands */ "./src/command/commands.js");


/**
 * front
 * forward
 * backward
 * back
 */

;

class ArrangingFront extends _commands__WEBPACK_IMPORTED_MODULE_0__.BaseCommand {
  constructor(editor, els) {
    super()
    if (els === undefined) {
      this.els = editor.activedElsManager.getEls()
    } else {
      this.els = els
    }
    
    if (this.els.length === 0) {
      throw new Error('elements can not be empty.')
    }

    this.nextSiblings = new Array(this.els.length)
    for (let i = 0; i < this.els.length; i++) {
      const el = this.els[i]
      this.nextSiblings[i] = el.nextSibling()
      el.front()
    }
  }
  static name() {
    return 'front'
  }
  undo() {
    const size = this.els.length
    console.log('els:', this.els)
    for (let i = size - 1; i >= 0; i--) {
      const el = this.els[i]
      const nextSibling = this.nextSiblings[i]
      if (nextSibling !== null) {
        el.before(nextSibling)
      }
    }
  }
  redo() {
    for (let i = 0; i < this.els.length; i++) {
      const el = this.els[i]
      el.front()
    }
  }
}

class ArrangingBack extends _commands__WEBPACK_IMPORTED_MODULE_0__.BaseCommand {
  constructor(editor, els) {
    super()
    if (els === undefined) {
      this.els = editor.activedElsManager.getEls()
    } else {
      this.els = els
    }
    
    if (this.els.length === 0) {
      throw new Error('elements can not be empty.')
    }

    this.previousSiblings = new Array(this.els.length)
    for (let i = 0; i < this.els.length; i++) {
      const el = this.els[i]
      this.previousSiblings[i] = el.previousSibling()
      el.back()
    }
  }
  static name() {
    return 'back'
  }
  undo() {
    const size = this.els.length
    console.log('els:', this.els)
    for (let i = size - 1; i >= 0; i--) {
      const el = this.els[i]
      const nextSibling = this.previousSiblings[i]
      if (nextSibling !== null) {
        el.after(nextSibling)
      }
    }
  }
  redo() {
    for (let i = 0; i < this.els.length; i++) {
      const el = this.els[i]
      el.back()
    }
  }
}

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
/* harmony import */ var _arranging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arranging */ "./src/command/arranging.js");
/* harmony import */ var _commands__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commands */ "./src/command/commands.js");
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

    this.resigterCommandClass(_commands__WEBPACK_IMPORTED_MODULE_1__.AddRect)
    this.resigterCommandClass(_commands__WEBPACK_IMPORTED_MODULE_1__.DMove)
    this.resigterCommandClass(_commands__WEBPACK_IMPORTED_MODULE_1__.SetAttr)
    this.resigterCommandClass(_commands__WEBPACK_IMPORTED_MODULE_1__.removeSelectedElements)
    this.resigterCommandClass(_arranging__WEBPACK_IMPORTED_MODULE_0__.ArrangingFront)

    this.resigterCommandClass(_arranging__WEBPACK_IMPORTED_MODULE_0__.ArrangingBack)
    
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
/*! export BaseCommand [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DMove [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SetAttr [provided] [no usage info] [missing usage info prevents renaming] */
/*! export removeSelectedElements [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseCommand": () => /* binding */ BaseCommand,
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
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FElement": () => /* binding */ FElement
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/element/index.js");

/**
 * 对 SVG 元素的简单封装
 */

;

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

  /** DOM methods */
  parent() {
    return new ___WEBPACK_IMPORTED_MODULE_0__.FSVG.Group(this.el_.parentElement)
  }
  nextSibling() {
    const n = this.el_.nextElementSibling
    if (n == null) return n
    return ___WEBPACK_IMPORTED_MODULE_0__.FSVG.create(n)
  }
  previousSibling() {
    const n = this.el_.previousSibling
    if (n == null) return n
    return ___WEBPACK_IMPORTED_MODULE_0__.FSVG.create(n)
  }
  append(el) {
    this.el_.appendChild(el.el())
  }
  front() {
    const parent = this.el_.parentElement
    parent.appendChild(this.el_)
  }
  back() {
    const parent = this.el_.parentElement
    const firstChild = parent.children[0]
    if (firstChild) {
      parent.insertBefore(this.el_, firstChild)
    }
  }
  before(referElement) {
    if (referElement.el) {
      referElement = referElement.el()
    }
    const parent = referElement.parentElement
    parent.insertBefore(this.el_, referElement)
  }
  after(referElement) {
    if (referElement.el) {
      referElement = referElement.el()
    }
    const parent = referElement.parentElement
    const nextSibling = referElement.nextSibling
    if (nextSibling) {
      parent.insertBefore(this.el_, nextSibling)
    } else {
      parent.appendChild(this.el_)
    }
   
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

/***/ "./src/element/group.js":
/*!******************************!*\
  !*** ./src/element/group.js ***!
  \******************************/
/*! namespace exports */
/*! export Group [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Group": () => /* binding */ Group
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/* harmony import */ var _baseElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./baseElement */ "./src/element/baseElement.js");

/**
 * group
 * 
 * Encapsulation of <g> 
 */

;


class Group extends _baseElement__WEBPACK_IMPORTED_MODULE_1__.FElement {
  constructor(el) {
    super()
    if (el) {
      this.el_ = el
    } else {
      this.el_ = document.createElementNS(_constants__WEBPACK_IMPORTED_MODULE_0__.NS.SVG, 'g')
    }
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
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./group */ "./src/element/group.js");
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
  } else if (tagName === 'g') {
    return new FSVG.Group(el)
  }
  else {
    throw new Error(`Can not creat ${tagName} instance, no match class.`)
  }
}


const FSVG = {
  create,
  Rect: _rect__WEBPACK_IMPORTED_MODULE_1__.Rect,
  Box: _box__WEBPACK_IMPORTED_MODULE_0__.Box,
  Group: _group__WEBPACK_IMPORTED_MODULE_2__.Group,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2FjdGl2ZWRFbHNNYW5hZ2VyLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvY29tbWFuZC9hcnJhbmdpbmcuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9jb21tYW5kL2NvbW1hbmRNYW5hZ2VyLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvY29tbWFuZC9jb21tYW5kcy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2RldkNvbmZpZy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2VkaXRvci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2VkaXRvckV2ZW50Q29udGV4dC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2VsZW1lbnQvYmFzZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lbGVtZW50L2JveC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2VsZW1lbnQvZ3JvdXAuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9lbGVtZW50L2luZGV4LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvZWxlbWVudC9yZWN0LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbGF5ZXIvaHVkTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL2xheWVyL291dGxpbmVCb3hIdWQuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9sYXllci9zZWxlY3RBcmVhLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy9hZGRSZWN0LmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy9kcmFnQ2FudmFzLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvbW9kdWxlcy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9tb2R1bGVzL3pvb20uanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9zZXR0aW5nL2VkaXRvclNldHRpbmcuanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy9zaG9ydGN1dC5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yLy4vc3JjL3Rvb2xNYW5hZ2VyLmpzIiwid2VicGFjazovL3N2Zy1lZGl0b3IvLi9zcmMvdXRpbC9jb21tb24uanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy91dGlsL21hdGguanMiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci8uL3NyYy91dGlsL3N2Zy5qcyIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3N2Zy1lZGl0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdmctZWRpdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3ZnLWVkaXRvci93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBZ0M7QUFDZ0I7O0FBRXpDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsOERBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFtQixxQkFBcUI7QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGlEQUFXO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7Ozs7OztVQ1RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJhcHAuMDI5NDI1YTc0YzdjNDA2ODA0ZmIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5r+A5rS75YWD57Sg566h55CG57G7XHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgRlNWRyB9IGZyb20gXCIuL2VsZW1lbnRcIlxyXG5pbXBvcnQgeyBnZXRFbGVtZW50c0luQm94IH0gZnJvbSBcIi4vdXRpbC9jb21tb25cIlxyXG5cclxuZXhwb3J0IGNsYXNzIEFjdGl2ZWRFbHNNYW5hZ2VyIHtcclxuICBjb25zdHJ1Y3RvcihlZGl0b3IpIHtcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgICB0aGlzLmVscyA9IFtdXHJcbiAgfVxyXG4gIHNldEVscyhlbHMpIHtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShlbHMpKSBlbHMgPSBbZWxzXVxyXG4gICAgdGhpcy5lbHMgPSBlbHNcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZWRpdG9yLnRvb2xNYW5hZ2VyLmdldEN1cnJlbnRUb29sTmFtZSgpKVxyXG4gICAgLy8gVE9ETzogaGlnaGxpZ2h0IG91dGxpbmUsIGFjY29yZGluZyB0byBjdXJyZW50IHRvb2xcclxuICAgIHRoaXMuaGVpZ2hsaWd0aEVscygpXHJcbiAgICB0aGlzLnNldFNldHRpbmdGaWxsKClcclxuICB9XHJcbiAgZ2V0RWxzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxzXHJcbiAgfVxyXG4gIHNldEVsc0luQm94KGJveCkge1xyXG4gICAgaWYgKGJveC53aWR0aCA9PT0gMCB8fCBib3guaGVpZ2h0ID09PSAwKSB7XHJcbiAgICAgIHRoaXMuY2xlYXIoKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlbHNJbkJveCA9IGdldEVsZW1lbnRzSW5Cb3goYm94LCB0aGlzLmVkaXRvci5zdmdDb250ZW50KVxyXG4gICAgaWYgKGVsc0luQm94Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLmNsZWFyKClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0RWxzKGVsc0luQm94KVxyXG4gICAgfVxyXG4gIH1cclxuICBpc0VtcHR5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxzLmxlbmd0aCA9PSAwXHJcbiAgfVxyXG4gIGlzTm9FbXB0eSgpIHtcclxuICAgIHJldHVybiB0aGlzLmVscy5sZW5ndGggPiAwXHJcbiAgfVxyXG4gIGNsZWFyKCkge1xyXG4gICAgdGhpcy5lbHMgPSBbXVxyXG4gICAgLy8gY2xlYXIgb3V0bGluZVxyXG4gICAgY29uc3QgaHVkTWFuYWdlciA9IHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXJcclxuICAgIGh1ZE1hbmFnZXIub3V0bGluZUJveEh1ZC5jbGVhcigpXHJcbiAgfVxyXG4gIGNvbnRhaW5zKGVsKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmVsc1tpXS5lbCgpID09PSBlbCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH1cclxuICBnZXRNZXJnZUJCb3goKSB7XHJcbiAgICAvLyBUT0RPOlxyXG4gICAgLyogbGV0IHgsIHksIHcsIGhcclxuICAgIHRoaXMuZWxzLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICBjb25zdCBiYm94ID0gZWwuZWwoKS5nZXRiYm94KClcclxuICAgIH0pICovXHJcbiAgfVxyXG4gIC8vIGhlaWdodGxpZ2h0IHRoZSBlbGVtZW50c1xyXG4gIGhlaWdobGlndGhFbHMoKSB7XHJcbiAgICBjb25zdCBlbHMgPSB0aGlzLmVsc1xyXG4gICAgY29uc3QgaHVkTWFuYWdlciA9IHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXJcclxuXHJcbiAgICBjb25zdCBmaXJzdEJveCA9IG5ldyBGU1ZHLkJveChlbHNbMF0uZ2V0QkJveCgpKVxyXG4gICAgY29uc3QgbWVyZ2VkQm94ID0gZWxzLnJlZHVjZSgocHJlLCBjdXJFbCkgPT4ge1xyXG4gICAgICBjb25zdCBjdXJCb3ggPSBjdXJFbC5nZXRCQm94KClcclxuICAgICAgcmV0dXJuIHByZS5tZXJnZShuZXcgRlNWRy5Cb3goY3VyQm94KSlcclxuICAgIH0sIGZpcnN0Qm94KVxyXG5cclxuICAgIGh1ZE1hbmFnZXIub3V0bGluZUJveEh1ZC5kcmF3UmVjdChtZXJnZWRCb3gueCwgbWVyZ2VkQm94LnksIG1lcmdlZEJveC53aWR0aCwgbWVyZ2VkQm94LmhlaWdodClcclxuICB9XHJcbiAgc2V0U2V0dGluZ0ZpbGwoKSB7XHJcbiAgICBjb25zdCBlbHMgPSB0aGlzLmVsc1xyXG5cclxuICAgIGNvbnN0IGZpbGxzID0gZWxzLm1hcChlbCA9PiB7XHJcbiAgICAgIHJldHVybiBlbC5nZXRBdHRyKCdmaWxsJylcclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5lZGl0b3Iuc2V0dGluZy5zZXRGaWxsKGZpbGxzWzBdKSAvLyBGSVhNRTpcclxuICB9XHJcbiAgc2V0RWxzQXR0cihuYW1lLCB2YWwpIHtcclxuICAgIGlmICh0aGlzLmlzTm9FbXB0eSgpKSB7XHJcbiAgICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdzZXRBdHRyJywgdGhpcy5lbHMsIG5hbWUsIHZhbClcclxuICAgIH1cclxuICB9XHJcbn0iLCJcclxuaW1wb3J0IEVkaXRvciBmcm9tICcuL2VkaXRvci5qcydcclxuaW1wb3J0IEFkZFJlY3QgZnJvbSAnLi9tb2R1bGVzL2FkZFJlY3QuanMnXHJcbmltcG9ydCB7IERyYWdDYW52YXMgfSBmcm9tICcuL21vZHVsZXMvZHJhZ0NhbnZhcy5qcydcclxuaW1wb3J0IENvbW1hbmRNYW5hZ2VyIGZyb20gJy4vY29tbWFuZC9jb21tYW5kTWFuYWdlci5qcydcclxuaW1wb3J0IHsgRWRpdG9yU2V0dGluZyB9IGZyb20gJy4vc2V0dGluZy9lZGl0b3JTZXR0aW5nLmpzJ1xyXG5pbXBvcnQgeyBab29tTWFuYWdlciB9IGZyb20gJy4vbW9kdWxlcy96b29tLmpzJ1xyXG5pbXBvcnQgeyBTZWxlY3QgfSBmcm9tICcuL21vZHVsZXMvc2VsZWN0LmpzJ1xyXG5pbXBvcnQgeyBUb29sTWFuYWdlciB9IGZyb20gJy4vdG9vbE1hbmFnZXIuanMnXHJcblxyXG5mdW5jdGlvbiBhY3RpdmVCdG4obmFtZSkge1xyXG4gIG5hbWUgPSB7XHJcbiAgICAnc2VsZWN0JzogJ2J0bi1zZWxlY3QnLFxyXG4gICAgJ2FkZFJlY3QnOiAnYnRuLWFkZC1yZWN0JyxcclxuICAgICdkcmFnQ2FudmFzJzogJ2J0bi1kcmFnLWNhbnZhcycsXHJcbiAgfVtuYW1lXVxyXG4gIGlmIChuYW1lID09IHVuZGVmaW5lZCkgcmV0dXJuXHJcblxyXG4gIGNvbnN0IHRvb2xCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9vbC1iYXInKVxyXG4gIGNvbnN0IHRvb2xCdG5zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodG9vbEJhci5jaGlsZHJlbilcclxuICB0b29sQnRucy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gIH0pXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmFtZSkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxufVxyXG5cclxuXHJcbmNvbnN0IGVkaXRvciA9IG5ldyBFZGl0b3IoKVxyXG53aW5kb3cuZWRpdG9yID0gZWRpdG9yIC8vIGRlYnVnIGluIGRldnRvb2xcclxuXHJcbmNvbnN0IGNvbW1hbmRNYW5hZ2VyID0gbmV3IENvbW1hbmRNYW5hZ2VyKGVkaXRvcilcclxuZWRpdG9yLnNldENvbW1hbmRNYW5hZ2VyKGNvbW1hbmRNYW5hZ2VyKVxyXG5cclxuZWRpdG9yLnNldFNldHRpbmcobmV3IEVkaXRvclNldHRpbmcoKSlcclxuLy8gcmVnaXN0ZXIgdG9vbHNcclxuXHJcbmNvbnN0IHRvb2xNYW5hZ2VyID0gbmV3IFRvb2xNYW5hZ2VyKGVkaXRvcilcclxuZWRpdG9yLnNldFRvb2xNYW5hZ2VyKHRvb2xNYW5hZ2VyKVxyXG50b29sTWFuYWdlci5yZWdpc3RlclRvb2wobmV3IEFkZFJlY3QoKSlcclxudG9vbE1hbmFnZXIucmVnaXN0ZXJUb29sKG5ldyBEcmFnQ2FudmFzKCkpXHJcbnRvb2xNYW5hZ2VyLnJlZ2lzdGVyVG9vbChuZXcgU2VsZWN0KCkpXHJcblxyXG5lZGl0b3IudG9vbE1hbmFnZXIub25Td2l0Y2hUb29sKG5hbWUgPT4ge1xyXG4gIGNvbnNvbGUubG9nKCdzd2l0Y2hlZCB0b29sOicsIG5hbWUpXHJcbiAgYWN0aXZlQnRuKG5hbWUpXHJcbn0pXHJcblxyXG50b29sTWFuYWdlci5zZXRDdXJyZW50VG9vbCgnYWRkUmVjdCcpXHJcbnRvb2xNYW5hZ2VyLmJpbmRUb29sRXZlbnQoKVxyXG4vLyB6b29tXHJcbmVkaXRvci5zZXRab29tTWFuYWdlcihuZXcgWm9vbU1hbmFnZXIoKSlcclxuXHJcbmVkaXRvci5tb3VudCgnI2VkaXRvci1hcmVhJylcclxuXHJcblxyXG4vKiogXHJcbiAqIGJpbmQgZXZlbnQgaW4gYnV0dG9uXHJcbiAqLyBcclxuLy8gdW5kb1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXVuZG8nKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gIGVkaXRvci5leGVjdXRlQ29tbWFuZCgndW5kbycpXHJcbn1cclxuLy8gcmVkb1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXJlZG8nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdyZWRvJylcclxufVxyXG4vLyB6b29tSW5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi16b29tLWluJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGVkaXRvci56b29tTWFuYWdlci56b29tSW4oKVxyXG59XHJcbi8vIHpvb21PdXRcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi16b29tLW91dCcpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBlZGl0b3Iuem9vbU1hbmFnZXIuem9vbU91dCgpXHJcbn1cclxuLy8gc2VsZWN0IGFkZFJlY3QgdG9vbFxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLWFkZC1yZWN0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGVkaXRvci5zZXRDdXJyZW50VG9vbCgnYWRkUmVjdCcpXHJcbn1cclxuLy8gc2VsZWN0IGRyYWdjYW52YXMgdG9vbFxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLWRyYWctY2FudmFzJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGVkaXRvci5zZXRDdXJyZW50VG9vbCgnZHJhZ0NhbnZhcycpXHJcbn1cclxuLy8gc2VsZWN0IHRvb2xcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1zZWxlY3QnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgZWRpdG9yLnNldEN1cnJlbnRUb29sKCdzZWxlY3QnKVxyXG59XHJcbi8vIGRlbGV0ZSBzZWxlY3RlZCBlbGVtZW50c1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLWRlbGV0ZScpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBpZiAoZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLmlzTm9FbXB0eSgpKSB7XHJcbiAgICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3JlbW92ZVNlbGVjdGVkRWxlbWVudHMnKVxyXG4gIH1cclxufVxyXG4vLyBmcm9udCBlbGVtZW50c1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLWZyb250Jykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIGlmIChlZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuaXNOb0VtcHR5KCkpIHtcclxuICAgIGVkaXRvci5leGVjdXRlQ29tbWFuZCgnZnJvbnQnKVxyXG4gIH1cclxufVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLWJhY2snKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgaWYgKGVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5pc05vRW1wdHkoKSkge1xyXG4gICAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdiYWNrJylcclxuICB9XHJcbn1cclxuXHJcbi8vIGZpbGwgdmFsdWUgY29udHJvbFxyXG5jb25zdCBmaWxsVGV4dE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWxlbWVudC1pbmZvLWZpbGwnKVxyXG5maWxsVGV4dE5vZGUuaW5uZXJIVE1MID0gZWRpdG9yLnNldHRpbmcuZ2V0KCdmaWxsJylcclxuZWRpdG9yLnNldHRpbmcuYmluZEV2ZW50KCdmaWxsJywgdmFsID0+IHtcclxuICBmaWxsVGV4dE5vZGUuaW5uZXJIVE1MID0gdmFsXHJcbn0pXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZXQtZmlsbC1idG4nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgY29uc3QgZmlsbCA9IHdpbmRvdy5wcm9tcHQoJ1BsZWFzZSBpbnB1dCB2YWxpZCBjb2xvciB2YWx1Ze+8iGxpa2UgI2ZmY2U0M++8iScsIGVkaXRvci5zZXR0aW5nLmdldCgnZmlsbCcpKVxyXG4gIGlmICghZmlsbCkgcmV0dXJuXHJcbiAgZmlsbFRleHROb2RlLmlubmVySFRNTCA9IGZpbGxcclxuXHJcbiAgZWRpdG9yLnNldHRpbmcuc2V0RmlsbChmaWxsKVxyXG4gIGVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHNBdHRyKCdmaWxsJywgZmlsbClcclxufVxyXG5cclxuLy8gc3Ryb2tlIHZhbHVlIGNvbnRyb2xcclxuY29uc3Qgc3Ryb2tlVGV4dE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWxlbWVudC1pbmZvLXN0cm9rZScpXHJcbnN0cm9rZVRleHROb2RlLmlubmVySFRNTCA9IGVkaXRvci5zZXR0aW5nLmdldCgnc3Ryb2tlJylcclxuZWRpdG9yLnNldHRpbmcuYmluZEV2ZW50KCdzdHJva2UnLCB2YWwgPT4ge1xyXG4gIHN0cm9rZVRleHROb2RlLmlubmVySFRNTCA9IHZhbFxyXG59KVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2V0LXN0cm9rZS1idG4nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgY29uc3Qgc3Ryb2tlID0gd2luZG93LnByb21wdCgnUGxlYXNlIGlucHV0IHZhbGlkIGNvbG9yIHZhbHVl77yIbGlrZSAjZmZjZTQz77yJJywgZWRpdG9yLnNldHRpbmcuZ2V0KCdzdHJva2UnKSlcclxuICBpZiAoIXN0cm9rZSkgcmV0dXJuXHJcbiAgc3Ryb2tlVGV4dE5vZGUuaW5uZXJIVE1MID0gc3Ryb2tlXHJcblxyXG4gIGVkaXRvci5zZXR0aW5nLnNldFN0cm9rZShzdHJva2UpXHJcbiAgZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVsc0F0dHIoJ3N0cm9rZScsIHN0cm9rZSlcclxufVxyXG4vLyByZWdpc3RlciBzaG9ydGN1dFxyXG5lZGl0b3Iuc2hvcnRjdXQucmVnaXN0ZXIoJ1VuZG8nLCAnQ21kK1onLCAoKSA9PiB7XHJcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCd1bmRvJylcclxufSlcclxuZWRpdG9yLnNob3J0Y3V0LnJlZ2lzdGVyKCdVbmRvJywgJ0N0cmwrWicsICgpID0+IHtcclxuICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3VuZG8nKVxyXG59KVxyXG5lZGl0b3Iuc2hvcnRjdXQucmVnaXN0ZXIoJ1JlZG8nLCAnQ21kK1NoaWZ0K1onLCAoKSA9PiB7XHJcbiAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdyZWRvJylcclxufSlcclxuZWRpdG9yLnNob3J0Y3V0LnJlZ2lzdGVyKCdSZWRvJywgJ0N0cmwrU2hpZnQrWicsICgpID0+IHtcclxuICBlZGl0b3IuZXhlY3V0ZUNvbW1hbmQoJ3JlZG8nKVxyXG59KVxyXG5lZGl0b3Iuc2hvcnRjdXQucmVnaXN0ZXIoJ0RlbGV0ZScsICdCYWNrc3BhY2UnLCAoKSA9PiB7XHJcbiAgaWYgKGVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5pc05vRW1wdHkoKSkge1xyXG4gICAgZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdyZW1vdmVTZWxlY3RlZEVsZW1lbnRzJylcclxuICB9XHJcbn0pXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaG9ydGN1dCcpLmlubmVySFRNTCA9IGVkaXRvci5zaG9ydGN1dC5mb3JtYXRQcmludCgpXHJcblxyXG4vKipcclxuICog55CG5oOzIGFwaSDkvb/nlKjkvovlrZBcclxuICogXHJcbiAqIGNvbnN0IGVkaXRvckJ1aWxkZXIgPSBuZXcgRWRpdG9yLmJ1aWxkZXIoKVxyXG4gKiBlZGl0b3JCdWlsZGVyXHJcbiAqICAgLnNldENhbnZhc1NpemUoNDAwLCAzMDApXHJcbiAqICAgLnNldFN0YWdlU2l6ZSgxMDAwLCA4MDApXHJcbiAqICAgLnNldFZpZXdwb3J0U2l6ZSg4MDAsIDUwMClcclxuICogICAuc2V0Wm9vbSgxMDApXHJcbiAqIFxyXG4gKiBjb25zdCBlZGl0b3IgPSBlZGl0b3JCdWlsZGVyLmJ1aWxkKClcclxuICogZWRpdG9yLnJlZ2lzdGVyVG9vbCh0b29sTW92ZSlcclxuICogXHJcbiAqLyIsIlxyXG5cclxuLyoqXHJcbiAqIGZyb250XHJcbiAqIGZvcndhcmRcclxuICogYmFja3dhcmRcclxuICogYmFja1xyXG4gKi9cclxuXHJcbmltcG9ydCB7IEJhc2VDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHNcIlxyXG5cclxuZXhwb3J0IGNsYXNzIEFycmFuZ2luZ0Zyb250IGV4dGVuZHMgQmFzZUNvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgZWxzKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICBpZiAoZWxzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5lbHMgPSBlZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuZ2V0RWxzKClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWxzID0gZWxzXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICh0aGlzLmVscy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdlbGVtZW50cyBjYW4gbm90IGJlIGVtcHR5LicpXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5uZXh0U2libGluZ3MgPSBuZXcgQXJyYXkodGhpcy5lbHMubGVuZ3RoKVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmVscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBlbCA9IHRoaXMuZWxzW2ldXHJcbiAgICAgIHRoaXMubmV4dFNpYmxpbmdzW2ldID0gZWwubmV4dFNpYmxpbmcoKVxyXG4gICAgICBlbC5mcm9udCgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHN0YXRpYyBuYW1lKCkge1xyXG4gICAgcmV0dXJuICdmcm9udCdcclxuICB9XHJcbiAgdW5kbygpIHtcclxuICAgIGNvbnN0IHNpemUgPSB0aGlzLmVscy5sZW5ndGhcclxuICAgIGNvbnNvbGUubG9nKCdlbHM6JywgdGhpcy5lbHMpXHJcbiAgICBmb3IgKGxldCBpID0gc2l6ZSAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5lbHNbaV1cclxuICAgICAgY29uc3QgbmV4dFNpYmxpbmcgPSB0aGlzLm5leHRTaWJsaW5nc1tpXVxyXG4gICAgICBpZiAobmV4dFNpYmxpbmcgIT09IG51bGwpIHtcclxuICAgICAgICBlbC5iZWZvcmUobmV4dFNpYmxpbmcpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmVkbygpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5lbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgZWwgPSB0aGlzLmVsc1tpXVxyXG4gICAgICBlbC5mcm9udCgpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQXJyYW5naW5nQmFjayBleHRlbmRzIEJhc2VDb21tYW5kIHtcclxuICBjb25zdHJ1Y3RvcihlZGl0b3IsIGVscykge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgaWYgKGVscyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZWxzID0gZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLmdldEVscygpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVscyA9IGVsc1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAodGhpcy5lbHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignZWxlbWVudHMgY2FuIG5vdCBiZSBlbXB0eS4nKVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJldmlvdXNTaWJsaW5ncyA9IG5ldyBBcnJheSh0aGlzLmVscy5sZW5ndGgpXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5lbHNbaV1cclxuICAgICAgdGhpcy5wcmV2aW91c1NpYmxpbmdzW2ldID0gZWwucHJldmlvdXNTaWJsaW5nKClcclxuICAgICAgZWwuYmFjaygpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHN0YXRpYyBuYW1lKCkge1xyXG4gICAgcmV0dXJuICdiYWNrJ1xyXG4gIH1cclxuICB1bmRvKCkge1xyXG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuZWxzLmxlbmd0aFxyXG4gICAgY29uc29sZS5sb2coJ2VsczonLCB0aGlzLmVscylcclxuICAgIGZvciAobGV0IGkgPSBzaXplIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgY29uc3QgZWwgPSB0aGlzLmVsc1tpXVxyXG4gICAgICBjb25zdCBuZXh0U2libGluZyA9IHRoaXMucHJldmlvdXNTaWJsaW5nc1tpXVxyXG4gICAgICBpZiAobmV4dFNpYmxpbmcgIT09IG51bGwpIHtcclxuICAgICAgICBlbC5hZnRlcihuZXh0U2libGluZylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZWRvKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmVscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBlbCA9IHRoaXMuZWxzW2ldXHJcbiAgICAgIGVsLmJhY2soKVxyXG4gICAgfVxyXG4gIH1cclxufSIsIi8qKlxyXG4gKiBDb21tYW5kTWFuYWdlciBDbGFzc1xyXG4gKiBcclxuICogXHJcbiAqIENvbW1hbmRNYW5hZ2VyLnVuZG8oKVxyXG4gKiBDb21tYW5kTWFuYWdlci5yZWRvKClcclxuICovXHJcblxyXG5pbXBvcnQgeyBBcnJhbmdpbmdCYWNrLCBBcnJhbmdpbmdGcm9udCB9IGZyb20gXCIuL2FycmFuZ2luZ1wiXHJcbmltcG9ydCB7IEFkZFJlY3QsIERNb3ZlLCByZW1vdmVTZWxlY3RlZEVsZW1lbnRzLCBTZXRBdHRyIH0gZnJvbSBcIi4vY29tbWFuZHNcIlxyXG5cclxuY2xhc3MgQ29tbWFuZE1hbmFnZXIge1xyXG4gIGNvbnN0cnVjdG9yKGVkaXRvcikge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICAgIHRoaXMucmVkb1N0YWNrID0gW11cclxuICAgIHRoaXMudW5kb1N0YWNrID0gW11cclxuICAgIHRoaXMuY29tbWFuZENsYXNzZXMgPSB7fVxyXG5cclxuICAgIHRoaXMucmVzaWd0ZXJDb21tYW5kQ2xhc3MoQWRkUmVjdClcclxuICAgIHRoaXMucmVzaWd0ZXJDb21tYW5kQ2xhc3MoRE1vdmUpXHJcbiAgICB0aGlzLnJlc2lndGVyQ29tbWFuZENsYXNzKFNldEF0dHIpXHJcbiAgICB0aGlzLnJlc2lndGVyQ29tbWFuZENsYXNzKHJlbW92ZVNlbGVjdGVkRWxlbWVudHMpXHJcbiAgICB0aGlzLnJlc2lndGVyQ29tbWFuZENsYXNzKEFycmFuZ2luZ0Zyb250KVxyXG5cclxuICAgIHRoaXMucmVzaWd0ZXJDb21tYW5kQ2xhc3MoQXJyYW5naW5nQmFjaylcclxuICAgIFxyXG4gIH1cclxuICBzZXRFZGl0b3IoZWRpdG9yKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gIH1cclxuICBleGVjdXRlKG5hbWUsIC4uLmFyZ3MpIHtcclxuICAgIGNvbnN0IENvbW1hbmRDbGFzcyA9IHRoaXMuY29tbWFuZENsYXNzZXNbbmFtZV1cclxuICAgIGlmICghQ29tbWFuZENsYXNzKSB0aHJvdyBuZXcgRXJyb3IoYGVkaXRvciBoYXMgbm90IHRoZSAke25hbWV9IGNvbW1hbmRgKVxyXG4gICAgY29uc3QgY29tbWFuZCA9IG5ldyBDb21tYW5kQ2xhc3ModGhpcy5lZGl0b3IsIC4uLmFyZ3MpIC8vIOWIm+W7uiBjb21tYW5kIOWunuS+i1xyXG5cclxuICAgIHRoaXMudW5kb1N0YWNrLnB1c2goY29tbWFuZClcclxuICAgIHRoaXMucmVkb1N0YWNrID0gW11cclxuICB9XHJcbiAgdW5kbygpIHtcclxuICAgIGlmICh0aGlzLnVuZG9TdGFjay5sZW5ndGggPT09IDApIHtcclxuICAgICAgY29uc29sZS5sb2coJ3VuZG8gc3RhY2sgaXMgZW1wdHksIGNhbiBub3QgdW5kbycpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgY29uc3QgY29tbWFuZCA9IHRoaXMudW5kb1N0YWNrLnBvcCgpXHJcbiAgICB0aGlzLnJlZG9TdGFjay5wdXNoKGNvbW1hbmQpXHJcbiAgICBjb21tYW5kLnVuZG8oKVxyXG4gICAgY29tbWFuZC5hZnRlclVuZG8oKVxyXG4gIH1cclxuICByZWRvKCkge1xyXG4gICAgaWYgKHRoaXMucmVkb1N0YWNrLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjb25zb2xlLmxvZygncmVkbyBzdGFjayBpcyBlbXB0eSwgY2FuIG5vdCByZWRvJylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCBjb21tYW5kID0gdGhpcy5yZWRvU3RhY2sucG9wKClcclxuICAgIHRoaXMudW5kb1N0YWNrLnB1c2goY29tbWFuZClcclxuICAgIGNvbW1hbmQucmVkbygpXHJcbiAgICBjb21tYW5kLmFmdGVyUmVkbygpXHJcbiAgfVxyXG4gIC8vIOazqOWGjOWRveS7pOexu+WIsOWRveS7pOeuoeeQhuWvueixoeS4reOAglxyXG4gIHJlc2lndGVyQ29tbWFuZENsYXNzKGNvbW1hbmRDbGFzcykge1xyXG4gICAgY29uc3QgbmFtZSA9IGNvbW1hbmRDbGFzcy5uYW1lKClcclxuICAgIHRoaXMuY29tbWFuZENsYXNzZXNbbmFtZV0gPSBjb21tYW5kQ2xhc3NcclxuICB9XHJcbiAgYWZ0ZXJBbnlVbmRvKCkge1xyXG5cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbW1hbmRNYW5hZ2VyIiwiaW1wb3J0IHsgRlNWRyB9IGZyb20gXCIuLi9lbGVtZW50XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlQ29tbWFuZCB7XHJcbiAgdW5kbygpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcigncGxlYXNlIG92ZXJyaWRlIHVuZG8gbWV0aG9kJylcclxuICB9XHJcbiAgcmVkbygpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcigncGxlYXNlIG92ZXJyaWRlIHJlZG8gbWV0aG9kJylcclxuICB9XHJcbiAgYWZ0ZXJSZWRvKCkge31cclxuICBhZnRlclVuZG8oKSB7fVxyXG59XHJcblxyXG4vKipcclxuICogYWRkUmVjdFxyXG4gKiBcclxuICogYWRkIHJlY3Qgc3ZnIGVsZW1lbnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBZGRSZWN0IGV4dGVuZHMgQmFzZUNvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgeCwgeSwgdywgaCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICAgIGNvbnN0IHJlY3QgPSBuZXcgRlNWRy5SZWN0KHgsIHksIHcsIGgpXHJcblxyXG4gICAgY29uc3QgZmlsbCA9IGVkaXRvci5zZXR0aW5nLmdldCgnZmlsbCcpXHJcbiAgICBjb25zdCBzdHJva2UgPSBlZGl0b3Iuc2V0dGluZy5nZXQoJ3N0cm9rZScpXHJcbiAgICBjb25zdCBzdHJva2VXaWR0aCA9IGVkaXRvci5zZXR0aW5nLmdldCgnc3Ryb2tlV2lkdGgnKVxyXG4gICAgcmVjdC5zZXRBdHRyKCdmaWxsJywgZmlsbClcclxuICAgIHJlY3Quc2V0QXR0cignc3Ryb2tlJywgc3Ryb2tlKVxyXG4gICAgcmVjdC5zZXRBdHRyKCdzdHJva2Utd2lkdGgnLCBzdHJva2VXaWR0aClcclxuXHJcbiAgICBlZGl0b3IuZ2V0Q3VycmVudExheWVyKCkuYXBwZW5kQ2hpbGQocmVjdC5lbCgpKVxyXG5cclxuICAgIHRoaXMubmV4dFNpYmxpbmcgPSByZWN0LmVsKCkubmV4dEVsZW1lbnRTaWJsaW5nIFxyXG4gICAgdGhpcy5wYXJlbnQgPSByZWN0LmVsKCkucGFyZW50RWxlbWVudFxyXG4gICAgdGhpcy5yZWN0ID0gcmVjdFxyXG5cclxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVscyh0aGlzLnJlY3QpXHJcbiAgfVxyXG4gIHN0YXRpYyBuYW1lKCkge1xyXG4gICAgcmV0dXJuICdhZGRSZWN0J1xyXG4gIH1cclxuICByZWRvKCkge1xyXG4gICAgY29uc3QgZWwgPSB0aGlzLnJlY3QuZWwoKVxyXG4gICAgaWYgKHRoaXMubmV4dFNpYmxpbmcpIHtcclxuICAgICAgdGhpcy5wYXJlbnQuaW5zZXJ0QmVmb3JlKGVsLCB0aGlzLm5leHRTaWJsaW5nKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQoZWwpXHJcbiAgICB9XHJcbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHModGhpcy5yZWN0KVxyXG4gIH1cclxuICB1bmRvKCkge1xyXG4gICAgdGhpcy5yZWN0LmVsKCkucmVtb3ZlKClcclxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLmNsZWFyKClcclxuICB9XHJcbn1cclxuLyoqXHJcbiAqIHJlbW92ZSBlbGVtZW50c1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIHJlbW92ZVNlbGVjdGVkRWxlbWVudHMgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IoZWRpdG9yKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG5cclxuICAgIHRoaXMuZWxzID0gdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuZ2V0RWxzKClcclxuXHJcbiAgICBjb25zdCBzaXplID0gdGhpcy5lbHMubGVuZ3RoXHJcbiAgICB0aGlzLnBhcmVudHMgPSBuZXcgQXJyYXkoc2l6ZSlcclxuICAgIHRoaXMubmV4dFNpYmxpbmdzID0gbmV3IEFycmF5KHNpemUpXHJcbiAgICB0aGlzLmVscy5mb3JFYWNoKChlbCwgaWR4KSA9PiB7XHJcbiAgICAgIHRoaXMubmV4dFNpYmxpbmdzW2lkeF0gPSBlbC5lbCgpLm5leHRFbGVtZW50U2libGluZyBcclxuICAgICAgdGhpcy5wYXJlbnRzW2lkeF0gPSBlbC5lbCgpLnBhcmVudEVsZW1lbnRcclxuICAgIH0pXHJcbiAgICB0aGlzLmV4ZWN1dGUoKVxyXG4gIH1cclxuICBzdGF0aWMgbmFtZSgpIHtcclxuICAgIHJldHVybiAncmVtb3ZlU2VsZWN0ZWRFbGVtZW50cydcclxuICB9XHJcbiAgZXhlY3V0ZSgpIHsgLy8gcHJpdmF0ZVxyXG4gICAgdGhpcy5lbHMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgaXRlbS5yZW1vdmUoKVxyXG4gICAgfSlcclxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLmNsZWFyKClcclxuICB9XHJcbiAgcmVkbygpIHtcclxuICAgIHRoaXMuZXhlY3V0ZSgpXHJcbiAgfVxyXG4gIHVuZG8oKSB7XHJcbiAgICBmb3IgKGxldCBpZHggPSB0aGlzLmVscy5sZW5ndGggLSAxOyBpZHggPj0gMDsgaWR4LS0pIHtcclxuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxzW2lkeF1cclxuICAgICAgY29uc3QgZWwgPSBlbGVtZW50LmVsKClcclxuICAgICAgaWYgKHRoaXMubmV4dFNpYmxpbmdzW2lkeF0pIHtcclxuICAgICAgICB0aGlzLnBhcmVudHNbaWR4XS5pbnNlcnRCZWZvcmUoZWwsIHRoaXMubmV4dFNpYmxpbmdzW2lkeF0pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wYXJlbnRzW2lkeF0uYXBwZW5kQ2hpbGQoZWwpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVkaXRvci5hY3RpdmVkRWxzTWFuYWdlci5zZXRFbHModGhpcy5lbHMpXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogRE1vdmVcclxuICogXHJcbiAqIGRtb3ZlIGVsZW1lbnRzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRE1vdmUgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XHJcbiAgY29uc3RydWN0b3IoZWRpdG9yLCBlbHMsIGR4LCBkeSkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICAgIHRoaXMuZHggPSBkeFxyXG4gICAgdGhpcy5keSA9IGR5XHJcbiAgICB0aGlzLmVscyA9IGVsc1xyXG5cclxuICAgIHRoaXMuZWxzLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICBlbC5kbW92ZSh0aGlzLmR4LCB0aGlzLmR5KVxyXG4gICAgfSlcclxuICB9XHJcbiAgc3RhdGljIG5hbWUoKSB7XHJcbiAgICByZXR1cm4gJ2Rtb3ZlJ1xyXG4gIH1cclxuICByZWRvKCkge1xyXG4gICAgdGhpcy5lbHMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgIGVsLmRtb3ZlKHRoaXMuZHgsIHRoaXMuZHkpXHJcbiAgICB9KVxyXG4gIH1cclxuICB1bmRvKCkge1xyXG4gICAgdGhpcy5lbHMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgIGVsLmRtb3ZlKC10aGlzLmR4LCAtdGhpcy5keSlcclxuICAgIH0pXHJcbiAgfVxyXG4gIGFmdGVyUmVkbygpIHtcclxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVscyh0aGlzLmVscylcclxuICB9XHJcbiAgYWZ0ZXJVbmRvKCkge1xyXG4gICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzKHRoaXMuZWxzKVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIHNldEF0dHJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXRBdHRyIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xyXG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgZWxzLCBhdHRyTmFtZSwgdmFsKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGVscykpIGVscyA9IFtlbHNdXHJcbiAgICB0aGlzLmVscyA9IGVsc1xyXG4gICAgdGhpcy5hdHRyTmFtZSA9IGF0dHJOYW1lXHJcbiAgICB0aGlzLmJlZm9yZVZhbCA9IHRoaXMuZWxzLm1hcChlbCA9PiBlbC5nZXRBdHRyKGF0dHJOYW1lKSlcclxuICAgIHRoaXMuYWZ0ZXJWYWwgPSB2YWxcclxuXHJcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgZWwuc2V0QXR0cihhdHRyTmFtZSwgdmFsKVxyXG4gICAgfSlcclxuICB9XHJcbiAgc3RhdGljIG5hbWUoKSB7XHJcbiAgICByZXR1cm4gJ3NldEF0dHInXHJcbiAgfVxyXG4gIHJlZG8oKSB7XHJcbiAgICB0aGlzLmVscy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgZWwuc2V0QXR0cih0aGlzLmF0dHJOYW1lLCB0aGlzLmFmdGVyVmFsKVxyXG4gICAgfSlcclxuICB9XHJcbiAgdW5kbygpIHtcclxuICAgIHRoaXMuZWxzLmZvckVhY2goKGVsLCBpKSA9PiB7XHJcbiAgICAgIGVsLnNldEF0dHIodGhpcy5hdHRyTmFtZSwgdGhpcy5iZWZvcmVWYWxbaV0pXHJcbiAgICB9KVxyXG4gIH1cclxufSIsIi8vIOW4uOmHj1xyXG5cclxuY29uc3QgTlMgPSB7XHJcbiAgSFRNTDogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLFxyXG4gIE1BVEg6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MJyxcclxuICBTRTogJ2h0dHA6Ly9zdmctZWRpdC5nb29nbGVjb2RlLmNvbScsXHJcbiAgU1ZHOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxyXG4gIFhMSU5LOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsXHJcbiAgWE1MOiAnaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlJyxcclxuICBYTUxOUzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvJyAvLyBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvUkVDLXhtbC1uYW1lcy8jeG1sUmVzZXJ2ZWRcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgTlMsXHJcbn0gXHJcblxyXG5cclxuXHJcbiIsImV4cG9ydCBjb25zdCBpc0RlYnVnID0gdHJ1ZVxyXG4iLCJpbXBvcnQgeyBBY3RpdmVkRWxzTWFuYWdlciB9IGZyb20gXCIuL2FjdGl2ZWRFbHNNYW5hZ2VyXCJcclxuaW1wb3J0IHsgRWRpdG9yRXZlbnRDb250ZXh0IH0gZnJvbSBcIi4vZWRpdG9yRXZlbnRDb250ZXh0XCJcclxuaW1wb3J0IHsgSHVkTWFuYWdlciB9IGZyb20gXCIuL2xheWVyL2h1ZE1hbmFnZXJcIlxyXG5pbXBvcnQgeyBTaG9ydGN1dCB9IGZyb20gXCIuL3Nob3J0Y3V0XCJcclxuXHJcbmNsYXNzIEVkaXRvciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnNldHRpbmcgPSBudWxsXHJcbiAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyID0gbnVsbFxyXG4gICAgdGhpcy56b29tTWFuYWdlciA9IG51bGxcclxuICAgIHRoaXMuYWN0aXZlZEVsc01hbmFnZXIgPSBuZXcgQWN0aXZlZEVsc01hbmFnZXIodGhpcylcclxuICAgIHRoaXMuc2hvcnRjdXQgPSBuZXcgU2hvcnRjdXQodGhpcylcclxuXHJcbiAgICAvLyBjb25zdCBjb250ZW50V2lkdGggPSA0MDBcclxuICAgIC8vIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSAzMDBcclxuICAgIC8vIGNvbnN0IHN0YWdlV2lkdGggPSAxMDAwIC8vIOato+WcqOe6oOe7k+WRveWQjVxyXG4gICAgLy8gY29uc3Qgc3RhZ2VIZWlnaHQgPSA2MDBcclxuICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPSA4MDBcclxuICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0ID0gNTUwXHJcblxyXG4gICAgY29uc3Qgdmlld3BvcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgdmlld3BvcnQuaWQgPSAndmlld3BvcnQnXHJcbiAgICB2aWV3cG9ydC5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkICMwMDAnXHJcbiAgICB2aWV3cG9ydC5zdHlsZS53aWR0aCA9IHZpZXdwb3J0V2lkdGggKyAncHgnXHJcbiAgICB2aWV3cG9ydC5zdHlsZS5oZWlnaHQgPSB2aWV3cG9ydEhlaWdodCArICdweCdcclxuICAgIHRoaXMudmlld3BvcnQgPSB2aWV3cG9ydFxyXG4gICAgXHJcbiAgICBjb25zdCBzdmdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgc3ZnQ29udGFpbmVyLmlkID0gJ3N2Zy1jb250YWluZXInXHJcbiAgICBzdmdDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNkZGQnXHJcbiAgICBzdmdDb250YWluZXIuc3R5bGUud2lkdGggPSB2aWV3cG9ydFdpZHRoICsgJ3B4J1xyXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHZpZXdwb3J0SGVpZ2h0ICsgJ3B4J1xyXG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCdcclxuICAgIHRoaXMuc3ZnQ29udGFpbmVyID0gc3ZnQ29udGFpbmVyXHJcblxyXG4gICAgY29uc3Qgc3ZnUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJylcclxuICAgIHN2Z1Jvb3QuaWQgPSAnc3ZnLXJvb3QnXHJcbiAgICBzdmdSb290LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAxMDAwKVxyXG4gICAgc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDYwMClcclxuICAgIHN2Z1Jvb3Quc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAxMDAwIDYwMCcpXHJcbiAgICB0aGlzLnN2Z1Jvb3QgPSBzdmdSb290XHJcblxyXG4gICAgY29uc3Qgc3ZnU3RhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpXHJcbiAgICBzdmdTdGFnZS5pZCA9ICdzdmctc3RhZ2UnXHJcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgNDAwKVxyXG4gICAgc3ZnU3RhZ2Uuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAzMDApXHJcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ3gnLCAzMDApXHJcbiAgICBzdmdTdGFnZS5zZXRBdHRyaWJ1dGUoJ3knLCAxNTApXHJcbiAgICBzdmdTdGFnZS5zdHlsZS5vdmVyZmxvdyA9ICd2aXNpYmxlJ1xyXG4gICAgdGhpcy5zdmdTdGFnZSA9IHN2Z1N0YWdlXHJcblxyXG4gICAgY29uc3Qgc3ZnQmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2cnKVxyXG4gICAgc3ZnQmcuaWQgPSAnYmFja2dyb3VuZCdcclxuICAgIC8vIHN2Z0JnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCA0MDApXHJcbiAgICAvLyBzdmdCZy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDMwMClcclxuICAgIHN2Z0JnLnNldEF0dHJpYnV0ZSgneCcsIDApXHJcbiAgICBzdmdCZy5zZXRBdHRyaWJ1dGUoJ3knLCAwKVxyXG5cclxuICAgIGNvbnN0IGJnUmVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAncmVjdCcpXHJcbiAgICBiZ1JlY3Quc2V0QXR0cmlidXRlKCd3aWR0aCcsICcxMDAlJylcclxuICAgIGJnUmVjdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMDAlJylcclxuICAgIGJnUmVjdC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnI2ZmZicpXHJcblxyXG4gICAgY29uc3Qgc3ZnQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnZycpXHJcbiAgICBzdmdDb250ZW50LmlkID0gJ2NvbnRlbnQnXHJcbiAgICAvLyBzdmdDb250ZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCA0MDApXHJcbiAgICAvLyBzdmdDb250ZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgMzAwKVxyXG4gICAgc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3gnLCAwKVxyXG4gICAgc3ZnQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3knLCAwKVxyXG4gICAgdGhpcy5zdmdDb250ZW50ID0gc3ZnQ29udGVudFxyXG5cclxuICAgIGNvbnN0IGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJylcclxuICAgIGxheWVyLmlkID0gJ2xheWVyLTEnXHJcbiAgICB0aGlzLmN1cnJlbnRMYXllciA9IGxheWVyXHJcblxyXG4gICAgdmlld3BvcnQuYXBwZW5kQ2hpbGQoc3ZnQ29udGFpbmVyKVxyXG4gICAgc3ZnQ29udGFpbmVyLmFwcGVuZENoaWxkKHN2Z1Jvb3QpXHJcbiAgICBzdmdSb290LmFwcGVuZENoaWxkKHN2Z1N0YWdlKVxyXG5cclxuICAgIHN2Z1N0YWdlLmFwcGVuZENoaWxkKHN2Z0JnKVxyXG4gICAgc3ZnQmcuYXBwZW5kQ2hpbGQoYmdSZWN0KVxyXG4gICAgc3ZnU3RhZ2UuYXBwZW5kQ2hpbGQoc3ZnQ29udGVudClcclxuICAgIHN2Z0NvbnRlbnQuYXBwZW5kQ2hpbGQobGF5ZXIpXHJcblxyXG5cclxuICAgIHRoaXMuaHVkTWFuYWdlciA9IG5ldyBIdWRNYW5hZ2VyKClcclxuICAgIHRoaXMuaHVkTWFuYWdlci5tb3VudChzdmdTdGFnZSlcclxuXHJcbiAgICAvLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZXdwb3J0KVxyXG4gIH1cclxuICBtb3VudChzZWxlY3Rvcikge1xyXG4gICAgY29uc3QgbW91bnROb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcclxuICAgIG1vdW50Tm9kZS5hcHBlbmRDaGlsZCh0aGlzLnZpZXdwb3J0KVxyXG4gIH1cclxuICBnZXRDdXJyZW50TGF5ZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50TGF5ZXJcclxuICB9XHJcblxyXG4gIHNldFRvb2xNYW5hZ2VyKHRvb2xNYW5hZ2VyKSB7XHJcbiAgICB0aGlzLnRvb2xNYW5hZ2VyID0gdG9vbE1hbmFnZXJcclxuICB9XHJcbiAgLy8gdG9vbCByZWxhdGl2ZWQgbWV0aG9kc1xyXG4gIHNldEN1cnJlbnRUb29sKG5hbWUpIHtcclxuICAgIHRoaXMudG9vbE1hbmFnZXIuc2V0Q3VycmVudFRvb2wobmFtZSlcclxuICB9XHJcbiAgcmVnaXN0ZXJUb29sKHRvb2wpIHtcclxuICAgIHRoaXMudG9vbE1hbmFnZXIucmVnaXN0ZXJUb29sKHRvb2wpXHJcbiAgfVxyXG4gIHNldFNldHRpbmcoc2V0dGluZykge1xyXG4gICAgdGhpcy5zZXR0aW5nID0gc2V0dGluZ1xyXG4gIH1cclxuXHJcbiAgLy8g5ZG95Luk55u45YWzXHJcbiAgc2V0Q29tbWFuZE1hbmFnZXIoY29tbWFuZE1hbmFnZXIpIHtcclxuICAgIHRoaXMuY29tbWFuZE1hbmFnZXIgPSBjb21tYW5kTWFuYWdlclxyXG4gIH1cclxuICBleGVjdXRlQ29tbWFuZChuYW1lLCAuLi5wYXJhbXMpIHtcclxuICAgIGlmIChuYW1lID09ICd1bmRvJykge1xyXG4gICAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyLnVuZG8oKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGlmIChuYW1lID09ICdyZWRvJykge1xyXG4gICAgICB0aGlzLmNvbW1hbmRNYW5hZ2VyLnJlZG8oKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIHRoaXMuY29tbWFuZE1hbmFnZXIuZXhlY3V0ZShuYW1lLCAuLi5wYXJhbXMpXHJcbiAgfVxyXG5cclxuICAvLyB6b29tXHJcbiAgc2V0Wm9vbU1hbmFnZXIoem9vbU1hbmFnZXIpIHtcclxuICAgIHpvb21NYW5hZ2VyLnNldEVkaXRvcih0aGlzKVxyXG4gICAgdGhpcy56b29tTWFuYWdlciA9IHpvb21NYW5hZ2VyXHJcbiAgfVxyXG4gIGdldFpvb20oKSB7IC8vIOWwgeijhVxyXG4gICAgcmV0dXJuIHRoaXMuem9vbU1hbmFnZXIuZ2V0Wm9vbSgpXHJcbiAgfVxyXG5cclxuICBnZXRTY3JvbGwoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxMZWZ0LFxyXG4gICAgICB5OiB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxUb3AsXHJcbiAgICB9XHJcbiAgfVxyXG4gIHNldFNjcm9sbCh4LCB5KSB7XHJcbiAgICB0aGlzLnN2Z0NvbnRhaW5lci5zY3JvbGxMZWZ0ID0geFxyXG4gICAgdGhpcy5zdmdDb250YWluZXIuc2Nyb2xsVG9wID0geVxyXG4gIH1cclxuICBnZXRDb250ZW50T2Zmc2V0KCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogdGhpcy5zdmdTdGFnZS5nZXRBdHRyaWJ1dGUoJ3gnKSxcclxuICAgICAgeTogdGhpcy5zdmdTdGFnZS5nZXRBdHRyaWJ1dGUoJ3knKSxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzQ29udGVudEVsZW1lbnQoZWwpIHtcclxuICAgIHdoaWxlIChlbCkge1xyXG4gICAgICBpZiAoZWwucGFyZW50RWxlbWVudCA9PSB0aGlzLnN2Z0NvbnRlbnQpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChlbC5wYXJlbnRFbGVtZW50ID09IHRoaXMuc3ZnUm9vdCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFZGl0b3JcclxuIiwiXHJcbi8qKlxyXG4gKiBjb250ZXh0IGNsYXNzXHJcbiAqIFxyXG4gKiB1c2VkIGZvciB0b29sIGV2ZW50XHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEVkaXRvckV2ZW50Q29udGV4dCB7XHJcbiAgY29uc3RydWN0b3IoZWRpdG9yLCBlKSB7XHJcbiAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IGZhbHNlXHJcbiAgICB0aGlzLm9yaWdpbkV2ZW50ID0gZVxyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICAgIHRoaXMuaXNFbmRJbnNpZGUgPSBmYWxzZVxyXG5cclxuICAgIHRoaXMuc3RhcnRYID0gMFxyXG4gICAgdGhpcy5zdGFydFkgPSAwXHJcblxyXG4gICAgdGhpcy5vZmZzZXRYID0gMFxyXG4gICAgdGhpcy5vZmZzZXRZID0gMFxyXG5cclxuICAgIHRoaXMuc3RhcnRDbGllbnRYID0gMCAvLyB1c2VkIHRvIGNhbGMgZHggYW5kIGR5LlxyXG4gICAgdGhpcy5zdGFydENsaWVudFkgPSAwXHJcbiAgICB0aGlzLmR4ID0gMFxyXG4gICAgdGhpcy5keSA9IDBcclxuXHJcbiAgICB0aGlzLnNldFN0YXJ0UG9zKClcclxuICB9XHJcbiAgc2V0T3JpZ2luRXZlbnQoZSkge1xyXG4gICAgdGhpcy5vcmlnaW5FdmVudCA9IGVcclxuICB9XHJcbiAgc2V0U3RhcnRQb3MoKSB7XHJcbiAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMuZ2V0UG9zKClcclxuXHJcbiAgICB0aGlzLnN0YXJ0WCA9IHhcclxuICAgIHRoaXMuc3RhcnRZID0geVxyXG5cclxuICAgIHRoaXMuc3RhcnRDbGllbnRYID0gdGhpcy5vcmlnaW5FdmVudC5jbGllbnRYXHJcbiAgICB0aGlzLnN0YXJ0Q2xpZW50WSA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WVxyXG4gIH1cclxuICByZWxlYXNlTW91c2UoKSB7XHJcbiAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IGZhbHNlXHJcbiAgfVxyXG4gIHByZXNzTW91c2UoKSB7XHJcbiAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IHRydWVcclxuICB9XHJcbiAgZ2V0UG9zKCkge1xyXG4gICAgY29uc3Qgem9vbSA9IHRoaXMuZWRpdG9yLmdldFpvb20oKVxyXG4gICAgY29uc3Qge3gsIHl9ID0gdGhpcy5lZGl0b3IuZ2V0Q29udGVudE9mZnNldCgpXHJcbiAgICByZXR1cm4geyBcclxuICAgICAgeDogdGhpcy5vcmlnaW5FdmVudC5vZmZzZXRYIC8gem9vbSAtIHgsIFxyXG4gICAgICB5OiB0aGlzLm9yaWdpbkV2ZW50Lm9mZnNldFkgLyB6b29tIC0geSxcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0U3RhcnRQb3MoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiB0aGlzLnN0YXJ0WCxcclxuICAgICAgeTogdGhpcy5zdGFydFksXHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIHdpdGhvdXQgY2FsYyB3aXRoIHpvb20gdmFsdWVcclxuICBnZXREaWZmUG9zKCkge1xyXG4gICAgY29uc3QgeCA9IHRoaXMub3JpZ2luRXZlbnQuY2xpZW50WCAtIHRoaXMuc3RhcnRDbGllbnRYXHJcbiAgICBjb25zdCB5ID0gdGhpcy5vcmlnaW5FdmVudC5jbGllbnRZIC0gdGhpcy5zdGFydENsaWVudFlcclxuICAgIHJldHVybiB7IHgsIHkgfVxyXG4gIH1cclxuXHJcbn0iLCJcclxuLyoqXHJcbiAqIOWvuSBTVkcg5YWD57Sg55qE566A5Y2V5bCB6KOFXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgRlNWRyB9IGZyb20gXCIuXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBGRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmVsXyA9IG51bGxcclxuICB9XHJcbiAgZWwoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbF9cclxuICB9XHJcbiAgc2V0QXR0cihwcm9wLCB2YWwpIHtcclxuICAgIHJldHVybiB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUocHJvcCwgdmFsKVxyXG4gIH1cclxuICBnZXRBdHRyKHByb3ApIHtcclxuICAgIHJldHVybiB0aGlzLmVsXy5nZXRBdHRyaWJ1dGUocHJvcClcclxuICB9XHJcbiAgZ2V0QkJveCgpIHtcclxuICAgIHJldHVybiB0aGlzLmVsXy5nZXRCQm94KClcclxuICB9XHJcbiAgcmVtb3ZlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxfLnJlbW92ZSgpXHJcbiAgfVxyXG5cclxuICAvKiogRE9NIG1ldGhvZHMgKi9cclxuICBwYXJlbnQoKSB7XHJcbiAgICByZXR1cm4gbmV3IEZTVkcuR3JvdXAodGhpcy5lbF8ucGFyZW50RWxlbWVudClcclxuICB9XHJcbiAgbmV4dFNpYmxpbmcoKSB7XHJcbiAgICBjb25zdCBuID0gdGhpcy5lbF8ubmV4dEVsZW1lbnRTaWJsaW5nXHJcbiAgICBpZiAobiA9PSBudWxsKSByZXR1cm4gblxyXG4gICAgcmV0dXJuIEZTVkcuY3JlYXRlKG4pXHJcbiAgfVxyXG4gIHByZXZpb3VzU2libGluZygpIHtcclxuICAgIGNvbnN0IG4gPSB0aGlzLmVsXy5wcmV2aW91c1NpYmxpbmdcclxuICAgIGlmIChuID09IG51bGwpIHJldHVybiBuXHJcbiAgICByZXR1cm4gRlNWRy5jcmVhdGUobilcclxuICB9XHJcbiAgYXBwZW5kKGVsKSB7XHJcbiAgICB0aGlzLmVsXy5hcHBlbmRDaGlsZChlbC5lbCgpKVxyXG4gIH1cclxuICBmcm9udCgpIHtcclxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZWxfLnBhcmVudEVsZW1lbnRcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsXylcclxuICB9XHJcbiAgYmFjaygpIHtcclxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZWxfLnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnN0IGZpcnN0Q2hpbGQgPSBwYXJlbnQuY2hpbGRyZW5bMF1cclxuICAgIGlmIChmaXJzdENoaWxkKSB7XHJcbiAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUodGhpcy5lbF8sIGZpcnN0Q2hpbGQpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGJlZm9yZShyZWZlckVsZW1lbnQpIHtcclxuICAgIGlmIChyZWZlckVsZW1lbnQuZWwpIHtcclxuICAgICAgcmVmZXJFbGVtZW50ID0gcmVmZXJFbGVtZW50LmVsKClcclxuICAgIH1cclxuICAgIGNvbnN0IHBhcmVudCA9IHJlZmVyRWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbiAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKHRoaXMuZWxfLCByZWZlckVsZW1lbnQpXHJcbiAgfVxyXG4gIGFmdGVyKHJlZmVyRWxlbWVudCkge1xyXG4gICAgaWYgKHJlZmVyRWxlbWVudC5lbCkge1xyXG4gICAgICByZWZlckVsZW1lbnQgPSByZWZlckVsZW1lbnQuZWwoKVxyXG4gICAgfVxyXG4gICAgY29uc3QgcGFyZW50ID0gcmVmZXJFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnN0IG5leHRTaWJsaW5nID0gcmVmZXJFbGVtZW50Lm5leHRTaWJsaW5nXHJcbiAgICBpZiAobmV4dFNpYmxpbmcpIHtcclxuICAgICAgcGFyZW50Lmluc2VydEJlZm9yZSh0aGlzLmVsXywgbmV4dFNpYmxpbmcpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbF8pXHJcbiAgICB9XHJcbiAgIFxyXG4gIH1cclxuIH0iLCJcclxuZXhwb3J0IGNsYXNzIEJveCB7XHJcbiAgY29uc3RydWN0b3IoeCwgeSwgdywgaCkge1xyXG4gICAgaWYgKHR5cGVvZiB4ID09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRoaXMueCA9IHgueFxyXG4gICAgICB0aGlzLnkgPSB4LnlcclxuICAgICAgdGhpcy53ID0geC53aWR0aFxyXG4gICAgICB0aGlzLmggPSB4LmhlaWdodFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy54ID0geFxyXG4gICAgICB0aGlzLnkgPSB5XHJcbiAgICAgIHRoaXMudyA9IHdcclxuICAgICAgdGhpcy5oID0gaFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMud2lkdGggPSB0aGlzLndcclxuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5oXHJcbiAgICB0aGlzLngyID0gdGhpcy54ICsgdGhpcy53XHJcbiAgICB0aGlzLnkyID0gdGhpcy55ICsgdGhpcy5oXHJcbiAgfVxyXG4gIGNvbnRhaW5zKG90aGVyQm94KSB7XHJcbiAgICByZXR1cm4gdGhpcy54IDw9IG90aGVyQm94LnggJiYgdGhpcy55IDw9IG90aGVyQm94LnkgJiZcclxuICAgICAgdGhpcy54MiA+PSBvdGhlckJveC54ICsgb3RoZXJCb3gud2lkdGggJiYgdGhpcy55MiA+PSBvdGhlckJveC55ICsgb3RoZXJCb3guaGVpZ2h0XHJcbiAgfVxyXG5cclxuICBtZXJnZShvdGhlckJveCkge1xyXG4gICAgY29uc3QgeCA9IE1hdGgubWluKHRoaXMueCwgb3RoZXJCb3gueClcclxuICAgIGNvbnN0IHkgPSBNYXRoLm1pbih0aGlzLnksIG90aGVyQm94LnkpXHJcbiAgICBjb25zdCB4MiA9IE1hdGgubWF4KHRoaXMueDIsIG90aGVyQm94LngyKVxyXG4gICAgY29uc3QgeTIgPSBNYXRoLm1heCh0aGlzLnkyLCBvdGhlckJveC55MilcclxuICAgIGNvbnN0IHcgPSB4MiAtIHhcclxuICAgIGNvbnN0IGggPSB5MiAtIHlcclxuICAgIHJldHVybiBuZXcgQm94KHgsIHksIHcsIGgpXHJcbiAgfVxyXG59IiwiXHJcbi8qKlxyXG4gKiBncm91cFxyXG4gKiBcclxuICogRW5jYXBzdWxhdGlvbiBvZiA8Zz4gXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgTlMgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCJcclxuaW1wb3J0IHsgRkVsZW1lbnQgfSBmcm9tIFwiLi9iYXNlRWxlbWVudFwiXHJcblxyXG5leHBvcnQgY2xhc3MgR3JvdXAgZXh0ZW5kcyBGRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3IoZWwpIHtcclxuICAgIHN1cGVyKClcclxuICAgIGlmIChlbCkge1xyXG4gICAgICB0aGlzLmVsXyA9IGVsXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVsXyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdnJylcclxuICAgIH1cclxuICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQm94IH0gZnJvbSBcIi4vYm94XCJcclxuaW1wb3J0IHsgUmVjdCB9IGZyb20gXCIuL3JlY3RcIlxyXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gXCIuL2dyb3VwXCJcclxuXHJcbi8qKlxyXG4gKiBGU1ZHXHJcbiAqIFxyXG4gKiBzaW1wbGUgU1ZHRWxlbWVudCBlbmNhcHN1bGF0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGUoZWwpIHtcclxuICBjb25zdCB0YWdOYW1lID0gZWwudGFnTmFtZVxyXG4gIGlmICh0YWdOYW1lID09PSAncmVjdCcpIHtcclxuICAgIHJldHVybiBuZXcgRlNWRy5SZWN0KGVsKVxyXG4gIH0gZWxzZSBpZiAodGFnTmFtZSA9PT0gJ2cnKSB7XHJcbiAgICByZXR1cm4gbmV3IEZTVkcuR3JvdXAoZWwpXHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYW4gbm90IGNyZWF0ICR7dGFnTmFtZX0gaW5zdGFuY2UsIG5vIG1hdGNoIGNsYXNzLmApXHJcbiAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IEZTVkcgPSB7XHJcbiAgY3JlYXRlLFxyXG4gIFJlY3QsXHJcbiAgQm94LFxyXG4gIEdyb3VwLFxyXG59IiwiXHJcbi8qKlxyXG4gKiDlr7kgcmVjdCDlhYPntKDnmoTnroDljZXlsIHoo4VcclxuICovXHJcblxyXG5pbXBvcnQgeyBOUyB9IGZyb20gXCIuLi9jb25zdGFudHNcIlxyXG5pbXBvcnQgeyBGRWxlbWVudCB9IGZyb20gXCIuL2Jhc2VFbGVtZW50XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWN0IGV4dGVuZHMgRkVsZW1lbnQge1xyXG4gIC8vIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlcik7XHJcbiAgLy8gY29uc3RydWN0b3IoZWw6IFNWR0VsZW1lbnQpO1xyXG4gIGNvbnN0cnVjdG9yKHgsIHksIHcsIGgpIHtcclxuICAgIHN1cGVyKClcclxuICAgIGlmICh0eXBlb2YgeCA9PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aGlzLmVsXyA9IHhcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWxfID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ3JlY3QnKVxyXG4gICAgICB0aGlzLnNldEF0dHIoJ3gnLCB4KVxyXG4gICAgICB0aGlzLnNldEF0dHIoJ3knLCB5KVxyXG4gICAgICB0aGlzLnNldEF0dHIoJ3dpZHRoJywgdylcclxuICAgICAgdGhpcy5zZXRBdHRyKCdoZWlnaHQnLCBoKVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRQb3MoKSB7XHJcbiAgICBjb25zdCB4ID0gcGFyc2VGbG9hdCh0aGlzLmdldEF0dHIoJ3gnKSlcclxuICAgIGNvbnN0IHkgPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cigneScpKVxyXG4gICAgcmV0dXJuIHsgeCwgeSB9XHJcbiAgfVxyXG4gIGRtb3ZlKGR4LCBkeSkge1xyXG4gICAgY29uc3QgcG9zID0gdGhpcy5nZXRQb3MoKVxyXG4gICAgdGhpcy5zZXRBdHRyKCd4JywgcG9zLnggKyBkeClcclxuICAgIHRoaXMuc2V0QXR0cigneScsIHBvcy55ICsgZHkpXHJcbiAgfVxyXG59IiwiLyoqXHJcbiAqIGd1aWRlIGxpbmUgbGF5ZXJcclxuICovXHJcblxyXG5pbXBvcnQgeyBPdXRsaW5lQm94SHVkIH0gZnJvbSBcIi4vb3V0bGluZUJveEh1ZFwiO1xyXG5pbXBvcnQgeyBTZWxlY3RBcmVhIH0gZnJvbSBcIi4vc2VsZWN0QXJlYVwiO1xyXG5jb25zdCB7IE5TIH0gPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzXCIpO1xyXG5cclxuZXhwb3J0IGNsYXNzIEh1ZE1hbmFnZXJ7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOUy5TVkcsICdnJylcclxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gJ2h1ZHMnXHJcblxyXG4gICAgdGhpcy5zZWxlY3RBcmVhID0gbmV3IFNlbGVjdEFyZWEodGhpcy5jb250YWluZXIpXHJcbiAgICB0aGlzLm91dGxpbmVCb3hIdWQgPSBuZXcgT3V0bGluZUJveEh1ZCh0aGlzLmNvbnRhaW5lcilcclxuICB9XHJcbiAgbW91bnQoZWwpIHtcclxuICAgIGVsLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKVxyXG4gIH1cclxufVxyXG5cclxuIiwiLyoqXHJcbiAqIGVsZW1lbnRzIG91dGxpbmUgYm94XHJcbiAqIFxyXG4gKi9cclxuXHJcbmNvbnN0IHsgTlMgfSA9IHJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgT3V0bGluZUJveEh1ZCB7XHJcbiAgY29uc3RydWN0b3IocGFyZW50KSB7XHJcbiAgICB0aGlzLnggPSAwXHJcbiAgICB0aGlzLnkgPSAwXHJcbiAgICB0aGlzLncgPSAwXHJcbiAgICB0aGlzLmggPSAwXHJcblxyXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAnZycpXHJcbiAgICB0aGlzLmNvbnRhaW5lci5pZCA9ICdvdXRsaW5lLWJveC1odWQnXHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpXHJcblxyXG4gICAgdGhpcy5vdXRsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5TLlNWRywgJ3BhdGgnKVxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJylcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICcjZjA0JylcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3ZlY3Rvci1lZmZlY3QnLCAnbm9uLXNjYWxpbmctc3Ryb2tlJylcclxuXHJcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLm91dGxpbmUpXHJcbiAgfVxyXG4gIGNsZWFyKCkge1xyXG4gICAgLy8gcGFyZW50LmlubmVySFRNTCA9ICcnXHJcbiAgICB0aGlzLm91dGxpbmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gIH1cclxuICBkcmF3UmVjdCh4LCB5LCB3LCBoKSB7XHJcbiAgICB0aGlzLnggPSB4XHJcbiAgICB0aGlzLnkgPSB5XHJcbiAgICB0aGlzLncgPSB3XHJcbiAgICB0aGlzLmggPSBoXHJcblxyXG4gICAgLy8gd2h5IGRvbid0IEkgdXNlIHJlY3QsIGp1c3Qgc29sdmUgdGhlIGNvbmRpdGlvbiB3aGVuIHdpZHRoIG9yIGhlaWdodCBpcyAwIHRoZSBvdXRsaW5lIGlzIGRpc2FwcGVyXHJcbiAgICBjb25zdCBkID0gYE0gJHt4fSAke3l9IEwgJHt4K3d9ICR7eX0gTCAke3grd30gJHt5K2h9IEwgJHt4fSAke3kraH0gWmBcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2QnLCBkKVxyXG4gICAgdGhpcy5vdXRsaW5lLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG4gIH1cclxuICBnZXRXaWR0aCgpIHsgcmV0dXJuIHRoaXMudyB9XHJcbiAgZ2V0SGVpZ2h0KCkgeyByZXR1cm4gdGhpcy5oIH1cclxuICBnZXRYKCkgeyByZXR1cm4gdGhpcy54IH1cclxuICBnZXRZKCkgeyByZXR1cm4gdGhpcy55IH1cclxufSIsIlxyXG5jb25zdCB7IE5TIH0gPSByZXF1aXJlKFwiLi4vY29uc3RhbnRzXCIpO1xyXG5cclxuLyoqXHJcbiAqIHNlbGVjdCBhcmVhXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VsZWN0QXJlYSB7XHJcbiAgY29uc3RydWN0b3IocGFyZW50KSB7XHJcbiAgICB0aGlzLnggPSAwXHJcbiAgICB0aGlzLnkgPSAwXHJcbiAgICB0aGlzLncgPSAwXHJcbiAgICB0aGlzLmggPSAwXHJcblxyXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAnZycpXHJcbiAgICB0aGlzLmNvbnRhaW5lci5pZCA9ICdzZWxlY3QtYXJlYSdcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcilcclxuXHJcbiAgICB0aGlzLm91dGxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlMuU1ZHLCAncGF0aCcpXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKVxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJyMwNTQnKVxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgndmVjdG9yLWVmZmVjdCcsICdub24tc2NhbGluZy1zdHJva2UnKVxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLWRhc2hhcnJheScsICc0cHgnKVxyXG5cclxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMub3V0bGluZSlcclxuICB9XHJcbiAgY2xlYXIoKSB7XHJcbiAgICAvLyBwYXJlbnQuaW5uZXJIVE1MID0gJydcclxuICAgIHRoaXMueCA9IHRoaXMueSA9IHRoaXMudyA9IHRoaXMuaCA9IDBcclxuICAgIHRoaXMub3V0bGluZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgfVxyXG4gIGRyYXdSZWN0KHgsIHksIHcsIGgpIHtcclxuICAgIHRoaXMueCA9IHhcclxuICAgIHRoaXMueSA9IHlcclxuICAgIHRoaXMudyA9IHdcclxuICAgIHRoaXMuaCA9IGhcclxuXHJcbiAgICAvLyB3aHkgZG9uJ3QgSSB1c2UgcmVjdCwganVzdCBzb2x2ZSB0aGUgY29uZGl0aW9uIHdoZW4gd2lkdGggb3IgaGVpZ2h0IGlzIDAgdGhlIG91dGxpbmUgaXMgZGlzYXBwZXJcclxuICAgIGNvbnN0IGQgPSBgTSAke3h9ICR7eX0gTCAke3grd30gJHt5fSBMICR7eCt3fSAke3kraH0gTCAke3h9ICR7eStofSBaYFxyXG4gICAgdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgnZCcsIGQpXHJcblxyXG4gICAgLyogdGhpcy5vdXRsaW5lLnNldEF0dHJpYnV0ZSgneCcsIHgpXHJcbiAgICB0aGlzLm91dGxpbmUuc2V0QXR0cmlidXRlKCd5JywgeSlcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdylcclxuICAgIHRoaXMub3V0bGluZS5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGgpICovXHJcbiAgICB0aGlzLm91dGxpbmUuc3R5bGUuZGlzcGxheSA9ICcnXHJcbiAgfVxyXG4gIGdldFdpZHRoKCkgeyByZXR1cm4gdGhpcy53IH1cclxuICBnZXRIZWlnaHQoKSB7IHJldHVybiB0aGlzLmggfVxyXG4gIGdldFgoKSB7IHJldHVybiB0aGlzLnggfVxyXG4gIGdldFkoKSB7IHJldHVybiB0aGlzLnkgfVxyXG4gIGdldEJveCgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IHRoaXMueCxcclxuICAgICAgeTogdGhpcy55LFxyXG4gICAgICB3aWR0aDogdGhpcy53LFxyXG4gICAgICBoZWlnaHQ6IHRoaXMuaCxcclxuICAgICAgdzogdGhpcy53LFxyXG4gICAgICBoOiB0aGlzLmgsXHJcbiAgICB9XHJcbiAgfVxyXG59IiwiXHJcbmltcG9ydCB7IGdldEJveEJ5MnBvaW50cyB9IGZyb20gXCIuLi91dGlsL21hdGhcIlxyXG5cclxuY2xhc3MgQWRkUmVjdCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcclxuICB9XHJcbiAgbmFtZSgpIHtcclxuICAgIHJldHVybiAnYWRkUmVjdCdcclxuICB9XHJcbiAgc2V0RWRpdG9yKGVkaXRvcikgeyAvLyDkvp3otZbms6jlhaVcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgfVxyXG4gIHN0YXJ0KGN0eCkge31cclxuICBtb3ZlKGN0eCkge1xyXG4gICAgY29uc3QgeyB4OiBlbmRYLCB5OiBlbmRZIH0gPSBjdHguZ2V0UG9zKClcclxuICAgIGNvbnN0IHsgeDogc3RhcnRYLCB5OiBzdGFydFkgfSA9IGN0eC5nZXRTdGFydFBvcygpXHJcbiAgICBjb25zdCB7IHgsIHksIHcsIGggfSA9IGdldEJveEJ5MnBvaW50cyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSlcclxuICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIub3V0bGluZUJveEh1ZC5kcmF3UmVjdCh4LCB5LCB3LCBoKVxyXG4gIH1cclxuICBlbmQoY3R4KSB7XHJcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVCb3hIdWQuY2xlYXIoKVxyXG5cclxuICAgIGNvbnN0IHsgeDogZW5kWCwgeTogZW5kWSB9ID0gY3R4LmdldFBvcygpXHJcbiAgICBjb25zdCB7IHg6IHN0YXJ0WCwgeTogc3RhcnRZIH0gPSBjdHguZ2V0U3RhcnRQb3MoKVxyXG4gICAgY29uc3QgeyB4LCB5LCB3LCBoIH0gPSBnZXRCb3hCeTJwb2ludHMoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpXHJcbiAgICBpZiAodyA8IDIgJiYgaCA8IDIpIHtcclxuICAgICAgLy8gVE9ETzogb3BlbiBhIGRpYWxvZyB0byBpbnB1dCB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgICAgIGNvbnNvbGUubG9nKCd3aWR0aCBhbmQgaGVpZ2h0IGJvdGggbGVzcyBlcXVhbCB0byAy77yMZHJhd2luZyBub3RoaW5nJylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB0aGlzLmVkaXRvci5leGVjdXRlQ29tbWFuZCgnYWRkUmVjdCcsIHgsIHksIHcsIGgpXHJcbiAgfVxyXG4gIC8vIG1vdXNlZG93biBvdXRzaWRlIHZpZXdwb3J0XHJcbiAgZW5kT3V0c2lkZSgpIHtcclxuICAgIHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIub3V0bGluZUJveEh1ZC5jbGVhcigpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBZGRSZWN0IiwiXHJcbmV4cG9ydCBjbGFzcyBEcmFnQ2FudmFzIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuc3RhcnRPZmZzZXRYID0gMFxyXG4gICAgdGhpcy5zdGFydE9mZnNldFkgPSAwXHJcbiAgfVxyXG4gIG5hbWUoKSB7XHJcbiAgICByZXR1cm4gJ2RyYWdDYW52YXMnXHJcbiAgfVxyXG4gIHNldEVkaXRvcihlZGl0b3IpIHsgLy8g5L6d6LWW5rOo5YWlXHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gIH1cclxuICBiZWZvcmVBY3RpdmUoKSB7XHJcbiAgICAvLyBkbyBzb21ldGhpbmcgYmVmb3JlIHN3aXRjaCB0byBjdXJyZW50IHRvb2xcclxuICB9XHJcbiAgc3RhcnQoY3R4KSB7XHJcbiAgICBjb25zdCBzY3JvbGwgPSB0aGlzLmVkaXRvci5nZXRTY3JvbGwoKVxyXG4gICAgdGhpcy5zdGFydE9mZnNldFggPSBzY3JvbGwueFxyXG4gICAgdGhpcy5zdGFydE9mZnNldFkgPSBzY3JvbGwueVxyXG4gIH1cclxuICBtb3ZlKGN0eCkge1xyXG4gICAgY29uc3Qgem9vbSA9IHRoaXMuZWRpdG9yLmdldFpvb20oKVxyXG4gICAgY29uc3QgeyB4OiBkeCwgeTogZHkgfSA9IGN0eC5nZXREaWZmUG9zKClcclxuICAgIHRoaXMuZWRpdG9yLnNldFNjcm9sbCh0aGlzLnN0YXJ0T2Zmc2V0WCAtIGR4LCB0aGlzLnN0YXJ0T2Zmc2V0WSAtIGR5KVxyXG4gIH1cclxuICBlbmQoKSB7fVxyXG4gIGVuZE91dHNpZGUoKSB7fVxyXG59XHJcbiIsImltcG9ydCB7IEZTVkcgfSBmcm9tIFwiLi4vZWxlbWVudFwiXHJcbmltcG9ydCB7IGdldEJveEJ5MnBvaW50cyB9IGZyb20gXCIuLi91dGlsL21hdGhcIlxyXG5cclxuLyoqXHJcbiAqIHNlbGVjdFxyXG4gKiBcclxuICog5q2k5qih5Z2X6Z2e5bi45aSN5p2CXHJcbiAqIFxyXG4gKiAxLiDpvKDmoIfmjInkuIvml7bvvIzpgInkuK3ljZXkuKrlhYPntKBcclxuICogMi4g6byg5qCH5oyJ5LiL5Li656m677yM5ouW5ou95pe25Lqn55Sf6YCJ5Lit5qGG77yM5Y+v5Lul6YCJ5oup5aSa5Liq5YWD57SgXHJcbiAqIDMuIOmAieS4reWNleS4qu+8iOaIlumAieWMuumAieS4reWkmuS4qu+8iSDnvKnmlL4g562J5o6n5Yi254K577yM5ouW5ou95pS55Y+Y5a696auYXHJcbiAqIDMuIOWIh+aWreWIgOi/meS4quW3peWFt+aXtu+8jOa/gOa0u+eahOWFg+e0oOi/m+WFpeiiq+mAieS4reeKtuaAge+8iOi9ruW7k+e6vyvmjqfliLbngrnvvInjgIJcclxuICogNC4g6YCJ5Yy65ZKM5YWD57Sg55u45Lqk55qE5Yik5a6aXHJcbiAqIDUuIOa/gOa0u+WFg+e0oOWmguS9leS/neWtmO+8jOS/neWtmOWIsOWTqumHjFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlbGVjdCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcclxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxyXG5cclxuICAgIHRoaXMub3V0bGluZVN0YXJ0WCA9IDBcclxuICAgIHRoaXMub3V0bGluZVN0YXJ0WSA9IDBcclxuICB9XHJcbiAgbmFtZSgpIHtcclxuICAgIHJldHVybiAnc2VsZWN0J1xyXG4gIH1cclxuICBzZXRFZGl0b3IoZWRpdG9yKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvclxyXG4gIH1cclxuICBoYXNTZWxlY3RlZEVsc1doZW5TdGFydCgpIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRWxzLmxlbmd0aCA+IDBcclxuICB9XHJcbiAgc3RhcnQoY3R4KSB7XHJcbiAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gY3R4Lm9yaWdpbkV2ZW50LnRhcmdldFxyXG4gICAgaWYgKCF0aGlzLmVkaXRvci5pc0NvbnRlbnRFbGVtZW50KHRhcmdldEVsZW1lbnQpKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRhcmdldEZFbGVtZW50ID0gRlNWRy5jcmVhdGUodGFyZ2V0RWxlbWVudClcclxuICAgIGNvbnN0IGFjdGl2ZWRFbHNNYW5hZ2VyID0gdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXJcclxuICAgIFxyXG4gICAgaWYgKGFjdGl2ZWRFbHNNYW5hZ2VyLmNvbnRhaW5zKHRhcmdldEVsZW1lbnQpKSB7XHJcbiAgICAgIGFjdGl2ZWRFbHNNYW5hZ2VyLmhlaWdobGlndGhFbHMoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzKHRhcmdldEZFbGVtZW50KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBhY3RpdmVkRWxzTWFuYWdlci5nZXRFbHMoKVxyXG5cclxuICAgIGNvbnN0IG91dGxpbmVCb3hIdWQgPSB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVCb3hIdWRcclxuXHJcbiAgICB0aGlzLm91dGxpbmVTdGFydFggPSBvdXRsaW5lQm94SHVkLmdldFgoKVxyXG4gICAgdGhpcy5vdXRsaW5lU3RhcnRZID0gb3V0bGluZUJveEh1ZC5nZXRZKClcclxuICB9XHJcbiAgbW92ZShjdHgpIHtcclxuICAgIC8vIGRyYXcgc2VsZWN0aW5nIGFyZWFcclxuICAgIGlmICghdGhpcy5oYXNTZWxlY3RlZEVsc1doZW5TdGFydCgpKSB7IFxyXG4gICAgICAvLyBzZWxlY3Qgbm8gZWxlbWVudCwgZHJhdyBzZWxlY3QgcmVjdFxyXG4gICAgICBjb25zdCB7IHg6IGVuZFgsIHk6IGVuZFkgfSA9IGN0eC5nZXRQb3MoKVxyXG4gICAgICBjb25zdCB7IHg6IHN0YXJ0WCwgeTogc3RhcnRZIH0gPSBjdHguZ2V0U3RhcnRQb3MoKVxyXG4gICAgICBjb25zdCB7IHgsIHksIHcsIGggfSA9IGdldEJveEJ5MnBvaW50cyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSlcclxuICAgICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5zZWxlY3RBcmVhLmRyYXdSZWN0KHgsIHksIHcsIGgpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8vIG1vdmUgc2VsZWN0ZWQgZWxlbWVudHNcclxuICAgIGNvbnN0IHsgeDogZHgsIHk6IGR5IH0gPSBjdHguZ2V0RGlmZlBvcygpXHJcbiAgICBjb25zdCBvdXRsaW5lQm94SHVkID0gdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5vdXRsaW5lQm94SHVkXHJcbiAgICBjb25zdCB3ID0gb3V0bGluZUJveEh1ZC5nZXRXaWR0aCgpXHJcbiAgICBjb25zdCBoID0gb3V0bGluZUJveEh1ZC5nZXRIZWlnaHQoKVxyXG4gICAgb3V0bGluZUJveEh1ZC5kcmF3UmVjdCh0aGlzLm91dGxpbmVTdGFydFggKyBkeCwgdGhpcy5vdXRsaW5lU3RhcnRZICsgZHksIHcsIGgpXHJcbiAgfVxyXG4gIGVuZChjdHgpIHtcclxuICAgIGlmICghdGhpcy5oYXNTZWxlY3RlZEVsc1doZW5TdGFydCgpKSB7IC8vIGZpbmlzaGVkIGRyYXduIHNlbGVjdGluZyBhcmVhXHJcbiAgICAgIGNvbnN0IGJveCA9IHRoaXMuZWRpdG9yLmh1ZE1hbmFnZXIuc2VsZWN0QXJlYS5nZXRCb3goKVxyXG4gICAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLnNlbGVjdEFyZWEuY2xlYXIoKVxyXG5cclxuICAgICAgdGhpcy5lZGl0b3IuYWN0aXZlZEVsc01hbmFnZXIuc2V0RWxzSW5Cb3goYm94KVxyXG5cclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVCb3hIdWQuY2xlYXIoKVxyXG5cclxuICAgIFxyXG4gICAgY29uc3QgeyB4OiBkeCwgeTogZHkgfSA9IGN0eC5nZXREaWZmUG9zKClcclxuICAgIHRoaXMuZWRpdG9yLmV4ZWN1dGVDb21tYW5kKCdkbW92ZScsIHRoaXMuc2VsZWN0ZWRFbHMsIGR4LCBkeSlcclxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLnNldEVscyh0aGlzLnNlbGVjdGVkRWxzKSAvLyBzZXQgZ2xvYmFsIGFjdGl2ZWQgZWxlbWVudHNcclxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxyXG4gIH1cclxuICAvLyBtb3VzZWRvd24gb3V0c2lkZSB2aWV3cG9ydFxyXG4gIGVuZE91dHNpZGUoKSB7XHJcbiAgICB0aGlzLmVkaXRvci5odWRNYW5hZ2VyLm91dGxpbmVCb3hIdWQuY2xlYXIoKVxyXG4gICAgdGhpcy5lZGl0b3IuaHVkTWFuYWdlci5zZWxlY3RBcmVhLmNsZWFyKClcclxuICAgIHRoaXMuZWRpdG9yLmFjdGl2ZWRFbHNNYW5hZ2VyLmNsZWFyKClcclxuICAgIHRoaXMuc2VsZWN0ZWRFbHMgPSBbXVxyXG4gIH1cclxufVxyXG4iLCIvKiogem9vbSAqL1xyXG5cclxuY29uc3QgeyBnZXRWaWV3Qm94IH0gPSByZXF1aXJlKFwiLi4vdXRpbC9zdmdcIilcclxuXHJcbmV4cG9ydCBjbGFzcyBab29tTWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmVkaXRvciA9IG51bGxcclxuICB9XHJcbiAgc2V0RWRpdG9yKGVkaXRvcikge1xyXG4gICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JcclxuICB9XHJcbiAgZ2V0Wm9vbSgpIHtcclxuICAgIGNvbnN0IGFjdHVsV2lkdGggPSBwYXJzZUZsb2F0KHRoaXMuZWRpdG9yLnN2Z1Jvb3QuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKVxyXG4gICAgY29uc3Qgdmlld0JveCA9IGdldFZpZXdCb3godGhpcy5lZGl0b3Iuc3ZnUm9vdClcclxuICAgIGNvbnN0IHpvb20gPSBhY3R1bFdpZHRoIC8gdmlld0JveC53XHJcbiAgICByZXR1cm4gem9vbVxyXG4gIH1cclxuICBzZXRab29tKHpvb20pIHtcclxuICAgIGNvbnNvbGUubG9nKHpvb20pXHJcbiAgICBjb25zdCB2aWV3Qm94ID0gZ2V0Vmlld0JveCh0aGlzLmVkaXRvci5zdmdSb290KVxyXG4gICAgY29uc3Qgd2lkdGggPSB2aWV3Qm94LncgKiB6b29tXHJcbiAgICBjb25zdCBoZWlnaHQgPSB2aWV3Qm94LmggKiB6b29tXHJcbiAgICB0aGlzLmVkaXRvci5zdmdSb290LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aClcclxuICAgIHRoaXMuZWRpdG9yLnN2Z1Jvb3Quc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoZWlnaHQpXHJcbiAgfVxyXG4gIHpvb21JbigpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRab29tID0gdGhpcy5nZXRab29tKClcclxuICAgIHRoaXMuc2V0Wm9vbShjdXJyZW50Wm9vbSArIDAuMSlcclxuICB9XHJcbiAgem9vbU91dCgpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRab29tID0gdGhpcy5nZXRab29tKClcclxuICAgIHRoaXMuc2V0Wm9vbShjdXJyZW50Wm9vbSAtIDAuMSlcclxuICB9XHJcbn0iLCJcclxuZXhwb3J0IGNsYXNzIEVkaXRvclNldHRpbmcge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zZXR0aW5nID0ge1xyXG4gICAgICAvLyBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIC8vIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICAvLyBzdHJva2VXaWR0aDogJzJweCcsXHJcblxyXG4gICAgICAvLyBvdXRsaW5lV2lkdGhcclxuICAgICAgLy8gb3V0bGluZUNvbG9yXHJcbiAgICB9XHJcbiAgICB0aGlzLmJpbmRlZEV2ZW50Rm5zID0ge31cclxuICAgIHRoaXMuc2V0RmlsbCgnI2ZmZicpXHJcbiAgICB0aGlzLnNldFN0cm9rZSgnIzAwMCcpXHJcbiAgICB0aGlzLnNldCgnc3Ryb2tlV2lkdGgnLCAnMXB4JylcclxuICB9XHJcbiAgc2V0RmlsbCh2YWwpIHtcclxuICAgIHRoaXMuc2V0KCdmaWxsJywgdmFsKVxyXG4gIH1cclxuICBzZXRTdHJva2UodmFsKSB7XHJcbiAgICB0aGlzLnNldCgnc3Ryb2tlJywgdmFsKVxyXG4gIH1cclxuICBzZXQobmFtZSwgdmFsKSB7XHJcbiAgICB0aGlzLnNldHRpbmdbbmFtZV0gPSB2YWxcclxuXHJcbiAgICBjb25zdCB0b0NhbGxGbnMgPSB0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdXHJcbiAgICBpZiAodG9DYWxsRm5zKSB7XHJcbiAgICAgIHRvQ2FsbEZucy5mb3JFYWNoKGZuID0+IHtcclxuICAgICAgICBmbih2YWwpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldChuYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5nW25hbWVdXHJcbiAgfVxyXG4gIGJpbmRFdmVudChuYW1lLCBmbikge1xyXG4gICAgaWYgKCF0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdKSB7XHJcbiAgICAgIHRoaXMuYmluZGVkRXZlbnRGbnNbbmFtZV0gPSBbXVxyXG4gICAgfVxyXG4gICAgdGhpcy5iaW5kZWRFdmVudEZuc1tuYW1lXS5wdXNoKGZuKVxyXG4gIH1cclxuICByZW1vdmVFdmVudChuYW1lLCBmbikge1xyXG4gICAgaWYgKCF0aGlzLmJpbmRlZEV2ZW50Rm5zW25hbWVdKSByZXR1cm4gZmFsc2VcclxuXHJcbiAgICBjb25zdCByZW1vdmVGbklkeCA9IHRoaXMuYmluZGVkRXZlbnRGbnNbbmFtZV0uZmluZEluZGV4KGZuKVxyXG4gICAgaWYgKHJlbW92ZUZuSWR4ID09PSAtMSkgcmV0dXJuIGZhbHNlXHJcbiAgICB0aGlzLmJpbmRlZEV2ZW50Rm5zLnNwbGljZShyZW1vdmVGbklkeCwgMSlcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG59IiwiLyoqXHJcbiAqIGVkaXRvciBnbG9iYWwgc2hvcnRjdXRcclxuICovXHJcbmltcG9ydCB7IGlzRGVidWcgfSBmcm9tIFwiLi9kZXZDb25maWdcIlxyXG5cclxuZXhwb3J0IGNsYXNzIFNob3J0Y3V0IHtcclxuICBjb25zdHJ1Y3RvcihlZGl0b3IpIHtcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgICB0aGlzLnJlZ2lzdGVyZWRGbnMgPSB7fVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZSA9PiB7XHJcbiAgICAgIGNvbnN0IHByZXNzS2V5TmFtZSA9IGdldFByZXNzS2V5TmFtZShlKVxyXG4gICAgICBjb25zdCBmbiA9IHRoaXMucmVnaXN0ZXJlZEZuc1twcmVzc0tleU5hbWVdXHJcbiAgICAgIGlmIChmbikge1xyXG4gICAgICAgIC8qKiBkZWJ1ZyAqL1xyXG4gICAgICAgIGlmKGlzRGVidWcpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHByZXNzS2V5TmFtZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqIGRlYnVnIGVuZCAqL1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIGZuLmZuKGUpXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9LCBmYWxzZSlcclxuICB9XHJcbiAgLy8gdGhpcy5yZWdpc3RlcigndW5kbycsICdDdHJsK1onLCAoKSA9PiB7IGVkaXRvci5leGVjQ29tbWFuZCgndW5kbycpIH0pXHJcbiAgcmVnaXN0ZXIoY21kTmFtZSwgc2hvcnRjdXROYW1lLCBmbikge1xyXG4gICAgLy8gVE9ETzogdmFsaWQgc2hvcnRjdXROYW1lXHJcbiAgICB0aGlzLnJlZ2lzdGVyZWRGbnNbc2hvcnRjdXROYW1lXSA9IHsgY21kTmFtZSwgZm4gfVxyXG4gICAgXHJcbiAgfVxyXG4gIGZvcm1hdFByaW50KCkge1xyXG4gICAgY29uc3QgYXJyID0gW11cclxuICAgIGZvciAobGV0IHNob3J0Y3V0TmFtZSBpbiB0aGlzLnJlZ2lzdGVyZWRGbnMpIHtcclxuICAgICAgY29uc3QgY21kTmFtZSA9IHRoaXMucmVnaXN0ZXJlZEZuc1tzaG9ydGN1dE5hbWVdLmNtZE5hbWVcclxuICAgICAgYXJyLnB1c2goY21kTmFtZSArICc6ICcgKyBzaG9ydGN1dE5hbWUpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyLmpvaW4oJywgJylcclxuICB9XHJcbiAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFByZXNzS2V5TmFtZShlKSB7XHJcbiAgY29uc3QgcHJlc3NlZEtleXMgPSBbXVxyXG4gIGlmIChlLmN0cmxLZXkpIHByZXNzZWRLZXlzLnB1c2goJ0N0cmwnKVxyXG4gIGlmIChlLm1ldGFLZXkpIHByZXNzZWRLZXlzLnB1c2goJ0NtZCcpXHJcbiAgaWYgKGUuc2hpZnRLZXkpIHByZXNzZWRLZXlzLnB1c2goJ1NoaWZ0JylcclxuICAvLyBvbmx5IGNoZWNrIEF+WlxyXG4gIC8vIFRPRE86IHJlc29sdmUgYWxsIGtleVxyXG4gIGlmICgvS2V5Li8udGVzdChlLmNvZGUpKSB7XHJcbiAgICBwcmVzc2VkS2V5cy5wdXNoKGUuY29kZVtlLmNvZGUubGVuZ3RoIC0gMV0pXHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgcHJlc3NlZEtleXMucHVzaChlLmNvZGUpXHJcbiAgfVxyXG4gIGNvbnN0IG5hbWUgPSBwcmVzc2VkS2V5cy5qb2luKCcrJylcclxuICByZXR1cm4gbmFtZVxyXG59IiwiY29uc3QgeyBFZGl0b3JFdmVudENvbnRleHQgfSA9IHJlcXVpcmUoXCIuL2VkaXRvckV2ZW50Q29udGV4dFwiKVxyXG5cclxuZXhwb3J0IGNsYXNzIFRvb2xNYW5hZ2VyIHtcclxuICBjb25zdHJ1Y3RvcihlZGl0b3IpIHtcclxuICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yXHJcbiAgICB0aGlzLnRvb2xzID0ge31cclxuICAgIHRoaXMuY3VycmVudFRvb2wgPSBudWxsXHJcbiAgICB0aGlzLmludm9rZVdoZW5Td2l0Y2ggPSAoKSA9PiB7fVxyXG5cclxuICAgIHRoaXMuY3R4ID0gbnVsbCAvLyB0b29sIGNvbnRleHRcclxuICB9XHJcbiAgc2V0Q3VycmVudFRvb2wobmFtZSkge1xyXG4gICAgdGhpcy5jdXJyZW50VG9vbCA9IHRoaXMudG9vbHNbbmFtZV1cclxuICAgIHRoaXMuaW52b2tlV2hlblN3aXRjaCh0aGlzLmdldEN1cnJlbnRUb29sTmFtZSgpKVxyXG4gIH1cclxuICBvblN3aXRjaFRvb2woZm4pIHtcclxuICAgIHRoaXMuaW52b2tlV2hlblN3aXRjaCA9IGZuXHJcbiAgfVxyXG4gIGdldEN1cnJlbnRUb29sTmFtZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRUb29sLm5hbWUoKVxyXG4gIH1cclxuICByZWdpc3RlclRvb2wodG9vbCkge1xyXG4gICAgdGhpcy50b29sc1t0b29sLm5hbWUoKV0gPSB0b29sXHJcbiAgICB0b29sLnNldEVkaXRvcih0aGlzLmVkaXRvcikgLy8gZGVwZW5kZW5jeSBpbmplY3Rpb25cclxuICB9XHJcblxyXG4gIGJpbmRUb29sRXZlbnQoKSB7XHJcbiAgICBjb25zdCBzdmdSb290ID0gdGhpcy5lZGl0b3Iuc3ZnUm9vdFxyXG5cclxuICAgIHN2Z1Jvb3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZSA9PiB7XHJcbiAgICAgIGNvbnN0IGN0eCA9IG5ldyBFZGl0b3JFdmVudENvbnRleHQodGhpcy5lZGl0b3IsIGUpXHJcbiAgICAgIHRoaXMuY3R4ID0gY3R4XHJcbiAgICAgIHRoaXMuY3VycmVudFRvb2wuc3RhcnQoY3R4KVxyXG4gICAgfSwgZmFsc2UpXHJcblxyXG4gICAgc3ZnUm9vdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcclxuICAgICAgY29uc3QgY3R4ID0gdGhpcy5jdHhcclxuXHJcbiAgICAgIGlmICghY3R4KSByZXR1cm4gLy8gaWYgY3R4IGV4aXRzLCBwcmVzZW50IG1vdXNlZG93biBldmVudCBlbWl0IGp1c3QgYmVmb3JlXHJcbiAgICAgIGN0eC5zZXRPcmlnaW5FdmVudChlKVxyXG4gICAgICBjdHgucHJlc3NNb3VzZSgpXHJcbiAgICAgIHRoaXMuY3VycmVudFRvb2wubW92ZShjdHgpIC8vIG1vdmVcclxuICAgIH0sIGZhbHNlKVxyXG4gICAgXHJcbiAgICBzdmdSb290LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlID0+IHtcclxuICAgICAgLy8gdGhpcy5jdHgucmVsZWFzZU1vdXNlKClcclxuICAgICAgY29uc3QgY3R4ID0gdGhpcy5jdHhcclxuICAgICAgLy8gY3R4LnNldE9yaWdpbkV2ZW50KGUpIC8vIHRoZSBvZmZzZXRYIGFuZCBvZmZzZXRZIGluIG1vdXNldXAgYW5kIHRoZSBsYXN0IG1vdXNlbW92ZSBpcyBub3QgZXF1YWwgPz8gXHJcbiAgICAgIHRoaXMuY3VycmVudFRvb2wuZW5kKGN0eClcclxuICAgICAgY3R4LmlzRW5kSW5zaWRlID0gdHJ1ZVxyXG4gICAgfSwgZmFsc2UpXHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlID0+IHtcclxuICAgICAgaWYgKHRoaXMuY3R4ICYmIHRoaXMuY3R4LmlzRW5kSW5zaWRlID09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VG9vbC5lbmRPdXRzaWRlKHRoaXMuY3R4KVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY3R4ID0gbnVsbFxyXG4gICAgfSwgZmFsc2UpXHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgRlNWRyB9IGZyb20gXCIuLi9lbGVtZW50XCJcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ZhaWxkQ29sb3JWYWwoKSB7XHJcbiAgLy8gVE9ETzpcclxuICAvLyAxLiBhbGwgY29sb3IgYnJvd2VyIHN1cHBvcnRlZFxyXG4gIC8vIDIuICNmZmYgYW5kICNmMGYwZjBcclxuICAvLyAzLiByZ2IoeCx4LHgpXHJcbiAgLy8gLi4uXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50c0luQm94KGJveCwgcGFyZW50KSB7XHJcbiAgY29uc3QgdGFnTmFtZUZvcmJpZExpc3QgPSBbJ2cnXVxyXG4gIGJveCA9IG5ldyBGU1ZHLkJveChib3gpXHJcbiAgY29uc3QgZWxzSW5Cb3ggPSBbXVxyXG5cclxuICBmdW5jdGlvbiByKGJveCwgcGFyZW50KSB7XHJcbiAgICBjb25zdCBlbGVtZW50cyA9IHBhcmVudC5jaGlsZHJlblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBlbCA9IGVsZW1lbnRzW2ldIC8vIEZTVkcuY3JlYXRlKGVsZW1lbnRzW2ldKVxyXG5cclxuICAgICAgaWYgKCF0YWdOYW1lRm9yYmlkTGlzdC5pbmNsdWRlcyhlbC50YWdOYW1lKSkge1xyXG4gICAgICAgIGNvbnN0IGJib3ggPSBlbC5nZXRCQm94KClcclxuICAgICAgICBpZiAoYm94LmNvbnRhaW5zKGJib3gpKSB7XHJcbiAgICAgICAgICBlbHNJbkJveC5wdXNoKCBGU1ZHLmNyZWF0ZShlbCkpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZWwuY2hpbGRyZW4ubGVuZ3RoID4gMCkgcihib3gsIGVsKVxyXG4gICAgfVxyXG4gIH1cclxuICByKGJveCwgcGFyZW50KVxyXG4gIHJldHVybiBlbHNJbkJveFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdW5pcShhcnIpIHtcclxuICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGFycikpXHJcbn0iLCJcclxuZXhwb3J0IGZ1bmN0aW9uIGdldEJveEJ5MnBvaW50cyh4MSwgeTEsIHgyLCB5Mikge1xyXG4gIGxldCB4LCB5LCB3LCBoXHJcbiAgdyA9IE1hdGguYWJzKHgyIC0geDEpXHJcbiAgaCA9IE1hdGguYWJzKHkyIC0geTEpXHJcbiAgeCA9IE1hdGgubWluKHgyLCB4MSlcclxuICB5ID0gTWF0aC5taW4oeTIsIHkxKVxyXG4gIHJldHVybiB7IHgsIHksIHcsIGggfVxyXG59XHJcbiIsIlxyXG4vLyBUT0RPOiB0byBmaW5pc2hcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFZpZXdCb3goZWwpIHtcclxuICBjb25zdCB2YWwgPSBlbC5nZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnKVxyXG4gIGlmICghdmFsKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2hhcyBub3Qgdmlld0JveCBhdHRyaWJ1dGUnKVxyXG4gIH1cclxuICBjb25zdCBbeCwgeSwgdywgaF0gPSB2YWwuc3BsaXQoL1tcXHMsXSsvKS5tYXAoaXRlbSA9PiBwYXJzZUZsb2F0KGl0ZW0pKVxyXG4gIHJldHVybiB7IHgsIHksIHcsIGggfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=