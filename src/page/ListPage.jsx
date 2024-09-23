import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListView from '../components/ListView';
import AnimationCard from '../components/AnimationCard';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BiExport } from "react-icons/bi";
import updateListName from '../services/updateListName';
import fetchWordList from '../services/fetchWordList';
import logAccessTime from '../utils/logAccessTime';
import fetchExportDataFile from '../services/fetchExportDataFile';

const ListPage = () => {
    const { listId } = useParams();
    const [words, setWord] = useState(null);
    const [listName, setName] = useState(null);
    const [isLearning, setIsLearning] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newNameList, setNewNameList] = useState('');

    useEffect(() => {
        getWord();
        logAccessTime(listId); // Lưu thời gian khi truy cập vào trang
        // eslint-disable-next-line
    }, [listId]);

    const getWord = async () => {
        const data = await fetchWordList(listId)
        setWord(data.words);
        setName(data.name);
        setNewNameList(data.name); // Set giá trị mới cho input khi bắt đầu edit
    };

    const saveEdit = async () => {
        if (newNameList.trim()) {
            await updateListName(listId, newNameList);
            setName(newNameList); // Cập nhật tên danh sách sau khi lưu
        }
        setIsEditing(false);
    };

    // Hàm export file txt
    const handleExport = async () => {
        try {
            const exportData = await fetchExportDataFile(listId);
            const blob = new Blob([exportData], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${listName || 'export'}.txt`;
            a.click();
            window.URL.revokeObjectURL(url); // Giải phóng URL sau khi tải xuống
        } catch (error) {
            console.error("Lỗi khi export file: ", error);
        }
    };

    return (
        <div>
            <div className='flex justify-between mx-10'>
                <div className='mb-3'>
                    {!isEditing ? 
                        <div className='flex flex-row items-center'>
                            <h1 className='font-semibold text-2xl'>{listName}</h1> 
                            <CiEdit 
                                onClick={() => setIsEditing(!isEditing)} 
                                className='mx-2 text-yellow-600 cursor-pointer text-3xl hover:text-yellow-700 '
                            />
                            <BiExport 
                                className='text-dark-green hover:text-green-700 cursor-pointer text-3xl' 
                                onClick={handleExport} // Gọi hàm export khi click
                            />
                        </div>
                    :
                        <div>
                            <input 
                                type='text' 
                                value={newNameList} 
                                onChange={(e) => setNewNameList(e.target.value)} 
                                className='border px-2 py-1 rounded ml-2'
                            />
                            <button 
                                onClick={saveEdit} 
                                className='ml-3 bg-blue-500 text-white px-2 py-1 rounded'
                            >
                                Save
                            </button>
                            <button 
                                onClick={() => setIsEditing(false)}  // Thay đổi trạng thái về không chỉnh sửa
                                className='ml-3 bg-red-500 text-white px-2 py-1 rounded'
                            >
                                Cancel
                            </button>
                        </div>
                    }
                </div>
                <div className='bg-dark-green text-white font-semibold text-xl cursor-pointer p-2 rounded-xl' 
                      onClick={() => setIsLearning(!isLearning)}>
                    {isLearning ? 
                        <div className='inline-flex items-center justify-center'> 
                            <p><FaArrowLeft className='mr-2'/></p>
                            <p> Danh sách từ vựng </p>
                        </div> : 
                        <div className='inline-flex items-center justify-center'> 
                            <p> Thẻ ghi nhớ </p>
                            <p><FaArrowRight className='ml-2'/></p>
                        </div>
                    }
                </div>
            </div>
            <div>
                {isLearning ? <AnimationCard words={words}/> : <ListView words={words} listId={listId} fetchWord={getWord}/>}
            </div>
        </div>
    );
}

export default ListPage;
