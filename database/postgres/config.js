const { Pool } = require('pg');

const connectionString = `postgres://postgres:@localhost/zagattips`

const client = new Pool({ connectionString });

client.connect();

module.exports = client;