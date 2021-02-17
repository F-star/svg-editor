import React from 'react'
import styled from 'styled-components'
import globalVar from '../common/globalVar'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  color: #fff;
`
const StyledTitle = styled.div`
  border-bottom: 1px solid #999;
`
const StyledTotal = styled.span`
  font-size: 12px;
  margin-left: 4px;

`
const StyledList = styled.ul`
  flex: 1;
  margin-top: 5px;
  overflow: auto;
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
  total: number,
}

class HistoryPanel extends React.Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      items: [],
      currIndex: -1,
      total: 0,
    }
  }

  componentDidMount() {
    const cmdManager = globalVar.editor.commandManager
    cmdManager.on('change', (undos: string[], redos: string[]) => {
      // TODO: solve string array:  addRect -> add rect, setAttr -> set Attr
      this.setState({
        items: [...undos, ...redos],
        currIndex: undos.length - 1,
        total: undos.length + redos.length,
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
        <StyledTitle>
          History
          <StyledTotal>{this.state.total}</StyledTotal>
        </StyledTitle>
        <StyledList onClick={ e => this.changeCurrItem(e.target as HTMLElement) }>
          {
            this.state.items.map((item, index) => {
              return (
                <StyleItem key={index} className={this.state.currIndex === index ? 'active' : ''}>{item}</StyleItem>
              )
            })
          }
        </StyledList>
      </StyledContainer>
    )
  }
}

export default HistoryPanel
