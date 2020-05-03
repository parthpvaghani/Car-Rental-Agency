const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookingStatusSchema = new Schema({
  Issuedate: {
    type: Date,
    required: true
  },
  Returndate: {
    type: Date,
    required: true
  },
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  CarId: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
    required: false
  }
});


module.exports = mongoose.model('BookingStatus', BookingStatusSchema);