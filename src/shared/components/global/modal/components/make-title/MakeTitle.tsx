import React, { FC } from 'react'
import { IMakeTitle } from '../../interfaces/MakeTitle'

const MakeTitle: FC<IMakeTitle> = ({ title }) => {
  return (
    <div className='modal_header  w-[100%] h-[60px] border-b-2 '>
      <div className='header  flex flex-row w-full h-[100%] justify-center items-center gap-[10px] '>
        <p className='font-bold text-black text-xl'>{title.toUpperCase()}</p>
      </div>
    </div>
  )
}

export default MakeTitle
