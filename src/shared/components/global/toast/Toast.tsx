import React, { FC } from 'react'
import { toast, ToastOptions } from 'react-toastify'
import { IToast } from '@interfaces/shared/components/toast/Toast'

const ToastContainer: FC<IToast> = ({ message }) => {
  return (
    <div className='flex flex-row' >
      <div className='flex flex-row justify-between flex-grow font-medium p-1' >
        {message}
      </div>
    </div>
  )
}

export const showToast = (type : 'success'|'error'|'info'|'warning', message: string, options: ToastOptions = {}) => {
  const selectedToast = toast[type]
  selectedToast(<ToastContainer message={message} />, options)
}

export default showToast
