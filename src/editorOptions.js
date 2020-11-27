
export class EditorOptions {
  constructor() {
    this.options = {
      fill: '#fff',
      stroke: '#000',
      strokeWidth: '2px',

      // outlineWidth
      // outlineColor
    }
  }
  setFill(val) {
    this.options.fill = val
  }
  setStroke(val) {
    this.options.fill = val
  }
  set(name, val) {
    this.options[name] = val
  }
  get(name) {
    return this.options[name]
  }
}