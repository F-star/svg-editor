import React, { FC, useEffect, useState } from 'react'
import globalVar from '../common/globalVar'

const Zoom: FC = () => {
  const [zoom, setZoom] = useState('100')
  useEffect(() => {
    const editor = globalVar.editor

    editor.viewport.onZoomChange(zoom => {
      setZoom((zoom * 100).toFixed(2))
    })
  })

  return (
    <>
      <div style={{ marginLeft: 20, color: '#fff', fontSize: '12px' }}>
      zoom:
        <span style={{
          display: 'inline-block',
          marginLeft: 10,
          paddingLeft: 4,
          minWidth: 60,
          backgroundColor: '#fff',
          color: '#333',
        }}>{zoom}%</span>
      </div>
      <button
        style={{ marginLeft: 10 }}
        onClick={() => { globalVar.editor.viewport.zoomOut() }}
      >-</button>
      <button onClick={() => { globalVar.editor.viewport.zoomIn() }}>+</button>
    </>
  )
}


export default Zoom
