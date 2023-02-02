
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
async function injectUser(req,res,next)
{
    if(req.cookies.user!=null)
        {   let {email,name,password,role}=JSON.parse(req.cookies.user);

            res.locals.user={"email":email,"name":name,"password":password};
            console.log(res.locals.user);
        }
    next();
}

module.exports={injectUser}