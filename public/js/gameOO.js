// Import data and functions
import {
	processedGameWords, // list of words to be found
	bigWord, // the 9-letter word from which the other words are derived
	specialLetter // the letter all the words to be found must contain
} from "./levelData.js";

import { scrambleLetters } from "./scrambleLetters.js";

class Game {
	constructor() {
		this.controlsArea = document.getElementById("controls-area");
		this.wordsArea = document.getElementById("words-area");
		this.inputForm = document.getElementById("input-form");
		this.inputText = document.getElementById("input-text");
		this.inputClear = document.getElementById("input-clear");
		this.showProgressBtn = document.getElementById("show-progress-btn");

		this.bigWord = bigWord;
		this.specialLetter = specialLetter;
		this.processedGameWords = processedGameWords;

		this.lettersArr = scrambleLetters(bigWord);
		this.startNewGame();
	}

	startNewGame() {
		this.generateLettersMarkup(this.lettersArr);
		this.initLettersEventListeners();
		this.generateWordsMarkup(this.processedGameWords);
		this.obscureWords();
		this.initInputFormSubmitEventListener();
		this.initInputFormClearEventListener();
		this.initShowProgressBtnEventListener();
	}

	generateLettersMarkup(lettersArr) {
		lettersArr.forEach((letter, index) => {
			const letterCircle = document.querySelector(`#letter-${index + 1}`);
			letterCircle.textContent = `${letter}`;
		});
	}

	generateWordsMarkup(processedGameWords) {
		let wordsMarkup = "";
		processedGameWords.forEach((word) => {
			wordsMarkup += `<span class="word" id="word-${word.id}">${word.word}</span>`;
		});
		this.wordsArea.innerHTML = wordsMarkup;
	}

	obscureWords() {
		const words = document.querySelectorAll(".word");
		words.forEach((word, index, words) => {
			const currentWordLength = word.innerHTML.length;
			let nextWordLength;
			try {
				nextWordLength = words[index + 1].innerHTML.length;
			} catch (err) {
				nextWordLength = null;
			}

			if (index === 0) {
				word.insertAdjacentHTML("beforebegin", `<span class="separator">${currentWordLength} letters</span>`);
			}

			if (index > 0 && nextWordLength > currentWordLength) {
				word.insertAdjacentHTML("afterend", `<span class="separator">${nextWordLength} letters</span>`);
			}

			let obscured = "";
			for (let i = 0; i < currentWordLength; i++) {
				obscured += "?";
			}
			word.innerHTML = obscured;
		});
	}

	// --------------------------------------------------
	// EVENT HANDLERS AND HELPERS
	// --------------------------------------------------

	handleLetterCircleClick(event) {
		this.hideProgress();
		if (!event.target.classList.contains("selected")) {
			this.inputText.value += event.target.textContent.toUpperCase();
			event.target.classList.add("selected");
		}
	}

	handleFormSubmit(event) {
		event.preventDefault();
		const userInput = document.getElementById("input-text").value.trim().toLowerCase();
		const isValidWord = this.validateWord(userInput);

		if (isValidWord === undefined) {
			this.inputText.style.color = "red";
			setTimeout(() => {
				this.inputText.value = "";
				this.inputText.style.color = "black";
			}, 500);
		} else if (isValidWord) {
			const correctWord = document.getElementById(`word-${isValidWord.id}`);
			correctWord.innerHTML = isValidWord.word.toUpperCase();
			this.inputText.style.color = "limegreen";

			const scoreCounter = document.getElementById("score");
			let score = parseInt(scoreCounter.textContent);
			score++;
			const newScore = score;
			scoreCounter.textContent = newScore;

			setTimeout(() => {
				this.inputText.value = "";
				this.inputText.style.color = "black";
			}, 500);
		}

		this.clearSelected();
	}

	handleFormClear() {
		this.clearSelected();
		this.inputText.value = "";
	}

	clearSelected() {
		const letterCircles = document.querySelectorAll(".letter-circle");
		letterCircles.forEach((letterCircle) => {
			if (letterCircle.classList.contains("selected")) {
				letterCircle.classList.remove("selected");
			}
		});
	}

	showProgress() {
		this.wordsArea.style.display = "flex";
		this.controlsArea.style.display = "none";
	}

	hideProgress() {
		this.wordsArea.style.display = "none";
		this.controlsArea.style.display = "flex";
	}

	validateWord(input) {
		return this.processedGameWords.find((obj) => {
			return obj.word === input;
		});
	}

	// --------------------------------------------------
	// INIT EVENT LISTENERS
	// --------------------------------------------------

	initLettersEventListeners() {
		const letterCircles = document.querySelectorAll(".letter-circle");
		letterCircles.forEach((letterCircle) => {
			letterCircle.addEventListener("click", (event) => {
				this.handleLetterCircleClick(event);
			});
		});
	}

	initInputFormSubmitEventListener() {
		this.inputForm.addEventListener("submit", (event) => {
			this.handleFormSubmit(event);
		});
	}

	initInputFormClearEventListener() {
		this.inputClear.addEventListener("click", () => {
			this.handleFormClear();
		});
	}

	initShowProgressBtnEventListener() {
		this.showProgressBtn.addEventListener("click", () => {
			this.showProgress();
		});
	}
}

new Game();
