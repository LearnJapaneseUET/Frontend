const fetchList = async () => {
    try {
        let response = await fetch('/api/flashcard/all/');
        let data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default fetchList