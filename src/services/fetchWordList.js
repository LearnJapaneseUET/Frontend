import axios from 'axios';

const fetchWordList = async (listId) => {
    if (!listId) {
        return { success: false };
    }
    try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/flashcard/${listId}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching word list:', error);
        return { success: false, message: 'Có lỗi xảy ra khi lấy danh sách từ.' };
    }
};

export default fetchWordList;
