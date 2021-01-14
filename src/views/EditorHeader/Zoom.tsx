import React from 'react'
import globalVar from '../common/globalVar'

type States = {
  zoom: number
}

class Zoom extends React.Component<any, States> {
  constructor(props: any) {
    super(props)
    this.state = {
      zoom: 1,
    }
  }

  componentDidMount() {
    const editor = globalVar.editor
    editor.viewport.onZoomChange(zoom => {
      this.setState({ zoom })
    })
  }

  render() {
    return (
      <div style={{ marginLeft: 20, color: '#fff', fontSize: '12px' }}>
        zoom:
        <div style={{ display: 'inline-block' }}>{this.state.zoom}</div>
      </div>
    )
  }
}

export default Zoom
