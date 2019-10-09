const express = require("express");
const mysql = require("mysql");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();

const port = 5000;
var jsonParser = bodyParser.json();

var saltRounds = 5;

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/getData", (req, res) => {
	let dataToSend = "This data is sent from Express.js to React.js";
	res.json(dataToSend);
});

let pool = mysql.createPool({
	connectionLimit: 10,
	host: "localhost",
	user: "Abbas",
	password: "admin",
	database: "aa-dbms",
	multipleStatements: true
	// allen : hello
	// Abbas: admin
});

app.post("/api/login", jsonParser, (req, res) => {
	let requestData = req.body;

	pool.getConnection((err, connection) => {
		if (err) {
			console.log("Error in getting connection");
		} else {
			connection.query("SELECT * FROM login", (error, result, fields) => {
				connection.release();
				let i = 0;
				let valid = false;
				for (i = 0; i < result.length; i++) {
					if (result[i].Lid == requestData.userid) {
						valid = true;
						break;
					}
				}
				if (valid == true) {
					bcrypt
						.compare(requestData.password, result[i].Password)
						.then(passRes => {
							valid = passRes;
							let responseObj = {
								valid: valid,
								type: result[i].Type
							};
							res.json(responseObj);
						});
				} else {
					res.json(valid);
				}
			});
		}
	});
});

app.post("/api/register", jsonParser, (req, res) => {
	let requestData = req.body;
	var addToLogin = `insert into login values(?,?,?)`;

	pool.getConnection((err, connection) => {
		if (err) {
			console.log("Error in getting connection");
		} else {
			bcrypt.hash(requestData.password, saltRounds).then(hash => {
				let loginValues = [requestData.userid, hash, requestData.accType];
				connection.query(
					addToLogin,
					loginValues,
					(error, result, fields) => {
						console.log(error);
						console.log(result);
					}
				);

				if (requestData.accType == "buyer") {
					let addToBuyer = `insert into buyer values(?,?,?)`;
					let buyerValues = [
						requestData.userid,
						requestData.name,
						requestData.city + ", " + requestData.state
					];
					connection.query(
						addToBuyer,
						buyerValues,
						(error, result, fields) => {
							if (error === null) res.json(true);
							else res.json(false);
						}
					);
				} else if (requestData.accType == "seller") {
					let addToSeller = `insert into seller values(?,?,?)`;
					let sellerValues = [
						requestData.userid,
						requestData.name,
						requestData.phone
					];
					connection.query(
						addToSeller,
						sellerValues,
						(error, result, fields) => {
							if (error === null) res.json(true);
							else res.json(false);
						}
					);
				}
			});
		}
		connection.release();
	});
});

app.get("/api/card", jsonParser, (req, res) => {
	pool.getConnection((error, connection) => {
		if (error) throw err;
		else {
			connection.query("select * from products", (error, result, fields) => {
				res.send(result);
			});
		}
		connection.release();
	});
});

app.get("/api/admin", (req, res) => {
	pool.getConnection((error, connection) => {
		if (error) throw error;
		else {
			connection.query(
				"select * from buyer; select * from seller",
				(error, result, fields) => {
					res.send(result);
				}
			);
		}
		connection.release();
	});
});

app.get("/", (req, res) => res.send("Welcome to the Home Page"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

let hashed = "";

// The following function testHash is only for demo purposes
// and is not used in the functional part of the project
const testHash = () => {
	let myPlaintextPassword = "admin";

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
	connection.query("SELECT * FROM login", (error, results, fields) => {
		// console.log(results[0].Lid);
		connection.release();
		if (error) throw error;
	});
});
