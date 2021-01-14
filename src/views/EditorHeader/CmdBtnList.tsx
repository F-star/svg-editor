import React from 'react'
import globalVar from '../common/globalVar'
import CmdBtnItem from './CmdBtnItem'

function execCmd(cmd: string) {
  globalVar.editor.executeCommand(cmd)
}

type States = {
  redoStackSize: number,
  undoStackSize: number,
  items: Array<{ label: string, cmd: string, }>
}
class CmdBtnList extends React.Component<any, States> {
  constructor(props: any) {
    super(props)
    this.state = {
      redoStackSize: 0,
      undoStackSize: 0,
      items: [
        { label: 'undo', cmd: 'undo' },
        { label: 'redo', cmd: 'redo' },
        { label: 'delete', cmd: 'removeElements' },
        { label: 'front', cmd: 'front' },
        { label: 'forward', cmd: 'forward' },
        { label: 'backward', cmd: 'backward' },
        { label: 'back', cmd: 'back' },
      ]
    }
  }

  componentDidMount() {
    const editor = globalVar.editor
    editor.commandManager.setRedoListener(size => { this.setState({ redoStackSize: size }) })
    editor.commandManager.setUndoListener(size => { this.setState({ undoStackSize: size }) })
  }

  render() {
    const elements = this.state.items.map(item => (
      <CmdBtnItem
        label={item.label}
        cmd={item.cmd}
        key={item.cmd}
        disabled={
          (item.cmd === 'undo' && this.state.undoStackSize === 0) ||
          (item.cmd === 'redo' && this.state.redoStackSize === 0)
        }
        onClick={v => execCmd(v)}
      />
    ))

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 140,
        height: '100%',
      }}>
        {elements}
      </div>
    )
  }
}

export default CmdBtnList
