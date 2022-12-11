import React, { FC } from 'react'
import HistoryPanel from './HistoryPanel'

const PanelsArea: FC = () => {
  return (
    <div style={{
      flexShrink: 0,
      width: 160,
      height: '100%',
      backgroundColor: '#555',
    }}>
      <HistoryPanel />
    </div>
  )
}

export default PanelsArea
