const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    _id: {
      type: String, // using the firebase auth uid, can't be an ObjectId
      required: true
    },
    uid: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    experience: String
  },
  {
    timestamps: true
  }
);

schema.static('updateUser', (user) => {
  const query = {};
  const update = {
    _id: user.uid, // using the firebase auth uid
    displayName: user.displayName,
    email: user.email,
    experience: user.experience,
  };
  const options = {
    upsert: true, // add user if they are not already in the database
    new: true,
    setDefaultsOnInsert: true
  };

  return this.findOneAndUpdate(query, update, options);
})

module.exports = mongoose.model('Users', schema);
