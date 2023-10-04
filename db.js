const mysql = require('mysql2')
require('dotenv').config

const { database_HOSTNAME, database_USERNAME, database_PASSWORD, database_DB } = process.env;
const databaseConnection = mysql.createPool({
    host     : database_HOSTNAME, // MYSQL HOST NAME
    user     : database_USERNAME, // MYSQL USERNAME
    password : database_PASSWORD, // MYSQL PASSWORD
    database : database_DB // MYSQL DB NAME
}).promise();

module.exports = databaseConnection;