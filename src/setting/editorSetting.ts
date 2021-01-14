import defaultConfig from '../config/editorDefaultConfig'


type Listener = (val: string) => void
export class EditorSetting {
  private setting: {[prop: string]: string}
  private listeners: {[prop: string]: Array<Listener>}

  constructor() {
    this.setting = {}
    this.listeners = {}
    this.setFill(defaultConfig.fill)
    this.setStroke(defaultConfig.stroke)
    this.set('stroke-width', defaultConfig.strokeWidth)
  }
  setFill(val: string) {
    this.set('fill', val)
  }
  setStroke(val: string) {
    this.set('stroke', val)
  }
  set(name: string, val: string) {
    this.setting[name] = val

    const toCallFns = this.listeners[name]
    if (toCallFns) {
      toCallFns.forEach(fn => {
        fn(val)
      })
    }
  }
  get(name: string) {
    return this.setting[name]
  }
  on(name: string, fn: Listener) {
    if (!this.listeners[name]) {
      this.listeners[name] = []
    }
    this.listeners[name].push(fn)
  }
  // TODO: to test
  off(name: string, fn: Listener): boolean {
    const spListeners = this.listeners[name]
    if (this.listeners) {
      const idx = spListeners.indexOf(fn)
      if (idx > -1) {
        spListeners.splice(idx, 1)
        return true
      }
    }
    return false
  }
}
