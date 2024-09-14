const fetchWordList = async (listId) => {
    let response = await fetch(`/api/flashcard/${listId}/`);
    let data = await response.json();
    return data;
};

export default fetchWordList