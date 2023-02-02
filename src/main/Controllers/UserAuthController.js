const {Request,Response}=require('express');
const { containsUser, getUser, } = require('../mongo/dao/UserDAO');


/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function getLoggedInUserEndpoint(req,res)
{   
    let result={data:{},message:"",success:false,redirect:false};
    try{
        //User injected by middleware
        let user=res.locals.user;
        
        if(user==null)
        {
            result["data"]=undefined;
            result["message"]="Couldn't Find User.";
            result["success"]=false;
        }
        else{
                if(await containsUser(user.email))
                {
                    result["data"]=await getUser(user.email);
                    result["success"]=true;
                    result["message"]="Succesfully fetched user";
                    
                }
                else
                {
                    result["data"]=undefined;
                    result["message"]="Couldn't Find User.";
                    result["success"]=false;
                    
                }
            }

    }
    catch(E)
    {
        console.log(E);
        result["success"]=false;
        result["message"]="A fatal error occured";

    }
    res.json(result);


    
}
/**
 * Function to validate user and set cookie
 * @param {Request} req 
 * @param {Response} res 
 */
async function validateUserEndpoint(req,res)
{   
    let result={data:{},message:"",success:false,redirect:false};
    try
    {
        let {email,password}=req.body;
        console.log(email,password)
        if(await containsUser(email))
        {
            let user=await getUser(email);
            if(user.password==password)
            {
                result["message"]=`Logged in ${user.name} bro`;
                result["success"]=true;
                res.cookie('user',JSON.stringify({email:email,password:password}),{maxAge:1000*60*60*10});
            }
            else
            {
                result["message"]=`Invalid password bro`;
                result["success"]=false;
            }
        }
        else
        {

            result["message"]="Couldn't find user.";
            result["success"]=false;
            
        }


    }
    catch(E)
    {
        console.log(E);
        result["success"]=false;
        result["message"]="A fatal error occured";

    }
    res.json(result);


    
}

/**
 * Function to validate user and set cookie
 * @param {Request} req 
 * @param {Response} res 
 */
async function logoutUserEndpoint(req,res)
{   
    let result={data:{},message:"",success:false,redirect:false};
    try
    {
        res.clearCookie('user');
        res.json({message:"Logging out bro :(",success:true,redirect:false})
        return ;
    }
    catch(E)
    {
        console.log(E);
        result["success"]=false;
        result["message"]="A fatal error occured";

    }
    res.json(result);


    
}

module.exports={getLoggedInUserEndpoint,validateUserEndpoint,logoutUserEndpoint};