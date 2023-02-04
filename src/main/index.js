require('dotenv').config({path:'environment.env'});
const express = require("express");
const cookieParser=require('cookie-parser')
const { userRouter } = require("./routes/UserRouter");
const { vehicleRouter } = require("./routes/VehicleRouter");
const { autoCompleteRouter } = require('./routes/AutoCompleteRouter');

let app=express();
app.set('case sensitive routing', false);
app.use(express.json({limit:"10mb"}));
app.use(cookieParser());
app.use(express.static('static'));
app.use('/autocomplete',autoCompleteRouter);
app.use('/user',userRouter);
app.use('/vehicle',vehicleRouter);

app.listen(4292);