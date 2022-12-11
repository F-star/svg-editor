import React, { FC } from 'react'
import { PhotoshopPicker } from 'react-color'
import Popover from '@material-ui/core/Popover'

type IProps = {
  open: boolean,
  anchorEl: Element,
  color: string,
  pickerColor: string
  onChange: (color: string) => void
  onAccept: (color: string) => void
  onCancel: () => void
}


const ColorPicker: FC<IProps> = (props) => {


  return (
    <Popover
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={() => props.onCancel()}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: -15,
      }}
    >
      <div>
        <PhotoshopPicker
          color={ props.pickerColor }
          onChange={(color: any) => props.onChange(color.hex)}
          onAccept={() => props.onAccept(props.pickerColor)}
          onCancel={() => props.onCancel()}
        />
      </div>
    </Popover>
  )
}

export default ColorPicker
