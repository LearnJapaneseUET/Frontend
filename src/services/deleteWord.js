import axios from 'axios';
import getCookie from '../utils/getCookie';

const deleteWord = async (wordId, listId) => {
    const csrftoken = getCookie('csrftoken');

    if (!wordId || !listId) {
        return { success: false };
    }

    try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/flashcard/word/delete/`, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            data: {
                wordId: wordId,
                listId: listId
            }
        });

        if (response.status === 200) {
            return true;
        } else {
            console.error('Failed to delete word:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};

export default deleteWord;
