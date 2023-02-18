require('dotenv').config({path:'environment.env'});
const { MongoClient } = require('mongodb');
globalThis.mongoClient=new MongoClient(process.env.MONGO_URL);
const express = require("express");
const cookieParser=require('cookie-parser')
const { userRouter } = require("./routes/UserRouter");
const { indexRouter } = require("./routes/indexPageRouter");
const { autoCompleteRouter } = require('./routes/AutoCompleteRouter');
const { injectUser } = require('./Controllers/middleware/InjectUser');
const { vehicleRouter } = require('./routes/VehicleRouter');
const { bookingRouter } = require('./routes/BookingRouter');

//Added mongoclient


let app=express();
app.set('case sensitive routing', false);
app.use(express.json({limit:"10mb"}));
app.use(cookieParser());
app.use(express.static('static'));
app.use(injectUser);
app.use('/api/autocomplete',autoCompleteRouter);
app.use('/api/user',userRouter);
app.use('/api/index',indexRouter);
app.use('/api/vehicle',vehicleRouter);
app.use('/api/book',bookingRouter);
app.listen(4292);