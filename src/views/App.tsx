import React from 'react'
import './App.css'
import ToolBar from './ToolBar/ToolBar'
import EditorHeader from './EditorHeader/EditorHeader'
import { initEditor } from '../app'
import Editor from '../editor'

class App extends React.Component {
  editor: Editor

  constructor(props: any) {
    super(props)
    this.editor = initEditor()
  }

  componentDidMount() {
    this.editor.mount('#editor-area')
    this.editor.viewport.center()
  }

  render() {
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
          >
          </div>
        </div>
      </div>
    )
  }
}


export default App
