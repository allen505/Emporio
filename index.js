const express = require("express");
const mysql = require("mysql");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
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
	let requestData = req.body;

	pool.getConnection((err, connection) => {
		if (err) {
			console.log("Error in getting connection");
		} else {
			connection.query(
				"SELECT Lid,Password FROM login",
				(error, result, fields) => {					
					connection.release();
					let i = 0;
					let valid = false;
					for (i = 0; i < result.length; i++) {
						if (result[i].Lid == requestData.username) {
							valid = true;
							break;
						}
					}
					if (valid == true) {
						bcrypt
							.compare(requestData.password, result[i].Password)
							.then(passRes => {
								valid = passRes;
								res.json(valid);
							});
					}
					else{
						res.json(valid);
					}
				}
			);
		}
	});
});

app.get("/", (req, res) => res.send("Welcome to the Home Page"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

let hashed = "";

const testHash = () => {
	let myPlaintextPassword = "admin";
	let saltRounds = 5;

	bcrypt.hash(myPlaintextPassword, saltRounds).then(hash => {
		// Store hash in your password DB.
		console.log(myPlaintextPassword);
		console.log(hash);
		hashed = hash;
		bcrypt.hash(myPlaintextPassword, saltRounds).then(hash2 => {
			console.log(myPlaintextPassword);
			console.log(hash2);
			bcrypt.compare(myPlaintextPassword, hash).then(res => {
				console.log(res);
				bcrypt.compare(myPlaintextPassword, hash2).then(secres => {
					console.log(secres);
				});
			});
		});
	});
};

// testHash();

pool.getConnection((err, connection) => {
	if (err) throw err;
	connection.query(
		"SELECT Lid,Password,Type FROM login",
		(error, results, fields) => {
			// console.log(results[0].Lid);
			connection.release();
			if (error) throw error;
		}
	);

	connection.query("");
});
