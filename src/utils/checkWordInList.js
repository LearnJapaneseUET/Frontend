// Hàm kiểm tra xem từ đã có trong danh sách words hay chưa
const isWordInList = (wordWriting, wordList) => {
    console.log("check:", wordWriting, wordList)
    return wordList.some((w) => w.w === wordWriting);
};

export default isWordInList