const Restaurant = require('./index.js');

const fetch = (id, cb) => {
  console.time(`Fetching restaurant ${id}`)
  Restaurant.find({ id }, (err, data) => {
    if (err) {
      cb(err);
    } else {
      console.timeEnd(`Fetching restaurant ${id}`)
      cb(null, data)
    }
  });
}

const addRestaurant = (restaurant, cb) => {
  console.time('Restaurant added');
  // Counts the number of records in the database, increments that number, and uses the new number as the id for the new entry
  Restaurant.count({}, (err, count) => {
    if (err) {
      cb(err);
    } else {
      restaurant.id = ++count;
      const newEntry = new Restaurant(restaurant);
      newEntry.save((err, data) => {
        console.timeEnd('Restaurant added');
        err ? cb(err) : cb(null, data);
      });
    }
  });
}

const removeRestaurant = (id, cb) => {
  console.time(`${id} removed!`);
  Restaurant.deleteOne({ id }, (err, data) => {
    console.timeEnd(`${id} removed!`);
    err ? cb(err) : cb(null, data);
  });
}

const updateRestaurant = (body, id, cb) => {
  console.time(`${id} updated!`);
  Restaurant.updateOne({ id }, body, (err, data) => {
    console.timeEnd(`${id} updated!`);
    err ? cb(err) : cb(null, data);
  })
}

module.exports = {
  fetch,
  addRestaurant,
  removeRestaurant,
  updateRestaurant
}