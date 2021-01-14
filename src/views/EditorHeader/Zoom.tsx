import React from 'react'
import globalVar from '../common/globalVar'

type States = {
  zoom: string
}

class Zoom extends React.Component<any, States> {
  constructor(props: any) {
    super(props)
    this.state = {
      zoom: '100%',
    }
  }

  componentDidMount() {
    const editor = globalVar.editor
    editor.viewport.onZoomChange(zoom => {
      this.setState({ zoom: (zoom * 100).toFixed(2) + '%' })
    })
  }

  render() {
    return (
      <div style={{ marginLeft: 20, color: '#fff', fontSize: '12px' }}>
        zoom:
        <span style={{
          display: 'inline-block',
          marginLeft: 10,
          paddingLeft: 4,
          width: 60,
          backgroundColor: '#fff',
          color: '#333'
        }}>{this.state.zoom}</span>
      </div>
    )
  }
}

export default Zoom
