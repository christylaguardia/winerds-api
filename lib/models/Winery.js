const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const grapes = require('./grapes');

const wineSchema = new Schema({
  type: {
    type: String, // should be enum?
    required: true
  },
  vintages: [ ],
  name: {
    type: String,
    required: true
  },
  grapes: [{
    type: String,
    required: true,
    enum: grapes
  }]
});

const winerySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  city: String,
  state: String,
  zip: String,
  url: String,
  wines: [wineSchema]
});

winerySchema.static('updateWinery', function (req) {
  const query = {};
  const update = {
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    url: req.body.url,
    wines: req.body.wines,
  };
  const options = {
    upsert: true, // add user if they are not already in the database
    new: true,
    setDefaultsOnInsert: true
  };

  return this.findOneAndUpdate(query, update, options);
});


module.exports = mongoose.model('Winery', winerySchema);
