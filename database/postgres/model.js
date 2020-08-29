const client = require('./config.js');

const getRestaurantInfo = function (restaurantId, callback) {
  client.query(`SELECT * FROM restaurants WHERE id = ${restaurantId}`, (error, {rows}) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, rows);
  });
};

const getRestaurantArticles = function (restaurantId, callback) {
  client.query(`SELECT * FROM articles WHERE restaurant_id = ${restaurantId}`, (error, {rows}) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, rows);
  });
};

const getRestaurantFeatures = function (restaurantId, callback) {
  client.query(`SELECT * FROM features WHERE restaurant_id = ${restaurantId}`, (error, {rows}) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, rows);
  });
};

module.exports = {
  getRestaurantInfo,
  getRestaurantArticles,
  getRestaurantFeatures
};