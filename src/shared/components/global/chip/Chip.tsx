import React from 'react'
import { Chip as NextChip } from '@nextui-org/react'
import { IChip } from '@interfaces/shared/components/chip/Chip'

const Chip:React.FC<IChip> = (props) => {
  return (
    <NextChip
      isDisabled={props.isDisabled}
      size={props.size}
      variant={props.variant ?? 'faded'}
      radius={props.radius ?? 'full'}
      color={props.color ?? 'default'}
      onClose={props.onClose}
      className={props.className}
      classNames={props.classNames}
    >
      { props.text ?? props.children}
    </NextChip>
  )
}

export default Chip
