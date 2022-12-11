import React, { FC, useState } from 'react'
import styled from 'styled-components'
import ToolItem from './ToolItem'
import defaultConfig from '../../config/editorDefaultConfig'
import globalVar from '../common/globalVar'
import FillAndStrokeSelector from './FillAndStrokeSelector'
import ShortcutBtn from './ShortcutBtn'

const ToolBar: FC = () => {
  const [tool, setTool] = useState<string>(defaultConfig.tool)

  const switchEditorTool = (toolName: string) => {
    globalVar.editor.setCurrentTool(toolName)
    setTool(toolName)
  }

  const StyleToolBar = styled.div`
      padding-top: 6px;
      background-color: #555;
    `

  const toolItems = [
    { name: 'Select', iconName: 'icon-select', cmdName: 'select' },
    { name: 'Rect', iconName: 'icon-rect', cmdName: 'addRect' },
    { name: 'Pencil', iconName: 'icon-pencil', cmdName: 'pencil' },
    { name: 'Pen', iconName: 'icon-pen', cmdName: 'pen' },
    { name: 'Drag Canvas', iconName: 'icon-pan', cmdName: 'dragCanvas' },
    { name: 'Zoom', iconName: 'icon-zoom', cmdName: 'zoom' },
  ]

  const items = toolItems.map(item => {
    return (
      <ToolItem
        name={item.name}
        iconName={item.iconName}
        cmdName={item.cmdName}
        currentTool={tool}
        key={item.name}
        onClick={v => switchEditorTool(v)}
      />
    )
  })

  return (
    <div style={{
      position: 'relative',
      height: '100%',
      width: '60px',
      flexShrink: 0,
      backgroundColor: '#555',
    }}>
      <StyleToolBar>
        {items}
      </StyleToolBar>
      <FillAndStrokeSelector />

      <ShortcutBtn />
    </div>
  )
}

export default ToolBar
