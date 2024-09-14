const fetchWordData = async (searchTerm) => {
    try {
        let response = await fetch(`/api/dictionary/search/word/${searchTerm}`);
        let data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default fetchWordData;