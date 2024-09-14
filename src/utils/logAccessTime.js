// logAccessTime.js
const logAccessTime = (listId) => {
    // Lấy danh sách các mục đã lưu từ localStorage hoặc khởi tạo mảng rỗng
    const accessEntries = JSON.parse(localStorage.getItem('listPageAccessEntries')) || [];
    
    // Tạo một mục mới với listId hiện tại và thời gian truy cập
    const newEntry = {
        listId: listId,
        timestamp: new Date().toISOString() // Thời gian hiện tại theo định dạng ISO
    };

    // Kiểm tra xem listId đã tồn tại trong danh sách chưa
    const existingIndex = accessEntries.findIndex(entry => entry.listId === listId);
    
    if (existingIndex !== -1) {
        // Nếu đã tồn tại, cập nhật timestamp của mục đó
        accessEntries[existingIndex] = newEntry;
    } else {
        // Nếu không tồn tại, thêm mục mới vào đầu mảng
        accessEntries.unshift(newEntry);
    }

    // Giữ lại chỉ ba mục gần đây nhất
    if (accessEntries.length > 3) {
        accessEntries.splice(3); // Loại bỏ tất cả các mục sau chỉ mục 2
    }

    // Lưu danh sách mục đã cập nhật vào localStorage
    localStorage.setItem('listPageAccessEntries', JSON.stringify(accessEntries));
};

export default logAccessTime;

