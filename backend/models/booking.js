const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  numOfChildren: Number,
  numOfAdults: Number,
  numOfBedrooms: Number,
  comment: String,
  isPaid: Boolean
})

module.exports = mongoose.model('Booking', bookingSchema);
