var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "event_management"
});


connection.connect();

module.exports = connection;