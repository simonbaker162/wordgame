import { processWordsArray } from "./processData.js";

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

export const bigWord = "cauterise";
export const specialLetter = "u";
export const processedGameWords = processWordsArray(wordList);
