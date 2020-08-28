const { Client } = require('pg');

const connectionString = `postgres://postgres:@localhost/zagattips`

const client = new Client({ connectionString });

client.connect();

module.exports = client;