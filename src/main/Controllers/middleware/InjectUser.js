const { getUser } = require("../../mongo/dao/UserDAO");
const jwt=require('jsonwebtoken')
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
async function injectUser(req,res,next)
{
    if(req.cookies.user!=null)
        {   
            let isValid = jwt.verify(req.cookies.user,process.env.JWT_SECRET);
            
            if(!isValid)
                {   res.clearCookie("user");
                    console.log("NOT VALID USER");
                    next();
                    return;
                }
            console.log("Valid User");

            let user = jwt.decode(req.cookies.user);
            let fullUser=await getUser(user.email);
            //Error might occur when user is deleted from DB
            res.locals.user={"email":user.email,"name":user.name,"password":fullUser.password,"role":user.role};
            console.log(res.locals.user);
        }
    next();
}

module.exports={injectUser}