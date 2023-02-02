require('dotenv').config({path:'environment.env'});
const express = require("express");
const cookieParser=require('cookie-parser')
const { userRouter } = require("./routes/UserRouter");
const { vehicleRouter } = require("./routes/VehicleRouter");
let app=express();

app.use(express.json({limit:"10mb"}));
app.use(cookieParser());
app.use(express.static('static'));
app.use('/user',userRouter);
app.use('/vehicle',vehicleRouter);

app.listen(4292);