const fs = require('fs');
const faker = require('faker');

const writeStream = fs.createWriteStream('./database/article-data.csv');

// Generates article data for 10 million primary records
const writeArticleData = (writer, cb) => {
  console.log('Generating data...')
  console.log('[                    ]')
  console.time('articleData');
  var i = 10000000;
  var id = 0;
  var data, j, rand, k;
  writeStream.write('restaurant_id,title,image\n')
  write();
  function write() {
    var ok = true;
    do {
      --i;
      ++id;
      rand = randInt(1, 5);
      for (k = 0; k < rand; ++k) {
        data = generateArticleData(id);
        if (i % 500000 === 0 && k === rand - 1) {
          j = i / 500000;
          console.log(`[${'='.repeat(20 - j)}${' '.repeat(j)}]`);
        }
        if (i === 0 && k === rand - 1) {
          writeStream.write(data, cb);
        } else {
          ok = writeStream.write(data + '\n');
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writeStream.once('drain', write);
    }
  }
};

// Creates a random number between min and max
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generates data for one article
const generateArticleData = (id) => `${id},"${faker.lorem.sentence()}",${randInt(1, 750)}`;

writeArticleData(writeStream, (err, data) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`Done generating data!`);
    console.timeEnd('articleData');
  }
});