import React from 'react'
import { TbSquareLetterAFilled, TbSquareLetterBFilled, TbSquareLetterCFilled, 
         TbSquareLetterDFilled, TbSquareLetterEFilled, TbSquareLetterFFilled,
         TbSquareLetterGFilled, TbSquareLetterHFilled, TbSquareLetterIFilled,
         TbSquareLetterJFilled, TbSquareLetterKFilled, TbSquareLetterLFilled,
         TbSquareLetterMFilled, TbSquareLetterNFilled, TbSquareLetterOFilled,
         TbSquareLetterPFilled, TbSquareLetterQFilled, TbSquareLetterRFilled,
         TbSquareLetterSFilled, TbSquareLetterTFilled, TbSquareLetterUFilled,
         TbSquareLetterVFilled, TbSquareLetterWFilled, TbSquareLetterXFilled,
         TbSquareLetterYFilled, TbSquareLetterZFilled} from "react-icons/tb";

         const CurrentLessons = () => {
          return (
            <div>
                <div className='grid grid-cols-2 items-center'>
                    <h1 className='text-xl font-semibold'>Current Lessons</h1>
                    <span className='text-right'>All lessons</span>
                </div>
                <div className='mt-6 mx-4'>
                  <div className='mb-4 p-2 grid grid-cols-[auto_1fr_auto] items-center border border-solid border-black rounded-lg gap-2'>
                    <TbSquareLetterAFilled className='text-5xl text-red-orange'/>
                    <div>
                      <p>Số từ vựng đã học:</p>
                      <p>160 từ</p>
                    </div>
                    <div className='border border-solid border-black rounded-full px-2 cursor-pointer text-center ml-4'>
                      <p>view lesson</p>
                    </div>
                  </div>
        
                  <div className='mb-4 p-2 grid grid-cols-[auto_1fr_auto] items-center border border-solid border-black rounded-lg gap-2'>
                    <TbSquareLetterBFilled className='text-5xl text-dark-yellow'/>
                    <div className='ml-2'>
                      <p>Số từ vựng đã học:</p>
                      <p>160 từ</p>
                    </div>
                    <div className='border border-solid border-black rounded-full px-2 cursor-pointer text-center ml-4'>
                      <p>view lesson</p>
                    </div>
                  </div>
        
                  <div className='mb-4 p-2 grid grid-cols-[auto_1fr_auto] items-center border border-solid border-black rounded-lg gap-2'>
                    <TbSquareLetterCFilled className='text-5xl text-dark-green'/>
                    <div className='ml-2'>
                      <p>Số từ vựng đã học:</p>
                      <p>160 từ</p>
                    </div>
                    <div className='border border-solid border-black rounded-full px-2 cursor-pointer text-center ml-4'>
                      <p>view lesson</p>
                    </div>
                  </div>
                </div>
            </div>
          )
        }
        
export default CurrentLessons