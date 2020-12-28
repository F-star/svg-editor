// TODO: tool interface class

export class BaseTool {
  constructor() {}
  name() {
    throw new Error('not override name method')
  }
  cursorNormal() {
    return 'default'
  }
  cursorPress() {
    return 'default'
  }
  setEditor(editor) {
    this.editor = editor
  }
  /*  beforeActive() {
    // do something before switch to current tool
  } */
  start() {
    throw new Error('not override start method')
  }
  move() {
    throw new Error('not override move method')
  }
  end() {
    throw new Error('not override end method')
  }
  endOutside() {
    throw new Error('not override endOutside method')
  }
}