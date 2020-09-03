const client = require('./config.js');

const getRestaurantInfo = function (restaurantId, cb) {
  client.query(`SELECT * FROM restaurants WHERE id = ${restaurantId}`, (err, {rows}) => {
    err ? cb(err) : cb(null, rows);
  });
};

const getRestaurantArticles = function (restaurantId, cb) {
  client.query(`SELECT * FROM articles WHERE restaurant_id = ${restaurantId}`, (err, {rows}) => {
    err ? cb(err) : cb(null, rows);
  });
};

const getRestaurantFeatures = function (restaurantId, cb) {
  client.query(`SELECT * FROM features WHERE restaurant_id = ${restaurantId}`, (err, {rows}) => {
    err ? cb(err) : cb(null, rows);
  });
};

const addRestaurant = ({restaurant, articles, features}, cb) => {
  // Add restaurant
  var columns = Object.keys(restaurant).join(', ');
  var values = JSON.stringify(Object.values(restaurant));
  // Replace double quotes with single quotes
  values = values.substring(1, values.length - 1).replace(/"/g,"'");
  client.query(`INSERT INTO restaurants (${columns}) VALUES (${values}) RETURNING id;`, (err, response) => {
    if (err) {
      return cb(err);
    } else {
      const restaurantId = response.rows[0].id;
      // Add each article with appropriate restaurant id
      columns = Object.keys(articles[0]).join(', ');
      articles.forEach((article, i) => {
        values = JSON.stringify(Object.values(article));
        // Replace double quotes with single quotes
        values = values.substring(1, values.length - 1).replace(/"/g,"'");
        client.query(`INSERT INTO articles (restaurant_id, ${columns}) VALUES (${restaurantId}, ${values})`, (err) => {
          if (err) {
            return cb(err);
          } else if (i === articles.length - 1) {
            // Add each feature with appropriate restaurant id
            columns = Object.keys(features[0]).join(', ');
            features.forEach((feature, i) => {
              values = JSON.stringify(Object.values(feature));
              // Replace double quotes with single quotes
              values = values.substring(1, values.length - 1).replace(/"/g,"'");
              client.query(`INSERT INTO features (restaurant_id, ${columns}) VALUES (${restaurantId}, ${values})`, (err) => {
                if (err) {
                  return cb(err);
                } else if (i === features.length - 1) {
                  cb();
                }
              });
            });
          }
        });
      });
    }
  });
};

const removeRestaurant = (restaurantId, cb) => {
  client.query(`DELETE FROM restaurants WHERE id = ${restaurantId}`, (err, data) => {
    err ? cb(err) : cb(null, data);
  });
};

const updateRestaurant = ({restaurant, articles, features}, id, cb) => {
  var columns = Object.keys(restaurant);
  var updateRestaurant = '';
  columns.forEach((column) => {
    updateRestaurant += `${column} = "${restaurant[column]}",`;
  });
  // Replace double quotes with single quotes
  updateRestaurant = updateRestaurant.slice(0, -1).replace(/"/g,"'");
  client.query(`UPDATE restaurants SET ${updateRestaurant} WHERE id = ${id};`, (err) => {
    err ? cb(err) : cb();
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