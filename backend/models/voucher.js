const mongoose = require('mongoose');

const voucherSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  tel: String,
  numOfChildren: Number,
  numOfAdults: Number,
  numOfBedrooms: Number,
  numOfNights: Number,
  country: String,
  postcode: Number,
  city: String,
  address: String,
  isPaid: Boolean
})

module.exports = mongoose.model('Voucher', voucherSchema);
