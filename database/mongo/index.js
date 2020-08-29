const mongoose = require('mongoose');
const db = mongoose.connection;
const connection = mongoose.createConnection('mongodb://localhost/zagattips');
mongoose.connect('mongodb://localhost/zagattips');
db.on('connected', () => console.log('Mongoose is connected!'));

let restaurantSchema = new mongoose.Schema({
  id: Number,
  restaurants: Object,
  articles: Array,
  features: Array
});

let Restaurant = mongoose.model('Restaurant', restaurantSchema);
