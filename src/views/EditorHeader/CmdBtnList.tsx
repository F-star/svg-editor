import React from 'react'
import globalVar from '../common/globalVar'
import CmdBtnItem from './CmdBtnItem'

type States = {
  redoSize: number,
  undoSize: number,
  items: Array<{ label: string, cb: () => void }>
}
class CmdBtnList extends React.Component<unknown, States> {
  constructor(props: unknown) {
    super(props)
    this.state = {
      redoSize: 0,
      undoSize: 0,
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
    const cmdManager = globalVar.editor.commandManager
    cmdManager.on('change', (undos: string[], redos: string[]) => {
      this.setState({
        undoSize: undos.length,
        redoSize: redos.length,
      })
    })
  }

  render() {
    const elements = this.state.items.map((item, index) => (
      <CmdBtnItem
        label={item.label}
        key={item.label}
        disabled={
          (item.label === 'undo' && this.state.undoSize === 0) ||
          (item.label === 'redo' && this.state.redoSize === 0)
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
