
const {MongoClient}=require('mongodb');
let client=new MongoClient(process.env.MONGO_URL);
async function getVehicleCategories()
{
    try
    {
        await client.connect();
        let collection=client.db('vehicle_buddy').collection('vehicle_categories');
        let arr=[];
        let cursor=collection.find({},{projection:{_id:0}});
        while(await cursor.hasNext())
            arr.push(await cursor.next());
        await client.close();
        return arr;
    }
    catch(E)
    {
        console.log(E);
        client.close();
        return [];
    }

}

module.exports={getVehicleCategories};