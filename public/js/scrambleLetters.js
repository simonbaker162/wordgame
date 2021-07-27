import {
	specialLetter // the letter all the words to be found must contain
} from "./levelData.js";

import {
	shuffleArray // helper function to shuffle arrays
} from "./shuffleArray.js";

export const scrambleLetters = (bigWord) => {
	const splitBigWord = bigWord.split("");
	const scrambledWord = shuffleArray(splitBigWord);
	const specialLetterIndex = findSpecialLetterIndex(scrambledWord);
	positionSpecialLetter(scrambledWord, specialLetterIndex);
	return scrambledWord;
};

const findSpecialLetterIndex = (word) => {
	const specialLetterIndex = word.findIndex((letter) => {
		return letter === specialLetter;
	});
	return specialLetterIndex;
};

const positionSpecialLetter = (arr, index) => {
	const i = arr[4];
	arr[4] = arr[index];
	arr[index] = i;
};
