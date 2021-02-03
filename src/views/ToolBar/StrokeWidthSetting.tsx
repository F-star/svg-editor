import React from 'react'
import styled from 'styled-components'
import globalVar from '../common/globalVar'
import editorDefaultConfig from '../../config/editorDefaultConfig'

type States = {
  strokeWidth: number,
}

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
class StrokeWidthSetting extends React.Component<any, States> {
  constructor(props: any) {
    super(props)
    this.state = {
      strokeWidth: parseFloat(editorDefaultConfig.strokeWidth),
    }
  }
  componentDidMount() {
    globalVar.editor.setting.on('stroke-width', val => {
      const num = parseFloat(val)
      this.setState({ strokeWidth: num })
    })
    // TODO: off event binding when component destroy.
  }
  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let num = parseFloat(e.target.value)
    if (isNaN(num)) {
      num = 1
    }
    this.setState({ strokeWidth: num })
  }
  handleBlur() {
    const val = this.state.strokeWidth + 'px'
    globalVar.editor.setting.setStrokeWidth(val)
    globalVar.editor.activedElsManager.setElsAttr('stroke-width', val)
  }
  handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur()
    }
  }
  render() {
    return (
      <StyleDiv>
        <StyledLabel htmlFor="stoke-width-input">Stroke-Width</StyledLabel>
        <StyledInput
          id="stoke-width-input"
          type="text"
          autoComplete="off"
          value={this.state.strokeWidth}
          onChange={e => this.handleChange(e)}
          onKeyDown={e => e.stopPropagation()}
          onKeyUp={e => this.handleKeyUp(e)}
          onBlur={() => this.handleBlur()}
        ></StyledInput>
      </StyleDiv>
    )
  }
}

export default StrokeWidthSetting
