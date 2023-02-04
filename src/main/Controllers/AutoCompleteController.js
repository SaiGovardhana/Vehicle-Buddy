const { Request,Response } = require("express");
const { getStates, getCities } = require("../mongo/dao/AutocompleteDAO");

/**
 * Function to get states
 * @param {Request} req 
 * @param {Response} res 
 */
async function getStatesAutoCompleteEndpoint(req,res)
{   let result={}
    try
    {
        result.data=await getStates();
        result.success=true;
    }
    catch(E)
    {
        result.data=null;
        result.success=false;

    }
    res.json(result);
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function getCitiesAutoCompleteEndpoint(req,res)
{   let result={};

    try
    {   if(req.params.state == undefined)
            {   
                result.data=null;
                result.success=false;
            }
        else
        {   
            result.data=await getCities(req.params.state);
            result.success=true;
         }


    }
    catch(E)
    {
        console.log(E);
        result.success=false;
        result.data=null;
    }

    res.json(result);


}

module.exports={getStatesAutoCompleteEndpoint,getCitiesAutoCompleteEndpoint};
