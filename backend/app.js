const express = require('express');

const app = express();

app.use((req,res,next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/admin/bookings', (req,res,next) => {
  const bookings = [
    {
      numOfChildren: 1,
      numOfAdults: 1,
      numOfBedrooms: 2,
      comment: 'elso obj',
      isPaid: true
    },
    {
      numOfChildren: 1,
      numOfAdults: 10,
      numOfBedrooms: 1,
      comment: 'masodik obj',
      isPaid: false
    }
  ];
  res.status(200).json(bookings);
});

module.exports = app;
