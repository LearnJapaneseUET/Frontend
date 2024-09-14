import getCookie from '../utils/getCookie';

const deleteList = async (listId) => {
    const csrftoken = getCookie('csrftoken');

    if (!listId) {
        return { success: false };
    }
    try {
        const response = await fetch(`/api/flashcard/list/${listId}/delete/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            }
        });

        if (response.ok) {
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
