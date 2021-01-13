import React from 'react'
import styled from 'styled-components'


const Div = styled.div`
  margin: 0 auto 5px auto;
  border: 1px solid #666;
  border-radius: 4px;
  // box-sizing: border-box;
  width: 40px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  background-color: #666;
  cursor: default;
  user-select: none;

  &:hover, &.active {
    background-color: #333;
    font-weight: bold;
    border-color: #322;
  }
`

function ToolItem(props: { name: string, value: string, currentTool: string, onClick: (val: string) => void }) {
  return (
    <Div
      // style={{ color: props.currentTool === props.value ? 'red' : '' }}
      className={props.currentTool === props.value ? 'active' : '' }
      onClick={() => { props.onClick(props.value) }}
    >
      {props.name}
    </Div>
  )
}

export default ToolItem
