import React from 'react'

const WordItem = ({word, image, className}) => {
  console.log(word)
  return (
    <div className={`${className}`}>
        <h3 className='w-[15%] mr-4 text-[#7695FF]'>{word?.w}</h3>
        <p className='w-[16%] mr-8 text-[#FF7F3E]'>{word?.p}</p>
        <p className={`${word?.h ? "w-[15%] mr-4 text-[#F4538A]" : ""}`}>{word?.h}</p>
        <p className={`${word?.h ? "w-[44%]" : "[60]"}`}>{word?.m}</p>
        {/* <p>${image ? `<img src="${image}" alt="Ảnh từ Irasutoya">` : ''}</p> */}
    </div>
  )
}

export default WordItem