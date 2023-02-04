
/**
 * function to retrieve index page cars according to role
 * @param {String} role 
 */

const {MongoClient}=require('mongodb');
let client=new MongoClient(process.env.MONGO_URL);

async function getIndexCards(role)
{   
    try
    {
        await client.connect();
        let collection=client.db('vehicle_buddy').collection('index_cards');

        let result=await collection.findOne({role:role},{projection:{_id:0}});
        await client.close();
        if(result!=null)
            return result.cards;
        else
            return null;


    }
    catch(E)
    {
        console.log(E);
        return null;
    }


}

module.exports={getIndexCards}