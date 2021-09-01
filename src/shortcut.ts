/**
 * editor global shortcut
 */
// import { isDebug } from './config/devConfig'
import Editor from './Editor'


type FnType = (e: KeyboardEvent) => void
interface IRegisterItem {
  cmdName: string
  fn: FnType
}

export class Shortcut {
  private editor: Editor
  private registerItems: { [key: string]: Array<IRegisterItem> }

  constructor(editor: Editor) {
    this.editor = editor
    this.registerItems = {}

    window.addEventListener('keydown', e => {
      const pressKeyName = getPressKeyName(e)
      // if (isDebug) { console.log(pressKeyName) }
      const registeredInstance = this.registerItems[pressKeyName] || []
      if (registeredInstance.length > 0) {
        /** debug */
        /** debug end */
        e.preventDefault()
        registeredInstance.forEach(item => item.fn(e))
      }
    }, false)
  }
  // usage: this.register('undo', 'Ctrl+Z', () => { editor.execCommand('undo') })
  register(cmdName: string, shortcutName: string, fn: FnType) {
    // TODO: valid shortcutName
    const item = { cmdName, fn }
    if (!this.registerItems[shortcutName]) {
      this.registerItems[shortcutName] = [item]
    } else {
      this.registerItems[shortcutName].push(item)
    }
  }

  unregister(shortcutName: string, fn: FnType) {
    const items = this.registerItems[shortcutName] || []
    const idx = items.findIndex(item => item.fn === fn)
    if (idx > -1) {
      items.splice(idx, 1)
    }
  }
}

function getPressKeyName(e: KeyboardEvent) {
  const pressedKeys = []
  if (e.ctrlKey) pressedKeys.push('Ctrl')
  if (e.metaKey) pressedKeys.push('Cmd')
  if (e.shiftKey) pressedKeys.push('Shift')
  // only check A~Z
  // TODO: resolve all key
  if (/Key./.test(e.code)) {
    pressedKeys.push(e.code[e.code.length - 1])
  } else if (/Digit./.test(e.code)) {
    pressedKeys.push(e.code[e.code.length - 1])
  } else if (e.code === 'Escape') {
    pressedKeys.push('Esc')
  } else {
    pressedKeys.push(e.code)
  }
  const name = pressedKeys.join('+')
  return name
}
