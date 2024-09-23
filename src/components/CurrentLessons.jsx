import React, { useEffect, useState } from 'react';
import fetchAllLists from '../services/fetchAllLists';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';


const CurrentLessons = () => {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        // Lấy danh sách các mục đã lưu từ localStorage
        const storedEntries = JSON.parse(localStorage.getItem('listPageAccessEntries')) || [];
        
        // Hàm lấy chi tiết danh sách dựa trên listId
        const fetchLessons = async () => {
            try {
                // Lấy toàn bộ danh sách từ API
                const listData = await fetchAllLists();
                
                console.log("listData:", listData)
                console.log("storedEntries", storedEntries)
                // Lọc những danh sách có listId khớp với storedEntries
                const filteredData = listData.filter(list => 
                    storedEntries.some(entry => entry.listId.toString() === list.id.toString())
                );

                console.log("filteredData", filteredData);

                // Kết hợp với timestamp từ storedEntries
                const dataWithTimestamp = filteredData?.map(list => {
                    const entry = storedEntries.find(entry => entry.listId.toString() === list.id.toString());                    
                    return {
                        ...list,
                        timestamp: entry ? entry.timestamp : null
                    };
                });

                // Loại bỏ các giá trị null
                const validData = dataWithTimestamp.filter(item => item !== null);

                // Cập nhật dữ liệu vào state
                setLessons(validData);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bài học:", error);
            }
        };

        fetchLessons();
    }, []);

    // Hàm định dạng timestamp
    const formatDate = (timestamp) => {
        return format(new Date(timestamp), 'yyyy-MM-dd'); // Định dạng theo ý muốn
    };

    return (
        <div>
            <h1 className='text-xl font-semibold my-6'>Bài học gần đây</h1>
            <div className='container flex justify-around items-center flex-wrap p-5 bg-[#FFD966] rounded-2xl'>
                {lessons?.length > 0 ? (
                    lessons?.map((lesson, index) => (
                        <div key={index} className='card relative shadow-card rounded-lg w-3/12 h-64 group cursor-pointer'>
                            <Link to={`/list/${lesson?.id}`}>
                                <div className='box absolute border-[3px] border-slate-100 inset-3.5 p-2 shadow-box rounded-lg flex justify-center items-center transition duration-500 group-hover:-translate-y-[20px] group-hover:shadow-box-hover group-hover:bg-[#FFACAC]'>
                                    <div className='content p-2 text-center'>
                                        <h2 className='absolute top-[-5px] right-2 text-7xl text-[rgba(0,0,0,0.05)] font-bold pointer-events-none group-hover:text-slate-[150] transition duration-500'>{lesson.number}</h2>
                                        <h3 className='relative z-10 text-xl font-bold text-lg text-[#5D5D5D] group-hover:text-white'>{lesson?.name}</h3>
                                        <p className='z-10 text-[#5D5D5D] group-hover:text-white'>Lần cuối truy cập: {formatDate(lesson?.timestamp)}</p>
                                        <span className='relative bg-white text-[#5D5D5D] font-semibold inline-block mt-2 px-2 rounded-full shadow-box group-hover:bg-red-orange group-hover:text-white transition duration-500'>Xem thêm</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>Không có bài học nào để hiển thị.</p>
                )}
            </div>
        </div>
    );
}

export default CurrentLessons;
