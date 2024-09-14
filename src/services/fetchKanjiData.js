const fetchKanjiData = async (searchTerm) => {
    let response = await fetch(`/api/dictionary/search/kanji/${searchTerm}`);
    let data = await response.json();
    return data;
}

export default fetchKanjiData;
