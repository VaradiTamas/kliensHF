const express = require("express");
const router = express.Router();
const Voucher = require('../models/voucher');
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth")

router.post('', checkAuth, (req,res,next) => {
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
  })
  .catch(error => {
    res.status(500).json({
      message: "Adding voucher failed!"
    });
  });
});

router.get('', checkAuth,(req,res,next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const voucherQuery = Voucher.find();
  let fetchedVouchers;
  if(pageSize && currentPage){
    voucherQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  voucherQuery
    .then(vouchers => {
      fetchedVouchers = vouchers;
      return Voucher.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Vouchers fetched successfully!",
        vouchers: fetchedVouchers,
        maxVouchers: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching vouchers failed!"
      });
    });
});

router.use('/delete/:id', checkAuth, (req,res,next) => {
  Voucher.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({message: "Voucher deleted!"});
  })
  .catch(error => {
    res.status(500).json({
      message: "Deleting voucher failed!"
    });
  });
});

router.put('/edit/:id', checkAuth,(req,res,next) => {
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
  })
  .catch(error => {
    res.status(500).json({
      message: "Editing voucher failed!"
    });
  });
});

router.get('/:id', checkAuth,(req,res,next) => {
  Voucher.findById(mongoose.Types.ObjectId(req.params.id)).then(voucher => {
    if(voucher){
      res.status(200).json(voucher);
    } else{
      res.status(404).json({message: 'Voucher not found!'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Getting voucher failed!"
    });
  });
});

module.exports = router;
