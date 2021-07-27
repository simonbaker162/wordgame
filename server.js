const express = require("express");

const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public/"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/pages/index.html");
});

app.get("/game", (req, res) => {
	res.sendFile(__dirname + "/public/pages/game.html");
});

app.listen(port, () => {
	console.log("Server started on localhost port 3000");
});
