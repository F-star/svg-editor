import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import globalVar from '../common/globalVar'
import './index.less'
import { ShowEventOptions, ItemGroupType } from '../../ContextMenu'
import classnames from 'classnames'

const PADDING_RIGHT = 6 // 右边留点空位，防止直接贴边了，不好看
const PADDING_BOTTOM = 6 // 底部也留点空位

const ContexMenu: React.FunctionComponent = () => {
  const [items, setItems] = useState<ItemGroupType[]>([])
  const [x, setX] = useState(99999)
  const [y, setY] = useState(99999)
  const [visible, setVisible] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const hideHandler = () => {
    setVisible(false)
    setX(99999)
    setY(99999)
  }

  useEffect(() => {
    const contextMenu = globalVar.editor.contextMenu
    const adjustPos = (x: number, y: number, w: number, h: number) => {
      const vw = document.documentElement.clientWidth
      const vh = document.documentElement.clientHeight
      if (x + w > vw - PADDING_RIGHT) x -= w
      if (y + h > vh - PADDING_BOTTOM) y -= h
      return { x, y }
    }
    const showHandler = ({ x, y, items }: ShowEventOptions) => {
      console.log('show!!', x, y)


      const rect = contentRef.current.getBoundingClientRect();
      ({ x, y } = adjustPos(x, y, rect.width, rect.height))

      setX(x)
      setY(y)
      setVisible(true)
      setItems(items)
    }
    contextMenu.on<ShowEventOptions>('show', showHandler)
    contextMenu.on('hide', hideHandler) // 好像没啥用
    return () => {
      contextMenu.off('show', showHandler)
      contextMenu.off('hide', hideHandler)
    }
  }, [])

  return (
    <>
      <div
        className="contextmenu-mask"
        style={{ display: visible ? '' : 'none' }}
        onClick={hideHandler}
        onMouseDown={hideHandler}
      ></div>
      <div ref={contentRef} className="contextmenu-content" style={{ left: x, top: y }}>
        <div className="list">
          {items.map((item) => {
            return item.items.map((one) => {
              return (
                <div className={classnames('item', { disabled: !one.disable })} key={one.name} onClick={one.command}>
                  {one.name}
                </div>
              )
            })
          })}
        </div>
      </div>
    </>
  )
}

export default ContexMenu
