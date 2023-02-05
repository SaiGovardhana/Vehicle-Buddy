const { addVehicle, getVehicles } = require("../mongo/dao/VehicleDAO");



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

async function getVehiclesEndpoint(req,res)
{
    let result={};
    try
    {   

        let data=await getVehicles();
        result.data=data;
        result.success=true;
    }
    catch(E)
    {   result.success=false;
        console.log(E);

    }
    res.json(result);
}

async function getSellerVehicleEndpoint(req,res)
{
    let result={};
    try
    {   let email=undefined;
        if(res.locals.user!=undefined)
            {
                email=res.locals.user.email;
            }
        if(email==undefined)
        {
            result.data=[];
            result.success=false;
        }
        else{
            let data=await getVehicles(email);
            result.data=data;
            result.success=true;
        }
    }
    catch(E)
    {   result.success=false;
        result.data=[];
        console.log(E);

    }
    res.json(result);
}

module.exports={addVehicleEndpoint,getVehiclesEndpoint,getSellerVehicleEndpoint};