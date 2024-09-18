import axios from 'axios';

const fetchWordSuggestion = async (debouncedValue) => {
    if (!debouncedValue) {
        return { success: false };
    }
    try {
        const response = await axios.get(`/api/dictionary/suggestion/${debouncedValue}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching word suggestion:', error);
        return { success: false, message: 'Có lỗi xảy ra khi lấy gợi ý từ.' };
    }
};

export default fetchWordSuggestion;
