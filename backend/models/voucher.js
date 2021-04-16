const mongoose = require('mongoose');

const voucherSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  numOfChildren: Number,
  numOfAdults: Number,
  numOfBedrooms: Number,
  isPaid: Boolean
})

module.exports = mongoose.model('Voucher', voucherSchema);
