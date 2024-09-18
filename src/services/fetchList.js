import axios from 'axios';

const fetchList = async () => {
    try {
        const response = await axios.get('/api/flashcard/all/');
        return response.data;
    } catch (error) {
        console.error('Error fetching list:', error);
        return { success: false, message: 'Có lỗi xảy ra khi lấy danh sách.' };
    }
};

export default fetchList;
