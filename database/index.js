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
      console.log(err)
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
          } else {
            // Add each feature with appropriate restaurant id
            columns = Object.keys(features[0]).join(', ');
            features.forEach((feature, i) => {
              values = JSON.stringify(Object.values(feature));
              values = values.substring(1, values.length - 1);
              connection.query(`INSERT INTO features (restaurant_id, ${columns}) VALUES (${restaurantId}, ${values})`, (err) => {
                if (err) {
                  cb(err);
                } else {
                  cb(null, restaurantId);
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
  })
}

module.exports = {
  getRestaurantInfo,
  getRestaurantArticles,
  getRestaurantFeatures,
  addRestaurant,
  removeRestaurant
};
