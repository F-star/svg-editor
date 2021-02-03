import defaultConfig from '../config/editorDefaultConfig'


type listener = (val: string) => void

export class EditorSetting {
  private setting: {[prop: string]: string}
  private listeners: {[prop: string]: Array<listener>}

  constructor() {
    this.setting = {}
    this.listeners = {}
    this.setFill(defaultConfig.fill)
    this.setStroke(defaultConfig.stroke)
    this.setStrokeWidth(defaultConfig.strokeWidth)
  }
  setFill(val: string) { this.set('fill', val) }
  setStroke(val: string) { this.set('stroke', val) }
  setStrokeWidth(val: string) { this.set('stroke-width', val) }
  set(name: string, val: string) {
    this.setting[name] = val

    const toCallHandlers = this.listeners[name]
    if (toCallHandlers) {
      toCallHandlers.forEach(handler => {
        handler(val)
      })
    }
  }
  get(name: string) {
    return this.setting[name]
  }
  on(name: string, handler: listener) {
    if (!this.listeners[name]) {
      this.listeners[name] = []
    }
    this.listeners[name].push(handler)
  }
  // TODO: to test
  off(name: string, handler: listener): boolean {
    const targetListeners = this.listeners[name]
    if (this.listeners) {
      const idx = targetListeners.indexOf(handler)
      if (idx > -1) {
        targetListeners.splice(idx, 1)
        return true
      }
    }
    return false
  }
}
