export function extractTime(dateString) {
	const date = new Date(dateString);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	return `${hours}:${minutes}`;
}

// Thêm số 0 phía trước nếu chỉ có 1 chữ số
function padZero(number) {
	return number.toString().padStart(2, "0");
}