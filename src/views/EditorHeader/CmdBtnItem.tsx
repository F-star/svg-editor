import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  margin-right: 5px;
  padding: 0 4px;
  border: 1px solid #666;
  border-radius: 4px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  background-color: #666;
  cursor: default;
  user-select: none;

  &:hover {
    background-color: #333;
    border-color: #322;
  }
  &.disabled {
    color: #999;
    border: 1px solid #555!important;
    background-color: #555!important;
  }
`

function CmdBtnItem(props: {
  label: string,
  disabled: boolean,
  onClick: () => void }) {
  return (
    <Div
      className={props.disabled ? 'disabled' : ''}
      onClick={() => { !props.disabled && props.onClick() }}
    >
      {props.label}
    </Div>
  )
}

export default CmdBtnItem
