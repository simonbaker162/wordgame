// Import data and functions
import {
	processedGameWords, // list of words to be found
	bigWord, // the 9-letter word from which the other words are derived
	specialLetter // the letter all the words to be found must contain
} from "./levelData.js";

import {
	shuffleArray // helper function to shuffle arrays
} from "./shuffleArray.js";

// --------------------------------------------------

// Get DOM elements
const wordsArea = document.getElementById("words-area");
const controlsArea = document.getElementById("controls-area");
const inputForm = document.getElementById("input-form");
const inputText = document.getElementById("input-text");
const inputClear = document.getElementById("input-clear");
const showProgressBtn = document.getElementById("show-progress-btn");

// --------------------------------------------------
// PROCESSING LETTERS/WORDS
// --------------------------------------------------

// Scramble the letters
const scrambleLetters = () => {
	const splitBigWord = bigWord.split("");
	const scrambledWord = shuffleArray(splitBigWord);
	const specialLetterIndex = scrambledWord.findIndex((letter) => {
		return letter === specialLetter;
	});
	positionSpecialLetter(scrambledWord, specialLetterIndex);
	return scrambledWord;
};

// Make the special letter the 5th letter so it's in the middle
// This will modify the order of letters in the array
// assigned to the scrambledWord variable in the scrambleLetters function
const positionSpecialLetter = (arr, index) => {
	const i = arr[4];
	arr[4] = arr[index];
	arr[index] = i;
};

// --------------------------------------------------
// CREATING UI
// --------------------------------------------------

// Generate markup for the game letters
const generateLettersMarkup = (arr) => {
	arr.forEach((element, index) => {
		const letterCircle = document.querySelector(`#letter-${index + 1}`);
		letterCircle.textContent = `${element}`;
		letterCircle.addEventListener("click", () => {
			hideProgress();
			if (!letterCircle.classList.contains("selected")) {
				inputText.value += letterCircle.textContent.toUpperCase();
			}
			letterCircle.classList.add("selected");
		});
	});
};

// Generate markup for the game words which have to be found
const generateWordsMarkup = (arr) => {
	let wordsMarkup = "";
	arr.forEach((element) => {
		wordsMarkup += `<span class="word" id="word-${element.id}">${element.word}</span>`;
	});
	wordsArea.innerHTML = wordsMarkup;
};

// Turn the letters for the words to be found into underscores
// const obscureWords = () => {
//   const words = document.querySelectorAll(".word");
//   words.forEach((word, index, words) => {
//     const currentWordLength = word.innerHTML.length;
//     if (index === 0) {
//       word.insertAdjacentHTML("beforebegin", `<span class="separator">${currentWordLength} letters</span>` )
//     }
//     if (index > 0 && index < words.length - 1) {
//       const nextWordLength = words[index + 1].innerHTML.length;
//       if (nextWordLength > currentWordLength) {
//         word.insertAdjacentHTML("afterend", `<span class="separator">${nextWordLength} letters</span>`);
//       }
//     }
//     let obscured = "";
//     for (let i = 0; i < currentWordLength; i++) {
//       obscured += "?";
//     }
//     word.innerHTML = obscured;
//   })
// }

const obscureWords = () => {
	const words = document.querySelectorAll(".word");

	words.forEach((word, index, words) => {
		const currentWordLength = word.innerHTML.length;

		// check if there is a next word and get its length
		// or set to null in case we are at the last word
		// to allow below code to run without hitting an
		// undefined nextWordLength when we get to the last
		// word in the array

		let nextWordLength;

		try {
			nextWordLength = words[index + 1].innerHTML.length;
		} catch (err) {
			// set nextWordLength to null if the current word
			// is the last one in the array
			nextWordLength = null;
		}

		// ADD SEPARATORS
		if (index === 0) {
			word.insertAdjacentHTML("beforebegin", `<span class="separator">${currentWordLength} letters</span>`);
		}

		if (index > 0 && nextWordLength > currentWordLength) {
			word.insertAdjacentHTML("afterend", `<span class="separator">${nextWordLength} letters</span>`);
		}

		// OBSCURE WORDS WITH QUESTION MARKS
		let obscured = "";
		for (let i = 0; i < currentWordLength; i++) {
			obscured += "?";
		}
		word.innerHTML = obscured;
	});
};

// --------------------------------------------------
// EVENT HANDLERS & HELPERS
// --------------------------------------------------

// const handleLetterClick = (circle) => {
//   return true;
// }

const clearSelected = () => {
	const circles = document.querySelectorAll(".letter-circle");
	circles.forEach((circle) => {
		if (circle.classList.contains("selected")) {
			circle.classList.remove("selected");
		}
	});
};

const showProgress = () => {
	wordsArea.style.display = "flex";
	controlsArea.style.display = "none";
};

const hideProgress = () => {
	wordsArea.style.display = "none";
	controlsArea.style.display = "flex";
};

// --------------------------------------------------
// EVENT LISTENERS
// --------------------------------------------------

inputForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const userInput = document.getElementById("input-text").value.toLowerCase();

	const isValidWord = validateWord(userInput);

	if (isValidWord === undefined) {
		inputText.style.color = "red";
		setTimeout(() => {
			inputText.value = "";
			inputText.style.color = "black";
		}, 500);
	} else if (isValidWord.id >= 0) {
		const correctWord = document.getElementById(`word-${isValidWord.id}`);
		correctWord.innerHTML = isValidWord.word.toUpperCase();
		inputText.style.color = "limegreen";

		const scoreCounter = document.getElementById("score");
		let score = parseInt(scoreCounter.textContent);
		score++;
		const newScore = score;
		scoreCounter.textContent = newScore;

		setTimeout(() => {
			inputText.value = "";
			inputText.style.color = "black";
		}, 500);
	}
	clearSelected();
});

const validateWord = (input) => {
	return processedGameWords.find((element) => {
		return element.word === input;
	});
};

inputClear.addEventListener("click", () => {
	clearSelected();
	inputText.value = "";
});

showProgressBtn.addEventListener("click", showProgress);

// const addLetterClickEvents = () => {
//   const letterCircles = Array.from(document.getElementsByClassName("letter-circle"));
//   letterCircles.forEach((element) => {
//     element.addEventListener("click", handleLetterClick(element))
//   })
// }

// --------------------------------------------------
// START A NEW GAME
// --------------------------------------------------

// Start a new game and call appropriate functions
const newGame = () => {
	const lettersArr = scrambleLetters();
	generateLettersMarkup(lettersArr);
	// highlightSpecialLetter();
	generateWordsMarkup(processedGameWords);
	obscureWords();
	// addLetterClickEvents();
};

// Call newGame to start new game on page load
newGame();
