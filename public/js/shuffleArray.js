// Helper function to shuffle arrays
const shuffleArr = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const k = arr[i];
    arr[i] = arr[j];
    arr[j] = k;
  }
  return arr;
}

export const shuffleArray = shuffleArr;