const express = require("express");
const router = express.Router();
const Voucher = require('../models/voucher');

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
  Voucher.findById(req.params.id).then(voucher => {
    if(voucher){
      res.status(200).json(voucher);
    } else{
      res.status(404).json({message: 'Voucher not found!'});
    }
  });
});

module.exports = router;
