const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    templateId: {
      type: String,
      required: true
    },
    type: String,
    winery: String,
    vintage: Number,
    name: String,
    descriptors: Object,
    notes: String
  },
  {
    timestamps: true
  }
);

schema.static('updateTasting', function (req) {
  const query = {};
  const update = {
    userId: req.user.uid,
    templateId: req.body.templateId,
    type: req.body.type,
    winery: req.body.winery,
    vintage: req.body.vintage,
    name: req.body.name,
    descriptors: req.body.descriptors,
    notes: req.body.notes
  };
  const options = {
    upsert: true, // add user if they are not already in the database
    new: true,
    setDefaultsOnInsert: true
  };

  return this.findOneAndUpdate(query, update, options);
});

module.exports = mongoose.model('Tasting', schema);
