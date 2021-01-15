import React from 'react'
import Editor from '../../Editor'
import globalVar from '../common/globalVar'

type States = {
  zoom: string
}

class Zoom extends React.Component<any, States> {
  editor: Editor

  constructor(props: any) {
    super(props)
    this.state = {
      zoom: '100%',
    }
  }

  componentDidMount() {
    this.editor = globalVar.editor

    this.editor.viewport.onZoomChange(zoom => {
      this.setState({ zoom: (zoom * 100).toFixed(2) + '%' })
    })
  }

  render() {
    return (
      <>
      <div style={{ marginLeft: 20, color: '#fff', fontSize: '12px' }}>
        zoom:
        <span style={{
          display: 'inline-block',
          marginLeft: 10,
          paddingLeft: 4,
          minWidth: 60,
          backgroundColor: '#fff',
          color: '#333'
        }}>{this.state.zoom}</span>
      </div>
      <button
        style={{ marginLeft: 10 }}
        onClick={() => { this.editor.viewport.zoomOut() }}
      >-</button>
      <button onClick={() => { this.editor.viewport.zoomIn() }}>+</button>
      </>
    )
  }
}

export default Zoom
