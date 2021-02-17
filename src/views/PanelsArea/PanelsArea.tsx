import React from 'react'
import HistoryPanel from './HistoryPanel'

class PanelsArea extends React.Component {
  render() {
    return (
      <div style={{
        flexShrink: 0,
        width: 160,
        height: '100%',
        backgroundColor: '#555',
      }}>
        <HistoryPanel></HistoryPanel>
      </div>
    )
  }
}

export default PanelsArea
