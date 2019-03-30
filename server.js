/* eslint no-console: "off" */
require('dotenv').config();

const http = require('http');
const app = require('./lib/app');
const dbConnect = require('./lib/dbConnect');
const server = http.createServer(app);
const port = process.env.PORT || 3001;
const dbUri = process.env.MONGODB_URI

dbConnect(dbUri);

server.listen(port, () => {
  console.log('>>> winerds-api server started on', server.address().port);
});