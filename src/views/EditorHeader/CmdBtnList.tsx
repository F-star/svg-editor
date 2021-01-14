import React from 'react'
import Editor from '../../editor'
import globalVar from '../common/globalVar'
import CmdBtnItem from './CmdBtnItem'


// const cmdBtnItems = [
//   { name: 'undo' }
// ]

function execCmd(cmd: string) {
  globalVar.editor.executeCommand(cmd)
}

function CmdBtnList() {
  const items = [
    { label: 'undo', cmd: 'undo' },
    { label: 'redo', cmd: 'redo' },
    { label: 'delete', cmd: 'removeElements' },
    { label: 'front', cmd: 'front' },
    { label: 'forward', cmd: 'forward' },
    { label: 'backward', cmd: 'backward' },
    { label: 'back', cmd: 'back' },
  ].map(item => (
    <CmdBtnItem
      label={item.label}
      cmd={item.cmd}
      key={item.cmd}
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
      {items}
    </div>
  )
}

export default CmdBtnList
