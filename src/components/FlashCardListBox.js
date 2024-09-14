import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import fetchList from '../services/fetchList';

const FlashCardListBox = ({ onSelectListChange }) => {
    const [lists, setList] = useState([]);
    const [selectedList, setSelectedList] = useState(null); // Trạng thái để lưu danh sách được chọn

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        try {
            let data = await fetchList();
            // Convert lists to options suitable for react-select
            const options = data.map((list) => ({
                value: list.id,
                label: list.name,
            }));
            setList(options);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSelectChange = (selectedOption) => {
        setSelectedList(selectedOption); // Cập nhật trạng thái khi chọn một mục
        console.log("Selected list ID:", selectedOption.value); // Hiển thị ID của danh sách được chọn
        onSelectListChange(selectedOption.value); // Chỉ truyền value (ID) cho hàm callback
    };

    return (
        <div className='ml-auto w-[18svh] mb-6'>
            <Select 
                className='border rounded-lg bg-white text-black'
                value={selectedList} 
                onChange={handleSelectChange}
                options={lists} // Hiển thị danh sách các tùy chọn
                isSearchable // Cho phép tìm kiếm
                placeholder="Choose a list"
            />
        </div>
    );
};

export default FlashCardListBox;
