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

const addRestaurant = ({restaurant, articles, features}, cb) => {
  // Add restaurant
  var columns = Object.keys(restaurant).join(', ');
  var values = JSON.stringify(Object.values(restaurant));
  values = values.substring(1, values.length - 1);
  connection.query(`INSERT INTO restaurants (${columns}) VALUES (${values});`, (err, response) => {
    if (err) {
      cb(err);
    } else {
      const restaurantId = response.insertId;
      // Add each article with appropriate restaurant id
      columns = Object.keys(articles[0]).join(', ');
      articles.forEach((article, i) => {
        values = JSON.stringify(Object.values(article));
        values = values.substring(1, values.length - 1);
        connection.query(`INSERT INTO articles (restaurant_id, ${columns}) VALUES (${restaurantId}, ${values})`, (err) => {
          if (err) {
            cb(err);
          } else if (i === articles.length - 1) {
            // Add each feature with appropriate restaurant id
            columns = Object.keys(features[0]).join(', ');
            features.forEach((feature, i) => {
              values = JSON.stringify(Object.values(feature));
              values = values.substring(1, values.length - 1);
              connection.query(`INSERT INTO features (restaurant_id, ${columns}) VALUES (${restaurantId}, ${values})`, (err) => {
                if (err) {
                  cb(err);
                } else if (i === features.length - 1) {
                  cb(null);
                }
              });
            });
          }
        });
      });
    }
  });
};

const removeRestaurant = (id, cb) => {
  connection.query(`DELETE FROM restaurants WHERE id = ${id}`, (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, data);
    }
  });
};

const updateRestaurant = ({restaurant, articles, features}, id, cb) => {
  var columns = Object.keys(restaurant);
  var updateRestaurant = '';
  columns.forEach((column) => {
    updateRestaurant += `${column} = "${restaurant[column]}",`;
  });
  updateRestaurant = updateRestaurant.slice(0, -1);
  connection.query(`UPDATE restaurants SET ${updateRestaurant} WHERE id = ${id};`, (err) => {
    if (err) {
      console.log(err);
    } else {
      cb(null);
    }
  });
};

module.exports = {
  getRestaurantInfo,
  getRestaurantArticles,
  getRestaurantFeatures,
  addRestaurant,
  removeRestaurant,
  updateRestaurant
};
