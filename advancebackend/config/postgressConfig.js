const { Client } = require('pg');

const client = new Client({
	host: 'localhost',
	port: 5433,
	user: 'postgres',
	password: 'postgres',
	database: 'postgres',
});

client.connect();

module.exports = client;
