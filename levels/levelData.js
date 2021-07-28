// import { processWordsArray } from "./processData.js";

const wordList = [
	"cues",
	"cure",
	"curs",
	"curt",
	"cute",
	"cuts",
	"rues",
	"ruse",
	"rust",
	"ruts",
	"suet",
	"suit",
	"sure",
	"true",
	"user",
	"acute",
	"cause",
	"crust",
	"cures",
	"curse",
	"cuter",
	"reuse",
	"sauce",
	"saute",
	"suite",
	"truce",
	"citrus",
	"cruise",
	"curate",
	"rescue",
	"rustic",
	"saucer",
	"secure",
	"truces",
	"austere",
	"curates",
	"saucier",
	"secateur",
	"cauterise"
];

const processWordsArray = (wordList) => {
	return wordList.map((word, index) => {
		return {
			word: word,
			length: word.length,
			id: index + 1
		};
	});
};

exports.bigWord = "cauterise";
exports.specialLetter = "u";
exports.processedGameWords = processWordsArray(wordList);
