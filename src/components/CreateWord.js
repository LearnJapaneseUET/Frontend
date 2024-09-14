import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import postNewWordData from "../services/postNewWordData";
import { IoCloseCircleOutline } from "react-icons/io5";

const CreateWord = ({ fetchWord, setShowCreateForm }) => {
    const [newWord, setNewWord] = useState('');
    const [Furigana, setFurigana] = useState('');
    const [Meaning, setMeaning] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { listId } = useParams();

    const createWord = async () => {
        let missingFields = [];

        if (!newWord) missingFields.push('Từ mới');
        if (!Furigana) missingFields.push('Furigana');
        if (!Meaning) missingFields.push('Meaning');

        if (missingFields.length > 0) {
            setErrorMessage(`Vui lòng điền đầy đủ các trường: ${missingFields.join(', ')}`);
            return;
        }

        const result = await postNewWordData(newWord, Furigana, Meaning, listId);

        if (result.success) {
            // alert('Từ mới đã được thêm thành công!');
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
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-80 relative'> {/* Fixed width */}
                <IoCloseCircleOutline className='text-2xl text-red-orange absolute top-0.5 right-0.5 cursor-pointer' onClick={() => setShowCreateForm(false)}/>
                <div className='flex flex-col w-full items-center'>
                    {errorMessage && <p className='text-red-500 mb-2'>{errorMessage}</p>}
                    <input 
                        type='text' 
                        value={newWord} 
                        onChange={(e) => setNewWord(e.target.value)} 
                        placeholder="Từ mới"
                        className='border px-2 py-1 rounded w-full mb-2'
                    />
                    <input 
                        type='text' 
                        value={Furigana} 
                        onChange={(e) => setFurigana(e.target.value)} 
                        placeholder="Furigana"
                        className='border px-2 py-1 rounded w-full mb-2'
                    />
                    <input 
                        type='text' 
                        value={Meaning} 
                        onChange={(e) => setMeaning(e.target.value)} 
                        placeholder="Meaning"
                        className='border px-2 py-1 rounded w-full mb-2'
                    />
                    <button 
                        onClick={createWord} 
                        className='bg-blue-500 text-white px-4 py-2 rounded'
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateWord;
