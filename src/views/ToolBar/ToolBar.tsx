import React from 'react'
import styled from 'styled-components'
import ToolItem from './ToolItem'
import defaultConfig from '../../config/editorDefaultConfig'
import globalVar from '../common/globalVar'
import FillAndStrokeSelector from './FillAndStrokeSelector'
import ShortcustsDialog from '../_components/ShortcutsDialog'

class ToolBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      tool: defaultConfig.tool,
      open: false,
    }
  }

  switchEditorTool(toolName: string) {
    globalVar.editor.setCurrentTool(toolName)
    this.setState({ tool: toolName })
  }

  render() {
    const StyleToolBar = styled.div`
      padding-top: 6px;
      background-color: #555;
    `

    const toolItems = [
      { name: 'select', iconName: 'icon-select', cmdName: 'select' },
      { name: 'rect', iconName: 'icon-rect', cmdName: 'addRect' },
      { name: 'pencil', iconName: 'icon-pencil', cmdName: 'pencil' },
      { name: 'path', iconName: 'icon-pen', cmdName: 'addPath' },
      { name: 'pan', iconName: 'icon-pan', cmdName: 'dragCanvas' },
      { name: 'zoom', iconName: 'icon-zoom', cmdName: 'zoom' },
    ]

    const items = toolItems.map(item => {
      return (
        <ToolItem
          name={item.name}
          iconName={item.iconName}
          cmdName={item.cmdName}
          currentTool={this.state.tool}
          key={item.name}
          onClick={v => this.switchEditorTool(v)}
        />
      )
    })

    return (
      <div style={{
        height: '100%',
        width: '60px',
        flexShrink: 0,
        backgroundColor: '#555',
      }}>
        <StyleToolBar>
          {items}
        </StyleToolBar>
        <FillAndStrokeSelector />

        <div
          style={{
            color: '#fff',
            fontSize: 12,
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={() => { this.setState({ open: true }) }}
        >
          shortcuts
        </div>
        <ShortcustsDialog
          open={this.state.open}
          onClose={() => { this.setState({ open: false }) }}
        />
      </div>
    )
  }
}

export default ToolBar
