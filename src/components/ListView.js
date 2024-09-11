import React, { useState } from 'react';
import WordItem from '../components/WordItem'
import { CiEdit } from "react-icons/ci";
import { TbHttpDelete } from "react-icons/tb";

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const ListView = ({ words, fetchWord }) => {
    const [editIndex, setEditIndex] = useState(null);
    const [wordId, setWordId] = useState(null);
    const [editMeaning, setEditMeaning] = useState('');
    const [editFurigana, setEditFurigana] = useState('');
    const [editHanviet, setEditHanviet] = useState('');
    const csrftoken = getCookie('csrftoken');

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditMeaning(words[index].m);  // Giả sử bạn muốn chỉnh sửa thuộc tính `m`
        setEditFurigana(words[index].p); // Giả sử bạn muốn chỉnh sửa thuộc tính `h`
        setEditHanviet(words[index].h);  // Giả sử bạn muốn chỉnh sửa thuộc tính `p`
        setWordId(words[index].id); // Thiết lập ID từ để sử dụng khi lưu
    };

    const updatedWord = async () => {
        try {
            const response = await fetch(`/api/flashcard/word/${wordId}/update/`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({
                    meaning: editMeaning,
                    furigana: editFurigana,
                    //h: editHanviet
                })
            });
    
            if (response.ok) {
                // Nếu yêu cầu PUT thành công, làm mới danh sách từ
                await fetchWord();
            } else {
                console.error('Failed to update word:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const deletedWord = async (id) => {
        try {
            const response = await fetch(`/api/flashcard/word/${id}/delete/`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            });
    
            if (response.ok) {
                // Nếu yêu cầu DELETE thành công, làm mới danh sách từ
                fetchWord();
            } else {
                console.error('Failed to delete word:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const saveEdit = () => {
        if (editMeaning.trim() || editFurigana.trim() || editHanviet.trim()) {
            updatedWord()
            fetchWord(); // Làm mới danh sách từ
        }
        setEditIndex(null);
        setEditMeaning('');
        setEditFurigana('');
        setEditHanviet('');
        setWordId(null); // Xóa ID sau khi lưu
    };

    return (
        <div className='mt-6'>
            {words && words.length > 0 && (
                <div className="list_detail">
                    {words.map((word, index) => (
                        <div key={index} className='flex items-center'>
                            {editIndex === index ? (
                                <div className='flex w-full items-center'>
                                    <h3 className='w-[15%] mr-4 text-[#7695FF]'>{word?.w}</h3>
                                    <input 
                                        type='text' 
                                        value={editFurigana} 
                                        onChange={(e) => setEditFurigana(e.target.value)} 
                                        className='border px-2 py-1 rounded w-[30%] ml-2'
                                    />
                                    <input 
                                        type='text' 
                                        value={editHanviet} 
                                        onChange={(e) => setEditHanviet(e.target.value)} 
                                        className='border px-2 py-1 rounded w-[30%] ml-2'
                                    />
                                    <input 
                                        type='text' 
                                        value={editMeaning} 
                                        onChange={(e) => setEditMeaning(e.target.value)} 
                                        className='border px-2 py-1 rounded w-[30%]'
                                    />
                                    <button 
                                        onClick={saveEdit} 
                                        className='ml-3 bg-blue-500 text-white px-2 py-1 rounded'
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div className='flex w-full items-center'>
                                    <div className='flex-grow'>
                                        <WordItem word={word} className='flex flex-row p-1 rounded-xl hover:bg-gray-200 text-justify'/>
                                    </div>
                                    <CiEdit 
                                        onClick={() => handleEdit(index)} 
                                        className='ml-2 text-yellow-600 cursor-pointer text-2xl flex-shrink-0'
                                    />
                                    <TbHttpDelete 
                                        onClick={() => deletedWord(word.id)} 
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