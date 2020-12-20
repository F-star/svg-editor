/**
 * editor global shortcut
 */
import { isDebug } from "./devConfig"

export class Shortcut {
  constructor(editor) {
    this.editor = editor
    this.registeredFns = {}

    window.addEventListener('keydown', e => {
      const pressKeyName = getPressKeyName(e)
      const fn = this.registeredFns[pressKeyName]
      if (fn) {
        /** debug */
        if(isDebug) {
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