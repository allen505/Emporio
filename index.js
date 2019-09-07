const express = require("express");
const mysql = require("mysql");
const path = require("path");
const app = express();

const port = 5000;

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/getData", (req, res) => {
	let dataToSend = "This data is sent from Express.js to React.js";
	res.json(dataToSend);
});

app.get("/", (req, res) => res.send("Welcome to the Home Page"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

var pool = mysql.createPool({
	connectionLimit: 10,
	host: "localhost",
	user: "",
	password: "",
	database: "aa-dbms"
	// allen : hello
});

pool.getConnection((err, connection) => {
	if (err) throw err;

	connection.query("SELECT * FROM products", (error, results, fields) => {
		console.log(results);
		connection.release();

		if (error) throw error;
	});
});
