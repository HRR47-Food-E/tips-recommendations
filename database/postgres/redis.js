const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => console.log(`Redis connected!`));
client.on('error', (err) => console.log(`Redis connection error: ${err}`));

const redisGet = (query, cb) => {
  client.get(query, (err, reply) => {
    err ? cb(err) : cb(null, reply);
  });
}

const redisSet = (query, data, cb) => {
  client.set(query, JSON.stringify(data), (err, data) => {
    err ? cb(err) : cb(null, data);
  });
}

module.exports = {
  redisGet,
  redisSet
}