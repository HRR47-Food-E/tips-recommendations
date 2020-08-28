const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'zagatTips',
    password: '',
    port: 3003,
});

client.connect();

module.exports = client;