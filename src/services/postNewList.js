import getCookie from '../utils/getCookie';

const postNewList = async (name) => {
    const csrftoken = getCookie('csrftoken');

    try {
        const response = await fetch('/api/flashcard/list/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({ name: name })
        });

        if (response.ok) {
            // Xử lý phản hồi thành công
            const data = await response.json();
            return { success: true, data }; // Trả về dữ liệu danh sách mới
        } else if (response.status === 400) {
            const errorData = await response.json();
            return { success: false, message: errorData.error };
        }
    } catch (error) {
        // Xử lý lỗi kết nối
        return { success: false, message: 'Có lỗi kết nối với máy chủ.' };
    }
};

export default postNewList;
