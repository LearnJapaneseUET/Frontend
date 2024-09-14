import getCookie from '../utils/getCookie';

const updateListName = async (listId, listName) => {
    const csrftoken = getCookie('csrftoken');

    if (!listId || !listName) {
        return { success: false };
    }

    try {
        const response = await fetch(`/api/flashcard/list/${listId}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                name: listName
            })
        });

        if (response.ok) {
            return true;
        } else {
            console.error('Failed to update list:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};

export default updateListName;
