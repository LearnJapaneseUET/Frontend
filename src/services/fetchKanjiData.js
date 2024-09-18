import axios from 'axios';

const fetchKanjiData = async (searchTerm) => {
    if (!searchTerm) {
        return { success: false };
    }
    try {
        const response = await axios.get(`/api/dictionary/search/kanji/${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Kanji data:', error);
        return { success: false, message: 'Có lỗi xảy ra khi tìm kiếm.' };
    }
};

export default fetchKanjiData;
