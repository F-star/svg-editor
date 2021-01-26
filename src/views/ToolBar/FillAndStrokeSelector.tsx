import React from 'react'
import config from '../../config/editorDefaultConfig'
import globalVar from '../common/globalVar'
import ColorPicker from './components/ColorPicker'

type State = {
  fill: string,
  stroke: string,
  openFill: boolean,
  openStroke: boolean,
  pickerFill: string,
  pickerStroke: string,
}

class FillAndStrokeSelector extends React.Component<any, State> {
  private setFill = (fill: string) => { this.setState({ fill, pickerFill: fill }) }
  private setStroke = (stroke: string) => { this.setState({ stroke, pickerStroke: stroke }) }
  private fillRef: React.RefObject<HTMLDivElement>
  private strokeRef: React.RefObject<HTMLDivElement>

  constructor(props: any) {
    super(props)
    this.state = {
      fill: config.fill,
      stroke: config.stroke,
      openFill: false,
      openStroke: false,
      pickerFill: '#fff',
      pickerStroke: '#fff',
    }
    this.fillRef = React.createRef()
    this.strokeRef = React.createRef()
  }

  componentDidMount() {
    const editor = globalVar.editor
    editor.setting.on('fill', this.setFill)
    editor.setting.on('stroke', this.setStroke)
  }

  componentWillUnmount() {
    const editor = globalVar.editor
    editor.setting.off('fill', this.setFill)
    editor.setting.off('stroke', this.setStroke)
  }

  changeFill(hex: string) {
    this.setState({ openFill: false })
    const editor = globalVar.editor
    editor.setting.setFill(hex)
    editor.activedElsManager.setElsAttr('fill', hex)
  }

  changeStroke(hex: string) {
    this.setState({ openStroke: false })
    const editor = globalVar.editor
    editor.setting.setStroke(hex)
    editor.activedElsManager.setElsAttr('stroke', hex)
  }

  render() {
    const Fill = (
      <div
        ref={this.fillRef}
        style={{
          margin: '6px auto',
          width: 30,
          height: 30,
          backgroundColor: this.state.fill,
          border: '1px solid #fff',
          boxShadow: '0 0 0 1px #111',
        }}
        onClick={() => { this.setState({ openFill: true }) }}
      ></div>
    )

    const Stroke = (
      <div
        ref={this.strokeRef}
        style={{
          margin: '6px auto',
          width: 32,
          height: 32,
          border: `8px solid ${this.state.stroke}`,
          boxSizing: 'border-box',
          boxShadow: '0 0 0 1px #fff, inset 0 0 0 1px #fff',
        }}
        onClick={() => { this.setState({ openStroke: true }) }}
      ></div>
    )

    return (
      <div
        style={{
          paddingTop: 15,
        }}
      >
        {Fill}
        {Stroke}
        <ColorPicker
          open={ this.state.openFill }
          anchorEl={ this.fillRef.current }
          color={ this.state.fill }
          pickerColor={this.state.pickerFill}
          onChange={(color) => { this.setState({ pickerFill: color }) } }
          onAccept= {(color: string) => this.changeFill(color) }
          onCancel= {() => { this.setState({ openFill: false }) } }
        />

        <ColorPicker
          open={ this.state.openStroke }
          anchorEl={ this.fillRef.current }
          color={ this.state.stroke }
          pickerColor={this.state.pickerStroke}
          onChange={(color) => { this.setState({ pickerStroke: color }) } }
          onAccept= {(color: string) => this.changeStroke(color) }
          onCancel= {() => { this.setState({ openStroke: false }) } }
        />
      </div>
    )
  }
}

export default FillAndStrokeSelector
