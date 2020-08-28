const client = require('./config.js');
const fs = require('fs');

// fs.readFile(__dirname + '/../data.csv', 'utf8', (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     data = JSON.parse(data);
//     console.log(data);
//   }
// })

const addRestaurants = `COPY restaurants(restaurant_name,dish_name1,dish_name2,dish_name3,dish_image1,dish_image2,dish_image3,tip) FROM '${__dirname + '/../restaurant-data.csv'}' DELIMITER ',' CSV HEADER;`;

const addArticles = `COPY articles(restaurant_id,title,image) FROM '${__dirname + '/../article-data.csv'}' DELIMITER ',' CSV HEADER;`;

const addFeatures = `COPY features(restaurant_id,title) FROM '${__dirname + '/../feature-data.csv'}' DELIMITER ',' CSV HEADER;`;

client.query(addRestaurants)
  .then(() => {
    console.log('Restaurant added!');
    client.query(addArticles)
      .then(() => {
        console.log('Articles added!');
        client.query(addFeatures)
          .then(() => {
            console.log('Features added!');
            client.end();
          });
      });
  })
  .catch(err => console.log(err));