
const {MongoClient}=require('mongodb');
let client=new MongoClient(process.env.MONGO_URL);

//Function to add user to database
async function addUser(user)
{
    try
    {
        await client.connect();
        let collection=client.db('vehicle_buddy').collection('users');
        await collection.insertOne({"email":user.email.toLowerCase(),"name":user.name,"password":user.password,"role":user.role});
        await client.close();
        return true;
    }
    catch(E)
    {
        console.log(E);
        client.close();
        return false;
    }

}

//Function to updateUser
async function updateUser(email,user)
{
    try
    {   //Existing editable properties
        let validProperties=['name','password','address','dob','profilepic'];
        let filteredUser={};
        
        //Allow only specified properties to be set.
        for(let [key,value] of Object.entries(user))
            if(validProperties.indexOf(key)!=-1)
                filteredUser[key]=value;

        await client.connect();

        let collection=client.db('vehicle_buddy').collection('users');

        let result=await collection.updateOne({'email':email.toLowerCase()},{$set:filteredUser});
        
        await client.close();

        if(result.matchedCount==1)
            return true;
        else
            return false;
    }
    catch(E)
    {
        console.log(E);
        client.close();
        return false;
    }

}

async function containsUser(email)
{
    try
    {
        await client.connect();
        let collection=client.db('vehicle_buddy').collection('users');
        let result=collection.find({"email":email.toLowerCase()});
        let containsUser=false;
        
        if(await result.hasNext())
            containsUser=true;
        else
            containsUser=false;
        
        await result.close();
        await client.close();

        return containsUser;
    }
    catch(E)
    {
        console.log(E);
        client.close();
        return false;
    }

}

async function getUser(email)
{

    try
    {
        await client.connect();
        let collection=client.db('vehicle_buddy').collection('users');
        let result=await collection.findOne({"email":email.toLowerCase()});
        
        await client.close();
        return result;
    }
    catch(E)
    {
        console.log(E);
        client.close();
        return null;
    }


}

module.exports={addUser,getUser,updateUser,containsUser};