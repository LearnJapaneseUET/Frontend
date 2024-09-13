import React from 'react'
import board from '../Assets/board.png';
import ganbaro from '../Assets/ganbaro.png'
import { MdOutlinePlayLesson } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";

const AnalysicsOverview = () => {
  return (
    <div className="relative flex flex-col pb-12"> {/* Changed from flex-cols to flex-col */}
      <div className='absolute inline-flex h-[19.5rem] pb-6'>
        <img src={board} alt='board' className='w-10/12 pt-12 '/>
        <img src={ganbaro} alt='' className='absolute right-[16svh] w-4/12 relative'/>
      </div>

      <div className='text-xl font-semibold'>
        <h1>Analysics Overview</h1> {/* First heading */}
      </div>

      <div className='mt-14 text-white z-10 flex flex-col ml-[7svh]'>
        <h1 className='text-3xl font-semibold mb-3'>Chào mừng bạn đã quay trở lại!</h1> {/* Second heading */}
        <p className='text-base'>
          Hôm nay bạn đã sẵn sàng chinh phục
          những bài học tiếng Nhật mới chưa?
        </p>
        <div className='flex mt-8 gap-28'>
          <div className='inline-flex'>
            <MdOutlinePlayLesson className='text-5xl rounded-full bg-red-orange p-1.5'/>
            <div className='ml-2'>
              <p>
                Số từ vựng đã học:
              </p>
              <p className='font-semibold'>
                160 từ
              </p>
            </div>
          </div>
          <div className='inline-flex'>
            <FaVideo className='text-5xl rounded-full bg-dark-yellow p-2'/>
            <div className='ml-2'>
              <p>
                Số video đã xem:
              </p>
              <p className='font-semibold'>
                10 videos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysicsOverview
