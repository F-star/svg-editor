import React from 'react'
import styled from 'styled-components'
import ToolItem from './ToolItem'
import defaultConfig from '../../config/editorDefaultConfig'
import globalVar from '../common/globalVar'
import FillAndStrokeSelector from './FillAndStrokeSelector'

class ToolBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      tool: defaultConfig.tool,
    }
  }

  switchEditorTool(toolName: string) {
    globalVar.editor.setCurrentTool(toolName)
    this.setState({ tool: toolName })
  }

  render() {
    const StyleToolBar = styled.div`
      padding-top: 10px;
      width: 60px;
      height: 100%;
      flex-shrink: 0;
      background-color: #555;
    `

    const toolItems = [
      { name: 'select', value: 'select' },
      { name: 'rect', value: 'addRect' },
      { name: 'pencil', value: 'pencil' },
      { name: 'path', value: 'addPath' },
      { name: 'pan', value: 'dragCanvas' },
      { name: 'zoom', value: 'zoom' },
    ]

    const items = toolItems.map(item => {
      return (
        <ToolItem
          name={item.name}
          value={item.value}
          currentTool={this.state.tool}
          key={item.name}
          onClick={v => this.switchEditorTool(v)}
        />
      )
    })

    return (
    <StyleToolBar>
      {items}
      <FillAndStrokeSelector />
    </StyleToolBar>
    )
  }
}

export default ToolBar
