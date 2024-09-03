import React from 'react'
import { TbSquareRoundedNumber1Filled,
         TbSquareRoundedNumber2Filled,
         TbSquareRoundedNumber3Filled } from "react-icons/tb";

const CurrentLessons = () => {
  const lessons = [
      { title: "Từ vựng bài 10", numWord: 34, icon: <TbSquareRoundedNumber1Filled />, Color: 'red-orange' },
      { title: "Kanji bài 3-2", numWord: 72, icon: <TbSquareRoundedNumber2Filled />, Color: 'dark-yellow' },
      { title: "Từ vựng bài đọc", numWord: 83, icon: <TbSquareRoundedNumber3Filled />, Color: 'dark-green' },
  ];
    
  return (
    <div className='bg-slate-50 p-4 rounded-xl'>
        <div className='grid grid-cols-2 items-center'>
            <h1 className='text-xl font-semibold'>Current Lessons</h1>
            <span className='text-right'>All lessons</span>
        </div>
        <div className='mt-6 mx-4'>
            {
              lessons.map((lesson, index) => (
                <>
                <div  key={index} className='mb-4 p-2 grid grid-cols-[auto_1fr_auto] items-center rounded-lg gap-2 bg-white'>
                  <span className={`text-5xl text-${lesson.Color}`}>
                    {lesson.icon}
                  </span>
                  <div>
                    <p className='font-semibold'>{lesson.title}</p>
                    <p>Remaining: {lesson.numWord}</p>
                  </div>
                  <div className={`bg-${lesson.Color} bg-opacity-25 border border-solid rounded-full px-2 py-1 cursor-pointer text-center ml-4`}>
                    <p className='font-normal'>view lesson</p>
                  </div>
                </div>
                </>
              ))
            }
        </div>
    </div>
  )
}
        
export default CurrentLessons