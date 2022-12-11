import React, { FC } from 'react'
import styled from 'styled-components'
import Popover from '@material-ui/core/Popover'
import { makeStyles, createStyles } from '@material-ui/core/styles'

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

const useStyles = makeStyles(() =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
  }),
)

const ToolItem: FC<Props> = (props) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Div
      className={props.currentTool === props.cmdName ? 'active' : '' }
      onClick={() => { props.onClick(props.cmdName) }}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <i className={`svg-editor-iconfont ${props.iconName}`} />
      <Popover
        className={classes.popover}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: -2,
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div
          style={{
            padding: '4px 8px',
            color: '#333',
            fontSize: 12,
            backgroundColor: '#eee',
          }}
        >{props.name}</div>
      </Popover>
    </Div>
  )
}

export default ToolItem
