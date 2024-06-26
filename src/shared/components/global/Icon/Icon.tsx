import React, { FC, ReactElement } from 'react'
import * as icons from 'react-icons/fi'
import { IconType } from 'react-icons/lib'
import { IIcon } from '@interfaces/shared/components/icon/Icon'

const Icon: FC<IIcon> = ({
  icon = 'FiAlertCircle',
  size = 24,
  styles = {},
  tooltip
}): ReactElement => {
  const Icon: IconType = (icons as any)[icon]
  return (
    <Icon
      style={{
        color: 'black',
        fontSize: `${size}px`,
        cursor: 'pointer',
        ...styles
      }}
    />
  )
}

export default Icon
