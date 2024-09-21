import axios from 'axios';

const fetchWordData = async (searchTerm) => {
    if (!searchTerm) {
        return { success: false };
    }
    try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/dictionary/search/word/${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching word data:', error);
        return { success: false, message: 'Có lỗi xảy ra khi tìm kiếm.' };
    }
};

export default fetchWordData;
