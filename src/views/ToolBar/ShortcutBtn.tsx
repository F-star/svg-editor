
//   <Menu
//   id="simple-menu"
//   anchorEl={anchorEl}
//   keepMounted
//   open={Boolean(anchorEl)}
//   onClose={handleClose}
// >
//   <MenuItem onClick={handleClose}>Profile</MenuItem>
//   <MenuItem onClick={handleClose}>My account</MenuItem>
//   <MenuItem onClick={handleClose}>Logout</MenuItem>
// </Menu>

import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import styled from 'styled-components'

type State = {
  open: boolean,
}

class ShortcutBtn extends React.Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      open: false,
    }
  }
  handleClose() {
    this.setState({ open: false })
  }

  render() {
    const StyledColumn = styled.div`
      border-bottom: 1px solid #eee;
      width: 300px;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      overflow: hidden;
      backgroundColor: #555;
      &:last-child {
        border-bottom: none;
      }
    `
    const StyledLeftItem = styled.span`
      float: left;
      font-weight: 500;
    `
    const StyledRightItem = styled.span`
      float: right;
    `
    const StyledKbd = styled.kbd`
      background: linear-gradient(180deg, #eee, #fff);
      background-color: #eee;
      border: 1px solid #cdd5d7;
      border-radius: 4px;
      box-shadow: 0 1px 2px 1px #cdd5d7;
      font-family: consolas,"Liberation Mono",courier,monospace;
      font-size: 14px;
      font-weight: 700;
      line-height: 1;
      margin: 3px;
      padding: 3px 6px;
      white-space: nowrap;
    `

    const ShortcutList = [
      {
        command: 'Undo',
        KeyBinding: <><StyledKbd>Ctrl/Cmd</StyledKbd> + <StyledKbd>Z</StyledKbd></>
      },
      {
        command: 'Redo',
        KeyBinding: <><StyledKbd>Ctrl/Cmd</StyledKbd> + <StyledKbd>Shift</StyledKbd> + <StyledKbd> Y</StyledKbd></>
      },
      {
        command: 'Delete Elements',
        KeyBinding: <><StyledKbd>Backspace</StyledKbd></>,
      },
    ].map(item => {
      return (
        <StyledColumn key={item.command}>
          <StyledLeftItem>{ item.command }</StyledLeftItem>
          <StyledRightItem>
            {item.KeyBinding}
          </StyledRightItem>
        </StyledColumn>
      )
    })

    return (
      <>
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            width: '100%',
            height: 20,
            lineHeight: '20px',
            color: '#fff',
            fontSize: 12,
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={() => { this.setState({ open: true }) }}
        >
        Keyboard
        </div>
        <Dialog
          open={this.state.open}
          onClose={() => { this.handleClose() }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Keyboard Shortcuts'}</DialogTitle>
          <DialogContent>
            {ShortcutList}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { this.handleClose() }} color="primary">
              ok
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

export default ShortcutBtn
