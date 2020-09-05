const { Pool } = require('pg');

const connectionString = `postgres://postgres:password@ec2-3-23-126-178.us-east-2.compute.amazonaws.com:5432/zagattips`

const client = new Pool({ connectionString });

client.connect();

module.exports = client;