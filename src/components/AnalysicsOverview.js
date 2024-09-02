import React from 'react'
import board from '../Assets/board.png';
import ganbaro from '../Assets/ganbaro.png'
import { MdOutlinePlayLesson } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";

const AnalysicsOverview = () => {
  return (
    <div className="relative justify-center">
      <div className='absolute inline-flex h-80 right-[5%] left-[10%]'>
        <img src={board} alt='board' className='w-10/12 pt-[82px] '/>
        <img src={ganbaro} alt='' className='absolute right-[18%] w-4/12 relative'/>
      </div>

      <div className='flex flex-col	justify-center items-start text-xl font-semibold pt-6'>
        <h1>Analysics Overview</h1>
      </div>

      <div className='absolute mt-16 left-[16%] text-white'>
        <h1 className='text-3xl font-semibold mb-3'>Chào mừng bạn đã quay trở lại!</h1>
        <p className='text-base'>
          Hôm nay bạn đã sẵn sàng chinh phục
          những bài học tiếng Nhật mới chưa?
        </p>
        <div className='flex items-center mt-8 gap-28'>
          <div className='inline-flex'>
            <MdOutlinePlayLesson className='text-5xl rounded-full bg-red-orange p-1.5'/>
            <div className='ml-2'>
              <p>
                Số từ vựng đã học:
              </p>
              <p>
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
              <p>
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