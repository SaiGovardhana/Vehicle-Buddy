const { containsUser, getUser } = require("../mongo/dao/UserDAO");
const jwt = require('jsonwebtoken');
const { getGoogleAuthData, url } = require("../oauth/SignIn");
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
async function getGoogleAuthController(req,res)
{  
    let result={};
    try
    {
    //Get Authorization Code from Query    
    let code = req.query.code;
    
    //If Code Not present
    if(code == null)
        throw new Error("Auth Code Not Found");
    
    //Get data from api call
    let data=await getGoogleAuthData(code);

    //If data null
    if(data == null|| data.email ==null)
        throw new Error("Couldn't Fetch Critical Data");
    
    //If user present Login
    if(await containsUser(data.email))
        {
            result["userPresent"]=true;
            let user=await getUser(data.email);
            
            result["data"]={name:user.name,email:user.email,role:user.role};
            res.cookie('user',jwt.sign(result["data"],process.env.JWT_SECRET),{maxAge:2147483647});
            result["success"]=true;
        }
    else
        {
            result["success"]=true;
            result["userPresent"]=false;
            result["data"]={email:data.email,name:data.name,profilepic:data.picture};
        }

    

    }
    catch(E)
    {   result["succes"]=false;
        result["message"]="An Error Occured :("
        console.log(E)
    }

    res.send(result)
}

async function redirectToConsent(req,res)
{
    res.redirect(url)
}

module.exports={getGoogleAuthController,redirectToConsent}
