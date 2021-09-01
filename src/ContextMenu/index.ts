/**
 * 右键菜单
 *
 * 对 React 组件的封装，本质调用 react 组件。
 */
import Editor from '../Editor'
import EventEmiter from '../util/EventEmitter'

type ItemType = {
  name: string,
  disable: boolean,
  // shortcut: string,
  command: () => void
}

export type ItemGroupType = {
  group: string,
  items: ItemType[]
}

export type ShowEventOptions = {
  x: number,
  y: number,
  items: ItemGroupType[]
}

type EventName = 'show' | 'hide'

class ContextMenu {
  private items: ItemGroupType[] = []
  private eventEmitter = new EventEmiter()
  constructor(private editor: Editor) {
    this.items = [
      {
        group: 'history',
        items: [
          {
            name: '撤销',
            disable: false,
            command: () => {
              this.editor.executeCommand('undo')
              this.hide()
            }
          },
          {
            name: '重做',
            disable: false,
            command: () => {
              this.editor.executeCommand('redo')
              this.hide()
            }
          }
        ]
      }
    ]
  }
  setItems(items: ItemGroupType[]) {
    this.items = items
  }
  getItems() {
    return this.items
  }
  show(x: number, y: number) {
    // 1. 检测是否要禁用 undo 或 redo
    this.setItemsByEditorState()
    this.eventEmitter.emit('show', { x, y, items: this.items })
  }
  hide() {
    this.eventEmitter.emit('hide')
  }
  on<T>(eventName: EventName, handler: (options: T) => void) {
    return this.eventEmitter.on(eventName, handler)
  }
  off(eventName: EventName, handler: (...args: any) => void) {
    return this.eventEmitter.off(eventName, handler)
  }
  // 根据编辑器状态，调整 items
  private setItemsByEditorState() {
    this.items = [
      {
        group: 'history',
        items: [
          {
            name: '撤销',
            disable: !!this.editor.commandManager.undoSize(),
            command: () => {
              this.editor.executeCommand('undo')
              this.hide()
            }
          },
          {
            name: '重做',
            disable: !!this.editor.commandManager.redoSize(),
            command: () => {
              this.editor.executeCommand('redo')
              this.hide()
            }
          }
        ]
      }
    ]
  }
}

export default ContextMenu
