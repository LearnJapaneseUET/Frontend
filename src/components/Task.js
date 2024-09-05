import React, { useState } from 'react';
import { GoTasklist } from 'react-icons/go';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { CiEdit } from "react-icons/ci";
import { TbHttpDelete } from "react-icons/tb";


const Task = () => {
    const [tasks, setTasks] = useState([
        { content: "Học 30 từ kanji", is_done: true },
        { content: "Xem 1 video tiếng nhật", is_done: true },
        { content: "Nghe choukai 15p", is_done: false },
        { content: "Làm bài tập sách mimi", is_done: false },
        { content: "Ôn bài cũ", is_done: true },
        // Add more tasks as needed
    ]);

    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editTask, setEditTask] = useState("");

    const toggleTaskDone = (index) => {
        setTasks(prevTasks => 
            prevTasks.map((task, i) => 
                i === index ? { ...task, is_done: !task.is_done } : task
            )
        );
    };

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { content: newTask, is_done: false }]);
            setNewTask("");
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditTask(tasks[index].content);
    };

    const saveEdit = () => {
        if (editTask.trim()) {
            setTasks(tasks.map((task, i) =>
                i === editIndex ? { ...task, content: editTask } : task
            ));
            setEditIndex(null);
            setEditTask("");
        }
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div className='flex mb-10 mt-3 max-w-[25%] max-h-[88%]'>
            <div className='bg-[#FF9EAA] pl-5 py-5 w-68 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl border-b-[12px] border-r-8 border-red-orange'>
                <div className='flex justify-between items-center'>
                    <div className='inline-flex items-center gap-2'>
                        <GoTasklist className='text-white text-5xl'/>
                        <span className='text-2xl text-end font-semibold text-white'> Task </span>
                    </div>
                    <div className='border border-2 bg-[#F8E8EE] rounded-full px-2 py-1 mr-3 cursor-pointer'>
                        <span>view more</span>
                    </div>
                </div>
                <div className='flex gap-2 mt-6'>
                    <input 
                        type='text' 
                        value={newTask} 
                        onChange={(e) => setNewTask(e.target.value)} 
                        placeholder='Add a new task' 
                        className='px-2 py-1 rounded border'
                    />
                    <button 
                        onClick={addTask} 
                        className='bg-dark-green text-white py-1 px-2 rounded mr-3'
                    >
                        Add
                    </button>
                </div>
                <div className='max-h-[30rem] custom-scroll-bar-2 overflow-y-auto mt-6 pr-2'>
                    {tasks.map((task, index) => (
                        <div key={index} className='mb-8 mx-2 flex flex-row items-center rounded-lg p-2 bg-[#F8E8EE]'>
                            <span 
                                className='text-2xl text-dark-green cursor-pointer' 
                                onClick={() => toggleTaskDone(index)}
                            >
                                {task.is_done ? <ImCheckboxChecked/> : <ImCheckboxUnchecked/>}
                            </span>
                            <span className='ml-2'>
                                {editIndex === index ? (
                                    <>
                                        <input 
                                            type='text' 
                                            value={editTask} 
                                            onChange={(e) => setEditTask(e.target.value)} 
                                            className='border px-2 py-1 rounded'
                                        />
                                        <button 
                                            onClick={saveEdit} 
                                            className='mt-2 bg-blue-500 text-white px-2 py-1 rounded'
                                        >
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {task.content}
                                    </>
                                )}
                            </span>
                            <span className='ml-auto flex justify-between'>
                                <CiEdit 
                                    onClick={() => handleEdit(index)} 
                                    className='ml-2 text-yellow-600 cursor-pointer text-2xl mx-1'
                                />
                                <TbHttpDelete 
                                    onClick={() => deleteTask(index)} 
                                    className='ml-2 text-red-500 cursor-pointer text-2xl'
                                />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Task;
