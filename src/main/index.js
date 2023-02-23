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
const cors=require('cors');
const { getGoogleAuthController, redirectToConsent } = require('./Controllers/OAuthController');
const { addGoogleUserEndpoint } = require('./Controllers/UserController');
//Added mongoclient


let app=express();

app.use(cors())

app.set('case sensitive routing', false);
app.use(express.json({limit:"10mb"}));
app.use(cookieParser());
app.use("/images",express.static('static/images'));
app.use(injectUser);
app.use('/api/autocomplete',autoCompleteRouter);
app.use('/api/user',userRouter);
app.use('/api/index',indexRouter);
app.use('/api/vehicle',vehicleRouter);
app.use('/api/book',bookingRouter);

app.get('/api/google/callback',getGoogleAuthController);
app.get('/api/google/redirect',redirectToConsent);
app.post('/api/google/addGoogleUser',addGoogleUserEndpoint);
app.listen(4292);