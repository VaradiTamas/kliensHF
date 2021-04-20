const express = require("express");
const router = express.Router();
const Voucher = require('../models/voucher');
const mongoose = require("mongoose");

router.post('', (req,res,next) => {
  const voucher = new Voucher({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    tel: req.body.tel,
    numOfChildren: req.body.numOfChildren,
    numOfAdults: req.body.numOfAdults,
    numOfBedrooms: req.body.numOfBedrooms,
    numOfNights: req.body.numOfNights,
    country: req.body.country,
    postcode: req.body.postcode,
    city: req.body.city,
    address: req.body.address,
    isPaid: req.body.isPaid
  });
  voucher.save().then(createdVoucher => {
    res.status(201).json({
      message: 'Voucher added successfully',
      voucherId: createdVoucher._id
    })
  });
});

router.get('', (req,res,next) => {
  Voucher.find().then(vouchers => {
    res.status(200).json({
      message: "Vouchers fetched successfully!",
      vouchers: vouchers
    });
  });
});

router.use('/delete/:id', (req,res,next) => {
    Voucher.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Voucher deleted!"});
  });
});

router.put('/edit/:id', (req,res,next) => {
  const voucher = new Voucher({
    _id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    tel: req.body.tel,
    numOfChildren: req.body.numOfChildren,
    numOfAdults: req.body.numOfAdults,
    numOfBedrooms: req.body.numOfBedrooms,
    numOfNights: req.body.numOfNights,
    country: req.body.country,
    postcode: req.body.postcode,
    city: req.body.city,
    address: req.body.address,
    isPaid: req.body.isPaid
  });
  Voucher.updateOne({_id: req.params.id}, voucher).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update successful!'});
  });
});

router.get('/:id', (req,res,next) => {
  Voucher.findById(mongoose.Types.ObjectId(req.params.id)).then(voucher => {
    if(voucher){
      res.status(200).json(voucher);
    } else{
      res.status(404).json({message: 'Voucher not found!'});
    }
  });
});

/*for generating id
function generate(count, k) {
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890',
  var str = '';

  for(var i = 0; i < count; i++) {
    str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  base.getID(str, function(err, res) {
    if(!res.length) {
      k(str)                   // use the continuation
    } else generate(count, k)  // otherwise, recurse on generate
  });
}
*/

module.exports = router;
