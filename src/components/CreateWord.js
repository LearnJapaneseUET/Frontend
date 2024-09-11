import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

const CreateWord = ({getCookie, fetchWord}) => {
    const [newWord, setNewWord] = useState('');
    const [Furigana, setFurigana] = useState('');
    const [Meaning, setMeaning] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { listId } = useParams();
    console.log(`listId: ${listId}`)
    const csrftoken = getCookie('csrftoken')

    const createWord = async () => {
        let missingFields = [];

        if (!newWord) missingFields.push('Từ mới');
        if (!Furigana) missingFields.push('Furigana');
        if (!Meaning) missingFields.push('Meaning');

        if (missingFields.length > 0) {
            setErrorMessage(`Vui lòng điền đầy đủ các trường: ${missingFields.join(', ')}`);
            return;
        }

        try {
            const response = await fetch('/api/flashcard/word/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({
                    w: newWord,
                    p: Furigana,
                    m: Meaning,
                    listId: listId
                })
            });

            if (response.ok) {
                alert('Từ mới đã được thêm thành công!');
                // Reset các giá trị sau khi thêm thành công
                setNewWord('');
                setFurigana('');
                setMeaning('');
                setErrorMessage(''); // Xóa lỗi sau khi thành công
                await fetchWord();
            } else {
                // Xử lý thông báo lỗi từ API
                const errorData = await response.json();
                if (errorData.error && errorData.error.includes('Từ mới đã tồn tại')) {
                    setErrorMessage(`Từ "${newWord}" đã tồn tại trong danh sách.`);
                    setNewWord('');
                    setFurigana('');
                    setMeaning('');
                } else {
                    setErrorMessage('Có lỗi xảy ra khi thêm từ mới.');
                }
            }
        } catch (error) {
            setErrorMessage('Có lỗi kết nối với máy chủ.');
        }
    }

    return (
        <div className='flex flex-col w-full items-center'>
            {errorMessage && <p className='text-red-500 mb-2'>{errorMessage}</p>}
            <input 
                type='text' 
                value={newWord} 
                onChange={(e) => setNewWord(e.target.value)} 
                placeholder="Từ mới"
                className='border px-2 py-1 rounded w-[30%] mb-2'
            />
            <input 
                type='text' 
                value={Furigana} 
                onChange={(e) => setFurigana(e.target.value)} 
                placeholder="Furigana"
                className='border px-2 py-1 rounded w-[30%] mb-2'
            />
            <input 
                type='text' 
                value={Meaning} 
                onChange={(e) => setMeaning(e.target.value)} 
                placeholder="Meaning"
                className='border px-2 py-1 rounded w-[30%] mb-2'
            />
            <button 
                onClick={createWord} 
                className='ml-3 bg-blue-500 text-white px-2 py-1 rounded'
            >
                Add
            </button>
        </div>
    )
}

export default CreateWord;
