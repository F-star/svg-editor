import React from 'react'

type Props = {
  open: boolean,
  onClose: Function
}

type State ={
  list: Array<{ command: string, key: string}>,
}

class ShortcustsDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      list: [
        { command: 'Undo', key: 'CtrlOrCmd + Z' },
        { command: 'Redo', key: 'CtrlOrCmd + Shift + Z' },
        { command: 'Delete', key: 'Backspace' }
      ]
    }
  }

  render() {
    const items = this.state.list.map(item => (
      <div key={item.command}>
        <span style={{ display: 'inline-block', width: 80 }}>{item.command}:</span>
        <span>{item.key}</span>
      </div>
    ))

    return (
      !this.props.open
        ? null
        : <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          height: '100%',
          width: '100%',
          backgroundColor: 'rgb(0, 0, 0, .5)',
          zIndex: 30,
        }}
      >
        <div style={{
          padding: 20,
          borderRadius: 4,
          // width: '300px',
          backgroundColor: '#fff',
        }}>
          <div style={{
            paddingBottom: 18,
            fontSize: 18,
          }}>Shortcuts</div>
          <div style={{
            marginBottom: 10,
          }}>
            {items}
          </div>
          <div
            style={{
              float: 'right',
              border: '1px solid #333',
              borderRadius: 8,
              padding: '5px 10px',
              cursor: 'pointer',
            }}
            onClick={() => { this.props.onClose() }}
          >
            close
          </div>
        </div>
      </div>
    )
  }
}

export default ShortcustsDialog
