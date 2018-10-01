const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    profile: String,
    style: String,
    label: {
      winery: String,
      vintage: Int,
      style: String,
      name: String
    },
    tags: [
      {
        category: String,
        tags: [String]
      }
    ],
    notes: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Tastings', schema);
