import React from 'react'
import styled from 'styled-components'


const Div = styled.div`
  margin: 0 auto 5px auto;
  border: 1px solid #666;
  border-radius: 4px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;

  color: #fff;
  background-color: #666;
  cursor: default;
  user-select: none;

  i {
    font-size: 24px;
  }

  &:hover, &.active {
    background-color: #333;
    border-color: #322;
  }
`

type Props ={
  name: string,
  cmdName: string,
  iconName: string,
  currentTool: string,
  onClick: (val: string) => void
}


function ToolItem(props: Props) {
  return (
    <Div
      className={props.currentTool === props.cmdName ? 'active' : '' }
      onClick={() => { props.onClick(props.cmdName) }}
    >
      <i className={`svg-editor-iconfont ${props.iconName}`}></i>
    </Div>
  )
}

export default ToolItem
