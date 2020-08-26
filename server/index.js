const express = require('express');
const db = require('../database/index.js');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, '../client/dist')));
// app.use('/:id', express.static(path.join(__dirname, '../client/dist')));
app.use(express.static('client/dist'));
app.use('/:id', express.static('client/dist'));



app.get(`/api/tips/:id`, (req, res) => {
  const restaurantId = req.params.id;

  db.getRestaurantInfo(restaurantId, (error, data) => {
    if (error) {
      console.log('Error at server/restaurants GET request');
    } else {
      res.send(data);
    }
  });
});

app.get(`/api/articles/:id`, (req, res) => {
  const restaurantId = req.params.id;
  db.getRestaurantArticles(restaurantId, (error, data) => {
    if (error) {
      console.log('Error at server/articles GET request');
    } else {
      res.send(data);
    }
  });
});

app.get(`/api/features/:id`, (req, res) => {
  const restaurantId = req.params.id;
  db.getRestaurantFeatures(restaurantId, (error, data) => {
    if (error) {
      console.log('Error at server/articles GET request');
    } else {
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
