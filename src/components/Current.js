import React from 'react'

const Current = () => {

    const Lessons = [
        { number: "01", name: "Card One", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "},
        { number: "02", name: "Card Two", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "},
        { number: "03", name: "Card Three", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "},
      ];
    
    return (
        <div>
            <h1 className='text-xl font-semibold mb-4'>Current Lessons</h1>
            <div className='container flex justify-around items-center flex-wrap p-5 bg-[#FFD966] rounded-2xl'>
                {Lessons.map((lesson, index) => (
                    <div key = {index} className='card relative shadow-card rounded-lg w-3/12 h-64 group cursor-pointer'>
                        <div className='box absolute border inset-3.5 p-2 shadow-box rounded-lg flex justify-center items-center transition duration-500 group-hover:-translate-y-[20px] group-hover:shadow-box-hover group-hover:bg-[#FFACAC]'>
                            <div className='content p-2 text-center'>
                                <h2 className='absolute top-[-5px] right-2 text-7xl text-[rgba(0,0,0,0.05)] font-bold pointer-events-none group-hover:text-slate-[150] transition duration-500'>{lesson.number}</h2>
                                <h3 className='relative z-10 text-xl font-bold text-lg text-[#5D5D5D] group-hover:text-white'>{lesson.name}</h3>
                                <p className='z-10 text-[#5D5D5D] group-hover:text-white'>{lesson.content}</p>
                                <span className='relative bg-white text-[#5D5D5D] font-semibold inline-block mt-2 px-2 rounded-full shadow-box group-hover:bg-red-orange group-hover:text-white transition duration-500'>Read more</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div> 
        </div>
    )
}

export default Current