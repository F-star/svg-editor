import React from 'react'
import styled from 'styled-components'
import Editor from '../../editor'
import ToolItem from './ToolItem'
import defaultConfig from '../../config/editorDefaultConfig'

class ToolBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      tool: defaultConfig.tool,
    }
  }

  componentDidMount() {
    console.log('toolBar component did mount')
  }

  switchEditorTool(toolName: string) {
    const editor = (window as any).editor as Editor
    editor && editor.setCurrentTool(toolName)
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
    </StyleToolBar>
    )
  }
}

export default ToolBar
