import React, { FC, useCallback } from 'react'
import { Portal } from '../portal/Portal'
import Button from '../button/Button'
import { IDialog } from '@interfaces/shared/components/dialog/Dialog'

const Dialog: FC<IDialog> = (props) => {
  const secondaryOnClickHandler = useCallback(() => {
    props.closeDialog()
  }, [props])

  const primaryOnClickHandler = useCallback(() => {
    if (props.primaryOnClick !== undefined) props.primaryOnClick()
    props.closeDialog()
  }, [props])

  return (
    <Portal closeTime={200} portalOpen={props.open} portalTag={'#dialog-portal'}>
      <div className='rounded bg-white relative h-[200px] w-[400px]'>
        <h2 className='text-bold text-center font-semibold border-b h-[30%] p-4'>{props.title}</h2>
        <div className='flex flex-col items-center h-[30%] text-center gap-4 p-4'>
          {props.content}
        </div>
        <div className='flex items-center  h-[40%] justify-around gap-4 py-2 border-t'>
          {
            props.showSecondaryButton && <Button
              color='primary'
              variant='bordered'
              radius='sm'
              className='w-[140px] '
              text={props.titleSecondaryButton?.toUpperCase() ?? 'CANCEL'}
              onClick={secondaryOnClickHandler}
            />
          }
          {
            props.showSecondaryButton &&
            <Button
              color='primary'
              radius='sm'
              className='w-[140px]'
              text={props.titlePrimaryButton?.toUpperCase() ?? 'ACCEPT'}
              onClick={primaryOnClickHandler}
            />
          }
        </div>
      </div>
    </Portal>
  )
}

export default Dialog
