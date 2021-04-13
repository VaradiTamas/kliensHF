const express = require("express");
const router = express.Router();
const Booking = require('../models/booking');

router.post('', (req,res,next) => {
  const booking = new Booking({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    numOfChildren: req.body.numOfChildren,
    numOfAdults: req.body.numOfAdults,
    numOfBedrooms: req.body.numOfBedrooms,
    comment: req.body.comment,
    isPaid: req.body.isPaid
  });
  booking.save().then(createdBooking => {
    res.status(201).json({
      message: 'Booking added successfully',
      bookingId: createdBooking._id
    })
  });
});

router.get('', (req,res,next) => {
  Booking.find().then(bookings => {
    res.status(200).json({
      message: "Bookings fetched successfully!",
      bookings: bookings
    });
  });
});

router.use('/delete/:id', (req,res,next) => {
  Booking.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Booking deleted!"});
  });
});

router.put('/edit/:id', (req,res,next) => {
  const booking = new Booking({
    _id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    numOfChildren: req.body.numOfChildren,
    numOfAdults: req.body.numOfAdults,
    numOfBedrooms: req.body.numOfBedrooms,
    comment: req.body.comment,
    isPaid: req.body.isPaid
  });
  Booking.updateOne({_id: req.params.id}, booking).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update successful!'});
  });
});

router.get('/:id', (req,res,next) => {
  Booking.findById(req.params.id).then(booking => {
    if(booking){
      res.status(200).json(booking);
    } else{
      res.status(404).json({message: 'Booking not found!'});
    }
  });
});

module.exports = router;
