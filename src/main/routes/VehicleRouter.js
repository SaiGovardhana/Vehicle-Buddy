const express=require('express');
const { addVehicleEndpoint, getVehiclesEndpoint, getSellerVehicleEndpoint, getVehicleEndpoint } = require('../Controllers/VehicleController');

let vehicleRouter=express.Router();


vehicleRouter.post('/addVehicle',addVehicleEndpoint);
vehicleRouter.get('/allVehicles',getVehiclesEndpoint);
vehicleRouter.get('/seller/getVehicles',getSellerVehicleEndpoint);
vehicleRouter.get('/getVehicle',getVehicleEndpoint);
module.exports={vehicleRouter}