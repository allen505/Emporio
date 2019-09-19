const express = require("express");
const mysql = require("mysql");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const port = 5000;
var jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/getData", (req, res) => {
	let dataToSend = "This data is sent from Express.js to React.js";
	res.json(dataToSend);
});

let pool = mysql.createPool({
	connectionLimit: 10,
	host: "localhost",
	user: "",
	password: "",
	database: "aa-dbms"
	// allen : hello
});

app.post("/api/login", jsonParser, (req, res) => {
	let dets = req.body;
	pool.getConnection((err, connection) => {
		if (err) {
			console.log("Error in getting connection");
		} else {
			connection.query(
				"SELECT Lid,Password FROM login",
				(error, result, fields) => {
					let i = 0;
					let valid = false;

					for (i = 0; i < result.length; i++) {
						if (result[i].Lid == req.body.username) {
							valid = true;
							break;
						}
					}
					if (valid == true) {
						if (result[i].Password != req.body.password) {
							valid = false;
						}
					}
					res.json(valid);
					connection.release();
				}
			);
		}
	});
});

app.get("/", (req, res) => res.send("Welcome to the Home Page"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

pool.getConnection((err, connection) => {
	if (err) throw err;

	connection.query(
		"SELECT Lid,Password FROM login",
		(error, results, fields) => {
			// console.log(results)
			connection.release();
			if (error) throw error;
		}
	);

	connection.query("");
});
