const client = require('./config.js');

const getRestaurantInfo = function (restaurantId, callback) {
  console.time(`Restaurant id ${restaurantId}`);
  client.query(`SELECT * FROM restaurants WHERE id = ${restaurantId}`, (error, {rows}) => {
    if (error) {
      callback(error, null);
      return;
    }
    console.timeEnd(`Restaurant id ${restaurantId}`);
    callback(null, rows);
  });
};

const getRestaurantArticles = function (restaurantId, callback) {
  console.time(`Restaurant id ${restaurantId}`);
  client.query(`SELECT * FROM articles WHERE restaurant_id = ${restaurantId}`, (error, {rows}) => {
    if (error) {
      callback(error, null);
      return;
    }
    console.timeEnd(`Restaurant id ${restaurantId}`);
    callback(null, rows);
  });
};

const getRestaurantFeatures = function (restaurantId, callback) {
  console.time(`Restaurant id ${restaurantId}`);
  client.query(`SELECT * FROM features WHERE restaurant_id = ${restaurantId}`, (error, {rows}) => {
    if (error) {
      callback(error, null);
      return;
    }
    console.timeEnd(`Restaurant id ${restaurantId}`);
    callback(null, rows);
  });
};

const addRestaurant = ({restaurant, articles, features}, cb) => {
  // Add restaurant
  var columns = Object.keys(restaurant).join(', ');
  var values = JSON.stringify(Object.values(restaurant));
  values = values.substring(1, values.length - 1).replace(/"/g,"'");
  console.time('Added record to db');
  client.query(`INSERT INTO restaurants (${columns}) VALUES (${values}) RETURNING id;`, (err, response) => {
    if (err) {
      cb(err);
      return;
    } else {
      const restaurantId = response.rows[0].id;
      // Add each article with appropriate restaurant id
      columns = Object.keys(articles[0]).join(', ');
      articles.forEach((article, i) => {
        values = JSON.stringify(Object.values(article));
        values = values.substring(1, values.length - 1).replace(/"/g,"'");
        client.query(`INSERT INTO articles (restaurant_id, ${columns}) VALUES (${restaurantId}, ${values})`, (err) => {
          if (err) {
            cb(err);
            return;
          } else if (i === articles.length - 1) {
            // Add each feature with appropriate restaurant id
            columns = Object.keys(features[0]).join(', ');
            features.forEach((feature, i) => {
              values = JSON.stringify(Object.values(feature));
              values = values.substring(1, values.length - 1).replace(/"/g,"'");
              client.query(`INSERT INTO features (restaurant_id, ${columns}) VALUES (${restaurantId}, ${values})`, (err) => {
                if (err) {
                  cb(err);
                  return;
                } else if (i === features.length - 1) {
                  console.timeEnd('Added record to db');
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

const removeRestaurant = (restaurantId, cb) => {
  console.time(`${restaurantId} removed from db!`)
  client.query(`DELETE FROM restaurants WHERE id = ${restaurantId}`, (err, data) => {
    if (err) {
      cb(err);
    } else {
      console.timeEnd(`${restaurantId} removed from db!`)
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
  updateRestaurant = updateRestaurant.slice(0, -1).replace(/"/g,"'");
  console.time(`${id} updated!`)
  client.query(`UPDATE restaurants SET ${updateRestaurant} WHERE id = ${id};`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.timeEnd(`${id} updated!`)
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