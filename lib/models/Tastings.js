const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    profileId: {
      type: String,
      required: true
    },
    type: String,
    winery: String,
    vintage: Number,
    style: String,
    name: String,
    location: String,
    descriptors: Object, // { section: [tag] }
    notes: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Tastings', schema);
