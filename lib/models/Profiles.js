const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  profile: String,
  styles: [String],
  categories: [String]
});

module.exports = mongoose.model('Profiles', schema);
