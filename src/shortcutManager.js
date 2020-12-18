
export class Shortcut {
  constructor(editor) {
    this.editor = editor
    this.registeredFns = {}

    window.addEventListener('keydown', e => {
      const pressKeyName = getPressKeyName(e)
      console.log(pressKeyName)
      // console.log(e)
    }, false)
  }
  // register shortcut
  // 
  // this.register('undo', 'Ctrl+Z', () => { editor.execCommand('undo') })
  register(desc, shortcutName, fn) {
    // TODO: valid shortcutName
    if (!this.registeredFns[shortcutName]) this.registeredFns[shortcutName] = []
    this.registeredFns.push(
      {
        name: desc,
        fn,
      }
    )
  }
}

function getPressKeyName(e) {
  const pressedKeys = []
  if (e.ctrlKey) pressedKeys.push('Ctrl')
  if (e.shiftKey) pressedKeys.push('Shift')
  // only check A~Z
  // TODO: resolve all key
  if (/Key./.test(e.code)) pressedKeys.push(e.code[e.code.length - 1])
  const name = pressedKeys.join('+')
  return name
}