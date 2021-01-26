
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
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

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
            <DialogContentText id="alert-dialog-description">
              Undo: CtrlOrCmd + Z <br></br>
              Redo: CtrlOrCmd + Shift + Z<br></br>
              Delete: Backspace<br></br>
            </DialogContentText>
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
