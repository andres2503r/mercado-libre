import Button from '@components/global/button/Button'
import { useRouter } from 'next/router'
import { FaBomb } from 'react-icons/fa'

import React, { FC } from 'react'
import { ICrashed } from '@interfaces/shared/components/crashed/Crashed'

const Crashed: FC<ICrashed> = (props) => {
  const router = useRouter()
  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8">
      <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300 flex gap-4">Oops! <FaBomb/></p>

      <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">Looks like MVision has crashed unexpectedly...</p>
      <p className="text-gray-500 mt-4 pb-4 border-b-2 text-xl md:text-2xl lg:text-4xl text-center mb-4">{`We've tracked the error and will get right on it.`}</p>

      <div className='w-[30%] flex justify-between'>
        <Button
          className='w-[45%]'
          onClick={props.onClick}
          text="Try Again"
        />
        <Button
          className='w-[45%]'
          onClick={() => router.back()}
          text="Go Back"
        />
      </div>
    </div>
  )
}

export default Crashed
