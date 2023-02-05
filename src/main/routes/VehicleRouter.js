const express=require('express');
const { addVehicleEndpoint, getVehiclesEndpoint, getSellerVehicleEndpoint } = require('../Controllers/VehicleController');

let vehicleRouter=express.Router();


vehicleRouter.post('/addVehicle',addVehicleEndpoint);
vehicleRouter.get('/allVehicles',getVehiclesEndpoint);
vehicleRouter.get('/seller/getVehicles',getSellerVehicleEndpoint);
module.exports={vehicleRouter}