
export class EditorSetting {
  constructor() {
    this.setting = {
      fill: '#fff',
      stroke: '#000',
      strokeWidth: '2px',

      // outlineWidth
      // outlineColor
    }
  }
  setFill(val) {
    this.setting.fill = val
  }
  setStroke(val) {
    this.setting.fill = val
  }
  set(name, val) {
    this.setting[name] = val
  }
  get(name) {
    return this.setting[name]
  }
}