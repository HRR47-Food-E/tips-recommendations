const fs = require('fs');
const faker = require('faker');

const writeStream = fs.createWriteStream('./database/data-generation/restaurant-data.csv');

// Generates restaurant data for 10 million primary records
const writeRestaurantData = (writer, cb) => {
  console.log('Generating data...')
  console.log('[                    ]')
  console.time('restaurantData');
  var i = 10000000;
  var id = 0;
  var data, j;
  writeStream.write('restaurant_name,dish_name1,dish_name2,dish_name3,dish_image1,dish_image2,dish_image3,tip\n')
  write();
  function write() {
    var ok = true;
    do {
      --i;
      ++id;
      data = generateRestaurantData();
      if (i % 500000 === 0) {
        j = i / 500000;
        console.log(`[${'='.repeat(20 - j)}${' '.repeat(j)}]`);
      }
      if (i === 0) {
        writeStream.write(data, cb);
      } else {
        ok = writeStream.write(data + '\n');
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writeStream.once('drain', write);
    }
  }
};

// Creates a random number between min and max
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generates data for one restaurant
const generateRestaurantData = () => {
  var restaurantData = '';
  restaurantData += '"' + faker.company.companyName() + '",';
  restaurantData += faker.commerce.product() + ',';
  restaurantData += faker.commerce.product() + ',';
  restaurantData += faker.commerce.product() + ',';
  restaurantData += randInt(1, 750) + ',';
  restaurantData += randInt(1, 750) + ',';
  restaurantData += randInt(1, 750) + ',';
  restaurantData += '"' + faker.lorem.sentence() + '"';
  return restaurantData;
};

writeRestaurantData(writeStream, (err, data) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`Done generating data!`);
    console.timeEnd('restaurantData');
  }
});
