import React from 'react'
import { PhotoshopPicker } from 'react-color'
import Popover from '@material-ui/core/Popover'


type Props = {
  open: boolean,
  anchorEl: Element,
  color: string,
  pickerColor: string
  onChange: (color: string) => void
  onAccept: (color: string) => void
  onCancel: () => void
}


class ColorPicker extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <Popover
        open={this.props.open}
        anchorEl={this.props.anchorEl}
        onClose={() => this.props.onCancel()}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <div>
          <PhotoshopPicker
          color={ this.props.pickerColor }
          onChange={(color: any) => this.props.onChange(color.hex)}
          onAccept={() => this.props.onAccept(this.props.pickerColor)}
          onCancel={() => this.props.onCancel()}
        />
        </div>
      </Popover>
    )
  }
}

export default ColorPicker
