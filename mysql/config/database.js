const mysql = require('mysql2');
require('dotenv').config()
// const HOST = 'remotemysql.com';
// const USER = 'jqoM6B1zHK';
// const PASSWORD = '7WOVxrnpOH';
// const DBNAME = 'jqoM6B1zHK';

const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DBNAME = process.env.DB_NAME;



// const con = mysql.createConnection({
//   host: HOST,
//   user: USER,
//   password: PASSWORD,
//   database: DBNAME,
//   multipleStatements: true
// });

// con.connect(function(err) {
//   if (err) {
//     console.log('ERROR: '+err);
//     console.log('FATAL: '+err.fatal);
//   }
// });

var con = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DBNAME,
  multipleStatements: true
})

module.exports = con;