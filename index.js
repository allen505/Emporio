const express = require("express");
const app = express();
const path = require("path")
const port = 5000;

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/getData", (req, res) => {
	let dataToSend = "This data is sent from Express.js to React.js";
	res.json(dataToSend);
});

app.get("/", (req, res) => res.send("Welcome to the Home Page"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : '',
  password        : 'abbastra51',
  database        : 'aa-dbms'
});

pool.getConnection(function(err, connection) {
  if (err) throw err; 

  connection.query('SELECT * FROM products', function (error, results, fields) {

    console.log(results)
    connection.release();

    if (error) throw error;

  });
});