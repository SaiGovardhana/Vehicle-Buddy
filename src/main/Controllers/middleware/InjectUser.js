const { getUser } = require("../../mongo/dao/UserDAO");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
async function injectUser(req,res,next)
{
    if(req.cookies.user!=null)
        {   let {email,name,password,role}=JSON.parse(req.cookies.user);
            user=await getUser(email)
            if(user==null)
                {
                next();
                return;
                }
            res.locals.user={"email":user.email,"name":user.name,"password":user.password,"role":user.role};
            console.log(res.locals.user);
        }
    next();
}

module.exports={injectUser}