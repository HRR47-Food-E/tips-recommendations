const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect('mongodb://localhost/zagattips', { useNewUrlParser: true });
db.on('connected', () => console.log('Mongoose is connected!'));

let restaurantSchema = new mongoose.Schema({
  restaurant_name: String,
  dish_name1: String,
  dish_name2: String,
  dish_name3: String,
  dish_image1: Number,
  dish_image2: Number,
  dish_image3: Number,
  tip: String
});

let Restaurant = mongoose.model('Restaurant', restaurantSchema);
