const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const bookingSchema = mongoose.Schema({
  voucherId: {
    type: Schema.Types.ObjectId,
    ref: 'Voucher'
  },
  firstName: String,
  lastName: String,
  email: String,
  tel: String,
  from: Date,
  to: Date,
  offerName: String,
  numOfChildren: Number,
  numOfAdults: Number,
  numOfBedrooms: Number,
  comment: String,
  isPaid: Boolean
})

module.exports = mongoose.model('Booking', bookingSchema);
