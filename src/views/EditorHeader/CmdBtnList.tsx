import React, { FC, useState } from 'react'
import globalVar from '../common/globalVar'
import CmdBtnItem from './CmdBtnItem'

const CmdBtnList: FC = () => {
  const [redoSize, setRedoSize] = useState(0)
  const [undoSize, setUndoSize] = useState(0)
  const items = [
    { label: 'Undo', cb: () => { globalVar.editor.executeCommand('undo') } },
    { label: 'Redo', cb: () => { globalVar.editor.executeCommand('redo') } },
    {
      label: 'Delete',
      cb: () => { globalVar.editor.activedElsManager.isNoEmpty() && globalVar.editor.executeCommand('removeElements') },
    },
    {
      label: 'Front',
      cb: () => { globalVar.editor.activedElsManager.isNoEmpty() && globalVar.editor.executeCommand('front') },
    },
    {
      label: 'Forward',
      cb: () => { globalVar.editor.activedElsManager.isNoEmpty() && globalVar.editor.executeCommand('forward') },
    },
    {
      label: 'Backward',
      cb: () => { globalVar.editor.activedElsManager.isNoEmpty() && globalVar.editor.executeCommand('backward') },
    },
    {
      label: 'Back',
      cb: () => { globalVar.editor.activedElsManager.isNoEmpty() && globalVar.editor.executeCommand('back') },
    },
    {
      label: 'Export',
      cb: () => { globalVar.editor.export.downloadSVG('Untitled-1.svg') },
    },
  ]

  const execCmd = (index: number) => {
    items[index].cb()
  }

  const elements = items.map((item, index) => (
    <CmdBtnItem
      label={item.label}
      key={item.label}
      disabled={
        (item.label === 'Undo' && undoSize === 0) ||
        (item.label === 'Redo' && redoSize === 0)
      }
      onClick={() => execCmd(index)}
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

export default CmdBtnList
