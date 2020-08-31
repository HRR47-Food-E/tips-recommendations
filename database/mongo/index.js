const mongoose = require('mongoose');
const db = mongoose.connection;
const connection = mongoose.createConnection('mongodb://localhost/zagattips');
mongoose.connect('mongodb://localhost/zagattips', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
db.on('connected', () => console.log('Mongoose is connected!\n'));

let restaurantSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  restaurant: Object,
  articles: Array,
  features: Array
});

let Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;