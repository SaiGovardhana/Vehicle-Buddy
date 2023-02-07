require('dotenv').config({path:'environment.env'});
const express = require("express");
const cookieParser=require('cookie-parser')
const { userRouter } = require("./routes/UserRouter");
const { indexRouter } = require("./routes/indexPageRouter");
const { autoCompleteRouter } = require('./routes/AutoCompleteRouter');
const { injectUser } = require('./Controllers/middleware/InjectUser');
const { vehicleRouter } = require('./routes/VehicleRouter');
const { bookingRouter } = require('./routes/BookingRouter');

let app=express();
app.set('case sensitive routing', false);
app.use(express.json({limit:"10mb"}));
app.use(cookieParser());
app.use(express.static('static'));
app.use(injectUser);
app.use('/autocomplete',autoCompleteRouter);
app.use('/user',userRouter);
app.use('/index',indexRouter);
app.use('/vehicle',vehicleRouter);
app.use('/book',bookingRouter);
app.listen(4292);