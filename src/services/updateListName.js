import axios from 'axios';
import getCookie from '../utils/getCookie';

const updateListName = async (listId, listName) => {
    const csrftoken = getCookie('csrftoken');

    if (!listId || !listName) {
        return { success: false };
    }

    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/flashcard/list/${listId}/update/`, 
            { name: listName },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }
        );

        return response.status === 200;
    } catch (error) {
        console.error('Error updating list:', error);
        return false;
    }
};

export default updateListName;
