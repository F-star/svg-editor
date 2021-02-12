import { EditorEventContext } from '../../editorEventContext'
import { ToolAbstract } from '../ToolAbstract'
import { Mode, ModeFactory } from './modes'
import Editor from '../../Editor'

/**
 * select
 *
 * 此模块非常复杂
 *
 * 1. 鼠标按下时，选中单个元素
 * 2. 鼠标按下为空，拖拽时产生选中框，可以选择多个元素
 * 3. 选中单个（或选区选中多个） 缩放 等控制点，拖拽改变宽高
 * 3. 切断到这个工具时，激活的元素进入被选中状态（轮廓线+控制点）。
 * 4. 选区和元素相交的判定
 * 5. 激活元素如何保存，保存到哪里
 */
export class Select extends ToolAbstract {
  private mode: Mode
  private modeFactory: ModeFactory

  constructor(editor: Editor) {
    super(editor)
    this.modeFactory = new ModeFactory(editor)
  }
  name() { return 'select' }
  cursorNormal() { return 'default' }
  cursorPress() { return 'default' }
  start(ctx: EditorEventContext) {
    const target = ctx.nativeEvent.target
    const outlineBoxHud = this.editor.hudManager.outlineBoxHud

    const transformGrid = outlineBoxHud.getGripIfMatch(target as SVGElement)
    if (transformGrid) {
      this.mode = this.modeFactory.getStrategy('scaleElements')
    } else if (this.editor.isContentElement(ctx.nativeEvent.target)) {
      this.mode = this.modeFactory.getStrategy('moveElements')
    } else {
      this.mode = this.modeFactory.getStrategy('selectArea')
    }

    this.mode.start(ctx)
  }
  move(ctx: EditorEventContext) {
    this.mode.move(ctx)
  }
  end(ctx: EditorEventContext) {
    this.mode.end(ctx)
  }
  // mousedown outside viewport
  endOutside(ctx: EditorEventContext) {
    this.mode.endOutside(ctx)
  }
}
