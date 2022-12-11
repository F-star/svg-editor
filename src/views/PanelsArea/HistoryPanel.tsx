import React, { FC, useEffect, useState } from 'react'
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

const HistoryPanel: FC = () => {
  const [items, setItems] = useState<string[]>([])
  const [currIndex, setCurrIndex] = useState(-1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const cmdManager = globalVar.editor.commandManager
    cmdManager.on('change', (undos: string[], redos: string[]) => {
      setItems([...undos, ...redos])
      setCurrIndex(undos.length - 1)
      setTotal(undos.length + redos.length)
    })
  }, [])

  const changeCurrItem = (target: HTMLElement) => {
    if (!target.parentNode) return
    const index = Array.from(target.parentNode.children).indexOf(target)

    const cmdManager = globalVar.editor.commandManager
    if (index === currIndex) return
    cmdManager.go(index - currIndex)

    setCurrIndex(index)
  }


  return (
    <StyledContainer>
      <StyledTitle>
          History
        <StyledTotal>{total}</StyledTotal>
      </StyledTitle>
      <StyledList onClick={ e => changeCurrItem(e.target as HTMLElement) }>
        {
          items.map((item, index) => {
            return (
              <StyleItem key={index} className={currIndex === index ? 'active' : ''}>{item}</StyleItem>
            )
          })
        }
      </StyledList>
    </StyledContainer>
  )
}

export default HistoryPanel
