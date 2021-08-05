const express = require("express");
const mongoose = require("mongoose");

const Level = require("./models/levelModel");
const levelData = require("./levels/levelData");

const getNewLevelId = require("./utils/getNewLevelId");

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
	.catch((err) => {
		console.error(mongoose.Error);
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
