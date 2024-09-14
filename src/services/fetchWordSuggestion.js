const fetchWordSuggestion = async (debouncedValue) => {
    if (!debouncedValue) {
        return { success: false };
    }
    const response = await fetch(`/api/dictionary/suggestion/${debouncedValue}`);
    const data = await response.json();
    return data;
};

export default fetchWordSuggestion