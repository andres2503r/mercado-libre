import React, { FC } from 'react'
import { IMakeTextProps } from '../../interfaces/MakeText'

const MakeText: FC<IMakeTextProps> = ({ element }) => {
  return (
    <div
      style={{
        color: 'rgba(0,0,0,0.8)',
        textAlign: 'center',
        fontSize: '14px',
        ...element.styles
      }}
    >
      <p style={element.textStyles}>
        {element.text}
      </p>
    </div>
  )
}

export default MakeText
