import React from 'react'
import styled from 'styled-components'
import globalVar from '../common/globalVar'


const StyledContainer = styled.div`
  padding: 4px;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  color: #fff;
`
const StyledTitle = styled.div`
  border-bottom: 1px solid #999;
`
const StyleItem = styled.li`
  line-height: 24px;
  font-size: 14px;
  color: #fff;
  text-indent: 4px;
  cursor: pointer;
  &.active {
    background-color: #666;
  }
`

type State = {
  items: string[],
  currIndex: number,
}

class HistoryPanel extends React.Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      items: [],
      currIndex: -1,
    }
  }

  componentDidMount() {
    const cmdManager = globalVar.editor.commandManager
    cmdManager.on('change', (undos: string[], redos: string[]) => {
      this.setState({
        items: [...undos, ...redos],
        currIndex: undos.length - 1,
      })
    })
  }

  changeCurrItem(target: HTMLElement) {
    const index = Array.from(target.parentNode.children).indexOf(target)

    const cmdManager = globalVar.editor.commandManager
    if (index === this.state.currIndex) return
    cmdManager.go(index - this.state.currIndex)

    this.setState({ currIndex: index })
  }

  render() {
    return (
      <StyledContainer>
        <StyledTitle>History</StyledTitle>
        <ul onClick={ e => this.changeCurrItem(e.target as HTMLElement) }>
          {
            this.state.items.map((item, index) => {
              return (
                <StyleItem key={index} className={this.state.currIndex === index ? 'active' : ''}>{item}</StyleItem>
              )
            })
          }
        </ul>
      </StyledContainer>
    )
  }
}

export default HistoryPanel
