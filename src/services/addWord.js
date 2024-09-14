import getCookie from '../utils/getCookie';

const addWord = async (wordWriting, listId) => {
    const csrftoken = getCookie('csrftoken');

    if (!wordWriting || !listId) {
        return { success: false };
    }

    try {
        const response = await fetch('/api/flashcard/word/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                w: wordWriting,
                listId: listId
            })
        });

        if (response.ok) {
            return { success: true };
        } else {
            const errorData = await response.json();
            return { success: false, message: errorData.error || 'Có lỗi xảy ra khi thêm từ mới.' };
        }
    } catch (error) {
        return { success: false, message: 'Có lỗi kết nối với máy chủ.' };
    }
};

export default addWord;
