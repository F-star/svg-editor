import { ToolAbstract } from './ToolAbstract'

class Pencil extends ToolAbstract {
  name() {
    return 'pencil'
  }
  cursorNormal() {
    return 'default'
  }
  cursorPress() {
    return 'default'
  }
  start() {}
  move() {}
  end() {}
  // mousedown outside viewport
  endOutside() {}
}

export default Pencil
