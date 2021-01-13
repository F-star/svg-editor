import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.div`
  border-bottom: 1px solid #444;
  width: 100%;
  height: 30px;
  background-color: #666;
`

class EditorHeader extends React.Component {
  render() {
    return <StyledHeader></StyledHeader>
  }
}

export default EditorHeader
