import axios from 'axios';
import getCookie from '../utils/getCookie';

const postNewWordData = async (newWord, furigana, meaning, listId) => {
    const csrftoken = getCookie('csrftoken');

    if (!newWord || !furigana || !meaning || !listId) {
        return { success: false };
    }

    try {
        const response = await axios.post(`${import.meta.env.REACT_APP_BACKEND_URL}/api/flashcard/word/create/`, 
            {
                w: newWord,
                p: furigana,
                m: meaning,
                listId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }
        );

        return { success: true };
    } catch (error) {
        return { success: false, message: error.response?.data?.error || 'Có lỗi xảy ra khi thêm từ mới.' };
    }
};

export default postNewWordData;
