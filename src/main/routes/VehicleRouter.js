const express=require('express');
const { getVehicleCategoriesEndpoint } = require('../Controllers/VehicleController');
let vehicleRouter=express.Router();

vehicleRouter.get('/categories',getVehicleCategoriesEndpoint);

module.exports={vehicleRouter};