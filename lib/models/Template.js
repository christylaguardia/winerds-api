const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// var childSchema = new Schema({ name: 'string' });

const categoriesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tags: [String]
});

const sectionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  categories: [categoriesSchema]
});

const templateSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  sections: [sectionSchema],
  createdBy: {
    type: String,
    required: true,
    default: 'winders'
  }
});

module.exports = mongoose.model('Template', templateSchema);
