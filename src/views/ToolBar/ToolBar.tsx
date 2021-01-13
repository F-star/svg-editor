import React from 'react'
import styled from 'styled-components'
import Editor from '../../editor'
import ToolItem from './ToolItem'


class ToolBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      tool: '',
    }
  }

  switchEditorTool(toolName: string) {
    const editor = (window as any).editor as Editor
    editor && editor.setCurrentTool(toolName)
    this.setState({ tool: toolName })
  }

  render() {
    const StyleToolBar = styled.div`
      margin-top: 20px;
      width: 60px;
      height: 100%;
      background-color: #eee;
    `

    const toolItems = [
      { name: 'rect', value: 'addRect' },
      { name: 'move', value: 'dragCanvas' },
      { name: 'pencil', value: 'pencil' },
      { name: 'path', value: 'addPath' },
      { name: 'select', value: 'select' },
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
    </StyleToolBar>
    )
  }
}

export default ToolBar
