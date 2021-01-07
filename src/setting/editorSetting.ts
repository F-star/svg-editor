
export class EditorSetting {
  private setting: {[prop: string]: string}
  private bindedEventFns: {[prop: string]: Array<Function>}

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
    this.set('stroke-width', '1px')
  }
  setFill(val: string) {
    this.set('fill', val)
  }
  setStroke(val: string) {
    this.set('stroke', val)
  }
  set(name: string, val: string) {
    this.setting[name] = val

    const toCallFns = this.bindedEventFns[name]
    if (toCallFns) {
      toCallFns.forEach(fn => {
        fn(val)
      })
    }
  }
  get(name: string) {
    return this.setting[name]
  }
  bindEvent(name: string, fn: Function) {
    if (!this.bindedEventFns[name]) {
      this.bindedEventFns[name] = []
    }
    this.bindedEventFns[name].push(fn)
  }
  // removeEvent(name: string, fn: Function) {
  //   if (!this.bindedEventFns[name]) return false

  //   const removeFnIdx = this.bindedEventFns[name].findIndex(fn)
  //   if (removeFnIdx === -1) return false
  //   this.bindedEventFns.splice(removeFnIdx, 1)
  //   return true
  // }
}