
let {google}=require('googleapis')
let clientId=process.env.CLIENT_ID;
let clientSecret=process.env.CLIENT_SECRET
let callBackUrl=process.env.HOST+process.env.CALLBACK
const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    callBackUrl
  );


  //Get User Info And Email
const scopes=["https://www.googleapis.com/auth/userinfo.profile",
"https://www.googleapis.com/auth/userinfo.email"];

const url = oauth2Client.generateAuthUrl({scope: scopes});


async function getGoogleAuthData(code)
{   try{    //Get the Access Token Using Authorization Code
            console.log("Requesting Data")
            let { tokens } = await oauth2Client.getToken(code);   
            //Set Access Token 
            
            oauth2Client.setCredentials({access_token: tokens.access_token});    
            let oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
            }
            );
            //Get Data from api
            let { data } = await oauth2.userinfo.get();    
            return data;
    }
    catch(E)
    {
       console.log(E);
        return null;
    }
}

module.exports={getGoogleAuthData,url}