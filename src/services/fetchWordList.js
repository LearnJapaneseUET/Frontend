const fetchWordList = async (listId) => {
    if (!listId) {
        return { success: false };
    }
    let response = await fetch(`/api/flashcard/${listId}/`);
    let data = await response.json();
    return data;
};

export default fetchWordList