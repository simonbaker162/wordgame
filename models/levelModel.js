const mongoose = require("mongoose");

const getNewLevelId = require("../utils/getNewLevelId");

const levelSchema = new mongoose.Schema({
	bigWord: String,
	specialLetter: String,
	processedGameWords: [{ word: String, length: Number, id: Number }],
	levelId: Number
});

// had to use normal function due to arrow function using lexical this
levelSchema.pre("save", async function (next) {
	this.levelId = await getNewLevelId(Level);
	next();
});

const Level = mongoose.model("Level", levelSchema);

module.exports = Level;
