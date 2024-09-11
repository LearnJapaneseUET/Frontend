import React, { useState, useEffect } from 'react';

const FlashCardListBox = () => {
    const [lists, setList] = useState([]);
    const [selectedList, setSelectedList] = useState(''); // Trạng thái để lưu danh sách được chọn

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        try {
            let response = await fetch('/api/flashcard/all/');
            let data = await response.json();
            setList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSelectChange = (event) => {
        setSelectedList(event.target.value); // Cập nhật trạng thái khi chọn một mục
        console.log("Selected list:", event.target.value); // Hiển thị danh sách được chọn trong console
    };

    return (
        <div className='absolute top-3 right-3'>
            <select 
                className='border rounded-lg p-2 bg-white text-black' 
                value={selectedList} 
                onChange={handleSelectChange}
            >
                <option value="" disabled>Choose a flashcard list</option>
                {lists.map((list, index) => (
                    <option key={index} value={list.name}>
                        {list.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FlashCardListBox;
