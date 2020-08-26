const faker = require('faker');
const mysql = require('mysql');
const config = require('./config.js');

const connection = mysql.createConnection(config);

connection.connect();

// RESTAURANT SEED

const restaurantData = {
  restaurantName: '',
  dishName1: '',
  dishImage1: '',
  dishName2: '',
  dishImage2: '',
  dishName3: '',
  dishImage3: '',
  tip: '',
};

function generateIndividualRestaurantData() {
  restaurantData.restaurantName = faker.company.companyName();

  restaurantData.dishName1 = faker.commerce.product();
  restaurantData.dishName2 = faker.commerce.product();
  restaurantData.dishName3 = faker.commerce.product();

  restaurantData.dishImage1 = faker.image.food();
  restaurantData.dishImage2 = faker.image.food();
  restaurantData.dishImage3 = faker.image.food();

  restaurantData.tip = faker.lorem.sentence();

  return restaurantData;
}

for (let restaurantCount = 0; restaurantCount < 100; restaurantCount += 1) {
  generateIndividualRestaurantData();

  const columns = 'restaurant_name, dish_name1, dish_image1, dish_name2, dish_image2, dish_name3, dish_image3, tip';

  const values = `"${restaurantData.restaurantName}", '${restaurantData.dishName1}', '${restaurantData.dishImage1}', '${restaurantData.dishName2}', '${restaurantData.dishImage2}', '${restaurantData.dishName3}', '${restaurantData.dishImage3}', '${restaurantData.tip}'`;

  connection.query(`INSERT INTO restaurants (${columns}) VALUES (${values})`, (error) => {
    if (error) {
      console.log(JSON.stringify(restaurantData));
      return;
    }
    if (restaurantCount === 99) {
      console.log('Restaurants seeded!');
      seedArticles();
    }
  });
}

// ARTICLES SEED

const articleData = {
  articleTitle: '',
  articleImage: '',
};

function generateIndividualArticleData() {
  articleData.articleTitle = faker.lorem.sentence();
  articleData.articleImage = faker.image.nightlife();
  return articleData;
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// STRETCH CONSIDERATION: prevent duplicate faker results

function seedArticles() {
  let randomInteger;

  for (let articleCount = 1; articleCount <= 100; articleCount += 1) {
    const columns = 'restaurant_id, title, image';
    randomInteger = getRandomInteger(1, 5);

    for (let i = 1; i <= randomInteger; ++i) {
      generateIndividualArticleData();

      const values = `'${articleCount}', '${articleData.articleTitle}', '${articleData.articleImage}'`;

      connection.query(`INSERT INTO articles (${columns}) VALUES (${values})`, (error) => {
        if (error) {
          console.log(articleData);
          return;
        }
        if (articleCount === 100 && i === randomInteger) {
          console.log('Articles seeded!');
          seedFeatures();
        }
      });
    }
  }
}

// STRETCH CONSIDERATION: prevent duplicate faker results

function seedFeatures() {
  let randomInteger;
  let fakeTitle;

  for (let count = 1; count <= 100; count += 1) {
    const columns = 'restaurant_id, title';
    randomInteger = getRandomInteger(1, 5);

    for (let i = 1; i <= randomInteger; ++i) {
      fakeTitle = faker.commerce.productAdjective();

      const values = `'${count}', '${fakeTitle}'`;

      connection.query(`INSERT INTO features (${columns}) VALUES (${values})`, (error) => {
        if (error) {
          console.log(values);
          return;
        }
        if (count === 100 && i === randomInteger) {
          console.log('Features seeded!');
        }
      });
    }
  }
}