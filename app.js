const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const db = require('./db/db');
const apiRouter = require('./routes/api-router');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', apiRouter);

db.authenticate()
  .then(() => {
    console.log('Connection has ben established succesfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database', err);
  });

module.exports = app;
