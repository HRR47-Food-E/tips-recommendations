const mysql = require('mysql');
const config = require('./config.js');

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL database');
  } else {
    console.log('MySQL database connected');
  }
});

const getRestaurantInfo = function (restaurantId, callback) {
  connection.query(`SELECT * FROM restaurants WHERE id = ${restaurantId}`, (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, results);
  });
};

const getRestaurantArticles = function (restaurantId, callback) {
  connection.query(`SELECT * FROM articles WHERE restaurant_id = ${restaurantId}`, (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, results);
  });
};

const getRestaurantFeatures = function (restaurantId, callback) {
  connection.query(`SELECT * FROM features WHERE restaurant_id = ${restaurantId}`, (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, results);
  });
};

module.exports = {
  getRestaurantInfo,
  getRestaurantArticles,
  getRestaurantFeatures,
};
