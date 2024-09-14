const fetchWordSuggestion = async (debouncedValue) => {
    const response = await fetch(`/api/dictionary/suggestion/${debouncedValue}`);
    const data = await response.json();
    return data;
};

export default fetchWordSuggestion