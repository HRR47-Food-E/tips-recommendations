const fs = require('fs');
const faker = require('faker');

const writeStream = fs.createWriteStream('./database/data.csv');

// Generates data for 10 million primary records
const writeData = (writer, cb) => {
  console.time('writeData');
  var i = 10000000;
  var id = 0;
  var data;
  write();
  function write() {
    var ok = true;
    do {
      --i;
      ++id;
      data = JSON.stringify(generateData(id));
      if (i === 0) {
        writeStream.write(data, cb);
      } else {
        ok = writeStream.write(data);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writeStream.once('drain', write);
    }
  }
};

// Creates a random number between min and max
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generates an object with restaurant data
const generateRestaurantData = () => {
  var restaurantData = {};
  restaurantData.restaurant_name = faker.company.companyName();
  restaurantData.dish_name1 = faker.commerce.product();
  restaurantData.dish_name2 = faker.commerce.product();
  restaurantData.dish_name3 = faker.commerce.product();
  restaurantData.dish_image1 = randInt(1, 750);
  restaurantData.dish_image2 = randInt(1, 750);
  restaurantData.dish_image3 = randInt(1, 750);
  restaurantData.tip = faker.lorem.sentence();
  return restaurantData;
};

// Generates an object with article data
const generateArticleData = (id) => {
  var articleData = {};
  articleData.restaurant_id = id;
  articleData.title = faker.lorem.sentence();
  articleData.image = randInt(1, 750);
  return articleData;
};

// Generates an object with feature data
const generateFeatureData = (id) => {
  var featureData = {};
  featureData.restaurant_id = id;
  featureData.title = faker.commerce.productAdjective();
  return featureData;
};

// Generates a data object which contains one primary record and all of the seccond records that are associated with it
const generateData = (id) => {
  var data = { id };
  const articleNumber = randInt(1, 5);
  const featureNumber = randInt(1, 5);
  var articles = [];
  var features = [];
  data.restaurant = generateRestaurantData()
  for (var i = 0; i < articleNumber; ++i) {
    articles.push(generateArticleData(id));
  }
  data.articles = articles;
  for (var j = 0; j < featureNumber; ++j) {
    features.push(generateFeatureData(id));
  }
  data.features = features;
  return data;
};

// Calls writeData
writeData(writeStream, (err, data) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.timeEnd('writeData');
    console.log(`Done generating data!`);
  }
});