const express=require('express');
const { addBookingEndpoint, getCustomerBookingsEndpoint } = require('../Controllers/BookingController');
let bookingRouter=express.Router();

bookingRouter.post('/bookvehicle',addBookingEndpoint);
bookingRouter.get('/getCustomerBookings',getCustomerBookingsEndpoint);

module.exports={bookingRouter};