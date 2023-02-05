const express=require('express');
const { addVehicleEndpoint } = require('../Controllers/VehicleController');

let vehicleRouter=express.Router();


vehicleRouter.post('/addVehicle',addVehicleEndpoint);

module.exports={vehicleRouter}