import React from 'react'
import ReactDOM from 'react-dom'
import { initEditor } from '../app'
import '../assets/css/iconfont/iconfont.css'
import App from './App'
import globalVar from './common/globalVar'

globalVar.editor = initEditor()

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById('root')
)
