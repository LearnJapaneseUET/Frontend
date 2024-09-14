import getCookie from '../utils/getCookie';

const postNewWordData = async (newWord, furigana, meaning, listId) => {
    const csrftoken = getCookie('csrftoken');

    try {
        const response = await fetch('/api/flashcard/word/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                w: newWord,
                p: furigana,
                m: meaning,
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

export default postNewWordData;
