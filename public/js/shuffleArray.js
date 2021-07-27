// Helper function to shuffle arrays
// Based on Fisher-Yates shuffle,
// walks array in reverse order and
// swaps each element with one before it
const shuffleArr = (arr) => {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const k = arr[i];
		arr[i] = arr[j];
		arr[j] = k;
	}
	return arr;
};

export const shuffleArray = shuffleArr;
