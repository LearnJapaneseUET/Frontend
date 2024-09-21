import axios from 'axios';
import getCookie from '../utils/getCookie';

const deleteList = async (listId) => {
    const csrftoken = getCookie('csrftoken');

    if (!listId) {
        return { success: false };
    }

    try {
        const response = await axios.delete(`${import.meta.env.REACT_APP_BACKEND_URL}/api/flashcard/list/${listId}/delete/`, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            }
        });

        if (response.status === 200) {
            return true;
        } else {
            console.error('Failed to delete list:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};

export default deleteList;
