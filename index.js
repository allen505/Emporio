const express = require("express");
const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/getData", (req, res) => {
	let dataToSend = "This data is sent from Express.js to React.js";
	res.json(dataToSend);
});

app.get("/", (req, res) => res.send("Welcome to the Home Page"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
