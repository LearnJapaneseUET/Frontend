import axios from 'axios';
import getCookie from '../utils/getCookie';

const updateWord = async (wordId, meaning, furigana) => {
    const csrftoken = getCookie('csrftoken');

    if (!wordId || !meaning || !furigana) {
        return { success: false };
    }

    try {
        const response = await axios.put(`/api/flashcard/word/${wordId}/update/`, 
            {
                meaning,
                furigana
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }
        );

        return response.status === 200;
    } catch (error) {
        console.error('Error updating word:', error);
        return false;
    }
};

export default updateWord;
