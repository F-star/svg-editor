import React from 'react'
import styled from 'styled-components'


const Div = styled.div`
  margin: 0 auto 5px auto;
  border: 1px solid #333;
  border-radius: 8px;
  width: 50px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 12px;
  background-color: #fff;
  cursor: pointer;
`

function ToolItem(props: { name: string, value: string, currentTool: string, onClick: (val: string) => void }) {
  return (
    <Div
      style={{ color: props.currentTool === props.value ? 'red' : '' }}
      onClick={() => { props.onClick(props.value) }}
    >
      {props.name}
    </Div>
  )
}

export default ToolItem
