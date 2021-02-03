import React from 'react'
import globalVar from '../common/globalVar'
import CmdBtnItem from './CmdBtnItem'

type States = {
  redoStackSize: number,
  undoStackSize: number,
  items: Array<{ label: string, cb: () => void }>
}
class CmdBtnList extends React.Component<any, States> {
  constructor(props: any) {
    super(props)
    this.state = {
      redoStackSize: 0,
      undoStackSize: 0,
      items: [
        { label: 'undo', cb: () => { globalVar.editor.executeCommand('undo') } },
        { label: 'redo', cb: () => { globalVar.editor.executeCommand('redo') } },
        {
          label: 'delete',
          cb: () => { globalVar.editor.activedElsManager.isNoEmpty() && globalVar.editor.executeCommand('removeElements') }
        },
        {
          label: 'front',
          cb: () => { globalVar.editor.activedElsManager.isNoEmpty() && globalVar.editor.executeCommand('front') }
        },
        {
          label: 'forward',
          cb: () => { globalVar.editor.activedElsManager.isNoEmpty() && globalVar.editor.executeCommand('forward') }
        },
        {
          label: 'backward',
          cb: () => { globalVar.editor.activedElsManager.isNoEmpty() && globalVar.editor.executeCommand('backward') }
        },
        {
          label: 'back',
          cb: () => { globalVar.editor.activedElsManager.isNoEmpty() && globalVar.editor.executeCommand('back') }
        },
        {
          label: 'export',
          cb: () => { globalVar.editor.export.downloadSVG('Untitled-1.svg') }
        },
      ]
    }
  }

  execCmd(index: number) {
    this.state.items[index].cb()
  }

  componentDidMount() {
    const editor = globalVar.editor
    editor.commandManager.setRedoListener(size => { this.setState({ redoStackSize: size }) })
    editor.commandManager.setUndoListener(size => { this.setState({ undoStackSize: size }) })
  }

  render() {
    const elements = this.state.items.map((item, index) => (
      <CmdBtnItem
        label={item.label}
        key={item.label}
        disabled={
          (item.label === 'undo' && this.state.undoStackSize === 0) ||
          (item.label === 'redo' && this.state.redoStackSize === 0)
        }
        onClick={() => this.execCmd(index)}
      />
    ))

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      }}>
        {elements}
      </div>
    )
  }
}

export default CmdBtnList
