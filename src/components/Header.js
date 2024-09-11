import React from 'react'
import avatar from '../Assets/ava.png';
import { FaRegBell } from "react-icons/fa";
import SearchField from './SearchField';

const Header = () => {
  return (
    <div className='flex items-center my-6'>
      <SearchField/>
      <div className='flex items-center w-[30%]'>
        <div className='text-2xl'>
          <FaRegBell className={`text-gray-500 cursor-pointer`}/>
        </div>
        <div className='ml-auto mr-10 flex items-center border-r-2 border-b-2 border-gray-200 rounded-2xl shadow-md cursor-pointer'>
          <img className="rounded-full w-10 h-10 border-4 border-[#97BE5A] my-2 mx-2" src={avatar} alt='avatar' />
          <span className="mr-6 text-base font-normal">Vương Phương Thảo</span>
        </div>
      </div>
    </div>
  )
}

export default Header