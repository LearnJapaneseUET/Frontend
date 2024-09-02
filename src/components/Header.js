import React from 'react'
import {BsSearch} from "react-icons/bs";
import avatar from '../image/ava.png';
import { IoNotifications } from "react-icons/io5";

const Header = () => {
  return (
    <div className='flex justify-between place-items-center my-6 mx-10'>
      <div className={`flex items-center justify-center bg-dark-purple px-4 py-2 w-4/12 rounded-3xl ml-10`}>
        <input type={"search"} placeholder='Search for query' className={`text-base bg-transparent w-full text-white focus:outline-none`}/>
        <BsSearch className={`text-white text-lg block float-right cursor-pointer}`}/>
      </div>
      <div className='flex gap-20	cursor-pointer'>
          <div className='text-2xl place-self-center'>
              <IoNotifications/>
          </div>
          <div className='flex items-center border-t-2 border-r-2 border-b-2 border-grey-900 rounded-full shadow-md	cursor-pointer'>
              <img className="rounded-full w-12 h-12 border-2 border-green-900" src={avatar} alt='avatar' />
              <span className="ml-2 mr-6">User Name</span>
          </div>
        </div>
    </div>
  )
}

export default Header