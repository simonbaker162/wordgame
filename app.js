const express = require("express");
const mongoose = require("mongoose");

const Level = require("./models/levelModel");
const levelData = require("./levels/levelData");

const app = express();
const port = 3000;

// MIDDLEWARE

app.use(express.static(__dirname + "/public/"));

// DATABASE CONNECTION

mongoose
	.connect("mongodb+srv://admin:cauterise123@ringwords.zvtd2.mongodb.net/RingWords?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Database connection successful");
	})
	.catch((error) => {
		console.error(error);
	});

const cauterise = new Level({
	bigWord: levelData.bigWord,
	specialLetter: levelData.specialLetter,
	processedGameWords: levelData.processedGameWords
});

cauterise
	.save()
	.then(() => {
		console.log("Level data save successful");
	})
	.catch((error) => {
		console.log(error);
	});

// ROUTES

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/pages/index.html");
});

app.get("/game", (req, res) => {
	res.sendFile(__dirname + "/public/pages/game.html");
});

// START SERVER

app.listen(port, () => {
	console.log("Server started on localhost port 3000");
});
