// src/services/deleteWord.js
import getCookie from '../utils/getCookie';

const deleteWord = async (wordId, listId) => {
    const csrftoken = getCookie('csrftoken');
    try {
        const response = await fetch(`/api/flashcard/word/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                wordId: wordId,
                listId: listId
            })
        });

        if (response.ok) {
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
