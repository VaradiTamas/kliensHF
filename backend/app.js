const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Booking = require('./models/booking');

const app = express();

mongoose.connect("mongodb+srv://fahazfoglalo:ChsgicCcXqDvda26@cluster0.vyq6f.mongodb.net/firstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true})
  .then(()=>{
    console.log('Connected to database!');
  })
  .catch(()=>{
    console.log('Connection to database failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post('/admin/bookings', (req,res,next) => {
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

app.get('/admin/bookings', (req,res,next) => {
  Booking.find().then(bookings => {
    res.status(200).json({
      message: "Bookings fetched successfully!",
      bookings: bookings
    });
  });
});

app.use('/admin/bookings/delete/:id', (req,res,next) => {
  Booking.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Booking deleted!"});
  });
});

app.put('/admin/bookings/edit/:id', (req,res,next) => {
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

module.exports = app;
