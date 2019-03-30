const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  tags: [String],
});

module.exports = mongoose.model('Category', schema);
