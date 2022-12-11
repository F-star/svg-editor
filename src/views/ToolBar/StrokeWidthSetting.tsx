import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import globalVar from '../common/globalVar'
import editorDefaultConfig from '../../config/editorDefaultConfig'

const StyleDiv = styled.div`
  padding-right: 30px;
`
const StyledLabel = styled.label`
  padding-right: 8px;
  font-size: 12px;
  color: #fff;
`
const StyledInput = styled.input`
  padding: 0 4px;
  width: 40px;
  height: 16px;
  line-height: 16px;
  outline: none;
`
const StrokeWidthSetting: FC = () => {
  const [strokeWidth, setStrokeWidth] = useState(parseFloat(editorDefaultConfig.strokeWidth))

  useEffect(() => {
    globalVar.editor.setting.on('stroke-width', val => {
      const num = parseFloat(val)
      setStrokeWidth(num)
    })
    // TODO: off event binding when component destroy.
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let num = parseFloat(e.target.value)
    if (isNaN(num)) {
      num = 1
    }
    setStrokeWidth(num)
  }
  const handleBlur = () => {
    const val = strokeWidth + 'px'
    globalVar.editor.setting.setStrokeWidth(val)
    globalVar.editor.activedElsManager.setElsAttr('stroke-width', val)
  }
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur()
    }
  }

  return (
    <StyleDiv>
      <StyledLabel htmlFor="stoke-width-input">Stroke-Width</StyledLabel>
      <StyledInput
        id="stoke-width-input"
        type="text"
        autoComplete="off"
        value={strokeWidth}
        onChange={e => handleChange(e)}
        onKeyDown={e => e.stopPropagation()}
        onKeyUp={e => handleKeyUp(e)}
        onBlur={() => handleBlur()}
      />
    </StyleDiv>
  )
}

export default StrokeWidthSetting
