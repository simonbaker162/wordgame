const mongoose = require("mongoose");

const getLevelId = require("../utils/getLevelId");

const levelSchema = new mongoose.Schema({
	bigWord: String,
	specialLetter: String,
	processedGameWords: [{ word: String, length: Number, id: Number }],
	levelId: Number
});

// levelSchema.pre("save", async (next) => {
// 	// this.levelId = await getLevelId();
// 	console.log("pre-saving", this);
// 	next();
// });

// had to use normal function due to arrow function using lexical this
levelSchema.pre("save", async function (next) {
	this.levelId = await getLevelId();
	next();
});

const Level = mongoose.model("Level", levelSchema);

module.exports = Level;
