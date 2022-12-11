import React, { useEffect, useRef, useState } from 'react'
import config from '../../config/editorDefaultConfig'
import globalVar from '../common/globalVar'
import ColorPicker from './components/ColorPicker'

const FillAndStrokeSelector = () => {
  const [fill, setFill] = useState<string>(config.fill)
  const [stroke, setStroke] = useState<string>(config.stroke)
  const [openFill, setOpenFill] = useState(false)
  const [openStroke, setOpenStroke] = useState(false)
  const [pickerFill, setPickerFill] = useState('#fff')
  const [pickerStroke, setPickerStroke] = useState('#fff')

  const fillRef = useRef<HTMLDivElement>(null)
  const strokeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const editor = globalVar.editor

    const _setFill = (fill: string) => {
      setFill(fill)
      setPickerFill(fill)
    }
    const _setStroke = (stroke: string) => {
      setStroke(stroke)
      setPickerStroke(stroke)
    }

    editor.setting.on('fill', _setFill)
    editor.setting.on('stroke', _setStroke)
    return () => {
      editor.setting.off('fill', _setFill)
      editor.setting.off('stroke', _setStroke)
    }
  }, [])


  const changeFill = (hex: string) => {
    setOpenFill(false)
    const editor = globalVar.editor
    editor.setting.setFill(hex)
    editor.activedElsManager.setElsAttr('fill', hex)
  }
  const changeStroke = (hex: string) => {
    setOpenStroke(false)
    const editor = globalVar.editor
    editor.setting.setStroke(hex)
    editor.activedElsManager.setElsAttr('stroke', hex)
  }

  const Fill = (
    <div
      ref={fillRef}
      style={{
        margin: '6px auto',
        width: 30,
        height: 30,
        backgroundColor: fill,
        border: '1px solid #fff',
        boxShadow: '0 0 0 1px #111',
      }}
      onClick={() => { setOpenFill(true) }}
    />
  )

  const Stroke = (
    <div
      ref={strokeRef}
      style={{
        margin: '6px auto',
        width: 32,
        height: 32,
        border: `8px solid ${stroke}`,
        boxSizing: 'border-box',
        boxShadow: '0 0 0 1px #fff, inset 0 0 0 1px #fff',
      }}
      onClick={() => { setOpenStroke(true) }}
    />
  )


  return (
    <div
      style={{
        paddingTop: 15,
      }}
    >
      {Fill}
      {Stroke}
      <ColorPicker
        open={ openFill }
        anchorEl={ fillRef.current as Element}
        color={ fill }
        pickerColor={pickerFill}
        onChange={(color) => { setPickerFill(color) } }
        onAccept={(color: string) => changeFill(color) }
        onCancel={() => { setOpenFill(false) } }
      />

      <ColorPicker
        open={ openStroke }
        anchorEl={ fillRef.current as Element}
        color={ stroke }
        pickerColor={pickerStroke}
        onChange={(color) => { setPickerStroke(color) } }
        onAccept={(color: string) => changeStroke(color) }
        onCancel={() => { setOpenStroke(false) } }
      />
    </div>
  )
}

export default FillAndStrokeSelector
