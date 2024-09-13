import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import postNewWordData from "../services/postNewWordData"

const CreateWord = ({fetchWord}) => {
    const [newWord, setNewWord] = useState('');
    const [Furigana, setFurigana] = useState('');
    const [Meaning, setMeaning] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { listId } = useParams();
    console.log(`listId: ${listId}`)

    const createWord = async () => {
        let missingFields = [];

        if (!newWord) missingFields.push('Từ mới');
        if (!Furigana) missingFields.push('Furigana');
        if (!Meaning) missingFields.push('Meaning');

        if (missingFields.length > 0) {
            setErrorMessage(`Vui lòng điền đầy đủ các trường: ${missingFields.join(', ')}`);
            return;
        }

        const result = await postNewWordData({ newWord, furigana: Furigana, meaning: Meaning, listId });

        if (result.success) {
            alert('Từ mới đã được thêm thành công!');
            // Reset các giá trị sau khi thêm thành công
            setNewWord('');
            setFurigana('');
            setMeaning('');
            setErrorMessage(''); // Xóa lỗi sau khi thành công
            await fetchWord();
        } else {
            setErrorMessage(result.message);
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
                className='border px-2 py-1 rounded w-[30svh] mb-2'
            />
            <input 
                type='text' 
                value={Furigana} 
                onChange={(e) => setFurigana(e.target.value)} 
                placeholder="Furigana"
                className='border px-2 py-1 rounded w-[30svh] mb-2'
            />
            <input 
                type='text' 
                value={Meaning} 
                onChange={(e) => setMeaning(e.target.value)} 
                placeholder="Meaning"
                className='border px-2 py-1 rounded w-[30svh] mb-2'
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
