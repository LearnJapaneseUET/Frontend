import axios from 'axios';
import getCookie from '../utils/getCookie';

const postNewList = async (name) => {
    const csrftoken = getCookie('csrftoken');

    if (!name) {
        return { success: false };
    }

    try {
        const response = await axios.post('/api/flashcard/list/create/', 
            { name },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }
        );

        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.error || 'Có lỗi xảy ra khi tạo danh sách.' };
    }
};

export default postNewList;
