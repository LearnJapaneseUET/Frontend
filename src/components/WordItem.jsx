import React from 'react'

const WordItem = ({word, className}) => {
  return (
    <div className={`${className} items-center`}>
        <h3 className='w-[15svh] mr-4 text-[#7695FF]'>{word?.w}</h3>
        <p className='w-[16svh] mr-8 text-[#FF7F3E]'>{word?.p}</p>
        <p className="w-[15svh] mr-4 text-[#F4538A]">{word?.h}</p>
        <p className="w-[42svh]">{word?.m}</p>
        {/* <p>${image ? `<img src="${image}" alt="Ảnh từ Irasutoya">` : ''}</p> */}
    </div>
  )
}

export default WordItem