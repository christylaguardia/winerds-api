const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  tags: [String],
  // subcategories are category _id's
  subcategories: [String]
});

module.exports = mongoose.model('Categories', schema);
