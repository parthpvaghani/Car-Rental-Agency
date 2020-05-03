const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone_no: {
    type: Number,
    required: true
  }
});


module.exports = mongoose.model('User', userSchema);