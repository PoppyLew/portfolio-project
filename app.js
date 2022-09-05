const express = require('express');
const { getCategories } = require('./controllers/categories-controller');
const app = express();


app.get('/api/categories', getCategories)

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: 'Internal server error' });
  });
  
  module.exports = app;