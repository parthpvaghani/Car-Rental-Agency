const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  VehicleNumber: {
    type: String,
    required: true
  },
  Model: {
    type: String,
    required: true
  },
  SeatingCapacity: {
    type: String,
    required: true
  },
  RentPerDayInRupee: {
    type: Number,
    required: true
  },
  City: {
    type: String,
    required: true
  }
  
});

module.exports = mongoose.model('Car', CarSchema);
