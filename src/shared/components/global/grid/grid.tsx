import React, { FC } from 'react'
import { IGrid } from '@interfaces/shared/components/grid/Grid.'
import Sidebar from '@components/base/sidebar/Sidebar'
// import { useRouter } from 'next/router'

const Grid: FC<IGrid> = ({ children }) => {
  // const router = useRouter()
  // const { asPath } = router

  // const pathParts = asPath.split('/').filter(Boolean)

  return (
    <main className='bg-black h-screen p-4 '>
      <div className='border-solid border-2 border-white h-full rounded-3xl' >
        <div className='text-white h-[5%] flex px-40 items-center border-dashed border-b-2 border-white '>
          <span>Cliente CS3</span>
        </div>
        <div className=' h-[95%] flex flex-row'>
          <div className=' w-3/12'>
            <Sidebar/>
          </div>
          <div className='bg-blue-200 w-9/12 p-1'>{ children }</div>
        </div>
      </div>
      {/* <div className='' >
        cliente cs3
      </div>
      <div></div>
      { children } */}
    </main>
  )
}

export default Grid
