const {Request,Response}=require('express');
const { getVehicleCategories } = require('../mongo/dao/VehicleDAO');

/**
 * Function that returns categories for the first page
 * @param {Request} req 
 * @param {Response} res 
 */
async function getVehicleCategoriesEndpoint(req,res)
{   let result={data:[],success:false};
    try
    {
        let data=await getVehicleCategories();
        result["data"]=data;
        result["success"]=true;
    }
    catch(E)
    {
        console.log(E);

    }
    res.json(result);
}


module.exports={getVehicleCategoriesEndpoint};