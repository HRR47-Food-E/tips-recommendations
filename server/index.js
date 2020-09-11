require('newrelic');
const express = require('express');
const redis = require('../database/postgres/redis.js');
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
  const query = `SELECT * FROM restaurants WHERE id = ${restaurantId}`;
  redis.redisGet(query, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else if (!result) {
      db.getRestaurantInfo(query, restaurantId, (err, data) => {
        if (err) {
          res.sendStatus(500);
        } else {
          redis.redisSet(query, data, (err) => {
            err ? res.sendStatus(500) : res.send(data);
          })
        }
      });
    } else {
      res.send(result)
    }
  });
});

app.get(`/api/articles/:id`, (req, res) => {
  const restaurantId = req.params.id;
  const query = `SELECT * FROM articles WHERE restaurant_id = ${restaurantId}`;
  redis.redisGet(query, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else if (!result) {
      db.getRestaurantArticles(query, restaurantId, (err, data) => {
        if (err) {
          res.sendStatus(500);
        } else {
          redis.redisSet(query, data, (err) => {
            err ? res.sendStatus(500) : res.send(data);
          })
        }
      });
    } else {
      res.send(result)
    }
  });
});

app.get(`/api/features/:id`, (req, res) => {
  const restaurantId = req.params.id;
  const query = `SELECT * FROM features WHERE restaurant_id = ${restaurantId}`;
  redis.redisGet(query, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else if (!result) {
      db.getRestaurantFeatures(query, restaurantId, (err, data) => {
        if (err) {
          res.sendStatus(500);
        } else {
          redis.redisSet(query, data, (err) => {
            err ? res.sendStatus(500) : res.send(data);
          })
        }
      });
    } else {
      res.send(result)
    }
  });
});

app.post('/api/restaurant', (req, res) => {
  db.addRestaurant(req.body, (err) => {
    res.sendStatus(err ? 500 : 200);
  });
});

app.delete('/api/restaurant/:id', (req, res) => {
  db.removeRestaurant(req.params.id, (err, data) => {
    res.sendStatus(err ? 500 : 200);
  });
});

app.put('/api/restaurant/:id', (req, res) => {
  db.updateRestaurant(req.body, req.params.id, (err) => {
    res.sendStatus(err ? 500 : 200);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
