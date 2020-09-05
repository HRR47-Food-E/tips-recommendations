const client = require('./config.js');

const addRestaurants = `COPY restaurants(restaurant_name,dish_name1,dish_name2,dish_name3,dish_image1,dish_image2,dish_image3,tip) FROM '${__dirname + '/restaurant-data.csv'}' DELIMITER ',' CSV HEADER;`;

const addArticles = `COPY articles(restaurant_id,title,image) FROM '${__dirname + '/article-data.csv'}' DELIMITER ',' CSV HEADER;`;

const addFeatures = `COPY features(restaurant_id,title) FROM '${__dirname + '/feature-data.csv'}' DELIMITER ',' CSV HEADER;`;

const articleIdx = 'CREATE INDEX article_idx ON articles (restaurant_id);';

const featureIdx = 'CREATE INDEX feature_idx ON features (restaurant_id);';

const seedDatabase = () => {
  console.log('Seeding database...')
  console.time('seed');
  client.query(addRestaurants)
    .then(({ rowCount }) => {
      console.log(`${rowCount} restaurants added!`);
      client.query(addArticles)
        .then(({ rowCount }) => {
          console.log(`${rowCount} articles added!`);
          client.query(addFeatures)
            .then(({ rowCount }) => {
              console.log(`${rowCount} features added!`);
              client.query(articleIdx)
              .then(() => {
                console.log('Article indexes added!');
                client.query(featureIdx)
                .then(() => {
                  console.log('Feature indexes added!');
                  client.end();
                  console.timeEnd('seed');
                });
              });
            });
        });
    })
    .catch(err => console.log(err));
};

seedDatabase();
