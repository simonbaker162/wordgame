module.exports = async (Level) => {
	let newId;

	await Level.find({}, "levelId", (err, levels) => {
		if (err) {
			console.error(err);
		} else {
			const levelIds = levels.map((level) => {
				return level.levelId;
			});
			const highestId = Math.max(...levelIds);
			newId = highestId + 1;
		}
	});

	return newId;
};
