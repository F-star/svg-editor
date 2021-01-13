import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.div`
  width: 100%;
  height: 30px;
  background-color: #ddd;
`

class EditorHeader extends React.Component {
  render() {
    return <StyledHeader>header</StyledHeader>
  }
}

export default EditorHeader
