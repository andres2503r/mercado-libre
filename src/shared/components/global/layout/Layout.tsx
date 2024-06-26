import Sidebar from '@components/base/sidebar/Sidebar'
import { ILayout } from '@interfaces/shared/components/layout/Layout'
import React from 'react'

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className='flex gap-[21px] p-[25px] h-screen'>
      <div className='flex-none shadow-[#091638] shadow-lg rounded-lg 2xl:w-[142px] w-[100px] min-[3000px]:w-[250px]'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        {children}
      </div>
    </div>
  )
}

export default Layout
