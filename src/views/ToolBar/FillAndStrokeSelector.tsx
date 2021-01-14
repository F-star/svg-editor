import React from 'react'
import config from '../../config/editorDefaultConfig'
import globalVar from '../common/globalVar'

type Props = {
  fill: string,
  stroke: string,
}

class FillAndStrokeSelector extends React.Component<any, Props> {
  private setFill = (fill: string) => { this.setState({ fill }) }
  private setStroke = (stroke: string) => { this.setState({ stroke }) }

  constructor(props: any) {
    super(props)
    this.state = {
      fill: config.fill,
      stroke: config.stroke,
    }
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

  changeFill() {
    // TODO: plan to use color picker
    const editor = globalVar.editor
    const fill = window.prompt(
      'Please input valid color value（like #ffce43）',
      editor.setting.get('fill')
    )
    if (!fill) return

    editor.setting.setFill(fill)
    editor.activedElsManager.setElsAttr('fill', fill)
  }

  changeStroke() {
    // TODO: plan to use color picker
    const editor = globalVar.editor
    const stroke = window.prompt(
      'Please input valid color value（like #ffce43）',
      globalVar.editor.setting.get('stroke')
    )
    if (!stroke) return

    editor.setting.setStroke(stroke)
    editor.activedElsManager.setElsAttr('stroke', stroke)
  }

  render() {
    const Fill = (
      <div
        style={{
          margin: '6px auto',
          width: 30,
          height: 30,
          backgroundColor: this.state.fill,
        }}
        onClick={() => { this.changeFill() }}
      ></div>
    )

    const Stroke = (
      <div
        style={{
          margin: '6px auto',
          width: 30,
          height: 30,
          border: `4px solid ${this.state.stroke}`,
          boxSizing: 'border-box',
        }}
        onClick={() => { this.changeStroke() }}
      ></div>
    )

    return (
      <div style={{
        paddingTop: 15,
      }}>
        {Fill}
        {Stroke}
      </div>
    )
  }
}

export default FillAndStrokeSelector
