import React from 'react'
import styled from 'styled-components'
import StrokeWidthSetting from '../ToolBar/StrokeWidthSetting'
import CmdBtnList from './CmdBtnList'
import Zoom from './Zoom'

const StyledHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 100px;
  width: 100%;
  height: 30px;
  background-color: #555;
  box-shadow: 0 2px 3px rgba(20, 20, 20, .2);
  user-select: none;
  z-index: 34;
`

class EditorHeader extends React.Component {
  render() {
    return (
      <StyledHeader>
        <StrokeWidthSetting></StrokeWidthSetting>
        <CmdBtnList />
        <Zoom />
      </StyledHeader>
    )
  }
}

export default EditorHeader
