import getCookie from '../utils/getCookie';

const updateWord = async (wordId, meaning, furigana) => {
    const csrftoken = getCookie('csrftoken');
    console.log("update:", wordId, meaning, furigana);
    try {
        const response = await fetch(`/api/flashcard/word/${wordId}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                meaning: meaning,
                furigana: furigana,
            })
        });

        if (response.ok) {
            return true;
        } else {
            console.error('Failed to update word:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};

export default updateWord;
