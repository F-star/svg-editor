import React from 'react'
import ReactDOM from 'react-dom'
import { initEditor } from '../app'
import App from './App'
import globalVar from './common/globalVar'

globalVar.editor = initEditor()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
