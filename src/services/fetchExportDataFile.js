import axios from 'axios';

const fetchExportDataFile = async (listId) => {
    if (!listId) {
        return { success: false };
    }

    try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/flashcard/list/${listId}/export/`);
                // Kiểm tra mã trạng thái phản hồi
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Unexpected response status:', response.status);
            return { success: false, message: 'Không thể xuất dữ liệu danh sách.' };
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};

export default fetchExportDataFile;
