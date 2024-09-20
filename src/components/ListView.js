import React, { useState } from 'react';
import WordItem from '../components/WordItem';
import CreateWord from '../components/CreateWord'; // Import CreateWord
import { CiEdit } from "react-icons/ci";
import { TbHttpDelete } from "react-icons/tb";
import { FiPlusCircle } from "react-icons/fi";
import updateWord from '../services/updateWord';
import deleteWord from '../services/deleteWord';

const ListView = ({ words, listId, fetchWord }) => {
    const [editIndex, setEditIndex] = useState(null);
    const [wordId, setWordId] = useState(null);
    const [editMeaning, setEditMeaning] = useState('');
    const [editFurigana, setEditFurigana] = useState('');
    const [editHanviet, setEditHanviet] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false); // Trạng thái để hiển thị form CreateWord

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditMeaning(words[index].m);
        setEditFurigana(words[index].p);
        setEditHanviet(words[index].h);
        setWordId(words[index].id);
    };

    const saveEdit = async () => {
        if (editMeaning.trim() || editFurigana.trim() || editHanviet.trim()) {
            const success = await updateWord(wordId, editMeaning, editFurigana);
            if (success) {
                await fetchWord();
            }
        }
        setEditIndex(null);
        setEditMeaning('');
        setEditFurigana('');
        setEditHanviet('');
        setWordId(null);
    };

    const handleDelete = async (wordId) => {
        const success = await deleteWord(wordId, listId);
        if (success) {
            await fetchWord();
        }
    };

    const toggleCreateForm = () => {
        setShowCreateForm(!showCreateForm);
    };

    return (
        <div className='h-[75svh]'>
            <FiPlusCircle className='mb-4 text-4xl text-green-500 cursor-pointer' onClick={toggleCreateForm}/>

            {/* Hiển thị form CreateWord nếu showCreateForm là true */}
            {showCreateForm && <CreateWord fetchWord={fetchWord} setShowCreateForm={setShowCreateForm}/>}

            {/* Danh sách từ */}
            {words && words.length > 0 && (
                <div className="list_detail">
                    {words?.map((word, index) => (
                        <div key={index} className='flex items-center'>
                            {editIndex === index ? (
                                <div className='flex w-full items-center px-2'>
                                    <div className='flex w-full items-center'>
                                        <h3 className='w-[15svh] text-[#7695FF] pl-1'>{word?.w}</h3>
                                        <input 
                                            type='text' 
                                            value={editFurigana} 
                                            onChange={(e) => setEditFurigana(e.target.value)} 
                                            className='border px-2 py-1 rounded w-[16svh] ml-2'
                                        />
                                        <p className='w-[15svh] mr-4 text-[#F4538A]'>{word?.h}</p>
                                        <input 
                                            type='text' 
                                            value={editMeaning} 
                                            onChange={(e) => setEditMeaning(e.target.value)} 
                                            className='border px-2 py-1 rounded w-[50svh]'
                                        />
                                        <button 
                                            onClick={saveEdit} 
                                            className='ml-3 bg-blue-500 text-white px-2 py-1 rounded'
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex w-full items-center rounded-xl hover:bg-gray-200 hover:font-semibold px-2'>
                                    <div className='flex-grow'>
                                        <WordItem word={word} className='flex flex-row p-1 text-justify'/>
                                    </div>
                                    <CiEdit 
                                        onClick={() => handleEdit(index)} 
                                        className='ml-2 text-yellow-600 cursor-pointer text-2xl'
                                    />
                                    <TbHttpDelete 
                                        onClick={() => handleDelete(word.id)} 
                                        className='ml-2 text-red-500 cursor-pointer text-2xl'
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListView;
