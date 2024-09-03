import {React} from 'react'
import { GoTasklist } from "react-icons/go";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";


const Task = () => {
    const tasks = [
        {content: "Học 30 từ kanji", is_done: true},
        {content: "Xem 1 video tiếng nhật", is_done: true},
        {content: "Nghe choukai 15p", is_done: false},
        {content: "Làm bài tập sách mimi", is_done: false},
        {content: "Ôn bài cũ", is_done: true},
        {content: "Ôn bài cũ", is_done: true},
        {content: "Ôn bài cũ", is_done: true},
    ]

    return(
        <div className='flex mb-14 mt-3'>
            <div className='bg-[#FF9EAA] px-5 py-5 w-68 rounded-tl-3xl rounded-bl-3xl'>
                <div className='inline-flex items-center gap-2'>
                    <GoTasklist className='text-white text-5xl'/>
                    <span className='text-2xl text-end font-semibold text-white'> Task </span>
                </div>
                <div>
                    {tasks.map((task, index) => (
                        <>
                        <div  key={index} className='mb-8 mt-4 mx-2 flex flex-row items-center rounded-lg p-2 bg-[#FFE5E5]'>
                            <span className='text-2xl text-dark-green cursor-pointer'>
                                {task.is_done ? <ImCheckboxChecked/> : <ImCheckboxUnchecked/>}
                            </span>
                            <span className='ml-2'>{task.content}</span>
                        </div>
                        </>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Task