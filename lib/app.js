const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./error');
const verifyUser = require('./firebase');
const routes = require('./routes');
// Not sure if need this
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
};

app.use(allowCrossDomain);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.use('/', verifyUser, routes); 
app.use(errorHandler());

module.exports = app;