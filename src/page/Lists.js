import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlusCircle } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import postNewList from '../services/postNewList';
import deleteList from '../services/deleteList';

const Lists = () => {
    const [lists, setList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [error, setError] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedLists, setSelectedLists] = useState([]);

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        try {
            let response = await fetch('/api/flashcard/all/');
            if (!response.ok) {
                throw new Error('Lỗi khi lấy danh sách');
            }
            let data = await response.json();
            setList(data);
        } catch (err) {
            setError('Có lỗi xảy ra khi tải danh sách.');
        }
    };

    const handleCreateList = async () => {
        setError(''); // Reset lỗi trước khi gửi yêu cầu
        if (!newListName.trim()) {
            setError('Tên danh sách không được để trống.');
            return;
        }

        const result = await postNewList(newListName);
        if (result.success) {
            setNewListName(''); // Xóa tên danh sách sau khi tạo
            await getList(); // Cập nhật danh sách sau khi tạo mới
            setModalOpen(false); // Đóng modal
        } else {
            setError(result.message || 'Có lỗi xảy ra khi tạo danh sách.');
        }
    };

    const toggleSelectList = (id) => {
        setSelectedLists((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((listId) => listId !== id)
                : [...prevSelected, id]
        );
    };

    const handleDeleteLists = async () => {
        try {
            for (let id of selectedLists) {
                await deleteList(id)
            }
            await getList(); // Cập nhật danh sách sau khi xóa
            setSelectedLists([]);
            setIsDeleting(false);
        } catch (err) {
            setError('Có lỗi xảy ra khi xóa danh sách.');
        }
    };

    return (
        <div className='relative'>
            <div className="lists">
                {lists.map((list) => (
                    <div key={list.id} className='m-1 w-[100svh] flex items-center'>
                        {isDeleting && (
                            <input
                                type='checkbox'
                                checked={selectedLists.includes(list.id)}
                                onChange={() => toggleSelectList(list.id)}
                                className='mr-2'
                            />
                        )}
                        <Link to={`/list/${list.id}`}>
                            <h3 className={`pl-3 hover:bg-gray-200 hover:font-semibold rounded-xl ${isDeleting ? 'flex-grow' : ''}`}>
                                {list.name}
                            </h3>
                        </Link>
                    </div>
                ))}
            </div>
            <div className='absolute top-3 right-3'>
                <FiPlusCircle
                    className='text-4xl text-green-500 cursor-pointer'
                    onClick={() => setModalOpen(true)}
                />
                <MdDelete
                    className='mt-4 text-4xl text-red-500 cursor-pointer'
                    onClick={() => setIsDeleting(!isDeleting)}
                />
            </div>

            {isDeleting && (
                <div className='absolute bottom-3 right-3'>
                    <button
                        onClick={handleDeleteLists}
                        className='bg-red-500 text-white p-2 rounded hover:bg-red-600'
                    >
                        Xóa danh sách đã chọn
                    </button>
                </div>
            )}

            {modalOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-80'> {/* Fixed width */}
                        <h2 className='text-xl mb-4'>Tạo danh sách mới</h2>
                        <input
                            type='text'
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            placeholder='Nhập tên danh sách'
                            className='border border-gray-300 p-2 w-full mb-4'
                        />
                        {error && <p className='text-red-500 mb-4'>{error}</p>}
                        <button
                            onClick={handleCreateList}
                            className='bg-green-500 text-white p-2 rounded hover:bg-green-600'
                        >
                            Tạo danh sách
                        </button>
                        <button
                            onClick={() => setModalOpen(false)}
                            className='ml-4 bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400'
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Lists;
