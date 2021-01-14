import React from 'react'
// import styled from 'styled-components'

type Props = {
  width: string,
  open: boolean,
}

type State ={
  list: Array<{ command: string, key: string}>
}

class Dialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      list: [
        { command: 'undo', key: 'CtrlOrCmd + Z' },
        { command: 'redo', key: 'CtrlOrCmd + Shift + Z' },
        { command: 'delete', key: 'Backspace' }
      ]
    }
  }
  render() {
    const items = this.state.list.map(item => (
      <div key={item.command}>{item.command}: {item.key}</div>
    ))

    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgb(0, 0, 0, .5)',
        zIndex: 30,
      }}>
        <div style={{
          borderRadius: 4,
          width: this.props.width, // '300px',
          backgroundColor: '#fff',
        }}>
          {items}
        </div>
      </div>
    )
  }
}

export default Dialog
