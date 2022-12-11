import React, { FC, useEffect } from 'react'
import './App.css'
import ToolBar from './ToolBar/ToolBar'
import EditorHeader from './EditorHeader/EditorHeader'
import globalVar from './common/globalVar'
import PanelsArea from './PanelsArea/PanelsArea'
import ContextMenu from './ContextMenu'

const App: FC = () => {
  useEffect(() => {
    const editor = globalVar.editor
    editor.mount('#editor-area')
    editor.viewport.center()
  }, [])

  return (
    <div style={{ overflow: 'hidden' }}>
      <EditorHeader />
      <div style={{ display: 'flex', height: 'calc(100vh - 30px)' }}>
        <ToolBar />
        <div
          id="editor-area"
          style={{
            backgroundColor: '#4f8ae8',
            flex: 1,
          }}
        />
        <PanelsArea />
        <ContextMenu />
      </div>
    </div>
  )
}

export default App
