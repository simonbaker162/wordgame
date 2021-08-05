const Level = require("../models/levelModel");

// const cauterise = new Level({
// 	bigWord: levelData.bigWord,
// 	specialLetter: levelData.specialLetter,
// 	processedGameWords: levelData.processedGameWords
// });

// cauterise
// 	.save()
// 	.then(() => {
// 		console.log("Level data save successful");
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 	});

const createNewLevel = (req, res) => {
	const level = new Level({
		bigWord: req,
		specialLetter: req,
		processedGameWords: req
	});

	level
		.save()
		.then(() => {
			console.log("Level data save successful");
		})
		.catch((err) => {
			console.error(err);
		});
};
