import axios from 'axios';
import getCookie from '../utils/getCookie';

const addWord = async (wordWriting, listId) => {
    const csrftoken = getCookie('csrftoken');

    if (!wordWriting || !listId) {
        return { success: false };
    }

    try {
        const response = await axios.post('/api/flashcard/word/add/', 
        {
            w: wordWriting,
            listId: listId
        }, 
        {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            }
        });

        // Kiểm tra phản hồi nếu thành công
        if (response.status === 201) {
            return { success: true };
        } else {
            return { success: false, message: 'Có lỗi xảy ra khi thêm từ mới.' };
        }
    } catch (error) {
        // Kiểm tra lỗi từ phản hồi của máy chủ
        if (error.response) {
            const errorData = error.response.data;
            return { success: false, message: errorData.error || 'Có lỗi xảy ra khi thêm từ mới.' };
        } else {
            // Lỗi không phải từ phản hồi của máy chủ
            return { success: false, message: 'Có lỗi kết nối với máy chủ.' };
        }
    }
};

export default addWord;
