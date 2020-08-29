const express = require('express');
const db = require('../database/postgres/model.js');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());
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

app.post('/api/restaurant', (req, res) => {
  db.addRestaurant(req.body, (err) => {
    res.sendStatus(err ? 500 : 200);
  });
});

app.delete('/api/restaurant/:id', (req, res) => {
  const restaurantId = req.params.id;
  db.removeRestaurant(restaurantId, (err) => {
    res.sendStatus(err ? 500 : 200);
  });
});

app.put('/api/restaurant/:id', (req, res) => {
  db.updateRestaurant(req.body, req.params.id, (err) => {
    res.sendStatus(err ? 500 : 200);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
