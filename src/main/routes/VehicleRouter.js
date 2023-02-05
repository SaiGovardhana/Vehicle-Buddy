const express=require('express');
const { addVehicleEndpoint, getVehiclesEndpoint } = require('../Controllers/VehicleController');

let vehicleRouter=express.Router();


vehicleRouter.post('/addVehicle',addVehicleEndpoint);
vehicleRouter.get('/allVehicles',getVehiclesEndpoint);
module.exports={vehicleRouter}