import { EditorEventContext } from '../../editorEventContext'
import { ToolAbstract } from '../ToolAbstract'
import { Strategy, ModeFactory } from './modes'
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
  private strategy: Strategy
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

    const transformGrid = outlineBoxHud.containsGrip(target as SVGElement)
    if (transformGrid) {
      this.strategy = this.modeFactory.getStrategy('scaleElements')
    } else if (!this.editor.isContentElement(ctx.nativeEvent.target)) {
      // Target element no exist in g#content (the content drawing area), enter "Select Area" mode
      this.strategy = this.modeFactory.getStrategy('selectArea')
    } else {
      this.strategy = this.modeFactory.getStrategy('moveElements')
    }

    this.strategy.start(ctx)
  }
  move(ctx: EditorEventContext) {
    this.strategy.move(ctx)
  }
  end(ctx: EditorEventContext) {
    this.strategy.end(ctx)
  }
  // mousedown outside viewport
  endOutside(ctx: EditorEventContext) {
    this.strategy.endOutside(ctx)
  }
}
