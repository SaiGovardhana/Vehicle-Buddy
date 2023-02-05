const { addVehicle } = require("../mongo/dao/VehicleDAO");



async function addVehicleEndpoint(req,res)
{   let result={};
    try
    {   //Must be implemented in a middler ware
        if(res.locals.user == undefined || res.locals.user.role!='seller')
        {
                result.success=false;
                result.message="Authorization Failed";
        }
        else
        {
            
            let {vehicleprice,model,location,profilepic}=req.body;
            if(vehicleprice==undefined||model==undefined||location==undefined)
                {
                    result.success=false;
                    result.message="Some fields are missing";

                }
            else
            {
                let success=await addVehicle(req.body,res.locals.user.email)
                if(success)
                {
                    result.success=true;
                    result.message="Successfully added vehicle bro.";
                }
                else
                {
                    result.success=false;
                    result.message="Couldn't add vehicle";
                }
            }
        }
    }
    catch(E){
        result.success=false;
        result.message="Couldn't add vehicle";

    }
    res.json(result);
}

module.exports={addVehicleEndpoint};