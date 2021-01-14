import React from 'react'
import styled from 'styled-components'
import CmdBtnList from './CmdBtnList'
import Zoom from './Zoom'

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #444;
  width: 100%;
  height: 30px;
  background-color: #666;
  user-select: none;
`

class EditorHeader extends React.Component {
  render() {
    return (
      <StyledHeader>
        <CmdBtnList />
        <Zoom />
      </StyledHeader>
    )
  }
}

export default EditorHeader
