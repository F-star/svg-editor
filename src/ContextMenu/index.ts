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
            disable: true,
            command: () => {
              this.editor.executeCommand('undo')
              this.hide()
            }
          },
          {
            name: '重做',
            disable: true,
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
    this.eventEmitter.emit('show', { x, y, items: this.items })
  }
  hide() {
    this.eventEmitter.emit('hide')
  }
  on<T>(eventName: EventName, handler: (options: T) => void) {
    this.eventEmitter.on(eventName, handler)
  }
  off(eventName: EventName, handler: (...args: any) => void) {
    this.eventEmitter.off(eventName, handler)
  }
}

export default ContextMenu
