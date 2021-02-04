import { EditorEventContext } from '../../editorEventContext'


interface Strategy {
  start(ctx: EditorEventContext): void
  move(ctx: EditorEventContext): void
  end(ctx: EditorEventContext): void
  endOutside(ctx: EditorEventContext): void
}


class SelectAreaStrategy implements Strategy {
  start() {
    //
  }
  move() {
    //
  }
  end() {
    //
  }
  endOutside() {
    //
  }
}


export default SelectAreaStrategy
